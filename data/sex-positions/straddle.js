const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const isLoving = WeaverRequirements.withAttitude(Attitude.loving);
const isLustful = WeaverRequirements.withAttitude(Attitude.lustful);
const isAccepting = WeaverRequirements.withAttitude(Attitude.accepting);
const isFearful = WeaverRequirements.withAttitude(Attitude.fearful);
const isResistant = WeaverRequirements.withAttitude(Attitude.resistant);
const isViolent = WeaverRequirements.withAttitude(Attitude.violent);

const aVisiblePussy = WeaverRequirements.visiblePussy('A');
const bVisiblePussy = WeaverRequirements.visiblePussy('B');
const aVisibleCock = WeaverRequirements.visibleCock('A');
const bVisibleCock = WeaverRequirements.visibleCock('B');
const aHardCock = WeaverRequirements.visibleHardCock('A');
const bHardCock = WeaverRequirements.visibleHardCock('B');

const aVisibleBreasts = WeaverRequirements.visibleBreasts('A');
const bVisibleBreasts = WeaverRequirements.visibleBreasts('B');
const aBigBreasts = WeaverRequirements.minimumBreastSize('A','big');

const bNoCock = context => Character(context.B).hasNormalCock() === false;

const rearrange = WeaverPackage('straddle.rearrange');
const centipede = WeaverPackage('straddle.move-to-centipede');
const cowgirl = WeaverPackage('straddle.move-to-cowgirl');
const doggyStyle = WeaverPackage('straddle.move-to-doggy-style');
const missionary = WeaverPackage('straddle.move-to-missionary');

// First straddling second's waist. Second lying face down. Standard massage
// position. Penetration is possible, but a handjob is not.
SexPosition.register('straddle',{
  name: 'Straddle',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      ass: [AssAlignment.fucked],
    },
  },

  moves:[
    { code:'centipede', package:centipede },
    { code:'cowgirl', package:cowgirl, swap:true },
    { code:'doggy-style', package:doggyStyle },
    { code:'missionary', package:missionary },
  ],

  rearrangePackage: rearrange,
});

// There are deliberately no options for the player lying face down (as B) beneath a fearful, resistant, or violent
// partner. Having the player voluntarily lie down under an unwilling partner seems incompatible.

rearrange.add(`{B:name} settles onto {B:his} stomach with a warm smile, glancing back over {B:his} shoulder as you climb astride {B:his} hips.`,
  [playerA, isLoving]);
rearrange.add(`You guide {B:name} down onto {B:his} stomach, straddling {B:his} hips as {B:he} stretches out beneath you, resting {B:his} cheek against folded arms.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} turns {B:his} head to smile at you, settling comfortably onto {B:his} stomach as you swing a leg over to straddle {B:his} hips.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles down with a contented sigh as you climb astride {B:his} hips, your {A:cock.thickCock} resting warmly along the curve of {B:his} spine.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`You lean down to press a kiss between {B:his} shoulder blades, your {A:breasts.softBreasts} grazing lightly along {B:his} back as you settle into place.`,
  [playerA, isLoving, aVisibleBreasts]);
rearrange.add(`{B:name} flops eagerly onto {B:his} stomach, arching {B:his} back as you swing a leg over to straddle {B:his} hips.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} can't help but grind {B:his} hips into the sheets as you climb astride {B:him}, {B:his} breath already coming quick.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} moans as you settle astride {B:his} hips, letting your {A:cock.thickCock} drag heavily along the small of {B:his} back.`,
  [playerA, isLustful, aVisibleCock]);
rearrange.add(`{B:name} shivers eagerly as your {A:breasts.bigSoftBreasts} drag along {B:his} back while you settle astride {B:his} hips.`,
  [playerA, isLustful, aVisibleBreasts]);
rearrange.add(`Your {A:breasts.bigBreasts} drape heavily over {B:his} shoulders as you lean down, making {B:him} groan with want.`,
  [playerA, isLustful, aVisibleBreasts, aBigBreasts]);
