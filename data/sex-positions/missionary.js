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

rearrange.add(`{B:name} lies back and spreads {B:his} legs, letting you settle between them.`, [playerA, isAccepting]);
rearrange.add(`Without complaint, {B:name} settles onto {B:his} back, {B:his} legs parting for you.`, [playerA, isAccepting]);
rearrange.add(`{B:name} lies back, legs parting to reveal {B:his} {pussy}, as you settle between {B:his} thighs.`,
  [playerA, isAccepting, bVisiblePussy]);
rearrange.add(`{B:name} lies back, {B:his} {B:cock.thickCock} lying against {B:his} stomach, as you settle between {B:his} legs.`,
  [playerA, isAccepting, bVisibleCock]);

rearrange.add(`{B:name} lies back with a nervous breath, parting {B:his} legs submissively as you settle between them.`, [playerA, isFearful]);
rearrange.add(`Trembling slightly, {B:name} lowers {B:him}self onto {B:his} back, spreading {B:his} legs as you settle on top.`, [playerA, isFearful]);
rearrange.add(`{B:name's} hands tremble as {B:he} lies back, spreading {B:his} legs to expose {B:his} {pussy}, eyes averted from yours.`,
  [playerA, isFearful, bVisiblePussy]);

rearrange.add(`{B:name} lies back reluctantly, {B:his} legs parting slowly under your insistent hands.`, [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} settles onto {B:his} back, grudgingly spreading {B:his} legs as you press between them.`, [playerA, isResistant]);

rearrange.add(`{B:name} thrashes as you force {B:him} onto {B:his} back, pinning {B:him} down as you pry {B:his} legs apart.`, [playerA, isViolent]);
rearrange.add(`{B:name} struggles beneath you, kicking uselessly as you force {B:him} onto {B:his} back and spread {B:his} legs.`, [playerA, isViolent]);

rearrange.add(`You lie back as {A:name} smiles warmly, settling between your legs.`, [playerB, isLoving]);
rearrange.add(`{A:name} gently guides you onto your back, {A:his} eyes full of warmth as {A:he} settles between your spread legs.`, [playerB, isLoving]);
rearrange.add(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.thickCock} resting warmly against you.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:his} {A:breasts.bigSoftBreasts} sway forward as {A:name} leans down warmly, settling between your spread legs.`,
  [playerB, isLoving, aVisibleBreasts, context => Character(context.A).breastsAreAtLeast('big')]);

rearrange.add(`You lie back as {A:name} licks {A:his} lips hungrily, quickly settling between your spread legs.`, [playerB, isLustful]);
rearrange.add(`{A:name} groans with want, urging you onto your back before settling eagerly between your thighs.`, [playerB, isLustful]);
rearrange.add(`You lie back, spreading your legs as {A:name} settles between them, {A:his} {A:cock.bigCock} already hard.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name}'s {A:breasts.softBreasts} sway as {A:he} settles eagerly between your spread legs.`,
  [playerB, isLustful, aVisibleBreasts]);

rearrange.add(`You lie back and spread your legs, letting {A:name} settle between them.`, [playerB, isAccepting]);
rearrange.add(`{A:name} settles between your legs without comment as you lie back for {A:him}.`, [playerB, isAccepting]);

rearrange.add(`You lie back with a nervous breath as {A:name} settles between your legs.`, [playerB, isFearful]);
rearrange.add(`{A:name}'s expression softens slightly as you tremble, lying back and parting your legs for {A:him}.`, [playerB, isFearful]);

rearrange.add(`You lie back reluctantly as {A:name} pries your legs apart, settling between them.`, [playerB, isResistant]);
rearrange.add(`{A:name} huffs impatiently, pushing your legs apart as you grudgingly lie back for {A:him}.`, [playerB, isResistant]);

rearrange.add(`{A:name} forces you onto your back, pinning you down as {A:he} pries your legs apart.`, [playerB, isViolent]);
rearrange.add(`You thrash as {A:name} shoves you onto your back, but {A:he} pries your legs apart and settles between them anyway.`, [playerB, isViolent]);

lapSitting.add(`You sit up as {B:name} shifts forward with a warm smile, settling onto your lap and wrapping {B:his} arms around your neck.`, [playerA, isLoving]);
lapSitting.add(`{B:name} slides into your lap affectionately, {B:his} eyes soft as {B:he} settles down facing you.`, [playerA, isLoving]);
lapSitting.add(`{B:name} settles onto your lap, {B:his} {B:cock.thickCock} pressing warmly against your stomach as {B:he} wraps {B:his} arms around you.`,
  [playerA, isLoving, bVisibleCock]);
