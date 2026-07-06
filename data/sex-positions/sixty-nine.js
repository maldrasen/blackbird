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

const rearrange = WeaverPackage('sixty-nine.rearrange');
const faceSittingReversed = WeaverPackage('sixty-nine.move-to-face-sitting-reversed');
const missionary = WeaverPackage('sixty-nine.move-to-missionary');
const prone = WeaverPackage('sixty-nine.move-to-prone');

// First lying on top of second, with faces aligned to crotches.
SexPosition.register('sixty-nine',{
  name: 'Sixty Nine',

  // Anilingus is possible from a sixty nine position, though the receiver's
  // legs have to be really pulled up.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  moves:[
    { code:'face-sitting-reversed', package:faceSittingReversed },
    { code:'missionary', package:missionary },
    { code:'prone', package:prone, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} lies back with a warm smile, guiding your knees to either side of {B:his} head as you stretch out along {B:him}, mouth to crotch.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles onto {B:his} back and pulls you gently over {B:him}, pressing a kiss to your inner thigh as your face lowers between {B:his} legs.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies back contentedly, {B:his} {B:cock.thickCock} waiting below your descending face as you settle over {B:him}.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} parts {B:his} thighs for you as you stretch out on top of {B:him}, {B:his} {pussy} just beneath your lips.`,
  [playerA, isLoving, bVisiblePussy]);
rearrange.add(`{B:name} drops onto {B:his} back and drags you on top of {B:him}, moaning as your hips settle over {B:his} face.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} pulls you eagerly over {B:him}, {B:his} mouth finding your thigh before you've even finished settling.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} moans into your thigh as you stretch out along {B:him}, the two of you tangling mouth to crotch.`,
  [playerA, isLustful]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} strains up toward your descending mouth as {B:he} pulls your hips down over {B:his} face.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} lies back without complaint as you climb over {B:him}, the two of you settling mouth to crotch.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} back and holds still as you swing a leg over {B:his} head and stretch out along {B:him}.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} waits quietly beneath you as you lower yourself along {B:his} body, your face settling between {B:his} thighs.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies flat without protest, {B:his} {B:cock.thickCock} resting beneath your chin as you settle over {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} lies back nervously, {B:his} breath quick against your thigh as you stretch out on top of {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles beneath you, {B:his} whole body tense as your hips lower over {B:his} face.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} trembles beneath you as you settle into place, {B:his} thighs twitching nervously apart for your face.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath your descending face as {B:he} nervously lies back.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} onto {B:his} back and climb over {B:him}, {B:his} complaints muffled beneath your hips.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies back, enduring it as you stretch out along {B:him}, mouth to crotch.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} keeps {B:his} thighs stubbornly together as you settle over {B:him}, parting them only when you push.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts unhappily beneath you, {B:his} {B:cock.thickCock} lying against {B:his} stomach beneath your face.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you pin {B:him} flat and stretch out on top of {B:him}, your weight holding {B:his} hips down.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles beneath you, but you clamp {B:his} head between your thighs and pin {B:his} kicking legs beneath your arms.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls into your thigh as you bear {B:him} down, {B:his} whole body straining uselessly under yours.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} is trapped beneath your descending face as {B:he} bucks and fights your weight.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`{A:name} swings a leg over your head with a warm smile, stretching out along you until {A:his} mouth rests just above your crotch.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} settles over you with gentle care, {A:his} thighs framing your face as {A:his} lips brush your inner thigh.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} hangs above your face as {A:he} stretches out along you, {A:his} breath warm between your thighs.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} press softly against your stomach as {A:he} settles over you, mouth to crotch.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} pushes you flat and climbs over you reversed, {A:his} ass dropping over your face as {A:his} mouth dives between your thighs.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} settles over you with a hungry moan, grinding down against your mouth while {A:his} breath lands hot on your crotch.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} soaked {pussy} lowers onto your mouth as {A:he} stretches out hungrily along your body.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} drags across your chin as {A:he} settles over you, {A:his} mouth eager between your thighs.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name} climbs over you without comment, stretching out until the two of you are aligned mouth to crotch.`,
  [playerB, isAccepting]);
rearrange.add(`You lie back, and {A:name} swings a leg over your head, settling {A:his} weight along your body.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} lowers {A:him}self over you without protest, {A:his} face coming to rest above your crotch.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} settles against your chin as {A:he} stretches out quietly along you.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} climbs over you hesitantly, {A:his} thighs trembling around your face as {A:he} stretches out along your body.`,
  [playerB, isFearful]);
