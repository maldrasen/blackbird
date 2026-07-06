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

const rearrange = WeaverPackage('kneeling-service.rearrange');
const centipede = WeaverPackage('kneeling-service.move-to-centipede');
const kneeling = WeaverPackage('kneeling-service.move-to-kneeling');
const standingReversed = WeaverPackage('kneeling-service.move-to-standing-reversed');
const lapSittingReversed = WeaverPackage('kneeling-service.move-to-lap-sitting-reversed');

// First standing with Second on knees behind first. (Rimming Position)
SexPosition.register('kneeling-service',{
  name: 'Service Kneeling',

  // Pussy eating is still possible from the kneeling behind position.
  alignment: {
    first: {
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass],
      hands: [HandAlignment.ass, HandAlignment.cock],
    },
  },

  moves:[
    { code:'centipede', package:centipede, swap:true },
    { code:'kneeling', package:kneeling },
    { code:'standing-reversed', package:standingReversed, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} settles onto {B:his} knees behind you, pressing a soft kiss to each cheek of your ass as {B:his} hands slide warmly up your thighs.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} kneels down behind you with a happy hum, nuzzling {B:his} face into your ass.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} sinks to {B:his} knees behind you, {B:his} {B:breasts.softBreasts} brushing the backs of your legs as {B:he} presses close.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`You feel {B:name} settle in behind you, {B:his} lips brushing affectionately over your ass cheeks.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} drops to {B:his} knees behind you with a hungry moan, burying {B:his} face between your cheeks immediately.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} kneels behind you, {B:his} hands kneading your ass apart as {B:he} presses {B:his} eager mouth to it.`,
  [playerA, isLustful]);
rearrange.add(`You feel {B:name's} hot breath against your ass as {B:he} settles in hungrily behind you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} bobs between {B:his} thighs as {B:he} drops eagerly to {B:his} knees behind you.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} kneels down behind you without complaint, pressing {B:his} face to your ass.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} knees behind you without protest, {B:his} hands resting on your hips.`,
  [playerA, isAccepting]);
rearrange.add(`You guide {B:name} down behind you, and {B:he} presses {B:his} mouth to your ass without a word.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} kneels behind you quietly, {B:his} {B:cock.thickCock} hanging between {B:his} thighs as {B:his} face meets your ass.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} sinks to {B:his} knees behind you nervously, {B:his} breath quick and unsteady against your ass.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} kneels behind you, {B:his} trembling hands coming to rest on your hips.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} settles in behind you hesitantly, {B:his} face hovering close before {B:he} presses it to your ass.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} nervously kneels behind you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} down behind you, {B:his} complaints muffled as {B:his} face meets your ass.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} kneels behind you, pressing {B:his} face grudgingly between your cheeks.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} sinks down behind you with poor grace, {B:his} mouth finding your ass reluctantly.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} settles unwillingly onto {B:his} knees behind you, {B:his} {B:cock.thickCock} hanging between {B:his} thighs.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you force {B:him} down behind you, holding {B:his} face against your ass by the hair.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you push {B:him} onto {B:his} knees behind you and pull {B:his} mouth against your ass.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} claws at your thighs as you force {B:his} face between your cheeks, your grip in {B:his} hair unyielding.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings between {B:his} thighs as {B:he} fights your grip, {B:his} face forced against your ass.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`{A:name} stands and glances warmly back over {A:his} shoulder as you kneel down behind {A:him}, pressing your face to {A:his} ass.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} eases {A:his} hips back with a contented sigh as you settle onto your knees behind {A:him}.`,
  [playerB, isLoving]);
rearrange.add(`You kneel behind {A:name}, {A:his} {pussy} visible beneath {A:his} ass as {A:he} parts {A:his} legs for you.`,
  [playerB, isLoving, aVisiblePussy]);
rearrange.add(`{A:name} reaches back to stroke your hair as you settle in behind {A:him}, your face pressing between {A:his} cheeks.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} moans and pushes {A:his} ass back against your face the moment you kneel behind {A:him}.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} widens {A:his} stance eagerly as you drop to your knees behind {A:him}, grinding back against your mouth.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} juts out ahead of {A:him} as {A:he} eagerly presses {A:his} ass back against your mouth.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name's} soaked {pussy} glistens beneath {A:his} ass as {A:he} bends slightly, pressing back against your face.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`You kneel down behind {A:name}, and {A:he} holds still as you press your face to {A:his} ass.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} stands without comment as you settle onto your knees behind {A:him}.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} adjusts {A:his} stance to steady {A:him}self, letting you press your mouth between {A:his} cheeks.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} hangs between {A:his} legs as {A:he} waits, your face settling against {A:his} ass.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} tenses as you kneel down behind {A:him}, {A:his} whole body going still as your face nears {A:his} ass.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} breath catches as your hands settle on {A:his} hips, {A:his} legs trembling slightly as you kneel behind {A:him}.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} holds {A:his} ground as you press your face between {A:his} cheeks.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between {A:his} legs as {A:he} nervously lets you press your face to {A:his} ass.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you kneel behind {A:him} and pull {A:his} hips back toward your face.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} stands rigid, {A:his} fists clenched at {A:his} sides as your mouth finds {A:his} ass.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters something sour, {A:his} body stiff as you press your face between {A:his} cheeks.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} sways as {A:he} shifts unhappily, unable to step away from your grip on {A:his} hips.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} tries to step away as you kneel, but your grip on {A:his} hips hauls {A:his} ass back against your face.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} kicks back at you, but you wrap your arms around {A:his} thighs and bury your face between {A:his} cheeks.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls and claws back at your head, but you hold {A:his} hips fast, your mouth pressed hard to {A:his} ass.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles in your grip, unable to wrench {A:his} ass away from your face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into centipede, "a" is the one kneeling behind (was already the kneeler in kneeling-service), while "b"
// (was the stander) sinks down onto their knees and bends over in front of them. As with the centipede rearrange,
// there are deliberately no options for the player voluntarily bending over (as B) in front of a fearful,
// resistant, or violent partner.
centipede.add(`{B:name} sinks onto {B:his} knees and bends forward for you, arching {B:his} back as you lean in to keep your face pressed to {B:his} ass.`,
  [playerA, isLoving]);
