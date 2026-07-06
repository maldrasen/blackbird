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

const rearrange = WeaverPackage('face-sitting.rearrange');
const cowgirl = WeaverPackage('face-sitting.move-to-cowgirl');
const lapSitting = WeaverPackage('face-sitting.move-to-lap-sitting');
const faceSittingReversed = WeaverPackage('face-sitting.move-to-face-sitting-reversed');

// First sitting on second's face, facing forward. Cock sucking could
// technically be possible from this position, but it would require too many
// checks for things like throat depth, and the angle is weird.
SexPosition.register('face-sitting',{
  name: 'Face Sitting',

  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'cowgirl', package:cowgirl, swap:true },
    { code:'lap-sitting', package:lapSitting, swap:true },
    { code:'face-sitting-reversed', package:faceSittingReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} settles onto {B:his} back with a warm smile, {B:his} hands resting gently on your thighs as you lower yourself over {B:his} upturned face.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies back and guides you up {B:his} body by the hips, gazing up at you affectionately as you settle over {B:his} face.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles onto {B:his} back, {B:his} {B:cock.thickCock} resting warmly against {B:his} stomach as you swing a knee over {B:his} face and lower yourself down.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} lies back with a contented sigh, {B:his} {B:breasts.softBreasts} settling against {B:his} chest as you straddle {B:his} face.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} drops eagerly onto {B:his} back, grabbing your hips and hauling you up to straddle {B:his} face with a hungry moan.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} lies back with {B:his} tongue already out, moaning with need as you lower yourself onto {B:his} waiting mouth.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} moans hungrily at the sight of your {pussy} hovering over {B:his} face, pulling your hips down impatiently.`,
  [playerA, isLustful, aVisiblePussy]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} bobs against {B:his} stomach as {B:he} eagerly lies back, pulling you up to straddle {B:his} face.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} lies back without complaint, holding still as you climb up to straddle {B:his} face.`,
  [playerA, isAccepting]);
rearrange.add(`You press {B:name} down onto {B:his} back, and {B:he} lets you settle over {B:his} face without protest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies down and waits quietly as you swing a leg over {B:his} head and settle into place.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} back, {B:his} {B:cock.thickCock} lying plainly against {B:his} stomach, as you lower yourself over {B:his} face.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} lies back nervously, {B:his} breath quick and shallow as you swing a leg over {B:his} face.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles onto {B:his} back, tensing as your thighs frame {B:his} face.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} lies down beneath you without a word, {B:his} whole body tense as you lower yourself over {B:his} face.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} stomach as {B:he} nervously lies back beneath you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} down onto {B:his} back, and you settle over {B:his} scowling face regardless.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies back, clearly unhappy as you lower yourself onto {B:his} face.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} mutters under {B:his} breath as {B:he} settles beneath you, holding grudgingly still as you lower yourself onto {B:his} face.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts reluctantly beneath you, {B:his} {B:cock.thickCock} lying against {B:his} stomach as you straddle {B:his} face.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you shove {B:him} down onto {B:his} back, pinning {B:his} arms beneath your knees as you force yourself down over {B:his} face.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you push {B:him} flat and straddle {B:his} face anyway, your weight muffling {B:his} protests.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls and twists beneath you, but you hold {B:his} head still between your thighs as you settle over {B:his} face.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings as {B:he} bucks beneath you, unable to throw you off as you settle over {B:his} face.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`You lie back, and {A:name} climbs over you with a warm smile, gazing down at you as {A:he} gently lowers {A:him}self onto your face.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} straddles your head with gentle care, brushing your hair back from your forehead before settling down onto your mouth.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} settles affectionately over your face, {A:his} {A:cock.thickCock} hanging above you as {A:he} lowers {A:him}self down.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`You gaze up at {A:name} as {A:he} settles over your face, {A:his} {A:breasts.softBreasts} swaying gently above you.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} pushes you onto your back with a hungry grin, wasting no time in climbing up to straddle your face.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans with need as {A:he} settles over your face, grinding down against your mouth almost immediately.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} soaked {pussy} hovers over your mouth for only a moment before {A:he} lowers {A:him}self down with a needy moan.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} bobs above your face as {A:he} settles down eagerly over your mouth.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`You lie back, and {A:name} climbs over your face without comment, settling down onto your mouth.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} straddles your head without protest, lowering {A:him}self into place.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} swings a leg over your head and settles down, letting you take {A:his} weight without a word.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles over your face without complaint, {A:his} {A:cock.thickCock} hanging above you.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} climbs over your face nervously, {A:his} thighs trembling on either side of your head as {A:he} hesitantly lowers {A:him}self.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} hovers over your face, only settling down when you pull gently at {A:his} hips.`,
  [playerB, isFearful]);
rearrange.add(`{A:name} settles onto your face hesitantly, {A:his} whole body tense, ready to pull away at any moment.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles above your face as {A:he} nervously lowers {A:him}self down.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you pull {A:him} up to straddle your face, lowering {A:him}self with obvious reluctance.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} settles over your face, clearly unhappy about the whole arrangement.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters something under {A:his} breath as {A:he} lowers {A:him}self onto your face, every movement grudging.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} reluctantly swings a leg over your head, {A:his} {A:cock.thickCock} swaying as {A:he} settles unhappily onto your face.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} thrashes as you drag {A:him} up your body, but your grip on {A:his} hips forces {A:him} down onto your face anyway.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} struggles and twists, but you haul {A:his} hips down onto your face regardless.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls, {A:his} thighs clamping around your head as {A:he} fights your grip, but you hold {A:him} firmly in place.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} swings wildly as {A:he} struggles, unable to stop you from pulling {A:him} down onto your face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into cowgirl, "a" is always the one lying on their back (was being sat on in face-sitting), while "b" is
// the rider who slides back off "a's" face and settles astride their hips.
cowgirl.add(`{B:name} lifts off your face with a warm smile, sliding back down your body until {B:he} settles astride your hips.`,
  [playerA, isLoving]);
