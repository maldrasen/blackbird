const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const playerWasStanding = WeaverRequirements.playerWas('A');
const playerWasKneeling = WeaverRequirements.playerWas('B');

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

const rearrange = WeaverPackage('kneeling.rearrange');
const standing = WeaverPackage('kneeling.move-to-standing');
const kneelingService = WeaverPackage('kneeling.move-to-kneeling-service');

// First standing in front of second. Second on knees in front of first.
SexPosition.register('kneeling',{
  name: 'Kneeling',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.onlyPussyEaten, AssAlignment.fingered],
    },
    second: {
      breasts: [BreastAlignment.cock],
      mouth: [MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'standing', package:standing },
    { code:'kneeling-service', package:kneelingService },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} sinks to {B:his} knees in front of you with a warm smile, gazing up at you adoringly.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles onto {B:his} knees before you, {B:his} hands resting gently on your thighs.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} kneels down in front of you, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} settles and looks up at you.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} lowers {B:him}self to {B:his} knees, bringing {B:his} smiling face level with your {A:cock.thickCock}.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`{B:name} drops to {B:his} knees eagerly, {B:his} hungry eyes fixed on your crotch.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} sinks down in front of you with a needy moan, {B:his} hands sliding down your body on the way.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} kneels before you, {B:his} mouth already open as {B:he} eyes your {A:cock.bigHardCock}.`,
  [playerA, isLustful, aHardCock]);
rearrange.add(`{B:name} drops to {B:his} knees, licking {B:his} lips as {B:his} face comes level with your {pussy}.`,
  [playerA, isLustful, aVisiblePussy]);
rearrange.add(`{B:name} lowers {B:him}self onto {B:his} knees in front of you without complaint.`,
  [playerA, isAccepting]);
rearrange.add(`You press down on {B:name's} shoulder, and {B:he} sinks obediently to {B:his} knees.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} kneels before you without protest, settling back on {B:his} heels.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} knees, {B:his} face level with your {A:cock.thickCock}, waiting quietly.`,
  [playerA, isAccepting, aVisibleCock]);
rearrange.add(`{B:name} sinks to {B:his} knees nervously, {B:his} eyes flicking up to your face and quickly away.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} kneels down in front of you, {B:his} hands trembling on {B:his} thighs.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} lowers {B:him}self carefully to {B:his} knees, {B:his} whole body tense.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} kneels with a nervous swallow, your {A:cock.thickCock} hanging inches from {B:his} face.`,
  [playerA, isFearful, aVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} down, dropping onto {B:his} knees with poor grace.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} kneels in front of you, glaring up from under {B:his} brows.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} sinks down grudgingly, {B:his} arms crossed as {B:he} settles onto {B:his} knees.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} kneels reluctantly, turning {B:his} face away from your {A:cock.thickCock}.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you force {B:him} down, your hand heavy on {B:his} shoulder until {B:his} knees hit the floor.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you push {B:him} down onto {B:his} knees in front of you anyway.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls and claws at your wrist as you force {B:him} to {B:his} knees, holding {B:him} in place by the hair.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} twists in your grip as you force {B:him} down, your {A:cock.thickCock} level with {B:his} furious face.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`You sink to your knees in front of {A:name}, and {A:he} smiles down at you, brushing a fond hand through your hair.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} watches warmly as you settle onto your knees before {A:him}, {A:his} fingers tracing your cheek.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} hangs level with your face as you kneel before {A:him}, {A:his} eyes soft on yours.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} smiles down at you as you kneel, your face coming level with {A:his} {pussy}.`,
  [playerB, isLoving, aVisiblePussy]);
