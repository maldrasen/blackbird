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

const rearrange = WeaverPackage('missionary-reversed.rearrange');
const doggyStyle = WeaverPackage('missionary-reversed.move-to-doggy-style');
const missionary = WeaverPackage('missionary-reversed.move-to-missionary');
const spooning = WeaverPackage('missionary-reversed.move-to-spooning');
const straddle = WeaverPackage('missionary-reversed.move-to-straddle');

// First lying on top of Second. Second lying face down.
SexPosition.register('missionary-reversed',{
  name: 'Reverse Missionary',

  // Reaching down under the second person to grab their cock is difficult
  // unless they're raising their ass up, but not so much that this becomes a
  // different position.
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
    { code:'doggy-style', package:doggyStyle },
    { code:'missionary', package:missionary },
    { code:'spooning', package:spooning },
    { code:'straddle', package:straddle },
  ],

  rearrangePackage: rearrange,
});

// As with straddle, there are deliberately no options for the player voluntarily lying face down (as B) beneath a
// fearful, resistant, or violent partner.
rearrange.add(`{B:name} stretches out on {B:his} stomach with a warm glance back, sighing happily as you lower yourself over {B:his} back.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies down flat and pulls your arms around {B:him} as you settle over {B:his} back, your body covering {B:his}.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him} as you stretch out warmly on top.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} lies down flat with a contented sigh, your {A:cock.thickCock} coming to rest along the cleft of {B:his} ass as you settle over {B:him}.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`{B:name} drops eagerly onto {B:his} stomach, arching {B:his} ass up against you as you stretch out over {B:his} back.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} lies down and grinds back against you the moment your weight settles, moaning into {B:his} folded arms.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} moans as your {A:cock.bigHardCock} presses between {B:his} cheeks, your weight settling along {B:his} back.`,
  [playerA, isLustful, aHardCock]);
rearrange.add(`{B:name} spreads {B:his} thighs as {B:he} lies flat, {B:his} soaked {pussy} pressing back against you as you settle on top.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} lies down on {B:his} stomach without complaint, letting you stretch out on top of {B:him}.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles flat beneath you without protest as your weight comes down along {B:his} back.`,
  [playerA, isAccepting]);
rearrange.add(`You guide {B:name} down onto {B:his} stomach, and {B:he} lies quietly as you cover {B:his} body with yours.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies down flat, {B:his} {B:cock.thickCock} caught beneath {B:him} as you settle over {B:his} back.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} lowers {B:him}self onto {B:his} stomach nervously, {B:his} whole body tense as your weight settles over {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} lies down flat, {B:his} hands curling beneath {B:him} as you stretch out along {B:his} back.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} goes very still beneath you, {B:his} quick breaths pressed into {B:his} folded arms.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} flinches as your {A:cock.thickCock} comes to rest against {B:his} ass, {B:his} face turned into the crook of {B:his} arm.`,
  [playerA, isFearful, aVisibleCock]);
rearrange.add(`{B:name} grumbles as you press {B:him} down onto {B:his} stomach, lying stiff beneath your settling weight.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies down flat, {B:his} face turned pointedly away as you stretch out over {B:him}.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} mutters into {B:his} arms as your body covers {B:his}, every muscle held rigid.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts unhappily as your {A:cock.thickCock} settles between {B:his} cheeks, pinned beneath your weight.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you force {B:him} down onto {B:his} stomach, pinning {B:him} flat beneath your full weight.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you bear {B:him} down and stretch out over {B:his} back, {B:his} kicking legs trapped beneath yours.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls and bucks, but your weight along {B:his} back keeps {B:him} pinned face down.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} bucks beneath you as your {A:cock.thickCock} presses hard between {B:his} cheeks, {B:his} struggles pinned flat.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`You stretch out on your stomach, and {A:name} settles warmly over your back, nuzzling the nape of your neck.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} lowers {A:him}self gently along your back as you lie down flat, {A:his} arms sliding under yours to hold you.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} comes to rest between your cheeks as {A:he} settles affectionately over your back.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} press warmly into your back as {A:he} stretches out on top of you.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`You lie down flat, and {A:name} covers you with a hungry moan, grinding down against your ass.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} presses {A:his} weight down along your back, {A:his} breath hot against the nape of your neck.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} slides between your cheeks as {A:he} stretches out eagerly along your back.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} flatten against your back as {A:he} settles over you, moaning into your ear.`,
  [playerB, isLustful, aVisibleBreasts]);
rearrange.add(`You lie down on your stomach, and {A:name} settles over your back without comment.`,
  [playerB, isAccepting]);
rearrange.add(`You stretch out flat, and {A:name} lowers {A:him}self onto you, {A:his} weight pressing you gently down.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} covers your body with {A:his} own without protest as you settle onto your stomach.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} stretches out quietly along your back.`,
  [playerB, isAccepting, aVisibleCock]);

// Moving into doggy-style, "a" pushes up onto their knees behind while "b" rises from flat onto hands and knees.
// As elsewhere, no options for the player (as B) raising their ass to a fearful, resistant, or violent partner.
doggyStyle.add(`You push yourself up off {B:name's} back, and {B:he} rises onto {B:his} hands and knees beneath you, arching back into your hips.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} lifts {B:his} hips as you rise up behind {B:him}, settling onto all fours with a warm glance over {B:his} shoulder.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} pushes up onto {B:his} hands and knees, {B:his} {B:breasts.softBreasts} swaying beneath {B:him} as you kneel up behind.`,
  [playerA, isLoving, bVisibleBreasts]);