cowgirl.add(`{B:name} eases back from your mouth, trailing a fond hand down your chest as {B:he} settles astride your hips, smiling down at you.`,
  [playerA, isLoving]);
cowgirl.add(`{B:name} slides back down your body, {B:his} {B:cock.thickCock} dragging warmly along your chest before {B:he} settles astride your hips.`,
  [playerA, isLoving, bVisibleCock]);
cowgirl.add(`{B:name} smiles down at you as {B:he} slides back, {B:his} {B:breasts.softBreasts} swaying gently with the motion as {B:he} settles onto your hips.`,
  [playerA, isLoving, bVisibleBreasts]);
cowgirl.add(`{B:name} grinds against your mouth one last time before sliding back down your body, settling astride your hips with a hungry grin.`,
  [playerA, isLustful]);
cowgirl.add(`With a needy moan, {B:name} slides off your face and scoots back, already rocking as {B:he} settles astride your hips.`,
  [playerA, isLustful]);
cowgirl.add(`{B:name} lifts {B:his} soaked {pussy} from your mouth and slides back, leaving a wet trail down your chest as {B:he} settles astride your hips.`,
  [playerA, isLustful, bVisiblePussy]);
cowgirl.add(`{B:name's} {B:cock.bigHardCock} drags down your chest as {B:he} slides back eagerly, settling astride your hips.`,
  [playerA, isLustful, bHardCock]);
cowgirl.add(`{B:name} lifts off your face and slides back without comment, settling astride your hips.`,
  [playerA, isAccepting]);
cowgirl.add(`{B:name} eases back down your body, taking {B:his} place astride your hips without protest.`,
  [playerA, isAccepting]);
cowgirl.add(`{B:name} shifts {B:his} weight off your face and scoots down, settling quietly onto your hips.`,
  [playerA, isAccepting]);
cowgirl.add(`{B:name} slides back down your body without complaint, {B:his} {B:cock.thickCock} coming to rest against your stomach as {B:he} settles onto your hips.`,
  [playerA, isAccepting, bVisibleCock]);
cowgirl.add(`{B:name} climbs off your face nervously, trembling slightly as {B:he} slides back to settle astride your hips.`,
  [playerA, isFearful]);
cowgirl.add(`With a shaky breath, {B:name} slides back down your body, avoiding your eyes as {B:he} settles onto your hips.`,
  [playerA, isFearful]);
cowgirl.add(`{B:name} eases back hesitantly, {B:his} thighs trembling against your sides as {B:he} settles astride your hips.`,
  [playerA, isFearful]);
