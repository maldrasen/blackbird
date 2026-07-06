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

const rearrange = WeaverPackage('spooning.rearrange');
const doggyStyle = WeaverPackage('spooning.move-to-doggy-style');
const missionaryReversed = WeaverPackage('spooning.move-to-missionary-reversed');

// First lying on side behind Second. Second has back to first.
SexPosition.register('spooning',{
  name: 'Spooning',

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

  // We can move from standing reversed to spooning, but not back to standing.
  moves:[
    { code:'doggy-style', package:doggyStyle },
    { code:'missionary-reversed', package:missionaryReversed },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} lies down on {B:his} side and scoots back into you, tucking {B:him}self into the curve of your body.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles in front of you with a warm sigh, drawing your arm over {B:him} and holding it against {B:his} chest.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} nestles back against you, guiding your hand up to rest against {B:his} {B:breasts.softBreasts}.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} settles {B:his} back against your chest, your {A:cock.thickCock} coming to rest between {B:his} cheeks.`,
  [playerA, isLoving, aVisibleCock]);
rearrange.add(`{B:name} lies down and presses {B:him}self back into you with a needy moan, grinding {B:his} ass against your hips.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} pulls your arm around {B:him} and drags your hand down {B:his} body, arching back into your chest.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} settles back against you and tilts {B:his} hips, {B:his} soaked {pussy} pressing back against your crotch.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} wriggles back against your {A:cock.bigHardCock} as {B:he} settles into the curve of your body.`,
  [playerA, isLustful, aHardCock]);
rearrange.add(`{B:name} lies down on {B:his} side in front of you without complaint, letting you draw {B:him} back against your chest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles into the curve of your body without protest, your arm resting over {B:his} waist.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} scoots back until {B:his} back meets your chest, lying quietly in your arms.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles onto {B:his} side, {B:his} {B:cock.thickCock} resting against {B:his} thigh as you tuck in behind {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} lies down stiffly in front of you, {B:his} back barely touching your chest until you pull {B:him} in.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles onto {B:his} side, {B:his} shoulders tight as your arm settles over {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} holds {B:him}self rigid in the curve of your body, {B:his} breathing quick and shallow.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} thigh as {B:he} nervously lets you draw {B:him} close.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you pull {B:him} down in front of you, lying stiff against your chest.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies down on {B:his} side, edging forward until your arm hauls {B:him} back in.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} endures your embrace with poor grace, {B:his} arms crossed over yours.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts unhappily as your {A:cock.thickCock} presses between {B:his} cheeks, grumbling into the pillow of {B:his} arm.`,
  [playerA, isResistant, aVisibleCock]);
rearrange.add(`{B:name} thrashes as you drag {B:him} down onto {B:his} side, locking your arms around {B:him} from behind.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} kicks back at you, but you hook your leg over {B:his} and pin {B:him} into the curve of your body.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} strains against the arm locked across {B:his} chest, unable to break your hold from behind.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} bucks in your grip as your {A:cock.thickCock} presses between {B:his} cheeks, held fast against your chest.`,
  [playerA, isViolent, aVisibleCock]);
rearrange.add(`You lie down on your side, and {A:name} settles in behind you, {A:his} arm wrapping warm around your waist.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} tucks in at your back with a contented sigh, {A:his} knees folding into the bend of yours.`,
  [playerB, isLoving]);
rearrange.add(`{A:name's} {A:cock.thickCock} settles between your cheeks as {A:he} curls up close behind you.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name's} {A:breasts.softBreasts} press warm against your back as {A:he} gathers you into the curve of {A:his} body.`,
  [playerB, isLoving, aVisibleBreasts]);
rearrange.add(`{A:name} pulls you back against {A:him} the moment you lie down, grinding {A:his} hips into your ass.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} spoons up hungrily behind you, {A:his} hand wandering down your front as {A:his} breath heats your neck.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans against your shoulder as {A:he} drags your hips back into {A:his}.`,
  [playerB, isLustful]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} presses insistently between your cheeks as {A:he} molds {A:him}self to your back.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`You settle onto your side, and {A:name} lies down behind you without comment.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} tucks in at your back, {A:his} arm coming to rest over your waist.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles against your back without protest, {A:his} breath even against your neck.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name's} {A:cock.thickCock} rests between your cheeks as {A:he} lies down quietly behind you.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} lies down behind you hesitantly, {A:his} body hovering a breath away from yours.`,
  [playerB, isFearful]);
