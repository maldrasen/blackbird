const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const playerWasBehind = WeaverRequirements.playerWas('A');
const playerWasInFront = WeaverRequirements.playerWas('B');

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

const rearrange = WeaverPackage('standing-reversed.rearrange');
const centipede = WeaverPackage('standing-reversed.move-to-centipede');
const kneelingService = WeaverPackage('standing-reversed.move-to-kneeling-service');
const lapSittingReversed = WeaverPackage('standing-reversed.move-to-lap-sitting-reversed');
const spooning = WeaverPackage('standing-reversed.move-to-spooning');
const standing = WeaverPackage('standing-reversed.move-to-standing');

// First standing behind second, crotch pressed against ass. Second has back
// turned to first.
SexPosition.register('standing-reversed',{
  name: 'Reverse Standing',

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
    { code:'centipede', package:centipede },
    { code:'kneeling-service', package:kneelingService, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed },
    { code:'spooning', package:spooning },
    { code:'standing', package:standing },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} turns {B:his} back to you and steps in close, drawing your arms around {B:him} as {B:he} settles against your chest.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} backs into you with a warm hum, {B:his} hands finding yours and wrapping them around {B:his} waist.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles {B:his} back against you, guiding your hands up to cup {B:his} {B:breasts.softBreasts}.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} presses {B:his} ass back against your {A:cock.thickCock} as {B:he} settles into your arms.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`{B:name} backs {B:his} ass into your crotch with a needy moan, grinding against you as you close in behind {B:him}.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} presents {B:his} back eagerly, dragging your hands down {B:his} front as {B:he} pushes back into you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} reaches back to grip your thighs, pinning your hips against {B:his} ass.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} wriggles {B:his} ass against your {A:cock.bigHardCock}, {B:his} head falling back against your shoulder.`,
  [playerA, isLustful, aHardCock]);
rearrange.add(`{B:name} turns around and lets you step in close behind {B:him}, {B:his} back settling against your chest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} stands quietly as you press up behind {B:him}, your hands finding {B:his} hips.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} backs up against you without complaint, {B:his} ass resting against your crotch.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} holds still as your {A:cock.thickCock} comes to rest between {B:his} cheeks.`,
  [playerA, isAccepting, aVisibleCock]);
rearrange.add(`{B:name} turns {B:his} back to you nervously, {B:his} spine going rigid as you press up behind {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} lets you step in close, {B:his} shoulders hunching as your body meets {B:his} back.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} stands very still as you settle against {B:him} from behind, {B:his} breath quick and shallow.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} flinches as your {A:cock.thickCock} presses between {B:his} cheeks, {B:his} hands curling at {B:his} sides.`,
  [playerA, isFearful, aVisibleCock]);
rearrange.add(`{B:name} grumbles as you turn {B:him} around and pull {B:his} back against your chest.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} gives you {B:his} back, standing board-stiff inside your arms.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} leans away from your chest until your grip on {B:his} hips reels {B:him} back in.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts in irritation as your {A:cock.thickCock} settles between {B:his} cheeks.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you wrench {B:him} around and drag {B:his} back against your chest, your arms locking over {B:his}.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} kicks back at your shins, but your grip around {B:his} middle holds {B:him} pinned to your front.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} claws at your arms as you haul {B:him} into place, {B:his} back forced flush against you.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles in your hold as your {A:cock.thickCock} presses hard between {B:his} cheeks.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`You turn your back, and {A:name} steps in close, {A:his} chin coming to rest on your shoulder.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} draws you back against {A:him}, pressing a soft kiss to the side of your neck.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} nestles between your cheeks as {A:he} settles in close behind you.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} press into your back as {A:he} wraps you up from behind.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} closes in behind you with a hungry sound, grinding {A:his} hips against your ass.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} pulls your back flush to {A:his} chest, {A:his} hands wandering down your body.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks as {A:he} crowds in behind you.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} flatten against your back as {A:he} drags you against {A:him}, {A:his} moan hot in your ear.`,
  [playerB, isLustful, aVisibleBreasts]);
rearrange.add(`You give {A:name} your back, and {A:he} steps up behind you without comment.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles in behind you, {A:his} hands coming to rest on your hips.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} presses against your back without protest, {A:his} breath steady at your ear.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} stands quietly at your back.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} steps in behind you hesitantly, {A:his} body settling against yours a nervous inch at a time.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} hands come to your hips feather-light, {A:his} breath unsteady behind your ear.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} presses in at your back, holding {A:him}self carefully still.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} nervously closes the distance.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} steps up behind you with a grumble, {A:his} body held a grudging inch from yours until you lean back.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} lets you place {A:his} hands on your hips, {A:his} grip deliberately loose.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters behind your ear as you press yourself back against {A:him}.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} shifts between your cheeks as {A:he} grudgingly holds {A:his} ground.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} tries to shove you forward, but you catch {A:his} arms and lock them around your chest.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} strains to pull away, but your grip on {A:his} wrists keeps {A:him} pressed against your back.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls as you haul {A:his} hips against your ass, holding {A:him} there by main force.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} is pinned between your cheeks as {A:he} fights your hold from behind.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into centipede, both descend: "b" (in front) kneels and bends over while "a" drops to their knees
// behind, face to "b's" ass. As with the centipede rearrange, there are no options for the player voluntarily
// bending over (as B) in front of a fearful, resistant, or violent partner.
centipede.add(`{B:name} sinks down out of your arms and bends forward onto {B:his} knees, presenting {B:his} ass as you kneel down behind {B:him}.`,
  [playerA, isLoving]);