rearrange.add(`{A:name} lowers {A:him}self nervously over you, {A:his} breath unsteady against your thigh.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} settles along your body, {A:his} face hovering uncertainly over your crotch.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles above your face as {A:he} nervously stretches out over you.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you pull {A:him} over you, lowering {A:him}self along your body with obvious reluctance.`,
  [playerB, isResistant]);
rearrange.add(`With a muffled huff, {A:name} settles over you, {A:his} movements stiff as {A:his} hips lower over your face.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters something sour as {A:he} stretches out along you, {A:his} face stopping short of your crotch until you pull {A:him} flat against you.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} shifts against your chin as {A:he} grudgingly settles along your body.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} fights your grip as you drag {A:him} over you, but you force {A:him} down flat along your body.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} thrashes atop you, {A:his} snarls muffled between your thighs as your arms lock over {A:his} back.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} claws at your sides, but you haul {A:his} hips down onto your face and pin {A:him} stretched along you.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} grinds against your chin as {A:he} struggles, held flat along your body.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into face-sitting-reversed: "a" pushes up from lying stretched along "b" to sitting upright on
// their face, still facing "b's" feet.
faceSittingReversed.add(`You push yourself upright, and {B:name} hums warmly beneath you, {B:his} hands steadying your hips as your weight settles over {B:his} face.`,
  [playerA, isLoving]);
faceSittingReversed.add(`{B:name} strokes your thighs affectionately as you sit up, {B:his} mouth never quite leaving you.`,
  [playerA, isLoving]);
faceSittingReversed.add(`{B:name} gives your ass a fond squeeze as you rise upright, settling your weight back over {B:his} face.`,
  [playerA, isLoving]);
faceSittingReversed.add(`{B:name's} {B:cock.thickCock} rests against {B:his} stomach in front of you as you sit up, {B:his} hands warm on your thighs.`,
  [playerA, isLoving, bVisibleCock]);
faceSittingReversed.add(`{B:name} whines at the loss of your mouth as you sit up, dragging your hips down harder against {B:his} face in answer.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name} moans beneath you as you push upright, {B:his} hands kneading your ass as your weight settles fully onto {B:his} mouth.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name} grips your thighs greedily as you straighten up, grinding {B:his} mouth up into you.`,
  [playerA, isLustful]);
faceSittingReversed.add(`{B:name's} {B:cock.bigHardCock} twitches against {B:his} stomach as you sit up, {B:his} moan buzzing against your skin.`,
  [playerA, isLustful, bHardCock]);
faceSittingReversed.add(`You push yourself upright over {B:name}, and {B:he} adjusts beneath you without complaint.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} holds still as you sit up, your weight settling squarely over {B:his} face.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} makes no protest as you rise off {B:his} body, sitting upright on {B:his} face, still turned toward {B:his} feet.`,
  [playerA, isAccepting]);
faceSittingReversed.add(`{B:name} lies quietly as you sit up, {B:his} {B:cock.thickCock} left resting against {B:his} stomach in front of you.`,
  [playerA, isAccepting, bVisibleCock]);
faceSittingReversed.add(`{B:name} tenses as you push upright, {B:his} breath catching as your full weight settles onto {B:his} face.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name's} hands hover uncertainly at your hips as you sit up over {B:him}.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name} goes very still beneath you as you rise upright, {B:his} nervous breaths quick against your skin.`,
  [playerA, isFearful]);
faceSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles in front of you as you sit upright on {B:his} face.`,
  [playerA, isFearful, bVisibleCock]);
faceSittingReversed.add(`{B:name} grumbles into your skin as you sit up, your full weight muffling the complaint.`,
  [playerA, isResistant]);
faceSittingReversed.add(`{B:name} shifts unhappily beneath you as you push upright, {B:his} hands lying pointedly flat at {B:his} sides.`,
  [playerA, isResistant]);
faceSittingReversed.add(`You feel {B:name} huff against you as you straighten up, {B:his} displeasure lost beneath your weight.`,
  [playerA, isResistant]);
faceSittingReversed.add(`{B:name} squirms in irritation beneath you, {B:his} {B:cock.thickCock} lying untouched against {B:his} stomach.`,
  [playerA, isResistant, bVisibleCock]);
faceSittingReversed.add(`{B:name} bucks hard as your chest lifts away, but your weight drops back onto {B:his} face, pinning {B:him} flat.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name} takes the shift as a chance to struggle, but you sit up and bear down, {B:his} thrashing going nowhere.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name} claws at your thighs as you rise upright, your knees pinning {B:his} arms back down.`,
  [playerA, isViolent]);
faceSittingReversed.add(`{B:name's} {B:cock.thickCock} slaps against {B:his} stomach as {B:he} bucks beneath you, your weight settling back over {B:his} face.`,
  [playerA, isViolent, bVisibleCock]);