rearrange.add(`{B:name} lies down on {B:his} stomach without complaint, letting you settle astride {B:his} hips.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} stomach, allowing you to climb astride {B:his} hips without protest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies face down as you settle astride {B:his} hips, your {A:cock.thickCock} resting against {B:his} lower back.`,
  [playerA, isAccepting, aVisibleCock]);
rearrange.add(`{B:name} stretches out beneath you as you settle into place, your {A:breasts.softBreasts} brushing lightly over {B:his} shoulders.`,
  [playerA, isAccepting, aVisibleBreasts]);
rearrange.add(`{B:name} lowers {B:him}self face-down with a nervous breath, tensing as you climb on top to straddle {B:his} hips.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} hands curl into the sheets as {B:he} lies face down, {B:his} body tense while you settle astride {B:his} hips.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} flinches slightly as you settle astride {B:his} hips, your {A:cock.thickCock} pressing against {B:his} lower back.`,
  [playerA, isFearful, aVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} down onto {B:his} stomach, straddling {B:his} hips despite {B:his} half-hearted squirming.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} huffs, turning {B:his} face away as you climb astride {B:his} hips, {B:his} stomach pressed reluctantly into the sheets.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} stiffens as you settle astride {B:his} hips, your {A:cock.thickCock} pressing against {B:his} lower back.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you shove {B:him} face-down, pinning {B:him} beneath your weight as you straddle {B:his} hips.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles beneath you, twisting uselessly as you force {B:him} down onto {B:his} stomach and settle astride {B:his} hips.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} bucks weakly as you pin {B:him} down, your {A:cock.thickCock} pressing hard against {B:his} lower back as you straddle {B:his} hips.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`You settle onto your stomach as {A:name} smiles warmly down at you, climbing astride your hips and trailing a fond hand along your spine.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} gently guides you down onto your stomach, {A:his} smile lingering as {A:he} settles astride your hips.`,
  [playerB, isLoving]);
rearrange.add(`You settle face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} climbs astride your hips with a warm smile.`,
  [playerB, isLoving, bVisibleCock]);
rearrange.add(`{A:name} leans down to press a kiss between your shoulder blades, {A:his} {A:breasts.softBreasts} grazing your back as {A:he} settles into place.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`You settle onto your stomach as {A:name} climbs eagerly astride your hips, a hungry grin on {A:his} face.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} practically pounces, straddling your hips the moment you're down, {A:his} breath quick with want.`,
  [playerB, isLustful]);
rearrange.add(`You lie face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} settles astride your hips with a hungry grin.`,
  [playerB, isLustful, bVisibleCock]);
rearrange.add(`{A:His} {A:breasts.bigBreasts} drag along your back as {A:name} leans down, moaning eagerly into your ear.`,
  [playerB, isLustful, aVisibleBreasts, aBigBreasts]);
rearrange.add(`You lie down on your stomach, letting {A:name} settle astride your hips.`,
  [playerB, isAccepting]);
rearrange.add(`You settle face down, and {A:name} climbs astride your hips without comment.`,
  [playerB, isAccepting]);
rearrange.add(`You lie face down, your {B:cock.sixInch} long {cock} trapped beneath you, as {A:name} settles astride your hips.`,
  [playerB, isAccepting, bVisibleCock]);



centipede.add(`You slide down along {B:name's} back, placing a soft kiss between {B:his} shoulder blades. {B:He} sighs happily and rises onto {B:his} knees, arching back into your touch as you settle behind {B:him}, pressing your face between {B:his} ass cheeks.`,
  [playerA, isLoving]);
centipede.add(`Trailing your fingers down {B:name's} spine, you climb off. {B:He} smiles over {B:his} shoulder and rises onto {B:his} knees for you, and you kneel behind {B:him}, nuzzling into the cleft of {B:his} ass.`,
  [playerA, isLoving]);
centipede.add(`{B:name} shifts up onto {B:his} knees without needing to be asked, humming contentedly as you settle in behind {B:him} and press an affectionate kiss to each cheek of {B:his} ass.`,
  [playerA, isLoving]);
centipede.add(`{B:name} rises onto {B:his} knees, {B:his} {B:cock.thickCock} swaying gently between {B:his} legs as you settle in behind {B:him}, pressing your face to {B:his} ass.`,
  [playerA, isLoving, bVisibleCock]);