doggyStyle.add(`{B:name} rises onto all fours beneath you, {B:his} {B:cock.thickCock} swinging free as {B:his} hips lift into your hands.`,
  [playerA, isLoving, bVisibleCock]);
doggyStyle.add(`{B:name} shoves {B:his} ass up into you the moment your weight lifts, scrambling onto all fours with a needy moan.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} rises eagerly beneath you, arching {B:his} back and pressing {B:his} ass back against your hips.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} comes up onto {B:his} knees, {B:his} soaked {pussy} on display as {B:he} arches {B:his} ass up to you.`,
  [playerA, isLustful, bVisiblePussy]);
doggyStyle.add(`{B:name} grinds back against your {A:cock.bigHardCock} as {B:he} pushes up onto {B:his} hands and knees.`,
  [playerA, isLustful, aHardCock]);
doggyStyle.add(`You rise up onto your knees, and {B:name} pushes up onto all fours beneath you without complaint.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} lifts {B:his} hips as you kneel up behind {B:him}, settling onto {B:his} hands and knees.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} rises beneath you without protest, {B:his} ass settling back against your hips.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} comes up onto all fours, {B:his} {B:cock.thickCock} hanging beneath {B:him} as you kneel behind.`,
  [playerA, isAccepting, bVisibleCock]);
doggyStyle.add(`{B:name} pushes up onto {B:his} hands and knees quickly when you lift your weight, {B:his} body tense beneath your hands.`,
  [playerA, isFearful]);
doggyStyle.add(`With a shaky breath, {B:name} rises onto all fours, {B:his} arms trembling beneath {B:him}.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name} lifts {B:his} hips nervously as you kneel up behind {B:him}, obeying the pull of your hands.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath {B:him} as {B:he} nervously rises onto {B:his} knees.`,
  [playerA, isFearful, bVisibleCock]);
doggyStyle.add(`{B:name} grumbles as you haul {B:his} hips up, dragging {B:him} reluctantly onto {B:his} hands and knees.`,
  [playerA, isResistant]);
doggyStyle.add(`With a huff, {B:name} pushes up onto all fours, {B:his} head hanging between {B:his} shoulders.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} rises grudgingly beneath you, {B:his} spine stiff as you settle in behind {B:him}.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} lifts {B:his} hips with poor grace, {B:his} {B:cock.thickCock} swaying beneath {B:him}.`,
  [playerA, isResistant, bVisibleCock]);