centipede.add(`{B:name} lowers {B:him}self down in front of you with a warm smile over {B:his} shoulder, bending forward and raising {B:his} ass to your face.`,
  [playerA, isLoving]);
centipede.add(`{B:name} kneels down and bends forward, {B:his} {B:breasts.softBreasts} swaying gently beneath {B:him} as you lean in to {B:his} ass.`,
  [playerA, isLoving, bVisibleBreasts]);
centipede.add(`{B:name} settles down and bends over affectionately, {B:his} {B:cock.thickCock} swaying between {B:his} legs as {B:he} presents {B:his} ass to you.`,
  [playerA, isLoving, bVisibleCock]);
centipede.add(`{B:name} drops to {B:his} knees eagerly and bends forward, spreading {B:his} thighs and arching {B:his} ass up into your face.`,
  [playerA, isLustful]);
centipede.add(`{B:name} sinks down with a needy moan, bending over and pressing {B:his} ass back against your mouth before {B:he} is even settled.`,
  [playerA, isLustful]);
centipede.add(`{B:name} bends forward eagerly, {B:his} soaked {pussy} glistening beneath {B:his} raised ass as you lean in.`,
  [playerA, isLustful, bVisiblePussy]);
centipede.add(`{B:name's} {B:cock.bigHardCock} bobs between {B:his} legs as {B:he} drops down and bends over for you, moaning as your face follows {B:his} ass down.`,
  [playerA, isLustful, bHardCock]);
centipede.add(`{B:name} lowers {B:him}self onto {B:his} knees and bends forward without complaint, raising {B:his} ass to your face.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} kneels down and bends over in front of you without protest, and you lean in, pressing your face back between {B:his} cheeks.`,
  [playerA, isAccepting]);
centipede.add(`You guide {B:name} down by the hips, and {B:he} bends forward quietly, settling onto {B:his} elbows.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} settles down and bends over, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs as you lean back in.`,
  [playerA, isAccepting, bVisibleCock]);
centipede.add(`{B:name} lowers {B:him}self down nervously, bending forward with {B:his} hands trembling beneath {B:him}.`,
  [playerA, isFearful]);
