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

const rearrange = WeaverPackage('face-sitting-reversed.rearrange');
const cowgirlReversed = WeaverPackage('face-sitting-reversed.move-to-cowgirl-reversed');
const lapSittingReversed = WeaverPackage('face-sitting-reversed.move-to-lap-sitting-reversed');
const faceSitting = WeaverPackage('face-sitting-reversed.move-to-face-sitting');
const sixtyNine = WeaverPackage('face-sitting-reversed.move-to-sixty-nine');

// First sitting on second's face, facing second's feet.
SexPosition.register('face-sitting-reversed',{
  name: 'Reversed Face Sitting',

  alignment: {
    first: {
      hands: [HandAlignment.breasts, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
    second: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.cock],
      cock: [CockAlignment.rubbed],
    },
  },

  moves:[
    { code:'cowgirl-reversed', package:cowgirlReversed, swap:true },
    { code:'lap-sitting-reversed', package:lapSittingReversed, swap:true },
    { code:'face-sitting', package:faceSitting },
    { code:'sixty-nine', package:sixtyNine },
  ],

  rearrangePackage: rearrange,
});

rearrange.add(`{B:name} settles onto {B:his} back with a warm smile, tilting {B:his} head back as you straddle {B:his} face, facing down {B:his} body.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} lies back and guides your hips into place above {B:his} face, pressing a soft kiss to your ass as you settle facing {B:his} feet.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} settles beneath you, {B:his} {B:cock.thickCock} resting against {B:his} stomach in front of you as you lower yourself onto {B:his} face, facing away.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} lies back with a contented sigh, {B:his} {B:breasts.softBreasts} spread out below you as you settle over {B:his} face, facing {B:his} feet.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} drops back eagerly and pulls your hips down over {B:his} face, moaning as you settle onto {B:his} mouth facing away.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} lies back with a hungry moan, {B:his} hands kneading your ass as you lower yourself over {B:his} upturned face.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} moans against your ass the moment you settle down, {B:his} tongue already searching.`,
  [playerA, isLustful]);
rearrange.add(`{B:name's} {B:cock.bigHardCock} stands eager in front of you as {B:he} pulls your ass down onto {B:his} waiting mouth.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} lies back without complaint, tilting {B:his} head back as you settle over {B:his} face, facing {B:his} feet.`,
  [playerA, isAccepting]);
rearrange.add(`You press {B:name} down onto {B:his} back and straddle {B:his} face facing away, and {B:he} makes no protest.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} settles quietly beneath you as you lower your ass onto {B:his} waiting mouth.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lies still, {B:his} {B:cock.thickCock} resting plainly against {B:his} stomach in front of you as you settle onto {B:his} face.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} lies back nervously, {B:his} quick breaths brushing against your ass as you settle over {B:his} face, facing away.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles beneath you, tensing as your ass lowers onto {B:his} mouth.`,
  [playerA, isFearful]);
rearrange.add(`{B:name} trembles beneath you as you settle down facing {B:his} feet, {B:his} hands hovering uncertainly at your hips.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles against {B:his} stomach in front of you as {B:he} nervously lies back beneath you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles as you push {B:him} onto {B:his} back, {B:his} complaints cut short as you settle your ass over {B:his} mouth, facing away.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lies back, clearly unhappy as you straddle {B:his} face facing {B:his} feet.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} mutters under {B:his} breath right up until your ass settles onto {B:his} mouth, muffling the rest.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} shifts reluctantly beneath you, {B:his} {B:cock.thickCock} lying against {B:his} stomach as you settle over {B:his} face, facing away.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you shove {B:him} down and straddle {B:his} face facing away, pinning {B:his} arms beneath your knees.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you force your ass down over {B:his} face anyway, {B:his} protests lost beneath you.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} snarls beneath you, but you clamp {B:his} head between your thighs and settle down facing {B:his} feet.`,
  [playerA, isViolent]);
rearrange.add(`{B:name's} {B:cock.thickCock} swings against {B:his} stomach as {B:he} bucks beneath you, unable to stop you from settling onto {B:his} face.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`You lie back, and {A:name} straddles your face facing your feet, glancing back with a warm smile as {A:he} lowers {A:his} ass onto your mouth.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} presents {A:his} ass to you with an affectionate wiggle, settling down onto your waiting mouth.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} settles gently onto your face facing away, {A:his} {A:cock.thickCock} hanging over your chest as {A:he} lowers {A:him}self.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} reaches back to squeeze your hand as {A:he} settles over your face, {A:his} back to you as {A:his} ass lowers onto your mouth.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} pushes you onto your back and straddles your face facing away, grinding {A:his} ass down onto your mouth with a hungry moan.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} wastes no time, {A:his} ass pressing down eagerly onto your mouth as {A:he} settles over your face, facing your feet.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} lowers {A:him}self with a needy moan, {A:his} soaked {pussy} hovering just above your mouth as {A:he} settles facing away.`,
  [playerB, isLustful, aVisiblePussy]);
rearrange.add(`{A:name's} {A:cock.bigHardCock} bobs over your chest as {A:he} settles down eagerly onto your face, facing away.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`You lie back, and {A:name} straddles your face facing away, lowering {A:him}self onto your mouth without comment.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles over your face without protest, {A:his} back to you as {A:he} lowers {A:him}self into place.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} swings a leg over your head and sits facing your feet, letting you take {A:his} weight without a word.`,
  [playerB, isAccepting]);