rearrange.add(`{A:name} groans in anticipation as you sink to your knees, {A:his} hand already cradling the back of your head.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} pulls you down by the shoulders, breathing hard as you settle onto your knees in front of {A:him}.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} twitches in anticipation as you lower yourself to your knees in front of {A:him}.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name} moans softly as you kneel, {A:his} soaked {pussy} right before your face.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`You lower yourself to your knees in front of {A:name}, and {A:he} watches without comment.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} stands still as you settle onto your knees before {A:him}.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} shifts {A:his} stance to give you room as you kneel down in front of {A:him}.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} hangs before your face as you settle onto your knees.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} tenses as you sink to your knees in front of {A:him}, {A:his} hands twitching at {A:his} sides.`,
  [playerB, isFearful]);
rearrange.add(`{A:name} watches you kneel with anxious eyes, {A:his} breath quick and shallow.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} holds still as you settle onto your knees before {A:him}.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles before your face as you kneel in front of {A:him}.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you kneel down in front of {A:him}, {A:his} hips shifting back until you take hold of them.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} looks away, standing stiffly as you settle onto your knees before {A:him}.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters something under {A:his} breath, {A:his} whole body rigid as you kneel in front of {A:him}.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} shifts {A:his} hips back reluctantly as you kneel, {A:his} {A:cock.thickCock} swaying out of easy reach until you pull {A:him} closer.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} tries to back away as you drop to your knees, but you grip {A:his} hips and hold {A:him} in front of you.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} shoves at your head as you kneel before {A:him}, but your grip on {A:his} thighs keeps {A:him} planted.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls and twists, but you wrap your arms around {A:his} legs, pinning {A:him} standing as you settle onto your knees.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles in your grip, held fast in front of your face.`,
  [playerB, isViolent, aVisibleCock]);

// Standing is symmetric, so the destination keys can't say who just rose from their knees. The playerWas
// requirements read the previousPosition context instead: "a" was the one standing in kneeling, "b" was the
// kneeler who now rises. The {A:}/{B:} tokens still assume the non-swapped edge, where kneeling's keys carry
// over unchanged — if a swapped edge to standing is ever added, this package's tokens will need revisiting.
standing.add(`{B:name} takes your offered hands and rises from {B:his} knees, settling warmly against you once {B:he} finds {B:his} feet.`,
  [playerWasStanding, isLoving]);
standing.add(`{B:name} climbs to {B:his} feet with a warm smile, {B:his} hands trailing up your body as {B:he} rises to face you.`,
  [playerWasStanding, isLoving]);
standing.add(`{B:name} rises from {B:his} knees, {B:his} {B:breasts.softBreasts} swaying as {B:he} straightens to stand in front of you.`,
  [playerWasStanding, isLoving, bVisibleBreasts]);
standing.add(`{B:name} stands with a soft smile, {B:his} {B:cock.thickCock} swaying as {B:he} rises to face you.`,
  [playerWasStanding, isLoving, bVisibleCock]);
standing.add(`{B:name} drags {B:him}self up your body, pressing close against you the moment {B:he} is on {B:his} feet.`,
  [playerWasStanding, isLustful]);
standing.add(`{B:name} rises with a needy moan, {B:his} hands roaming up your thighs and hips as {B:he} climbs to {B:his} feet.`,
  [playerWasStanding, isLustful]);
standing.add(`{B:name} barely reaches {B:his} feet before {B:he} is pressed against you, grinding {B:his} body along yours.`,
  [playerWasStanding, isLustful]);
standing.add(`{B:name's} {B:cock.bigHardCock} bobs as {B:he} surges up from {B:his} knees, pressing {B:him}self flush against you.`,
  [playerWasStanding, isLustful, bHardCock]);
standing.add(`{B:name} rises from {B:his} knees without comment, standing to face you.`,
  [playerWasStanding, isAccepting]);
standing.add(`{B:name} climbs to {B:his} feet and straightens up, waiting quietly in front of you.`,
  [playerWasStanding, isAccepting]);
standing.add(`{B:name} stands without protest, brushing off {B:his} knees as {B:he} faces you.`,
  [playerWasStanding, isAccepting]);
standing.add(`{B:name} rises and stands before you, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs.`,
  [playerWasStanding, isAccepting, bVisibleCock]);
standing.add(`{B:name} rises from {B:his} knees on unsteady legs, {B:his} eyes staying lowered as {B:he} stands before you.`,
  [playerWasStanding, isFearful]);
standing.add(`With a shaky breath, {B:name} climbs to {B:his} feet, {B:his} arms drawn in close.`,
  [playerWasStanding, isFearful]);
standing.add(`{B:name} stands hesitantly, flinching when you reach out to steady {B:him}.`,
  [playerWasStanding, isFearful]);