faceSittingReversed.add(`{A:name} pushes {A:him}self upright with a contented hum, {A:his} weight settling gently over your face.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:name} gives your thigh a last fond stroke as {A:he} sits up, straightening over your face.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:name} pats your hip affectionately as {A:he} straightens up, {A:his} weight settling softly over your face.`,
  [playerB, isLoving]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} lifts away from your chin as {A:he} sits upright, {A:his} ass settling warmly onto your mouth.`,
  [playerB, isLoving, aVisibleCock]);
faceSittingReversed.add(`{A:name} sits up with a needy moan, grinding {A:his} ass down onto your mouth as {A:his} own lips leave your skin.`,
  [playerB, isLustful]);
faceSittingReversed.add(`{A:name} pushes upright and drops {A:his} weight eagerly onto your face, {A:his} thighs tightening around your head.`,
  [playerB, isLustful]);
faceSittingReversed.add(`{A:name's} soaked {pussy} presses down harder as {A:he} sits up, grinding against your mouth with a groan.`,
  [playerB, isLustful, aVisiblePussy]);
faceSittingReversed.add(`{A:name's} {A:cock.bigHardCock} bobs upright with {A:him} as {A:he} sits up, {A:his} hips rocking down against your face.`,
  [playerB, isLustful, aHardCock]);
faceSittingReversed.add(`{A:name} pushes {A:him}self upright without comment, {A:his} weight settling evenly over your face.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name} sits up off your body, straightening over your mouth without protest.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name} rises quietly, {A:his} hands coming to rest on your stomach as {A:he} settles upright.`,
  [playerB, isAccepting]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} rises away from your chin as {A:he} straightens up over your face.`,
  [playerB, isAccepting, aVisibleCock]);
faceSittingReversed.add(`{A:name} sits up hesitantly, {A:his} thighs trembling around your head as {A:his} weight settles.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name} pushes upright with a shaky breath, holding {A:him}self stiff above your mouth.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name} straightens up nervously, barely letting {A:his} weight rest on your face.`,
  [playerB, isFearful]);
faceSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} nervously sits upright over your face.`,
  [playerB, isFearful, aVisibleCock]);
faceSittingReversed.add(`{A:name} grumbles as you press {A:him} upright, {A:his} weight settling onto your mouth with poor grace.`,
  [playerB, isResistant]);
faceSittingReversed.add(`With a huff, {A:name} sits up, {A:his} arms crossing as {A:he} settles over your face.`,
  [playerB, isResistant]);
faceSittingReversed.add(`{A:name} mutters something sour as {A:he} straightens up, {A:his} reluctance plain in the set of {A:his} back.`,
  [playerB, isResistant]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} sways as {A:he} grudgingly sits upright, {A:his} ass settling onto your mouth.`,
  [playerB, isResistant, aVisibleCock]);
faceSittingReversed.add(`{A:name} tries to pitch forward off you as {A:he} rises, but your grip on {A:his} hips hauls {A:his} ass back down onto your mouth.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name} thrashes upright, but your hands keep {A:his} hips pinned down against your face.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name} claws at your arms as {A:he} sits up, unable to break the grip holding {A:him} down on your mouth.`,
  [playerB, isViolent]);
faceSittingReversed.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles upright, held seated on your face.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into missionary: "a" lifts up and turns end over end above "b", settling back down face to face
// between "b's" parted legs. "b" stays on their back throughout.
missionary.add(`You lift up and turn yourself around above {B:name}, and {B:he} welcomes you back down with a warm smile, finally face to face.`,
  [playerA, isLoving]);
missionary.add(`{B:name} steadies you through the turn, {B:his} legs parting to cradle your hips as you settle down facing {B:him}.`,
  [playerA, isLoving]);
missionary.add(`{B:name's} {B:breasts.softBreasts} press up against your chest as you turn around and lower yourself, {B:his} eyes warm on yours.`,
  [playerA, isLoving, bVisibleBreasts]);
missionary.add(`{B:name} smiles up at you as you turn around and settle between {B:his} legs, {B:his} {B:cock.thickCock} caught warmly between your stomachs.`,
  [playerA, isLoving, bVisibleCock]);
