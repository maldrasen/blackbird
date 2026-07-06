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

const rearrange = WeaverPackage('lap-sitting.rearrange');
const faceSitting = WeaverPackage('lap-sitting.move-to-face-sitting');
const lapSittingReversed = WeaverPackage('lap-sitting.move-to-lap-sitting-reversed');
const missionary = WeaverPackage('lap-sitting.move-to-missionary');
const standing = WeaverPackage('lap-sitting.move-to-standing');

// Second straddling First's lap facing them.
SexPosition.register('lap-sitting',{
  name: 'Lap Sitting',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'face-sitting', package:faceSitting, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed },
    { code:'missionary', package:missionary, swap:true },
    { code:'standing', package:standing },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} climbs into your lap with a warm smile, straddling your thighs and draping {B:his} arms loosely around your neck.`,
  [playerA, isLoving]);
rearrange.add(`You sit back as {B:name} settles astride your lap, {B:his} forehead coming to rest gently against yours.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles into your lap facing you, {B:his} {B:breasts.softBreasts} pressing warmly against your chest.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} straddles your lap with a soft smile, {B:his} {B:cock.thickCock} coming to rest against your stomach.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} pushes you down to sitting and climbs eagerly into your lap, grinding down against you with a needy moan.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} straddles your lap hungrily, {B:his} legs locking around your waist as {B:he} presses {B:him}self flush against you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} settles into your lap, {B:his} soaked {pussy} grinding down against you as {B:he} moans into your ear.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} presses against your stomach as {B:he} climbs eagerly astride your lap.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} climbs into your lap without complaint, settling astride your thighs to face you.`,
  [playerA, isAccepting]);
rearrange.add(`You sit back, and {B:name} settles onto your lap without protest, {B:his} hands resting on your shoulders.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} straddles your lap quietly, letting you take {B:his} weight.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles into your lap facing you, {B:his} {B:cock.thickCock} resting between your bodies.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} climbs into your lap nervously, {B:his} eyes dropping the moment they meet yours.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles astride your thighs, {B:his} hands trembling where they rest on your chest.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} holds {B:him}self carefully still in your lap, hardly daring to lean {B:his} weight against you.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously settles into your lap.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you pull {B:him} down astride your lap, {B:his} head turned to avoid facing you.`,
  [playerA, isResistant]);
rearrange.add(`With a put-upon sigh, {B:name} swings a leg over yours and sits, {B:his} spine rigid with reluctance.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} settles grudgingly onto your thighs, sitting stiff and unhappy in your arms.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} straddles your lap reluctantly, {B:his} {B:cock.thickCock} caught between your bodies as {B:he} looks away.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you drag {B:him} astride your lap, your arms locking around {B:his} waist to keep {B:him} there.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} shoves at your chest, but you haul {B:him} down into your lap, holding {B:him} tight against you.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls and twists in your grip, forced to straddle your thighs as you pin {B:him} to your chest.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} fights your hold, wrenched down astride your lap.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`{A:name} sits back and welcomes you into {A:his} lap, {A:his} arms circling your waist as you straddle {A:his} thighs.`,
  [playerB, isLoving]);
