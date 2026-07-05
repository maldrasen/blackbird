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

const rearrange = WeaverPackage('missionary.rearrange');
const lapSitting = WeaverPackage('missionary.move-to-lap-sitting');
const missionary =  WeaverPackage('missionary.move-to-missionary-reversed');
const prone = WeaverPackage('missionary.move-to-prone');
const sixtyNine = WeaverPackage('missionary.move-to-sixty-nine');

// First lying on top of Second. Second lying face up, legs spread.
SexPosition.register('missionary',{
  name: 'Missionary',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // TODO: Rather than returning a generator (which just calls the package with the context) we should return the package.

  // We can move from standing to missionary, but not back to standing.
  moves:[
    { code:'lap-sitting', package:lapSitting, swap:true },
    { code:'missionary-reversed', package:missionary },
    { code:'prone', package:prone, swap:true },
    { code:'sixty-nine', package:sixtyNine },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} lies back with a warm smile, spreading {B:his} legs invitingly as you settle between them.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} pulls you down close, wrapping {B:his} legs around your waist as you settle on top, {B:his} eyes full of warmth.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies back, spreading {B:his} legs to reveal {B:his} wet {pussy}, gazing up at you fondly as you settle between {B:his} thighs.`,
  [playerA, isLoving, bVisiblePussy]);
rearrange.add(`{B:name} lies back, {B:his} {B:cock.thickCock} resting against {B:his} stomach, as you settle warmly between {B:his} spread legs.`,
  [playerA, isLoving, bVisibleCock]);

rearrange.add(`{B:name} flops eagerly onto {B:his} back, spreading {B:his} legs wide with obvious need as you settle on top.`,
  [playerA, isLustful]);
rearrange.add(`With a needy moan, {B:name} lies back and hooks {B:his} legs around you, pulling you down between {B:his} thighs.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} lies back, spreading {B:his} soaked {pussy} open as {B:he} arches up toward you eagerly.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} lies back, {B:his} {B:cock.bigCock} already hard against {B:his} stomach, spreading {B:his} legs wide for you.`,
  [playerA, isLustful, bHardCock]);

/*

  pkg.add(`{B:name} lies back and spreads {B:his} legs, letting you settle between them.`, aAccepting);
  pkg.add(`Without complaint, {B:name} settles onto {B:his} back, {B:his} legs parting for you.`, aAccepting);
  pkg.add(`{B:name} lies back, legs parting to reveal {B:his} {pussy}, as you settle between {B:his} thighs.`,
    () => aAccepting() && b.hasNormalPussy() && b.isCrotchExposed());
  pkg.add(`{B:name} lies back, {B:his} {B:cock.thickCock} lying against {B:his} stomach, as you settle between {B:his} legs.`,
    () => aAccepting() && b.hasNormalCock() && b.isCrotchExposed());

  pkg.add(`{B:name} lies back with a nervous breath, parting {B:his} legs submissively as you settle between them.`, aFearful);
  pkg.add(`Trembling slightly, {B:name} lowers {B:him}self onto {B:his} back, spreading {B:his} legs as you settle on top.`, aFearful);
  pkg.add(`{B:name's} hands tremble as {B:he} lies back, spreading {B:his} legs to expose {B:his} {pussy}, eyes averted from yours.`,
    () => aFearful() && b.hasNormalPussy() && b.isCrotchExposed());

  pkg.add(`{B:name} lies back reluctantly, {B:his} legs parting slowly under your insistent hands.`, aResistant);
  pkg.add(`With a huff, {B:name} settles onto {B:his} back, grudgingly spreading {B:his} legs as you press between them.`, aResistant);

  pkg.add(`{B:name} thrashes as you force {B:him} onto {B:his} back, pinning {B:him} down as you pry {B:his} legs apart.`, aViolent);
  pkg.add(`{B:name} struggles beneath you, kicking uselessly as you force {B:him} onto {B:his} back and spread {B:his} legs.`, aViolent);

  pkg.add(`You lie back as {A:name} smiles warmly, settling between your legs.`, bLoving);
  pkg.add(`{A:name} gently guides you onto your back, {A:his} eyes full of warmth as {A:he} settles between your spread legs.`, bLoving);
  pkg.add(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.thickCock} resting warmly against you.`,
    () => bLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`{A:his} {A:breasts.bigSoftBreasts} sway forward as {A:name} leans down warmly, settling between your spread legs.`,
    () => bLoving() && a.hasBreasts() && a.breastsAreAtLeast('big') && a.areBreastsExposed());

  pkg.add(`You lie back as {A:name} licks {A:his} lips hungrily, quickly settling between your spread legs.`, bLustful);
  pkg.add(`{A:name} groans with want, urging you onto your back before settling eagerly between your thighs.`, bLustful);
  pkg.add(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.bigCock} already hard.`,
    () => bLustful() && a.isFullyErect() && a.isCrotchExposed());
  pkg.add(`{A:name}'s {A:breasts.softBreasts} sway as {A:he} settles eagerly between your spread legs.`,
    () => bLustful() && a.hasBreasts() && a.areBreastsExposed());

  pkg.add(`You lie back and spread your legs, letting {A:name} settle between them.`, bAccepting);
  pkg.add(`{A:name} settles between your legs without comment as you lie back for {A:him}.`, bAccepting);

  pkg.add(`You lie back with a nervous breath as {A:name} settles between your legs.`, bFearful);
  pkg.add(`{A:name}'s expression softens slightly as you tremble, lying back and parting your legs for {A:him}.`, bFearful);

  pkg.add(`You lie back reluctantly as {A:name} pries your legs apart, settling between them.`, bResistant);
  pkg.add(`{A:name} huffs impatiently, pushing your legs apart as you grudgingly lie back for {A:him}.`, bResistant);

  pkg.add(`{A:name} forces you onto your back, pinning you down as {A:he} pries your legs apart.`, bViolent);
  pkg.add(`You thrash as {A:name} shoves you onto your back, but {A:he} pries your legs apart and settles between them anyway.`, bViolent);

  return pkg.pick();
}