doggyStyle.add(`{B:name} tries to crawl free the moment your weight lifts, but you catch {B:his} hips and drag {B:him} back onto {B:his} knees.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} thrashes as you haul {B:his} hips up into position, pinning {B:him} on all fours in front of you.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} snarls over {B:his} shoulder as you wrench {B:his} ass up against your hips.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name's} {B:cock.thickCock} swings wildly as {B:he} fights the grip dragging {B:his} hips up to yours.`,
  [playerA, isViolent, bVisibleCock]);
doggyStyle.add(`{A:name} lifts {A:his} weight off your back, {A:his} hands guiding your hips up as you rise onto your hands and knees.`,
  [playerB, isLoving]);
doggyStyle.add(`You push up onto all fours, and {A:name} kneels up close behind you, stroking a warm hand down your spine.`,
  [playerB, isLoving]);
doggyStyle.add(`{A:name's} {A:cock.thickCock} rests against your ass as {A:he} rises behind you, helping you up onto your knees.`,
  [playerB, isLoving, aVisibleCock]);
doggyStyle.add(`{A:name's} {A:breasts.softBreasts} drag up your back as {A:he} pushes upright, {A:his} hands warm on your rising hips.`,
  [playerB, isLoving, aVisibleBreasts]);
doggyStyle.add(`{A:name} rises and yanks your hips up after {A:him}, groaning as your ass settles back against {A:him}.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} kneels up behind you with a hungry sound, {A:his} hands kneading your ass as you come up onto all fours.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} moans as you arch up onto your hands and knees, grinding against your upturned ass.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name's} {A:cock.bigHardCock} presses between your cheeks as {A:he} pulls your hips up against {A:him}.`,
  [playerB, isLustful, aHardCock]);
doggyStyle.add(`{A:name} rises up behind you without comment, {A:his} hands resting on your hips as you push onto all fours.`,
  [playerB, isAccepting]);
doggyStyle.add(`You come up onto your hands and knees, and {A:name} settles in quietly behind you.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name} kneels up and waits as you lift your hips into place.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name's} {A:cock.thickCock} brushes your thigh as {A:he} rises up behind you.`,
  [playerB, isAccepting, aVisibleCock]);

// Moving into missionary, "a" stays on top while "b" turns from face down to face up beneath them.
missionary.add(`You lift your weight, and {B:name} rolls over beneath you, smiling up as {B:his} legs part around your hips.`,
  [playerA, isLoving]);
missionary.add(`{B:name} turns face up under you with a happy sigh, {B:his} arms reaching up to draw you back down.`,
  [playerA, isLoving]);
missionary.add(`{B:name} rolls over beneath you, {B:his} {B:breasts.softBreasts} coming to rest against your chest as you settle back down.`,
  [playerA, isLoving, bVisibleBreasts]);
missionary.add(`{B:name} turns over with a warm smile, {B:his} {B:cock.thickCock} settling between your stomachs.`,
  [playerA, isLoving, bVisibleCock]);
missionary.add(`{B:name} flips over eagerly the moment you give {B:him} room, wrapping {B:his} legs around your waist and dragging you down.`,
  [playerA, isLustful]);
missionary.add(`{B:name} rolls face up with a needy moan, grinding up against you before you've even settled.`,
  [playerA, isLustful]);