standing.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously rises to stand in front of you.`,
  [playerWasStanding, isFearful, bVisibleCock]);
standing.add(`{B:name} gets to {B:his} feet grudgingly, making a show of rubbing {B:his} knees as {B:he} stands.`,
  [playerWasStanding, isResistant]);
standing.add(`With a huff, {B:name} rises and crosses {B:his} arms, glowering at you.`,
  [playerWasStanding, isResistant]);
standing.add(`{B:name} climbs to {B:his} feet reluctantly, taking a half step back until you close the distance.`,
  [playerWasStanding, isResistant]);
standing.add(`{B:name} stands with obvious reluctance, {B:his} {B:cock.thickCock} swaying as {B:he} looks anywhere but at you.`,
  [playerWasStanding, isResistant, bVisibleCock]);
standing.add(`{B:name} lunges up from {B:his} knees trying to shove past you, but you catch {B:him} and hold {B:him} standing in front of you.`,
  [playerWasStanding, isViolent]);
standing.add(`{B:name} struggles as you haul {B:him} up by the arms, forced to stand facing you.`,
  [playerWasStanding, isViolent]);
standing.add(`{B:name} snarls as {B:he} rises, swinging at you, but you catch {B:his} wrists and pull {B:him} against your body.`,
  [playerWasStanding, isViolent]);
standing.add(`{B:name's} {B:cock.thickCock} swings as {B:he} twists in your grip, dragged up onto {B:his} feet.`,
  [playerWasStanding, isViolent, bVisibleCock]);
standing.add(`{A:name} offers you {A:his} hands, drawing you up from your knees and into {A:his} arms.`,
  [playerWasKneeling, isLoving]);
standing.add(`{A:name} steadies you warmly as you rise, brushing you off and pulling you close once you're standing.`,
  [playerWasKneeling, isLoving]);
standing.add(`{A:name's} {A:cock.thickCock} falls away from your face as you rise, {A:his} arms welcoming you up against {A:him}.`,
  [playerWasKneeling, isLoving, aVisibleCock]);
standing.add(`You rise past {A:name's} {A:breasts.softBreasts} as {A:he} draws you up, settling you against {A:him} face to face.`,
  [playerWasKneeling, isLoving, aVisibleBreasts]);
standing.add(`{A:name} pulls you up from your knees impatiently, dragging your body along {A:his} as you rise.`,
  [playerWasKneeling, isLustful]);
standing.add(`{A:name} hauls you to your feet with a hungry moan, {A:his} hands sliding down your back to your ass.`,
  [playerWasKneeling, isLustful]);
standing.add(`{A:name} crowds against you the moment you stand, {A:his} mouth finding your throat.`,
  [playerWasKneeling, isLustful]);
standing.add(`{A:name's} {A:cock.bigHardCock} drags up your body as {A:he} pulls you from your knees and flush against {A:him}.`,
  [playerWasKneeling, isLustful, aHardCock]);
standing.add(`You rise from your knees, and {A:name} steps back just enough to give you room to stand.`,
  [playerWasKneeling, isAccepting]);
standing.add(`{A:name} watches without comment as you climb to your feet in front of {A:him}.`,
  [playerWasKneeling, isAccepting]);
standing.add(`{A:name} steadies you with a hand on your arm as you rise, letting go once you're standing.`,
  [playerWasKneeling, isAccepting]);
standing.add(`{A:name's} {A:cock.thickCock} hangs between {A:his} legs as {A:he} waits for you to rise and face {A:him}.`,
  [playerWasKneeling, isAccepting, aVisibleCock]);
standing.add(`{A:name} takes a nervous half step back as you rise from your knees to face {A:him}.`,
  [playerWasKneeling, isFearful]);
standing.add(`{A:name} watches you climb to your feet with anxious eyes, {A:his} arms drawn in close.`,
  [playerWasKneeling, isFearful]);
standing.add(`With a shaky breath, {A:name} holds {A:his} ground as you rise to stand in front of {A:him}.`,
  [playerWasKneeling, isFearful]);