rearrange.add(`{A:name} settles onto your face facing away without complaint, {A:his} {A:cock.thickCock} resting against your chest.`,
  [playerB, isAccepting, aVisibleCock]);
rearrange.add(`{A:name} straddles your face nervously, {A:his} thighs trembling as {A:he} hesitantly lowers {A:his} ass toward your mouth.`,
  [playerB, isFearful]);
rearrange.add(`With a shaky breath, {A:name} hovers above your face, facing away, only settling when you pull gently at {A:his} hips.`,
  [playerB, isFearful]);
rearrange.add(`{A:name} settles onto your mouth hesitantly, {A:his} whole body tense, grateful at least that {A:he} doesn't have to face you.`,
  [playerB, isFearful]);
rearrange.add(`{A:name's} {A:cock.sixInch} long {cock} trembles above your chest as {A:he} nervously lowers {A:him}self onto your face.`,
  [playerB, isFearful, aVisibleCock]);
rearrange.add(`{A:name} grumbles as you pull {A:him} into place above your face, lowering {A:his} ass with obvious reluctance.`,
  [playerB, isResistant]);
rearrange.add(`With a huff, {A:name} settles onto your face facing away, refusing to glance back at you.`,
  [playerB, isResistant]);
rearrange.add(`{A:name} mutters something under {A:his} breath as {A:he} grudgingly lowers {A:his} ass onto your mouth.`,
  [playerB, isResistant]);
rearrange.add(`{A:name's} {A:cock.thickCock} sways over your chest as {A:he} reluctantly settles onto your face, facing your feet.`,
  [playerB, isResistant, aVisibleCock]);
rearrange.add(`{A:name} thrashes as you drag {A:him} over your face, but your grip on {A:his} hips hauls {A:his} ass down onto your mouth anyway.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} struggles and twists, but you force {A:him} down over your face, {A:his} back to you as {A:he} fights your hold.`,
  [playerB, isViolent]);
rearrange.add(`{A:name} snarls and claws at your legs, but you hold {A:his} hips fast, keeping {A:his} ass pressed down against your mouth.`,
  [playerB, isViolent]);