missionary.add(`{B:name} turns over and spreads {B:his} thighs wide, {B:his} soaked {pussy} tilted up to meet you.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`{B:name's} {B:cock.bigHardCock} springs free as {B:he} rolls over, pressing up between your stomachs.`,
  [playerA, isLustful, bHardCock]);
missionary.add(`You raise your hips, and {B:name} turns over beneath you without complaint, settling onto {B:his} back.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} rolls face up under you, {B:his} legs parting to let you settle back down.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} shifts onto {B:his} back quietly, accepting your weight as it returns.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} turns over, {B:his} {B:cock.thickCock} lying between your bodies as you lower yourself back onto {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
missionary.add(`{B:name} turns over nervously when you ease your weight up, {B:his} wide eyes finding yours as you settle back down.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} rolls onto {B:his} back beneath you, {B:his} legs parting hesitantly.`,
  [playerA, isFearful]);
missionary.add(`{B:name} lies tense and still once {B:he} has turned, watching you lower yourself onto {B:him}.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously settles face up.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles as you turn {B:him} over beneath you, {B:his} face angled away as you settle back down.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} rolls onto {B:his} back, {B:his} thighs parting only when you press between them.`,
  [playerA, isResistant]);
missionary.add(`{B:name} turns over grudgingly, lying stiff as your weight returns to {B:him}.`,
  [playerA, isResistant]);
missionary.add(`{B:name} shifts unhappily beneath you as {B:he} turns, {B:his} {B:cock.thickCock} caught between your stomachs.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} tries to scramble away as your weight lifts, but you flip {B:him} onto {B:his} back and pin {B:him} down again.`,
  [playerA, isViolent]);
missionary.add(`{B:name} thrashes as you wrestle {B:him} over, {B:his} fists caught in your grip as you settle between {B:his} legs.`,
  [playerA, isViolent]);
missionary.add(`{B:name} snarls up at you once {B:he} is turned, bucking uselessly beneath your returning weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} fights, flipped over and pinned face to face.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`{A:name} lifts up to give you room, smiling down as you roll onto your back beneath {A:him}.`,
  [playerB, isLoving]);
missionary.add(`You turn over under {A:name}, and {A:he} lowers {A:him}self back down with a warm hum, chest to chest at last.`,
  [playerB, isLoving]);
missionary.add(`{A:name's} {A:breasts.softBreasts} settle against your chest as you turn over and {A:he} sinks back down onto you.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name's} {A:cock.thickCock} comes to rest against your stomach as you roll over beneath {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name} barely waits for you to finish turning before {A:his} weight drops back down, grinding against you with a moan.`,
  [playerB, isLustful]);
missionary.add(`{A:name} watches hungrily as you roll over, {A:his} mouth finding your throat the moment you settle face up.`,
  [playerB, isLustful]);
missionary.add(`{A:name's} {A:cock.bigHardCock} presses down between your bodies as {A:he} settles onto you, {A:his} hips already rocking.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`{A:name} grinds {A:his} soaked {pussy} down against you as {A:he} settles back onto your upturned body.`,
  [playerB, isLustful, aVisiblePussy]);
missionary.add(`{A:name} raises {A:his} hips, letting you turn over onto your back beneath {A:him}.`,
  [playerB, isAccepting]);
missionary.add(`You roll face up, and {A:name} settles back down onto you without comment.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} waits out your turn, then lowers {A:his} weight back down over you.`,
  [playerB, isAccepting]);
missionary.add(`{A:name's} {A:cock.thickCock} settles against your thigh as {A:he} comes back down over you.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} eases back down nervously once you've turned over, {A:his} eyes sliding away from yours.`,
  [playerB, isFearful]);
missionary.add(`{A:name} holds {A:him}self stiffly above you as you roll over, lowering {A:him}self with a shaky breath.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} arms tremble beside your head as {A:he} settles back down, now face to face.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your thigh as {A:he} nervously lowers {A:him}self.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles as you turn over beneath {A:him}, settling back down with {A:his} face turned aside.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} lowers {A:him}self back onto you, refusing to meet your upturned gaze.`,
  [playerB, isResistant]);
missionary.add(`{A:name} mutters something sour as {A:his} weight comes back down over you.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts against your thigh as {A:he} grudgingly settles back onto you.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} tries to pull back as you turn over, but you catch {A:his} wrists and drag {A:him} back down on top of you.`,
  [playerB, isViolent]);
missionary.add(`{A:name} thrashes above you, but your legs lock around {A:his} waist, pulling {A:him} flush against your chest.`,
  [playerB, isViolent]);
missionary.add(`{A:name} snarls as you roll over and haul {A:him} down, {A:his} struggles pinned between your bodies.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} grinds against your stomach as {A:he} fights your hold, dragged down face to face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into spooning, the pair rolls together onto their sides, "a" staying pressed at "b's" back.
spooning.add(`You roll to the side, drawing {B:name} with you, and {B:he} nestles back into the curve of your body with a contented sigh.`,
  [playerA, isLoving]);
