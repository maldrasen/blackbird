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

const rearrange = WeaverPackage('centipede.rearrange');
const doggyStyle = WeaverPackage('centipede.move-to-doggy-style');
const kneelingService = WeaverPackage('centipede.move-to-kneeling-service');
const missionary = WeaverPackage('centipede.move-to-missionary-reversed');
const straddle = WeaverPackage('centipede.move-to-straddle');

// First kneeling behind second with face against second's ass. Second bent
// over in front of first. (Rimming and milking handjob position)
SexPosition.register('centipede',{
  name: 'Centipede',

  // Technically can suck cock in this position, but it's weird, having to pull
  // the cock backwards behind the person. Action text will need to consider
  // current position as well as attitude and everything else.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
    },
    second: {
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  // We can move from standing reversed to centipede, but not back to standing.
  moves:[
    { code:'doggy-style', package:doggyStyle },
    { code:'kneeling-service', package:kneelingService, swap:true },
    { code:'missionary-reversed', package:missionary },
    { code:'straddle', package:straddle },
  ],

  rearrangePackage: rearrange,
});

// There are deliberately no options for the player bending over (as B) in front of a fearful, resistant, or violent
// partner. Having the player voluntarily bend over in front of an unwilling partner seems incompatible.

rearrange.add(`Gently placing your hand on {B:name's} back, you guide {B:him} down into a kneeling position in front of you. {B:He} settles down affectionately, raising {B:his} ass for you as you kneel behind {B:him}, pressing your face between {B:his} ass cheeks.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} smiles and lowers {B:him}self to {B:his} knees, eager for your attention as you settle in behind {B:him}, pressing a kiss to each cheek of {B:his} ass.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} bends over affectionately, {B:his} {B:cock.thickCock} swaying gently between {B:his} legs as you kneel behind {B:him}.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} lowers {B:him}self down, {B:his} {B:breasts.softBreasts} swaying gently beneath {B:him} as you settle behind {B:him}, pressing your face to {B:his} ass.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} drops eagerly to {B:his} knees, arching {B:his} back and spreading {B:his} thighs the moment you guide {B:him} down.`,
  [playerA, isLustful]);