rearrange.add(`{A:name's} {A:cock.thickCock} swings over your chest as {A:he} fights your grip, unable to stop you from pulling {A:him} down onto your face.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into cowgirl-reversed, "a" is always the one lying on their back (was being sat on), while "b" is the
// rider, who slides forward off "a's" face — already facing "a's" feet — to settle astride their hips.
cowgirlReversed.add(`{B:name} lifts off your face and slides down your body, glancing warmly back over {B:his} shoulder as {B:he} settles astride your hips, still facing away.`,
  [playerA, isLoving]);
cowgirlReversed.add(`{B:name} scoots forward off your face with a contented hum, coming to rest astride your hips with {B:his} back to you.`,
  [playerA, isLoving]);
cowgirlReversed.add(`{B:name} trails {B:his} fingers fondly along your side as {B:he} slides down to your hips, settling with {B:his} back to you.`,
  [playerA, isLoving]);
cowgirlReversed.add(`{B:name} slides down your body, {B:his} {B:cock.thickCock} swaying beneath {B:him} as {B:he} settles astride your hips, facing your feet.`,
  [playerA, isLoving, bVisibleCock]);
cowgirlReversed.add(`{B:name} grinds against your mouth one last time before sliding forward, settling astride your hips with an eager roll of {B:his} ass.`,
  [playerA, isLustful]);
cowgirlReversed.add(`{B:name} slides down your body with a needy moan, already rocking as {B:he} settles onto your hips, facing away.`,
  [playerA, isLustful]);
cowgirlReversed.add(`{B:name's} soaked {pussy} leaves a wet trail down your chest as {B:he} slides forward, settling astride your hips.`,
  [playerA, isLustful, bVisiblePussy]);
cowgirlReversed.add(`{B:name's} {B:cock.bigHardCock} bobs beneath {B:him} as {B:he} slides eagerly down your body, settling astride your hips facing away.`,
  [playerA, isLustful, bHardCock]);
cowgirlReversed.add(`{B:name} lifts off your face and slides down your body without comment, settling astride your hips facing away.`,
  [playerA, isAccepting]);
cowgirlReversed.add(`{B:name} scoots forward and takes {B:his} place astride your hips without protest, {B:his} back to you.`,
  [playerA, isAccepting]);
cowgirlReversed.add(`{B:name} shifts {B:his} weight off your face and settles quietly onto your hips, still facing your feet.`,
  [playerA, isAccepting]);
cowgirlReversed.add(`{B:name} slides down without complaint, {B:his} {B:cock.thickCock} hanging beneath {B:him} as {B:he} settles astride your hips.`,
  [playerA, isAccepting, bVisibleCock]);
cowgirlReversed.add(`{B:name} climbs off your face nervously and slides down your body, {B:his} back tense as {B:he} settles astride your hips.`,
  [playerA, isFearful]);
cowgirlReversed.add(`With a shaky breath, {B:name} scoots forward, perching stiffly astride your hips with {B:his} back to you.`,
  [playerA, isFearful]);
cowgirlReversed.add(`{B:name} eases down your body hesitantly, {B:his} thighs trembling against your sides as {B:he} settles onto your hips.`,
  [playerA, isFearful]);
cowgirlReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath {B:him} as {B:he} nervously slides down to straddle your hips.`,
  [playerA, isFearful, bVisibleCock]);
cowgirlReversed.add(`{B:name} grumbles as you guide {B:him} down your body, reluctantly settling astride your hips facing away.`,
  [playerA, isResistant]);
cowgirlReversed.add(`With a huff, {B:name} slides forward off your face, dropping onto your hips with poor grace.`,
  [playerA, isResistant]);
cowgirlReversed.add(`{B:name} shifts down your body grudgingly, sitting stiff and unhappy astride your hips.`,
  [playerA, isResistant]);
cowgirlReversed.add(`{B:name} settles reluctantly onto your hips, {B:his} {B:cock.thickCock} swaying beneath {B:him} as {B:he} shifts into place.`,
  [playerA, isResistant, bVisibleCock]);
cowgirlReversed.add(`{B:name} tries to wrench free as you shove {B:him} down your body, but your grip forces {B:him} astride your hips, still facing away.`,
  [playerA, isViolent]);
cowgirlReversed.add(`{B:name} thrashes as you haul {B:him} off your face, dragging {B:him} down to your hips and holding {B:him} there.`,
  [playerA, isViolent]);
cowgirlReversed.add(`{B:name} struggles the whole way down your body, but you pin {B:his} hips astride your own.`,
  [playerA, isViolent]);
cowgirlReversed.add(`{B:name's} {B:cock.thickCock} swings beneath {B:him} as {B:he} fights your grip, forced down astride your hips.`,
  [playerA, isViolent, bVisibleCock]);
cowgirlReversed.add(`You lift off {A:name's} face and slide down {A:his} body, {A:his} hands steadying your hips warmly as you settle astride them, facing away.`,
  [playerB, isLoving]);
cowgirlReversed.add(`{A:name} presses a last kiss to your ass before you slide forward, trailing {A:his} fingers down your back as you settle astride {A:his} hips.`,
  [playerB, isLoving]);
cowgirlReversed.add(`{A:name} hums contentedly as you slide down {A:his} chest, {A:his} thumbs tracing fond circles on your hips as you settle facing {A:his} feet.`,
  [playerB, isLoving]);
cowgirlReversed.add(`{A:name's} {A:cock.thickCock} presses warmly against your ass as you slide down {A:his} body and settle astride {A:his} hips.`,
  [playerB, isLoving, aVisibleCock]);
cowgirlReversed.add(`{A:name} groans with want as you slide off {A:his} face, {A:his} hands gripping your ass greedily the whole way down to {A:his} hips.`,
  [playerB, isLustful]);
cowgirlReversed.add(`{A:name} moans as you scoot forward, {A:his} hips already rocking up beneath you as you settle astride them, facing away.`,
  [playerB, isLustful]);
cowgirlReversed.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks the moment you settle astride {A:his} hips, facing away.`,
  [playerB, isLustful, aHardCock]);
cowgirlReversed.add(`{A:name's} soaked {pussy} grinds up beneath your ass as you slide down {A:his} body, settling astride {A:his} hips.`,
  [playerB, isLustful, aVisiblePussy]);
cowgirlReversed.add(`You lift off {A:name's} face and slide down {A:his} body, and {A:he} lies quietly as you settle astride {A:his} hips, facing away.`,
  [playerB, isAccepting]);
cowgirlReversed.add(`{A:name} wipes {A:his} mouth and rests {A:his} hands on your hips as you shift down to straddle {A:him}, your back to {A:him}.`,
  [playerB, isAccepting]);
cowgirlReversed.add(`{A:name} watches your back without comment as you slide down and settle astride {A:his} hips.`,
  [playerB, isAccepting]);
cowgirlReversed.add(`{A:name's} {A:cock.thickCock} rests against your ass as you settle astride {A:his} hips without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
cowgirlReversed.add(`{A:name} catches {A:his} breath as you lift off {A:his} face, lying tense beneath you as you slide down to {A:his} hips.`,
  [playerB, isFearful]);
cowgirlReversed.add(`{A:name's} hands tremble against your thighs as you slide down {A:his} body, settling astride {A:his} hips facing away.`,
  [playerB, isFearful]);
cowgirlReversed.add(`With a shaky breath, {A:name} lies still beneath you, unsure what to expect as you settle astride {A:his} hips, your back to {A:him}.`,
  [playerB, isFearful]);
cowgirlReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles beneath your ass as you slide down {A:his} body and settle astride {A:his} hips.`,
  [playerB, isFearful, aVisibleCock]);
cowgirlReversed.add(`{A:name} grumbles beneath you as you slide off {A:his} face, {A:his} hands staying pointedly off your hips as you settle astride {A:him}.`,
  [playerB, isResistant]);
cowgirlReversed.add(`{A:name} huffs and wipes {A:his} mouth with the back of {A:his} hand as you slide down to straddle {A:his} hips, facing away.`,
  [playerB, isResistant]);
cowgirlReversed.add(`{A:name} shifts unhappily beneath you as you settle astride {A:his} hips, muttering something you can't quite hear.`,
  [playerB, isResistant]);
cowgirlReversed.add(`{A:name} stiffens as {A:his} {A:cock.thickCock} presses against your ass, clearly unhappy as you settle astride {A:his} hips.`,
  [playerB, isResistant, aVisibleCock]);
cowgirlReversed.add(`{A:name} bucks beneath you the moment you lift off {A:his} face, but you slide down and pin {A:his} hips beneath your weight, facing away.`,
  [playerB, isViolent]);
cowgirlReversed.add(`{A:name} tries to twist free as you slide down {A:his} body, but you settle astride {A:his} hips, your weight holding {A:him} down.`,
  [playerB, isViolent]);
cowgirlReversed.add(`{A:name} snarls behind you, thrashing uselessly as you settle astride {A:his} hips with your back to {A:him}.`,
  [playerB, isViolent]);
cowgirlReversed.add(`{A:name's} {A:cock.thickCock} swings beneath you as {A:he} bucks, unable to dislodge you as you settle astride {A:his} hips.`,
  [playerB, isViolent, aVisibleCock]);

// Moving into lap-sitting-reversed, "a" is the one sitting up beneath (was being sat on), while "b" slides down
// off "a's" face and settles into their lap, back against "a's" chest.
lapSittingReversed.add(`{B:name} slides down your body as you sit up, settling into your lap with {B:his} back against your chest and a contented sigh.`,
  [playerA, isLoving]);
lapSittingReversed.add(`As you sit upright, {B:name} eases down into your lap, leaning {B:his} head back against your shoulder warmly.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} settles into your lap facing away, reaching down to lace {B:his} fingers through yours where your arms wrap around {B:him}.`,
  [playerA, isLoving]);
lapSittingReversed.add(`{B:name} settles back against your chest with a happy hum, {B:his} {B:cock.thickCock} resting between {B:his} thighs.`,
  [playerA, isLoving, bVisibleCock]);
lapSittingReversed.add(`{B:name} slides down into your lap with a needy moan, grinding {B:his} ass back against you the moment {B:he} settles.`,
  [playerA, isLustful]);
lapSittingReversed.add(`The moment you sit up, {B:name} is in your lap, pressing {B:his} back hotly against your chest and rolling {B:his} hips.`,
  [playerA, isLustful]);
lapSittingReversed.add(`{B:name's} {B:cock.bigHardCock} stands up from {B:his} lap as {B:he} grinds back against you, {B:his} head lolling onto your shoulder.`,
  [playerA, isLustful, bHardCock]);
lapSittingReversed.add(`{B:name} spreads {B:his} thighs over yours as {B:he} settles back against your chest, {B:his} soaked {pussy} on display between them.`,
  [playerA, isLustful, bVisiblePussy]);
lapSittingReversed.add(`{B:name} slides down into your lap without comment as you sit up, {B:his} back settling against your chest.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`As you sit upright, {B:name} shifts down and settles onto your lap facing away, letting you take {B:his} weight.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} settles back against you quietly, {B:his} hands resting on your knees.`,
  [playerA, isAccepting]);
lapSittingReversed.add(`{B:name} settles into your lap without complaint, {B:his} {B:cock.thickCock} lying between {B:his} thighs.`,
  [playerA, isAccepting, bVisibleCock]);
lapSittingReversed.add(`{B:name} slides down into your lap nervously, {B:his} back stiff against your chest as {B:he} settles.`,
  [playerA, isFearful]);
lapSittingReversed.add(`With a shaky breath, {B:name} lowers {B:him}self onto your lap, holding {B:him}self rigidly upright rather than leaning back into you.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name} trembles as {B:he} settles into your lap, flinching slightly as your arms come around {B:him}.`,
  [playerA, isFearful]);
lapSittingReversed.add(`{B:name's} {B:cock.sixInch} long {cock} trembles between {B:his} thighs as {B:he} nervously settles back against your chest.`,
  [playerA, isFearful, bVisibleCock]);