lapSitting.add(`{B:name} slides into your lap, {B:his} {B:breasts.softBreasts} pressing gently against your chest as {B:he} smiles down at you.`,
  [playerA, isLoving, bVisibleBreasts]);

lapSitting.add(`You sit up as {B:name} eagerly climbs into your lap, grinding {B:his} hips against you with a needy moan.`, [playerA, isLustful]);
lapSitting.add(`{B:name} wastes no time straddling your lap, {B:his} hungry eyes locked on yours as {B:he} settles down.`, [playerA, isLustful]);
lapSitting.add(`{B:name} settles onto your lap, {B:his} {B:cock.bigCock} already hard and trapped between your bodies.`,
  [playerA, isLustful, bHardCock]);
lapSitting.add(`{B:name} grinds {B:his} soaked {pussy} against you as {B:he} settles eagerly into your lap.`,
  [playerA, isLustful, bVisiblePussy]);

lapSitting.add(`You sit up as {B:name} climbs into your lap without complaint, settling facing you.`, [playerA, isAccepting]);
lapSitting.add(`{B:name} shifts forward and settles onto your lap, wrapping {B:his} legs around you.`, [playerA, isAccepting]);

lapSitting.add(`You sit up as {B:name} climbs nervously into your lap, {B:his} hands trembling on your shoulders.`, [playerA, isFearful]);
lapSitting.add(`{B:name} settles onto your lap hesitantly, avoiding your eyes as {B:he} wraps {B:his} arms loosely around you.`, [playerA, isFearful]);

lapSitting.add(`{B:name} climbs reluctantly into your lap, jaw tight as {B:he} settles facing you.`, [playerA, isResistant]);
lapSitting.add(`With a huff, {B:name} shifts onto your lap, {B:his} body stiff against you.`, [playerA, isResistant]);

lapSitting.add(`{B:name} thrashes as you pull {B:him} onto your lap, forcing {B:him} to face you despite {B:his} struggling.`, [playerA, isViolent]);
lapSitting.add(`{B:name} fights to pull away, but you drag {B:him} down onto your lap anyway.`, [playerA, isViolent]);

lapSitting.add(`{A:name} sits up with a warm smile as you shift forward to settle onto {A:his} lap, wrapping your arms around {A:his} neck.`, [playerB, isLoving]);
lapSitting.add(`You settle into {A:name's} lap as {A:he} sits up, {A:his} eyes soft with affection.`, [playerB, isLoving]);
lapSitting.add(`{A:name} sits up, {A:his} {A:cock.thickCock} pressing warmly against you as you settle onto {A:his} lap.`,
  [playerB, isLoving, aVisibleCock]);