cowgirl.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously slides back to straddle your hips.`,
  [playerA, isFearful, bVisibleCock]);
cowgirl.add(`{B:name} grumbles as you guide {B:him} back off your face, reluctantly settling astride your hips.`,
  [playerA, isResistant]);
cowgirl.add(`With a huff, {B:name} slides back down your body, clearly unhappy as {B:he} settles onto your hips.`,
  [playerA, isResistant]);
cowgirl.add(`{B:name} shifts back with obvious reluctance, jaw tight as {B:he} settles astride your hips.`,
  [playerA, isResistant]);
cowgirl.add(`{B:name} settles reluctantly onto your hips, {B:his} {B:cock.thickCock} swaying as {B:he} shifts grudgingly into place.`,
  [playerA, isResistant, bVisibleCock]);
cowgirl.add(`{B:name} tries to wrench free as you drag {B:him} back down your body, but your grip forces {B:him} astride your hips.`,
  [playerA, isViolent]);
cowgirl.add(`{B:name} thrashes as you haul {B:him} off your face, pinning {B:his} hips down astride your own.`,
  [playerA, isViolent]);
cowgirl.add(`{B:name} struggles the whole way down, but you hold {B:him} firmly, forcing {B:him} to settle astride your hips.`,
  [playerA, isViolent]);
cowgirl.add(`{B:name's} {B:cock.thickCock} swings as {B:he} fights your grip, dragged back down to straddle your hips.`,
  [playerA, isViolent, bVisibleCock]);
cowgirl.add(`You lift off {A:name's} face and slide back down {A:his} body, and {A:he} smiles warmly up at you as you settle astride {A:his} hips.`,
  [playerB, isLoving]);
cowgirl.add(`{A:name} presses a last kiss to your thigh as you rise off {A:his} face, {A:his} hands guiding you gently down to settle astride {A:his} hips.`,
  [playerB, isLoving]);
cowgirl.add(`You slide back down {A:name's} body, {A:his} {A:cock.thickCock} resting warmly against your stomach as {A:he} gazes up at you.`,
  [playerB, isLoving, aVisibleCock]);
cowgirl.add(`{A:name} gazes up at you affectionately as you slide back down {A:his} body, {A:his} {A:breasts.softBreasts} rising and falling gently beneath you.`,
  [playerB, isLoving, aVisibleBreasts]);
cowgirl.add(`{A:name} licks {A:his} lips as you lift off {A:his} face, gripping your hips hungrily and pulling you down astride {A:him}.`,
  [playerB, isLustful]);
cowgirl.add(`{A:name} moans with need as you slide back down {A:his} body, {A:his} hips already rocking up as you settle astride them.`,
  [playerB, isLustful]);
cowgirl.add(`{A:name's} {A:cock.bigHardCock} presses up against you the moment you settle astride {A:his} hips, {A:his} eyes dark with want.`,
  [playerB, isLustful, aHardCock]);
cowgirl.add(`{A:name} grinds {A:his} soaked {pussy} up against you as you settle astride {A:his} hips, moaning hungrily.`,
  [playerB, isLustful, aVisiblePussy]);
cowgirl.add(`You lift off {A:name's} face and slide back, and {A:he} watches quietly as you settle astride {A:his} hips.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} lies still without comment as you slide down {A:his} body, settling onto {A:his} hips.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} wipes {A:his} mouth and rests {A:his} hands loosely on your thighs as you shift back onto {A:his} hips.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name's} {A:cock.thickCock} rests against your stomach as you slide back and settle astride {A:his} hips.`,
  [playerB, isAccepting, aVisibleCock]);
cowgirl.add(`{A:name} catches {A:his} breath nervously as you lift off {A:his} face, {A:his} body tense as you slide back onto {A:his} hips.`,
  [playerB, isFearful]);
cowgirl.add(`{A:name} watches you anxiously as you slide down {A:his} body, {A:his} hands trembling at {A:his} sides as you settle astride {A:his} hips.`,
  [playerB, isFearful]);
cowgirl.add(`With a shaky breath, {A:name} lies still beneath you, unsure what to expect as you settle astride {A:his} hips.`,
  [playerB, isFearful]);
