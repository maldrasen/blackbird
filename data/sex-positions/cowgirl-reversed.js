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

const bVisibleBreasts = WeaverRequirements.visibleBreasts('B');

const rearrange = WeaverPackage('cowgirl-reversed.rearrange');
const cowgirl = WeaverPackage('cowgirl-reversed.move-to-cowgirl');
const faceSittingReversed = WeaverPackage('cowgirl-reversed.move-to-face-sitting-reversed');

// First on bottom, laying down. Second straddling their waist facing first's feet.
SexPosition.register('cowgirl-reversed',{
  name: 'Reverse Cowgirl',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves:[
    { code:'cowgirl', package:cowgirl },
    { code:'face-sitting-reversed', package:faceSittingReversed, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} settles down onto your hips with a warm smile, facing your feet as {B:he} straddles you.`,
  [playerA, isLoving]);
rearrange.add(`With obvious affection, {B:name} climbs astride you facing away, {B:his} hands resting gently on your legs.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles down facing away, {B:his} {B:cock.thickCock} resting warmly against your leg.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} climbs eagerly astride you facing away, grinding {B:his} ass down against you.`,
  [playerA, isLustful]);
rearrange.add(`With a needy moan, {B:name} straddles your hips facing your feet, already rocking back against you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} straddles you, {B:his} hard {B:cock.bigCock} bobbing as {B:he} settles down facing away.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} straddles you facing away, {B:his} soaked {pussy} grinding eagerly against your stomach.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} climbs astride you facing away without complaint.`,
  [playerA, isAccepting]);
rearrange.add(`Without protest, {B:name} straddles your hips, facing your feet.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles facing away, {B:his} {B:cock.thickCock} resting against your leg.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} climbs astride you nervously, facing away, {B:his} hands trembling on your legs.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} straddles you facing your feet, unsure what to expect.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously settles facing away.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles, reluctantly climbing astride you facing away.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} straddles you facing your feet, clearly unhappy about it.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} thrashes as you pull {B:him} down astride you facing away, forcing {B:him} into position.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you drag {B:him} down onto your hips anyway, facing away from you.`,
  [playerA, isViolent]);
rearrange.add(`You settle down onto {A:name's} hips, facing {A:his} feet as {A:he} gazes up at you with a warm smile.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} smiles warmly beneath you as you climb astride {A:him} facing away, {A:his} hands resting gently on your legs.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} smiles beneath you, {A:his} {A:cock.thickCock} pressing warmly against your ass as you settle facing away.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} groans eagerly as you climb astride {A:him} facing away, {A:his} hips pressing up against you.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans as you straddle {A:him} facing away, {A:his} hips already rocking up beneath you.`,
  [playerB, isLustful]);
rearrange.add(`{A:his} hard {A:cock.bigCock} bobs as you settle astride {A:him}, facing away.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:his} soaked {pussy} grinds up beneath your ass as you settle astride {A:him}, facing away.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name} lies back without complaint as you climb astride {A:him}, facing away.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} watches without protest as you straddle {A:him}, facing {A:his} feet.`,
  [playerB, isAccepting]);
rearrange.add(`{A:his} {A:cock.thickCock} rests against your ass as you settle facing away.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} lies nervously beneath you, {A:his} hands trembling as you settle facing away.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} watches you settle astride {A:him}, unsure what to expect.`,
  [playerB, isFearful]);
rearrange.add(`{A:his} {A:cock.sixInch} long {cock} trembles as {A:he} nervously lies beneath you.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you climb astride {A:him} facing away, clearly reluctant.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} lies beneath you, unhappy about the whole thing.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} thrashes as you climb astride {A:him} anyway, facing away.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} struggles, but you settle astride {A:him} regardless, facing away from {A:him}.`,
  [playerB, isViolent]);



cowgirl.add(`{B:name} smiles and turns around atop you, still straddling your hips but now facing you.`,
  [playerA, isLoving]);