lapSitting.add(`{A:name} sits up, {A:his} {A:breasts.softBreasts} pressing against your chest as you settle into {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);

lapSitting.add(`{A:name} sits up eagerly as you climb into {A:his} lap, grinding your hips against {A:him} with a needy moan.`, [playerB, isLustful]);
lapSitting.add(`{A:name} pulls you into {A:his} lap hungrily, {A:his} eyes locked on yours as you settle down.`, [playerB, isLustful]);
lapSitting.add(`{A:name} sits up, {A:his} {A:cock.bigCock} already hard and trapped between you as you settle onto {A:his} lap.`,
  [playerB, isLustful, aHardCock]);

lapSitting.add(`{A:name} sits up without complaint as you settle onto {A:his} lap.`, [playerB, isAccepting]);
lapSitting.add(`You climb into {A:name's} lap as {A:he} shifts to sit up, wrapping your legs around {A:him}.`, [playerB, isAccepting]);

lapSitting.add(`{A:name} sits up nervously, {A:his} hands trembling as you settle onto {A:his} lap.`, [playerB, isFearful]);
lapSitting.add(`{A:name} avoids your eyes as {A:he} sits up hesitantly, letting you settle onto {A:his} lap.`, [playerB, isFearful]);

lapSitting.add(`{A:name} sits up reluctantly, jaw tight as you settle onto {A:his} lap.`, [playerB, isResistant]);
lapSitting.add(`With a huff, {A:name} shifts to sit up, {A:his} body stiff as you settle onto {A:him}.`, [playerB, isResistant]);

lapSitting.add(`{A:name} thrashes as you pull {A:him} up to sit, forcing {A:him} to face you as you settle onto {A:his} lap.`, [playerB, isViolent]);
lapSitting.add(`{A:name} fights to twist away, but you force {A:him} to sit up as you settle onto {A:his} lap.`, [playerB, isViolent]);

missionary.add(`{B:name} smiles and turns onto {B:his} stomach beneath you, arching {B:his} back invitingly.`, [playerA, isLoving]);
missionary.add(`With an affectionate nuzzle, {B:name} rolls face-down under you, letting you settle over {B:his} back.`, [playerA, isLoving]);
missionary.add(`{B:name} turns onto {B:his} stomach, {B:his} {B:cock.thickCock} trapped beneath {B:him}, as you settle warmly over {B:his} back.`,
  [playerA, isLoving, bVisibleCock]);

missionary.add(`{B:name} eagerly flips onto {B:his} stomach, grinding {B:his} hips into the sheets as you settle over {B:his} back.`, [playerA, isLustful]);
missionary.add(`With a needy moan, {B:name} turns face-down beneath you, arching {B:his} ass up against you.`, [playerA, isLustful]);
missionary.add(`{B:name} turns over, {B:his} {B:cock.bigCock} throbbing and trapped beneath {B:him}, as you settle onto {B:his} back.`,
  [playerA, isLustful, bHardCock]);

missionary.add(`{B:name} turns onto {B:his} stomach without complaint, letting you settle over {B:his} back.`, [playerA, isAccepting]);
missionary.add(`Without protest, {B:name} rolls face-down beneath you.`, [playerA, isAccepting]);

missionary.add(`{B:name} turns over nervously, {B:his} body tense as you settle over {B:his} back.`, [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} rolls face-down beneath you.`, [playerA, isFearful]);

missionary.add(`{B:name} grumbles as {B:he} reluctantly turns onto {B:his} stomach beneath you.`, [playerA, isResistant]);
missionary.add(`With a huff, {B:name} rolls face-down, {B:his} body stiff under you.`, [playerA, isResistant]);

missionary.add(`{B:name} thrashes as you flip {B:him} onto {B:his} stomach, pinning {B:him} down as you settle over {B:his} back.`, [playerA, isViolent]);
missionary.add(`{B:name} struggles as you force {B:him} face-down beneath you.`, [playerA, isViolent]);

missionary.add(`You turn onto your stomach as {A:name} smiles warmly, settling over your back.`, [playerB, isLoving]);
missionary.add(`{A:name} nuzzles your neck affectionately as you roll face-down beneath {A:him}.`, [playerB, isLoving]);
missionary.add(`You turn over, feeling {A:name's} {A:cock.thickCock} pressing warmly against your lower back as {A:he} settles over you.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:his} {A:breasts.softBreasts} press against your back as {A:name} settles warmly over you.`,
  [playerB, isLoving, aVisibleBreasts]);

missionary.add(`You eagerly flip onto your stomach as {A:name} settles hungrily over your back.`, [playerB, isLustful]);
missionary.add(`{A:name} groans with want as you turn face-down beneath {A:him}.`, [playerB, isLustful]);
missionary.add(`You turn over, {A:name's} {A:cock.bigCock} already hard against your lower back as {A:he} settles over you.`,
  [playerB, isLustful, aHardCock]);

missionary.add(`You turn onto your stomach without complaint as {A:name} settles over your back.`, [playerB, isAccepting]);
missionary.add(`{A:name} settles over your back as you roll face-down for {A:him}.`, [playerB, isAccepting]);

missionary.add(`You turn over nervously, your body tense as {A:name} settles over your back.`, [playerB, isFearful]);
missionary.add(`With a shaky breath, you roll face-down beneath {A:name}.`, [playerB, isFearful]);

missionary.add(`You grumble as you reluctantly turn onto your stomach beneath {A:name}.`, [playerB, isResistant]);
missionary.add(`With a huff, you roll face-down, your body stiff under {A:him}.`, [playerB, isResistant]);

missionary.add(`You thrash as {A:name} flips you onto your stomach, pinning you down as {A:he} settles over your back.`, [playerB, isViolent]);
missionary.add(`You struggle as {A:name} forces you face-down beneath {A:him}.`, [playerB, isViolent]);

prone.add(`{B:name} places a lingering kiss on your stomach before sliding down between your legs, settling in to worship you with {B:his} mouth.`, [playerA, isLoving]);
prone.add(`With a tender smile, {B:name} shifts downward, draping {B:him}self across your legs and lowering {B:his} head between your thighs.`, [playerA, isLoving]);
prone.add(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to your {A:cock.thickCock}.`,
  [playerA, isLoving, aVisibleCock]);
prone.add(`{B:name} slides down affectionately, settling between your legs and pressing a soft kiss to your {pussy}.`,
  [playerA, isLoving, aVisiblePussy]);

prone.add(`{B:name} licks {B:his} lips hungrily as {B:he} slides down your body, settling eagerly between your legs.`, [playerA, isLustful]);
prone.add(`With a needy moan, {B:name} shifts downward, {B:his} mouth already watering as {B:he} settles between your thighs.`, [playerA, isLustful]);
prone.add(`{B:name} wastes no time sliding down to settle between your legs, already lapping eagerly at your {A:cock.bigCock}.`,
  [playerA, isLustful, aHardCock]);
prone.add(`{B:name} slides down eagerly, burying {B:his} face against your soaked {pussy} the moment {B:he} settles between your legs.`,
  [playerA, isLustful, aVisiblePussy]);

prone.add(`{B:name} shifts downward without complaint, settling between your legs.`, [playerA, isAccepting]);
prone.add(`Without protest, {B:name} slides down your body and lowers {B:his} head between your thighs.`, [playerA, isAccepting]);

prone.add(`{B:name} slides down nervously, {B:his} hands trembling as {B:he} settles between your legs.`, [playerA, isFearful]);
prone.add(`With a shaky breath, {B:name} lowers {B:him}self between your thighs.`, [playerA, isFearful]);

prone.add(`{B:name} grumbles as {B:he} reluctantly slides down to settle between your legs.`, [playerA, isResistant]);
prone.add(`With a huff, {B:name} shifts downward, {B:his} body stiff as {B:he} lowers {B:his} head between your thighs.`, [playerA, isResistant]);

prone.add(`{B:name} struggles as you force {B:him} down between your legs.`, [playerA, isViolent]);
prone.add(`{B:name} thrashes, but you push {B:his} head down between your thighs anyway.`, [playerA, isViolent]);

prone.add(`You slide down {A:name's} body, pressing a lingering kiss to {A:his} stomach before settling between {A:his} legs. {A:He} smiles down at you warmly.`, [playerB, isLoving]);
prone.add(`{A:name} watches you with a tender smile as you shift downward, lowering your head between {A:his} thighs.`, [playerB, isLoving]);
prone.add(`You slide down, settling between {A:his} legs as {A:name} smiles, {A:his} {A:cock.thickCock} twitching in anticipation.`,
  [playerB, isLoving, aVisibleCock]);
prone.add(`You slide down, settling between {A:his} legs as {A:name} smiles warmly down at you, {A:his} {pussy} glistening.`,
  [playerB, isLoving, aVisiblePussy]);

prone.add(`You lick your lips hungrily as you slide down {A:name's} body, {A:he} watching with obvious need.`, [playerB, isLustful]);
prone.add(`{A:name} moans eagerly as you settle between {A:his} legs, already leaning down.`, [playerB, isLustful]);
prone.add(`You settle between {A:his} legs, {A:name's} {A:cock.bigCock} already hard and waiting for you.`,
  [playerB, isLustful, aHardCock]);
prone.add(`You settle between {A:his} legs, {A:name's} {pussy} already soaked and waiting for you.`,
  [playerB, isLustful, aVisiblePussy]);

prone.add(`You shift downward without complaint, settling between {A:his} legs.`, [playerB, isAccepting]);
prone.add(`{A:name} watches without comment as you slide down and settle between {A:his} legs.`, [playerB, isAccepting]);

prone.add(`You slide down nervously, your hands trembling as you settle between {A:his} legs.`, [playerB, isFearful]);
prone.add(`With a shaky breath, you lower yourself between {A:his} thighs.`, [playerB, isFearful]);

prone.add(`You grumble as you reluctantly slide down to settle between {A:his} legs.`, [playerB, isResistant]);
prone.add(`With a huff, you shift downward, your body stiff as you lower your head between {A:his} thighs.`, [playerB, isResistant]);

prone.add(`You struggle as {A:name} forces you down between {A:his} legs.`, [playerB, isViolent]);
prone.add(`You thrash, but {A:name} pushes your head down between {A:his} thighs anyway.`, [playerB, isViolent]);

sixtyNine.add(`With a playful smile, you turn yourself around atop {B:name}, and {B:he} eagerly shifts to bring {B:his} face level with your hips.`, [playerA, isLoving]);
sixtyNine.add(`{B:name} giggles affectionately as you spin around on top of {B:him}, both of you settling into place for some mutual attention.`, [playerA, isLoving]);
sixtyNine.add(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {B:cock.thickCock} now within easy reach of your mouth.`,
  [playerA, isLoving, bVisibleCock]);
sixtyNine.add(`{B:name} shifts eagerly beneath you as you turn around, {B:his} {pussy} now within easy reach of your mouth.`,
  [playerA, isLoving, bVisiblePussy]);

sixtyNine.add(`You turn yourself around atop {B:name}, who moans eagerly as {B:he} pulls your hips down toward {B:his} mouth.`, [playerA, isLustful]);
sixtyNine.add(`{B:name} wastes no time repositioning beneath you as you spin around, hungry for a taste of you.`, [playerA, isLustful]);
sixtyNine.add(`{B:name} arches up as you turn around, {B:his} {B:cock.bigCock} already twitching for your attention.`,
  [playerA, isLustful, bHardCock]);
sixtyNine.add(`{B:name} spreads {B:his} legs eagerly as you turn around, {B:his} soaked {pussy} on full display.`,
  [playerA, isLustful, bVisiblePussy]);

sixtyNine.add(`You turn yourself around atop {B:name}, who shifts without complaint to settle into position.`, [playerA, isAccepting]);
sixtyNine.add(`{B:name} adjusts {B:his} legs as you turn around, letting you settle face-to-crotch.`, [playerA, isAccepting]);

sixtyNine.add(`You turn yourself around atop {B:name}, who shifts nervously to accommodate the new position.`, [playerA, isFearful]);
sixtyNine.add(`{B:name} adjusts {B:his} legs hesitantly as you turn around above {B:him}.`, [playerA, isFearful]);

sixtyNine.add(`{B:name} grumbles as you turn yourself around atop {B:him}, reluctantly shifting into position.`, [playerA, isResistant]);
sixtyNine.add(`With a huff, {B:name} adjusts {B:his} legs as you spin around above {B:him}.`, [playerA, isResistant]);

sixtyNine.add(`{B:name} struggles as you turn yourself around atop {B:him}, forcing {B:his} legs into position anyway.`, [playerA, isViolent]);
sixtyNine.add(`{B:name} thrashes weakly as you force {B:him} to accommodate the new position.`, [playerA, isViolent]);

sixtyNine.add(`{A:name} turns {A:him}self around atop you with a playful smile, and you eagerly shift to bring your face level with {A:his} hips.`, [playerB, isLoving]);
sixtyNine.add(`You giggle affectionately as {A:name} spins around on top of you, both of you settling into place for some mutual attention.`, [playerB, isLoving]);
sixtyNine.add(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {A:cock.thickCock} now within easy reach of your mouth.`,
  [playerB, isLoving, aVisibleCock]);
sixtyNine.add(`You shift eagerly beneath {A:name} as {A:he} turns around, {A:his} {pussy} now within easy reach of your mouth.`,
  [playerB, isLoving, aVisiblePussy]);

sixtyNine.add(`{A:name} turns {A:him}self around atop you, moaning eagerly as {A:he} pulls your hips down toward {A:his} mouth.`, [playerB, isLustful]);
sixtyNine.add(`You waste no time repositioning beneath {A:name} as {A:he} spins around, hungry for a taste of you.`, [playerB, isLustful]);
sixtyNine.add(`You arch up as {A:name} turns around, {A:his} {A:cock.bigCock} already twitching for your attention.`,
  [playerB, isLustful, aHardCock]);
sixtyNine.add(`You spread your legs eagerly as {A:name} turns around, {A:his} soaked {pussy} within reach.`,
  [playerB, isLustful, aVisiblePussy]);

sixtyNine.add(`{A:name} turns {A:him}self around atop you without complaint, and you shift to settle into position.`, [playerB, isAccepting]);
sixtyNine.add(`You adjust your legs as {A:name} turns around, settling face-to-crotch.`, [playerB, isAccepting]);

sixtyNine.add(`{A:name} turns {A:him}self around atop you, and you shift nervously to accommodate the new position.`, [playerB, isFearful]);
sixtyNine.add(`You adjust your legs hesitantly as {A:name} spins around above you.`, [playerB, isFearful]);

sixtyNine.add(`You grumble as {A:name} turns {A:him}self around atop you, reluctantly shifting into position.`, [playerB, isResistant]);
sixtyNine.add(`With a huff, you adjust your legs as {A:name} spins around above you.`, [playerB, isResistant]);

sixtyNine.add(`You struggle as {A:name} turns {A:him}self around atop you, forcing your legs into position anyway.`, [playerB, isViolent]);
sixtyNine.add(`You thrash weakly as {A:name} forces you to accommodate the new position.`, [playerB, isViolent]);