rearrange.add(`With a needy moan, {B:name} lowers {B:him}self in front of you, presenting {B:his} ass as you kneel behind {B:him}.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} spreads {B:his} legs eagerly, {B:his} soaked {pussy} glistening as you kneel behind {B:him}.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} moans as {B:he} bends over, {B:his} {B:cock.bigHardCock} bobbing between {B:his} legs as you settle in behind {B:him}.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`Gently placing your hand on {B:name's} back, you push {B:him} down into a kneeling position in front of you. Then, once {B:his} ass is raised, you kneel behind {B:him}, pressing your face between {B:his} ass cheeks.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} lowers {B:him}self onto {B:his} knees without complaint, letting you settle in behind {B:him}.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} bends over, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs, as you kneel behind {B:him}.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} bends over, {B:his} {pussy} visible between {B:his} legs, as you kneel behind {B:him}.`,
  [playerA, isAccepting, bVisiblePussy]);
rearrange.add(`{B:name} lowers {B:him}self onto {B:his} knees nervously, {B:his} body tense as you settle in behind {B:him}.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} kneels down, unsure what to expect as you press your face to {B:his} ass.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously bends over for you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles, reluctantly raising {B:his} ass as you push {B:him} down into a kneeling position.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} lowers {B:him}self to {B:his} knees, clearly unhappy about it.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} bends over reluctantly, {B:his} {B:cock.thickCock} swaying as {B:he} settles unhappily into position.`,
  [playerA, isResistant, bVisibleCock]);
rearrange.add(`{B:name} thrashes as you force {B:him} down onto {B:his} knees, pinning {B:his} hips still as you press your face to {B:his} ass.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you shove {B:him} down onto {B:his} knees anyway, forcing {B:his} ass up toward you.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} thrashes, {B:his} {B:cock.thickCock} swinging wildly as you force {B:him} into position.`,
  [playerA, isViolent, bVisibleCock]);
rearrange.add(`You slowly bend over in front of {A:name}. {A:He} watches with obvious affection as you raise your ass, then kneels behind you, pressing a gentle kiss between your cheeks.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} smiles warmly as you lower yourself onto your knees, settling in behind you and pressing {A:his} face lovingly against your ass.`,
  [playerB, isLoving]);
rearrange.add(`You bend over, your {B:cock.thickCock} swaying gently between your legs as {A:name} kneels affectionately behind you.`,
  [playerB, isLoving, bVisibleCock]);
rearrange.add(`You lower yourself down, your {B:breasts.softBreasts} swaying gently beneath you as {A:name} settles affectionately behind you, pressing {A:his} face to your ass.`,
  [playerB, isLoving, bVisibleBreasts]);
rearrange.add(`You slowly bend over in front of {A:name}. {A:He} watches hungrily as you raise your ass, then kneels behind you, pushing {A:his} face between your cheeks.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} licks {A:his} lips as you lower yourself onto your knees, quickly settling in behind you to bury {A:his} face against your ass.`,
  [playerB, isLustful]);
rearrange.add(`You spread your legs, baring your {pussy} as {A:name} kneels hungrily behind you.`,
  [playerB, isLustful, bVisiblePussy]);
rearrange.add(`Your {B:cock.bigHardCock} bobs between your legs as you bend over, {A:name} settling in eagerly behind you.`,
  [playerB, isLustful, bHardCock]);
rearrange.add(`You bend over in front of {A:name}, and {A:he} kneels behind you without comment, pressing {A:his} face to your ass.`,
  [playerB, isAccepting]);
rearrange.add(`You lower yourself onto your knees, and {A:name} settles in behind you without comment.`,
  [playerB, isAccepting]);
rearrange.add(`You bend over, your {B:cock.thickCock} hanging plainly between your legs, as {A:name} kneels behind you.`,
  [playerB, isAccepting, bVisibleCock]);
rearrange.add(`You bend over, your {pussy} visible between your legs, as {A:name} kneels behind you.`,
  [playerB, isAccepting, bVisiblePussy]);



doggyStyle.add(`You raise up behind {B:name}, taking hold of {B:his} hips as {B:he} arches {B:his} back invitingly for you.`,
  [playerA, isLoving]);
doggyStyle.add(`{B:name} shifts eagerly, keeping {B:his} ass raised as you rise up and take hold of {B:his} hips.`,
  [playerA, isLoving]);
doggyStyle.add(`You raise up behind {B:name}, grabbing {B:his} hips as {B:his} {B:cock.thickCock} sways gently between {B:his} legs.`,
  [playerA, isLoving, bVisibleCock]);
doggyStyle.add(`{B:name} arches {B:his} back, {B:his} {B:breasts.softBreasts} swaying as you raise up and take hold of {B:his} hips.`,
  [playerA, isLoving, bVisibleBreasts]);
doggyStyle.add(`{B:name} moans as you rise up behind {B:him}, pressing {B:his} hips back into your grip eagerly.`,
  [playerA, isLustful]);
doggyStyle.add(`You raise up behind {B:name}, grabbing {B:his} hips and letting your {A:cock.sixInch} long {cock} rest against the swell of {B:his} upturned ass.`,
  [playerA, isLustful, aVisibleCock]);
doggyStyle.add(`{B:name} arches {B:his} back, {B:his} soaked {pussy} on full display as you rise up behind {B:him}.`,
  [playerA, isLustful, bVisiblePussy]);
doggyStyle.add(`{B:name's} {B:cock.bigHardCock} bounces as you raise up behind {B:him}, gripping {B:his} hips.`,
  [playerA, isLustful, bHardCock]);
doggyStyle.add(`You raise up and grab {B:name's} hips, positioning yourself behind {B:him}.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} stays in position without complaint as you rise up and take hold of {B:his} hips.`,
  [playerA, isAccepting]);
doggyStyle.add(`{B:name} stays in position, {B:his} {B:cock.thickCock} hanging between {B:his} legs, as you raise up and take hold of {B:his} hips.`,
  [playerA, isAccepting, bVisibleCock]);
doggyStyle.add(`{B:name} stays in position, {B:his} {pussy} visible between {B:his} legs, as you rise up behind {B:him}.`,
  [playerA, isAccepting, bVisiblePussy]);
doggyStyle.add(`{B:name} stays bent over nervously as you rise up and take hold of {B:his} hips.`,
  [playerA, isFearful]);
doggyStyle.add(`With a shaky breath, {B:name} holds {B:his} position as you grab {B:his} hips.`,
  [playerA, isFearful]);
doggyStyle.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as you rise up and take hold of {B:his} hips.`,
  [playerA, isFearful, bVisibleCock]);
doggyStyle.add(`{B:name} grumbles as you rise up and grab {B:his} hips, staying reluctantly in position.`,
  [playerA, isResistant]);
doggyStyle.add(`With a huff, {B:name} holds still as you take hold of {B:his} hips.`,
  [playerA, isResistant]);
doggyStyle.add(`{B:name} holds still reluctantly, {B:his} {B:cock.thickCock} swaying as you take hold of {B:his} hips.`,
  [playerA, isResistant, bVisibleCock]);
doggyStyle.add(`{B:name} thrashes as you rise up and grab {B:his} hips, holding {B:him} in place.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} struggles, but you pull {B:his} hips back into position anyway.`,
  [playerA, isViolent]);
doggyStyle.add(`{B:name} thrashes, {B:his} {B:cock.thickCock} swinging as you rise up and grab {B:his} hips.`,
  [playerA, isViolent, bVisibleCock]);
doggyStyle.add(`{A:name} raises up and grabs your hips affectionately, positioning {A:him}self behind you.`,
  [playerB, isLoving]);
doggyStyle.add(`You feel {A:name} rise up behind you, {A:his} hands gentle on your hips.`,
  [playerB, isLoving]);
doggyStyle.add(`You feel {A:name} raising up behind you, grabbing your hips and letting {A:his} {A:cock.sixInch} long {cock} rest against the swell of your upturned ass.`,
  [playerB, isLoving, aVisibleCock]);
doggyStyle.add(`You feel {A:name's} {A:breasts.softBreasts} press warmly against your back as {A:he} rises up behind you.`,
  [playerB, isLoving, aVisibleBreasts]);