cowgirl.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as you slide back down {A:his} body, settling astride {A:his} hips.`,
  [playerB, isFearful, aVisibleCock]);
cowgirl.add(`{A:name} grumbles as you lift off {A:his} face, turning {A:his} head aside as you slide back to straddle {A:his} hips.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} huffs and wipes {A:his} mouth with the back of {A:his} hand, scowling as you settle astride {A:his} hips.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} shifts unhappily beneath you as you slide down {A:his} body, {A:his} jaw tight as you settle onto {A:his} hips.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} stiffens as {A:his} {A:cock.thickCock} presses against you, clearly unhappy as you settle astride {A:his} hips.`,
  [playerB, isResistant, aVisibleCock]);
cowgirl.add(`{A:name} bucks beneath you the moment you lift off {A:his} face, but you slide back and pin {A:his} hips beneath your weight.`,
  [playerB, isViolent]);
cowgirl.add(`{A:name} tries to twist free as you slide down {A:his} body, but you settle astride {A:his} hips, pinning {A:him} down.`,
  [playerB, isViolent]);
cowgirl.add(`{A:name} snarls and thrashes, but your weight settles firmly across {A:his} hips, holding {A:him} in place.`,
  [playerB, isViolent]);
cowgirl.add(`{A:name's} {A:cock.thickCock} swings as {A:he} bucks beneath you, unable to dislodge you as you settle astride {A:his} hips.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into lap-sitting, "a" is always the one sitting up beneath (was being sat on in face-sitting), while "b"
// slides down off "a's" face to straddle their lap, still facing them.
lapSitting.add(`{B:name} lifts off your face and slides down your body as you sit up, settling into your lap and wrapping {B:his} arms warmly around your neck.`,
  [playerA, isLoving]);
lapSitting.add(`As you sit up, {B:name} slips down into your lap with a warm smile, resting {B:his} forehead against yours.`,
  [playerA, isLoving]);
lapSitting.add(`{B:name} settles into your lap as you sit up, {B:his} {B:breasts.softBreasts} pressing warmly against your chest.`,
  [playerA, isLoving, bVisibleBreasts]);
lapSitting.add(`{B:name} slides down into your lap with a soft smile, {B:his} {B:cock.thickCock} coming to rest between your bodies.`,
  [playerA, isLoving, bVisibleCock]);
lapSitting.add(`{B:name} slides down your body with a needy moan as you sit up, grinding down into your lap the moment {B:he} settles.`,
  [playerA, isLustful]);
lapSitting.add(`The moment you sit up, {B:name} is in your lap, {B:his} legs locking around your waist as {B:he} presses hungrily against you.`,
  [playerA, isLustful]);
lapSitting.add(`{B:name} settles into your lap, {B:his} soaked {pussy} grinding down against you as {B:he} moans with need.`,
  [playerA, isLustful, bVisiblePussy]);
lapSitting.add(`{B:name's} {B:cock.bigHardCock} presses against your stomach as {B:he} slides eagerly down into your lap.`,
  [playerA, isLustful, bHardCock]);
lapSitting.add(`{B:name} lifts off your face and slides down without comment, settling into your lap as you sit up.`,
  [playerA, isAccepting]);
lapSitting.add(`As you sit upright, {B:name} shifts down your body and settles into your lap without protest.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} settles into your lap quietly, {B:his} hands resting on your shoulders.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} settles into your lap without complaint, {B:his} {B:cock.thickCock} resting between your bodies.`,
  [playerA, isAccepting, bVisibleCock]);
lapSitting.add(`{B:name} slides down into your lap nervously as you sit up, {B:his} eyes dropping the moment they meet yours.`,
  [playerA, isFearful]);
lapSitting.add(`With a shaky breath, {B:name} settles into your lap, {B:his} body tense against you now that you're face to face.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name} perches stiffly in your lap, {B:his} hands trembling where they rest against your chest.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously settles into your lap.`,
  [playerA, isFearful, bVisibleCock]);
lapSitting.add(`{B:name} grumbles as you sit up and pull {B:him} down into your lap, {B:his} head turned to keep from facing you.`,
  [playerA, isResistant]);
lapSitting.add(`With a huff, {B:name} settles into your lap, arms crossed and eyes fixed anywhere but on you.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} shifts grudgingly down into your lap, sitting stiff and unhappy in your arms.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} settles reluctantly into your lap, {B:his} {B:cock.thickCock} caught between your bodies as {B:he} looks away.`,
  [playerA, isResistant, bVisibleCock]);
lapSitting.add(`{B:name} thrashes as you sit up and drag {B:him} into your lap, your arms locking around {B:his} waist to hold {B:him} there.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} struggles, but you haul {B:him} down into your lap anyway, pinning {B:his} arms to {B:his} sides.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} snarls and pushes against your chest, but your grip on {B:his} hips keeps {B:him} planted firmly in your lap.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name's} {B:cock.thickCock} is caught between your bodies as {B:he} fights your grip, held fast in your lap.`,
  [playerA, isViolent, bVisibleCock]);
lapSitting.add(`You lift off {A:name's} face and slide down as {A:he} sits up, gathering you into {A:his} lap with a warm smile.`,
  [playerB, isLoving]);
lapSitting.add(`{A:name} sits up beneath you, wrapping {A:his} arms around you as you settle into {A:his} lap, {A:his} forehead resting gently against yours.`,
  [playerB, isLoving]);
lapSitting.add(`{A:name} pulls you close as you settle into {A:his} lap, {A:his} {A:breasts.softBreasts} pressing warmly against your chest.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSitting.add(`{A:name} smiles softly as you slide down into {A:his} lap, {A:his} {A:cock.thickCock} coming to rest between your bodies.`,
  [playerB, isLoving, aVisibleCock]);
lapSitting.add(`{A:name} surges upright the moment you lift off {A:his} face, dragging you down into {A:his} lap with a hungry moan.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} sits up quickly, {A:his} hands gripping your ass as you slide down to straddle {A:his} lap.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} pulls you flush against {A:him} as you settle into {A:his} lap, grinding up against you with a low groan.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name's} {A:cock.bigHardCock} presses up against you as {A:he} pulls you eagerly down into {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
lapSitting.add(`You slide down as {A:name} sits up, settling into {A:his} lap as {A:he} steadies you without comment.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} sits up beneath you and lets you settle into {A:his} lap, {A:his} hands resting loosely on your hips.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} watches quietly as you slide down {A:his} body and settle astride {A:his} lap.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name's} {A:cock.thickCock} rests between your bodies as you settle into {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
lapSitting.add(`{A:name} sits up hesitantly beneath you, {A:his} hands hovering uncertainly at your sides as you settle into {A:his} lap.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name} tenses as you slide down into {A:his} lap, {A:his} breath quick and shallow with your faces suddenly so close.`,
  [playerB, isFearful]);
lapSitting.add(`With a shaky breath, {A:name} sits up, holding very still as you settle astride {A:his} lap.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between your bodies as {A:he} nervously lets you settle into {A:his} lap.`,
  [playerB, isFearful, aVisibleCock]);
lapSitting.add(`{A:name} grumbles as you pull {A:him} upright, sitting stiffly as you settle into {A:his} lap.`,
  [playerB, isResistant]);
lapSitting.add(`With a huff, {A:name} sits up, {A:his} arms staying pointedly at {A:his} sides as you settle astride {A:his} lap.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name} turns {A:his} face away as you slide down into {A:his} lap, clearly unhappy with how close you are.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name's} {A:cock.thickCock} shifts between your bodies as {A:he} reluctantly lets you settle into {A:his} lap.`,
  [playerB, isResistant, aVisibleCock]);
lapSitting.add(`{A:name} thrashes as you drag {A:him} upright, but you lock your legs around {A:his} waist, settling into {A:his} lap despite {A:his} struggling.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} tries to shove you away as {A:he} comes upright, but your weight settles firmly into {A:his} lap regardless.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} snarls and pushes at your shoulders, but you stay planted astride {A:his} lap, your legs locked around {A:him}.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name's} {A:cock.thickCock} is trapped between your bodies as {A:he} struggles, unable to force you out of {A:his} lap.`,
  [playerB, isViolent, aVisibleCock]);

faceSittingReversed.add(`[Shift to face sitting reversed with player on top with partner attitude {@attitude}]`, [playerA]);
faceSittingReversed.add(`[Shift to face sitting reversed with player on bottom with partner attitude {@attitude}]`, [playerB]);
