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

const rearrange = WeaverPackage('cowgirl.rearrange');
const cowgirlReversed = WeaverPackage('cowgirl.move-to-cowgirl-reversed');
const faceSitting = WeaverPackage('cowgirl.move-to-face-sitting');
const straddle = WeaverPackage('cowgirl.move-to-straddle');

// First on bottom, laying down. Second straddling their waist facing first's head.
SexPosition.register('cowgirl',{
  name: 'Cowgirl',

  // Pussy fingering from the cowgirl position is awkward and difficult, but
  // technically possible. Should this have a difficulty penalty maybe?
  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      hands: [HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'cowgirl-reversed', package:cowgirlReversed },
    { code:'face-sitting', package:faceSitting, swap:true },
    { code:'straddle', package:straddle, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} settles down onto your lap with a warm smile, straddling your hips and gazing into your eyes.`,
  [playerA, isLoving]);
rearrange.add(`With obvious affection, {B:name} climbs astride you, {B:his} hands resting gently on your chest as {B:he} settles down.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles astride you, {B:his} {B:cock.thickCock} resting warmly against your stomach.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} straddles your hips, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} leans over you.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} climbs eagerly astride you, grinding {B:his} hips down with a hungry grin.`,
  [playerA, isLustful]);
rearrange.add(`With a needy moan, {B:name} straddles your hips, already rocking against you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} straddles you, {B:his} hard {B:cock.bigCock} bobbing eagerly as {B:he} settles down.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} straddles you, {B:his} soaked {pussy} grinding eagerly against you.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} climbs astride you without complaint, settling down onto your hips.`,
  [playerA, isAccepting]);
rearrange.add(`Without protest, {B:name} straddles your hips and settles into place.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} straddles your hips, {B:his} {B:cock.thickCock} resting against your stomach.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} climbs astride you nervously, {B:his} hands trembling as {B:he} settles onto your hips.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} straddles you, unsure what to expect.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously settles astride you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as {B:he} climbs astride you, reluctantly settling onto your hips.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} straddles you, clearly unhappy about it.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts reluctantly as {B:he} settles astride you, {B:his} {B:cock.thickCock} swaying with the motion.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you pull {B:him} down astride you, forcing {B:him} to straddle your hips.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you drag {B:him} down onto your lap anyway.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings as {B:he} thrashes astride you.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`You settle down onto {A:name's} lap, straddling {A:his} hips as {A:he} gazes up at you with a warm smile.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} smiles warmly up at you as you climb astride {A:him}, {A:his} hands resting gently on your hips.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} smiles up at you, {A:his} {A:cock.thickCock} resting warmly against your stomach as you settle astride {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} smiles up at you, {A:his} {A:breasts.softBreasts} rising and falling gently as you settle astride {A:him}.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} grins hungrily up at you as you climb astride {A:him}, {A:his} hips pressing up against you.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans as you straddle {A:him}, {A:his} hips already rocking up against you.`,
  [playerB, isLustful]);
rearrange.add(`{A:his} hard {A:cock.bigCock} bobs eagerly as you settle astride {A:him}.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:his} soaked {pussy} glistens with need as you settle astride {A:him}, {A:his} hips grinding up against you.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name} lies back without complaint as you climb astride {A:him}, settling down onto {A:his} hips.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} watches without protest as you straddle {A:him} and settle into place.`,
  [playerB, isAccepting]);
rearrange.add(`{A:his} {A:cock.thickCock} rests against your stomach as you settle astride {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} lies nervously beneath you, {A:his} hands trembling as you settle onto {A:his} hips.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} watches you settle astride {A:him}, unsure what to expect.`,
  [playerB, isFearful]);
rearrange.add(`{A:his} {A:cock.sixInch} long {cock} trembles as {A:he} nervously lies beneath you.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you climb astride {A:him}, clearly reluctant.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} lies beneath you, unhappy about the whole thing.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} shifts reluctantly beneath you, {A:his} {A:cock.thickCock} pressed against your stomach as you settle astride {A:him}.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} thrashes as you climb astride {A:him} anyway, pinning {A:him} down beneath your weight.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} struggles, but you settle astride {A:him} regardless.`,
  [playerB, isViolent]);
