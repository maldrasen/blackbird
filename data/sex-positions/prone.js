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

const rearrange = WeaverPackage('prone.rearrange');
const missionary = WeaverPackage('prone.move-to-missionary');
const sixtyNine = WeaverPackage('prone.move-to-sixty-nine');

// First is lying down receiving oral. Second has their head between first's
// legs, laying astride their legs.
SexPosition.register('prone',{
  name: 'Prone',

  alignment: {
    first: {
      hands: [HandAlignment.mouth],
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      breasts: [BreastAlignment.cock],
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
    },
  },

  moves:[
    { code:'missionary', package:missionary, swap:true },
    { code:'sixty-nine', package:sixtyNine, swap:true },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`You lie back, and {B:name} stretches out on {B:his} stomach between your legs, folding {B:his} arms over your thighs with a warm smile.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} eases you onto your back and settles in prone between your legs, nuzzling your inner thigh.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies down between your legs, {B:his} {B:breasts.softBreasts} pressing softly against your thighs.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} settles onto {B:his} stomach between your legs, {B:his} smiling face coming to rest level with your {A:cock.thickCock}.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`{B:name} pushes you onto your back and dives down between your legs, stretching out on {B:his} stomach with a hungry moan.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} settles in between your thighs eagerly, {B:his} hands sliding under your ass to tilt your hips up.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} licks {B:his} lips as {B:he} stretches out between your legs, {B:his} face hovering over your {A:cock.bigHardCock}.`,
  [playerA, isLustful, aHardCock]);
rearrange.add(`{B:name} lies down between your thighs with a needy sound, {B:his} breath hot against your {pussy}.`,
  [playerA, isLustful, aVisiblePussy]);
rearrange.add(`You lie back, and {B:name} settles onto {B:his} stomach between your legs without complaint.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} stretches out between your thighs without protest, {B:his} face settling in at your crotch.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies down astride your legs quietly, {B:his} head coming to rest between your thighs.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles in without a word, {B:his} {B:breasts.softBreasts} resting against your thighs.`,
  [playerA, isAccepting, bVisibleBreasts]);
rearrange.add(`{B:name} lowers {B:him}self nervously between your legs, {B:his} breath quick and unsteady against your crotch.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} stretches out on {B:his} stomach between your thighs.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} settles in hesitantly, {B:his} anxious eyes flicking up at you from between your legs.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} eases down between your thighs, {B:his} nervous breath trembling against your {A:cock.thickCock}.`,
  [playerA, isFearful, aVisibleCock]);
rearrange.add(`{B:name} grumbles as you press {B:him} down between your legs, settling onto {B:his} stomach with poor grace.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies down between your thighs, {B:his} face hovering reluctantly at your crotch.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} drags {B:him}self into position, muttering as {B:he} stretches out astride your legs.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} settles down grudgingly, eyeing your {A:cock.thickCock} with open reluctance.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you force {B:him} down between your legs, your grip in {B:his} hair pinning {B:his} face at your crotch.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you wrestle {B:him} flat onto {B:his} stomach between your thighs.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls as you drag {B:his} head down between your legs, {B:his} clawing hands finding no purchase.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} twists in your grip, {B:his} furious face forced down level with your {A:cock.thickCock}.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`{A:name} lies back with a warm smile, parting {A:his} legs as you stretch out on your stomach between them.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} settles onto {A:his} back and guides your head down gently, {A:his} fingers combing through your hair.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests before your face as you settle in between {A:his} legs, {A:his} eyes warm on you.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} parts {A:his} thighs for you as you lie down between them, {A:his} {pussy} inches from your lips.`,
  [playerB, isLoving, aVisiblePussy]);
