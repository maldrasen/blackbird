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

const rearrange = WeaverPackage('lap-sitting-reversed.rearrange');
const faceSittingReversed = WeaverPackage('lap-sitting-reversed.move-to-face-sitting-reversed');
const lapSitting = WeaverPackage('lap-sitting-reversed.move-to-lap-sitting');
const standingReversed = WeaverPackage('lap-sitting-reversed.move-to-standing-reversed');

// Second straddling First's lap facing away from them.
SexPosition.register('lap-sitting-reversed',{
  name: 'Reverse Lap Sitting',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.fucked],
    },
    second: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'face-sitting-reversed', package:faceSittingReversed, swap:true },
    { code:'lap-sitting', package:lapSitting },
    { code:'standing-reversed', package:standingReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} backs onto your lap with a warm smile over {B:his} shoulder, settling {B:his} back comfortably against your chest.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles onto your lap facing away, drawing your arms around {B:his} waist and lacing {B:his} fingers through yours.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} eases down onto your lap, nestling back into you with a contented sigh.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} sits back onto your lap, {B:his} {B:cock.thickCock} resting between {B:his} thighs as {B:he} leans into your chest.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} backs eagerly onto your lap, grinding {B:his} ass down against you before {B:he} is even settled.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} straddles your thighs facing away, rolling {B:his} hips back against you with a needy moan.`,
  [playerA, isLustful]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} stands up from {B:his} lap as {B:he} grinds back against you, guiding your hands around {B:his} body.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} settles onto your lap and spreads {B:his} thighs wide over yours, {B:his} soaked {pussy} on display.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} sits back onto your lap without complaint, {B:his} back settling against your chest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lowers {B:him}self onto your lap facing away, letting you take {B:his} weight.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto your thighs without protest, {B:his} hands resting on your knees.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} sits quietly back into your lap, {B:his} {B:cock.thickCock} lying between {B:his} thighs.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} backs onto your lap nervously, {B:his} spine held rigid against your chest.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} lowers {B:him}self onto your lap, perching stiffly on your thighs.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} settles back against you hesitantly, {B:his} breath catching as your arms come around {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} nervously sits back into your lap.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you pull {B:him} down onto your lap, sitting bolt upright rather than leaning back into you.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} sits back onto your thighs, {B:his} arms crossed.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} lowers {B:him}self onto your lap with poor grace, holding {B:his} back away from your chest.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} settles grudgingly onto your lap, {B:his} {B:cock.thickCock} hanging between {B:his} thighs.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you haul {B:him} backward onto your lap, locking your arms around {B:his} middle.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you drag {B:him} down onto your thighs, pinning {B:his} back against your chest.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} claws at your arms as you wrestle {B:him} onto your lap, holding {B:him} fast from behind.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings between {B:his} thighs as {B:he} fights your grip, forced down onto your lap.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`{A:name} pats {A:his} thighs invitingly, wrapping {A:his} arms warmly around your waist as you settle onto {A:his} lap facing away.`,
  [playerB, isLoving]);
rearrange.add(`You sit back onto {A:name's} lap, and {A:he} draws you in against {A:his} chest, pressing a kiss behind your ear.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} presses up against your ass as you settle onto {A:his} lap, {A:his} chin resting on your shoulder.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} press soft against your back as {A:he} gathers you onto {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} pulls you backward onto {A:his} lap with a hungry groan, grinding up against your ass.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans against the back of your neck as you settle onto {A:his} lap, {A:his} hands sliding around your waist.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks as you sit back into {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name} drags you back against {A:him}, {A:his} {A:breasts.softBreasts} flattening against your back as {A:he} moans into your ear.`,
  [playerB, isLustful, aVisibleBreasts]);