rearrange.add(`You climb into {A:name's} lap, and {A:he} smiles warmly, resting {A:his} forehead against yours as you settle.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} pulls you gently into {A:his} lap, {A:his} {A:breasts.softBreasts} pressing soft against your chest as you settle facing {A:him}.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} smiles as you settle astride {A:his} lap, {A:his} {A:cock.thickCock} resting warmly between your bodies.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} pulls you into {A:his} lap with a hungry growl, {A:his} hands gripping your ass as you settle astride {A:him}.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} grinds up against you the moment you settle into {A:his} lap, {A:his} breath hot against your throat.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans as you climb into {A:his} lap, {A:his} hips already rocking up beneath you.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} presses up against you as {A:he} drags you eagerly astride {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`You climb into {A:name's} lap, and {A:he} steadies you without comment as you settle astride {A:his} thighs.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} sits back and lets you settle into {A:his} lap, {A:his} hands resting loosely on your hips.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} takes your weight without protest as you straddle {A:his} lap, facing {A:him}.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests between your bodies as you settle into {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} tenses as you climb into {A:his} lap, {A:his} hands hovering uncertainly at your sides.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} breath comes quick and shallow as you settle astride {A:his} thighs, your faces suddenly close.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} holds very still as you settle into {A:his} lap.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between your bodies as {A:he} nervously lets you settle astride {A:him}.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you pull {A:him} up to sitting and climb astride {A:his} lap.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} turns {A:his} face aside, {A:his} arms staying pointedly at {A:his} sides as you settle into {A:his} lap.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} sits rigid and unhappy beneath you, making no move to steady you as you straddle {A:his} thighs.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} shifts between your bodies as {A:he} reluctantly lets you settle astride {A:him}.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} thrashes as you shove {A:him} into a sitting position and climb astride {A:his} lap, your legs locking around {A:him}.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} tries to push you off, but you press your weight down into {A:his} lap, holding fast.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls into your shoulder as you trap {A:his} arms between your bodies and settle astride {A:his} thighs.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} is trapped between your bodies as {A:he} struggles, unable to force you out of {A:his} lap.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into face-sitting, "a" is always the one climbing up to sit on "b's" face (was the lap rider), while
// "b" lies back flat beneath them (was the seat). Both stay facing each other.
faceSitting.add(`{B:name} lies back with a warm smile, {B:his} hands guiding your hips as you climb up {B:his} body to kneel over {B:his} face.`,
  [playerA, isLoving]);
faceSitting.add(`{B:name} eases onto {B:his} back beneath you, gazing up affectionately as you make your way up {B:his} body and settle over {B:his} face.`,
  [playerA, isLoving]);
faceSitting.add(`{B:name} stretches out beneath you, {B:his} {B:breasts.softBreasts} passing below you as you climb up to straddle {B:his} face.`,
  [playerA, isLoving, bVisibleBreasts]);
faceSitting.add(`{B:name} lies back contentedly, {B:his} {B:cock.thickCock} settling against {B:his} stomach as you climb up {B:his} body toward {B:his} face.`,
  [playerA, isLoving, bVisibleCock]);
faceSitting.add(`{B:name} drops onto {B:his} back and drags you up {B:his} body by the hips, {B:his} mouth open and waiting as you settle over {B:his} face.`,
  [playerA, isLustful]);
faceSitting.add(`{B:name} lies back with a hungry moan, urging you up {B:his} body until your thighs frame {B:his} eager face.`,
  [playerA, isLustful]);
faceSitting.add(`{B:name} watches your {pussy} approach with hungry eyes as you climb up {B:his} body, pulling you down onto {B:his} mouth.`,
  [playerA, isLustful, aVisiblePussy]);
faceSitting.add(`{B:name's} {B:cock.bigHardCock} bobs against {B:his} stomach as {B:he} drops back eagerly, pulling you up to straddle {B:his} face.`,
  [playerA, isLustful, bHardCock]);
faceSitting.add(`{B:name} lies back without comment, holding still as you climb up {B:his} body and settle over {B:his} face.`,
  [playerA, isAccepting]);
faceSitting.add(`You rise out of {B:name's} lap as {B:he} stretches out flat, climbing up to kneel over {B:his} face without protest from {B:him}.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} settles onto {B:his} back and waits quietly as you make your way up {B:his} body.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} lies flat without complaint, {B:his} {B:cock.thickCock} resting against {B:his} stomach as you climb up to straddle {B:his} face.`,
  [playerA, isAccepting, bVisibleCock]);
faceSitting.add(`{B:name} lies back nervously beneath you, {B:his} breath quickening as you climb up {B:his} body toward {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`With a shaky breath, {B:name} stretches out flat, tensing as your thighs come to frame {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`{B:name} watches you climb up {B:his} body with wide, anxious eyes, holding perfectly still as you settle over {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} stomach as {B:he} nervously lies back and you climb up {B:his} body.`,
  [playerA, isFearful, bVisibleCock]);
faceSitting.add(`{B:name} grumbles as you push {B:him} onto {B:his} back and climb up {B:his} body, settling over {B:his} scowling face.`,
  [playerA, isResistant]);
faceSitting.add(`With a huff, {B:name} lies back, complaining under {B:his} breath right up until you settle onto {B:his} mouth.`,
  [playerA, isResistant]);
faceSitting.add(`{B:name} shifts unhappily beneath you as you make your way up {B:his} body, {B:his} jaw set as you kneel over {B:his} face.`,
  [playerA, isResistant]);
faceSitting.add(`{B:name} lies back with obvious reluctance, {B:his} {B:cock.thickCock} lying against {B:his} stomach as you climb toward {B:his} face.`,
  [playerA, isResistant, bVisibleCock]);
faceSitting.add(`{B:name} thrashes as you shove {B:him} flat and crawl up {B:his} body, pinning {B:his} arms beneath your knees as you settle over {B:his} face.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name} struggles beneath you the whole way up, but your weight settles over {B:his} face regardless.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name} snarls and bucks as you climb up {B:his} body, silenced as you force yourself down onto {B:his} mouth.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name's} {B:cock.thickCock} swings against {B:his} stomach as {B:he} fights beneath you, unable to stop your climb up {B:his} body.`,
  [playerA, isViolent, bVisibleCock]);
faceSitting.add(`{A:name} eases you onto your back and climbs gently up your body, smiling down at you as {A:he} settles over your face.`,
  [playerB, isLoving]);
faceSitting.add(`You lie back, and {A:name} makes {A:his} way up your body with affectionate care, {A:his} knees settling on either side of your head.`,
  [playerB, isLoving]);
faceSitting.add(`{A:name's} {A:breasts.softBreasts} sway above you as {A:he} climbs up your body, lowering {A:him}self warmly onto your mouth.`,
  [playerB, isLoving, aVisibleBreasts]);
faceSitting.add(`{A:name's} {A:cock.thickCock} sways above your chest as {A:he} climbs up your body and settles over your face.`,
  [playerB, isLoving, aVisibleCock]);
faceSitting.add(`{A:name} pushes you flat and scrambles up your body, grinding down onto your mouth the moment {A:he} arrives.`,
  [playerB, isLustful]);
faceSitting.add(`{A:name} climbs up you with hungry impatience, {A:his} thighs clamping around your head as {A:he} settles onto your mouth.`,
  [playerB, isLustful]);
faceSitting.add(`{A:name's} soaked {pussy} descends toward your mouth as {A:he} climbs eagerly up your body.`,
  [playerB, isLustful, aVisiblePussy]);
faceSitting.add(`{A:name's} {A:cock.bigHardCock} bobs above you as {A:he} climbs up your body, settling down eagerly over your face.`,
  [playerB, isLustful, aHardCock]);
faceSitting.add(`You lie back, and {A:name} climbs up your body without comment, settling over your face.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name} rises out of your lap as you stretch out flat, making {A:his} way up to kneel over your face.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name} climbs up your body and lowers {A:him}self onto your mouth without protest.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name's} {A:cock.thickCock} passes over your chest as {A:he} climbs up without a word, settling onto your face.`,
  [playerB, isAccepting, aVisibleCock]);
faceSitting.add(`{A:name} climbs up your body hesitantly, {A:his} thighs trembling as {A:he} kneels over your face.`,
  [playerB, isFearful]);
faceSitting.add(`{A:name} makes {A:his} way up your body with slow, nervous movements, hovering above your mouth before easing down.`,
  [playerB, isFearful]);
faceSitting.add(`With a shaky breath, {A:name} settles over your face, {A:his} whole body tense above you.`,
  [playerB, isFearful]);
faceSitting.add(`{A:name's} {A:cock.sixInch} long {cock} trembles above you as {A:he} nervously climbs up your body.`,
  [playerB, isFearful, aVisibleCock]);
faceSitting.add(`{A:name} grumbles as you pull {A:him} up your body, settling over your face with obvious reluctance.`,
  [playerB, isResistant]);
faceSitting.add(`With a huff, {A:name} climbs up you, muttering right up until {A:his} weight settles onto your mouth.`,
  [playerB, isResistant]);
faceSitting.add(`{A:name} makes {A:his} way up your body grudgingly, every movement stiff with reluctance.`,
  [playerB, isResistant]);
faceSitting.add(`{A:name's} {A:cock.thickCock} sways above your chest as {A:he} reluctantly climbs up to straddle your face.`,
  [playerB, isResistant, aVisibleCock]);
faceSitting.add(`{A:name} fights you the whole way as you drag {A:him} up your body, but you haul {A:his} hips down over your face regardless.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name} thrashes as you pull {A:him} up your body, unable to break the grip forcing {A:his} thighs around your head.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name} snarls and claws at your arms, but you drag {A:him} up over your face and pull {A:his} hips down onto your mouth.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name's} {A:cock.thickCock} swings above you as {A:he} struggles, dragged up your body and down onto your face.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into lap-sitting-reversed: "a" stays seated while "b" rises and turns around in their lap,
// settling back down with their back against "a's" chest.
lapSittingReversed.add(`{B:name} presses a soft kiss to your lips before rising up and turning around in your lap, settling back down with {B:his} back against your chest.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} swivels around in your lap with a warm smile over {B:his} shoulder, leaning back into your chest as {B:he} settles.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} turns around in your lap, {B:his} {B:breasts.softBreasts} swaying with the motion before {B:he} settles back against your chest.`,
  [playerA, isLoving, bVisibleBreasts]);
lapSittingReversed.add(`{B:name} rises and turns around, {B:his} {B:cock.thickCock} swinging with the movement as {B:he} settles back into your lap, facing away.`,
  [playerA, isLoving, bVisibleCock]);
lapSittingReversed.add(`{B:name} spins around in your lap with a needy moan, grinding {B:his} ass back down against you the moment {B:he} settles.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name} turns around eagerly, pressing {B:his} back hot against your chest and rolling {B:his} hips down into your lap.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name} turns around and spreads {B:his} thighs over yours, {B:his} soaked {pussy} on display as {B:he} grinds back against you.`,
  [playerA, isLustful, bVisiblePussy]);
lapSittingReversed.add(`{B:name's} {B:cock.bigHardCock} bobs with the turn as {B:he} spins around in your lap, grinding {B:his} ass back against you.`,
  [playerA, isLustful, bHardCock]);