function moveLapSitting(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const pkg = TextPackage('missionary.moveLapSitting');


  pkg.add(`You sit up as {B:name} shifts forward with a warm smile, settling onto your lap and wrapping {B:his} arms around your neck.`, aLoving);
  pkg.add(`{B:name} slides into your lap affectionately, {B:his} eyes soft as {B:he} settles down facing you.`, aLoving);
  pkg.add(`{B:name} settles onto your lap, {B:his} {B:cock.thickCock} pressing warmly against your stomach as {B:he} wraps {B:his} arms around you.`,
    () => aLoving() && b.hasNormalCock() && b.isCrotchExposed());
  pkg.add(`{B:name} slides into your lap, {B:his} {B:breasts.softBreasts} pressing gently against your chest as {B:he} smiles down at you.`,
    () => aLoving() && b.hasBreasts() && b.areBreastsExposed());

  pkg.add(`You sit up as {B:name} eagerly climbs into your lap, grinding {B:his} hips against you with a needy moan.`, aLustful);
  pkg.add(`{B:name} wastes no time straddling your lap, {B:his} hungry eyes locked on yours as {B:he} settles down.`, aLustful);
  pkg.add(`{B:name} settles onto your lap, {B:his} {B:cock.bigCock} already hard and trapped between your bodies.`,
    () => aLustful() && b.isFullyErect() && b.isCrotchExposed());
  pkg.add(`{B:name} grinds {B:his} soaked {pussy} against you as {B:he} settles eagerly into your lap.`,
    () => aLustful() && b.hasNormalPussy() && b.isCrotchExposed());

  pkg.add(`You sit up as {B:name} climbs into your lap without complaint, settling facing you.`, aAccepting);
  pkg.add(`{B:name} shifts forward and settles onto your lap, wrapping {B:his} legs around you.`, aAccepting);

  pkg.add(`You sit up as {B:name} climbs nervously into your lap, {B:his} hands trembling on your shoulders.`, aFearful);
  pkg.add(`{B:name} settles onto your lap hesitantly, avoiding your eyes as {B:he} wraps {B:his} arms loosely around you.`, aFearful);

  pkg.add(`{B:name} climbs reluctantly into your lap, jaw tight as {B:he} settles facing you.`, aResistant);
  pkg.add(`With a huff, {B:name} shifts onto your lap, {B:his} body stiff against you.`, aResistant);

  pkg.add(`{B:name} thrashes as you pull {B:him} onto your lap, forcing {B:him} to face you despite {B:his} struggling.`, aViolent);
  pkg.add(`{B:name} fights to pull away, but you drag {B:him} down onto your lap anyway.`, aViolent);

  pkg.add(`{A:name} sits up with a warm smile as you shift forward to settle onto {A:his} lap, wrapping your arms around {A:his} neck.`, bLoving);
  pkg.add(`You settle into {A:name's} lap as {A:he} sits up, {A:his} eyes soft with affection.`, bLoving);
  pkg.add(`{A:name} sits up, {A:his} {A:cock.thickCock} pressing warmly against you as you settle onto {A:his} lap.`,
    () => bLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`{A:name} sits up, {A:his} {A:breasts.softBreasts} pressing against your chest as you settle into {A:his} lap.`,
    () => bLoving() && a.hasBreasts() && a.areBreastsExposed());

  pkg.add(`{A:name} sits up eagerly as you climb into {A:his} lap, grinding your hips against {A:him} with a needy moan.`, bLustful);
  pkg.add(`{A:name} pulls you into {A:his} lap hungrily, {A:his} eyes locked on yours as you settle down.`, bLustful);
  pkg.add(`{A:name} sits up, {A:his} {A:cock.bigCock} already hard and trapped between you as you settle onto {A:his} lap.`,
    () => bLustful() && a.isFullyErect() && a.isCrotchExposed());

  pkg.add(`{A:name} sits up without complaint as you settle onto {A:his} lap.`, bAccepting);
  pkg.add(`You climb into {A:name's} lap as {A:he} shifts to sit up, wrapping your legs around {A:him}.`, bAccepting);

  pkg.add(`{A:name} sits up nervously, {A:his} hands trembling as you settle onto {A:his} lap.`, bFearful);
  pkg.add(`{A:name} avoids your eyes as {A:he} sits up hesitantly, letting you settle onto {A:his} lap.`, bFearful);

  pkg.add(`{A:name} sits up reluctantly, jaw tight as you settle onto {A:his} lap.`, bResistant);
  pkg.add(`With a huff, {A:name} shifts to sit up, {A:his} body stiff as you settle onto {A:him}.`, bResistant);

  pkg.add(`{A:name} thrashes as you pull {A:him} up to sit, forcing {A:him} to face you as you settle onto {A:his} lap.`, bViolent);
  pkg.add(`{A:name} fights to twist away, but you force {A:him} to sit up as you settle onto {A:his} lap.`, bViolent);

  return pkg.pick();
}