spooning.add(`{B:name} follows you over onto {B:his} side, pulling your arm around {B:him} like a blanket.`,
  [playerA, isLoving]);
spooning.add(`{B:name} rolls with you onto {B:his} side, guiding your arm around {B:him} until your hand rests against {B:his} {B:breasts.softBreasts}.`,
  [playerA, isLoving, bVisibleBreasts]);
spooning.add(`The two of you roll onto your sides together, your {A:cock.thickCock} staying nestled between {B:name's} cheeks as {B:he} settles back into you.`,
  [playerA, isLoving, aVisibleCock]);
spooning.add(`{B:name} grinds back against you the moment you roll onto your sides, pulling your hips tight against {B:his} ass.`,
  [playerA, isLustful]);
spooning.add(`{B:name} rolls with you eagerly, wriggling back until every inch of {B:him} is pressed into your front.`,
  [playerA, isLustful]);
spooning.add(`{B:name} drags your hand down {B:his} body as you spoon up behind {B:him}, {B:his} hips already rocking back.`,
  [playerA, isLustful]);
spooning.add(`{B:name} moans as the two of you settle onto your sides, your {A:cock.bigHardCock} wedged snug between {B:his} cheeks.`,
  [playerA, isLustful, aHardCock]);
spooning.add(`You roll the two of you onto your sides, and {B:name} settles back against your chest without complaint.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} turns onto {B:his} side as your weight shifts, letting you curl up behind {B:him}.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} lies quietly in the curve of your body, your arm draped over {B:his} waist.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} settles onto {B:his} side, {B:his} {B:cock.thickCock} lying against {B:his} thigh as you spoon in close.`,
  [playerA, isAccepting, bVisibleCock]);
spooning.add(`{B:name} lets you roll {B:him} onto {B:his} side, {B:his} body held tense in the circle of your arms.`,
  [playerA, isFearful]);
spooning.add(`With a shaky breath, {B:name} settles onto {B:his} side, flinching when your arm closes over {B:him}.`,
  [playerA, isFearful]);
spooning.add(`{B:name} lies very still against you, {B:his} quick heartbeat plain beneath your palm.`,
  [playerA, isFearful]);
spooning.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} thigh as {B:he} nervously settles back into you.`,
  [playerA, isFearful, bVisibleCock]);
spooning.add(`{B:name} grumbles as you tip {B:him} onto {B:his} side, holding {B:him}self stiffly inside the curl of your body.`,
  [playerA, isResistant]);
spooning.add(`With a huff, {B:name} rolls over, tugging {B:his} shoulder away from your chin.`,
  [playerA, isResistant]);
spooning.add(`{B:name} endures the drape of your arm across {B:him}, {B:his} whole body radiating displeasure.`,
  [playerA, isResistant]);
spooning.add(`{B:name} shifts unhappily as your {A:cock.thickCock} settles between {B:his} cheeks, the two of you pressed together on your sides.`,
  [playerA, isResistant, aVisibleCock]);
spooning.add(`{B:name} tries to wrench free as you roll, but your arms lock around {B:him}, pinning {B:his} back to your chest.`,
  [playerA, isViolent]);
spooning.add(`{B:name} kicks and struggles as the two of you land on your sides, your leg hooking over {B:his} to still them.`,
  [playerA, isViolent]);
spooning.add(`{B:name} claws at the arm barred across {B:his} chest, held fast in the curve of your body.`,
  [playerA, isViolent]);
spooning.add(`{B:name} thrashes in your grip as you settle onto your sides, your {A:cock.thickCock} pressed hard between {B:his} cheeks.`,
  [playerA, isViolent, aVisibleCock]);
spooning.add(`{A:name} rolls the two of you onto your sides, {A:his} arm settling warm around your waist as {A:he} tucks in behind you.`,
  [playerB, isLoving]);
spooning.add(`You turn onto your side, and {A:name} molds {A:him}self to your back, pressing a kiss behind your ear.`,
  [playerB, isLoving]);
spooning.add(`{A:name's} {A:cock.thickCock} stays nestled between your cheeks as {A:he} rolls you both onto your sides.`,
  [playerB, isLoving, aVisibleCock]);