rearrange.add(`{A:his} {A:cock.thickCock} swings as {A:he} thrashes beneath you.`,
  [playerB, isViolent, aVisibleCock]);



cowgirlReversed.add(`{B:name} smiles and turns around atop you, still straddling your hips but now facing your feet.`,
  [playerA, isLoving]);
cowgirlReversed.add(`With a playful grin, {B:name} spins around, keeping {B:his} hips settled on yours as {B:he} faces away.`,
  [playerA, isLoving]);
cowgirlReversed.add(`{B:name} turns around, {B:his} {B:cock.thickCock} brushing against your leg as {B:he} settles back down facing away.`,
  [playerA, isLoving, bVisibleCock]);
cowgirlReversed.add(`{B:name} eagerly spins around atop you, grinding {B:his} hips down as {B:he} turns to face your feet.`,
  [playerA, isLustful]);
cowgirlReversed.add(`With a needy moan, {B:name} turns around, presenting {B:his} ass as {B:he} settles back onto you.`,
  [playerA, isLustful]);
cowgirlReversed.add(`{B:name} turns around, {B:his} soaked {pussy} on display as {B:he} settles back down facing your feet.`,
  [playerA, isLustful, bVisiblePussy]);
cowgirlReversed.add(`{B:name} turns around without complaint, settling back down facing your feet.`,
  [playerA, isAccepting]);
cowgirlReversed.add(`Without protest, {B:name} spins around atop you.`,
  [playerA, isAccepting]);
cowgirlReversed.add(`{B:name} turns around nervously, unsure why you want {B:him} facing away.`,
  [playerA, isFearful]);
cowgirlReversed.add(`With a shaky breath, {B:name} spins around atop you.`,
  [playerA, isFearful]);
cowgirlReversed.add(`{B:name} grumbles as {B:he} turns around, reluctantly facing away from you.`,
  [playerA, isResistant]);
cowgirlReversed.add(`With a huff, {B:name} spins around atop you.`,
  [playerA, isResistant]);
cowgirlReversed.add(`{B:name} thrashes as you turn {B:him} around, forcing {B:him} to face away from you.`,
  [playerA, isViolent]);
cowgirlReversed.add(`{B:name} struggles, but you spin {B:him} around anyway.`,
  [playerA, isViolent]);
cowgirlReversed.add(`{A:name} smiles as you turn around atop {A:him}, still straddling {A:his} hips but now facing {A:his} feet.`,
  [playerB, isLoving]);
cowgirlReversed.add(`{A:name} grins playfully as you spin around, keeping your hips settled on {A:his} as you turn to face away.`,
  [playerB, isLoving]);
cowgirlReversed.add(`{A:name} smiles as you turn around, {A:his} {A:cock.thickCock} brushing against your leg as you settle back down facing away.`,
  [playerB, isLoving, aVisibleCock]);
cowgirlReversed.add(`{A:name} groans eagerly as you spin around atop {A:him}, {A:his} hips bucking up as you turn to face {A:his} feet.`,
  [playerB, isLustful]);
cowgirlReversed.add(`{A:name} moans as you turn around, {A:his} eyes locked on your ass as you settle back down onto {A:him}.`,
  [playerB, isLustful]);
cowgirlReversed.add(`You turn around, {A:his} soaked {pussy} brushing your ass as you settle back down facing {A:his} feet.`,
  [playerB, isLustful, aVisiblePussy]);
cowgirlReversed.add(`You turn around, and {A:name} watches without comment as you settle back down facing {A:his} feet.`,
  [playerB, isAccepting]);
cowgirlReversed.add(`{A:name} lies quietly as you spin around atop {A:him}.`,
  [playerB, isAccepting]);
cowgirlReversed.add(`{A:name} watches nervously as you turn around atop {A:him}.`,
  [playerB, isFearful]);
cowgirlReversed.add(`With a shaky breath, {A:name} lies still as you spin around atop {A:him}.`,
  [playerB, isFearful]);
cowgirlReversed.add(`{A:name} grumbles as you turn around atop {A:him}, clearly reluctant.`,
  [playerB, isResistant]);