cowgirl.add(`With a playful grin, {B:name} spins around, keeping {B:his} hips settled on yours as {B:he} turns to face you.`,
  [playerA, isLoving]);
cowgirl.add(`{B:name} turns to face you, {B:his} {B:cock.thickCock} brushing against your stomach as {B:he} settles back down.`,
  [playerA, isLoving, bVisibleCock]);
cowgirl.add(`{B:name} eagerly spins around atop you, grinding {B:his} hips down as {B:he} turns to face you.`,
  [playerA, isLustful]);
cowgirl.add(`With a needy moan, {B:name} turns around, gazing hungrily down at you as {B:he} settles back onto you.`,
  [playerA, isLustful]);
cowgirl.add(`{B:name} turns to face you, {B:his} {B:breasts.softBreasts} swaying as {B:he} leans down eagerly.`,
  [playerA, isLustful, bVisibleBreasts]);
cowgirl.add(`{B:name} turns around, {B:his} soaked {pussy} grinding against you as {B:he} settles back down facing you.`,
  [playerA, isLustful, bVisiblePussy]);
cowgirl.add(`{B:name} turns around without complaint, settling back down facing you.`,
  [playerA, isAccepting]);
cowgirl.add(`Without protest, {B:name} spins around atop you.`,
  [playerA, isAccepting]);
cowgirl.add(`{B:name} turns around nervously, unsure why you want {B:him} facing you now.`,
  [playerA, isFearful]);
cowgirl.add(`With a shaky breath, {B:name} spins around atop you.`,
  [playerA, isFearful]);
cowgirl.add(`{B:name} grumbles, reluctantly turning around to face you.`,
  [playerA, isResistant]);
cowgirl.add(`With a huff, {B:name} spins around atop you.`,
  [playerA, isResistant]);
cowgirl.add(`{B:name} thrashes as you turn {B:him} around, forcing {B:him} to face you.`,
  [playerA, isViolent]);
cowgirl.add(`{B:name} struggles, but you spin {B:him} around anyway.`,
  [playerA, isViolent]);
cowgirl.add(`{A:name} smiles as you turn around atop {A:him}, still straddling {A:his} hips but now facing {A:him}.`,
  [playerB, isLoving]);
cowgirl.add(`You spin around, keeping your hips settled on {A:name's} as {A:he} grins playfully up at you.`,
  [playerB, isLoving]);
cowgirl.add(`{A:name} smiles as you turn to face {A:him}, {A:his} {A:cock.thickCock} brushing against your stomach as you settle back down.`,
  [playerB, isLoving, aVisibleCock]);
cowgirl.add(`{A:name} groans eagerly as you spin around atop {A:him}, {A:his} hips grinding up as you turn to face {A:him}.`,
  [playerB, isLustful]);
cowgirl.add(`{A:name} moans hungrily as you turn around, gazing down at {A:him} as you settle back onto {A:him}.`,
  [playerB, isLustful]);
cowgirl.add(`{A:his} hard {A:cock.bigCock} bobs as you turn to face {A:him}.`,
  [playerB, isLustful, aHardCock]);
cowgirl.add(`You turn around, and {A:name} watches without comment as you settle back down facing {A:him}.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} lies quietly as you spin around atop {A:him}.`,
  [playerB, isAccepting]);
cowgirl.add(`{A:name} watches nervously as you turn around atop {A:him}.`,
  [playerB, isFearful]);
cowgirl.add(`With a shaky breath, {A:name} lies still as you spin around atop {A:him}.`,
  [playerB, isFearful]);
cowgirl.add(`{A:name} grumbles as you turn around atop {A:him}, clearly reluctant.`,
  [playerB, isResistant]);
cowgirl.add(`With a huff, {A:name} lies beneath you as you spin around.`,
  [playerB, isResistant]);
cowgirl.add(`{A:name} thrashes as you turn around atop {A:him} anyway.`,
  [playerB, isViolent]);