rearrange.add(`{A:name} settles in at your back nervously, {A:his} arm resting feather-light over your waist.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} curls in behind you, holding very still.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your ass as {A:he} nervously tucks in behind you.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you pull {A:him} down behind you, {A:his} body stiff along your back.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} lies down at your back, {A:his} arm dead weight where you drape it over you.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters into your hair, holding {A:him}self apart until you wriggle back against {A:him}.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} presses between your cheeks as {A:he} grudgingly lets you pull {A:him} flush against your back.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} tries to roll away, but you grip {A:his} arm and haul it over you, pinning {A:him} at your back.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} thrashes behind you, but you hook your leg back over {A:his} and hold {A:him} against your spine.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls into your hair, {A:his} wrist locked in your grip across your chest.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} is trapped between your cheeks as {A:he} fights to pull away from your back.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into doggy-style, both rise from their sides: "b" onto hands and knees, "a" kneeling up behind. As
// elsewhere, no options for the player (as B) raising their ass to a fearful, resistant, or violent partner.
doggyStyle.add(`{B:name} rolls forward onto {B:his} hands and knees as you rise up behind {B:him}, arching {B:his} back with a warm glance over {B:his} shoulder.`,
  [playerA, isLoving]);
doggyStyle.add(`You push yourself up onto your knees, and {B:name} comes up onto all fours in front of you, backing {B:his} hips into your hands.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} rises onto {B:his} hands and knees, {B:his} {B:breasts.softBreasts} swaying gently beneath {B:him} as you kneel up at {B:his} back.`,
  [playerA, isLoving, bVisibleBreasts]);
doggyStyle.add(`{B:name} pushes up onto all fours, {B:his} {B:cock.thickCock} swinging beneath {B:him} as {B:he} settles back against your hips.`,
  [playerA, isLoving, bVisibleCock]);
doggyStyle.add(`{B:name} scrambles up onto all fours the moment you stir, pressing {B:his} ass back into your lap before you're even upright.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} rises with a needy moan, arching {B:his} spine and grinding back against you as you kneel up behind {B:him}.`,
  [playerA, isLustful]);
doggyStyle.add(`{B:name} tilts {B:his} hips as {B:he} comes up onto {B:his} knees, {B:his} soaked {pussy} presented to you.`,
  [playerA, isLustful, bVisiblePussy]);
doggyStyle.add(`{B:name} pushes back against your {A:cock.bigHardCock} as the two of you rise, {B:his} hips already rocking.`,
  [playerA, isLustful, aHardCock]);
doggyStyle.add(`You rise onto your knees, and {B:name} pushes up onto {B:his} hands and knees in front of you.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} comes up onto all fours without complaint as you kneel up at {B:his} back.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} lifts {B:his} hips into position without protest, settling back against you.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} rises onto {B:his} knees, {B:his} {B:cock.thickCock} hanging beneath {B:him} as you settle in behind.`,
  [playerA, isAccepting, bVisibleCock]);
doggyStyle.add(`{B:name} climbs onto {B:his} hands and knees quickly at the press of your hands, {B:his} whole body tense.`,
  [playerA, isFearful]);
doggyStyle.add(`With a shaky breath, {B:name} rises onto all fours in front of you, {B:his} elbows trembling.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name} obeys the guiding pull on {B:his} hips, coming up nervously onto {B:his} knees.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath {B:him} as {B:he} rises anxiously onto all fours.`,
  [playerA, isFearful, bVisibleCock]);
doggyStyle.add(`{B:name} grumbles as you push {B:him} up onto {B:his} hands and knees, {B:his} head hanging low.`,
  [playerA, isResistant]);
doggyStyle.add(`With a huff, {B:name} comes up onto all fours, {B:his} hips stiff in your hands.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} rises with deliberate slowness, making you drag {B:his} hips back into place.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} settles onto {B:his} knees with poor grace, {B:his} {B:cock.thickCock} swaying beneath {B:him}.`,
  [playerA, isResistant, bVisibleCock]);
doggyStyle.add(`{B:name} tries to scramble away as the two of you rise, but you catch {B:his} hips and haul {B:him} back onto {B:his} knees.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} kicks out as you drag {B:him} up onto all fours, your grip on {B:his} hips unshakable.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} snarls over {B:his} shoulder, wrestled up onto {B:his} hands and knees in front of you.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name's} {B:cock.thickCock} swings beneath {B:him} as {B:he} fights the hands forcing {B:his} hips up.`,
  [playerA, isViolent, bVisibleCock]);
doggyStyle.add(`{A:name} rises up behind you, {A:his} hands warm on your hips as you push up onto your hands and knees.`,
  [playerB, isLoving]);
doggyStyle.add(`You come up onto all fours, and {A:name} kneels close at your back, smoothing a hand down your spine.`,
  [playerB, isLoving]);
doggyStyle.add(`{A:name's} {A:cock.thickCock} rests against your ass as {A:he} kneels up behind you, steadying your rise.`,
  [playerB, isLoving, aVisibleCock]);