function moveMissionary(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const pkg = TextPackage('missionary.moveMissionary');


  pkg.add(`{B:name} smiles and turns onto {B:his} stomach beneath you, arching {B:his} back invitingly.`, aLoving);
  pkg.add(`With an affectionate nuzzle, {B:name} rolls face-down under you, letting you settle over {B:his} back.`, aLoving);
  pkg.add(`{B:name} turns onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him}, as you settle warmly over {B:his} back.`,
    () => aLoving() && b.hasNormalCock() && b.isCrotchExposed());

  pkg.add(`{B:name} eagerly flips onto {B:his} stomach, grinding {B:his} hips into the sheets as you settle over {B:his} back.`, aLustful);
  pkg.add(`With a needy moan, {B:name} turns face-down beneath you, arching {B:his} ass up against you.`, aLustful);
  pkg.add(`{B:name} turns over, {B:his} {B:cock.bigCock} throbbing and trapped beneath {B:him}, as you settle onto {B:his} back.`,
    () => aLustful() && b.isFullyErect() && b.isCrotchExposed());

  pkg.add(`{B:name} turns onto {B:his} stomach without complaint, letting you settle over {B:his} back.`, aAccepting);
  pkg.add(`Without protest, {B:name} rolls face-down beneath you.`, aAccepting);

  pkg.add(`{B:name} turns over nervously, {B:his} body tense as you settle over {B:his} back.`, aFearful);
  pkg.add(`With a shaky breath, {B:name} rolls face-down beneath you.`, aFearful);

  pkg.add(`{B:name} grumbles as {B:he} reluctantly turns onto {B:his} stomach beneath you.`, aResistant);
  pkg.add(`With a huff, {B:name} rolls face-down, {B:his} body stiff under you.`, aResistant);

  pkg.add(`{B:name} thrashes as you flip {B:him} onto {B:his} stomach, pinning {B:him} down as you settle over {B:his} back.`, aViolent);
  pkg.add(`{B:name} struggles as you force {B:him} face-down beneath you.`, aViolent);

  pkg.add(`You turn onto your stomach as {A:name} smiles warmly, settling over your back.`, bLoving);
  pkg.add(`{A:name} nuzzles your neck affectionately as you roll face-down beneath {A:him}.`, bLoving);
  pkg.add(`You turn over, feeling {A:name's} {A:cock.thickCock} pressing warmly against your lower back as {A:he} settles over you.`,
    () => bLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`{A:his} {A:breasts.softBreasts} press against your back as {A:name} settles warmly over you.`,
    () => bLoving() && a.hasBreasts() && a.areBreastsExposed());

  pkg.add(`You eagerly flip onto your stomach as {A:name} settles hungrily over your back.`, bLustful);
  pkg.add(`{A:name} groans with want as you turn face-down beneath {A:him}.`, bLustful);
  pkg.add(`You turn over, {A:name's} {A:cock.bigCock} already hard against your lower back as {A:he} settles over you.`,
    () => bLustful() && a.isFullyErect() && a.isCrotchExposed());

  pkg.add(`You turn onto your stomach without complaint as {A:name} settles over your back.`, bAccepting);
  pkg.add(`{A:name} settles over your back as you roll face-down for {A:him}.`, bAccepting);

  pkg.add(`You turn over nervously, your body tense as {A:name} settles over your back.`, bFearful);
  pkg.add(`With a shaky breath, you roll face-down beneath {A:name}.`, bFearful);

  pkg.add(`You grumble as you reluctantly turn onto your stomach beneath {A:name}.`, bResistant);
  pkg.add(`With a huff, you roll face-down, your body stiff under {A:him}.`, bResistant);

  pkg.add(`You thrash as {A:name} flips you onto your stomach, pinning you down as {A:he} settles over your back.`, bViolent);
  pkg.add(`You struggle as {A:name} forces you face-down beneath {A:him}.`, bViolent);

  return pkg.pick();
}