centipede.add(`{B:name} lowers {B:him}self down and folds forward with a warm glance back, {B:his} ass rising to meet your descending face.`,
  [playerA, isLoving]);
centipede.add(`{B:name} kneels and bends over, {B:his} {B:breasts.softBreasts} swaying beneath {B:him} as you sink down and press your face to {B:his} ass.`,
  [playerA, isLoving, bVisibleBreasts]);
centipede.add(`{B:name} settles onto {B:his} elbows and knees, {B:his} {B:cock.thickCock} hanging between {B:his} legs as your face finds {B:his} ass.`,
  [playerA, isLoving, bVisibleCock]);
centipede.add(`{B:name} drops out of your arms and onto all fours, arching {B:his} ass up toward your face before your knees hit the ground.`,
  [playerA, isLustful]);
centipede.add(`{B:name} bends over with a needy moan, reaching back to spread {B:him}self as you kneel down behind.`,
  [playerA, isLustful]);
centipede.add(`{B:name} folds forward and spreads {B:his} knees, {B:his} soaked {pussy} glistening beneath {B:his} offered ass.`,
  [playerA, isLustful, bVisiblePussy]);
centipede.add(`{B:name's} {B:cock.bigHardCock} bobs beneath {B:him} as {B:he} drops down and presents {B:his} ass to your mouth.`,
  [playerA, isLustful, bHardCock]);
centipede.add(`{B:name} lowers {B:him}self down and bends forward without complaint as you kneel behind {B:him}.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} settles onto {B:his} knees and elbows, raising {B:his} ass as your face comes down to it.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} folds down quietly at the press of your hand, bending over as you sink down behind {B:him}.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} bends over without protest, {B:his} {B:cock.thickCock} hanging plainly as you press your face between {B:his} cheeks.`,
  [playerA, isAccepting, bVisibleCock]);
centipede.add(`{B:name} sinks down nervously and bends forward, trembling as your face lowers to {B:his} ass.`,
  [playerA, isFearful]);
centipede.add(`With a shaky breath, {B:name} folds onto {B:his} elbows and knees, {B:his} hips flinching at the first brush of your mouth.`,
  [playerA, isFearful]);
centipede.add(`{B:name} lowers {B:him}self by hesitant degrees, {B:his} raised ass trembling before your face.`,
  [playerA, isFearful]);
centipede.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath {B:him} as {B:he} nervously bends over for you.`,
  [playerA, isFearful, bVisibleCock]);
centipede.add(`{B:name} grumbles as you press {B:him} down, bending over with poor grace as you kneel at {B:his} ass.`,
  [playerA, isResistant]);
centipede.add(`With a huff, {B:name} folds forward onto {B:his} elbows, enduring your face settling between {B:his} cheeks.`,
  [playerA, isResistant]);
centipede.add(`{B:name} sinks down with deliberate slowness, {B:his} reluctance plain in every joint.`,
  [playerA, isResistant]);
centipede.add(`{B:name} bends over grudgingly, {B:his} {B:cock.thickCock} swaying as you press in behind {B:him}.`,
  [playerA, isResistant, bVisibleCock]);
centipede.add(`{B:name} fights the push, but you bear {B:him} down onto {B:his} knees and bend {B:him} forward, your face following {B:his} ass down.`,
  [playerA, isViolent]);
centipede.add(`{B:name} claws at the ground as you force {B:him} over, pinning {B:his} hips as you bury your face between {B:his} cheeks.`,
  [playerA, isViolent]);
centipede.add(`{B:name} snarls and bucks, but your grip holds {B:his} ass raised to your mouth.`,
  [playerA, isViolent]);
centipede.add(`{B:name's} {B:cock.thickCock} swings wildly as you wrestle {B:him} down and bend {B:him} over before you.`,
  [playerA, isViolent, bVisibleCock]);
centipede.add(`You sink down and bend forward, and {A:name} follows you to the ground, {A:his} face settling warmly between your cheeks.`,
  [playerB, isLoving]);
centipede.add(`{A:name} steadies your hips as you fold onto your knees and elbows, {A:his} lips finding your ass as {A:he} kneels.`,
  [playerB, isLoving]);
centipede.add(`You lower yourself down and raise your ass, and {A:name} hums appreciatively as {A:he} settles in close behind.`,
  [playerB, isLoving]);