missionary.add(`{B:name} moans as you swing yourself around, pulling you down flush against {B:him} the moment you face {B:him}.`,
  [playerA, isLustful]);
missionary.add(`{B:name} spreads {B:his} legs eagerly as you turn around above {B:him}, grinding up against you as you settle between them.`,
  [playerA, isLustful]);
missionary.add(`{B:name} tilts {B:his} soaked {pussy} up against you as you come around to face {B:him}, settling between {B:his} spread thighs.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`{B:name's} {B:cock.bigHardCock} presses up between your stomachs as you turn around and lower yourself onto {B:him}.`,
  [playerA, isLustful, bHardCock]);
missionary.add(`You lift up and turn around above {B:name}, and {B:he} parts {B:his} legs without complaint as you settle between them.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} holds still through the turn, accepting your weight as you lower yourself down facing {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} shifts beneath you to make room, {B:his} legs parting as you come around to face {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lies quietly as you turn around, {B:his} {B:cock.thickCock} resting between your bodies as you settle.`,
  [playerA, isAccepting, bVisibleCock]);
missionary.add(`{B:name} tenses as you turn around above {B:him}, {B:his} wide eyes meeting yours as you settle down face to face.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} parts {B:his} legs nervously as you come around and lower yourself between them.`,
  [playerA, isFearful]);
missionary.add(`{B:name} holds very still through your turn, {B:his} breath quickening once your faces are suddenly close.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously takes your weight.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles beneath you as you turn around, {B:his} face turning aside as yours comes down close to it.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} lets {B:his} legs be parted, lying stiff as you settle between them facing {B:him}.`,
  [playerA, isResistant]);
missionary.add(`{B:name} mutters something sour as you swing around above {B:him}, {B:his} jaw set as your weight settles.`,
  [playerA, isResistant]);
missionary.add(`{B:name} shifts unhappily as you settle between {B:his} legs, {B:his} {B:cock.thickCock} caught between your stomachs.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} takes the turn as {B:his} chance to buck free, but you come down hard, pinning {B:him} flat beneath you.`,
  [playerA, isViolent]);
missionary.add(`{B:name} thrashes as you swing around, but you catch {B:his} wrists and settle between {B:his} kicking legs.`,
  [playerA, isViolent]);
missionary.add(`{B:name} snarls up into your face as you come around, {B:his} struggles trapped beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} fights, pinned beneath you face to face.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`{A:name} lifts up and turns around above you, settling back down with a warm smile, finally face to face.`,
  [playerB, isLoving]);
missionary.add(`{A:name} comes around to face you, brushing your hair back as {A:he} settles between your legs.`,
  [playerB, isLoving]);
missionary.add(`{A:name's} {A:breasts.softBreasts} settle against your chest as {A:he} turns around and lowers {A:him}self, {A:his} eyes soft on yours.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name's} {A:cock.thickCock} comes to rest against your thigh as {A:he} turns around and settles warmly between your legs.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name} swings {A:him}self around with hungry impatience, {A:his} mouth crashing down on yours as {A:he} settles between your legs.`,
  [playerB, isLustful]);
missionary.add(`{A:name} turns around above you and grinds down eagerly, {A:his} breath hot against your face.`,
  [playerB, isLustful]);
missionary.add(`{A:name} settles over you with a needy moan, {A:his} soaked {pussy} grinding down against you now that you're face to face.`,
  [playerB, isLustful, aVisiblePussy]);
missionary.add(`{A:name's} {A:cock.bigHardCock} presses down between your bodies as {A:he} comes around to face you.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`{A:name} lifts up and turns around without comment, settling between your legs to face you.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} comes around and lowers {A:him}self onto you, letting you part your legs around {A:him}.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} settles down facing you without protest, {A:his} weight coming to rest between your thighs.`,
  [playerB, isAccepting]);
missionary.add(`{A:name's} {A:cock.thickCock} settles against your thigh as {A:he} turns around and lies down over you.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} turns around above you hesitantly, {A:his} eyes sliding away from yours as {A:he} settles down.`,
  [playerB, isFearful]);
missionary.add(`{A:name} lowers {A:him}self nervously between your legs, {A:his} arms trembling where they brace beside your head.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} comes around to face you, holding {A:him}self stiffly above you.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your thigh as {A:he} nervously settles over you.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles through the turn as you guide {A:him} around, settling over you with {A:his} face pointedly turned aside.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} swings {A:him}self around, lying stiff on top of you.`,
  [playerB, isResistant]);