doggyStyle.add(`{A:name} growls with want as {A:he} rises up behind you, gripping your hips hard.`,
  [playerB, isLustful]);
doggyStyle.add(`You feel {A:name} rise up eagerly behind you, {A:his} grip tightening on your hips.`,
  [playerB, isLustful]);
doggyStyle.add(`{A:name} rises up behind you, letting {A:his} {A:cock.bigCock} rest heavily against the swell of your upturned ass.`,
  [playerB, isLustful, aVisibleCock]);
doggyStyle.add(`{A:name's} {A:breasts.softBreasts} drag against your back as {A:he} rises up hungrily behind you.`,
  [playerB, isLustful, aVisibleBreasts]);
doggyStyle.add(`{A:name} raises up and grabs your hips, positioning {A:him}self behind you.`,
  [playerB, isAccepting]);
doggyStyle.add(`You feel {A:name} rise up behind you without comment, taking hold of your hips.`,
  [playerB, isAccepting]);
doggyStyle.add(`{A:name} rises up, {A:his} {A:cock.thickCock} hanging behind you, as {A:he} takes hold of your hips.`,
  [playerB, isAccepting, aVisibleCock]);



// Moving into kneeling-service, "a" is always the one rising from bent-over to standing (was the receiver in
// centipede), while "b" stays on their knees behind them (was already kneeling, giving oral, in centipede).
kneelingService.add(`As you rise to your feet, {B:name} stays close behind, keeping {B:his} face affectionately pressed between your cheeks the whole way up.`,
  [playerA, isLoving]);
kneelingService.add(`You slowly stand, and {B:name} follows eagerly on {B:his} knees, refusing to lose contact with your ass.`,
  [playerA, isLoving]);
kneelingService.add(`As you rise, your {A:cock.thickCock} swaying with the motion, {B:name} keeps {B:his} face pressed affectionately to your ass.`,
  [playerA, isLoving, aVisibleCock]);
kneelingService.add(`Your {A:breasts.softBreasts} sway as you stand, {B:name} following closely, {B:his} face still pressed to your ass.`,
  [playerA, isLoving, aVisibleBreasts]);
kneelingService.add(`You rise to your feet as {B:name} moans, keeping {B:his} face pressed hungrily against your ass the whole way up.`,
  [playerA, isLustful]);
kneelingService.add(`{B:name} follows you up eagerly on {B:his} knees, unwilling to break contact as you stand.`,
  [playerA, isLustful]);