centipede.add(`Your {B:cock.thickCock} hangs beneath you as you bend over, {A:name} kneeling down behind you with gentle hands.`,
  [playerB, isLoving, bVisibleCock]);
centipede.add(`You drop down and bend forward, and {A:name} is on {A:his} knees behind you at once, {A:his} mouth hot against your ass.`,
  [playerB, isLustful]);
centipede.add(`{A:name} groans at the sight of you folding over, {A:his} hands kneading your cheeks apart as {A:he} kneels.`,
  [playerB, isLustful]);
centipede.add(`You spread your knees as you bend over, baring your {pussy}, and {A:name} moans as {A:he} drops down behind you.`,
  [playerB, isLustful, bVisiblePussy]);
centipede.add(`Your {B:cock.bigHardCock} bobs beneath you as you bend over, {A:name} sinking down eagerly at your ass.`,
  [playerB, isLustful, bHardCock]);
centipede.add(`You lower yourself down and bend forward, and {A:name} kneels behind you without comment.`,
  [playerB, isAccepting]);
centipede.add(`You settle onto your knees and elbows, and {A:name} sinks down quietly, {A:his} face coming to rest against your ass.`,
  [playerB, isAccepting]);
centipede.add(`{A:name} follows you down without protest as you fold forward and raise your ass.`,
  [playerB, isAccepting]);
centipede.add(`Your {B:cock.thickCock} hangs between your legs as you bend over, {A:name} settling in behind without a word.`,
  [playerB, isAccepting, bVisibleCock]);

// Moving into kneeling-service (swap applied): "a" is the stander (was in front) and "b" is the kneeler (was
// behind), who simply sinks down onto their knees, face coming level with the ass they were pressed against.
kneelingService.add(`{B:name} slides down your back, dropping onto {B:his} knees behind you and pressing a soft kiss to your ass on arrival.`,
  [playerA, isLoving]);
kneelingService.add(`{B:name's} hands trail down your sides as {B:he} sinks to {B:his} knees behind you, {B:his} breath warm against your cheeks.`,
  [playerA, isLoving]);
kneelingService.add(`{B:name} kneels down behind you, {B:his} {B:breasts.softBreasts} grazing the backs of your thighs as {B:he} settles.`,
  [playerA, isLoving, bVisibleBreasts]);
kneelingService.add(`{B:name} lowers {B:him}self behind you with a happy hum, nuzzling into your ass as {B:he} lands.`,
  [playerA, isLoving]);
kneelingService.add(`{B:name} drops to {B:his} knees behind you with a hungry moan, {B:his} mouth on your ass before {B:he} has finished falling.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name} sinks down your body, {B:his} teeth grazing your shoulder, your spine, your cheek on the way down.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name} kneels and pulls your hips back into {B:his} face, moaning against your ass.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name's} {B:cock.bigHardCock} bobs as {B:he} drops behind you, kneading your cheeks apart for {B:his} mouth.`,
  [playerA, isLustful, bHardCock]);
kneelingService.add(`{B:name} lowers {B:him}self onto {B:his} knees behind you without complaint, {B:his} face settling against your ass.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} sinks down quietly at your back, {B:his} hands coming to rest on your hips.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} kneels behind you without protest, {B:his} mouth finding your ass.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} settles onto {B:his} knees, {B:his} {B:cock.thickCock} hanging between {B:his} thighs as {B:his} face meets your ass.`,
  [playerA, isAccepting, bVisibleCock]);
kneelingService.add(`{B:name} slides down behind you nervously, {B:his} trembling breath brushing your ass as {B:he} kneels.`,
  [playerA, isFearful]);
kneelingService.add(`With a shaky breath, {B:name} sinks onto {B:his} knees at your back, {B:his} hands unsteady on your hips.`,
  [playerA, isFearful]);
kneelingService.add(`{B:name} lowers {B:him}self hesitantly, {B:his} face hovering at your ass before {B:he} presses in.`,
  [playerA, isFearful]);
kneelingService.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} kneels anxiously behind you.`,
  [playerA, isFearful, bVisibleCock]);
kneelingService.add(`{B:name} grumbles as you press {B:him} down your back, {B:his} complaints muffled as {B:his} face meets your ass.`,
  [playerA, isResistant]);
kneelingService.add(`With a huff, {B:name} drops to {B:his} knees behind you, pressing {B:his} mouth to your ass with poor grace.`,
  [playerA, isResistant]);
kneelingService.add(`{B:name} sinks down grudgingly, {B:his} grip on your hips more protest than embrace.`,
  [playerA, isResistant]);
kneelingService.add(`{B:name} kneels unwillingly behind you, {B:his} {B:cock.thickCock} hanging untouched between {B:his} thighs.`,
  [playerA, isResistant, bVisibleCock]);
kneelingService.add(`{B:name} fights the hand forcing {B:him} down your back, driven onto {B:his} knees with {B:his} face at your ass.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name} claws at your thighs as you push {B:him} down behind you, holding {B:his} mouth against your cheeks.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name} snarls into your skin, {B:his} hair caught in your reaching grip.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name's} {B:cock.thickCock} swings as {B:he} struggles on {B:his} knees, {B:his} face pinned to your ass.`,
  [playerA, isViolent, bVisibleCock]);