rearrange.add(`{A:name} drops onto {A:his} back and spreads {A:his} legs wide, moaning as you stretch out between them.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} pulls your head down impatiently as you settle onto your stomach between {A:his} thighs.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} stands eager before your face as you lie down between {A:his} legs.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`{A:name} grinds {A:his} soaked {pussy} up toward your mouth as you settle in between {A:his} thighs.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name} lies back and parts {A:his} legs, letting you stretch out on your stomach between them.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles onto {A:his} back without comment as you lie down between {A:his} thighs.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} makes room for you without protest, {A:his} legs parting as your face settles at {A:his} crotch.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} lies before your face as you settle between {A:his} legs without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} lies back nervously, {A:his} thighs tense on either side of you as you settle between them.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} breath quickens as you stretch out between {A:his} legs, {A:his} hands curling nervously at {A:his} sides.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} parts {A:his} legs hesitantly, holding still as you lie down between them.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles before your face as {A:he} nervously lets you settle in.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you push {A:him} onto {A:his} back and settle between {A:his} legs.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} lets {A:his} thighs be parted, {A:his} face turned away as you stretch out between them.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} lies stiff and unhappy as your face comes to rest at {A:his} crotch.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} lies before your face as {A:he} glowers down at you between {A:his} legs.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} kicks as you force {A:his} legs apart, but you pin {A:his} thighs and settle onto your stomach between them.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} thrashes as you bear {A:him} down, your arms locking over {A:his} legs to hold {A:him} open.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} shoves at your head, but you wrap your arms around {A:his} thighs and press your face down between them.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} swings as {A:he} fights you, {A:his} hips pinned beneath your arms.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into missionary, "a" (was the prone giver) crawls up "b's" body from between their legs to lie on top,
// face to face. "b" (was the receiver) stays on their back throughout.
missionary.add(`{B:name} beckons you up with a warm smile, and you crawl up {B:his} body to settle on top of {B:him}, face to face.`,
  [playerA, isLoving]);
missionary.add(`{B:name} welcomes you as you climb up over {B:him}, {B:his} arms wrapping around your back as you settle.`,
  [playerA, isLoving]);
missionary.add(`{B:name's} {B:breasts.softBreasts} press up against your chest as you slide up {B:his} body and settle over {B:him}.`,
  [playerA, isLoving, bVisibleBreasts]);
missionary.add(`{B:name} smiles up at you as you crawl up over {B:him}, {B:his} {B:cock.thickCock} caught between your stomachs.`,
  [playerA, isLoving, bVisibleCock]);
missionary.add(`{B:name} pulls you up {B:his} body impatiently, dragging you flush on top of {B:him}.`,
  [playerA, isLustful]);
missionary.add(`{B:name} moans as you slide up over {B:him}, {B:his} legs wrapping around your waist the moment you settle.`,
  [playerA, isLustful]);
missionary.add(`{B:name's} {B:cock.bigHardCock} drags along your stomach as you crawl up {B:his} body, {B:his} hips grinding up against you.`,
  [playerA, isLustful, bHardCock]);
missionary.add(`{B:name} tilts {B:his} soaked {pussy} up against you as you settle between {B:his} legs, face to face at last.`,
  [playerA, isLustful, bVisiblePussy]);
missionary.add(`You crawl up {B:name's} body, and {B:he} accepts your weight without complaint as you settle on top.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} parts {B:his} legs around your hips as you slide up over {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lies quietly as you climb up {B:his} body and lower yourself onto {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`{B:name's} {B:cock.thickCock} settles between your bodies as you slide up over {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
missionary.add(`{B:name} tenses as you crawl up {B:his} body, {B:his} wide eyes tracking you all the way up.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} lies still beneath you as your face rises level with {B:his}.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} breath comes quick and shallow as your weight settles over {B:him}, suddenly face to face.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between your bodies as {B:he} nervously takes your weight.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles as you climb up {B:his} body, turning {B:his} face away as yours draws level.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} endures your weight settling over {B:him}, {B:his} arms staying at {B:his} sides.`,
  [playerA, isResistant]);
missionary.add(`{B:name} lies stiff beneath you as you slide up {B:his} body, {B:his} jaw set.`,
  [playerA, isResistant]);
missionary.add(`{B:name} shifts unhappily as you settle onto {B:him}, {B:his} {B:cock.thickCock} caught between your stomachs.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} shoves at your shoulders as you crawl up {B:him}, but your weight comes down, pinning {B:him} flat.`,
  [playerA, isViolent]);
missionary.add(`{B:name} thrashes beneath you as you slide up {B:his} body, but you catch {B:his} wrists and bear down.`,
  [playerA, isViolent]);
missionary.add(`{B:name} snarls into your face as you settle on top of {B:him}, {B:his} bucking going nowhere beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped between your bodies as {B:he} fights your weight, pinned face to face.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`{A:name} crawls up your body with a warm smile, settling over you and brushing {A:his} nose against yours.`,
  [playerB, isLoving]);
missionary.add(`{A:name} slides up along you, {A:his} arms bracketing your head as {A:he} lowers {A:him}self gently onto you.`,
  [playerB, isLoving]);
missionary.add(`{A:name's} {A:breasts.softBreasts} drag up your body as {A:he} climbs over you, settling chest to chest.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`{A:name's} {A:cock.thickCock} comes to rest against your thigh as {A:he} crawls up and settles over you.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name} surges up your body with a hungry moan, {A:his} mouth finding yours as {A:his} weight settles.`,
  [playerB, isLustful]);
missionary.add(`{A:name} slides up over you, grinding down against you the moment your hips align.`,
  [playerB, isLustful]);
missionary.add(`{A:name's} {A:cock.bigHardCock} drags up your thigh as {A:he} climbs over you, {A:his} eyes dark with want.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`{A:name's} {A:breasts.softBreasts} drag hot up your body as {A:he} crawls over you with a hungry grin.`,
  [playerB, isLustful, aVisibleBreasts]);
missionary.add(`{A:name} crawls up your body without comment, settling {A:his} weight over you.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} slides up over you and lowers {A:him}self down, letting your legs part around {A:him}.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} settles on top of you without protest, {A:his} weight coming to rest between your thighs.`,
  [playerB, isAccepting]);
missionary.add(`{A:name's} {A:cock.thickCock} settles against your thigh as {A:he} climbs up and lies over you.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} climbs up your body hesitantly, {A:his} eyes avoiding yours as {A:he} settles on top of you.`,
  [playerB, isFearful]);