missionary.add(`{A:name} mutters something under {A:his} breath as {A:he} settles between your legs, refusing to meet your eyes.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts against your thigh as {A:he} reluctantly lowers {A:him}self over you.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} tries to pull away mid-turn, but you wrap your legs around {A:his} waist and drag {A:him} down on top of you.`,
  [playerB, isViolent]);
missionary.add(`{A:name} thrashes as you haul {A:him} around to face you, {A:his} weight crashing down onto you anyway.`,
  [playerB, isViolent]);
missionary.add(`{A:name} snarls into your face as {A:he} lands, your arms locked around {A:his} back.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} grinds against your thigh as {A:he} struggles, held between your legs by force.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into prone, "a" is the receiver on their back (was the bottom in sixty-nine), while "b" (was on top)
// swings their hips off "a's" face and stretches out face-down between "a's" legs, mouth staying at the crotch.
prone.add(`{B:name} lifts {B:his} hips from your face and swings around, settling onto {B:his} stomach between your legs with a warm glance up at you.`,
  [playerA, isLoving]);
prone.add(`{B:name} slides off you and stretches out between your thighs, {B:his} arms wrapping snugly around your legs.`,
  [playerA, isLoving]);
prone.add(`{B:name} settles prone between your legs, {B:his} {B:breasts.softBreasts} pressing soft against your thighs.`,
  [playerA, isLoving, bVisibleBreasts]);
prone.add(`{B:name} swings around and settles onto {B:his} stomach, {B:his} smiling face coming to rest beside your {A:cock.thickCock}.`,
  [playerA, isLoving, aVisibleCock]);
prone.add(`{B:name} swings {B:his} hips off your face and dives back down between your legs, {B:his} mouth barely leaving you in the move.`,
  [playerA, isLustful]);
prone.add(`{B:name} settles onto {B:his} stomach between your thighs with a hungry moan, {B:his} hands sliding under your ass to pull you closer.`,
  [playerA, isLustful]);
prone.add(`{B:name} stretches out between your legs, {B:his} eager eyes fixed on your {A:cock.bigHardCock} as {B:his} face hovers over it.`,
  [playerA, isLustful, aHardCock]);
prone.add(`{B:name} slides down onto {B:his} stomach, {B:his} hungry mouth returning to your {pussy} almost before {B:he} lands.`,
  [playerA, isLustful, aVisiblePussy]);
prone.add(`{B:name} lifts off your face and swings around without comment, settling onto {B:his} stomach between your legs.`,
  [playerA, isAccepting]);
prone.add(`{B:name} stretches out prone between your thighs, {B:his} face settling in at your crotch.`,
  [playerA, isAccepting]);
prone.add(`{B:name} rearranges {B:him}self quietly, lying down astride your legs with {B:his} head between your thighs.`,
  [playerA, isAccepting]);
prone.add(`{B:name} settles down without protest, {B:his} {B:breasts.softBreasts} coming to rest against your thighs.`,
  [playerA, isAccepting, bVisibleBreasts]);
prone.add(`{B:name} climbs off your face nervously and settles between your legs, {B:his} breath unsteady against your crotch.`,
  [playerA, isFearful]);
prone.add(`With a shaky breath, {B:name} stretches out on {B:his} stomach between your thighs, {B:his} shoulders held tight.`,
  [playerA, isFearful]);
prone.add(`{B:name} settles into place hesitantly, {B:his} nervous eyes flicking up at you from between your legs.`,
  [playerA, isFearful]);
prone.add(`{B:name} lowers {B:him}self between your thighs, {B:his} breath trembling against your {A:cock.thickCock}.`,
  [playerA, isFearful, aVisibleCock]);
prone.add(`{B:name} grumbles as {B:he} swings off your face, settling between your legs with poor grace.`,
  [playerA, isResistant]);
prone.add(`With a huff, {B:name} stretches out on {B:his} stomach, {B:his} face hovering reluctantly at your crotch.`,
  [playerA, isResistant]);
prone.add(`{B:name} drags {B:him}self into place between your thighs, muttering the whole way down.`,
  [playerA, isResistant]);
prone.add(`{B:name} settles grudgingly between your legs, eyeing your {A:cock.thickCock} with a sullen look.`,
  [playerA, isResistant, aVisibleCock]);
prone.add(`{B:name} tries to roll away as {B:he} comes off your face, but your grip in {B:his} hair drags {B:his} head down between your thighs.`,
  [playerA, isViolent]);
prone.add(`{B:name} struggles as you haul {B:him} around, forcing {B:him} flat onto {B:his} stomach between your legs.`,
  [playerA, isViolent]);
prone.add(`{B:name} snarls as you wrestle {B:him} into place, {B:his} furious face pinned at your crotch.`,
  [playerA, isViolent]);
prone.add(`{B:name} glares up past your {A:cock.thickCock} as you force {B:his} head down between your thighs.`,
  [playerA, isViolent, aVisibleCock]);
prone.add(`{A:name} strokes your thigh as you lift away from {A:his} face, smiling as you settle onto your stomach between {A:his} legs.`,
  [playerB, isLoving]);
prone.add(`{A:name} parts {A:his} legs to welcome you as you swing around, {A:his} hand coming to rest warmly in your hair.`,
  [playerB, isLoving]);
prone.add(`{A:name's} {A:cock.thickCock} rests before your face as you stretch out between {A:his} legs, {A:his} eyes soft on you.`,
  [playerB, isLoving, aVisibleCock]);
prone.add(`{A:name} smiles down at you as you settle onto your stomach, {A:his} {pussy} inches from your mouth.`,
  [playerB, isLoving, aVisiblePussy]);
prone.add(`{A:name} moans as you swing around, {A:his} legs spreading wide as you settle onto your stomach between them.`,
  [playerB, isLustful]);
prone.add(`{A:name} pushes your head down eagerly the moment you stretch out between {A:his} thighs.`,
  [playerB, isLustful]);
prone.add(`{A:name's} {A:cock.bigHardCock} twitches in anticipation as your face settles between {A:his} legs.`,
  [playerB, isLustful, aHardCock]);
prone.add(`{A:name} tilts {A:his} soaked {pussy} up toward your descending mouth as you settle in between {A:his} thighs.`,
  [playerB, isLustful, aVisiblePussy]);
prone.add(`{A:name} lies back without comment as you swing off {A:his} face and settle between {A:his} legs.`,
  [playerB, isAccepting]);
prone.add(`{A:name} parts {A:his} legs to make room as you stretch out on your stomach between them.`,
  [playerB, isAccepting]);
prone.add(`{A:name} settles back quietly, {A:his} hands folding on {A:his} stomach as your face comes to rest at {A:his} crotch.`,
  [playerB, isAccepting]);
prone.add(`{A:name's} {A:cock.thickCock} lies before your face as you settle in between {A:his} legs without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
prone.add(`{A:name} watches you nervously as you swing around, {A:his} thighs tense on either side of you as you settle between them.`,
  [playerB, isFearful]);
prone.add(`{A:name's} breath quickens as you stretch out between {A:his} legs, {A:his} hands curling at {A:his} sides.`,
  [playerB, isFearful]);
prone.add(`With a shaky breath, {A:name} lies still, {A:his} legs parting hesitantly for you.`,
  [playerB, isFearful]);
prone.add(`{A:name's} {A:cock.sixInch} long {cock} trembles before your face as {A:he} nervously lets you settle between {A:his} legs.`,
  [playerB, isFearful, aVisibleCock]);
prone.add(`{A:name} grumbles as you settle between {A:his} legs, {A:his} thighs parting only when you push them.`,
  [playerB, isResistant]);
prone.add(`With a huff, {A:name} drops {A:his} head back, enduring it as you stretch out between {A:his} legs.`,
  [playerB, isResistant]);
prone.add(`{A:name} mutters something sour as your face settles at {A:his} crotch, {A:his} body stiff beneath your hands.`,
  [playerB, isResistant]);
prone.add(`{A:name's} {A:cock.thickCock} lies unmoving before your face as {A:he} glowers down the length of {A:his} body at you.`,
  [playerB, isResistant, aVisibleCock]);
prone.add(`{A:name} kicks as you swing around, but you pin {A:his} thighs and settle onto your stomach between them.`,
  [playerB, isViolent]);
prone.add(`{A:name} tries to twist away, but your arms lock over {A:his} legs, holding {A:him} open as you stretch out.`,
  [playerB, isViolent]);
prone.add(`{A:name} snarls and shoves at your head, but you wrap your arms around {A:his} thighs and hold on.`,
  [playerB, isViolent]);
prone.add(`{A:name's} {A:cock.thickCock} jerks as {A:he} bucks, your grip on {A:his} hips keeping your face planted between {A:his} legs.`,
  [playerB, isViolent, aVisibleCock]);