centipede.add(`You climb off {B:name}, and {B:he} moans with need, eagerly rising onto {B:his} knees and arching {B:his} back before you bury your face between {B:his} spread cheeks.`,
  [playerA, isLustful]);
centipede.add(`{B:name} can't wait, hauling {B:his} own hips up onto {B:his} knees the moment you slide back, spreading {B:him}self open as you press your face against {B:his} ass.`,
  [playerA, isLustful]);
centipede.add(`{B:name} whines impatiently as you climb off, practically throwing {B:him}self onto {B:his} knees and spreading {B:his} thighs for you.`,
  [playerA, isLustful]);
centipede.add(`{B:name} rocks {B:his} hips as {B:he} rises onto {B:his} knees, {B:his} {B:cock.bigCock} already hard and bobbing as you settle in behind {B:him}.`,
  [playerA, isLustful, bHardCock]);
centipede.add(`{B:name} rises onto {B:his} knees with a needy moan, {B:his} glistening {pussy} on full display as you settle in behind {B:him}.`,
  [playerA, isLustful, bVisiblePussy]);
centipede.add(`You climb off of {B:name}, guiding {B:him} up onto {B:his} knees before settling in behind {B:him}, your face pressed to {B:his} ass.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} shifts up onto {B:his} knees without complaint as you climb off, letting you settle in behind {B:him}.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} rises onto {B:his} knees, {B:his} {B:cock.thickCock} hanging between {B:his} legs, as you settle in behind {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
centipede.add(`You climb off {B:name}, coaxing {B:him} onto {B:his} knees. {B:His} hands tremble as {B:he} obeys, and you settle in behind {B:him}, pressing your face against {B:his} ass.`,
  [playerA, isFearful]);
centipede.add(`{B:name} rises onto {B:his} knees on shaky legs, glancing nervously back over {B:his} shoulder as you settle in behind {B:him}.`,
  [playerA, isFearful]);
centipede.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} legs as {B:he} nervously rises onto {B:his} knees for you.`,
  [playerA, isFearful, bVisibleCock]);
centipede.add(`You climb off {B:name} and haul {B:him} up onto {B:his} knees. {B:He} grumbles under {B:his} breath but doesn't fight you as you press your face against {B:his} ass.`,
  [playerA, isResistant]);
centipede.add(`{B:name} sighs heavily, dragging {B:him}self up onto {B:his} knees with obvious reluctance as you settle in behind {B:him}.`,
  [playerA, isResistant]);
centipede.add(`{B:name} thrashes as you climb off {B:him}, but you wrench {B:him} up onto {B:his} knees anyway, forcing your face hard against {B:his} ass despite {B:his} struggling.`,
  [playerA, isViolent]);
centipede.add(`{B:name} snarls and tries to twist away, but you force {B:him} onto {B:his} knees, pinning {B:his} hips still as you press your face to {B:his} ass.`,
  [playerA, isViolent]);
centipede.add(`{A:name} slides off of you, gently guiding you up onto your knees before settling in behind you, pressing {A:his} face lovingly against your ass.`,
  [playerB, isLoving]);
centipede.add(`{A:name} presses a fond kiss to your shoulder before sliding off you, helping you rise onto your knees and settling in behind you with a warm hand on your hip.`,
  [playerB, isLoving]);
centipede.add(`You rise onto your knees, your {B:cock.thickCock} swaying beneath you, as {A:name} settles in fondly behind you, pressing {A:his} face to your ass.`,
  [playerB, isLoving, bVisibleCock]);
centipede.add(`{A:name} climbs off you eagerly, hauling you up onto your knees before burying {A:his} face hungrily between your cheeks.`,
  [playerB, isLustful]);
centipede.add(`{A:name} groans with want as {A:he} climbs off you, urging you up onto your knees before pressing {A:his} face eagerly against your ass.`,
  [playerB, isLustful]);
centipede.add(`You rise onto your knees, your {B:cock.bigCock} bobbing beneath you, as {A:name} growls hungrily and presses {A:his} face against your ass.`,
  [playerB, isLustful, bVisibleCock]);
