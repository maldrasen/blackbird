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

const rearrange = WeaverPackage('standing.rearrange');
const kneeling = WeaverPackage('standing.move-to-kneeling');
const lapSitting = WeaverPackage('standing.move-to-lap-sitting');
const missionary = WeaverPackage('standing.move-to-missionary');
const standingReversed = WeaverPackage('standing.move-to-standing-reversed');

// First and Second standing in front of each other, facing each other.
SexPosition.register('standing',{
  name: 'Standing',

  alignment: {
    first: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
    second: {
      mouth: [MouthAlignment.mouth, MouthAlignment.breasts],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  // There are two ways to get to standing reversed. Either the first person turns around or the second person turns
  // around. This is meaningful because partner standing behind player is very different from player standing behind
  // partner. This becomes important when we need to determine if this position works for how the next action needs
  // the character's parts to be aligned. Standing reversed A>B might work where standing reversed B>A would not. So,
  // when considering if a move works or not, we need to look at which roles the actors end up in each possible
  // position. That gives us the correct alignment map to look at. Both directions share the same package; the
  // playerIs requirements sort out which text fits the roles the actors ended up in.
  moves:[
    { code:'kneeling', package:kneeling },
    { code:'kneeling', package:kneeling, swap:true },
    { code:'lap-sitting', package:lapSitting },
    { code:'lap-sitting', package:lapSitting, swap:true },
    { code:'missionary', package:missionary },
    { code:'missionary', package:missionary, swap:true },
    { code:'standing-reversed', package:standingReversed },
    { code:'standing-reversed', package:standingReversed, swap:true },
  ],

  rearrangePackage: rearrange,
});

// Standing is symmetric, and the player is always assigned key A when rearranging into a symmetric position, so
// these entries need no player key — the partner is always B.
rearrange.add(`{B:name} rises and steps in close, settling into your arms with a warm smile as the two of you stand face to face.`,
  [isLoving]);
rearrange.add(`{B:name} finds {B:his} feet and draws you up with {B:him}, {B:his} forehead coming to rest against yours.`,
  [isLoving]);
rearrange.add(`{B:name} stands and presses close, {B:his} {B:breasts.softBreasts} soft against your chest.`,
  [isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} steps in against you, {B:his} {B:cock.thickCock} brushing your thigh as {B:he} settles into your arms.`,
  [isLoving, bVisibleCock]);
rearrange.add(`{B:name} is on {B:his} feet and against you in a heartbeat, {B:his} hands roaming as {B:he} presses in close.`,
  [isLustful]);
rearrange.add(`{B:name} stands and crowds into you with a hungry moan, {B:his} body flush against yours.`,
  [isLustful]);
rearrange.add(`{B:name} drags you up against {B:him} the moment you're both standing, grinding {B:his} hips into yours.`,
  [isLustful]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} presses against you as {B:he} stands and pulls you chest to chest.`,
  [isLustful, bHardCock]);
rearrange.add(`{B:name} gets to {B:his} feet and stands facing you, close enough to touch.`,
  [isAccepting]);
rearrange.add(`{B:name} rises without complaint, settling into place in front of you.`,
  [isAccepting]);
rearrange.add(`{B:name} stands before you quietly, {B:his} hands loose at {B:his} sides.`,
  [isAccepting]);
rearrange.add(`{B:name} stands facing you, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs.`,
  [isAccepting, bVisibleCock]);
rearrange.add(`{B:name} rises hesitantly and stands before you, {B:his} arms drawn in close to {B:his} chest.`,
  [isFearful]);
rearrange.add(`{B:name} finds {B:his} feet with a shaky breath, {B:his} eyes flicking to yours and away again.`,
  [isFearful]);
rearrange.add(`{B:name} stands facing you nervously, shifting {B:his} weight from foot to foot.`,
  [isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} stands anxiously in front of you.`,
  [isFearful, bVisibleCock]);
rearrange.add(`{B:name} gets up grudgingly and faces you, {B:his} arms crossing over {B:his} chest.`,
  [isResistant]);
rearrange.add(`With a huff, {B:name} stands, glaring at a point somewhere past your shoulder.`,
  [isResistant]);
rearrange.add(`{B:name} plants {B:him}self in front of you with poor grace, radiating irritation.`,
  [isResistant]);
rearrange.add(`{B:name} stands stiffly before you, {B:his} {B:cock.thickCock} hanging between {B:his} legs as {B:he} looks away.`,
  [isResistant, bVisibleCock]);
rearrange.add(`{B:name} tries to back away, but you catch {B:his} wrist and haul {B:him} up to stand facing you.`,
  [isViolent]);
rearrange.add(`{B:name} swings at you as you drag {B:him} to {B:his} feet, {B:his} fury doing nothing to loosen your grip.`,
  [isViolent]);
rearrange.add(`{B:name} snarls and twists, but you pull {B:him} up and hold {B:him} standing in front of you.`,
  [isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings as {B:he} struggles, wrestled up onto {B:his} feet before you.`,
  [isViolent, bVisibleCock]);

// Moving into kneeling from face-to-face standing: one sinks down in front of the other. "a" stays standing, "b"
// kneels; the swap/non-swap edge pair decides which actor takes which role, and playerIs sorts the text.
kneeling.add(`{B:name} holds your gaze as {B:he} sinks slowly to {B:his} knees, {B:his} hands trailing down your body on the way.`,
  [playerA, isLoving]);
kneeling.add(`{B:name} presses a kiss to your chest, then another lower, folding gracefully down onto {B:his} knees before you.`,
  [playerA, isLoving]);
kneeling.add(`{B:name} lowers {B:him}self to {B:his} knees, {B:his} {B:breasts.softBreasts} brushing down your body as {B:he} descends.`,
  [playerA, isLoving, bVisibleBreasts]);
kneeling.add(`{B:name} sinks down before you, {B:his} smiling mouth coming level with your {A:cock.thickCock}.`,
  [playerA, isLoving, aVisibleCock]);
kneeling.add(`{B:name} drops to {B:his} knees with a hungry moan, {B:his} nails dragging down your thighs.`,
  [playerA, isLustful]);
kneeling.add(`{B:name} slides down your body in one eager motion, {B:his} breath hot against your crotch as {B:he} lands.`,
  [playerA, isLustful]);
kneeling.add(`{B:name} sinks down, {B:his} tongue wetting {B:his} lips as your {A:cock.bigHardCock} comes level with {B:his} mouth.`,
  [playerA, isLustful, aHardCock]);
kneeling.add(`{B:name} kneels down eagerly, {B:his} eager breath warm against your {pussy}.`,
  [playerA, isLustful, aVisiblePussy]);
kneeling.add(`{B:name} sinks down onto {B:his} knees before you without a word.`,
  [playerA, isAccepting]);
kneeling.add(`You press gently on {B:name's} shoulder, and {B:he} folds down to kneel at your feet.`,
  [playerA, isAccepting]);
kneeling.add(`{B:name} kneels down in front of you without protest, {B:his} face level with your crotch.`,
  [playerA, isAccepting]);
kneeling.add(`{B:name} settles onto {B:his} knees, your {A:cock.thickCock} hanging before {B:his} patient face.`,
  [playerA, isAccepting, aVisibleCock]);
kneeling.add(`{B:name} sinks to {B:his} knees slowly, {B:his} nervous eyes never quite reaching yours.`,
  [playerA, isFearful]);
kneeling.add(`With a shaky breath, {B:name} kneels down before you, {B:his} hands knotting together in {B:his} lap.`,
  [playerA, isFearful]);
kneeling.add(`{B:name} folds down at the press of your hand, trembling faintly as {B:his} face comes level with your crotch.`,
  [playerA, isFearful]);
kneeling.add(`{B:name} swallows hard as {B:he} kneels, your {A:cock.thickCock} inches from {B:his} anxious face.`,
  [playerA, isFearful, aVisibleCock]);
kneeling.add(`{B:name} resists the push on {B:his} shoulders for a long moment before dropping sullenly to {B:his} knees.`,
  [playerA, isResistant]);
kneeling.add(`With a huff, {B:name} lowers {B:him}self down, kneeling before you with {B:his} jaw set.`,
  [playerA, isResistant]);
kneeling.add(`{B:name} sinks down with deliberate slowness, glaring up at you the whole way.`,
  [playerA, isResistant]);
kneeling.add(`{B:name} kneels grudgingly, {B:his} eyes fixed anywhere but on your {A:cock.thickCock}.`,
  [playerA, isResistant, aVisibleCock]);
kneeling.add(`{B:name} fights the hands bearing {B:him} down, {B:his} knees buckling as you force {B:him} to the floor.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} claws at your arms as you push {B:him} down, driven onto {B:his} knees in front of you.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} snarls up at you from {B:his} knees, your grip in {B:his} hair holding {B:him} there.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} twists furiously as you force {B:him} down, your {A:cock.thickCock} level with {B:his} bared teeth.`,
  [playerA, isViolent, aVisibleCock]);
kneeling.add(`{A:name} cups your cheek as you sink to your knees before {A:him}, {A:his} touch following you down.`,
  [playerB, isLoving]);
kneeling.add(`{A:name} smiles down at you as you settle onto your knees, brushing your hair back from your face.`,
  [playerB, isLoving]);
kneeling.add(`{A:name's} {A:cock.thickCock} comes level with your mouth as you kneel, {A:his} eyes warm on yours.`,
  [playerB, isLoving, aVisibleCock]);
kneeling.add(`{A:name} parts {A:his} stance as you sink down, {A:his} {pussy} level with your lips.`,
  [playerB, isLoving, aVisiblePussy]);
kneeling.add(`{A:name} groans at the sight of you sliding down {A:his} body, {A:his} hand finding the back of your head.`,
  [playerB, isLustful]);
kneeling.add(`{A:name} pushes you down by the shoulders with a hungry sound, {A:his} hips tilting toward your face.`,
  [playerB, isLustful]);
kneeling.add(`{A:name's} {A:cock.bigHardCock} twitches before your eyes as you settle onto your knees.`,
  [playerB, isLustful, aHardCock]);
kneeling.add(`{A:name} steps in the moment your knees touch down, {A:his} soaked {pussy} pressing toward your mouth.`,
  [playerB, isLustful, aVisiblePussy]);
kneeling.add(`You lower yourself to your knees, and {A:name} adjusts {A:his} stance to stand comfortably before you.`,
  [playerB, isAccepting]);
kneeling.add(`{A:name} watches quietly as you kneel down in front of {A:him}.`,
  [playerB, isAccepting]);
kneeling.add(`{A:name} rests a hand on your shoulder as you settle onto your knees before {A:him}.`,
  [playerB, isAccepting]);
kneeling.add(`{A:name's} {A:cock.thickCock} hangs level with your face as you settle onto your knees.`,
  [playerB, isAccepting, aVisibleCock]);
kneeling.add(`{A:name} goes still as you sink to your knees, {A:his} breath catching as your face nears {A:his} crotch.`,
  [playerB, isFearful]);
kneeling.add(`{A:name} watches you kneel with wide eyes, {A:his} hands half-raised and uncertain.`,
  [playerB, isFearful]);
kneeling.add(`With a shaky breath, {A:name} holds {A:his} ground as you settle down before {A:him}.`,
  [playerB, isFearful]);
kneeling.add(`{A:name's} {A:cock.sixInch} long {cock} trembles before your face as you kneel down in front of {A:him}.`,
  [playerB, isFearful, aVisibleCock]);
kneeling.add(`{A:name} clicks {A:his} tongue as you kneel down, {A:his} hips angling away until you take hold of them.`,
  [playerB, isResistant]);
kneeling.add(`With a huff, {A:name} stays put as you settle onto your knees, {A:his} arms folded tight.`,
  [playerB, isResistant]);
kneeling.add(`{A:name} glowers down at you as you kneel, making no secret of {A:his} displeasure.`,
  [playerB, isResistant]);
kneeling.add(`{A:name's} {A:cock.thickCock} sways as {A:he} shifts back, kept in reach only by your grip on {A:his} hips.`,
  [playerB, isResistant, aVisibleCock]);
kneeling.add(`{A:name} tries to knee you away as you drop down, but you catch {A:his} legs and hold {A:him} standing before you.`,
  [playerB, isViolent]);
kneeling.add(`{A:name} grabs at your hair as you kneel, but you pin {A:his} wrists to {A:his} sides and settle in front of {A:him}.`,
  [playerB, isViolent]);
kneeling.add(`{A:name} snarls and struggles, but your arms around {A:his} thighs keep {A:him} planted in front of your face.`,
  [playerB, isViolent]);
kneeling.add(`{A:name's} {A:cock.thickCock} swings as {A:he} fights your grip, held fast before your face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into lap-sitting from standing: "a" lowers to sitting and "b" climbs astride their lap, face to face.
lapSitting.add(`You lower yourself to sitting, and {B:name} follows you down at once, climbing warmly astride your lap.`,
  [playerA, isLoving]);
lapSitting.add(`{B:name} guides you down to sit, then settles into your lap facing you, {B:his} arms looping around your neck.`,
  [playerA, isLoving]);
lapSitting.add(`{B:name} climbs into your lap as you settle, {B:his} {B:breasts.softBreasts} warm against your chest.`,
  [playerA, isLoving, bVisibleBreasts]);
lapSitting.add(`{B:name} straddles your thighs as you sit, {B:his} {B:cock.thickCock} settling between your stomachs.`,
  [playerA, isLoving, bVisibleCock]);
lapSitting.add(`{B:name} pushes you down to sitting and is astride your lap before you land, grinding down with a moan.`,
  [playerA, isLustful]);
lapSitting.add(`{B:name} follows you down hungrily, {B:his} knees bracketing your hips as {B:he} settles into your lap.`,
  [playerA, isLustful]);
lapSitting.add(`{B:name's} {B:cock.bigHardCock} presses between your bodies as {B:he} climbs eagerly astride you.`,
  [playerA, isLustful, bHardCock]);
lapSitting.add(`{B:name} sinks onto your lap with {B:his} thighs spread wide, {B:his} soaked {pussy} grinding against you.`,
  [playerA, isLustful, bVisiblePussy]);
lapSitting.add(`You sit down, and {B:name} climbs onto your lap without complaint, settling astride your thighs.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} steps over your legs as you settle, lowering {B:him}self onto your lap to face you.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} takes {B:his} seat astride you without protest, {B:his} hands resting on your shoulders.`,
  [playerA, isAccepting]);
lapSitting.add(`{B:name} settles onto your lap, {B:his} {B:cock.thickCock} coming to rest against your stomach.`,
  [playerA, isAccepting, bVisibleCock]);
lapSitting.add(`You sit and draw {B:name} down after you; {B:he} perches on your thighs, barely letting {B:his} weight settle.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name} climbs onto your lap with a shaky breath, {B:his} hands trembling where they brace on your chest.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name} lowers {B:him}self astride you by nervous degrees, {B:his} eyes fixed on your collarbone.`,
  [playerA, isFearful]);
lapSitting.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between you as {B:he} settles anxiously onto your lap.`,
  [playerA, isFearful, bVisibleCock]);
lapSitting.add(`{B:name} lets you pull {B:him} down astride your lap, {B:his} spine held stiff and straight.`,
  [playerA, isResistant]);
lapSitting.add(`With a huff, {B:name} climbs onto your thighs, perching as far back as your grip allows.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} settles into your lap with poor grace, {B:his} face turned from yours.`,
  [playerA, isResistant]);
lapSitting.add(`{B:name} straddles you grudgingly, {B:his} {B:cock.thickCock} caught between your bodies.`,
  [playerA, isResistant, bVisibleCock]);
lapSitting.add(`{B:name} fights as you sit and drag {B:him} down astride you, your arms locking around {B:his} waist.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} shoves at your face as you haul {B:him} onto your lap, {B:his} knees forced to either side of your thighs.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name} snarls and bucks in your lap, pinned chest to chest by your grip.`,
  [playerA, isViolent]);
lapSitting.add(`{B:name's} {B:cock.thickCock} is trapped between your stomachs as {B:he} thrashes astride you.`,
  [playerA, isViolent, bVisibleCock]);
lapSitting.add(`{A:name} settles down and pats {A:his} thighs, gathering you in close as you climb astride {A:his} lap.`,
  [playerB, isLoving]);
lapSitting.add(`{A:name} sinks to sitting and draws you down after {A:him}, {A:his} smile close to yours as you settle.`,
  [playerB, isLoving]);
lapSitting.add(`{A:name's} {A:breasts.softBreasts} press into your chest as {A:he} pulls you down astride {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSitting.add(`{A:name's} {A:cock.thickCock} rests between your bodies as you settle into {A:his} welcoming lap.`,
  [playerB, isLoving, aVisibleCock]);
lapSitting.add(`{A:name} drops to sitting and yanks you down astride {A:him}, {A:his} hands hot on your ass.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} groans as you climb into {A:his} lap, dragging you flush the moment your knees land.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name} sits and hauls you in by the hips, grinding up against you as you settle.`,
  [playerB, isLustful]);
lapSitting.add(`{A:name's} {A:cock.bigHardCock} presses up against you as {A:he} pulls you down astride {A:his} thighs.`,
  [playerB, isLustful, aHardCock]);
lapSitting.add(`{A:name} lowers {A:him}self to sitting and steadies you as you climb astride {A:his} lap.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} sits down without comment, {A:his} hands resting on your hips as you settle over {A:his} thighs.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name} takes your weight without protest as you lower yourself into {A:his} lap.`,
  [playerB, isAccepting]);
lapSitting.add(`{A:name's} {A:cock.thickCock} settles between your bodies as you sit astride {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
lapSitting.add(`{A:name} sits down hesitantly and holds very still as you climb astride {A:his} lap.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name's} hands hover at your sides as you settle onto {A:his} thighs, {A:his} breath quick and shallow.`,
  [playerB, isFearful]);
lapSitting.add(`With a shaky breath, {A:name} lets you lower yourself into {A:his} lap, {A:his} whole frame tense.`,
  [playerB, isFearful]);
lapSitting.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between your bodies as you settle astride {A:him}.`,
  [playerB, isFearful, aVisibleCock]);
lapSitting.add(`{A:name} sits with a grumble when you push {A:him} down, suffering you to climb astride {A:his} lap.`,
  [playerB, isResistant]);
lapSitting.add(`With a huff, {A:name} lowers {A:him}self down, {A:his} arms staying at {A:his} sides as you straddle {A:him}.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name} mutters under {A:his} breath as you settle into {A:his} lap, {A:his} face angled away.`,
  [playerB, isResistant]);
lapSitting.add(`{A:name's} {A:cock.thickCock} shifts between your bodies as {A:he} grudgingly bears your weight.`,
  [playerB, isResistant, aVisibleCock]);
lapSitting.add(`{A:name} tries to rise the moment you push {A:him} down, but you climb astride {A:his} lap and pin {A:him} under your weight.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} shoves at your chest as you straddle {A:him}, but your legs lock around {A:his} hips.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name} snarls into your shoulder as you wrestle {A:his} arms down and settle astride {A:him}.`,
  [playerB, isViolent]);
lapSitting.add(`{A:name's} {A:cock.thickCock} is pinned beneath you as {A:he} fights to unseat you from {A:his} lap.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into missionary from standing: "b" goes down onto their back and "a" follows down on top between
// their legs.
missionary.add(`You lower {B:name} down onto {B:his} back, and {B:he} pulls you gently down after {B:him}, {B:his} legs parting around your hips.`,
  [playerA, isLoving]);
missionary.add(`{B:name} sinks backward with {B:his} arms around your neck, drawing you down on top of {B:him}.`,
  [playerA, isLoving]);
missionary.add(`{B:name} lies back and welcomes you down, {B:his} {B:breasts.softBreasts} pressing up against your chest.`,
  [playerA, isLoving, bVisibleBreasts]);
missionary.add(`{B:name} settles onto {B:his} back beneath you, {B:his} {B:cock.thickCock} caught between your stomachs as you come down.`,
  [playerA, isLoving, bVisibleCock]);
missionary.add(`{B:name} pulls you down with {B:him} as {B:he} drops onto {B:his} back, {B:his} legs locking around your waist mid-fall.`,
  [playerA, isLustful]);
missionary.add(`{B:name} lies back and drags you down by the hips, grinding up against you before your weight has settled.`,
  [playerA, isLustful]);
missionary.add(`{B:name} spreads {B:his} legs as {B:he} goes down, {B:his} soaked {pussy} tilted up in invitation.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`{B:name's} {B:cock.bigHardCock} presses up between your bodies as {B:he} pulls you down on top of {B:him}.`,
  [playerA, isLustful, bHardCock]);
missionary.add(`You guide {B:name} down onto {B:his} back, and {B:he} parts {B:his} legs without complaint as you settle between them.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lowers {B:him}self down and lies back, letting you come down on top of {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lies back without protest, accepting your weight as you settle over {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} settles onto {B:his} back, {B:his} {B:cock.thickCock} resting between your bodies as you lower yourself.`,
  [playerA, isAccepting, bVisibleCock]);
missionary.add(`{B:name} sinks down nervously under your guiding hands, lying back with {B:his} breath coming quick.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} lies back and parts {B:his} legs, {B:his} wide eyes on you as you come down.`,
  [playerA, isFearful]);
missionary.add(`{B:name} lowers {B:him}self down tensely, flinching as your weight settles over {B:him}.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously takes your weight.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles the whole way down, lying back stiffly as you settle on top of {B:him}.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} lets you lower {B:him} onto {B:his} back, {B:his} thighs parting only under pressure.`,
  [playerA, isResistant]);
missionary.add(`{B:name} lies back with poor grace, {B:his} face turned aside as your weight comes down.`,
  [playerA, isResistant]);
missionary.add(`{B:name} shifts unhappily beneath you, {B:his} {B:cock.thickCock} caught between your settling bodies.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} fights you all the way down, but you bear {B:him} backward onto {B:his} back and pin {B:him} beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name} claws at your shoulders as you take {B:him} down, {B:his} kicking legs caught around your hips.`,
  [playerA, isViolent]);
missionary.add(`{B:name} snarls as {B:his} back hits the ground, your weight following {B:him} down before {B:he} can twist away.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} thrashes beneath your landing weight.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`{A:name} lowers you onto your back with careful hands, following you down and settling warmly between your legs.`,
  [playerB, isLoving]);
missionary.add(`You lie back, and {A:name} comes down over you, {A:his} weight settling gently over yours.`,
  [playerB, isLoving]);
missionary.add(`{A:name's} {A:breasts.softBreasts} settle against your chest as {A:he} lowers {A:him}self onto you.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name's} {A:cock.thickCock} comes to rest against your thigh as {A:he} settles down between your legs.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name} takes you down to the ground with {A:him}, {A:his} mouth on your throat before your back has settled.`,
  [playerB, isLustful]);
missionary.add(`{A:name} presses you onto your back and follows hungrily, grinding down the moment {A:his} hips find yours.`,
  [playerB, isLustful]);
missionary.add(`{A:name's} {A:cock.bigHardCock} presses between your bodies as {A:he} bears you down onto your back.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`{A:name} grinds {A:his} soaked {pussy} against you as {A:he} settles down between your spread legs.`,
  [playerB, isLustful, aVisiblePussy]);
missionary.add(`You lie back, and {A:name} kneels down and settles over you without comment.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} follows you down as you lower yourself, {A:his} weight coming to rest between your thighs.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} settles on top of you without protest as you stretch out on your back.`,
  [playerB, isAccepting]);
missionary.add(`{A:name's} {A:cock.thickCock} rests against your thigh as {A:he} lowers {A:him}self over you.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} kneels down over you hesitantly, lowering {A:him}self by degrees as you lie back.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} arms tremble as {A:he} braces above you, {A:his} weight settling nervously onto yours.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} comes down over you, {A:his} eyes fixed somewhere beside your head.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your thigh as {A:he} nervously settles between your legs.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles as you pull {A:him} down after you, settling over you with clear reluctance.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} lowers {A:him}self onto you, holding {A:his} face away from yours.`,
  [playerB, isResistant]);
missionary.add(`{A:name} comes down over you stiffly, {A:his} weight grudging where it settles.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts against your thigh as {A:he} reluctantly lowers {A:him}self between your legs.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} tries to stay on {A:his} feet, but you drag {A:him} down on top of you, your legs closing around {A:his} waist.`,
  [playerB, isViolent]);
missionary.add(`{A:name} thrashes as you pull {A:him} to the ground with you, caught in the cage of your arms and legs.`,
  [playerB, isViolent]);
missionary.add(`{A:name} snarls above you, {A:his} wrists locked in your grip as you drag {A:his} weight down onto yours.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} grinds against your thigh as {A:he} fights the legs locked around {A:him}.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into standing-reversed: one of the two turns around in place. "a" ends up behind, "b" in front with
// their back turned; the swap/non-swap edge pair covers both actors turning.
standingReversed.add(`{B:name} turns around in your arms, drawing them snug across {B:his} chest as {B:he} settles back against you.`,
  [playerA, isLoving]);
standingReversed.add(`{B:name} spins slowly and leans back into your chest, {B:his} head tipping onto your shoulder.`,
  [playerA, isLoving]);
standingReversed.add(`{B:name} turns {B:his} back to you and pulls your hands up to {B:his} {B:breasts.softBreasts}, settling into your hold.`,
  [playerA, isLoving, bVisibleBreasts]);
standingReversed.add(`{B:name} turns around and eases {B:his} ass back against your {A:cock.thickCock}, {B:his} hands guiding yours to {B:his} hips.`,
  [playerA, isLoving, aVisibleCock]);
standingReversed.add(`{B:name} whirls around and grinds {B:his} ass back into you, dragging your hands down {B:his} front.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} turns and presses back against you with a moan, {B:his} head falling back to bare {B:his} throat.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} turns in your grip and molds {B:his} back to your chest, rolling {B:his} hips against you.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} backs {B:his} ass onto your {A:cock.bigHardCock} the moment {B:he} finishes turning, grinding against it.`,
  [playerA, isLustful, aHardCock]);
standingReversed.add(`{B:name} turns around at the guide of your hands, settling {B:his} back against your chest.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} faces away without complaint, letting you draw {B:him} back against you.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} turns and stands quietly in your arms, {B:his} back warm against your chest.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} turns around, {B:his} {B:cock.thickCock} swaying with the motion as {B:he} settles back into you.`,
  [playerA, isAccepting, bVisibleCock]);
standingReversed.add(`{B:name} turns around slowly at your urging, {B:his} shoulders drawing tight as {B:his} back meets your chest.`,
  [playerA, isFearful]);
standingReversed.add(`With a shaky breath, {B:name} gives you {B:his} back, standing rigid as your arms come around {B:him}.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name} turns away from you nervously, {B:his} breath quickening as you step in close behind.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} anxiously turns {B:his} back to you.`,
  [playerA, isFearful, bVisibleCock]);
standingReversed.add(`{B:name} turns around with a huff, {B:his} arms crossing as you pull {B:his} back against your chest.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} gives you {B:his} back grudgingly, muttering as your arms settle around {B:him}.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} turns away with poor grace, leaning forward until you draw {B:him} back into you.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} stiffens as your {A:cock.thickCock} presses between {B:his} cheeks, grumbling at the arrangement.`,
  [playerA, isResistant, aVisibleCock]);
standingReversed.add(`{B:name} tries to bolt as you spin {B:him} around, but your arms close over {B:his} chest, pinning {B:his} back to you.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} claws at your forearms as you wrench {B:him} around, {B:his} back dragged against your chest.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} snarls as you turn {B:him} by the shoulders and haul {B:him} back into you.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} thrashes in your hold as your {A:cock.thickCock} presses between {B:his} cheeks, {B:his} struggles going nowhere.`,
  [playerA, isViolent, aVisibleCock]);
standingReversed.add(`You turn around, and {A:name} steps in close behind you, {A:his} arms crossing warm over your chest.`,
  [playerB, isLoving]);
standingReversed.add(`{A:name} turns you gently by the hips and gathers you back against {A:him}, {A:his} lips brushing your ear.`,
  [playerB, isLoving]);
standingReversed.add(`{A:name's} {A:cock.thickCock} settles between your cheeks as {A:he} draws your back against {A:his} chest.`,
  [playerB, isLoving, aVisibleCock]);