standing.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as you rise past it to stand facing {A:him}.`,
  [playerWasKneeling, isFearful, aVisibleCock]);
standing.add(`{A:name} makes no move to help as you climb to your feet, grumbling as you rise to face {A:him}.`,
  [playerWasKneeling, isResistant]);
standing.add(`With a huff, {A:name} steps back from you as you stand, {A:his} arms crossing.`,
  [playerWasKneeling, isResistant]);
standing.add(`{A:name} looks away pointedly as you rise from your knees to stand in front of {A:him}.`,
  [playerWasKneeling, isResistant]);
standing.add(`{A:name's} {A:cock.thickCock} sways as {A:he} shifts back reluctantly, letting you rise to your feet.`,
  [playerWasKneeling, isResistant, aVisibleCock]);
standing.add(`{A:name} tries to shove you back down as you rise, but you catch {A:his} wrists and stand to face {A:him}.`,
  [playerWasKneeling, isViolent]);
standing.add(`{A:name} backs away as you climb to your feet, but you close the distance and hold {A:him} in place.`,
  [playerWasKneeling, isViolent]);
standing.add(`{A:name} swings at you as you rise, but you catch {A:his} arm and pull {A:him} hard against you.`,
  [playerWasKneeling, isViolent]);
standing.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles in your grip, held standing chest to chest with you.`,
  [playerWasKneeling, isViolent, aVisibleCock]);

// Moving into kneeling-service, "a" stays standing and "b" stays on their knees; either "a" turns around or "b"
// circles behind, ending with "b's" face at "a's" ass.
kneelingService.add(`You turn around in front of {B:name}, and {B:he} presses an affectionate kiss to each cheek of your ass as {B:he} settles in close behind you.`,
  [playerA, isLoving]);
kneelingService.add(`{B:name} shuffles around behind you on {B:his} knees, {B:his} warm hands sliding up the backs of your thighs as {B:he} nuzzles into your ass.`,
  [playerA, isLoving]);
kneelingService.add(`{B:name} circles behind you on {B:his} knees, {B:his} {B:breasts.softBreasts} brushing your legs as {B:he} presses {B:his} face to your ass.`,
  [playerA, isLoving, bVisibleBreasts]);
kneelingService.add(`Your {A:cock.thickCock} swings past {B:name's} smiling face as you turn around, {B:his} lips finding your ass instead.`,
  [playerA, isLoving, aVisibleCock]);
kneelingService.add(`{B:name} spins you around by the hips with a hungry moan, burying {B:his} face between your cheeks.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name} scrambles around behind you on {B:his} knees, {B:his} hands kneading your ass as {B:he} presses {B:his} face into it.`,
  [playerA, isLustful]);
kneelingService.add(`You turn around, and {B:name} moans with need, dragging your hips back against {B:his} eager mouth.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name's} {B:cock.bigHardCock} bobs between {B:his} thighs as {B:he} shuffles eagerly behind you, {B:his} face pressing into your ass.`,
  [playerA, isLustful, bHardCock]);
kneelingService.add(`You turn around in front of {B:name}, and {B:he} presses {B:his} face to your ass without complaint.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} shuffles around behind you on {B:his} knees, settling {B:his} mouth against your ass without protest.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} waits quietly as you turn, {B:his} hands settling on your hips as {B:his} face meets your ass.`,
  [playerA, isAccepting]);
kneelingService.add(`Your {A:cock.thickCock} sways as you turn around, {B:name} settling in behind you without a word.`,
  [playerA, isAccepting, aVisibleCock]);
kneelingService.add(`You turn around, and {B:name} hesitates a moment before pressing {B:his} face nervously between your cheeks.`,
  [playerA, isFearful]);
kneelingService.add(`{B:name} shuffles behind you on trembling knees, {B:his} breath unsteady against your ass.`,
  [playerA, isFearful]);
kneelingService.add(`With a shaky breath, {B:name} settles in behind you, {B:his} hands hovering uncertainly at your hips.`,
  [playerA, isFearful]);
kneelingService.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} nervously presses {B:his} face to your ass.`,
  [playerA, isFearful, bVisibleCock]);
kneelingService.add(`You turn around and pull {B:name's} face to your ass, feeling {B:him} grumble against your skin.`,
  [playerA, isResistant]);
kneelingService.add(`{B:name} shuffles behind you with a huff, pressing {B:his} face grudgingly between your cheeks.`,
  [playerA, isResistant]);