centipede.add(`You rise onto your knees, your glistening {pussy} on full display, as {A:name} moans and presses {A:his} face hungrily against your ass.`,
  [playerB, isLustful, bVisiblePussy]);
centipede.add(`{A:name} climbs off of you, guiding you up onto your knees before kneeling behind you, pressing {A:his} face to your ass.`,
  [playerB, isAccepting]);
centipede.add(`{A:name} slides off you and helps you up onto your knees, settling in behind you without comment.`,
  [playerB, isAccepting]);



cowgirl.add(`You roll onto your back as {B:name} smiles warmly down, shifting forward to straddle your hips, facing you now.`,
  [playerA, isLoving]);
cowgirl.add(`{B:name} gazes at you fondly as you roll onto your back, then shifts forward and settles astride your hips, taking your hand in {B:his}.`,
  [playerA, isLoving]);
cowgirl.add(`You roll onto your back as {B:name} shifts forward, {B:his} {B:cock.thickCock} swaying gently as {B:he} settles astride your hips, smiling down at you.`,
  [playerA, isLoving, bVisibleCock]);
cowgirl.add(`You roll onto your back, your {A:cock.thickCock} standing between you, as {B:name} smiles warmly and settles astride your hips.`,
  [playerA, isLoving, aHardCock]);
cowgirl.add(`You roll onto your back as {B:name} grins hungrily, scooting eagerly forward to straddle your waist, facing you.`,
  [playerA, isLustful]);
cowgirl.add(`{B:name} licks {B:his} lips hungrily as you roll onto your back, quickly scooting forward to straddle your hips.`,
  [playerA, isLustful]);
cowgirl.add(`You roll onto your back, your {A:cock.thickCock} standing up between you as {B:name} scoots eagerly forward to straddle your hips, facing you.`,
  [playerA, isLustful, aHardCock]);
cowgirl.add(`{B:name}'s {B:cock.bigCock} bounces as {B:he} scoots eagerly forward, settling astride your hips with a hungry grin.`,
  [playerA, isLustful, bVisibleCock]);
cowgirl.add(`You roll onto your back, letting {B:name} shift forward to straddle your hips facing you.`,
  [playerA, isAccepting]);
cowgirl.add(`{B:name} shifts forward without complaint as you roll onto your back, settling astride your hips to face you.`,
  [playerA, isAccepting]);
cowgirl.add(`You roll onto your back, your {A:cock.thickCock} resting between you, as {B:name} settles astride your hips.`,
  [playerA, isAccepting, aVisibleCock]);
cowgirl.add(`You roll onto your back as {B:name} shifts forward nervously, {B:his} hands trembling slightly as {B:he} settles astride your hips, now facing you directly.`,
  [playerA, isFearful]);
cowgirl.add(`{B:name} bites {B:his} lip nervously as {B:he} shifts forward, avoiding your eyes as {B:he} settles astride your hips.`,
  [playerA, isFearful]);
cowgirl.add(`{B:name}'s {B:cock.sixInch} long {cock} trembles as {B:he} nervously shifts forward and settles astride your hips.`,
  [playerA, isFearful, bVisibleCock]);
cowgirl.add(`You roll onto your back as {B:name} reluctantly slides forward, jaw tight and eyes averted as {B:he} settles astride your hips, facing you.`,
  [playerA, isResistant]);
cowgirl.add(`{B:name} exhales sharply, forcing {B:him}self to shift forward and settle astride your hips despite {B:his} obvious discomfort.`,
  [playerA, isResistant]);
cowgirl.add(`You roll onto your back beneath {B:name}, gripping {B:his} hips to hold {B:him} in place as {B:he} thrashes atop you.`,
  [playerA, isViolent]);
cowgirl.add(`{B:name} struggles as you roll onto your back beneath {B:him}, your firm grip forcing {B:him} to stay astride your hips.`,
  [playerA, isViolent]);
cowgirl.add(`{A:name} rolls onto {A:his} back beneath you, smiling up as you shift yourself forward, straddling {A:his} hips to face {A:him}.`,
  [playerB, isLoving]);
