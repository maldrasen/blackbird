---
id: 146
title: Implement givePreferences
priority: 1
created: 2026-07-30
tags:
  - battle
  - negotiation
points: 2
---
---
Implement `givePreferences()` in `application/negotiations/negotiation-reaction.js`, which currently throws
`TODO: Implement this.` on a live path — the winning branch of the piss contest in
`data/negotiation/questions/let-me-taste.js`. Split from task 144; independent of the other 144 follow-ups.

Per the design comment already in the file: monsters aren't full characters during a negotiation, so mechanically we
just add sexual preferences to the character as if they were always there. Incompatible preferences throw (that check
belongs in the question authoring), and setting a preference to 0 deletes it.

### Component facts (verified)
- `SexualPreferencesComponent` has `create/lookup/deletePreference/destroy`. `lookup` returns a clone (mutations must
  round-trip); `update` merges keys and validates. `deletePreference(id,code)` removes a single preference key
  (backed by `Registry.deleteComponentKey`).
- Preference requirement values in `data/sexual-preferences/*.js`: `breasts`, `cock`, `pussy`, `erogenousCervix`,
  `erogenousUrethra`.
- Do NOT copy the `senses.breasts` check from `sexual-preferences-factory.js:136` — `breasts` isn't a legal
  `SensitivitiesComponent` property; that factory check is latently broken. Use `Character(id).hasBreasts()`.

### Changes
- In `resolve()`, pass the context through: `givePreferences(reaction.options.givePreferences, context)`; the target
  is `context.T`.
- For each `[code, value]` pair: validate with `SexualPreference.lookup(code).getRequires()` (throws on a bad code)
  plus a `meetsRequirement(id, requires)` switch — `breasts` → `Character(id).hasBreasts()`, `cock` →
  `hasNormalCock()`, `pussy` → `hasNormalPussy()`, `erogenousCervix`/`erogenousUrethra` →
  `SensitivitiesComponent.lookup(id).cervix|urethra != null`; unknown requirement or incompatible preference throws.
- Value 0 deletes the key via `SexualPreferencesComponent.deletePreference`; anything else sets it via `update`
  (which validates).

### Tests
New `test/negotiations/negotiation-reaction-spec.js` (regenerate the manifest). Real records only. Cover:
- Descriptor shapes: e.g. `NegotiationReaction.respect('msg')` resolves to the exact feelings map
  `{ control:20, respect:30 }` with the message.
- Contests: `Random.stubFlipCoin` for coin tosses, `Random.stubRoll` for frequency-map and attribute contests
  (real characters), and nested win/loss reactions resolving recursively.
- `givePreferences` on a `MonsterFactory.build('kobold-sneak-slut')` character: grant sets the component value,
  re-grant overwrites, 0 deletes the key, incompatible preference throws, unknown code throws.