kneelingService.add(`You sink down {A:name's} back onto your knees, and {A:he} glances warmly over {A:his} shoulder as your face settles against {A:his} ass.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name} eases {A:his} hips back with a soft sigh as you kneel down behind {A:him}, your lips brushing {A:his} cheeks.`,
  [playerB, isLoving]);
kneelingService.add(`You drop to your knees behind {A:name}, {A:his} {pussy} visible beneath {A:his} ass as {A:he} widens {A:his} stance for you.`,
  [playerB, isLoving, aVisiblePussy]);
kneelingService.add(`{A:name} reaches back to cradle your head as you settle onto your knees at {A:his} ass.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name} moans as you slide down {A:his} back, pushing {A:his} ass back into your face as you land on your knees.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name} bends slightly at the waist as you kneel, grinding {A:his} ass back against your mouth.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name's} {A:cock.bigHardCock} juts out ahead of {A:him} as {A:he} presses {A:his} ass back to your kneeling face.`,
  [playerB, isLustful, aHardCock]);
kneelingService.add(`{A:name's} soaked {pussy} glistens beneath {A:his} ass as {A:he} tilts {A:his} hips back to your mouth.`,
  [playerB, isLustful, aVisiblePussy]);
kneelingService.add(`You kneel down behind {A:name}, and {A:he} holds {A:his} stance as your face settles against {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name} stands steady as you sink onto your knees at {A:his} back.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name} shifts {A:his} feet apart without comment, letting your mouth find {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name's} {A:cock.thickCock} hangs between {A:his} legs as {A:he} waits, your face pressing in behind.`,
  [playerB, isAccepting, aVisibleCock]);
kneelingService.add(`{A:name} tenses as you slide down {A:his} back, {A:his} whole body going still as you kneel at {A:his} ass.`,
  [playerB, isFearful]);
kneelingService.add(`{A:name's} legs tremble slightly as your breath lands on {A:his} cheeks, your knees settling behind {A:his} heels.`,
  [playerB, isFearful]);
kneelingService.add(`With a shaky breath, {A:name} holds {A:his} ground as your mouth settles against {A:his} ass.`,
  [playerB, isFearful]);
kneelingService.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between {A:his} legs as {A:he} nervously endures your descent.`,
  [playerB, isFearful, aVisibleCock]);
kneelingService.add(`{A:name} grumbles as you kneel down behind {A:him}, {A:his} hips tugging forward until you pull them back.`,
  [playerB, isResistant]);
kneelingService.add(`With a huff, {A:name} plants {A:his} feet, {A:his} fists tight at {A:his} sides as your face finds {A:his} ass.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name} mutters something sour over {A:his} shoulder as you settle onto your knees behind {A:him}.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways as {A:he} shifts in irritation, your grip keeping {A:his} ass at your face.`,
  [playerB, isResistant, aVisibleCock]);
kneelingService.add(`{A:name} tries to walk out of your reach as you drop down, but your arms lock around {A:his} thighs.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name} kicks back at you, but you pin {A:his} legs and drag {A:his} ass back onto your mouth.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name} claws over {A:his} shoulder at your hair, unable to break the grip holding {A:his} hips to your face.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles, {A:his} ass pinned to your mouth.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into lap-sitting-reversed: "a" (behind) sinks to sitting and draws "b" straight down onto their lap,
// both still facing the same way.
lapSittingReversed.add(`You sink down to sitting and draw {B:name} with you, and {B:he} settles into your lap with a contented wiggle.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} follows you down as you sit, folding {B:him}self back into your arms as {B:his} weight settles on your thighs.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} sinks onto your lap as you sit, your arms crossing over {B:his} {B:breasts.softBreasts} as {B:he} leans back.`,
  [playerA, isLoving, bVisibleBreasts]);
lapSittingReversed.add(`{B:name} settles onto your lap, your {A:cock.thickCock} pressed up between {B:his} cheeks as {B:he} leans back into you.`,
  [playerA, isLoving, aVisibleCock]);
lapSittingReversed.add(`You drop to sitting, and {B:name} grinds down into your lap before your legs have settled, moaning at the contact.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name} follows you down eagerly, spreading {B:his} thighs over yours as {B:he} lands in your lap.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name's} {B:cock.bigHardCock} stands up from {B:his} lap as {B:he} sinks onto your thighs, grinding back against you.`,
  [playerA, isLustful, bHardCock]);
lapSittingReversed.add(`{B:name} moans as {B:he} settles onto your lap, your {A:cock.bigHardCock} wedged up between {B:his} cheeks.`,
  [playerA, isLustful, aHardCock]);