cowgirl.add(`{A:name} reaches up to cup your cheek as {A:he} rolls onto {A:his} back, smiling as you shift forward to straddle {A:his} hips.`,
  [playerB, isLoving]);
cowgirl.add(`{A:name} rolls onto {A:his} back, {A:his} {A:cock.thickCock} lying against {A:his} stomach, as you shift forward to straddle {A:his} hips, smiling down at {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
cowgirl.add(`{A:name} rolls onto {A:his} back, {A:his} {A:breasts.softBreasts} settling against {A:his} chest, as you shift forward to straddle {A:his} hips.`,
  [playerB, isLoving, aVisibleBreasts]);
cowgirl.add(`{A:name} flips onto {A:his} back with an eager grin as you scoot forward, straddling {A:his} waist to face {A:him} properly.`,
  [playerB, isLustful]);
cowgirl.add(`{A:name} moans softly, flipping onto {A:his} back eagerly as you scoot forward, quickly settling astride {A:his} hips.`,
  [playerB, isLustful]);
cowgirl.add(`{A:name} rolls onto {A:his} back, {A:his} {A:cock.thickCock} standing between you as you shift forward to straddle {A:his} hips.`,
  [playerB, isLustful, aHardCock]);
cowgirl.add(`{A:His} {A:breasts.bigSoftBreasts} settle against {A:his} chest as {A:name} flips onto {A:his} back with a hungry grin, watching you settle astride {A:his} hips.`,
  [playerB, isLustful, aVisibleBreasts, aBigBreasts]);
cowgirl.add(`{A:name} rolls onto {A:his} back, letting you shift forward to straddle {A:his} hips facing {A:him}.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} rolls onto {A:his} back without protest, letting you settle astride {A:his} hips.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} nervously turns onto {A:his} back beneath you as you shift forward, straddling {A:his} hips to face {A:him}.`,
  [playerB, isFearful]);
cowgirl.add(`{A:name's} hands tremble slightly as {A:he} turns onto {A:his} back, avoiding your eyes as you shift forward to straddle {A:his} hips.`,
  [playerB, isFearful]);
cowgirl.add(`{A:name} reluctantly rolls onto {A:his} back as you scoot forward, straddling {A:his} hips and forcing {A:him} to look up at you.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} huffs and turns away, tension in {A:his} body as {A:he} reluctantly rolls onto {A:his} back while you settle astride {A:his} hips.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} thrashes as you force {A:him} onto {A:his} back, but you shift forward anyway, straddling {A:his} hips and pinning {A:him} beneath your weight.`,
  [playerB, isViolent]);
cowgirl.add(`{A:name} kicks and twists as you force {A:him} onto {A:his} back, but you settle astride {A:his} hips anyway, pinning {A:him} down.`,
  [playerB, isViolent]);



doggyStyle.add(`You slide back along {B:name's} back, your hands caressing {B:his} shoulders as {B:he} affectionately raises {B:his} hips and bends forward, exposing {B:him}self completely before you.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} arches {B:his} back and lifts {B:his} hips as you ease backward, positioning {B:him}self for you.`,
  [playerA, isLoving]);
doggyStyle.add(`You slide your weight back while {B:name} raises {B:his} hips, bending over so {B:his} rounded ass pushes up toward you.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} smiles at you, raising {B:his} hips while spreading {B:his} thighs and arching {B:his} back, knowing how completely exposed it makes {B:him} look in front of you.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} raises {B:his} hips, {B:his} {B:cock.thickCock} swaying beneath {B:him} as {B:he} bends forward, presenting {B:him}self fully to you.`,
  [playerA, isLoving, bVisibleCock]);
doggyStyle.add(`{B:name} bends forward with a warm smile, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} raises {B:his} hips for you.`,
  [playerA, isLoving, bVisibleBreasts]);