centipede.add(`With a shaky breath, {B:name} kneels and bends over in front of you, {B:his} whole body tense as your face follows {B:his} ass down.`,
  [playerA, isFearful]);
centipede.add(`{B:name} sinks down hesitantly, arching {B:his} back with obvious nerves as {B:he} presents {B:his} ass to your mouth.`,
  [playerA, isFearful]);
centipede.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} legs as {B:he} nervously lowers {B:him}self and bends over for you.`,
  [playerA, isFearful, bVisibleCock]);
centipede.add(`{B:name} grumbles as you press {B:him} down by the hips, kneeling and bending over with poor grace.`,
  [playerA, isResistant]);
centipede.add(`With a huff, {B:name} sinks down and bends forward, raising {B:his} ass to your face reluctantly.`,
  [playerA, isResistant]);
centipede.add(`{B:name} lowers {B:him}self grudgingly, muttering as {B:he} settles onto {B:his} elbows in front of you.`,
  [playerA, isResistant]);
centipede.add(`{B:name} bends over unwillingly, {B:his} {B:cock.thickCock} swaying between {B:his} legs as {B:he} settles into position.`,
  [playerA, isResistant, bVisibleCock]);
centipede.add(`{B:name} thrashes as you drag {B:him} down from behind, forcing {B:him} onto {B:his} knees and bending {B:him} forward.`,
  [playerA, isViolent]);
centipede.add(`{B:name} struggles, but you haul {B:him} down and pin {B:his} hips, pressing your face back between {B:his} cheeks.`,
  [playerA, isViolent]);
centipede.add(`{B:name} snarls as you force {B:him} down onto {B:his} elbows, {B:his} ass held up against your face.`,
  [playerA, isViolent]);
centipede.add(`{B:name's} {B:cock.thickCock} swings between {B:his} legs as {B:he} fights you, wrestled down and bent over in front of you.`,
  [playerA, isViolent, bVisibleCock]);
centipede.add(`You lower yourself to your knees and bend forward, and {A:name} follows you down, {A:his} face staying pressed warmly to your ass.`,
  [playerB, isLoving]);
centipede.add(`{A:name} steadies your hips as you kneel and bend over, pressing a soft kiss to your ass once you settle.`,
  [playerB, isLoving]);
centipede.add(`You settle onto your elbows in front of {A:name}, and {A:he} hums happily, nuzzling back into your ass.`,
  [playerB, isLoving]);
centipede.add(`Your {B:cock.thickCock} sways between your legs as you bend over, {A:name} settling in close behind you with a contented sigh.`,
  [playerB, isLoving, bVisibleCock]);
centipede.add(`You sink down and bend forward, and {A:name} moans hungrily, {A:his} face chasing your ass the whole way down.`,
  [playerB, isLustful]);
centipede.add(`{A:name} kneads your cheeks apart eagerly as you settle onto your elbows, {A:his} mouth pressing greedily back into place.`,
  [playerB, isLustful]);
centipede.add(`You bend over, baring your {pussy} beneath your raised ass, and {A:name} groans with want behind you.`,
  [playerB, isLustful, bVisiblePussy]);
centipede.add(`Your {B:cock.bigHardCock} bobs between your legs as you bend over, {A:name} moaning eagerly against your ass.`,
  [playerB, isLustful, bHardCock]);
centipede.add(`You lower yourself down and bend forward, and {A:name} follows without comment, {A:his} face settling back against your ass.`,
  [playerB, isAccepting]);
centipede.add(`You kneel and settle onto your elbows, and {A:name} leans in quietly behind you.`,
  [playerB, isAccepting]);
centipede.add(`{A:name} keeps {A:his} hands resting on your hips as you bend over in front of {A:him}, following you down without protest.`,
  [playerB, isAccepting]);
centipede.add(`Your {B:cock.thickCock} hangs between your legs as you bend over, {A:name} settling in behind you without a word.`,
  [playerB, isAccepting, bVisibleCock]);

// Moving into kneeling, "a" stays standing and "b" stays on their knees; either "a" turns around or "b" circles
// to the front, ending with "b's" face at "a's" crotch. The mirror of kneeling's move-to-kneeling-service.
kneeling.add(`You turn around to face {B:name}, and {B:he} gazes up at you warmly, {B:his} hands settling on your thighs.`,
  [playerA, isLoving]);