kneelingService.add(`{B:name} mutters under {B:his} breath as you turn, {B:his} complaints muffled as you pull {B:his} mouth against your ass.`,
  [playerA, isResistant]);
kneelingService.add(`{B:name} settles behind you reluctantly, {B:his} {B:cock.thickCock} hanging between {B:his} thighs as {B:he} presses {B:his} face unwillingly to your ass.`,
  [playerA, isResistant, bVisibleCock]);
kneelingService.add(`{B:name} tries to twist away as you turn and drag {B:his} face against your ass, your grip firm in {B:his} hair.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name} claws at your thighs as you haul {B:him} around behind you, forcing {B:his} face between your cheeks.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name} snarls into your skin as you pin {B:his} head in place, {B:his} struggles doing nothing to free {B:him}.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name's} {B:cock.thickCock} swings between {B:his} thighs as {B:he} fights your grip, {B:his} face forced against your ass.`,
  [playerA, isViolent, bVisibleCock]);
kneelingService.add(`{A:name} turns around in front of you with a warm glance over {A:his} shoulder, presenting {A:his} ass to your mouth.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name} turns and eases {A:his} hips back, sighing contentedly as your face presses between {A:his} cheeks.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name's} {A:cock.thickCock} swings past your face as {A:he} turns around, {A:his} ass settling warmly against your mouth.`,
  [playerB, isLoving, aVisibleCock]);
kneelingService.add(`You shuffle around behind {A:name} on your knees, and {A:he} reaches back to stroke your hair as your face finds {A:his} ass.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name} spins around eagerly and pushes {A:his} ass back against your face, moaning at the first touch of your mouth.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name} turns with a needy sound, {A:his} hands pulling your face hard between {A:his} cheeks.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name's} {A:cock.bigHardCock} bobs as {A:he} turns around, grinding {A:his} ass back against your mouth.`,
  [playerB, isLustful, aHardCock]);
kneelingService.add(`{A:name} turns and bends slightly, {A:his} soaked {pussy} visible beneath {A:his} ass as {A:he} presses back against your face.`,
  [playerB, isLustful, aVisiblePussy]);
kneelingService.add(`{A:name} turns around without comment, letting you press your face to {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`You shuffle around behind {A:name} on your knees, and {A:he} holds still as your face settles against {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name} turns and waits, {A:his} hands loose at {A:his} sides as you press your mouth between {A:his} cheeks.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways as {A:he} turns around for you, {A:his} ass meeting your face.`,
  [playerB, isAccepting, aVisibleCock]);
kneelingService.add(`{A:name} turns around slowly, {A:his} whole body tense as you press your face between {A:his} cheeks.`,
  [playerB, isFearful]);
kneelingService.add(`{A:name} shivers as you shuffle around behind {A:him}, {A:his} breath catching when your mouth meets {A:his} ass.`,
  [playerB, isFearful]);
kneelingService.add(`With a shaky breath, {A:name} turns and holds still, {A:his} hands curled nervously at {A:his} sides.`,
  [playerB, isFearful]);
kneelingService.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} nervously turns, presenting {A:his} ass to your mouth.`,
  [playerB, isFearful, aVisibleCock]);
kneelingService.add(`{A:name} grumbles as you turn {A:him} around by the hips and press your face between {A:his} cheeks.`,
  [playerB, isResistant]);
kneelingService.add(`With a huff, {A:name} turns around, standing stiff as your mouth finds {A:his} ass.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name} mutters something sour as you shuffle behind {A:him}, {A:his} body rigid as your face presses into {A:his} ass.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways as {A:he} reluctantly turns around, letting your face settle against {A:his} ass.`,
  [playerB, isResistant, aVisibleCock]);
kneelingService.add(`{A:name} tries to step away as you turn {A:him} around, but your grip on {A:his} hips drags {A:his} ass back against your face.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name} snarls and twists, but you wrap your arms around {A:his} thighs, pinning {A:him} as you bury your face between {A:his} cheeks.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name} claws back at your head, but you hold {A:his} hips fast, your mouth pressed hard against {A:his} ass.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles, unable to pull {A:his} ass free of your face.`,
  [playerB, isViolent, aVisibleCock]);