cowgirlReversed.add(`With a huff, {A:name} lies beneath you as you spin around.`,
  [playerB, isResistant]);
cowgirlReversed.add(`{A:name} thrashes as you turn around atop {A:him} anyway.`,
  [playerB, isViolent]);
cowgirlReversed.add(`{A:name} struggles, but you spin around regardless.`,
  [playerB, isViolent]);



// Moving into face-sitting, "a" is always the one shifting forward to sit on "b's" face.
faceSitting.add(`You scoot forward, settling your hips over {B:name's} face as {B:he} tilts {B:his} head back with a warm smile, welcoming you.`,
  [playerA, isLoving]);
faceSitting.add(`With obvious affection, {B:name} turns {B:his} face up eagerly as you shift forward to sit astride {B:his} face.`,
  [playerA, isLoving]);
faceSitting.add(`You settle down, your {A:cock.thickCock} resting against {B:his} chest as {B:he} smiles up from between your thighs.`,
  [playerA, isLoving, aVisibleCock]);
faceSitting.add(`{B:name} moans in anticipation as you scoot forward, settling your hips over {B:his} face.`,
  [playerA, isLustful]);
faceSitting.add(`Eager for a taste, {B:name} tilts {B:his} head back as you shift forward to sit on {B:his} face.`,
  [playerA, isLustful]);
faceSitting.add(`You settle down, your {pussy} hovering over {B:his} eagerly waiting mouth.`,
  [playerA, isLustful, aVisiblePussy]);