kneeling.add(`{B:name} shuffles around to your front on {B:his} knees, pressing a soft kiss to your hip as {B:he} settles before you.`,
  [playerA, isLoving]);
kneeling.add(`{B:name} circles around in front of you, {B:his} {B:breasts.softBreasts} swaying as {B:he} settles back on {B:his} heels and smiles up at you.`,
  [playerA, isLoving, bVisibleBreasts]);
kneeling.add(`You turn around, your {A:cock.thickCock} coming level with {B:name's} face, and {B:he} looks up at you with warm eyes.`,
  [playerA, isLoving, aVisibleCock]);
kneeling.add(`{B:name} scrambles around to your front on {B:his} knees, {B:his} hungry face coming level with your crotch.`,
  [playerA, isLustful]);
kneeling.add(`You turn around, and {B:name} moans in anticipation, {B:his} hands sliding greedily up the fronts of your thighs.`,
  [playerA, isLustful]);
kneeling.add(`You turn to face {B:name}, your {A:cock.bigHardCock} swinging around to {B:his} eagerly waiting mouth.`,
  [playerA, isLustful, aHardCock]);
kneeling.add(`{B:name} shuffles around eagerly, licking {B:his} lips as {B:his} face comes level with your {pussy}.`,
  [playerA, isLustful, aVisiblePussy]);
kneeling.add(`You turn around in front of {B:name}, and {B:he} settles back on {B:his} heels, {B:his} face level with your crotch.`,
  [playerA, isAccepting]);
kneeling.add(`{B:name} shuffles around to your front on {B:his} knees without complaint.`,
  [playerA, isAccepting]);
kneeling.add(`{B:name} waits quietly as you turn to face {B:him}, {B:his} hands resting on {B:his} thighs.`,
  [playerA, isAccepting]);
kneeling.add(`You turn around, your {A:cock.thickCock} hanging before {B:name's} face as {B:he} waits without protest.`,
  [playerA, isAccepting, aVisibleCock]);
kneeling.add(`You turn around to face {B:name}, and {B:his} eyes flick nervously up to yours before dropping to the floor.`,
  [playerA, isFearful]);
kneeling.add(`{B:name} shuffles around to your front hesitantly, {B:his} hands trembling on {B:his} thighs.`,
  [playerA, isFearful]);
kneeling.add(`With a shaky breath, {B:name} settles in front of you, {B:his} whole body tense.`,
  [playerA, isFearful]);
kneeling.add(`You turn around, your {A:cock.thickCock} hanging inches from {B:name's} nervous face.`,
  [playerA, isFearful, aVisibleCock]);
kneeling.add(`You turn around, and {B:name} glares up at you from under {B:his} brows, staying on {B:his} knees with poor grace.`,
  [playerA, isResistant]);
kneeling.add(`{B:name} shuffles around to your front grudgingly, muttering under {B:his} breath.`,
  [playerA, isResistant]);
kneeling.add(`With a huff, {B:name} settles in front of you, {B:his} arms crossed over {B:his} chest.`,
  [playerA, isResistant]);
kneeling.add(`You turn to face {B:name}, and {B:he} leans back from your {A:cock.thickCock}, {B:his} face turned aside.`,
  [playerA, isResistant, aVisibleCock]);
kneeling.add(`You turn around, your grip in {B:name's} hair dragging {B:his} snarling face into place before your crotch.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} tries to twist away as you turn, but your hand in {B:his} hair holds {B:his} face level with your crotch.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} claws at your legs as you haul {B:him} around to your front, holding {B:him} kneeling before you.`,
  [playerA, isViolent]);
kneeling.add(`{B:name} thrashes in your grip as you turn, your {A:cock.thickCock} level with {B:his} furious face.`,
  [playerA, isViolent, aVisibleCock]);
kneeling.add(`{A:name} turns around to face you with a warm smile, brushing a fond hand through your hair as you settle before {A:him}.`,
  [playerB, isLoving]);
kneeling.add(`You shuffle around to {A:name's} front on your knees, and {A:he} gazes down at you affectionately.`,
  [playerB, isLoving]);