kneelingService.add(`Your {A:cock.bigHardCock} bounces as you rise, {B:name} moaning against your ass the whole way up.`,
  [playerA, isLustful, aHardCock]);
kneelingService.add(`Your {pussy} is bared as you rise, {B:name} moaning hungrily against it.`,
  [playerA, isLustful, aVisiblePussy]);
kneelingService.add(`You rise to your feet, and {B:name} follows on {B:his} knees without complaint, keeping {B:his} face against your ass.`,
  [playerA, isAccepting]);
kneelingService.add(`{B:name} stays close behind as you stand, keeping {B:his} face pressed to your ass without protest.`,
  [playerA, isAccepting]);
kneelingService.add(`Your {A:cock.thickCock} sways gently as you rise to your feet, {B:name} following on {B:his} knees without complaint.`,
  [playerA, isAccepting, aVisibleCock]);
kneelingService.add(`You rise to your feet as {B:name} nervously stays close, keeping {B:his} face pressed to your ass.`,
  [playerA, isFearful]);
kneelingService.add(`{B:name} follows on {B:his} knees with a shaky breath, unsure what's expected as you stand.`,
  [playerA, isFearful]);
kneelingService.add(`Your {A:cock.sixInch} long {cock} sways as you rise, {B:name} nervously staying close behind.`,
  [playerA, isFearful, aVisibleCock]);
kneelingService.add(`{B:name} grumbles but stays on {B:his} knees as you rise to your feet, keeping {B:his} face reluctantly pressed to your ass.`,
  [playerA, isResistant]);
kneelingService.add(`With a huff, {B:name} follows you up, clearly unhappy about staying in position.`,
  [playerA, isResistant]);
kneelingService.add(`Your {A:cock.thickCock} sways gently as you rise, {B:name} grumbling reluctantly but staying close.`,
  [playerA, isResistant, aVisibleCock]);
kneelingService.add(`{B:name} struggles as you rise, but you hold {B:his} head in place, forcing {B:him} to stay pressed to your ass.`,
  [playerA, isViolent]);
kneelingService.add(`{B:name} tries to pull away, but you keep a firm grip, forcing {B:him} to follow you up on {B:his} knees.`,
  [playerA, isViolent]);
kneelingService.add(`Your {A:cock.thickCock} swings as you struggle to rise, {B:name} forced to stay pressed to your ass.`,
  [playerA, isViolent, aVisibleCock]);