rearrange.add(`You sit back onto {A:name's} lap, and {A:he} takes your weight without comment.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} sits still as you lower yourself onto {A:his} lap, facing away.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} rests {A:his} hands on your hips as you settle back against {A:his} chest.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests against your ass as you settle onto {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} goes still as you back onto {A:his} lap, {A:his} hands hovering uncertainly at your sides.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} breath comes quick behind you as you lower yourself onto {A:his} trembling thighs.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} lets you settle back against {A:his} chest, holding {A:him}self carefully still.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles under you as {A:he} anxiously lets you settle onto {A:his} lap.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you push {A:him} down to sitting and back onto {A:his} lap.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} keeps {A:his} arms at {A:his} sides, refusing to hold you as you settle onto {A:his} thighs.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} shifts unhappily beneath you, muttering as your back comes to rest against {A:his} chest.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} shifts beneath your ass as {A:he} grudgingly takes your weight.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} tries to stand as you back toward {A:him}, but you shove {A:him} down and plant yourself in {A:his} lap.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} shoves at your shoulders, but you settle your weight back into {A:his} lap, trapping {A:him} beneath you.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls and bucks beneath you, but your weight holds {A:him} down as you settle back against {A:his} chest.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} is pinned beneath your ass as {A:he} struggles to unseat you.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into face-sitting-reversed, "a" is the rider (was on the lap), who scoots backward up "b's" body as "b"
// (was the seat) lies back, settling over their face while still facing their feet.
faceSittingReversed.add(`{B:name} lies back with a warm smile, {B:his} hands guiding your hips as you scoot backward up {B:his} body to settle over {B:his} face.`,
  [playerA, isLoving]);
faceSittingReversed.add(`{B:name} eases onto {B:his} back beneath you, pressing a kiss to your ass as it settles over {B:his} upturned face.`,
  [playerA, isLoving]);
faceSittingReversed.add(`{B:name} stretches out beneath you, {B:his} {B:breasts.softBreasts} passing below you as you walk your knees back to straddle {B:his} face.`,
  [playerA, isLoving, bVisibleBreasts]);
faceSittingReversed.add(`{B:name} lies back contentedly, {B:his} {B:cock.thickCock} coming to rest against {B:his} stomach in front of you as you settle back onto {B:his} face.`,
  [playerA, isLoving, bVisibleCock]);
faceSittingReversed.add(`{B:name} drops onto {B:his} back and drags you backward by the hips, moaning as your ass descends onto {B:his} waiting mouth.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name} lies back with a hungry groan, {B:his} hands kneading your cheeks apart as you scoot back over {B:his} face.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name} moans in anticipation beneath you, {B:his} tongue already out as you ease your hips back over {B:his} face.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name's} {B:cock.bigHardCock} bobs against {B:his} stomach in front of you as {B:he} pulls your ass eagerly down onto {B:his} mouth.`,
  [playerA, isLustful, bHardCock]);
