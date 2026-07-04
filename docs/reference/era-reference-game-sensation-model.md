# Reference Game Sensation Model

A comparison of Blackbird's training/sensation math against the sensation calculations found in the ERB-language
reference game at `D:\Work\projects\reverse-erb` (an Emuera/Era-genre title, mostly Japanese, that Blackbird is
loosely modeled on). Produced by reverse-engineering the ERB source — no design documents were available, only code.

This is a comparison of two systems that solve the same problem with different architectures. **Raw numbers are not
directly comparable** between the two games (see [Why the numbers don't compare 1:1](#why-the-numbers-dont-compare-11)) —
what's useful here is the *shape* of the formulas, the ratios between sensation types within a single action, and the
design decisions the reference game made that Blackbird hasn't gotten to yet.

## Confidence levels

Everything in this document was extracted by reading the actual ERB source, but with varying rigor:

- **High confidence** — read in full, formulas quoted with file:line citations, cross-checked. This covers the
  core SOURCE→CUP→PALAM pipeline, the orgasm/refractory mechanic, the insertion/fit formula, and the ~25 actions
  listed in the [action comparison table](#action-by-action-comparison).
- **Low confidence / directional only** — an initial broad pass sampled ~20 of the reference game's 144 action
  files and extrapolated categories for the rest. Where this document references content outside the verified
  action list (BDSM tools, tentacle content, urethral specialty actions, environmental/roleplay flags), treat it as
  "this category of content exists" rather than "these are the exact numbers." That pass also got action *direction*
  wrong for several oral/anal actions on the first attempt (fixed by a follow-up pass) — a caution against trusting
  verb-translation alone when reading this kind of source.

---

## Pipeline architecture comparison

| | Blackbird | Reference game |
|---|---|---|
| Raw per-action values | `partnerSensations`/`playerSensations` baseline object | `SOURCE:0`-`SOURCE:19` (22-slot array incl. health/stamina cost) built by each action's handler |
| Personality/skill correction | Applied inline per sensation-result builder (`SensationArousal`, `SensationSkills`, `SensationPreferences`, etc.) | Precomputed once per turn into two `TCVAR` banks (600-619 input correction, 620-640 output correction — see below), then applied uniformly |
| Intermediate "pure" value | *(none — this is exactly the gap 4.3 identified: sensitivity is meant to multiply here and currently doesn't)* | `CUP:*` — SOURCE after correction, one value per tracked parameter |
| Session accumulation | `TrainingState` scales (`partnerScales`/`playerScales`), reset at session start, overflow into anima/animus at scale-level-up | `UP:*` — **not** a session accumulator; a same-turn temp holding the previous `CUP` value while a new one computes, folded back in immediately |
| Permanent stat write | Anima/animus spent later via a separate upgrade system (implied by design docs, not yet built) | `PALAM += CUP - CDOWN` **every single action**, immediately, continuously |

The biggest structural surprise: the reference game has no equivalent of "train all session, cash out at the end."
Pleasure/obedience/shame/etc. become permanent character stats turn-by-turn, with `CDOWN` (see
[Orgasm & refractory](#orgasm--refractory)) acting as the only brake. Blackbird's session/scale/anima-animus
indirection is a genuinely different design, not a partial version of the same one — worth deciding deliberately
rather than assuming the reference model is what Blackbird is converging toward.

## Core formula philosophy: discrete tables vs continuous curves

Blackbird leans on continuous functions everywhere a personality/preference value affects a number:
`CharacterMath.personalityFactorValue()` (a squared curve from -100..100 to a 0.5-2.0 factor),
`CharacterMath.emotionBaseValue()` (a six-zone `PiecewiseCurve`), `applyFactorScale()`. One formula, smooth output,
easy to reason about at any input value.

The reference game does almost everything via `SELECTCASE` on a **discrete ability level (0-5)**, each case a
hand-picked multiplier. From `TRACHECK.ERB`'s affection-source handling:

```
SELECTCASE ABL:従順 (obedience-skill)
CASE 0: TIMES A, 0.40
CASE 1: TIMES A, 0.50
CASE 2: TIMES A, 0.60
CASE 3: TIMES A, 0.70
CASE 4: TIMES A, 0.80
CASE 5: TIMES A, 1.00
ENDSELECT
```

This repeats for essentially every source category, each with its *own* hand-tuned table — sometimes linear
(above), sometimes not (sexual-behavior's service-spirit table is `0.60→0.80→1.00→1.20→1.40→1.70`, an accelerating
curve hand-authored one step at a time). The practical difference: the reference game's balance is a big pile of
individually-tuned lookup tables (~15 source categories × up to 3 gating stats each), while Blackbird's is a
handful of shared curve functions reused everywhere. Blackbird's approach is far more maintainable and consistent;
the reference game's approach lets a designer give one specific interaction (e.g. "how much does the *service spirit*
skill specifically affect *kissing* affection vs *sexual behavior*") an idiosyncratic shape without touching a shared
formula. That flexibility is presumably why it sprawled to ~15 independent tables — worth knowing as the tradeoff if
Blackbird ever wants an action to feel meaningfully different from the shared curve.

## Personality: redirection, not just scaling

Blackbird's `personalityFactorValue()` scales a sensation's *magnitude* — a preference makes an action feel like
more or less of the same thing. The reference game frequently **redirects** a sensation into a completely different
output parameter based on personality flags. From the pain-source handler:

```
IF TALENT:マゾ (masochist)
    TIMES B, 0.50      ; fear reduced
    TIMES C, 0.01      ; antipathy nearly eliminated
    TIMES D, 4.00       ; arousal multiplier ×4
ELSE
    SELECTCASE ABL:マゾっ気 (masochistic-tendency, 0-5)
    CASE 0: D = 0
    CASE 1: TIMES D, 0.20
    ...
```

Pain's default outputs are submission + suffering + fear + antipathy. A masochist reroutes most of that into
*arousal* instead, at an explicit ×4 multiplier. The same three-way branch pattern (non-deviant / deviant / masochist)
appears for exposure, deviance, and submission sources too — and separately, `TALENT:抑圧`/`抵抗`/`快感の否定`
(suppression/resistance/pleasure-denial) can redirect *pleasure itself* into **depression** instead of desire:

```
IF TALENT:抑圧 || TALENT:抵抗
    B = SOURCE:性行動 / 5
CUP:抑鬱 += B   ; depression, from what would otherwise be arousal
```

Blackbird doesn't have a character who resents being made to feel good, or a masochist whose pain-derived arousal
comes at the *expense* of a different emotional output rather than as an addition. This is probably the single most
transferable idea in this whole document if you want personality archetypes to feel structurally different from each
other rather than just differently-scaled.

## The TCVAR correction system

The comment on `TRACHECK.ERB`'s `@CALC_SOURCE` describes two correction banks, precomputed once per turn
(`ERB/TRAIN/EVENT_SETFLAG.ERB` ~lines 4710-5610):

- **`TCVAR:600-619`** — applied to `SOURCE` *before* conversion. Driven by mood (`CONDS("機嫌", ...)`), relationship
  value (`RELATION:`), hate marks (`MARK:反発刻印`), sexuality-preference mismatch (gay/BL affinity vs partner
  gender), and an EASY-mode dampener. This is the "how much do they want this, right now, from you specifically"
  layer.
- **`TCVAR:620-640`** — applied to `CUP` *after* conversion. Driven by **~70+ individual personality-trait checks**
  (cowardly, rebellious, spirited, arrogant, etc.), each adjusting a handful of specific output parameters by a fixed
  amount. This is the "what kind of person are they, structurally" layer.

Both banks are bounded at the end (`MAX(value, -80)` generally, `-99` for the specifically negative-coded parameters
like fear/antipathy/depression) so no combination of traits can zero out or invert a parameter entirely.

Blackbird's closest equivalent is the consent factor system (`base`/`arousal`/`gender`/`preference`), but that only
gates whether/how strongly an action fires — there's no analogous "every trait nudges every output parameter a
little" layer once the action *is* happening. The two-bank split (mood/relationship vs. fixed personality) is a
clean way to separate "state that changes" from "traits that don't," which maps onto Blackbird's Feelings component
(changing) vs Personality/SexualPreferences components (fixed) — worth considering if a similar broad corrective
pass ever gets added to `SensationResult.build()`.

## Orgasm & refractory

Directly relevant to the still-TODO parts of `Character.rollForOrgasm()`/`rollRefectoryPeriod()`.

The reference game's orgasm threshold is a flat **10,000** per body part (matches Blackbird's
`getOrgasmThreshold()` exactly — strong signal this constant was inherited from playing/studying this or a sibling
game). But orgasm isn't binary — the *amount* by which `CUP` exceeds 10,000 determines intensity, each tier setting
a `CDOWN` (refractory debt) that's subtracted from future pleasure:

| Pleasure level | Orgasm intensity | CDOWN (refractory debt) | Headroom to next |
|---|---|---|---|
| 10,000-19,999 | ×1 (single) | 9,000 | 1,000 |
| 20,000-29,999 | ×2 (double) | 19,000 | 1,000 |
| 30,000-59,999 | ×3 (triple) | 29,000 | 1,000 |
| 60,000-99,999 | ×4 (quad) | 59,000 | 1,000 |
| 100,000+ | ×5 (quint) | 99,000 | 1,000 |

`CDOWN` is **per body part**, not global — and it's recomputed relative to *current* pleasure rather than reset to a
fixed value, so back-to-back orgasms need progressively less pleasure to trigger again
(`CDOWN = currentPleasure - 10000 + 1000×intensity`). There's also an explicit **edging/suppression roll**: a
character can consciously hold back an orgasm, chance scaling with `MAX(30 × capacity/(current+1), clamped 20-90%)`,
which zeroes all orgasm flags for that turn without consuming the pleasure.

This is a complete, working answer to two things flagged in the earlier code analysis: `rollForOrgasm()` never
consulting `refectory`, and pleasure never being reset on orgasm. The reference game's model — debt against a
per-part running total, rather than a flat zero-and-cooldown — is worth using directly rather than reinventing;
it naturally produces "harder to get off again immediately, easier if you're already worked up" without any special
casing.

## Insertion & body-part fit

This directly answers the blocked item in `docs/3. Training - Consent.md`: *"Body part fit... will need a general,
will part fit into part class. Will it fit? Will it hurt? Will it be satisfying?"* The reference game solved this as
a single shared macro (`@SOURCE_INSERTION`, `ERB/COMF/COMF60.ERB` lines 227-939) called by every penetrative
position — vaginal, anal, urethral all funnel through the same formula with different input stats.

**Fit is a signed integer**, `SIZE_DEF = objectSize - orificeExpansion` (expansion is a trainable stat — repeated
use at a given size raises it, though the reference game increments the underlying *experience* counter by a flat
+1 per insertion rather than scaling growth by how well/poorly the insertion went):

- **`SIZE_DEF < 0`** (loose) — pleasurable, not painful. `-1` is "perfect fit" (×1.20 pleasure). Below that,
  `factor = MAX(120 + SIZE_DEF×20, 50) / 100` — floors at 50% so an absurdly loose fit still produces *something*.
- **`SIZE_DEF ≥ 0`** (tight/resistant) — painful, not pleasurable. `factor = MAX(SIZE_DEF×2, 1)` divides both pain
  and pleasure — so a tight fit doesn't zero pleasure, it just heavily discounts it while pain dominates.

On top of the fit factor: a **"just right" bonus** (a separate 0-100 fit-quality stat, not the same as `SIZE_DEF`)
scales the whole thing further, from ×1.50 at 50%+ up to ×3.00 at a perfect 100%. **Experience vs. object size**
(`EXP_REQ`) then scales *pain specifically*, independent of fit — a character well-practiced at a given size takes
as little as ×0.05 pain from it, while one severely under-experienced for an oversized object takes ×3.00. And
**lubrication** (a separate axis from both) scales pleasure up and pain down in five discrete bands, from ×0.10
pleasure / pain+500 at zero lubrication to ×1.0 pleasure / ×0.20 pain at excess lubrication.

So "will it fit, will it hurt, will it be satisfying" decomposes into **four independently-tracked axes**
(raw size fit, fit-quality/"just-right," experience-at-this-size, lubrication) that all multiply together, rather
than one combined number. First-time penetration and cervical/deep insertion additionally get large flat penalties
(e.g. first cervical insertion: pleasure ×0.20, pain +1000, fear +3000, deviance +30000) that shrink sharply with
tracked experience at that specific act — and a corruption-mark stat (`MARK:淫紋`) reduces the *negative* outputs
of any insertion by 15% per mark level, letting a corrupted character take pain/fear/deviance a naive
first-timer wouldn't, independent of raw experience.

This is a genuinely reusable model for Blackbird's blocked consent factor. The four-axis decomposition (fit,
fit-quality, experience, lubrication) maps cleanly onto data Blackbird's body components already track
(`AnusComponent`/`PussyComponent` width fields, `SensitivitiesComponent`, and a not-yet-existing wetness/lubrication
concept) — the missing piece is exactly the trainable "expansion" stat and the experience-vs-size lookup, neither of
which exist in Blackbird's `SexualHistoryComponent` yet.

## Action-by-action comparison

Actions the two games share, with resolved direction (several were mislabeled in an earlier draft of this
comparison — see [confidence levels](#confidence-levels)). Reference-game weights are the raw `SOURCE:` vector before
any TCVAR correction; Blackbird weights are the `partnerSensations`/`playerSensations` baseline before any
multiplier. **Don't compare absolute magnitudes** — compare the *ratios within a row* (see next section).

| Blackbird action | Blackbird partner sensations | Reference action(s) | Reference SOURCE weights (uncorrected) |
|---|---|---|---|
| `kiss` | comfort:30, desire:20, shame:5, submission:5 | COM6 キス (mutual) | affection:300(+200/streak), sexual-behavior:50-350 (by service-spirit), accomplishment:0-500 (by service-spirit), filthiness:100+, submission:100(+100/streak), mouth-pleasure via technique |
| `finger-pussy` | clit:30, pussy:60, anger:10, comfort:30, desire:80, shame:50, submission:40, suffering:10 | COM7 アソコ愛撫 (player→partner) | affection:200+(sense×100), exposure:300, deviance:100(±virginity), clit-pleasure via technique |
| `finger-anus` | anus:60, prostate:40, anger:20, comfort:20, desire:80, shame:100, submission:100, suffering:20 | COM2 アナル愛撫 (player→partner) | affection:0-250(by anal-sense), exposure:400, deviance:1000(×0.2-2.0 by experience), pain/fear scaled by experience, anal-pleasure via technique |
| `fondle-breasts` | nipple:30, comfort:20, desire:30, shame:10, submission:10 | COM5 胸愛撫 (player→partner) | affection:50-250(by breast-sense), sexual-behavior:60, filthiness:20, arousal-add:100, exposure:200, breast-pleasure via technique |
| `suck-nipples` | nipple:60, comfort:30, desire:40, shame:15, submission:10 | *(part of COM5, not standalone in reference)* | — |
| `frottage` | cock:60(both), comfort:30, desire:60(both), shame:30, submission:15 | COM16 兜合わせ (mutual) | affection:500, sexual-behavior:200-450(by BL-affinity), accomplishment:100-800, filthiness:60+, arousal-add:800, exposure:600, submission:500, deviance:50 |
| `suck-cock` | cock:80(partner), comfort:50, desire:70(partner)/40(player), shame:10 | COM91 フェラチオ (partner gives, matches `get-blowjob` direction — see next row) | — |
| `get-blowjob` | throat:20, comfort:10, desire:40/70, shame:60, submission:80, suffering:40 | COM91 フェラチオ (target gives) | sexual-behavior:420-820(by service-spirit), accomplishment:150-2200(!), filthiness:100+, submission:1500, deviance:500, mouth-pleasure ×0.05 if no throat-sensitivity else full |
| `get-lick-cock` | comfort:10, desire:40/60, shame:50, submission:70 | COM4 フェラ (lighter variant, target gives) | exposure:220, deviance:50 — notably lower-intensity than COM91; ERB apparently makes the same "light oral" vs "full oral" distinction Blackbird does |
| `get-deepthroat` | throat:80, anger:50, desire:30/100, shame:100, submission:300, suffering:200 | COM140 イラマチオ (player-driven, aggressive) / COM150 (chains COM91+COM140) | pain:500-3000(by throat-expansion deficit), filthiness:100-1000, submission:3000, deviance:3000, health-cost:150(!) |
| `get-handjob` | desire:30/50-60, shame:20, submission:20 | COM90 手淫 (target gives) | sexual-behavior:250-500, accomplishment:50-750, filthiness:60+, arousal-add via execution-value |
| `get-titfuck` | nipple:20, comfort:10, desire:40/80, shame:60, submission:80, suffering:10 | COM92 パイズリ (target gives) | sexual-behavior:420-820, accomplishment:150-2200, submission:1800, deviance:300-700(by breast size, inverted — smaller = more deviant) |
| `give-titfuck` | cock:50, comfort:40, desire:80/40, shame:20 | COM11 パイズリ (player-driven) | affection:1000(!), accomplishment:1000 — notably *affection*-heavy rather than submission-heavy, since player is the active/giving party here, matching Blackbird's `reverseService` base class choice |
| `fuck-pussy` | clit:35, pussy:100, anger:20, comfort:40, desire:100/80, shame:80, submission:80, suffering:40 | COM60 正常位 (player penetrates) | affection:150-1000(by vagina-sense, ×0.3-1.8 by arousal), exposure:200; remainder delegated to the shared `@SOURCE_INSERTION` fit macro (see above) |
| `fuck-anus` | anus:100, prostate:100, anger:40, comfort:20, desire:90, shame:150, submission:200, suffering:100 | COM70 正常位アナル (player penetrates) | anal-pleasure:20-900(by anal-sense, ×0.3-1.8 by arousal), exposure:1000(!); remainder via `@SOURCE_INSERTION` |
| `masturbate-anus` | anus:70, prostate:20, anger:10, desire:30, shame:120, submission:120 | *(no dedicated equivalent — closest is equipment-driven anal vibrator content)* | — |
| `masturbate-pussy` | clit:60, pussy:50, desire:40, shame:60, submission:80 | COM3 自慰 (target self-stimulates) | sexual-behavior:100+(by technique), addiction-satisfaction:100-1000, arousal-add:2000-3500(!)(by exhibitionism), exposure≈arousal-add, submission:500-3000, deviance:0-800(inversely by exhibitionism) |
| `masturbate-cock` | cock:65, desire:50, shame:80, submission:60 | COM3 自慰 (shared with pussy variant, gated by which genital) | *(same as above)* |
| `get-cunnilingus` | clit:80, pussy:20, desire:60/40, comfort:15, shame:50, submission:70, suffering:20 | *(no directly-verified target-gives-oral-to-player equivalent found in this pass — COM1 クンニ turned out to be the reverse direction, see next row)* | — |
| `suck-pussy`/`suck-anus` (Blackbird player-gives-oral) | anus:80/comfort:10/desire:60 (suck-anus) | COM1 クンニ / COM9 アナル舐め (player licks target) | COM1: fluid-add:100, arousal-add:100+(clit-sense×300), exposure:500(by exhibitionism), deviance:50. COM9: exposure:800, deviance:500, anal-fluid-add:100, pain/fear scaled by anal experience |
| `get-rimming` | anus:80, desire:60/40, anger:10, shame:80, submission:120, suffering:20 | COM96 アナル奉仕 (target services player's anus) | sexual-behavior:250-500, accomplishment:50-750, filthiness:100+, submission:5000(!) if not pinned / 0 if pinned, deviance:3000 |
| `striptease`/`lap-dance` | *(not sensation-bearing the same way — performance actions)* | COM94 泡踊り (weak match — a dance/performance action, but not clearly equivalent) | exposure-heavy per prior broad pass; not independently verified this round |
| `massage-back`/`massage-feet` | *(Blackbird originals)* | **confirmed absent** — no massage action exists anywhere in the reference game's 144 files | — |

### Reading the ratios, not the magnitudes

A few things stand out when you look at proportions within a row rather than raw numbers:

- **Exposure dominates the reference game's oral/anal actions in a way Blackbird doesn't model at all.**
  Blackbird has no `exposure`/`exhibitionism` sensation category. COM1 (cunnilingus) puts more raw weight on exposure
  than on the corresponding pleasure value; COM70 (anal) puts exposure at 1000 against a base anal-pleasure of only
  20-900. If Blackbird ever wants exhibitionism to matter (there's an `exhibitionist` sexual preference already,
  currently only used as a consent-factor multiplier), the reference game treats it as a first-class *sensation*
  output, not just a consent gate.
- **`get-deepthroat`'s proportions match remarkably well.** Both games make it the most extreme oral action —
  Blackbird gives it the highest `submission`(300)/`suffering`(200) of any oral action and the only nonzero `anger`;
  the reference game gives COM140 pain scaling directly off throat-expansion deficit, submission:3000, deviance:3000,
  and by far the highest health-cost (150) of any of the ~25 actions read. Independent convergence on "this is the
  action where things can go wrong" is a good sign for both games' balance intuition.
  - **Health-cost-150 for a receiving action is worth naming as an intentional pattern**, since Blackbird's
    `get-deepthroat` currently costs the *player* 60/*partner* 160 stamina but zero health either direction —
    the reference game's model explicitly damages the receiving throat, which Blackbird's aspect/injury system
    doesn't yet touch for any oral action.
- **`give-titfuck` vs `get-titfuck` direction-flips the same way in both games.** Blackbird deliberately picked
  `reverseService` as give-titfuck's base class (affection-heavy consent) versus `service` for get-titfuck
  (respect-heavy); the reference game independently produces the same asymmetry — COM11 (player-driven) is
  affection:1000-heavy while COM92 (target-driven) is submission:1800-heavy. Confirms the direction split is doing
  the right conceptual work in both.
- **Masturbation-as-performance is where the reference game gets *most* extreme**, not least. COM3's
  arousal-add of 2000-3500 dwarfs everything else in the table (values elsewhere top out around 1000-3000 even for
  full-on penetrative actions). Blackbird's `masturbate-*` actions currently sit in the middle of the pack relative
  to other actions (comparable `desire`/`shame` to `get-handjob`). If the intent is "watching them touch themselves for
  you is uniquely charged because of the exhibitionism," Blackbird's numbers don't currently reflect that the way
  the reference game's do — worth a deliberate look given `masturbate-*` already carries the highest
  `exhibitionist`/`masturbator` preference scale factors (×3) of any action category.
- **`get-lick-cock` vs `get-blowjob` — the light/full oral split is real in both games,** and by similar proportions:
  Blackbright's `get-lick-cock` sensations are roughly 80-85% of `get-blowjob`'s across the board; the reference
  game's COM4 (light) vs COM91 (full) split is far more dramatic — COM91's `accomplishment` (150-2200) vastly
  exceeds anything in COM4 (which has none), and COM91 alone carries `submission`/`deviance`. If Blackbird wants a
  starker distinction between its own light/full pairs (there's also `get-cunnilingus` with no "light" counterpart,
  and `fuck-anus`/`finger-anus` which function similarly), the reference game suggests making the *escalation itself*
  (not just the magnitude) the differentiator — full oral unlocking submission/shame gains that light oral can't
  produce at all, rather than both producing the same sensations at different scale.

## Content categories the reference game has that Blackbird doesn't

From the low-confidence broad pass — categorical only, no numbers to trust. Presented as "things that exist," not
"here's how to build them":

- **Restraint/denial equipment**: clit caps, nipple caps, bondage-restraint tiers that scale fear directly
  (GETBIT-based restraint-severity checks feeding into the pain-source fear multiplier).
- **BDSM/impact-play tools**: spanking, whipping, needles, gags, catheters — a whole equipment-driven punishment
  category with its own sensation profile, distinct from the "forced" versions of normal actions.
- **Urethral specialty content**: an entire parallel expansion/experience/pleasure axis (urethral sounds, bougies,
  vibrators) mirroring the vaginal/anal one, more built-out than Blackbird's current single `erogenousUrethra`
  gate.
- **Fisting**: vaginal and anal, presumably running through the same `@SOURCE_INSERTION` macro at a larger size
  class.
- **Fluid/watersports content**: urination play as a tracked mechanic, tied into the `filthiness` source category.
- **Multi-partner scenarios**: dedicated "helper" NPC actions for three-way scenes, distinct from solo
  player/partner actions.
- **Monster/tentacle content**: a cluster of actions (COM200-210) redirecting into shared tentacle sub-handlers,
  heavy on `filthiness`/`deviance`.
- **Environmental/roleplay flags**: outdoor play, video recording, bathroom scenes, forced roleplay scenarios that
  modify existing actions' sources rather than being actions themselves — closer to a status-effect system than
  new mechanics.
- **Grooming/care actions**: non-sexual actions (praise, hygiene, hair removal) that still move affection/submission,
  suggesting the reference game treats "training" more broadly than pure sex acts.

None of these are recommendations to add — they're what exists in a shipped comparable game, for when any of them
come up on Blackbird's own roadmap (several already do: BDSM/bondage is explicitly a "still need to design" system
per `docs/1. Architecture - Scrutinizers.md`'s `unbound` placeholder, and drugs/urethral content both have their own
todo entries already).

## Why the numbers don't compare 1:1

Worth stating plainly since the table above is tempting to skim as if the numbers were on the same scale — they're
not, for two structural reasons:

1. **Different accumulation targets.** Blackbird's baseline sensations feed a *session-scoped* scale that resets
   every training session and overflows into anima/animus in chunks (`_scaleThresholds` starting at 100, capping at
   453,600). The reference game's `SOURCE` values feed `CUP`, which writes **directly and permanently** to `PALAM`
   every action, with orgasm thresholds at 10,000 and escalating tiers to 100,000+. A given raw number means
   something like "session progress toward a scale-up" in one game and "permanent character-defining stat, right
   now" in the other.
2. **Different personality-correction timing.** Blackbird's baseline numbers already assume roughly-average
   multipliers will apply on top; the reference game's raw `SOURCE` numbers are pre-TCVAR-correction, and that
   correction alone ranges from roughly ×0.3 to ×2.0+ before any preference/talent-specific redirection on top. A
   "cross-game apples-to-apples" comparison would need both games' numbers *after* their respective full correction
   pipelines, not the raw baselines shown here — which is why this document leans on ratios within an action rather
   than magnitudes across games.