cowgirl.add(`{A:name} struggles, but you spin around regardless.`,
  [playerB, isViolent]);



// Moving into face-sitting-reversed, "a" is always the one settling back to sit facing away on "b's" face. From
// reverse cowgirl the sitter is facing the bottom's feet, so the move is a scoot backward toward "b's" head.
faceSittingReversed.add(`You scoot back, settling your ass over {B:name's} waiting mouth as {B:he} tilts {B:his} head back with a warm smile.`,
  [playerA, isLoving]);
faceSittingReversed.add(`With obvious affection, {B:name} turns {B:his} face up eagerly as you settle back to sit on {B:his} face, facing away.`,
  [playerA, isLoving]);
faceSittingReversed.add(`You settle down, your {A:cock.thickCock} resting against {B:his} chest as you sit facing away on {B:his} face.`,
  [playerA, isLoving, aVisibleCock]);
faceSittingReversed.add(`{B:name} moans in anticipation as you settle back, your ass hovering over {B:his} waiting mouth.`,
  [playerA, isLustful]);
faceSittingReversed.add(`Eager for a taste, {B:name} tilts {B:his} head back as you sit facing away on {B:his} face.`,
  [playerA, isLustful]);
faceSittingReversed.add(`You settle down, your {A:cock.thickCock} within easy reach of {B:his} eagerly waiting hands as you sit facing away.`,
  [playerA, isLustful, aVisibleCock]);
faceSittingReversed.add(`You scoot back, settling onto {B:name's} face without complaint from {B:him}.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} tilts {B:his} head back without protest as you sit facing away on {B:his} face.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} tilts {B:his} head back nervously as you settle facing away on {B:his} face.`,
  [playerA, isFearful]);
faceSittingReversed.add(`With a shaky breath, {B:name} lies still as you sit down, settling your ass over {B:his} mouth.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name} grumbles, reluctantly tilting {B:his} head back as you settle facing away on {B:his} face.`,
  [playerA, isResistant]);
faceSittingReversed.add(`With a huff, {B:name} lies still as you sit down on {B:his} face.`,
  [playerA, isResistant]);
faceSittingReversed.add(`{B:name} thrashes as you settle down facing away, forcing {B:his} head back beneath you.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name} struggles, but you sit on {B:his} face anyway, facing away.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{A:name} settles back with a warm smile, presenting {A:his} ass to you as you tilt your head back.`,
  [playerB, isLoving]);
faceSittingReversed.add(`With obvious affection, {A:name} settles back to sit on your face, facing away.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:His} {A:cock.thickCock} rests against your chest as {A:name} settles down facing away on your face.`,
  [playerB, isLoving, aVisibleCock]);
faceSittingReversed.add(`{A:name} moans eagerly as {A:he} settles back, presenting {A:his} ass to your waiting mouth.`,
  [playerB, isLustful]);
faceSittingReversed.add(`Hungry for it, {A:name} settles back to sit facing away on your face.`,
  [playerB, isLustful]);
faceSittingReversed.add(`{A:name} settles down eagerly, {A:his} {A:cock.thickCock} within easy reach of your hands.`,
  [playerB, isLustful, aVisibleCock]);
faceSittingReversed.add(`{A:name} settles back without complaint, sitting on your face facing away.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`Without protest, {A:name} sits on your face, facing away.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name} settles back nervously, sitting facing away on your face.`,
  [playerB, isFearful]);
faceSittingReversed.add(`With a shaky breath, {A:name} sits on your face, facing away.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name} grumbles, reluctantly settling facing away on your face.`,
  [playerB, isResistant]);
faceSittingReversed.add(`With a huff, {A:name} sits on your face, facing away.`,
  [playerB, isResistant]);
faceSittingReversed.add(`{A:name} thrashes as you pull {A:his} hips down onto your face anyway, facing away.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name} struggles, but you pull {A:him} down onto your face regardless.`,
  [playerB, isViolent]);