faceSitting.add(`You scoot forward, settling over {B:name's} face without complaint from {B:him}.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} tilts {B:his} head back without protest as you shift forward to sit on {B:his} face.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} tilts {B:his} head back nervously as you shift forward to sit on {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`With a shaky breath, {B:name} lies still as you settle your hips over {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`{B:name} grumbles, reluctantly tilting {B:his} head back as you shift forward.`,
  [playerA, isResistant]);
faceSitting.add(`With a huff, {B:name} lies still as you settle over {B:his} face.`,
  [playerA, isResistant]);
faceSitting.add(`{B:name} thrashes as you shift forward, forcing {B:his} head back as you settle over {B:his} face.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name} struggles, but you settle your hips over {B:his} face anyway.`,
  [playerA, isViolent]);
faceSitting.add(`{A:name} shifts forward with a warm smile, settling {A:his} hips over your face as you tilt your head back to welcome {A:him}.`,
  [playerB, isLoving]);
faceSitting.add(`With obvious affection, {A:name} scoots forward to sit astride your face.`,
  [playerB, isLoving]);
faceSitting.add(`{A:His} {A:cock.thickCock} rests against your chest as {A:name} settles down gently to sit astride your face.`,
  [playerB, isLoving, aVisibleCock]);
faceSitting.add(`{A:name} moans eagerly as {A:he} scoots forward, settling {A:his} hips over your face.`,
  [playerB, isLustful]);
faceSitting.add(`Hungry for it, {A:name} shifts forward to sit astride your face.`,
  [playerB, isLustful]);
faceSitting.add(`{A:name} settles down eagerly, {A:his} soaked {pussy} hovering over your waiting mouth.`,
  [playerB, isLustful, aVisiblePussy]);
faceSitting.add(`{A:name} shifts forward without complaint, settling over your face.`,
  [playerB, isAccepting]);
faceSitting.add(`Without protest, {A:name} scoots forward to sit on your face.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name} shifts forward nervously, settling {A:his} hips over your face.`,
  [playerB, isFearful]);
faceSitting.add(`With a shaky breath, {A:name} scoots forward to sit on your face.`,
  [playerB, isFearful]);
faceSitting.add(`{A:name} grumbles as {A:he} shifts forward, reluctantly settling over your face.`,
  [playerB, isResistant]);
faceSitting.add(`With a huff, {A:name} scoots forward to sit on your face.`,
  [playerB, isResistant]);
faceSitting.add(`{A:name} thrashes as you grab {A:his} hips and pull {A:him} down onto your face anyway.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name} struggles, but you pull {A:him} down onto your face regardless.`,
  [playerB, isViolent]);



// Moving into straddle, "a" stays on top while "b" turns from face-up to face-down beneath them.
straddle.add(`{B:name} smiles and rolls onto {B:his} stomach beneath you as you shift back to straddle {B:his} waist.`,
  [playerA, isLoving]);
straddle.add(`With obvious affection, {B:name} turns face-down, settling in as you slide back to straddle {B:his} hips.`,
  [playerA, isLoving]);
straddle.add(`{B:name} rolls onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him}, as you shift back to straddle {B:his} waist.`,
  [playerA, isLoving, bVisibleCock]);
straddle.add(`{B:name} eagerly flips onto {B:his} stomach, arching {B:his} back as you shift back to straddle {B:his} waist.`,
  [playerA, isLustful]);
straddle.add(`With a needy moan, {B:name} rolls face-down beneath you as you slide back onto {B:his} hips.`,
  [playerA, isLustful]);
straddle.add(`{B:name} arches {B:his} back eagerly, grinding {B:his} soaked {pussy} against the sheets as you shift back to straddle {B:his} waist.`,
  [playerA, isLustful, bVisiblePussy]);
straddle.add(`{B:name} turns onto {B:his} stomach without complaint as you shift back to straddle {B:his} waist.`,
  [playerA, isAccepting]);
straddle.add(`Without protest, {B:name} rolls face-down beneath you.`,
  [playerA, isAccepting]);
straddle.add(`{B:name} turns over nervously as you shift back to straddle {B:his} waist.`,
  [playerA, isFearful]);
straddle.add(`With a shaky breath, {B:name} rolls face-down beneath you.`,
  [playerA, isFearful]);
straddle.add(`{B:name} grumbles as {B:he} reluctantly turns onto {B:his} stomach.`,
  [playerA, isResistant]);
straddle.add(`With a huff, {B:name} rolls face-down as you shift back to straddle {B:his} waist.`,
  [playerA, isResistant]);
straddle.add(`{B:name} thrashes as you force {B:him} onto {B:his} stomach, shifting back to straddle {B:his} waist regardless.`,
  [playerA, isViolent]);
straddle.add(`{B:name} struggles, but you flip {B:him} face-down and settle onto {B:his} hips anyway.`,
  [playerA, isViolent]);
straddle.add(`{A:name} smiles warmly as you roll onto your stomach, and {A:he} shifts back to straddle your waist.`,
  [playerB, isLoving]);
straddle.add(`You turn face-down as {A:name} slides back affectionately to straddle your hips.`,
  [playerB, isLoving]);
straddle.add(`You roll onto your stomach, your {B:cock.thickCock} trapped beneath you, as {A:name} shifts back gently to straddle your waist.`,
  [playerB, isLoving, bVisibleCock]);
straddle.add(`{A:name} moans eagerly as you flip onto your stomach, and {A:he} shifts back to straddle your waist, grinding down against you.`,
  [playerB, isLustful]);
straddle.add(`You roll face-down as {A:name} slides back onto your hips with a needy moan.`,
  [playerB, isLustful]);
straddle.add(`You settle face-down, your {pussy} pressed against the sheets, as {A:name} shifts back eagerly to straddle your waist.`,
  [playerB, isLustful, bVisiblePussy]);
straddle.add(`You turn onto your stomach, and {A:name} shifts back to straddle your waist without comment.`,
  [playerB, isAccepting]);
straddle.add(`You roll face-down, and {A:name} settles onto your hips without protest.`,
  [playerB, isAccepting]);
straddle.add(`{A:name} shifts back nervously to straddle your waist as you lie face-down beneath {A:him}.`,
  [playerB, isFearful]);
straddle.add(`With a shaky breath, {A:name} slides back onto your hips.`,
  [playerB, isFearful]);
straddle.add(`{A:name} grumbles as {A:he} reluctantly shifts back to straddle your waist.`,
  [playerB, isResistant]);
straddle.add(`With a huff, {A:name} slides back onto your hips, clearly unhappy about it.`,
  [playerB, isResistant]);
straddle.add(`{A:name} thrashes as you pull {A:him} back down to straddle your waist anyway.`,
  [playerB, isViolent]);
straddle.add(`{A:name} struggles, but you force {A:him} back onto your hips regardless.`,
  [playerB, isViolent]);