kneeling.add(`{A:name's} {A:cock.thickCock} swings around level with your face as {A:he} turns, {A:his} eyes soft on yours.`,
  [playerB, isLoving, aVisibleCock]);
kneeling.add(`{A:name} turns to face you, your face coming level with {A:his} {pussy} as {A:he} smiles down at you.`,
  [playerB, isLoving, aVisiblePussy]);
kneeling.add(`{A:name} spins around eagerly, {A:his} hand cradling the back of your head as your face comes level with {A:his} crotch.`,
  [playerB, isLustful]);
kneeling.add(`{A:name} turns with a needy sound, {A:his} hips pressing forward toward your face.`,
  [playerB, isLustful]);
kneeling.add(`{A:name's} {A:cock.bigHardCock} swings around to your face as {A:he} turns, twitching in anticipation.`,
  [playerB, isLustful, aHardCock]);
kneeling.add(`{A:name} turns and steps in close, {A:his} soaked {pussy} right before your mouth.`,
  [playerB, isLustful, aVisiblePussy]);
kneeling.add(`{A:name} turns around without comment, standing still as your face comes level with {A:his} crotch.`,
  [playerB, isAccepting]);
kneeling.add(`You shuffle around to {A:name's} front on your knees, and {A:he} holds {A:his} stance for you.`,
  [playerB, isAccepting]);
kneeling.add(`{A:name} turns and waits, {A:his} hands loose at {A:his} sides.`,
  [playerB, isAccepting]);
kneeling.add(`{A:name's} {A:cock.thickCock} hangs before your face as {A:he} turns around for you.`,
  [playerB, isAccepting, aVisibleCock]);
kneeling.add(`{A:name} turns around slowly, {A:his} breath quickening as your face comes level with {A:his} crotch.`,
  [playerB, isFearful]);
kneeling.add(`{A:name} shivers as you shuffle around to {A:his} front, {A:his} hands twitching at {A:his} sides.`,
  [playerB, isFearful]);
kneeling.add(`With a shaky breath, {A:name} turns to face you, holding very still.`,
  [playerB, isFearful]);
kneeling.add(`{A:name's} {A:cock.sixInch} long {cock} trembles before your face as {A:he} nervously turns around.`,
  [playerB, isFearful, aVisibleCock]);
kneeling.add(`{A:name} grumbles as you pull {A:his} hips around, turning {A:him} to face you.`,
  [playerB, isResistant]);
kneeling.add(`With a huff, {A:name} turns around, {A:his} jaw set as your face comes level with {A:his} crotch.`,
  [playerB, isResistant]);
kneeling.add(`{A:name} mutters something sour as you shuffle around to {A:his} front, {A:his} body rigid.`,
  [playerB, isResistant]);
kneeling.add(`{A:name's} {A:cock.thickCock} sways as {A:he} reluctantly turns, {A:his} face pointed anywhere but down at you.`,
  [playerB, isResistant, aVisibleCock]);
kneeling.add(`{A:name} tries to step away as you circle around, but your grip on {A:his} hips holds {A:him} in front of you.`,
  [playerB, isViolent]);
kneeling.add(`{A:name} shoves at your head as you turn {A:him} around, but your arms wrap around {A:his} thighs, pinning {A:him} in place.`,
  [playerB, isViolent]);
kneeling.add(`{A:name} snarls down at you, unable to twist free as you hold {A:him} standing before your face.`,
  [playerB, isViolent]);
kneeling.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles, held fast in front of your face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into standing-reversed, "a" is the one standing behind (was the kneeler, now risen to their feet),
// while "b" (was the stander) stays put facing away.
standingReversed.add(`You rise to your feet behind {B:name}, and {B:he} leans back into you with a contented sigh, {B:his} head resting against your shoulder.`,
  [playerA, isLoving]);
standingReversed.add(`{B:name} reaches back to steady you as you rise, pulling your arms around {B:his} waist once you're standing.`,
  [playerA, isLoving]);
standingReversed.add(`{B:name} hums happily as you climb to your feet behind {B:him}, pressing your body against {B:his} back.`,
  [playerA, isLoving]);
standingReversed.add(`You rise up behind {B:name}, your {A:cock.thickCock} coming to rest between {B:his} cheeks as {B:he} leans warmly back against you.`,
  [playerA, isLoving, aVisibleCock]);