lapSittingReversed.add(`{B:name} grumbles as you sit up and pull {B:him} down into your lap, {B:his} back held stiffly away from your chest.`,
  [playerA, isResistant]);
lapSittingReversed.add(`With a huff, {B:name} settles onto your lap facing away, arms crossed and refusing to lean back into you.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} shifts grudgingly down into your lap, sitting bolt upright and unhappy between your arms.`,
  [playerA, isResistant]);
lapSittingReversed.add(`{B:name} settles reluctantly into your lap, {B:his} {B:cock.thickCock} hanging between {B:his} thighs.`,
  [playerA, isResistant, bVisibleCock]);
lapSittingReversed.add(`{B:name} thrashes as you sit up and drag {B:him} back into your lap, your arms locking around {B:him} from behind.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} struggles, but you haul {B:him} down into your lap anyway, pinning {B:his} back against your chest.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name} claws at your arms where they wrap around {B:him}, held fast in your lap with {B:his} back to your chest.`,
  [playerA, isViolent]);
lapSittingReversed.add(`{B:name's} {B:cock.thickCock} swings between {B:his} thighs as {B:he} fights your grip, dragged back against your chest.`,
  [playerA, isViolent, bVisibleCock]);
lapSittingReversed.add(`You slide down as {A:name} sits up behind you, {A:his} arms wrapping warmly around your waist as you settle back against {A:his} chest.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name} gathers you into {A:his} lap as {A:he} sits up, pressing a soft kiss to the back of your shoulder.`,
  [playerB, isLoving]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} presses warmly against your ass as {A:he} pulls you back into {A:his} lap, {A:his} chest firm against your back.`,
  [playerB, isLoving, aVisibleCock]);
lapSittingReversed.add(`{A:name's} {A:breasts.softBreasts} press warmly against your back as {A:he} settles you into {A:his} lap, facing away.`,
  [playerB, isLoving, aVisibleBreasts]);