missionary.add(`{A:name} lowers {A:him}self onto you nervously, {A:his} arms trembling beside your head.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} slides up over you, holding {A:him}self stiffly above your face.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your thigh as {A:he} nervously settles over you.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles as you pull {A:him} up your body, settling over you with obvious reluctance.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} crawls up and lies stiffly on top of you, {A:his} face turned aside.`,
  [playerB, isResistant]);
missionary.add(`{A:name} mutters something under {A:his} breath as {A:his} weight settles grudgingly over yours.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts against your thigh as {A:he} reluctantly stretches out over you.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} tries to rear back as you drag {A:him} up your body, but your legs lock around {A:him}, pulling {A:him} down flush.`,
  [playerB, isViolent]);
missionary.add(`{A:name} fights the climb, but you haul {A:him} up over you and hold {A:him} fast against your chest.`,
  [playerB, isViolent]);
missionary.add(`{A:name} strains against your grip as you pull {A:him} on top of you, unable to break your hold.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} grinds against your thigh as {A:he} struggles, dragged up your body and held there.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into sixty-nine, "a" (was the prone giver) keeps their mouth at "b's" crotch and swings their legs up
// and around, lowering their hips over "b's" face. "b" (was the receiver) stays on their back.
sixtyNine.add(`You swing your hips around over {B:name's} face, and {B:he} guides them down warmly, {B:his} breath soft against your thigh.`,
  [playerA, isLoving]);
sixtyNine.add(`{B:name} hums happily as you swing your legs over {B:him}, settling your hips down over {B:his} waiting mouth.`,
  [playerA, isLoving]);
sixtyNine.add(`{B:name} steadies your thighs as you pivot around above {B:him}, easing your hips down to {B:his} lips.`,
  [playerA, isLoving]);
sixtyNine.add(`{B:name's} {B:cock.thickCock} stays beneath your face as you swing your hips around, lowering them over {B:his} mouth.`,
  [playerA, isLoving, bVisibleCock]);
sixtyNine.add(`{B:name} grabs your hips the moment they swing within reach, dragging them down onto {B:his} eager mouth.`,
  [playerA, isLustful]);
sixtyNine.add(`{B:name} moans beneath you as you pivot around, {B:his} hands pulling your thighs down to either side of {B:his} head.`,
  [playerA, isLustful]);
sixtyNine.add(`{B:name} cranes up impatiently as your hips come around, {B:his} mouth finding you before you've settled.`,
  [playerA, isLustful]);
sixtyNine.add(`{B:name's} {B:cock.bigHardCock} twitches under your mouth as you swing your hips over {B:his} face, {B:his} moan hot against you.`,
  [playerA, isLustful, bHardCock]);
sixtyNine.add(`You swing your legs over {B:name} and lower your hips to {B:his} face, and {B:he} takes your weight without complaint.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name} holds still as you pivot around above {B:him}, settling into place mouth to crotch.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name} adjusts beneath you without protest as your hips come down over {B:his} face.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name's} {B:cock.thickCock} waits beneath your mouth as you swing around and settle over {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
sixtyNine.add(`{B:name} tenses as your hips swing over {B:his} face, {B:his} breath quick against your descending thighs.`,
  [playerA, isFearful]);
sixtyNine.add(`With a shaky breath, {B:name} lies still as you pivot around, your weight settling over {B:his} mouth.`,
  [playerA, isFearful]);
sixtyNine.add(`{B:name} goes rigid beneath you as your thighs frame {B:his} face, {B:his} hands hovering at your hips.`,
  [playerA, isFearful]);
sixtyNine.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath your mouth as {B:he} nervously takes your hips onto {B:his} face.`,
  [playerA, isFearful, bVisibleCock]);
sixtyNine.add(`{B:name} grumbles beneath you as you swing your hips around, {B:his} complaint cut short as they settle onto {B:his} mouth.`,
  [playerA, isResistant]);
sixtyNine.add(`With a muffled huff, {B:name} endures your weight as your thighs come down around {B:his} head.`,
  [playerA, isResistant]);
sixtyNine.add(`{B:name} shifts unhappily as you pivot around above {B:him}, {B:his} hands lying flat and unhelpful at {B:his} sides.`,
  [playerA, isResistant]);
sixtyNine.add(`{B:name} squirms in irritation as your hips descend, {B:his} {B:cock.thickCock} lying untouched beneath your chin.`,
  [playerA, isResistant, bVisibleCock]);
sixtyNine.add(`{B:name} bucks as your weight shifts, but you swing your hips around fast and pin {B:his} head between your thighs.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name} tries to twist away mid-turn, but your hips come down onto {B:his} face, your arms pinning {B:his} legs.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name} snarls against your skin as your thighs clamp around {B:his} head, {B:his} struggles pinned flat.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name's} {B:cock.thickCock} jerks beneath your face as {B:he} thrashes, your weight settling over {B:him} regardless.`,
  [playerA, isViolent, bVisibleCock]);
sixtyNine.add(`{A:name} swings {A:his} legs over you with a warm hum, easing {A:his} hips down until they rest gently on your face.`,
  [playerB, isLoving]);
sixtyNine.add(`{A:name} pivots around above you, {A:his} mouth returning to your thigh as {A:his} hips lower over your face.`,
  [playerB, isLoving]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} swings over your face as {A:he} turns {A:his} body around, settling into place along yours.`,
  [playerB, isLoving, aVisibleCock]);
sixtyNine.add(`{A:name's} {pussy} lowers to your mouth as {A:he} swings around, {A:his} lips pressing a soft kiss to your thigh.`,
  [playerB, isLoving, aVisiblePussy]);
sixtyNine.add(`{A:name} swings {A:his} hips over your face with a hungry moan, grinding down the moment they land.`,
  [playerB, isLustful]);
sixtyNine.add(`{A:name} pivots around eagerly, {A:his} mouth diving back between your thighs as {A:his} hips drop onto your face.`,
  [playerB, isLustful]);
sixtyNine.add(`{A:name's} soaked {pussy} descends onto your mouth as {A:he} swings around, moaning against your thigh.`,
  [playerB, isLustful, aVisiblePussy]);
sixtyNine.add(`{A:name's} {A:cock.bigHardCock} passes over your face as {A:he} turns, {A:his} hips settling down eagerly.`,
  [playerB, isLustful, aHardCock]);
sixtyNine.add(`{A:name} swings {A:his} legs over you without comment, lowering {A:his} hips onto your face.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name} pivots around above you, settling into place along your body, mouth to crotch.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name} eases {A:his} hips down over your face without protest, {A:his} weight settling along you.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} settles against your chin as {A:he} swings around and stretches out along you.`,
  [playerB, isAccepting, aVisibleCock]);
sixtyNine.add(`{A:name} swings around hesitantly, {A:his} thighs trembling as they lower to either side of your head.`,
  [playerB, isFearful]);
sixtyNine.add(`{A:name} eases {A:his} hips over your face nervously, {A:his} breath unsteady against your thigh.`,
  [playerB, isFearful]);
sixtyNine.add(`With a shaky breath, {A:name} pivots around, lowering {A:him}self carefully onto your mouth.`,
  [playerB, isFearful]);
sixtyNine.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} nervously swings {A:his} hips over your face.`,
  [playerB, isFearful, aVisibleCock]);
sixtyNine.add(`{A:name} grumbles as you guide {A:his} hips around, lowering them onto your face with obvious reluctance.`,
  [playerB, isResistant]);
sixtyNine.add(`With a huff, {A:name} swings {A:his} legs over you, settling {A:his} weight down with poor grace.`,
  [playerB, isResistant]);
sixtyNine.add(`{A:name} mutters something sour as {A:he} pivots around, {A:his} hips grudgingly descending to your mouth.`,
  [playerB, isResistant]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} sways past your face as {A:he} reluctantly turns and settles over you.`,
  [playerB, isResistant, aVisibleCock]);
sixtyNine.add(`{A:name} fights the turn, but your grip on {A:his} hips swings them around and down onto your face.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name} thrashes as you haul {A:his} legs over you, {A:his} hips pinned down against your mouth.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name} snarls against your thigh as you drag {A:him} into place, your arms locked over {A:his} back.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} swings wildly as {A:he} struggles through the turn, forced down along your body.`,
  [playerB, isViolent, aVisibleCock]);