standingReversed.add(`{A:name's} {A:breasts.softBreasts} press into your back as {A:he} folds {A:him}self around you from behind.`,
  [playerB, isLoving, aVisibleBreasts]);
standingReversed.add(`{A:name} spins you around and hauls your hips back against {A:his}, {A:his} groan hot in your ear.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name} steps in behind you the moment you turn, {A:his} hands sliding possessively down your front.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name} crowds against your back with a hungry sound, {A:his} mouth finding the side of your neck.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name's} {A:cock.bigHardCock} grinds up between your cheeks as {A:he} pulls you back against {A:him}.`,
  [playerB, isLustful, aHardCock]);
standingReversed.add(`You turn your back to {A:name}, and {A:he} steps up behind you without comment.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name} settles in at your back as you turn, {A:his} hands finding your hips.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name} accepts your back against {A:his} chest, standing steady behind you.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} stands close at your back.`,
  [playerB, isAccepting, aVisibleCock]);
standingReversed.add(`{A:name} steps up behind you hesitantly as you turn, {A:his} hands hovering before they dare settle on your hips.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name} moves in behind you with a shaky breath, {A:his} body barely brushing yours.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name} stands close at your back, {A:his} nervous breath stirring your hair.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} anxiously steps in behind you.`,
  [playerB, isFearful, aVisibleCock]);
standingReversed.add(`{A:name} steps in behind you with a grumble when you pull {A:him} close, {A:his} chin turned from your shoulder.`,
  [playerB, isResistant]);
standingReversed.add(`With a huff, {A:name} takes {A:his} place at your back, {A:his} arms hanging unwilling at {A:his} sides.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name} mutters as you draw {A:his} hands to your hips, {A:his} hold reluctant.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name's} {A:cock.thickCock} presses between your cheeks as you pull {A:him} grudgingly against your back.`,
  [playerB, isResistant, aVisibleCock]);
standingReversed.add(`{A:name} tries to step away as you turn, but you catch {A:his} arms and wrap them around you from behind.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} strains against your grip, {A:his} chest forced flush to your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} snarls behind your ear as you pin {A:his} wrists at your waist, holding {A:him} at your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name's} {A:cock.thickCock} is trapped between your cheeks as {A:he} fights the hold keeping {A:him} behind you.`,
  [playerB, isViolent, aVisibleCock]);