doggyStyle.add(`{B:name} has a hungry look in {B:his} eyes as you slide back behind {B:him}. {B:He} lets out a low moan as {B:he} raises {B:his} ass into the air and spreads {B:his} legs slightly.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} arches {B:his} back and raises {B:his} ass upward as you slide back, {B:his} thighs parting for you as you position yourself behind {B:him}.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} raises {B:his} ass as you position yourself behind {B:him}, letting your {A:cock.thickCock} rest heavily between {B:his} ass cheeks.`,
  [playerA, isLustful, aVisibleCock]);
doggyStyle.add(`{B:name} spreads {B:his} legs, {B:his} glistening {pussy} on full display as {B:he} raises {B:his} ass for you.`,
  [playerA, isLustful, bVisiblePussy]);
doggyStyle.add(`{B:name} raises {B:his} hips as you slide back, bending over and lifting {B:his} ass into position.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} bends over without complaint, raising {B:his} hips as you position yourself behind {B:him}.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} raises {B:his} hips, {B:his} {B:cock.thickCock} hanging beneath {B:him}, as you position yourself behind {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
doggyStyle.add(`{B:name} quickly lifts {B:his} hips, bending forward as you slide backward, taking position behind {B:him}.`,
  [playerA, isFearful]);
doggyStyle.add(`With nervous obedience, {B:name} arches {B:his} back and raises {B:his} hips submissively as you slide behind {B:him}.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name} spreads {B:his} legs hesitantly, exposing {B:his} {pussy} as {B:he} raises {B:his} hips with a nervous breath.`,
  [playerA, isFearful, bVisiblePussy]);
doggyStyle.add(`{B:name} exhales softly as you take hold of the back of {B:his} head, pushing {B:his} face down. Reluctantly, {B:he} raises {B:his} ass upward as you position yourself behind {B:him}.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} grumbles, dragging {B:his} own hips up reluctantly as you position yourself behind {B:him}.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} raises {B:his} hips reluctantly, {B:his} {B:cock.thickCock} hanging beneath {B:him} as you position yourself behind {B:him}.`,
  [playerA, isResistant, bVisibleCock]);
doggyStyle.add(`{B:name} thrashes as you slide back, but with a firm grip on {B:his} hips you pull {B:his} ass upward as you position yourself behind {B:him}.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} snarls and tries to twist away, but you grip {B:his} hips and force them upward as you position yourself behind {B:him}.`,
  [playerA, isViolent]);
doggyStyle.add(`You feel {A:name} sliding along your back, {A:his} hands resting on your hips as you raise your ass high into the air.`,
  [playerB, isLoving]);
doggyStyle.add(`{A:name} presses a fond kiss to your lower back as {A:he} positions {A:him}self behind you, hands resting warmly on your hips.`,
  [playerB, isLoving]);
doggyStyle.add(`You feel {A:name} sliding backwards, dragging {A:his} hard {A:breasts.thickNipples} along your back as {A:he} positions {A:him}self behind you.`,
  [playerB, isLoving, aVisibleBreasts]);
doggyStyle.add(`{A:name} lets {A:his} {A:cock.thickCock} drag hotly across your back as {A:he} positions {A:him}self behind you.`,
  [playerB, isLoving, aVisibleCock]);
doggyStyle.add(`{A:name} squeezes your hips as {A:he} positions {A:him}self behind you, watching hungrily as you raise your ass into the air and spread your legs slightly.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} growls appreciatively as {A:he} positions {A:him}self behind you, gripping your hips hard.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} squeezes your hips as you raise your ass into the air, spreading your cheeks apart before slapping {A:his} {A:cock.thickCock} between them.`,
  [playerB, isLustful, aVisibleCock]);
doggyStyle.add(`{A:His} hard {A:breasts.thickNipples} drag along your back as {A:he} settles hungrily behind you.`,
  [playerB, isLustful, aVisibleBreasts]);
doggyStyle.add(`{A:name} watches as you raise your ass up into the air, positioning {A:him}self behind you.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name} positions {A:him}self behind you without comment as you raise your ass for {A:him}.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name} positions {A:him}self behind you, {A:his} {A:cock.thickCock} brushing against your thigh.`,
  [playerB, isAccepting, aVisibleCock]);



// A move to regular missionary: "b" turns from face down to face up beneath "a", who stays on top.
missionary.add(`{B:name} rolls onto {B:his} back, smiling up at you while parting {B:his} thighs invitingly.`,
  [playerA, isLoving]);
missionary.add(`You gently roll {B:name} onto {B:his} back. {B:He} lets out a soft moan as {B:he} spreads {B:his} legs open wide for you.`,
  [playerA, isLoving]);
missionary.add(`{B:name} turns over underneath you, {B:his} eyes full of warmth as {B:he} wraps {B:his} legs around your waist, pulling you tightly against {B:him}.`,
  [playerA, isLoving]);
missionary.add(`{B:name} slowly turns beneath you, {B:his} affectionate hands caressing your back as you settle between {B:his} spread legs.`,
  [playerA, isLoving]);
missionary.add(`{B:name} eagerly flips onto {B:his} back with obvious need, spreading {B:his} legs wide while grinding against you.`,
  [playerA, isLustful]);
missionary.add(`With an excited moan, {B:name} rolls face up, wrapping {B:his} legs tightly around you while pulling you close.`,
  [playerA, isLustful]);
missionary.add(`{B:name} bucks {B:his} hips as {B:he} turns over under you. With a deft maneuver {B:he} spreads {B:his} legs wide, wrapping them around you, inviting you inward.`,
  [playerA, isLustful]);
missionary.add(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, presenting {B:his} soaked {pussy} for you to use however you like.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`{B:name} writhes lustfully beneath you, spreading {B:his} legs wide and arching upward, presenting {B:his} {B:cock.thickCock} for you to use however you like.`,
  [playerA, isLustful, bVisibleCock]);
missionary.add(`{B:name} turns face up beneath you, spreading {B:his} legs obediently.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} shifts onto {B:his} back, allowing you to settle between {B:his} legs.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} slowly rolls onto {B:his} back, {B:his} legs parting just enough for you to push between them.`,
  [playerA, isAccepting]);
missionary.add(`Accepting the change of position without protest, {B:name} slowly turns over, parting {B:his} legs for you.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} quickly turns face up beneath you, parting {B:his} legs submissively.`,
  [playerA, isFearful]);
missionary.add(`Reaching down, you take hold of {B:name's} shoulder, turning {B:him} over underneath you as you push between {B:his} legs.`,
  [playerA, isFearful]);