lapSittingReversed.add(`You lower yourself to sitting, and {B:name} settles onto your lap without complaint, still facing away.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} follows you down without protest, {B:his} weight coming to rest on your thighs.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} sits back into your lap as you settle, {B:his} hands resting on your knees.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} settles onto your lap, {B:his} {B:cock.thickCock} lying between {B:his} thighs as {B:he} leans back.`,
  [playerA, isAccepting, bVisibleCock]);
lapSittingReversed.add(`You sit and guide {B:name} down after you; {B:he} perches rigid on your thighs, barely settling.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name} lowers {B:him}self onto your lap with a shaky breath, {B:his} back held carefully off your chest.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name} trembles as your arms fold around {B:him}, {B:his} weight landing light and nervous in your lap.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} sinks anxiously onto your lap.`,
  [playerA, isFearful, bVisibleCock]);
lapSittingReversed.add(`{B:name} grumbles as you pull {B:him} down with you, landing stiff and upright in your lap.`,
  [playerA, isResistant]);
lapSittingReversed.add(`With a huff, {B:name} lets {B:him}self be drawn down, sitting rigid on your thighs.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} settles into your lap with poor grace, {B:his} arms crossing as your grip keeps {B:him} seated.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} sits back grudgingly, {B:his} {B:cock.thickCock} hanging between {B:his} thighs.`,
  [playerA, isResistant, bVisibleCock]);
lapSittingReversed.add(`{B:name} thrashes as you sit and haul {B:him} down onto your lap, your arms locking around {B:his} middle.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} fights the descent, but your weight drags {B:him} down with you, pinned seated against your chest.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} snarls and kicks, {B:his} heels drumming your shins as you pin {B:him} down onto your lap.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} bucks in your lap as your {A:cock.thickCock} presses up between {B:his} cheeks, your hold unbroken.`,
  [playerA, isViolent, aVisibleCock]);
lapSittingReversed.add(`{A:name} sinks down behind you and draws you gently onto {A:his} lap, {A:his} arms settling warm around your waist.`,
  [playerB, isLoving]);
lapSittingReversed.add(`You follow {A:name} down as {A:he} sits, {A:his} chest steady at your back as you settle onto {A:his} thighs.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} presses up between your cheeks as {A:he} guides you down onto {A:his} lap.`,
  [playerB, isLoving, aVisibleCock]);
lapSittingReversed.add(`{A:name's} {A:breasts.softBreasts} cushion your back as {A:he} sits and gathers you onto {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSittingReversed.add(`{A:name} drops to sitting and yanks you down onto {A:his} lap, grinding up against your ass as you land.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} pulls you down with {A:him}, {A:his} groan vibrating against your back as your weight settles.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name's} {A:cock.bigHardCock} wedges between your cheeks as {A:he} hauls you down onto {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
lapSittingReversed.add(`{A:name's} hands roam your front as {A:he} settles you into {A:his} lap, {A:his} breath hot on your neck.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} sits down behind you and steadies you as you lower yourself onto {A:his} lap.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`You settle back onto {A:name's} thighs as {A:he} sits, {A:his} hands resting on your hips.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} takes your weight without comment as you sink onto {A:his} lap, still facing away.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as you settle down onto {A:his} lap.`,
  [playerB, isAccepting, aVisibleCock]);
lapSittingReversed.add(`{A:name} sinks down hesitantly and lets you settle onto {A:his} lap, {A:his} hands hovering at your sides.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} breath comes quick behind your ear as your weight settles onto {A:his} trembling thighs.`,
  [playerB, isFearful]);
lapSittingReversed.add(`With a shaky breath, {A:name} sits and takes your weight, {A:his} whole frame held tense beneath you.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles beneath your ass as {A:he} nervously draws you down.`,
  [playerB, isFearful, aVisibleCock]);
lapSittingReversed.add(`{A:name} sits with a grumble when you push {A:him} down, enduring your weight as it settles onto {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`With a huff, {A:name} lowers {A:him}self down, {A:his} arms staying slack as you sit back into {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name} mutters behind your ear as you settle onto {A:his} thighs, {A:his} hold grudging where you place it.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} shifts beneath you as {A:he} reluctantly bears your weight.`,
  [playerB, isResistant, aVisibleCock]);
lapSittingReversed.add(`{A:name} tries to twist out from under you as you force {A:him} down to sitting, but you plant your weight in {A:his} lap.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} shoves at your back, but you settle down hard into {A:his} lap, trapping {A:him} beneath you.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} snarls as your weight lands on {A:his} thighs, {A:his} wrists caught in your grip at your waist.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} is pinned beneath your ass as {A:he} fights to tip you off {A:his} lap.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into spooning: the pair lowers to the ground together onto their sides, keeping the same arrangement.
spooning.add(`The two of you sink down together, {B:name} nestling back into the curve of your body as you settle onto your sides.`,
  [playerA, isLoving]);
spooning.add(`{B:name} follows you down to the ground, pulling your arm over {B:him} as the two of you stretch out on your sides.`,
  [playerA, isLoving]);
