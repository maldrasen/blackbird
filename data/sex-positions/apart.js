
const isLoving = WeaverRequirements.withAttitude(Attitude.loving);
const isLustful = WeaverRequirements.withAttitude(Attitude.lustful);
const isAccepting = WeaverRequirements.withAttitude(Attitude.accepting);
const isFearful = WeaverRequirements.withAttitude(Attitude.fearful);
const isResistant = WeaverRequirements.withAttitude(Attitude.resistant);
const isViolent = WeaverRequirements.withAttitude(Attitude.violent);
const forStriptease = WeaverRequirements.withAction('striptease');
const forFootMassage = WeaverRequirements.withAction('massage-feet');

const rearrange = WeaverPackage('apart.rearrange');

SexPosition.register('apart',{
  name: 'Apart',

  alignment: {
    first: {},
    second: {},
  },

  moves:[],

  rearrangePackage: rearrange,
});

// We only arrive in the 'apart' position when the chosen sex action forces the position, as in the striptease or
// other performance type actions, or with actions that the characters need to separate for it to happen. The
// massage-feet action also forces the characters into the apart position, because there's no actual position that
// represents a foot massage position well, so any action after a massage-feet will need to reposition.

// The player is always in the A position for a forced position, so every option here is written from the player as A
// perspective.

// A character about to strip is, by definition, still dressed, so there's no need to check nakedness here. There are
// deliberately no violent striptease options: a violent attitude means refusing to participate, and there is no way
// to force someone into a voluntary performance like this.

rearrange.add(`{B:name} steps back with a warm smile, putting a little distance between you as {B:he} settles into position, clearly happy to put on a show just for you.`,
  [forStriptease, isLoving]);
rearrange.add(`With obvious affection, {B:name} backs a few steps away, {B:his} eyes locked on yours as {B:he} gets ready to perform, fingers already toying with the hem of {B:his} clothes.`,
  [forStriptease, isLoving]);
rearrange.add(`{B:name} smiles warmly, taking a few steps back and giving you an inviting little twirl to show off what {B:he's} about to take off.`,
  [forStriptease, isLoving]);
rearrange.add(`{B:name} steps back with a hungry grin, clearly eager to put on a show for you.`,
  [forStriptease, isLustful]);
rearrange.add(`With a needy exhale, {B:name} backs away, already biting {B:his} lip in anticipation of performing, fingers toying with a button.`,
  [forStriptease, isLustful]);
rearrange.add(`{B:name} steps back and strikes a teasing pose, already tugging at {B:his} clothes with obvious impatience.`,
  [forStriptease, isLustful]);
rearrange.add(`{B:name} steps back without complaint, settling into position to perform.`,
  [forStriptease, isAccepting]);
rearrange.add(`Without protest, {B:name} moves a short distance away, waiting for your attention.`,
  [forStriptease, isAccepting]);
rearrange.add(`{B:name} steps back nervously, {B:his} hands fidgeting as {B:he} gets into position to perform.`,
  [forStriptease, isFearful]);
rearrange.add(`With a shaky breath, {B:name} backs away, unsure how to begin the show.`,
  [forStriptease, isFearful]);
rearrange.add(`{B:name} grumbles as {B:he} reluctantly steps back, in no hurry to start performing.`,
  [forStriptease, isResistant]);
rearrange.add(`With a huff, {B:name} moves away, arms crossed, clearly not thrilled about the show ahead.`,
  [forStriptease, isResistant]);



rearrange.add(`{B:name} settles down with a warm smile, stretching {B:his} legs out toward you as you kneel to take {B:his} foot in your hands.`,
  [forFootMassage, isLoving]);
rearrange.add(`With obvious affection, {B:name} sits back and offers you {B:his} foot, clearly looking forward to your touch.`,
  [forFootMassage, isLoving]);
rearrange.add(`{B:name} sprawls out eagerly, already anticipating your hands as {B:he} offers up {B:his} foot.`,
  [forFootMassage, isLustful]);
rearrange.add(`With a needy little wiggle, {B:name} settles down and extends {B:his} leg toward you.`,
  [forFootMassage, isLustful]);
rearrange.add(`{B:name} sits down without complaint, extending {B:his} leg for you to take.`,
  [forFootMassage, isAccepting]);
rearrange.add(`Without protest, {B:name} settles back and offers you {B:his} foot.`,
  [forFootMassage, isAccepting]);
rearrange.add(`{B:name} sits down nervously, {B:his} leg trembling slightly as {B:he} extends it toward you.`,
  [forFootMassage, isFearful]);
rearrange.add(`With a shaky breath, {B:name} settles back, unsure what to expect from your touch.`,
  [forFootMassage, isFearful]);
rearrange.add(`{B:name} grumbles as {B:he} reluctantly sits down and extends {B:his} leg.`,
  [forFootMassage, isResistant]);
rearrange.add(`With a huff, {B:name} settles back, clearly unhappy about the whole thing.`,
  [forFootMassage, isResistant]);
rearrange.add(`{B:name} tries to pull away, but you catch {B:his} ankle and force {B:him} to sit as you take {B:his} foot in your hands.`,
  [forFootMassage, isViolent]);
rearrange.add(`{B:name} thrashes as you pull {B:him} down and pin {B:his} leg still, forcing {B:his} foot into your grip.`,
  [forFootMassage, isViolent]);