lapSittingReversed.add(`{B:name} rises up and turns around in your lap without comment, settling back down facing away.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} swivels around quietly, {B:his} back coming to rest against your chest.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} turns {B:him}self around in your lap without protest, letting you take {B:his} weight again once {B:he} faces away.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} turns around without complaint, {B:his} {B:cock.thickCock} settling between {B:his} thighs as {B:he} leans back against you.`,
  [playerA, isAccepting, bVisibleCock]);
lapSittingReversed.add(`{B:name} turns around in your lap nervously, {B:his} shoulders easing slightly once {B:he} no longer has to meet your eyes.`,
  [playerA, isFearful]);
lapSittingReversed.add(`With a shaky breath, {B:name} swivels around, {B:his} back held tense and rigid against your chest.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name} turns away from you hesitantly, flinching as your arms come around {B:him} from behind.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously turns around in your lap, settling back against your chest.`,
  [playerA, isFearful, bVisibleCock]);
lapSittingReversed.add(`{B:name} grumbles as you turn {B:him} around in your lap, though {B:he} seems glad enough to put {B:his} back to you.`,
  [playerA, isResistant]);
lapSittingReversed.add(`With a huff, {B:name} swivels around, sitting stiff and upright rather than leaning back into your chest.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} turns around grudgingly, {B:his} arms crossing as {B:he} settles back down facing away.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} shifts around reluctantly in your lap, {B:his} {B:cock.thickCock} hanging between {B:his} thighs as {B:he} settles facing away.`,
  [playerA, isResistant, bVisibleCock]);