doggyStyle.add(`{A:name's} {A:breasts.softBreasts} brush your back as {A:he} rises with you, {A:his} hands settling on your hips.`,
  [playerB, isLoving, aVisibleBreasts]);
doggyStyle.add(`{A:name} pushes upright and drags your hips up with {A:him}, groaning as your ass meets {A:his} lap.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} kneels up eagerly behind you, {A:his} hands greedy on your ass as you rise onto all fours.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} growls approvingly as you arch up onto your hands and knees in front of {A:him}.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name's} {A:cock.bigHardCock} presses between your cheeks as {A:he} pulls you up onto your knees.`,
  [playerB, isLustful, aHardCock]);
doggyStyle.add(`{A:name} rises behind you without comment as you push up onto your hands and knees.`,
  [playerB, isAccepting]);
doggyStyle.add(`You come up onto all fours, and {A:name} settles onto {A:his} knees at your back.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name} steadies your hips as you rise, kneeling quietly behind you.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name's} {A:cock.thickCock} brushes your thigh as the two of you rise into position.`,
  [playerB, isAccepting, aVisibleCock]);

// Moving into missionary-reversed, the pair rolls from their sides: "b" onto their stomach with "a" coming down
// on top along their back.
missionaryReversed.add(`{B:name} rolls onto {B:his} stomach as you shift your weight over {B:him}, sighing as your body settles along {B:his} back.`,
  [playerA, isLoving]);
missionaryReversed.add(`You ease {B:name} over onto {B:his} front and stretch out on top of {B:him}, {B:his} hand finding yours where it rests beside {B:his} head.`,
  [playerA, isLoving]);
missionaryReversed.add(`{B:name} hums happily as the two of you roll together, settling flat beneath the length of your body.`,
  [playerA, isLoving]);
missionaryReversed.add(`{B:name} settles face down beneath you, your {A:cock.thickCock} nestling between {B:his} cheeks as your weight comes down.`,
  [playerA, isLoving, aVisibleCock]);
missionaryReversed.add(`{B:name} rolls flat and arches {B:his} ass up into you as your weight comes down along {B:his} back.`,
  [playerA, isLustful]);
missionaryReversed.add(`{B:name} moans as you roll {B:him} onto {B:his} stomach and press {B:him} down beneath you.`,
  [playerA, isLustful]);
missionaryReversed.add(`{B:name} spreads {B:his} thighs as {B:he} settles onto {B:his} front, {B:his} soaked {pussy} pressing up against you.`,
  [playerA, isLustful, bVisiblePussy]);
missionaryReversed.add(`{B:name} grinds back against your {A:cock.bigHardCock} as the roll leaves {B:him} pinned happily beneath you.`,
  [playerA, isLustful, aHardCock]);
missionaryReversed.add(`{B:name} rolls onto {B:his} stomach at your urging, lying flat as you stretch out over {B:him}.`,
  [playerA, isAccepting]);
missionaryReversed.add(`The two of you roll together, {B:name} settling face down beneath your weight without complaint.`,
  [playerA, isAccepting]);
missionaryReversed.add(`{B:name} turns onto {B:his} front without protest, letting your body cover {B:his}.`,
  [playerA, isAccepting]);
missionaryReversed.add(`{B:name} settles flat, {B:his} {B:cock.thickCock} caught beneath {B:him} as your weight comes down along {B:his} back.`,
  [playerA, isAccepting, bVisibleCock]);
missionaryReversed.add(`{B:name} rolls onto {B:his} stomach with a shaky breath, tensing as your full weight settles over {B:him}.`,
  [playerA, isFearful]);
missionaryReversed.add(`{B:name} goes still and small beneath you as the roll pins {B:him} flat under your body.`,
  [playerA, isFearful]);
missionaryReversed.add(`{B:name} turns onto {B:his} front nervously, {B:his} hands curling beneath {B:his} chin as you cover {B:him}.`,
  [playerA, isFearful]);
missionaryReversed.add(`{B:name} shivers as your {A:cock.thickCock} settles between {B:his} cheeks, {B:his} face pressed into {B:his} arms.`,
  [playerA, isFearful, aVisibleCock]);
missionaryReversed.add(`{B:name} grumbles as you roll {B:him} onto {B:his} stomach, {B:his} complaints flattening out beneath your weight.`,
  [playerA, isResistant]);
missionaryReversed.add(`With a huff, {B:name} settles face down, enduring the press of your body along {B:his} back.`,
  [playerA, isResistant]);
missionaryReversed.add(`{B:name} squirms in irritation as your weight pins {B:him} flat, {B:his} face turned pointedly aside.`,
  [playerA, isResistant]);
missionaryReversed.add(`{B:name} mutters into {B:his} arms as your {A:cock.thickCock} comes to rest between {B:his} cheeks.`,
  [playerA, isResistant, aVisibleCock]);