spooning.add(`{B:name} settles onto {B:his} side in your arms, your hand drawn up to rest on {B:his} {B:breasts.softBreasts}.`,
  [playerA, isLoving, bVisibleBreasts]);
spooning.add(`{B:name} wriggles back as you both lie down, your {A:cock.thickCock} staying nestled between {B:his} cheeks.`,
  [playerA, isLoving, aVisibleCock]);
spooning.add(`{B:name} pulls you down to the ground with {B:him}, grinding {B:his} ass back into you before you've even settled on your sides.`,
  [playerA, isLustful]);
spooning.add(`{B:name} sinks down eagerly in your arms, dragging your hand down {B:his} front as the two of you stretch out.`,
  [playerA, isLustful]);
spooning.add(`{B:name} rolls {B:his} hips back against you the moment you're down, {B:his} hand guiding yours lower.`,
  [playerA, isLustful]);
spooning.add(`{B:name} moans as you settle onto your sides, your {A:cock.bigHardCock} wedged tight between {B:his} cheeks.`,
  [playerA, isLustful, aHardCock]);
spooning.add(`The two of you lower yourselves down together, {B:name} settling onto {B:his} side in front of you.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} lies down at your guiding and lets you curl in behind {B:him}.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} settles onto {B:his} side without complaint, your arm draping over {B:his} waist.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} lies down in front of you, {B:his} {B:cock.thickCock} resting against {B:his} thigh as you tuck in close.`,
  [playerA, isAccepting, bVisibleCock]);
spooning.add(`{B:name} sinks down stiffly in your arms, holding {B:him}self rigid as the two of you settle onto your sides.`,
  [playerA, isFearful]);
spooning.add(`With a shaky breath, {B:name} lies down in the circle of your arms, {B:his} shoulders tight against your chest.`,
  [playerA, isFearful]);
spooning.add(`{B:name} lowers {B:him}self nervously, {B:his} body a tense line inside the curve of yours.`,
  [playerA, isFearful]);
spooning.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} thigh as {B:he} anxiously settles into your hold.`,
  [playerA, isFearful, bVisibleCock]);
spooning.add(`{B:name} grumbles the whole way down, lying stiff in the curl of your body.`,
  [playerA, isResistant]);
spooning.add(`With a huff, {B:name} lets you lower {B:him} onto {B:his} side, {B:his} arms crossing over yours.`,
  [playerA, isResistant]);
spooning.add(`{B:name} edges away along the ground until your arm reels {B:him} back into your chest.`,
  [playerA, isResistant]);
spooning.add(`{B:name} shifts in irritation as your {A:cock.thickCock} settles between {B:his} cheeks, the two of you stretched out on your sides.`,
  [playerA, isResistant, aVisibleCock]);
spooning.add(`{B:name} fights the descent, but you take {B:him} down to the ground with you, your arms locked around {B:him} from behind.`,
  [playerA, isViolent]);
spooning.add(`{B:name} kicks and twists as the two of you land on your sides, your leg hooking over {B:his} to pin them still.`,
  [playerA, isViolent]);
spooning.add(`{B:name} strains against the arm across {B:his} chest, held fast in the bend of your body.`,
  [playerA, isViolent]);
spooning.add(`{B:name} thrashes in your hold as your {A:cock.thickCock} presses between {B:his} cheeks, pinned to you on your sides.`,
  [playerA, isViolent, aVisibleCock]);
spooning.add(`{A:name} lowers the two of you down together, {A:his} arm warm around your waist as you settle onto your sides.`,
  [playerB, isLoving]);
spooning.add(`You sink down in {A:name's} arms, and {A:he} molds {A:him}self to your back as you stretch out.`,
  [playerB, isLoving]);
spooning.add(`{A:name's} {A:cock.thickCock} stays nestled between your cheeks as {A:he} eases you both down onto your sides.`,
  [playerB, isLoving, aVisibleCock]);
spooning.add(`{A:name's} {A:breasts.softBreasts} press soft into your back as the two of you settle onto your sides.`,
  [playerB, isLoving, aVisibleBreasts]);
spooning.add(`{A:name} takes you down to the ground hungrily, grinding against your ass as the two of you land on your sides.`,
  [playerB, isLustful]);
spooning.add(`{A:name} pulls you down into the bend of {A:his} body, {A:his} hand already wandering as you settle.`,
  [playerB, isLustful]);
spooning.add(`{A:name's} {A:cock.bigHardCock} rides up between your cheeks as {A:he} drags you down onto your sides.`,
  [playerB, isLustful, aHardCock]);
spooning.add(`{A:name} moans into your neck as {A:he} lowers you both down, {A:his} hips tight against your ass.`,
  [playerB, isLustful]);
spooning.add(`{A:name} guides the two of you down, settling in behind you as you come to rest on your sides.`,
  [playerB, isAccepting]);
spooning.add(`You lie down together, {A:name} curling in quietly at your back.`,
  [playerB, isAccepting]);