lapSittingReversed.add(`{B:name} tries to twist free as {B:he} rises, but you spin {B:him} around and haul {B:him} back down into your lap, {B:his} back pinned to your chest.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} thrashes as you wrench {B:him} around in your lap, your arms locking around {B:him} from behind.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} claws at your arms as you turn {B:him} around, held fast against your chest once {B:he} settles.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name's} {B:cock.thickCock} swings wildly as {B:he} fights the turn, wrestled back down into your lap facing away.`,
  [playerA, isViolent, bVisibleCock]);
lapSittingReversed.add(`{A:name} steadies your hips as you rise and turn around in {A:his} lap, wrapping {A:his} arms warmly around you as you settle back against {A:his} chest.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name} presses a kiss to your shoulder as you turn around in {A:his} lap, pulling you gently back against {A:his} chest.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name's} {A:breasts.softBreasts} press warmly into your back as you turn around and settle into {A:his} lap, facing away.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} comes to rest against your ass as you turn around in {A:his} lap, {A:his} chin settling on your shoulder.`,
  [playerB, isLoving, aVisibleCock]);
lapSittingReversed.add(`{A:name} groans as you turn around in {A:his} lap, {A:his} hands dragging your hips back down and grinding you against {A:him}.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} pulls you back hard against {A:his} chest the moment you finish turning, {A:his} breath hot on the back of your neck.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks as you settle back down into {A:his} lap, facing away.`,
  [playerB, isLustful, aHardCock]);