spooning.add(`{A:name's} {A:breasts.softBreasts} press soft against your back as {A:he} curls up behind you.`,
  [playerB, isLoving, aVisibleBreasts]);
spooning.add(`{A:name} rolls you onto your side and drags your hips back against {A:him}, {A:his} breath hot on your neck.`,
  [playerB, isLustful]);
spooning.add(`{A:name} spoons up tight behind you, {A:his} hand roaming down your front as {A:he} grinds against your ass.`,
  [playerB, isLustful]);
spooning.add(`{A:name's} {A:cock.bigHardCock} wedges between your cheeks as {A:he} pulls you back into the curve of {A:his} body.`,
  [playerB, isLustful, aHardCock]);
spooning.add(`{A:name's} {A:breasts.softBreasts} flatten against your back as {A:he} hauls you close, moaning into your hair.`,
  [playerB, isLustful, aVisibleBreasts]);
spooning.add(`{A:name} rolls onto {A:his} side, drawing you with {A:him} until your back rests against {A:his} chest.`,
  [playerB, isAccepting]);
spooning.add(`You turn onto your side, and {A:name} settles in behind you without comment.`,
  [playerB, isAccepting]);
spooning.add(`{A:name} curls up at your back, {A:his} arm resting loose over your waist.`,
  [playerB, isAccepting]);
spooning.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} settles in behind you.`,
  [playerB, isAccepting, aVisibleCock]);
spooning.add(`{A:name} eases the two of you onto your sides, {A:his} arm settling over you light and uncertain.`,
  [playerB, isFearful]);
spooning.add(`{A:name} tucks in behind you hesitantly, {A:his} breath unsteady against the back of your neck.`,
  [playerB, isFearful]);
spooning.add(`With a shaky breath, {A:name} curls at your back, barely daring to hold you.`,
  [playerB, isFearful]);
spooning.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} nervously settles in behind you.`,
  [playerB, isFearful, aVisibleCock]);
spooning.add(`{A:name} grumbles as you pull {A:his} arm over you, {A:his} body stiff at your back.`,
  [playerB, isResistant]);
spooning.add(`With a huff, {A:name} rolls onto {A:his} side behind you, holding {A:him}self apart until you press back into {A:him}.`,
  [playerB, isResistant]);
spooning.add(`{A:name} mutters into your hair as {A:he} settles grudgingly against your back.`,
  [playerB, isResistant]);
spooning.add(`{A:name's} {A:cock.thickCock} presses between your cheeks as {A:he} reluctantly curls in behind you.`,
  [playerB, isResistant, aVisibleCock]);
spooning.add(`{A:name} tries to roll away, but you catch {A:his} arm and drag it over you, pinning {A:him} against your back.`,
  [playerB, isViolent]);
spooning.add(`{A:name} struggles behind you, but your grip on {A:his} wrist keeps {A:his} arm locked across your chest.`,
  [playerB, isViolent]);
spooning.add(`{A:name} thrashes at your back, but you hook your leg back over {A:his}, holding {A:him} in place.`,
  [playerB, isViolent]);