standingReversed.add(`You rise up behind {B:name}, and {B:he} grinds {B:his} ass back against your crotch with a needy moan.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} pushes back against you the moment you're on your feet, dragging your hands around to {B:his} front.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} arches {B:his} back eagerly as you rise, molding {B:his} body back against yours.`,
  [playerA, isLustful]);
standingReversed.add(`{B:name} moans as your {A:cock.bigHardCock} slides up between {B:his} cheeks, grinding back against it as you stand.`,
  [playerA, isLustful, aHardCock]);
standingReversed.add(`You rise to your feet behind {B:name}, and {B:he} holds still as your body presses against {B:his} back.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} waits quietly as you climb to your feet, settling your hands on {B:his} hips.`,
  [playerA, isAccepting]);
standingReversed.add(`{B:name} stands without complaint as you rise up behind {B:him}, your crotch pressing against {B:his} ass.`,
  [playerA, isAccepting]);
standingReversed.add(`Your {A:cock.thickCock} settles between {B:name's} cheeks as you rise, and {B:he} makes no protest.`,
  [playerA, isAccepting, aVisibleCock]);
standingReversed.add(`{B:name} tenses as {B:he} feels you rise behind {B:him}, {B:his} breath going quick and shallow.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name} holds very still as you climb to your feet at {B:his} back, {B:his} shoulders drawn in tight.`,
  [playerA, isFearful]);
standingReversed.add(`With a shaky breath, {B:name} stays put as your body presses up against {B:his} back.`,
  [playerA, isFearful]);
standingReversed.add(`{B:name} shivers nervously as your {A:cock.thickCock} comes to rest between {B:his} cheeks.`,
  [playerA, isFearful, aVisibleCock]);
standingReversed.add(`{B:name} stiffens as you rise behind {B:him}, grumbling as your body presses against {B:his} back.`,
  [playerA, isResistant]);
standingReversed.add(`With a huff, {B:name} holds {B:his} ground as you stand, {B:his} arms crossed as you settle against {B:him}.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} mutters something under {B:his} breath as you rise, leaning pointedly away until you pull {B:him} back against you.`,
  [playerA, isResistant]);
standingReversed.add(`{B:name} shifts unhappily as your {A:cock.thickCock} presses between {B:his} cheeks, but {B:he} stays put.`,
  [playerA, isResistant, aVisibleCock]);
standingReversed.add(`{B:name} tries to bolt the moment your grip loosens, but you rise fast and lock your arms around {B:his} waist from behind.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} twists and struggles as you stand, but you pin {B:his} back against your chest, holding {B:him} fast.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} claws at your forearms as you rise behind {B:him}, your grip around {B:his} middle unyielding.`,
  [playerA, isViolent]);
standingReversed.add(`{B:name} thrashes in your arms as you rise, your {A:cock.thickCock} pressed hard between {B:his} cheeks.`,
  [playerA, isViolent, aVisibleCock]);
standingReversed.add(`{A:name} rises to {A:his} feet behind you, wrapping {A:his} arms warmly around your waist and pressing a kiss to your shoulder.`,
  [playerB, isLoving]);
standingReversed.add(`You feel {A:name} climb to {A:his} feet at your back, {A:his} body settling gently against yours.`,
  [playerB, isLoving]);
standingReversed.add(`{A:name's} {A:cock.thickCock} comes to rest between your cheeks as {A:he} rises behind you, {A:his} arms circling you fondly.`,
  [playerB, isLoving, aVisibleCock]);
standingReversed.add(`{A:name's} {A:breasts.softBreasts} press warmly into your back as {A:he} rises and draws you close.`,
  [playerB, isLoving, aVisibleBreasts]);
standingReversed.add(`{A:name} surges to {A:his} feet behind you, grinding against your ass with a hungry moan.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name} rises and pulls your hips back against {A:him}, {A:his} breath hot on the back of your neck.`,
  [playerB, isLustful]);
standingReversed.add(`{A:name's} {A:cock.bigHardCock} slides up between your cheeks as {A:he} rises eagerly behind you.`,
  [playerB, isLustful, aHardCock]);
standingReversed.add(`{A:name's} {A:breasts.softBreasts} drag up your back as {A:he} rises, {A:his} hands roaming around to your front.`,
  [playerB, isLustful, aVisibleBreasts]);