lapSittingReversed.add(`{A:name} moans into your ear as {A:his} {A:breasts.softBreasts} flatten against your back, {A:his} arms dragging you tight against {A:him}.`,
  [playerB, isLustful, aVisibleBreasts]);
lapSittingReversed.add(`You rise and turn around in {A:name's} lap, and {A:he} steadies you without comment as you settle back against {A:his} chest.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} lets you turn yourself around in {A:his} lap, {A:his} hands resting loosely on your hips once you settle facing away.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} takes your weight again without protest as you settle back down, your back to {A:his} chest.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} rests against your ass as you turn around and settle into {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
lapSittingReversed.add(`{A:name} holds very still as you turn around in {A:his} lap, {A:his} hands hovering at your hips as you settle back against {A:him}.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} breath comes quick against the back of your neck as you settle into {A:his} lap, facing away.`,
  [playerB, isFearful]);
lapSittingReversed.add(`With a shaky breath, {A:name} lets you turn around in {A:his} lap, tense beneath you as your back meets {A:his} chest.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles beneath your ass as you settle back down, {A:his} whole body tense behind you.`,
  [playerB, isFearful, aVisibleCock]);
lapSittingReversed.add(`{A:name} grumbles behind you as you turn around in {A:his} lap, making no move to steady you.`,
  [playerB, isResistant]);
lapSittingReversed.add(`With a huff, {A:name} leans back to give you room to turn, {A:his} arms staying pointedly at {A:his} sides as you settle facing away.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name} mutters something under {A:his} breath as you settle back against {A:his} chest, {A:his} whole frame stiff with reluctance.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} shifts beneath you as {A:he} reluctantly lets you turn around and settle back into {A:his} lap.`,
  [playerB, isResistant, aVisibleCock]);
lapSittingReversed.add(`{A:name} tries to shove you off as you turn, but you settle back hard against {A:his} chest, trapping {A:him} beneath your weight.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} thrashes beneath you mid-turn, but you plant yourself back down in {A:his} lap, your back pinning {A:him} in place.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} snarls behind your ear as you turn around, {A:his} struggles useless as your weight settles back into {A:his} lap.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} is pinned beneath your ass as {A:he} fights to unseat you, your weight settling back down regardless.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into missionary, "a" is the one on top (was the lap rider), bearing "b" (was the seat) over backward
// onto their back and settling between their legs.
missionary.add(`{B:name} lets you bear {B:him} over backward, smiling up at you as {B:he} settles onto {B:his} back with you on top.`,
  [playerA, isLoving]);
missionary.add(`{B:name} lies back beneath you, {B:his} arms drawing you down against {B:him} as {B:his} legs part to make room for you.`,
  [playerA, isLoving]);
missionary.add(`{B:name} sinks onto {B:his} back with a warm smile, {B:his} {B:breasts.softBreasts} pressing against your chest as you settle on top of {B:him}.`,
  [playerA, isLoving, bVisibleBreasts]);
missionary.add(`{B:name} settles back beneath you, {B:his} {B:cock.thickCock} caught warmly between your stomachs as you lower yourself onto {B:him}.`,
  [playerA, isLoving, bVisibleCock]);
missionary.add(`{B:name} drags you down with {B:him} as {B:he} falls back, {B:his} legs locking around your waist the moment you settle between them.`,
  [playerA, isLustful]);