missionaryReversed.add(`{B:name} fights the roll, but you force {B:him} flat onto {B:his} stomach and bear down along {B:his} back.`,
  [playerA, isViolent]);
missionaryReversed.add(`{B:name} tries to squirm free mid-roll, but your weight lands square across {B:him}, pinning {B:him} face down.`,
  [playerA, isViolent]);
missionaryReversed.add(`{B:name} snarls into the crook of {B:his} arm, crushed flat beneath the length of your body.`,
  [playerA, isViolent]);
missionaryReversed.add(`{B:name} bucks as your {A:cock.thickCock} presses between {B:his} cheeks, {B:his} thrashing pinned beneath you.`,
  [playerA, isViolent, aVisibleCock]);
missionaryReversed.add(`{A:name} rolls with you as you turn onto your stomach, {A:his} body settling warm along your back.`,
  [playerB, isLoving]);
missionaryReversed.add(`You settle onto your front, and {A:name} stretches out over you, {A:his} lips brushing the nape of your neck.`,
  [playerB, isLoving]);
missionaryReversed.add(`{A:name's} {A:cock.thickCock} settles between your cheeks as {A:he} eases {A:his} weight down along your back.`,
  [playerB, isLoving, aVisibleCock]);
missionaryReversed.add(`{A:name's} {A:breasts.softBreasts} spread warm across your back as {A:he} covers you.`,
  [playerB, isLoving, aVisibleBreasts]);
missionaryReversed.add(`{A:name} rolls you flat and comes down on top of you with a hungry moan, grinding against your ass.`,
  [playerB, isLustful]);
missionaryReversed.add(`{A:name} presses {A:his} weight down over you, {A:his} breath ragged against your ear.`,
  [playerB, isLustful]);
missionaryReversed.add(`{A:name's} {A:cock.bigHardCock} slides between your cheeks as {A:his} weight lands along your back.`,
  [playerB, isLustful, aHardCock]);
missionaryReversed.add(`{A:name's} {A:breasts.softBreasts} crush against your back as {A:he} pins you flat, moaning at the contact.`,
  [playerB, isLustful, aVisibleBreasts]);
missionaryReversed.add(`You turn onto your stomach, and {A:name} settles over your back without comment.`,
  [playerB, isAccepting]);
missionaryReversed.add(`The two of you roll together, {A:name} coming to rest along your back.`,
  [playerB, isAccepting]);
missionaryReversed.add(`{A:name} covers you without protest as you settle onto your front.`,
  [playerB, isAccepting]);
missionaryReversed.add(`{A:name's} {A:cock.thickCock} comes to rest between your cheeks as {A:he} settles over you.`,
  [playerB, isAccepting, aVisibleCock]);
missionaryReversed.add(`{A:name} lowers {A:him}self onto your back hesitantly once you've rolled flat, {A:his} weight settling by careful degrees.`,
  [playerB, isFearful]);
missionaryReversed.add(`{A:name's} breath trembles against your neck as {A:he} stretches out over you.`,
  [playerB, isFearful]);
missionaryReversed.add(`With a shaky breath, {A:name} settles along your back, holding {A:him}self half-raised above you.`,
  [playerB, isFearful]);
missionaryReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles between your cheeks as {A:he} nervously covers you.`,
  [playerB, isFearful, aVisibleCock]);
missionaryReversed.add(`{A:name} grumbles as you pull {A:him} over you, {A:his} weight settling grudgingly along your back.`,
  [playerB, isResistant]);
missionaryReversed.add(`With a huff, {A:name} stretches out on top of you, {A:his} chin turned away from your shoulder.`,
  [playerB, isResistant]);
missionaryReversed.add(`{A:name} mutters something sour against your neck as {A:his} body comes down over yours.`,
  [playerB, isResistant]);
missionaryReversed.add(`{A:name's} {A:cock.thickCock} shifts between your cheeks as {A:he} reluctantly settles over you.`,
  [playerB, isResistant, aVisibleCock]);
missionaryReversed.add(`{A:name} tries to roll clear, but you drag {A:him} over you as you settle onto your stomach, {A:his} weight landing across your back.`,
  [playerB, isViolent]);
missionaryReversed.add(`{A:name} thrashes above you, but your grip on {A:his} arm keeps {A:him} pinned along your back.`,
  [playerB, isViolent]);
missionaryReversed.add(`{A:name} snarls against your shoulder as you hold {A:his} arm locked across your chest, keeping {A:him} pressed to your back.`,
  [playerB, isViolent]);
missionaryReversed.add(`{A:name's} {A:cock.thickCock} is caught between your cheeks as {A:he} struggles against your grip.`,
  [playerB, isViolent, aVisibleCock]);