function moveProne(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const pkg = TextPackage('missionary.moveProne');


  pkg.add(`{B:name} places a lingering kiss on your stomach before sliding down between your legs, settling in to worship you with {B:his} mouth.`, aLoving);
  pkg.add(`With a tender smile, {B:name} shifts downward, draping {B:him}self across your legs and lowering {B:his} head between your thighs.`, aLoving);
  pkg.add(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to your {A:cock.thickCock}.`,
    () => aLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to your {pussy}.`,
    () => aLoving() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`{B:name} licks {B:his} lips hungrily as {B:he} slides down your body, settling eagerly between your legs.`, aLustful);
  pkg.add(`With a needy moan, {B:name} shifts downward, {B:his} mouth already watering as {B:he} settles between your thighs.`, aLustful);
  pkg.add(`{B:name} wastes no time sliding down to settle between your legs, already lapping eagerly at your {A:cock.bigCock}.`,
    () => aLustful() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`{B:name} slides down eagerly, burying {B:his} face against your soaked {pussy} the moment {B:he} settles between your legs.`,
    () => aLustful() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`{B:name} shifts downward without complaint, settling between your legs.`, aAccepting);
  pkg.add(`Without protest, {B:name} slides down your body and lowers {B:his} head between your thighs.`, aAccepting);

  pkg.add(`{B:name} slides down nervously, {B:his} hands trembling as {B:he} settles between your legs.`, aFearful);
  pkg.add(`With a shaky breath, {B:name} lowers {B:him}self between your thighs.`, aFearful);

  pkg.add(`{B:name} grumbles as {B:he} reluctantly slides down to settle between your legs.`, aResistant);
  pkg.add(`With a huff, {B:name} shifts downward, {B:his} body stiff as {B:he} lowers {B:his} head between your thighs.`, aResistant);

  pkg.add(`{B:name} struggles as you force {B:him} down between your legs.`, aViolent);
  pkg.add(`{B:name} thrashes, but you push {B:his} head down between your thighs anyway.`, aViolent);

  pkg.add(`You slide down {A:name's} body, pressing a lingering kiss to {A:his} stomach before settling between {A:his} legs. {A:He} smiles down at you warmly.`, bLoving);
  pkg.add(`{A:name} watches you with a tender smile as you shift downward, lowering your head between {A:his} thighs.`, bLoving);
  pkg.add(`You slide down, settling between {A:his} legs as {A:name} smiles, {A:his} {A:cock.thickCock} twitching in anticipation.`,
    () => bLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`You slide down, settling between {A:his} legs as {A:name} smiles warmly down at you, {A:his} {pussy} glistening.`,
    () => bLoving() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`You lick your lips hungrily as you slide down {A:name's} body, {A:he} watching with obvious need.`, bLustful);
  pkg.add(`{A:name} moans eagerly as you settle between {A:his} legs, already leaning down.`, bLustful);
  pkg.add(`You settle between {A:his} legs, {A:name's} {A:cock.bigCock} already hard and waiting for you.`,
    () => bLustful() && a.isFullyErect() && a.isCrotchExposed());
  pkg.add(`You settle between {A:his} legs, {A:name's} {pussy} already soaked and waiting for you.`,
    () => bLustful() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`You shift downward without complaint, settling between {A:his} legs.`, bAccepting);
  pkg.add(`{A:name} watches without comment as you slide down and settle between {A:his} legs.`, bAccepting);

  pkg.add(`You slide down nervously, your hands trembling as you settle between {A:his} legs.`, bFearful);
  pkg.add(`With a shaky breath, you lower yourself between {A:his} thighs.`, bFearful);

  pkg.add(`You grumble as you reluctantly slide down to settle between {A:his} legs.`, bResistant);
  pkg.add(`With a huff, you shift downward, your body stiff as you lower your head between {A:his} thighs.`, bResistant);

  pkg.add(`You struggle as {A:name} forces you down between {A:his} legs.`, bViolent);
  pkg.add(`You thrash, but {A:name} pushes your head down between {A:his} thighs anyway.`, bViolent);

  return pkg.pick();
}