lapSittingReversed.add(`{A:name} surges upright behind you, dragging you down into {A:his} lap and grinding up against your ass with a hungry moan.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name} pulls you back hard against {A:his} chest as you settle into {A:his} lap, {A:his} breath hot against your neck.`,
  [playerB, isLustful]);
lapSittingReversed.add(`{A:name's} {A:cock.bigHardCock} presses up between your cheeks as {A:he} pulls you eagerly down into {A:his} lap.`,
  [playerB, isLustful, aHardCock]);
lapSittingReversed.add(`{A:name's} {A:breasts.softBreasts} drag hotly against your back as {A:he} pulls you into {A:his} lap, moaning into your ear.`,
  [playerB, isLustful, aVisibleBreasts]);
lapSittingReversed.add(`You slide down as {A:name} sits up, settling into {A:his} lap with your back against {A:his} chest as {A:he} steadies you without comment.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} sits up behind you and lets you settle onto {A:his} lap, {A:his} hands resting loosely on your hips.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name} takes your weight without protest as you settle back against {A:his} chest.`,
  [playerB, isAccepting]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} rests against your ass as you settle into {A:his} lap without a word from {A:him}.`,
  [playerB, isAccepting, aVisibleCock]);
lapSittingReversed.add(`{A:name} sits up hesitantly beneath you, {A:his} hands hovering at your sides as you settle back against {A:his} chest.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} breath comes quick and shallow against the back of your neck as you settle into {A:his} lap.`,
  [playerB, isFearful]);
lapSittingReversed.add(`With a shaky breath, {A:name} sits up, holding very still as you lean back against {A:his} chest.`,
  [playerB, isFearful]);
lapSittingReversed.add(`{A:name's} {A:cock.sixInch} long {cock} trembles beneath your ass as {A:he} nervously lets you settle into {A:his} lap.`,
  [playerB, isFearful, aVisibleCock]);
lapSittingReversed.add(`{A:name} grumbles as you pull {A:him} upright behind you, sitting stiffly as you settle back into {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`With a huff, {A:name} sits up, {A:his} arms staying pointedly at {A:his} sides as you lean back against {A:his} chest.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name} turns {A:his} face aside, clearly unhappy as you settle back into {A:his} lap.`,
  [playerB, isResistant]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} shifts beneath your ass as {A:he} reluctantly lets you settle into {A:his} lap.`,
  [playerB, isResistant, aVisibleCock]);
lapSittingReversed.add(`{A:name} thrashes as you drag {A:him} upright, but you plant yourself in {A:his} lap, pinning {A:him} back with your weight.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} tries to shove you off, but you lean back hard against {A:his} chest, keeping {A:him} trapped beneath you.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name} snarls behind your ear, struggling uselessly as you settle your weight down into {A:his} lap.`,
  [playerB, isViolent]);
lapSittingReversed.add(`{A:name's} {A:cock.thickCock} is pinned beneath your ass as {A:he} struggles, unable to force you out of {A:his} lap.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving back to face-sitting: "a" stays the sitter, lifting up and turning around in place to face
// "b" again.
faceSitting.add(`You lift your hips and turn around above {B:name}, settling back down to find {B:him} smiling up at you from between your thighs.`,
  [playerA, isLoving]);
faceSitting.add(`{B:name} steadies your hips warmly as you swivel around atop {B:his} face, settling back down to meet {B:his} upturned eyes.`,
  [playerA, isLoving]);
faceSitting.add(`{B:name} hums happily against you as you turn around, {B:his} hands guiding you gently back down onto {B:his} mouth.`,
  [playerA, isLoving]);
faceSitting.add(`You turn around above {B:name}, trading the view of {B:his} {B:breasts.softBreasts} for {B:his} eyes smiling up at you.`,
  [playerA, isLoving, bVisibleBreasts]);
faceSitting.add(`{B:name} moans in protest as you lift away, {B:his} hands dragging your hips back down the moment you've turned to face {B:him}.`,
  [playerA, isLustful]);
faceSitting.add(`{B:name} grips your thighs hungrily as you swivel around atop {B:his} face, {B:his} eyes burning up at you as you settle back down.`,
  [playerA, isLustful]);