spooning.add(`{A:name} settles behind you without comment, {A:his} arm coming to rest over your waist.`,
  [playerB, isAccepting]);
spooning.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as the two of you settle onto your sides.`,
  [playerB, isAccepting, aVisibleCock]);
spooning.add(`{A:name} lowers {A:him}self down behind you hesitantly, {A:his} arm settling over you slow and uncertain.`,
  [playerB, isFearful]);
spooning.add(`{A:name's} breath trembles at the back of your neck as the two of you sink onto your sides.`,
  [playerB, isFearful]);
spooning.add(`With a shaky breath, {A:name} follows you down, curling at your back without quite touching.`,
  [playerB, isFearful]);
spooning.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as the two of you lie down together.`,
  [playerB, isFearful, aVisibleCock]);
spooning.add(`{A:name} grumbles as you pull {A:him} down behind you, {A:his} body a stiff line at your back.`,
  [playerB, isResistant]);
spooning.add(`With a huff, {A:name} settles onto {A:his} side behind you, {A:his} arm limp where you drape it over your waist.`,
  [playerB, isResistant]);
spooning.add(`{A:name} mutters into your hair as the two of you come to rest on your sides.`,
  [playerB, isResistant]);
spooning.add(`{A:name's} {A:cock.thickCock} presses between your cheeks as {A:he} grudgingly settles in at your back.`,
  [playerB, isResistant, aVisibleCock]);
spooning.add(`{A:name} tries to wrench free as you drop, but you drag {A:him} down behind you, {A:his} arm pinned across your chest.`,
  [playerB, isViolent]);
spooning.add(`{A:name} struggles as the two of you hit the ground, but you hook your leg back over {A:his} and hold on.`,
  [playerB, isViolent]);
spooning.add(`{A:name} snarls at your back, {A:his} wrist locked in your grip as you force {A:him} to curl around you.`,
  [playerB, isViolent]);
spooning.add(`{A:name's} {A:cock.thickCock} is trapped between your cheeks as {A:he} fights the tangle you've pulled {A:him} into.`,
  [playerB, isViolent, aVisibleCock]);

// Standing is symmetric, so the playerWas requirements read the previousPosition context: if the player was
// behind (A), the partner turns around to face them; if the player was in front (B), the player turns around.
// The {A:}/{B:} tokens still assume the non-swapped edge, where this position's keys carry over unchanged.
standing.add(`{B:name} turns around in your arms, {B:his} smile rising to meet yours as the two of you stand face to face.`,
  [playerWasBehind, isLoving]);
standing.add(`{B:name} spins gently in your hold, looping {B:his} arms around your neck as {B:he} faces you.`,
  [playerWasBehind, isLoving]);
standing.add(`{B:name} turns to face you, {B:his} {B:breasts.softBreasts} coming to rest against your chest.`,
  [playerWasBehind, isLoving, bVisibleBreasts]);
standing.add(`{B:name} turns around, {B:his} {B:cock.thickCock} brushing your thigh as {B:he} settles front to front with you.`,
  [playerWasBehind, isLoving, bVisibleCock]);
standing.add(`{B:name} whirls around and presses into you, {B:his} mouth hungry at your jaw as you stand chest to chest.`,
  [playerWasBehind, isLustful]);
standing.add(`{B:name} turns in your arms with a moan, grinding {B:his} front against yours.`,
  [playerWasBehind, isLustful]);
standing.add(`{B:name} turns and catches your hips, dragging you flush against {B:him}.`,
  [playerWasBehind, isLustful]);
standing.add(`{B:name's} {B:cock.bigHardCock} drags across your hip as {B:he} spins around and crowds against you.`,
  [playerWasBehind, isLustful, bHardCock]);
standing.add(`{B:name} turns around at the nudge of your hands, standing quietly to face you.`,
  [playerWasBehind, isAccepting]);
standing.add(`{B:name} turns to face you without complaint, {B:his} hands settling at {B:his} sides.`,
  [playerWasBehind, isAccepting]);
standing.add(`{B:name} pivots in place, meeting your eyes without protest.`,
  [playerWasBehind, isAccepting]);
standing.add(`{B:name} turns around, {B:his} {B:cock.thickCock} hanging plainly as {B:he} comes to face you.`,
  [playerWasBehind, isAccepting, bVisibleCock]);
standing.add(`{B:name} turns around slowly, {B:his} eyes dropping the moment they find yours.`,
  [playerWasBehind, isFearful]);
standing.add(`With a shaky breath, {B:name} turns to face you, {B:his} arms drawing in across {B:his} chest.`,
  [playerWasBehind, isFearful]);
standing.add(`{B:name} pivots nervously in your hold, standing tense now that you're face to face.`,
  [playerWasBehind, isFearful]);