function moveSixtyNine(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const pkg = TextPackage('missionary.moveSixtyNine');


  pkg.add(`With a playful smile, you turn yourself around atop {B:name}, and {B:he} eagerly shifts to bring {B:his} face level with your hips.`, aLoving);
  pkg.add(`{B:name} giggles affectionately as you spin around on top of {B:him}, both of you settling into place for some mutual attention.`, aLoving);
  pkg.add(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {B:cock.thickCock} now within easy reach of your mouth.`,
    () => aLoving() && b.hasNormalCock() && b.isCrotchExposed());
  pkg.add(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {pussy} now within easy reach of your mouth.`,
    () => aLoving() && b.hasNormalPussy() && b.isCrotchExposed());

  pkg.add(`You turn yourself around atop {B:name}, who moans eagerly as {B:he} pulls your hips down toward {B:his} mouth.`, aLustful);
  pkg.add(`{B:name} wastes no time repositioning beneath you as you spin around, hungry for a taste of you.`, aLustful);
  pkg.add(`{B:name} arches up as you turn around, {B:his} {B:cock.bigCock} already twitching for your attention.`,
    () => aLustful() && b.isFullyErect() && b.isCrotchExposed());
  pkg.add(`{B:name} spreads {B:his} legs eagerly as you turn around, {B:his} soaked {pussy} on full display.`,
    () => aLustful() && b.hasNormalPussy() && b.isCrotchExposed());

  pkg.add(`You turn yourself around atop {B:name}, who shifts without complaint to settle into position.`, aAccepting);
  pkg.add(`{B:name} adjusts {B:his} legs as you turn around, letting you settle face-to-crotch.`, aAccepting);

  pkg.add(`You turn yourself around atop {B:name}, who shifts nervously to accommodate the new position.`, aFearful);
  pkg.add(`{B:name} adjusts {B:his} legs hesitantly as you turn around above {B:him}.`, aFearful);

  pkg.add(`{B:name} grumbles as you turn yourself around atop {B:him}, reluctantly shifting into position.`, aResistant);
  pkg.add(`With a huff, {B:name} adjusts {B:his} legs as you spin around above {B:him}.`, aResistant);

  pkg.add(`{B:name} struggles as you turn yourself around atop {B:him}, forcing {B:his} legs into position anyway.`, aViolent);
  pkg.add(`{B:name} thrashes weakly as you force {B:him} to accommodate the new position.`, aViolent);

  pkg.add(`{A:name} turns {A:him}self around atop you with a playful smile, and you eagerly shift to bring your face level with {A:his} hips.`, bLoving);
  pkg.add(`You giggle affectionately as {A:name} spins around on top of you, both of you settling into place for some mutual attention.`, bLoving);
  pkg.add(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {A:cock.thickCock} now within easy reach of your mouth.`,
    () => bLoving() && a.hasNormalCock() && a.isCrotchExposed());
  pkg.add(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {pussy} now within easy reach of your mouth.`,
    () => bLoving() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`{A:name} turns {A:him}self around atop you, moaning eagerly as {A:he} pulls your hips down toward {A:his} mouth.`, bLustful);
  pkg.add(`You waste no time repositioning beneath {A:name} as {A:he} spins around, hungry for a taste of you.`, bLustful);
  pkg.add(`You arch up as {A:name} turns around, {A:his} {A:cock.bigCock} already twitching for your attention.`,
    () => bLustful() && a.isFullyErect() && a.isCrotchExposed());
  pkg.add(`You spread your legs eagerly as {A:name} turns around, {A:his} soaked {pussy} within reach.`,
    () => bLustful() && a.hasNormalPussy() && a.isCrotchExposed());

  pkg.add(`{A:name} turns {A:him}self around atop you without complaint, and you shift to settle into position.`, bAccepting);
  pkg.add(`You adjust your legs as {A:name} turns around, settling face-to-crotch.`, bAccepting);

  pkg.add(`{A:name} turns {A:him}self around atop you, and you shift nervously to accommodate the new position.`, bFearful);
  pkg.add(`You adjust your legs hesitantly as {A:name} spins around above you.`, bFearful);

  pkg.add(`You grumble as {A:name} turns {A:him}self around atop you, reluctantly shifting into position.`, bResistant);
  pkg.add(`With a huff, you adjust your legs as {A:name} spins around above you.`, bResistant);

  pkg.add(`You struggle as {A:name} turns {A:him}self around atop you, forcing your legs into position anyway.`, bViolent);
  pkg.add(`You thrash weakly as {A:name} forces you to accommodate the new position.`, bViolent);

  return pkg.pick();
}
*/