faceSitting.add(`{B:name} watches your {pussy} hungrily as you turn around above {B:him}, pulling your hips back down onto {B:his} mouth.`,
  [playerA, isLustful, aVisiblePussy]);
faceSitting.add(`{B:name's} {B:cock.bigHardCock} twitches against {B:his} stomach as you turn around to face {B:him}, settling back onto {B:his} eager mouth.`,
  [playerA, isLustful, bHardCock]);
faceSitting.add(`You lift up and turn around atop {B:name}, and {B:he} waits quietly until you settle back down, now facing {B:him}.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} holds still as you swivel around above {B:his} face, meeting your eyes calmly as you settle back into place.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} makes no complaint as you turn yourself around, {B:his} mouth finding you again once you've settled facing {B:him}.`,
  [playerA, isAccepting]);
faceSitting.add(`{B:name} lies patiently through the turn, {B:his} {B:cock.thickCock} resting against {B:his} stomach behind you as you settle facing {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
faceSitting.add(`{B:name's} breath catches as your weight lifts, {B:his} eyes going wide as you turn around and settle back down facing {B:him}.`,
  [playerA, isFearful]);
faceSitting.add(`{B:name} squeezes {B:his} eyes shut as you turn around above {B:him}, unable to meet your gaze looming over {B:his} face.`,
  [playerA, isFearful]);
faceSitting.add(`With a nervous swallow, {B:name} holds still through the turn, staring up at you anxiously as you settle back down.`,
  [playerA, isFearful]);
faceSitting.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as you turn around above {B:his} face, {B:his} nervous eyes following you.`,
  [playerA, isFearful, bVisibleCock]);
faceSitting.add(`{B:name} grumbles beneath you as you lift up and turn around, {B:his} scowl now aimed directly up at you.`,
  [playerA, isResistant]);
faceSitting.add(`{B:name} gets half a complaint out while your weight is lifted, silenced as you settle back down facing {B:him}.`,
  [playerA, isResistant]);
faceSitting.add(`With an annoyed huff, {B:name} glares up at you as you swivel around and settle back onto {B:his} face.`,
  [playerA, isResistant]);
faceSitting.add(`{B:name} shifts unhappily beneath you as you turn to face {B:him}, {B:his} {B:cock.thickCock} lying against {B:his} stomach behind you.`,
  [playerA, isResistant, bVisibleCock]);
faceSitting.add(`{B:name} bucks hard the moment your weight lifts, but you pin {B:his} chest and settle back down to meet {B:his} furious glare.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name} tries to wrench {B:his} head free mid-turn, but your thighs clamp tight, holding {B:him} still until you settle facing {B:him}.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name} thrashes beneath you as you turn around, {B:his} fury plain on {B:his} face as your weight settles back over {B:his} mouth.`,
  [playerA, isViolent]);
faceSitting.add(`{B:name's} {B:cock.thickCock} swings against {B:his} stomach as {B:he} bucks uselessly, your weight settling back down to face {B:his} glare.`,
  [playerA, isViolent, bVisibleCock]);
faceSitting.add(`{A:name} lifts up and turns around above you, and you find {A:him} smiling down at you as {A:he} settles back onto your mouth.`,
  [playerB, isLoving]);
faceSitting.add(`{A:name} swivels around carefully atop your face, brushing your hair back before lowering {A:him}self down, now gazing warmly down at you.`,
  [playerB, isLoving]);
faceSitting.add(`{A:name's} {A:cock.thickCock} swings past your face as {A:he} turns around, settling back down with {A:his} eyes soft on yours.`,
  [playerB, isLoving, aVisibleCock]);
faceSitting.add(`{A:name} turns to face you, {A:his} {A:breasts.softBreasts} swaying above as {A:he} settles back down onto your mouth.`,
  [playerB, isLoving, aVisibleBreasts]);
faceSitting.add(`{A:name} turns around eagerly atop your face, grinding back down onto your mouth with {A:his} hungry eyes fixed on yours.`,
  [playerB, isLustful]);
faceSitting.add(`{A:name} spins around with a needy moan, {A:his} hips grinding down before {A:he} has even fully settled.`,
  [playerB, isLustful]);
faceSitting.add(`{A:name's} soaked {pussy} drags across your mouth as {A:he} turns to face you, grinding down with a hungry moan.`,
  [playerB, isLustful, aVisiblePussy]);
faceSitting.add(`{A:name's} {A:cock.bigHardCock} bobs past your face as {A:he} turns around, {A:his} eager eyes finding yours as {A:he} settles.`,
  [playerB, isLustful, aHardCock]);
faceSitting.add(`{A:name} lifts up and turns around without comment, settling back down onto your face, now looking down at you.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name} swivels around atop you, lowering {A:him}self back onto your mouth without protest.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name} shifts {A:his} weight and turns {A:him}self around above you, settling back down now facing you.`,
  [playerB, isAccepting]);
faceSitting.add(`{A:name's} {A:breasts.softBreasts} sway above your face as {A:he} turns around and settles quietly back into place.`,
  [playerB, isAccepting, aVisibleBreasts]);