kneelingService.add(`{A:name} rises slowly to {A:his} feet, taking care not to pull away from you as you follow on your knees, your face still pressed between {A:his} cheeks.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name} stands slowly, glancing back at you with a warm smile as you stay close behind on your knees.`,
  [playerB, isLoving]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways as {A:he} rises slowly, careful not to break the contact of your face against {A:his} ass.`,
  [playerB, isLoving, aVisibleCock]);
kneelingService.add(`{A:name's} {A:breasts.softBreasts} sway gently as {A:he} stands, {A:his} pace unhurried so you can follow, your face still pressed to {A:his} ass.`,
  [playerB, isLoving, aVisibleBreasts]);
kneelingService.add(`{A:name} rises to {A:his} feet with a needy groan, grinding {A:his} ass back against your face as you follow on your knees.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name} stands slowly, clearly savoring the drag of your face against {A:his} ass as you follow on your knees.`,
  [playerB, isLustful]);
kneelingService.add(`{A:name's} {A:cock.bigHardCock} bounces as {A:he} rises with an eager moan, your face still pressed to {A:his} ass.`,
  [playerB, isLustful, aHardCock]);
kneelingService.add(`{A:name's} glistening {pussy} is bared as {A:he} rises with a hungry moan, pressing back against your face.`,
  [playerB, isLustful, aVisiblePussy]);
kneelingService.add(`{A:name} rises to {A:his} feet without comment, and you follow on your knees, keeping your face against {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name} stands without protest, holding still as you stay close behind, your face pressed to {A:his} ass.`,
  [playerB, isAccepting]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways gently as {A:he} rises to {A:his} feet without complaint, and you follow on your knees.`,
  [playerB, isAccepting, aVisibleCock]);
kneelingService.add(`{A:name} rises to {A:his} feet nervously, and you stay close on your knees, keeping your face pressed to {A:his} ass.`,
  [playerB, isFearful]);
kneelingService.add(`With {A:his} breath shaky, {A:name} rises to {A:his} feet as you follow closely on your knees.`,
  [playerB, isFearful]);
kneelingService.add(`{A:name's} {A:cock.sixInch} long {cock} trembles as {A:he} rises nervously, and you stay close behind.`,
  [playerB, isFearful, aVisibleCock]);
kneelingService.add(`{A:name} grumbles as {A:he} rises to {A:his} feet, and you stay reluctantly on your knees, keeping your face pressed to {A:his} ass.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name} huffs, clearly unhappy about standing, as you follow closely on your knees.`,
  [playerB, isResistant]);
kneelingService.add(`{A:name's} {A:cock.thickCock} sways as {A:he} grumbles and rises reluctantly, and you stay close.`,
  [playerB, isResistant, aVisibleCock]);
kneelingService.add(`{A:name} struggles as {A:he} rises, trying to twist away, but you hold {A:his} hips firmly, keeping your face pressed against {A:his} ass.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name} tries to pull away, but you keep a firm grip on {A:his} hips, following {A:him} up on your knees.`,
  [playerB, isViolent]);
kneelingService.add(`{A:name's} {A:cock.thickCock} swings as {A:he} struggles to rise, unable to pull {A:his} ass free of your grip.`,
  [playerB, isViolent, aVisibleCock]);



missionary.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach with a contented sigh as you settle on top of {B:him}.`,
  [playerA, isLoving]);
missionary.add(`With obvious affection, {B:name} stretches out beneath you, letting you cover {B:his} body with your own.`,
  [playerA, isLoving]);
missionary.add(`{B:name} lowers {B:him}self flat as you settle on top, your {A:cock.thickCock} resting warmly against {B:his} lower back.`,
  [playerA, isLoving, aVisibleCock]);
missionary.add(`Your {A:breasts.softBreasts} press against {B:his} back as you settle on top of {B:name}.`,
  [playerA, isLoving, aVisibleBreasts]);
missionary.add(`{B:name} moans and lowers {B:him}self flat, arching {B:his} hips up as you settle on top of {B:him}.`,
  [playerA, isLustful]);
missionary.add(`Eager for more, {B:name} spreads out beneath you, pressing back against you as you lower yourself onto {B:his} back.`,
  [playerA, isLustful]);
missionary.add(`{B:name} moans as you settle on top, your {A:cock.bigHardCock} pressing against {B:his} lower back.`,
  [playerA, isLustful, aHardCock]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped beneath {B:him} as you settle on top, and {B:he} grinds back against you eagerly.`,
  [playerA, isLustful, bVisibleCock]);
missionary.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint, letting you settle on top of {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`Without protest, {B:name} stretches out beneath you.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lies flat without complaint as you settle on top, your {A:cock.thickCock} resting against {B:his} back.`,
  [playerA, isAccepting, aVisibleCock]);
missionary.add(`{B:name} lowers {B:him}self flat nervously, {B:his} body tense as you settle on top of {B:him}.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} lies down beneath you.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you settle on top of {B:him}.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles as {B:he} lowers {B:him}self flat, reluctantly letting you settle on top of {B:him}.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} lies down beneath you, clearly unhappy about it.`,
  [playerA, isResistant]);
missionary.add(`{B:name} settles down reluctantly, {B:his} {B:cock.thickCock} shifting beneath {B:him} as you settle on top.`,
  [playerA, isResistant, bVisibleCock]);
missionary.add(`{B:name} thrashes as you force {B:him} down flat, pinning {B:him} beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name} struggles, but you push {B:him} down onto {B:his} stomach and settle on top anyway.`,
  [playerA, isViolent]);
missionary.add(`{B:name's} {B:cock.thickCock} is trapped as {B:he} thrashes beneath you, pinned to the bed.`,
  [playerA, isViolent, bVisibleCock]);
missionary.add(`You lower yourself flat, and {A:name} settles warmly on top of you, nuzzling the back of your neck.`,
  [playerB, isLoving]);
missionary.add(`{A:name} covers your body with {A:his} own affectionately as you stretch out beneath {A:him}.`,
  [playerB, isLoving]);
missionary.add(`{A:name} settles on top of you, {A:his} {A:cock.thickCock} resting warmly against your lower back.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`{A:name's} {A:breasts.softBreasts} press against your back as {A:he} settles affectionately on top of you.`,
  [playerB, isLoving, aVisibleBreasts]);
missionary.add(`You lower yourself flat, and {A:name} settles on top of you eagerly, grinding {A:his} hips down with a needy moan.`,
  [playerB, isLustful]);
missionary.add(`{A:name} presses down against you hungrily as you spread out beneath {A:him}.`,
  [playerB, isLustful]);
missionary.add(`{A:name} settles on top of you with a moan, {A:his} {A:cock.bigHardCock} pressing eagerly against your lower back.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`Your {B:cock.thickCock} is trapped beneath you as {A:name} settles eagerly on top, grinding against your ass.`,
  [playerB, isLustful, bVisibleCock]);
missionary.add(`You lower yourself flat, and {A:name} settles on top of you without comment.`,
  [playerB, isAccepting]);
missionary.add(`You stretch out flat, and {A:name} settles down onto your back without protest.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} settles on top of you without complaint, {A:his} {A:cock.thickCock} resting against your back.`,
  [playerB, isAccepting, aVisibleCock]);
missionary.add(`{A:name} settles on top of you nervously, {A:his} body tense.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} lies down flat on top of you.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles nervously as {A:he} settles on top of you.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles as {A:he} lowers {A:him}self on top of you, reluctantly settling into place.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} lies down on top of you, clearly unhappy about it.`,
  [playerB, isResistant]);
missionary.add(`{A:name's} {A:cock.thickCock} shifts as {A:he} settles reluctantly on top of you.`,
  [playerB, isResistant, aVisibleCock]);