missionary.add(`{B:name} sinks back with a needy moan, grinding up against you as you press {B:him} down onto {B:his} back.`,
  [playerA, isLustful]);
missionary.add(`{B:name} spreads {B:his} legs eagerly as {B:he} lies back, {B:his} soaked {pussy} bared beneath you as you settle on top.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`{B:name's} {B:cock.bigHardCock} presses up between your stomachs as {B:he} pulls you down on top of {B:him}.`,
  [playerA, isLustful, bHardCock]);
missionary.add(`{B:name} lies back without complaint as you press {B:him} down, {B:his} legs parting to let you settle between them.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} sinks onto {B:his} back beneath you, accepting your weight as you stretch out on top of {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`You ease {B:name} onto {B:his} back, and {B:he} settles beneath you without protest.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lies back quietly, {B:his} {B:cock.thickCock} resting between your bodies as you settle on top of {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
missionary.add(`{B:name} lets you bear {B:him} down onto {B:his} back, {B:his} breath quick and shallow as your weight settles over {B:him}.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} sinks back beneath you, {B:his} legs parting nervously as you settle between them.`,
  [playerA, isFearful]);
missionary.add(`{B:name} lies back tense and still, {B:his} wide eyes fixed on you as you lower yourself onto {B:him}.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously settles onto {B:his} back beneath you.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles as you press {B:him} down onto {B:his} back, {B:his} legs parting only when you push between them.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} lies back beneath you, turning {B:his} face away as your weight settles over {B:him}.`,
  [playerA, isResistant]);
missionary.add(`{B:name} sinks back with obvious reluctance, {B:his} body stiff beneath yours.`,
  [playerA, isResistant]);
missionary.add(`{B:name} shifts unhappily beneath you, {B:his} {B:cock.thickCock} caught between your stomachs as you settle on top.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} thrashes as you bear {B:him} over backward, pinning {B:him} flat beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name} struggles, but you force {B:him} down onto {B:his} back and push between {B:his} kicking legs.`,
  [playerA, isViolent]);
missionary.add(`{B:name} snarls and shoves at your chest, but your weight bears {B:him} down onto {B:his} back regardless.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} bucks beneath you, pinned flat on {B:his} back.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`{A:name} eases you down onto your back, following you down and settling warmly between your legs.`,
  [playerB, isLoving]);
missionary.add(`{A:name} lowers you back with gentle hands, {A:his} eyes soft on yours as {A:he} stretches out on top of you.`,
  [playerB, isLoving]);
missionary.add(`{A:name's} {A:breasts.softBreasts} press against your chest as {A:he} lays you back and settles on top of you.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name's} {A:cock.thickCock} rests warmly against your thigh as {A:he} eases you onto your back and settles between your legs.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name} shoves you back with a hungry moan, following you down and grinding against you as {A:he} settles between your legs.`,
  [playerB, isLustful]);
missionary.add(`{A:name} bears you down onto your back, {A:his} mouth hot against your throat as {A:his} weight presses you flat.`,
  [playerB, isLustful]);
missionary.add(`{A:name's} {A:cock.bigHardCock} presses against your thigh as {A:he} pushes you down and settles eagerly on top of you.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`{A:name's} {A:breasts.softBreasts} drag against your chest as {A:he} bears you down, grinding against you with a moan.`,
  [playerB, isLustful, aVisibleBreasts]);
missionary.add(`{A:name} lowers you onto your back and settles on top of you without comment.`,
  [playerB, isAccepting]);
missionary.add(`You lie back, and {A:name} follows you down from your lap, settling on top of you.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} shifts forward as you lie back, letting {A:his} weight settle over you without protest.`,
  [playerB, isAccepting]);
missionary.add(`{A:name's} {A:cock.thickCock} settles against your thigh as {A:he} follows you down onto your back.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} follows you down hesitantly as you pull {A:him} with you, {A:his} body tense on top of yours.`,
  [playerB, isFearful]);
missionary.add(`{A:name} settles over you nervously as you lie back, {A:his} arms trembling where they brace beside your head.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} lowers {A:him}self onto you, {A:his} eyes avoiding yours.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your thigh as {A:he} nervously settles on top of you.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles as you pull {A:him} down with you, settling on top of you with obvious reluctance.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} follows you down, holding {A:him}self stiffly above you.`,
  [playerB, isResistant]);
missionary.add(`{A:name} lowers {A:him}self onto you grudgingly, {A:his} face turned aside as {A:his} weight settles.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts against your thigh as {A:he} reluctantly settles between your legs.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} thrashes as you fall back and drag {A:him} down with you, your legs locking around {A:his} waist.`,
  [playerB, isViolent]);
missionary.add(`{A:name} fights your grip as you pull {A:him} down on top of you, but you hold {A:him} fast against your chest.`,
  [playerB, isViolent]);
missionary.add(`{A:name} snarls and tries to rear back, but your legs wrap around {A:him}, dragging {A:his} weight down onto you.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} grinds against your thigh as {A:he} struggles, unable to pull free of your legs around {A:his} waist.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into standing, both rise to their feet: "b" climbs off the lap first, then "a" stands, ending face to
// face. No swap, so "a" is still the one who was seated.
standing.add(`{B:name} slips off your lap and takes your hands, drawing you up to your feet and staying close once you rise.`,
  [playerA, isLoving]);
standing.add(`{B:name} climbs off you with a warm smile, steadying you as you stand and settling into your arms once you're up.`,
  [playerA, isLoving]);
standing.add(`{B:name} rises off your lap, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} pulls you up to stand against {B:him}.`,
  [playerA, isLoving, bVisibleBreasts]);
standing.add(`{B:name} stands and helps you up after {B:him}, {B:his} {B:cock.thickCock} brushing against you as you come together face to face.`,
  [playerA, isLoving, bVisibleCock]);
standing.add(`{B:name} climbs off your lap and drags you up after {B:him}, pressing {B:him}self flush against you the moment you're standing.`,
  [playerA, isLustful]);
standing.add(`{B:name} rises with a needy sound, pulling you up by the shoulders and grinding against you as you find your feet.`,
  [playerA, isLustful]);
standing.add(`{B:name} barely lets you stand upright before {B:he} is pressed against you again, {B:his} hands roaming your back.`,
  [playerA, isLustful]);
standing.add(`{B:name's} {B:cock.bigHardCock} presses against you as {B:he} pulls you up to stand chest to chest.`,
  [playerA, isLustful, bHardCock]);
standing.add(`{B:name} climbs off your lap without comment and stands, waiting as you rise to face {B:him}.`,
  [playerA, isAccepting]);
standing.add(`{B:name} slips off you and straightens up, standing quietly in front of you as you get to your feet.`,
  [playerA, isAccepting]);
standing.add(`{B:name} rises and lets you stand, settling into place before you without protest.`,
  [playerA, isAccepting]);
standing.add(`{B:name} stands and waits as you rise, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs.`,
  [playerA, isAccepting, bVisibleCock]);
standing.add(`{B:name} climbs off your lap quickly and stands with {B:his} arms drawn in close, watching nervously as you rise.`,
  [playerA, isFearful]);
standing.add(`{B:name} rises on unsteady legs, holding {B:his} ground anxiously as you stand to face {B:him}.`,
  [playerA, isFearful]);
standing.add(`With a shaky breath, {B:name} slips off your lap and stands before you, {B:his} eyes lowered.`,
  [playerA, isFearful]);
standing.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} stands nervously in front of you.`,
  [playerA, isFearful, bVisibleCock]);
standing.add(`{B:name} climbs off your lap the moment {B:he} can, putting a step of distance between you until you close it.`,
  [playerA, isResistant]);
standing.add(`With a huff, {B:name} stands and crosses {B:his} arms, glowering as you rise to face {B:him}.`,
  [playerA, isResistant]);
standing.add(`{B:name} gets to {B:his} feet grudgingly, holding {B:him}self stiff as you stand in front of {B:him}.`,
  [playerA, isResistant]);
standing.add(`{B:name} stands with obvious reluctance, {B:his} {B:cock.thickCock} hanging between {B:his} legs as {B:he} looks away.`,
  [playerA, isResistant, bVisibleCock]);
standing.add(`{B:name} bolts the moment {B:he} is off your lap, but you catch {B:his} wrist and haul {B:him} back to stand against you.`,
  [playerA, isViolent]);
standing.add(`{B:name} shoves away from you as you both rise, but you grip {B:his} arms and hold {B:him} standing in front of you.`,
  [playerA, isViolent]);
standing.add(`{B:name} struggles as you stand, dragging {B:him} up with you and pinning {B:his} body against yours.`,
  [playerA, isViolent]);
standing.add(`{B:name's} {B:cock.thickCock} swings as {B:he} twists in your grip, hauled up to stand against you.`,
  [playerA, isViolent, bVisibleCock]);
standing.add(`You climb off {A:name's} lap, and {A:he} rises with you, {A:his} hands lingering warmly on your waist.`,
  [playerB, isLoving]);
standing.add(`{A:name} steadies you as you slip off {A:his} lap, standing and drawing you gently against {A:him}.`,
  [playerB, isLoving]);
standing.add(`{A:name's} {A:breasts.softBreasts} sway as {A:he} rises to stand with you, pulling you close.`,
  [playerB, isLoving, aVisibleBreasts]);
standing.add(`{A:name} rises after you, {A:his} {A:cock.thickCock} brushing your hip as {A:he} settles against you, face to face.`,
  [playerB, isLoving, aVisibleCock]);
standing.add(`{A:name} surges up after you the moment you leave {A:his} lap, pulling you flush against {A:him} with a hungry moan.`,
  [playerB, isLustful]);
standing.add(`{A:name} rises and crowds close, {A:his} hands finding your ass as the two of you stand chest to chest.`,
  [playerB, isLustful]);
standing.add(`{A:name} barely waits for you to stand before {A:he} is against you, {A:his} mouth hot at your throat.`,
  [playerB, isLustful]);
standing.add(`{A:name's} {A:cock.bigHardCock} presses against you as {A:he} stands and pulls you tight against {A:his} body.`,
  [playerB, isLustful, aHardCock]);
standing.add(`You climb off {A:name's} lap, and {A:he} rises without comment to stand facing you.`,
  [playerB, isAccepting]);
standing.add(`{A:name} gets to {A:his} feet as you step back, standing quietly in front of you.`,
  [playerB, isAccepting]);
standing.add(`{A:name} rises and waits, letting you settle into place before {A:him}.`,
  [playerB, isAccepting]);
standing.add(`{A:name} stands without protest, {A:his} {A:cock.thickCock} hanging between {A:his} legs as {A:he} faces you.`,
  [playerB, isAccepting, aVisibleCock]);
standing.add(`{A:name} rises hesitantly once you're off {A:his} lap, {A:his} arms drawn in close as {A:he} stands before you.`,
  [playerB, isFearful]);
standing.add(`{A:name} gets to {A:his} feet with a shaky breath, {A:his} eyes flicking nervously to yours and away again.`,
  [playerB, isFearful]);
standing.add(`{A:name} stands slowly, holding very still as you step in close.`,
  [playerB, isFearful]);
standing.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} nervously rises to stand in front of you.`,
  [playerB, isFearful, aVisibleCock]);
standing.add(`{A:name} stands with a grumble once you climb off {A:him}, {A:his} arms crossing as {A:he} faces you.`,
  [playerB, isResistant]);
standing.add(`With a huff, {A:name} gets to {A:his} feet, standing stiff and unhappy in front of you.`,
  [playerB, isResistant]);
standing.add(`{A:name} rises grudgingly, turning {A:his} face aside as you step in close.`,
  [playerB, isResistant]);
standing.add(`{A:name's} {A:cock.thickCock} sways as {A:he} reluctantly stands, holding {A:him}self apart from you.`,
  [playerB, isResistant, aVisibleCock]);
standing.add(`{A:name} surges up and tries to shove past you, but you plant yourself in {A:his} way, forcing {A:him} to stand facing you.`,
  [playerB, isViolent]);
standing.add(`{A:name} rises swinging, but you catch {A:his} wrists and hold {A:him} standing in front of you.`,
  [playerB, isViolent]);
standing.add(`{A:name} tries to twist away as {A:he} stands, but your grip on {A:his} arms keeps {A:him} planted before you.`,
  [playerB, isViolent]);
standing.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles in your grip, held standing against you.`,
  [playerB, isViolent, aVisibleCock]);