faceSittingReversed.add(`{B:name} lies back without comment, holding still as you scoot backward up {B:his} body and settle over {B:his} face.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`You rise off {B:name's} lap as {B:he} stretches out flat, walking your knees back until your ass rests over {B:his} mouth.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} settles onto {B:his} back and waits quietly as you ease yourself back over {B:his} face.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} lies flat without protest, {B:his} {B:cock.thickCock} resting against {B:his} stomach as you settle back onto {B:his} face.`,
  [playerA, isAccepting, bVisibleCock]);
faceSittingReversed.add(`{B:name} lies back nervously beneath you, {B:his} breath quickening as your ass moves back over {B:his} face.`,
  [playerA, isFearful]);
faceSittingReversed.add(`With a shaky breath, {B:name} stretches out flat, tensing as you lower yourself onto {B:his} mouth.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name} goes very still beneath you, {B:his} nervous breaths brushing your ass as you settle over {B:his} face.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} stomach as {B:he} nervously lies back beneath you.`,
  [playerA, isFearful, bVisibleCock]);
faceSittingReversed.add(`{B:name} grumbles as you push {B:him} onto {B:his} back, {B:his} complaints cut short as you settle your ass over {B:his} mouth.`,
  [playerA, isResistant]);
faceSittingReversed.add(`With a huff, {B:name} lies back, clearly unhappy as you scoot backward to straddle {B:his} face.`,
  [playerA, isResistant]);
faceSittingReversed.add(`{B:name} mutters beneath you right up until your ass settles onto {B:his} mouth, muffling the rest.`,
  [playerA, isResistant]);
faceSittingReversed.add(`{B:name} shifts reluctantly beneath you, {B:his} {B:cock.thickCock} lying against {B:his} stomach as you settle back over {B:his} face.`,
  [playerA, isResistant, bVisibleCock]);
faceSittingReversed.add(`{B:name} thrashes as you shove {B:him} flat and back up {B:his} body, pinning {B:his} arms beneath your knees as you settle over {B:his} face.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name} struggles beneath you, but you force your ass down over {B:his} face anyway, {B:his} protests lost against your skin.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name} bucks and snarls, but you clamp {B:his} head between your thighs and settle down facing {B:his} feet.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name's} {B:cock.thickCock} swings against {B:his} stomach as {B:he} fights beneath you, unable to stop your ass from settling over {B:his} face.`,
  [playerA, isViolent, bVisibleCock]);
faceSittingReversed.add(`{A:name} glances back down at you with a warm smile as {A:he} eases {A:his} hips backward, settling {A:his} ass gently onto your mouth.`,
  [playerB, isLoving]);
faceSittingReversed.add(`You lie back, and {A:name} walks {A:his} knees back up your body with careful grace, lowering {A:him}self onto your face.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} sways between {A:his} thighs as {A:he} backs up your body, settling {A:his} ass over your mouth.`,
  [playerB, isLoving, aVisibleCock]);
faceSittingReversed.add(`{A:name} strokes your thigh fondly as {A:he} settles {A:his} ass back onto your waiting mouth.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:name} scoots back up your body with hungry impatience, grinding {A:his} ass down onto your mouth the moment it lands.`,
  [playerB, isLustful]);
faceSittingReversed.add(`{A:name} pushes you flat and backs up your body, {A:his} ass descending eagerly onto your face.`,
  [playerB, isLustful]);
faceSittingReversed.add(`{A:name's} soaked {pussy} descends toward your mouth as {A:he} eagerly backs {A:his} hips over your face.`,
  [playerB, isLustful, aVisiblePussy]);
faceSittingReversed.add(`{A:name's} {A:cock.bigHardCock} bobs between {A:his} thighs as {A:he} backs up your body, settling {A:his} ass hungrily onto your mouth.`,
  [playerB, isLustful, aHardCock]);
faceSittingReversed.add(`You lie back, and {A:name} scoots backward up your body without comment, settling {A:his} ass onto your mouth.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name} rises off your lap as you stretch out, walking {A:his} knees back to straddle your face.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name} eases {A:his} hips back over your face and lowers {A:him}self without protest.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} hangs between {A:his} thighs as {A:he} backs over your face and settles down quietly.`,
  [playerB, isAccepting, aVisibleCock]);
faceSittingReversed.add(`{A:name} backs up your body hesitantly, {A:his} thighs trembling as {A:his} ass hovers over your face.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name} eases {A:him}self back nervously, only settling onto your mouth when you pull gently at {A:his} hips.`,
  [playerB, isFearful]);
faceSittingReversed.add(`With a shaky breath, {A:name} walks {A:his} knees back and lowers {A:him}self carefully onto your face.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between {A:his} thighs as {A:he} nervously settles {A:his} ass over your mouth.`,
  [playerB, isFearful, aVisibleCock]);
faceSittingReversed.add(`{A:name} grumbles as you guide {A:his} hips backward, lowering {A:his} ass onto your face with obvious reluctance.`,
  [playerB, isResistant]);
faceSittingReversed.add(`With a huff, {A:name} scoots back over your face, settling down with poor grace.`,
  [playerB, isResistant]);
faceSittingReversed.add(`{A:name} mutters something sour as {A:he} backs up your body, grudgingly lowering {A:him}self onto your mouth.`,
  [playerB, isResistant]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} sways between {A:his} thighs as {A:he} reluctantly settles {A:his} ass down onto your face.`,
  [playerB, isResistant, aVisibleCock]);
faceSittingReversed.add(`{A:name} fights your grip the whole way as you drag {A:his} hips backward, hauling {A:his} ass down onto your face.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name} thrashes atop you, but your hands on {A:his} hips force {A:him} back until {A:his} ass lands on your mouth.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name} snarls and claws at your legs, but you pull {A:his} hips back onto your face regardless.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} swings between {A:his} thighs as {A:he} struggles, dragged backward onto your waiting mouth.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into lap-sitting: "a" stays seated while "b" rises and turns around in their lap, settling back
// down face to face.
lapSitting.add(`{B:name} rises up and turns around in your lap, settling back down facing you with a warm smile and {B:his} arms around your neck.`,
  [playerA, isLoving]);