spooning.add(`{A:name's} {A:cock.thickCock} is pinned between your cheeks as {A:he} fights to pull away from your back.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into straddle, "a" pushes up from lying along "b's" back to sitting upright astride their waist. "b"
// stays face down throughout.
straddle.add(`You push yourself up to sit astride {B:name's} waist, and {B:he} hums happily, settling deeper beneath you.`,
  [playerA, isLoving]);
straddle.add(`{B:name} glances warmly back over {B:his} shoulder as you rise upright, your knees framing {B:his} hips.`,
  [playerA, isLoving]);
straddle.add(`{B:name} sighs contentedly under you as you sit up, your weight coming to rest on {B:his} hips.`,
  [playerA, isLoving]);
straddle.add(`You sit upright astride {B:name}, your {A:cock.thickCock} resting warmly along {B:his} spine as {B:he} relaxes beneath you.`,
  [playerA, isLoving, aVisibleCock]);
straddle.add(`{B:name} grinds {B:his} hips up into you as you sit upright astride {B:him}, moaning into {B:his} arms.`,
  [playerA, isLustful]);
straddle.add(`{B:name} arches beneath you as you rise, pressing {B:his} ass up against you as you settle astride {B:his} waist.`,
  [playerA, isLustful]);
straddle.add(`{B:name} rocks {B:his} hips beneath you the moment you sit up, {B:his} breath coming quick and eager.`,
  [playerA, isLustful]);
straddle.add(`{B:name} shivers as your {A:cock.bigHardCock} drags up {B:his} spine, your weight settling astride {B:his} hips.`,
  [playerA, isLustful, aHardCock]);
straddle.add(`You push up to sit astride {B:name's} waist, and {B:he} lies quietly beneath you.`,
  [playerA, isAccepting]);
straddle.add(`{B:name} holds still as you rise upright, your weight settling onto {B:his} hips.`,
  [playerA, isAccepting]);
straddle.add(`{B:name} adjusts beneath you without complaint as you straighten up astride {B:him}.`,
  [playerA, isAccepting]);
straddle.add(`You sit up astride {B:name}, your {A:cock.thickCock} coming to rest along {B:his} lower back.`,
  [playerA, isAccepting, aVisibleCock]);
straddle.add(`{B:name} tenses as your weight gathers onto {B:his} hips, {B:his} face pressed into {B:his} folded arms.`,
  [playerA, isFearful]);
straddle.add(`With a shaky breath, {B:name} lies still beneath you as you sit upright astride {B:his} waist.`,
  [playerA, isFearful]);
straddle.add(`{B:name's} hands curl beneath {B:him} as you rise, {B:his} breathing quick and shallow under your weight.`,
  [playerA, isFearful]);
straddle.add(`{B:name} flinches at the shift of your weight, holding {B:him}self rigid as you settle astride {B:his} hips.`,
  [playerA, isFearful]);
straddle.add(`{B:name} grumbles into {B:his} arms as you push upright, your weight pinning {B:his} hips down.`,
  [playerA, isResistant]);
straddle.add(`With a huff, {B:name} endures your weight settling astride {B:him}, {B:his} face turned away.`,
  [playerA, isResistant]);
straddle.add(`{B:name} squirms in irritation beneath you as you sit up astride {B:his} waist.`,
  [playerA, isResistant]);
straddle.add(`{B:name} mutters something sour as your {A:cock.thickCock} comes to rest against {B:his} back.`,
  [playerA, isResistant, aVisibleCock]);
straddle.add(`{B:name} takes the shift as {B:his} cue to buck, but your knees clamp {B:his} hips and your weight bears {B:him} back down.`,
  [playerA, isViolent]);
straddle.add(`{B:name} tries to crawl out from under you as you rise, but you sit down hard astride {B:his} waist, pinning {B:him} flat.`,
  [playerA, isViolent]);
straddle.add(`{B:name} snarls and struggles, but you catch {B:his} wrists and pin them to the small of {B:his} back as you sit upright.`,
  [playerA, isViolent]);
straddle.add(`{B:name} bucks hard beneath you, {B:his} struggles doing nothing to unseat your weight from {B:his} hips.`,
  [playerA, isViolent]);
straddle.add(`{A:name} pushes {A:him}self up to sit astride your waist, {A:his} hands trailing warmly up your back as {A:he} rises.`,
  [playerB, isLoving]);
straddle.add(`{A:name's} weight gathers gently onto your hips as {A:he} sits upright, {A:his} palms smoothing over your shoulders.`,
  [playerB, isLoving]);
straddle.add(`{A:name} hums contentedly above you as {A:he} straightens up, {A:his} weight settling astride your waist.`,
  [playerB, isLoving]);
straddle.add(`{A:name's} {A:cock.thickCock} comes to rest along your spine as {A:he} settles upright astride your hips.`,
  [playerB, isLoving, aVisibleCock]);
straddle.add(`{A:name} sits up with a hungry groan, grinding down against your ass as {A:his} weight settles.`,
  [playerB, isLustful]);
straddle.add(`{A:name} rises astride you, {A:his} nails dragging lightly down your back as {A:he} settles onto your hips.`,
  [playerB, isLustful]);
straddle.add(`{A:name's} {A:cock.bigHardCock} drags up your spine as {A:he} pushes upright, {A:his} hips rocking against you.`,
  [playerB, isLustful, aHardCock]);
straddle.add(`{A:name} grinds {A:his} soaked {pussy} down against your ass as {A:he} settles upright astride you.`,
  [playerB, isLustful, aVisiblePussy]);
straddle.add(`{A:name} pushes up to sit astride your waist without comment, {A:his} weight resting on your hips.`,
  [playerB, isAccepting]);
straddle.add(`{A:name} straightens up above you, {A:his} hands settling loosely on your shoulders.`,
  [playerB, isAccepting]);
straddle.add(`{A:name} sits upright on your hips, letting {A:his} weight settle without protest.`,
  [playerB, isAccepting]);
straddle.add(`{A:name's} {A:cock.thickCock} rests against your lower back as {A:he} sits up astride you.`,
  [playerB, isAccepting, aVisibleCock]);
straddle.add(`{A:name} rises hesitantly to sit astride your waist, {A:his} thighs trembling against your sides.`,
  [playerB, isFearful]);
straddle.add(`{A:name's} weight settles nervously onto your hips, {A:his} hands hovering above your back.`,
  [playerB, isFearful]);
straddle.add(`With a shaky breath, {A:name} pushes {A:him}self upright, perched stiffly astride you.`,
  [playerB, isFearful]);
straddle.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your back as {A:he} nervously sits upright.`,
  [playerB, isFearful, aVisibleCock]);
straddle.add(`{A:name} grumbles as you nudge {A:him} upright, sitting astride your waist with poor grace.`,
  [playerB, isResistant]);
straddle.add(`With a huff, {A:name} pushes {A:him}self up, {A:his} weight settling grudgingly onto your hips.`,
  [playerB, isResistant]);
straddle.add(`{A:name} mutters something under {A:his} breath as {A:he} straightens up astride you.`,
  [playerB, isResistant]);
straddle.add(`{A:name's} {A:cock.thickCock} shifts against your back as {A:he} reluctantly sits upright.`,
  [playerB, isResistant, aVisibleCock]);
straddle.add(`{A:name} tries to climb off as {A:he} rises, but you reach back and clamp a hand on {A:his} thigh, keeping {A:him} astride you.`,
  [playerB, isViolent]);
straddle.add(`{A:name} thrashes upright, but {A:his} struggles only settle {A:his} weight harder onto your hips.`,
  [playerB, isViolent]);
straddle.add(`{A:name} snarls above you, unable to pull free of the grip holding {A:him} seated on your waist.`,
  [playerB, isViolent]);
straddle.add(`{A:name's} {A:cock.thickCock} presses against your back as {A:he} fights to dismount, held astride you.`,
  [playerB, isViolent, aVisibleCock]);