faceSitting.add(`{A:name} turns around above you hesitantly, {A:his} eyes dropping away from yours as {A:he} lowers {A:him}self back down.`,
  [playerB, isFearful]);
faceSitting.add(`{A:name} wobbles nervously through the turn, {A:his} thighs trembling against your cheeks now that {A:he} has to face you.`,
  [playerB, isFearful]);
faceSitting.add(`With a shaky breath, {A:name} swivels around atop your face, unable to hold your gaze as {A:he} eases back down.`,
  [playerB, isFearful]);
faceSitting.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} nervously turns to face you, settling back onto your mouth.`,
  [playerB, isFearful, aVisibleCock]);
faceSitting.add(`{A:name} grumbles as you turn {A:him} around by the hips, scowling down at you now that {A:he} has to face you.`,
  [playerB, isResistant]);
faceSitting.add(`With a huff, {A:name} turns {A:him}self around above you, {A:his} glare fixed somewhere over your head as {A:he} settles.`,
  [playerB, isResistant]);
faceSitting.add(`{A:name} mutters something sour as {A:he} swivels around, refusing to look down at you as {A:he} lowers {A:him}self back onto your mouth.`,
  [playerB, isResistant]);
faceSitting.add(`{A:name's} {A:cock.thickCock} sways as {A:he} reluctantly turns to face you, settling back down onto your mouth.`,
  [playerB, isResistant, aVisibleCock]);
faceSitting.add(`{A:name} tries to pull away the moment {A:he} lifts up, but your grip on {A:his} hips forces {A:him} around to face you and back down onto your mouth.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name} thrashes through the turn, glaring furiously down at you as your hands drag {A:him} back down.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name} snarls down at you, fighting your hold the whole way around before you haul {A:his} ass back onto your mouth.`,
  [playerB, isViolent]);
faceSitting.add(`{A:name's} {A:cock.thickCock} swings wildly as {A:he} fights the turn, but you drag {A:him} back down to face you anyway.`,
  [playerB, isViolent, aVisibleCock]);

// No swap moving into sixty-nine: "a" stays on top, folding forward from sitting upright to stretch out along
// "b's" body, mouth to crotch.
sixtyNine.add(`You lean forward over {B:name}, stretching out along {B:his} body until your face hovers over {B:his} crotch, {B:his} arms wrapping warmly around your hips.`,
  [playerA, isLoving]);
sixtyNine.add(`{B:name} hums happily beneath you as you fold forward, {B:his} hands settling gently on your ass as your mouth lowers between {B:his} thighs.`,
  [playerA, isLoving]);
sixtyNine.add(`{B:name} sighs contentedly as you stretch out along {B:him}, {B:his} {B:cock.thickCock} resting just below your descending face.`,
  [playerA, isLoving, bVisibleCock]);
sixtyNine.add(`{B:name} parts {B:his} thighs for you as you lean forward along {B:his} body, {B:his} {pussy} warm beneath your breath.`,
  [playerA, isLoving, bVisiblePussy]);
sixtyNine.add(`{B:name} moans into you as you lean forward, {B:his} hips bucking up eagerly to meet your descending mouth.`,
  [playerA, isLustful]);
sixtyNine.add(`{B:name} groans with need as you stretch out over {B:him}, {B:his} hands kneading your ass as your face lowers between {B:his} thighs.`,
  [playerA, isLustful]);
sixtyNine.add(`{B:name's} {B:cock.bigHardCock} strains upward as you fold forward over {B:him}, eager for your descending mouth.`,
  [playerA, isLustful, bHardCock]);
sixtyNine.add(`{B:name} tilts {B:his} hips up hungrily as you lean forward, presenting {B:his} soaked {pussy} to your descending mouth.`,
  [playerA, isLustful, bVisiblePussy]);
sixtyNine.add(`You lean forward over {B:name}, stretching out along {B:his} body without protest from {B:him}, your face settling over {B:his} crotch.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name} lies still as you fold forward along {B:his} body, {B:his} thighs parting to make room for your face.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name} makes no complaint as you stretch out over {B:him}, the two of you settling mouth to crotch.`,
  [playerA, isAccepting]);
sixtyNine.add(`{B:name} waits quietly as you lean down along {B:his} body, {B:his} {B:cock.thickCock} resting beneath your chin.`,
  [playerA, isAccepting, bVisibleCock]);
sixtyNine.add(`{B:name} tenses beneath you as you lean forward, {B:his} breath quickening against your ass as your face lowers toward {B:his} crotch.`,
  [playerA, isFearful]);
sixtyNine.add(`{B:name} trembles as you stretch out along {B:his} body, {B:his} thighs twitching nervously apart beneath your descending mouth.`,
  [playerA, isFearful]);
sixtyNine.add(`With a muffled, nervous sound, {B:name} holds still as you fold forward over {B:him}.`,
  [playerA, isFearful]);
sixtyNine.add(`{B:name's} {B:cock.sixInch} long {cock} trembles beneath your face as you stretch out along {B:his} nervous body.`,
  [playerA, isFearful, bVisibleCock]);
sixtyNine.add(`{B:name} grumbles beneath you as you lean forward, {B:his} thighs staying stubbornly together until you nudge them apart.`,
  [playerA, isResistant]);