lapSitting.add(`{B:name} swivels around to face you, {B:his} forehead coming to rest against yours as {B:he} settles back into your lap.`,
  [playerA, isLoving]);
lapSitting.add(`{B:name} turns around in your lap, {B:his} {B:breasts.softBreasts} pressing warmly against your chest as {B:he} settles facing you.`,
  [playerA, isLoving, bVisibleBreasts]);
lapSitting.add(`{B:name} turns to face you, {B:his} {B:cock.thickCock} coming to rest between your stomachs as {B:he} settles back down.`,
  [playerA, isLoving, bVisibleCock]);
lapSitting.add(`{B:name} spins around in your lap with a needy moan, grinding down against you the moment {B:he} faces you.`,
  [playerA, isLustful]);
lapSitting.add(`{B:name} turns around eagerly, {B:his} legs locking around your waist as {B:he} presses {B:him}self flush against you.`,
  [playerA, isLustful]);
lapSitting.add(`{B:name's} {B:cock.bigHardCock} is caught between your bodies as {B:he} spins around and grinds into your lap, {B:his} hungry eyes on yours.`,
  [playerA, isLustful, bHardCock]);
lapSitting.add(`{B:name} turns around and settles {B:his} soaked {pussy} back down against you, moaning as {B:he} faces you.`,
  [playerA, isLustful, bVisiblePussy]);
lapSitting.add(`{B:name} rises and turns around in your lap without comment, settling back down to face you.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} swivels around quietly, {B:his} hands coming to rest on your shoulders.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} turns {B:him}self around without protest, letting you take {B:his} weight again once {B:he} faces you.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} turns around without complaint, {B:his} {B:cock.thickCock} resting between your bodies as {B:he} settles.`,
  [playerA, isAccepting, bVisibleCock]);
lapSitting.add(`{B:name} turns around in your lap nervously, {B:his} eyes dropping the moment they meet yours.`,
  [playerA, isFearful]);
lapSitting.add(`With a shaky breath, {B:name} swivels around to face you, {B:his} hands trembling against your chest.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name} turns hesitantly, holding {B:him}self stiff now that {B:he} has to face you.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously settles back down facing you.`,
  [playerA, isFearful, bVisibleCock]);
lapSitting.add(`{B:name} grumbles as you turn {B:him} around in your lap, {B:his} eyes fixed anywhere but on yours.`,
  [playerA, isResistant]);
lapSitting.add(`With a huff, {B:name} swivels around to face you, sitting stiff and unhappy in your arms.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} turns around grudgingly, {B:his} jaw set now that {B:he} is made to face you.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} settles reluctantly back down facing you, {B:his} {B:cock.thickCock} caught between your bodies.`,
  [playerA, isResistant, bVisibleCock]);
lapSitting.add(`{B:name} tries to twist free as {B:he} rises, but you spin {B:him} around and haul {B:him} back down to face you.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} thrashes as you wrench {B:him} around in your lap, pinning {B:his} arms between your bodies.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} snarls into your face as you force {B:him} around, your arms locked around {B:his} waist.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name's} {B:cock.thickCock} swings with the turn as {B:he} fights you, wrestled back down into your lap facing you.`,
  [playerA, isViolent, bVisibleCock]);
lapSitting.add(`{A:name} steadies your hips as you turn around in {A:his} lap, smiling warmly as you settle back down facing {A:him}.`,
  [playerB, isLoving]);
lapSitting.add(`You swivel around in {A:name's} lap, and {A:he} welcomes you back with {A:his} forehead pressed gently to yours.`,
  [playerB, isLoving]);
