SexPosition.register('apart',{
  name: 'Apart',

  alignment: {
    first: {},
    second: {},
  },

  moves:[],

  generateRearrange: rearrange
});

// We only arrive in the 'apart' position when chosen sex action forces the position, as in the striptease or
// other performance type action actions, or with actions that the characters need to separate for it to happen.
// The massage-feet action also forces the characters into the appart position, because there's no actual position that
// represents a foot massage position well, so any action after a massage-feet will need to reposition.

function rearrange(context) {
  switch (context.action) {
    case 'striptease': return rearrangeForStriptease(context);
    case 'massage-feet': return rearrangeForFootMassage(context);
    default: throw new Error(`There is no apart position configured for the ${context.action} action.`);
  }
}

// The player is always in the A position for a forced position, and we know that a character about to strip is,
// by definition, still dressed, so there's no need to check nakedness here.
function rearrangeForStriptease(context) {
  const options = [];

  if (context.attitude === Attitude.loving) {
    options.push(`{B:name} steps back with a warm smile, putting a little distance between you as {B:he} settles
      into position, clearly happy to put on a show just for you.`);
    options.push(`With obvious affection, {B:name} backs a few steps away, {B:his} eyes locked on yours as {B:he}
      gets ready to perform, fingers already toying with the hem of {B:his} clothes.`);
    options.push(`{B:name} smiles warmly, taking a few steps back and giving you an inviting little twirl to show
      off what {B:he}'s about to take off.`);
  }

  if (context.attitude === Attitude.lustful) {
    options.push(`{B:name} steps back with a hungry grin, clearly eager to put on a show for you.`);
    options.push(`With a needy exhale, {B:name} backs away, already biting {B:his} lip in anticipation of
      performing, fingers toying with a button.`);
    options.push(`{B:name} steps back and strikes a teasing pose, already tugging at {B:his} clothes with obvious
      impatience.`);
  }

  if (context.attitude === Attitude.accepting) {
    options.push(`{B:name} steps back without complaint, settling into position to perform.`);
    options.push(`Without protest, {B:name} moves a short distance away, waiting for your attention.`);
  }

  if (context.attitude === Attitude.fearful) {
    options.push(`{B:name} steps back nervously, {B:his} hands fidgeting as {B:he} gets into position to perform.`);
    options.push(`With a shaky breath, {B:name} backs away, unsure how to begin the show.`);
  }

  if (context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} reluctantly steps back, in no hurry to start performing.`);
    options.push(`With a huff, {B:name} moves away, arms crossed, clearly not thrilled about the show ahead.`);
  }

  if (context.attitude === Attitude.violent) {
    throw new Error('A violent attitude means refusing to participate; there is no way to force someone into a voluntary performance like this.');
  }

  return Random.from(options);
}

// The player is always in the A position for a forced position. Unlike the striptease, a foot massage doesn't
// require the partner's active participation to happen, so a violent attitude just means physically resisting
// rather than refusing outright.
function rearrangeForFootMassage(context) {
  const options = [];

  if (context.attitude === Attitude.loving) {
    options.push(`{B:name} settles down with a warm smile, stretching {B:his} legs out toward you as you kneel to
      take {B:his} foot in your hands.`);
    options.push(`With obvious affection, {B:name} sits back and offers you {B:his} foot, clearly looking forward
      to your touch.`);
  }

  if (context.attitude === Attitude.lustful) {
    options.push(`{B:name} sprawls out eagerly, already anticipating your hands as {B:he} offers up {B:his} foot.`);
    options.push(`With a needy little wiggle, {B:name} settles down and extends {B:his} leg toward you.`);
  }

  if (context.attitude === Attitude.accepting) {
    options.push(`{B:name} sits down without complaint, extending {B:his} leg for you to take.`);
    options.push(`Without protest, {B:name} settles back and offers you {B:his} foot.`);
  }

  if (context.attitude === Attitude.fearful) {
    options.push(`{B:name} sits down nervously, {B:his} leg trembling slightly as {B:he} extends it toward you.`);
    options.push(`With a shaky breath, {B:name} settles back, unsure what to expect from your touch.`);
  }

  if (context.attitude === Attitude.resistant) {
    options.push(`{B:name} grumbles as {B:he} reluctantly sits down and extends {B:his} leg.`);
    options.push(`With a huff, {B:name} settles back, clearly unhappy about the whole thing.`);
  }

  if (context.attitude === Attitude.violent) {
    options.push(`{B:name} tries to pull away, but you catch {B:his} ankle and force {B:him} to sit as you take
      {B:his} foot in your hands.`);
    options.push(`{B:name} thrashes as you pull {B:him} down and pin {B:his} leg still, forcing {B:his} foot into
      your grip.`);
  }

  return Random.from(options);
}