missionary.add(`{A:name} thrashes as you pull {A:him} down on top of you anyway, {A:his} struggles doing nothing to stop you.`,
  [playerB, isViolent]);
missionary.add(`{A:name} struggles, but you keep pulling {A:him} down on top of you regardless.`,
  [playerB, isViolent]);
missionary.add(`{A:name's} {A:cock.thickCock} is trapped as {A:he} thrashes on top of you, unable to break free.`,
  [playerB, isViolent, aVisibleCock]);



straddle.add(`You climb up onto {B:name's} back, straddling {B:his} waist as {B:he} settles down flat with a contented sigh.`,
  [playerA, isLoving]);
straddle.add(`{B:name} lowers {B:him}self onto {B:his} stomach affectionately as you rise up and swing a leg over {B:his} hips.`,
  [playerA, isLoving]);
straddle.add(`You climb up onto {B:name's} back, your {A:cock.thickCock} resting warmly along {B:his} spine as {B:he} settles down flat beneath you.`,
  [playerA, isLoving, aVisibleCock]);
straddle.add(`Your {A:breasts.softBreasts} press against {B:his} back as you settle astride {B:name's} hips, and {B:he} sighs contentedly beneath you.`,
  [playerA, isLoving, aVisibleBreasts]);
straddle.add(`{B:name} moans as {B:he} lowers {B:him}self flat, arching {B:his} back as you climb up to straddle {B:his} waist.`,
  [playerA, isLustful]);
straddle.add(`Eager for more, {B:name} spreads out beneath you as you rise up and settle astride {B:his} hips.`,
  [playerA, isLustful]);
straddle.add(`{B:name} moans as you climb up, your {A:cock.bigHardCock} dragging along {B:his} back as you settle astride {B:his} hips.`,
  [playerA, isLustful, aHardCock]);
straddle.add(`{B:name's} {B:cock.thickCock} is trapped beneath {B:him} as you climb up to straddle {B:his} waist, and {B:he} presses back up against you with a needy moan.`,
  [playerA, isLustful, bVisibleCock]);
straddle.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint as you climb up to straddle {B:his} waist.`,
  [playerA, isAccepting]);
straddle.add(`Without protest, {B:name} stretches out beneath you as you settle astride {B:his} hips.`,
  [playerA, isAccepting]);
straddle.add(`{B:name} holds still without complaint as you climb up to straddle {B:his} waist, your {A:cock.thickCock} resting along {B:his} back.`,
  [playerA, isAccepting, aVisibleCock]);
straddle.add(`{B:name} lowers {B:him}self flat nervously as you climb up to straddle {B:his} waist.`,
  [playerA, isFearful]);
straddle.add(`With a shaky breath, {B:name} lies down flat as you settle astride {B:his} hips.`,
  [playerA, isFearful]);
straddle.add(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you climb up to straddle {B:his} waist.`,
  [playerA, isFearful, bVisibleCock]);