standing.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} anxiously turns to face you.`,
  [playerWasBehind, isFearful, bVisibleCock]);
standing.add(`{B:name} turns around with a huff, {B:his} glare aimed at your collarbone.`,
  [playerWasBehind, isResistant]);
standing.add(`{B:name} pivots grudgingly when you turn {B:him}, {B:his} arms crossing between you.`,
  [playerWasBehind, isResistant]);
standing.add(`{B:name} faces you with poor grace, {B:his} chin set and {B:his} eyes elsewhere.`,
  [playerWasBehind, isResistant]);
standing.add(`{B:name} turns reluctantly, {B:his} {B:cock.thickCock} hanging between you as {B:he} looks away.`,
  [playerWasBehind, isResistant, bVisibleCock]);
standing.add(`{B:name} takes the loosening of your arms as {B:his} chance, but you spin {B:him} around and catch {B:his} wrists, face to face.`,
  [playerWasBehind, isViolent]);
standing.add(`{B:name} comes around swinging, but you catch {B:his} arm and hold {B:him} standing in front of you.`,
  [playerWasBehind, isViolent]);
standing.add(`{B:name} snarls into your face as you wrench {B:him} around by the shoulder.`,
  [playerWasBehind, isViolent]);
standing.add(`{B:name's} {B:cock.thickCock} swings as {B:he} thrashes, turned forcibly to face you.`,
  [playerWasBehind, isViolent, bVisibleCock]);
standing.add(`You turn around in {A:name's} arms, and {A:he} welcomes you with a warm smile, {A:his} hands sliding to the small of your back.`,
  [playerWasInFront, isLoving]);
standing.add(`{A:name} loosens {A:his} hold to let you turn, gathering you back in the moment you face {A:him}.`,
  [playerWasInFront, isLoving]);
standing.add(`{A:name's} {A:breasts.softBreasts} press against your chest as you turn around into {A:his} embrace.`,
  [playerWasInFront, isLoving, aVisibleBreasts]);
standing.add(`{A:name's} {A:cock.thickCock} brushes your hip as you turn to face {A:him}, {A:his} eyes soft on yours.`,
  [playerWasInFront, isLoving, aVisibleCock]);
standing.add(`You turn around, and {A:name} drags you straight back in, {A:his} mouth hot against your throat.`,
  [playerWasInFront, isLustful]);
standing.add(`{A:name} groans as you turn to face {A:him}, {A:his} hands sliding down to your ass to pull you flush.`,
  [playerWasInFront, isLustful]);
standing.add(`{A:name} barely lets you finish turning before grinding {A:his} hips against yours.`,
  [playerWasInFront, isLustful]);
standing.add(`{A:name's} {A:cock.bigHardCock} presses into your hip as {A:he} pulls you front to front.`,
  [playerWasInFront, isLustful, aHardCock]);
standing.add(`You turn around to face {A:name}, and {A:he} loosens {A:his} hold to give you the room.`,
  [playerWasInFront, isAccepting]);
standing.add(`{A:name} lets you turn in {A:his} arms, standing calmly as you come face to face.`,
  [playerWasInFront, isAccepting]);
standing.add(`{A:name} watches without comment as you turn around and face {A:him}.`,
  [playerWasInFront, isAccepting]);
standing.add(`{A:name's} {A:cock.thickCock} rests against your hip as you settle face to face.`,
  [playerWasInFront, isAccepting, aVisibleCock]);
standing.add(`{A:name} goes still as you turn around, {A:his} eyes flinching away from the sudden eye contact.`,
  [playerWasInFront, isFearful]);
standing.add(`{A:name} steps back a half pace as you turn, {A:his} hands hovering between you.`,
  [playerWasInFront, isFearful]);
standing.add(`With a shaky breath, {A:name} holds {A:his} ground as you come around to face {A:him}.`,
  [playerWasInFront, isFearful]);
standing.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as you turn around to face {A:him}.`,
  [playerWasInFront, isFearful, aVisibleCock]);
standing.add(`{A:name} grumbles as you turn in {A:his} slack arms, {A:his} face angling away from yours.`,
  [playerWasInFront, isResistant]);
standing.add(`With a huff, {A:name} leans back as you come around to face {A:him}, {A:his} arms dropping to {A:his} sides.`,
  [playerWasInFront, isResistant]);
standing.add(`{A:name} meets your turn with a scowl, {A:his} chin lifting away from you.`,
  [playerWasInFront, isResistant]);
standing.add(`{A:name's} {A:cock.thickCock} shifts against your hip as {A:he} suffers you to stand face to face.`,
  [playerWasInFront, isResistant, aVisibleCock]);
standing.add(`{A:name} tries to shove you away as you turn, but you catch {A:his} wrists and hold {A:him} facing you.`,
  [playerWasInFront, isViolent]);
standing.add(`{A:name} swings as you come around, but you duck the blow and pin {A:his} arms between you.`,
  [playerWasInFront, isViolent]);
standing.add(`{A:name} snarls in your face the moment you turn, straining against your grip.`,
  [playerWasInFront, isViolent]);
standing.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles, held fast in front of you.`,
  [playerWasInFront, isViolent, aVisibleCock]);