lapSitting.add(`{A:name's} {A:breasts.softBreasts} press against your chest as you turn around and settle into {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSitting.add(`{A:name's} {A:cock.thickCock} comes to rest between your bodies as you turn around in {A:his} lap, {A:his} eyes soft on yours.`,
  [playerB, isLoving, aVisibleCock]);
lapSitting.add(`{A:name} groans as you spin around in {A:his} lap, dragging you flush against {A:him} the moment you face {A:him}.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} pulls you back down eagerly as you finish turning, {A:his} mouth hot at your throat.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} grinds up against you with a hungry moan as you settle back into {A:his} lap, now face to face.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name's} {A:cock.bigHardCock} presses up between your bodies as you turn around and settle facing {A:him}.`,
  [playerB, isLustful, aHardCock]);
lapSitting.add(`You rise and turn around in {A:name's} lap, and {A:he} steadies you without comment as you settle facing {A:him}.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} lets you turn yourself around, {A:his} hands resting loosely on your hips once you face {A:him}.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} takes your weight again without protest as you settle back down, now facing {A:him}.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name's} {A:cock.thickCock} rests between your bodies as you turn around and settle into {A:his} lap.`,
  [playerB, isAccepting, aVisibleCock]);
lapSitting.add(`{A:name} holds very still as you turn around in {A:his} lap, {A:his} eyes flicking away from yours as you settle.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name's} breath quickens as you swivel around to face {A:him}, {A:his} hands hovering at your sides.`,
  [playerB, isFearful]);
lapSitting.add(`With a shaky breath, {A:name} lets you turn around in {A:his} lap, tense now that your faces are so close.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between your bodies as you settle back down facing {A:him}.`,
  [playerB, isFearful, aVisibleCock]);
lapSitting.add(`{A:name} grumbles as you turn around in {A:his} lap, {A:his} face turning aside as yours comes close.`,
  [playerB, isResistant]);
lapSitting.add(`With a huff, {A:name} endures the turn, {A:his} arms staying pointedly at {A:his} sides as you settle facing {A:him}.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name} mutters something under {A:his} breath, {A:his} jaw tight as you settle back down face to face.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name's} {A:cock.thickCock} shifts between your bodies as {A:he} grudgingly lets you settle back into {A:his} lap.`,
  [playerB, isResistant, aVisibleCock]);
lapSitting.add(`{A:name} tries to shove you off as you turn, but you plant yourself back down in {A:his} lap, your legs locked around {A:his} waist.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} thrashes beneath you mid-turn, but your weight settles back into {A:his} lap regardless.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} snarls in your face as you finish the turn, {A:his} arms pinned between your bodies.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name's} {A:cock.thickCock} is trapped between your bodies as {A:he} fights to unseat you, held down by your weight.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into standing-reversed: both rise together out of the lap, "b" standing up in front while "a"
// stands close behind, staying back to chest.
standingReversed.add(`{B:name} rises off your lap and pulls you up after {B:him}, settling back against your chest once you're both standing.`,
  [playerA, isLoving]);
standingReversed.add(`You stand up together, {B:name} leaning warmly back into you as your arms stay wrapped around {B:his} waist.`,
  [playerA, isLoving]);
standingReversed.add(`{B:name} hums contentedly as you rise behind {B:him}, never quite losing contact on the way up.`,
  [playerA, isLoving]);
standingReversed.add(`You stand up behind {B:name}, your {A:cock.thickCock} settling back between {B:his} cheeks as {B:he} leans into you.`,
  [playerA, isLoving, aVisibleCock]);
standingReversed.add(`{B:name} rises with you, grinding {B:his} ass back against your crotch the moment you're both on your feet.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} drags your hands around to {B:his} front as the two of you stand, pressing back into you with a needy moan.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} arches back against you as you stand, molding {B:his} body along yours.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} moans as your {A:cock.bigHardCock} slides up between {B:his} cheeks, the two of you rising together.`,
  [playerA, isLustful, aHardCock]);
standingReversed.add(`{B:name} rises off your lap, and you stand up behind {B:him}, {B:his} body settling back against yours without complaint.`,
  [playerA, isAccepting]);
standingReversed.add(`The two of you rise together, {B:name} staying quietly in place as your hands settle on {B:his} hips.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} stands without protest as you rise behind {B:him}, keeping {B:his} back to your chest.`,
  [playerA, isAccepting]);
standingReversed.add(`Your {A:cock.thickCock} stays nestled between {B:name's} cheeks as the two of you rise to your feet.`,
  [playerA, isAccepting, aVisibleCock]);
standingReversed.add(`{B:name} rises stiffly off your lap, tensing as you stand up close behind {B:him}.`,
  [playerA, isFearful]);
standingReversed.add(`With a shaky breath, {B:name} lets you draw {B:him} up to standing, {B:his} shoulders tight as you press in at {B:his} back.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name} stands very still as you rise behind {B:him}, {B:his} breath quick and shallow.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name} shivers as your {A:cock.thickCock} settles between {B:his} cheeks, the two of you standing pressed together.`,
  [playerA, isFearful, aVisibleCock]);
standingReversed.add(`{B:name} grumbles as you pull {B:him} up with you, standing stiffly with your body pressed against {B:his} back.`,
  [playerA, isResistant]);
standingReversed.add(`With a huff, {B:name} rises off your lap, leaning pointedly forward until you draw {B:him} back against you.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} mutters under {B:his} breath as the two of you stand, {B:his} arms crossed over {B:his} chest.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} shifts unhappily as your {A:cock.thickCock} presses back between {B:his} cheeks, but {B:he} stays put.`,
  [playerA, isResistant, aVisibleCock]);
standingReversed.add(`{B:name} tries to bolt the moment {B:he} is off your lap, but you surge up and lock your arms around {B:his} waist.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} thrashes as you haul {B:him} up with you, pinning {B:his} back against your chest as you stand.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} claws at your forearms as the two of you rise, your grip around {B:his} middle never loosening.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} struggles in your arms as you stand, your {A:cock.thickCock} pressed hard between {B:his} cheeks.`,
  [playerA, isViolent, aVisibleCock]);
standingReversed.add(`You rise out of {A:name's} lap, and {A:he} stands up close behind you, {A:his} arms finding their way back around your waist.`,
  [playerB, isLoving]);
standingReversed.add(`{A:name} rises with you, pressing a kiss to the back of your neck as {A:he} settles against your back.`,
  [playerB, isLoving]);
standingReversed.add(`{A:name's} {A:breasts.softBreasts} stay pressed warm against your back as the two of you rise to your feet.`,
  [playerB, isLoving, aVisibleBreasts]);
standingReversed.add(`{A:name's} {A:cock.thickCock} settles back between your cheeks as {A:he} stands up close behind you.`,
  [playerB, isLoving, aVisibleCock]);
standingReversed.add(`{A:name} surges up behind you the moment you leave {A:his} lap, grinding against your ass with a hungry groan.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name} rises with you, {A:his} hands roaming your front as {A:his} breath lands hot on your neck.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name's} {A:cock.bigHardCock} slides up between your cheeks as {A:he} stands up flush behind you.`,
  [playerB, isLustful, aHardCock]);
standingReversed.add(`{A:name's} {A:breasts.softBreasts} drag up your back as {A:he} rises behind you, pulling you tight against {A:him}.`,
  [playerB, isLustful, aVisibleBreasts]);
standingReversed.add(`You rise out of {A:name's} lap, and {A:he} stands up behind you without comment, {A:his} hands settling on your hips.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name} rises with you, keeping {A:his} body loosely against your back.`,
  [playerB, isAccepting]);
standingReversed.add(`The two of you stand together, {A:name} staying quietly at your back.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} rises to {A:his} feet behind you.`,
  [playerB, isAccepting, aVisibleCock]);
standingReversed.add(`{A:name} rises hesitantly behind you, {A:his} body barely brushing yours once you're both standing.`,
  [playerB, isFearful]);
standingReversed.add(`You feel {A:name} stand up at your back with a shaky breath, {A:his} trembling hands light on your hips.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name} holds {A:him}self carefully still behind you, {A:his} breath quick against your shoulder.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} nervously rises behind you.`,
  [playerB, isFearful, aVisibleCock]);
standingReversed.add(`{A:name} stands up grudgingly behind you, only staying close because you hold {A:his} hands at your waist.`,
  [playerB, isResistant]);
standingReversed.add(`With a huff, {A:name} rises, going stiff as you settle your back against {A:his} chest.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name} mutters something sour as you pull {A:his} arms around you, {A:his} chin turned away from your shoulder.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name} grumbles as you press back against {A:him}, {A:his} {A:cock.thickCock} caught between your cheeks.`,
  [playerB, isResistant, aVisibleCock]);
standingReversed.add(`{A:name} rises and tries to wrench away, but you keep {A:his} wrists pinned at your waist, holding {A:him} at your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} snarls as the two of you stand, unable to break the grip keeping {A:him} pressed against your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} shoves at you as {A:he} rises, but you lean back hard, trapping {A:him} close behind you.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name's} {A:cock.thickCock} is pinned between your cheeks as {A:he} struggles behind you, held fast.`,
  [playerB, isViolent, aVisibleCock]);