standingReversed.add(`{A:name} rises to {A:his} feet behind you without comment, {A:his} body settling against your back.`,
  [playerB, isAccepting]);
standingReversed.add(`You feel {A:name} stand up at your back, {A:his} hands coming to rest on your hips.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name} climbs to {A:his} feet and steps in close behind you without protest.`,
  [playerB, isAccepting]);
standingReversed.add(`{A:name's} {A:cock.thickCock} settles between your cheeks as {A:he} rises quietly behind you.`,
  [playerB, isAccepting, aVisibleCock]);
standingReversed.add(`{A:name} rises hesitantly behind you, {A:his} body barely brushing yours as {A:he} stands.`,
  [playerB, isFearful]);
standingReversed.add(`You feel {A:name} climb nervously to {A:his} feet, {A:his} trembling hands settling light on your hips.`,
  [playerB, isFearful]);
standingReversed.add(`With a shaky breath, {A:name} stands at your back, holding {A:him}self carefully still.`,
  [playerB, isFearful]);
standingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} nervously rises behind you.`,
  [playerB, isFearful, aVisibleCock]);
standingReversed.add(`{A:name} rises grudgingly behind you, keeping a sliver of space until you pull {A:his} hips against your ass.`,
  [playerB, isResistant]);
standingReversed.add(`With a huff, {A:name} stands, {A:his} arms staying stiff at {A:his} sides as you press back against {A:him}.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name} mutters behind your ear as you drag {A:his} arms around your waist.`,
  [playerB, isResistant]);
standingReversed.add(`{A:name} grumbles as you pull {A:him} close, {A:his} {A:cock.thickCock} pressing between your cheeks.`,
  [playerB, isResistant, aVisibleCock]);
standingReversed.add(`{A:name} rises and tries to shove you away, but you catch {A:his} arms and wrap them around your waist, holding {A:him} at your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} snarls behind you as {A:he} stands, but your grip keeps {A:his} body pinned against your back.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name} tries to twist free as {A:he} rises, but you reach back and hold {A:his} hips firmly against your ass.`,
  [playerB, isViolent]);
standingReversed.add(`{A:name's} {A:cock.thickCock} is pinned between your cheeks as {A:he} struggles, unable to pull away from your grip.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into lap-sitting-reversed, "a" is the seated one (was the kneeler, now sitting back), while "b" (was the
// stander) is drawn straight down into their lap, still facing away with their back to "a's" chest.
lapSittingReversed.add(`You settle back and draw {B:name} down into your lap, and {B:he} sinks into you with a contented sigh, {B:his} back warm against your chest.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} eases down into your lap as you sit back, {B:his} head tipping back onto your shoulder with a soft sigh.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} sinks down into your lap with a warm hum, wriggling back until {B:he} is settled snug against your chest.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} settles into your lap facing away, {B:his} {B:cock.thickCock} resting between {B:his} thighs as {B:he} leans back into you.`,
  [playerA, isLoving, bVisibleCock]);
lapSittingReversed.add(`{B:name} drops into your lap the moment you sit back, grinding {B:his} ass down against you with a needy moan.`,
  [playerA, isLustful]);
lapSittingReversed.add(`You pull {B:name} down into your lap, and {B:he} spreads {B:his} thighs over yours, rolling {B:his} hips back against you.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name's} {B:cock.bigHardCock} stands up from {B:his} lap as {B:he} grinds down against you, {B:his} head falling back onto your shoulder.`,
  [playerA, isLustful, bHardCock]);
lapSittingReversed.add(`{B:name} moans as {B:he} sinks down onto your lap, your {A:cock.bigHardCock} pressed up between {B:his} cheeks.`,
  [playerA, isLustful, aHardCock]);
lapSittingReversed.add(`You sit back and guide {B:name} down into your lap, and {B:he} settles against your chest without complaint.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} lowers {B:him}self into your lap without protest, letting you take {B:his} weight.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} sits back into your lap quietly, {B:his} hands resting on your knees.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} settles into your lap without a word, {B:his} {B:cock.thickCock} lying between {B:his} thighs.`,
  [playerA, isAccepting, bVisibleCock]);
lapSittingReversed.add(`{B:name} lets you draw {B:him} down into your lap, {B:his} back held rigid against your chest.`,
  [playerA, isFearful]);
lapSittingReversed.add(`With a shaky breath, {B:name} sinks nervously into your lap, perched on the edge of your thighs until you pull {B:him} closer.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name} lowers {B:him}self into your lap with obvious nerves, {B:his} breath catching as your arms wrap around {B:him}.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} nervously settles back against you.`,
  [playerA, isFearful, bVisibleCock]);
lapSittingReversed.add(`{B:name} grumbles as you pull {B:him} down into your lap, sitting stiff and upright rather than leaning back into you.`,
  [playerA, isResistant]);
lapSittingReversed.add(`With a huff, {B:name} lets {B:him}self be drawn down, {B:his} arms crossed as {B:he} settles into your lap.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} sits back into your lap with poor grace, holding {B:him}self away from your chest.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} settles grudgingly into your lap, {B:his} {B:cock.thickCock} hanging between {B:his} thighs as {B:he} glares at nothing.`,
  [playerA, isResistant, bVisibleCock]);
lapSittingReversed.add(`{B:name} thrashes as you drag {B:him} down into your lap, your arms locking around {B:his} middle from behind.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} fights the pull, but you haul {B:him} down onto your lap, pinning {B:his} back against your chest.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} claws at your forearms, held fast in your lap as {B:he} struggles uselessly.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name's} {B:cock.thickCock} swings between {B:his} thighs as {B:he} twists in your grip, wrestled down into your lap.`,
  [playerA, isViolent, bVisibleCock]);
lapSittingReversed.add(`{A:name} settles back behind you and draws you gently down into {A:his} lap, {A:his} arms folding warmly around your waist.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name} guides you down by the hips, pressing a soft kiss to your shoulder as you settle back against {A:his} chest.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} presses up against your ass as {A:he} eases you down into {A:his} lap, {A:his} chin coming to rest on your shoulder.`,
  [playerB, isLoving, aVisibleCock]);
lapSittingReversed.add(`{A:name's} {A:breasts.softBreasts} cushion your back as {A:he} draws you down into {A:his} lap.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSittingReversed.add(`{A:name} yanks you down into {A:his} lap with a hungry groan, grinding up against your ass as you land.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} pulls you back and down, {A:his} mouth finding the side of your neck as you settle into {A:his} lap.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} moans against your ear as you sink into {A:his} lap, {A:his} hands roaming around to your front.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks as {A:he} drags you down into {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
lapSittingReversed.add(`{A:name} settles back and lets you lower yourself into {A:his} lap, steadying you without comment.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`You sit back into {A:name's} lap, and {A:he} takes your weight without protest.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} rests {A:his} hands loosely on your hips as you settle back against {A:his} chest.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} rests against your ass as you sink down into {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
lapSittingReversed.add(`{A:name} settles back hesitantly, {A:his} hands hovering at your sides as you lower yourself into {A:his} lap.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name} holds {A:him}self very still beneath you, {A:his} breath quick and shallow as you settle into {A:his} lap.`,
  [playerB, isFearful]);
lapSittingReversed.add(`With a shaky breath, {A:name} sits back, tense beneath you as you lower yourself down.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles beneath your ass as {A:he} nervously takes your weight.`,
  [playerB, isFearful, aVisibleCock]);
lapSittingReversed.add(`{A:name} grumbles as you pull {A:him} down to sitting and settle back into {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`With a huff, {A:name} sits, making no move to steady you as you lower yourself into {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name} mutters something sour behind your ear, {A:his} whole frame stiff as you settle back against {A:him}.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} shifts beneath you as {A:he} grudgingly lets you settle into {A:his} lap.`,
  [playerB, isResistant, aVisibleCock]);
lapSittingReversed.add(`{A:name} tries to squirm out from under you as you sit back, but your weight lands squarely in {A:his} lap, pinning {A:him}.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} shoves at your back as you settle down, but you lean back hard, trapping {A:him} beneath you.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} curses and twists beneath you, but you settle your full weight down into {A:his} lap regardless.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} is pinned beneath your ass as {A:he} fights to get free, held down by your weight.`,
  [playerB, isViolent, aVisibleCock]);