missionary.add(`With {B:his} fearful eyes averted, {B:name} allows you to turn {B:him} over, {B:his} body tense yet compliant as you push yourself between {B:his} spread thighs.`,
  [playerA, isFearful]);
missionary.add(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees you spread {B:his} legs wide to expose {B:his} quivering {pussy} to your gaze.`,
  [playerA, isFearful, bVisiblePussy]);
missionary.add(`Fearful but obedient, {B:name} rolls over without resistance. With your hands on {B:his} knees you spread {B:his} legs wide to expose {B:his} throbbing {cock} to your gaze.`,
  [playerA, isFearful, bHardCock]);
missionary.add(`Grabbing onto {B:name's} legs, you forcefully turn {B:him} over underneath you.`,
  [playerA, isResistant]);
missionary.add(`{B:name} lets out an unhappy groan as you roll {B:him} onto {B:his} back. {B:He} tries to keep {B:his} thighs closed but fails as your strong hands spread {B:him} wide open.`,
  [playerA, isResistant]);
missionary.add(`Still trying to resist you, {B:name} struggles as you turn {B:him} face up, {B:his} body stiff as you push between {B:his} legs.`,
  [playerA, isResistant]);
missionary.add(`{B:name} lets out an unhappy huff as {B:he} turns over under you, shaking {B:his} head as you spread {B:his} legs wide open beneath you.`,
  [playerA, isResistant]);
missionary.add(`Angrily fighting back, {B:name} thrashes as you roll {B:him} over underneath you, {B:his} legs kicking wildly but uselessly as you spread them apart.`,
  [playerA, isViolent]);
missionary.add(`{B:name} bucks beneath you as you roll {B:him} over, forcing {B:his} thighs apart despite {B:his} efforts to stop you.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} body writhes in anger as you turn {B:him} over underneath you, but {B:he} can't stop you as you pull {B:his} legs wide open.`,
  [playerA, isViolent]);
missionary.add(`{B:name} kicks and twists as you turn {B:him} over, but {B:he} can't stop you from pushing your body between {B:his} wide spread legs.`,
  [playerA, isViolent]);
missionary.add(`{A:name} smiles down at you as you roll over onto your back.`,
  [playerB, isLoving]);
missionary.add(`You slowly turn face up, gazing up into {A:name's} smiling face as {A:he} shifts above you.`,
  [playerB, isLoving]);
missionary.add(`{A:name} arches {A:his} back as {A:he} lifts up slightly, letting you roll over underneath {A:him} before lowering {A:his} body back down on top of you.`,
  [playerB, isLoving]);
missionary.add(`You feel {A:name's} {cock} dangling over your legs as you turn over underneath {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`You can feel {A:name's} hard nipples brushing over your skin as you turn over underneath {A:him}.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name} smiles warmly, {A:his} {A:breasts.bigBreasts} dangling heavily above as you turn face up underneath {A:him}.`,
  [playerB, isLoving, aVisibleBreasts, aBigBreasts]);
missionary.add(`{A:name} smiles and licks {A:his} lips, watching as you turn over underneath {A:him}.`,
  [playerB, isLustful]);
missionary.add(`{A:name} moans, leaning down to let {A:his} nipples glide over your skin as you turn over underneath {A:him}.`,
  [playerB, isLustful, aVisibleBreasts]);
missionary.add(`{A:name} smiles and licks {A:his} lips as {A:he} watches you turn over, your {B:cock.sixInch} long {cock} slapping heavily against your thigh.`,
  [playerB, isLustful, bVisibleCock]);
missionary.add(`{A:name} moans, rubbing {A:his} {pussy} firmly over your {cock} as you position yourself underneath {A:him}.`,
  [playerB, isLustful, aVisiblePussy, bVisibleCock]);
missionary.add(`{A:name} grins as you turn over underneath {A:him}, your cocks slapping together as {A:he} lowers {A:his} body onto yours.`,
  [playerB, isLustful, aVisibleCock, bVisibleCock]);
missionary.add(`{A:name} watches as you turn over onto your back underneath {A:him}.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} raises {A:his} hips slightly, letting you roll over underneath {A:him}.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} nods as you roll beneath {A:him}, positioning {A:him}self between your spread legs.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} wiggles {A:his} hips, letting you turn over underneath {A:him} before leaning down against your chest.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} gasps slightly as you start to turn over underneath {A:him}.`,
  [playerB, isFearful]);
missionary.add(`{A:name} shudders and looks away as you roll over underneath {A:him}, clearly afraid of what's to come.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} eyes widen as you start to turn over underneath {A:him}, wrapping your legs around {A:his} waist to pull {A:him} in towards you.`,
  [playerB, isFearful, bNoCock]);
missionary.add(`{A:name's} eyes widen as you turn over underneath {A:him}, your {B:cock.sixInch} long {cock} rising up underneath {A:him}.`,
  [playerB, isFearful, bHardCock]);
missionary.add(`{A:name} frowns as {A:he} watches you turn over underneath {A:him}.`,
  [playerB, isResistant]);
missionary.add(`{A:name} huffs and looks away as you turn over underneath {A:him}, refusing to meet your eyes.`,
  [playerB, isResistant]);
missionary.add(`{A:name} frowns as {A:he} feels your {B:cock.bigCock} sliding across {A:his} thigh as you turn over underneath {A:him}.`,
  [playerB, isResistant, bVisibleCock]);
missionary.add(`{A:name} tries to back away as you turn over underneath {A:him}, but can't stop your flesh from brushing against {A:his} hard {A:breasts.inchLongNipples}.`,
  [playerB, isResistant, aVisibleBreasts]);
missionary.add(`{A:name} winces as {A:his} {cock} brushes against your leg while you turn over underneath {A:him}.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`You grab onto {A:name's} wrists as you turn over, keeping {A:him} on top of you.`,
  [playerB, isViolent]);