sixtyNine.add(`{B:name} shifts unhappily as you stretch out along {B:him}, {B:his} complaint muffled beneath your hips.`,
  [playerA, isResistant]);
sixtyNine.add(`With a huff you can feel more than hear, {B:name} endures it as you fold forward, your face settling between {B:his} thighs.`,
  [playerA, isResistant]);
sixtyNine.add(`{B:name} squirms reluctantly beneath you, {B:his} {B:cock.thickCock} lying against {B:his} stomach beneath your descending face.`,
  [playerA, isResistant, bVisibleCock]);
sixtyNine.add(`{B:name} bucks and thrashes as you lean forward over {B:him}, but your weight pins {B:his} hips as your face lowers between {B:his} thighs.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name} struggles beneath you as you stretch out along {B:his} body, {B:his} kicking legs pinned beneath your arms.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name} snarls into you as you fold forward, {B:his} whole body straining uselessly beneath your weight.`,
  [playerA, isViolent]);
sixtyNine.add(`{B:name's} {B:cock.thickCock} jerks against {B:his} stomach as {B:he} bucks beneath you, your face lowering toward it regardless.`,
  [playerA, isViolent, bVisibleCock]);
sixtyNine.add(`{A:name} leans forward above you, stretching out warmly along your body until {A:his} mouth hovers just over your crotch.`,
  [playerB, isLoving]);
sixtyNine.add(`{A:name} folds down over you with a contented hum, {A:his} thighs still framing your face as {A:his} lips brush your inner thigh.`,
  [playerB, isLoving]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} presses down against your chin as {A:he} stretches out along your body, {A:his} breath warm between your thighs.`,
  [playerB, isLoving, aVisibleCock]);
sixtyNine.add(`{A:name's} {A:breasts.softBreasts} press softly against your stomach as {A:he} stretches out along you, settling mouth to crotch.`,
  [playerB, isLoving, aVisibleBreasts]);
sixtyNine.add(`{A:name} dives forward with a hungry moan, {A:his} ass grinding down on your face as {A:his} mouth descends eagerly between your thighs.`,
  [playerB, isLustful]);
sixtyNine.add(`{A:name} stretches out over you with a groan of anticipation, {A:his} breath coming hot and quick against your crotch.`,
  [playerB, isLustful]);
sixtyNine.add(`{A:name's} {A:cock.bigHardCock} drags down your chin as {A:he} leans forward eagerly, {A:his} mouth hot against your thigh.`,
  [playerB, isLustful, aHardCock]);
sixtyNine.add(`{A:name} grinds {A:his} soaked {pussy} down against your mouth as {A:he} folds forward, stretching out hungrily along your body.`,
  [playerB, isLustful, aVisiblePussy]);
sixtyNine.add(`{A:name} leans forward without comment, stretching out along your body until the two of you are aligned mouth to crotch.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name} folds down over you quietly, {A:his} weight settling along your body.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name} stretches out along you without protest, {A:his} face coming to rest above your crotch.`,
  [playerB, isAccepting]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} settles against your chin as {A:he} leans forward, stretching out along your body without a word.`,
  [playerB, isAccepting, aVisibleCock]);
sixtyNine.add(`{A:name} leans forward hesitantly, {A:his} whole body tense as {A:he} stretches out along you, {A:his} breath unsteady against your thigh.`,
  [playerB, isFearful]);
sixtyNine.add(`{A:name} lowers {A:him}self nervously over your body, {A:his} thighs trembling around your face as {A:he} folds forward.`,
  [playerB, isFearful]);
sixtyNine.add(`With a shaky breath, {A:name} stretches out along you, {A:his} face hovering uncertainly over your crotch.`,
  [playerB, isFearful]);
sixtyNine.add(`{A:name's} {A:cock.sixInch} long {cock} trembles against your chin as {A:he} nervously leans forward along your body.`,
  [playerB, isFearful, aVisibleCock]);
sixtyNine.add(`{A:name} grumbles as you press a hand to {A:his} back, urging {A:him} down until {A:he} grudgingly stretches out along your body.`,
  [playerB, isResistant]);
sixtyNine.add(`With a muffled huff, {A:name} folds forward over you, {A:his} reluctance plain in every stiff movement.`,
  [playerB, isResistant]);
sixtyNine.add(`{A:name} lowers {A:him}self over your body with obvious reluctance, {A:his} face stopping well short of your crotch until you pull {A:him} closer.`,
  [playerB, isResistant]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} shifts against your chin as {A:he} reluctantly stretches out along you.`,
  [playerB, isResistant, aVisibleCock]);
sixtyNine.add(`{A:name} thrashes atop you as you force {A:him} forward, your hand firm on {A:his} back until {A:he} is stretched out along your body.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name} fights the whole way down, but you press {A:him} flat along your body, {A:his} furious snarls muffled between your thighs.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name} claws at your legs as you force {A:him} forward, {A:his} body pinned stretched out along yours despite the struggling.`,
  [playerB, isViolent]);
sixtyNine.add(`{A:name's} {A:cock.thickCock} grinds against your chin as {A:he} struggles, forced down along your body regardless.`,
  [playerB, isViolent, aVisibleCock]);