straddle.add(`{B:name} grumbles as {B:he} lowers {B:him}self flat, reluctantly letting you climb up to straddle {B:his} waist.`,
  [playerA, isResistant]);
straddle.add(`With a huff, {B:name} lies down as you settle astride {B:his} hips.`,
  [playerA, isResistant]);
straddle.add(`{B:name} lies down reluctantly, {B:his} {B:cock.thickCock} shifting beneath {B:him} as you climb up to straddle {B:his} waist.`,
  [playerA, isResistant, bVisibleCock]);
straddle.add(`{B:name} thrashes as you force {B:him} down flat, climbing up to straddle {B:his} waist regardless.`,
  [playerA, isViolent]);
straddle.add(`{B:name} struggles, but you push {B:him} down and settle astride {B:his} hips anyway.`,
  [playerA, isViolent]);
straddle.add(`{B:name's} {B:cock.thickCock} is trapped as {B:he} thrashes beneath you, pinned to the bed.`,
  [playerA, isViolent, bVisibleCock]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist, {A:his} hands warm on your shoulders.`,
  [playerB, isLoving]);
straddle.add(`{A:name} rises up affectionately, swinging a leg over your hips as you settle down flat beneath {A:him}.`,
  [playerB, isLoving]);
straddle.add(`{A:name} climbs up onto your back, {A:his} {A:cock.thickCock} resting warmly along your spine as you settle down flat beneath {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
straddle.add(`{A:name's} {A:breasts.softBreasts} press affectionately against your back as {A:he} settles astride your hips.`,
  [playerB, isLoving, aVisibleBreasts]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist with an eager little grind of {A:his} hips.`,
  [playerB, isLustful]);
straddle.add(`{A:name} rises up eagerly, settling astride your hips as you spread out beneath {A:him}.`,
  [playerB, isLustful]);
straddle.add(`{A:name} climbs up with a hungry sound, {A:his} {A:cock.bigHardCock} dragging along your back as {A:he} settles astride your hips.`,
  [playerB, isLustful, aHardCock]);
straddle.add(`Your {B:cock.thickCock} is trapped beneath you as {A:name} climbs up eagerly to straddle your waist.`,
  [playerB, isLustful, bVisibleCock]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist without comment.`,
  [playerB, isAccepting]);
straddle.add(`You stretch out flat, and {A:name} settles astride your hips without protest.`,
  [playerB, isAccepting]);
straddle.add(`{A:name} climbs up to straddle your waist without complaint, {A:his} {A:cock.thickCock} resting along your back.`,
  [playerB, isAccepting, aVisibleCock]);
straddle.add(`{A:name} climbs up nervously to straddle your waist as you lie flat beneath {A:him}.`,
  [playerB, isFearful]);
straddle.add(`With a shaky breath, {A:name} settles astride your hips.`,
  [playerB, isFearful]);
straddle.add(`{A:name's} {A:cock.sixInch} long {cock} trembles nervously as {A:he} climbs up to straddle your waist.`,
  [playerB, isFearful, aVisibleCock]);
straddle.add(`{A:name} grumbles as {A:he} climbs up to straddle your waist, clearly reluctant about it.`,
  [playerB, isResistant]);
straddle.add(`With a huff, {A:name} settles astride your hips, unhappy about the whole thing.`,
  [playerB, isResistant]);
straddle.add(`{A:name's} {A:cock.thickCock} shifts as {A:he} climbs up reluctantly to straddle your waist.`,
  [playerB, isResistant, aVisibleCock]);
straddle.add(`{A:name} thrashes as you pull {A:him} up to straddle you anyway, {A:his} struggles doing nothing to stop you.`,
  [playerB, isViolent]);
straddle.add(`{A:name} struggles, but you keep pulling {A:him} onto your hips regardless.`,
  [playerB, isViolent]);
straddle.add(`{A:name's} {A:cock.thickCock} swings as {A:he} thrashes, unable to stop you from pulling {A:him} astride your hips.`,
  [playerB, isViolent, aVisibleCock]);
