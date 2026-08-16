// A reaction contest will include exactly one property that specifies the contest type.
//
// random:(true or freqmap)
//   A completely random roll. Either a coin toss when { random:true } or using the frequency map like:
//   { win:10, loss:3 }
//
// attribute:(Attribute)
//   An attribute contest will roll attributes for both characters, deciding who wins based on who rolled the
//   highest.
//
// skill:(Skill code)
//   A skill contest rolls a SkillCheck for both characters, deciding who wins based on who rolled the highest.
//   Ties go to the player.
//
// The contest options also include the win and loss paths, each holding any other built reaction, so a branch can
// adjust feelings, end the negotiation, or even roll another contest.
//   win: Reaction.respect(`...`)
//   loss: Reaction.attack(`...`)
//
global.NegotiationContest = function(options) {
  const { win, loss, random, attribute, skill, ...unknown } = options;

  if (win == null || loss == null) {
    throw new Error(`A negotiation contest needs both a win and a loss reaction.`); }

  if (random == null && attribute == null && skill == null) {
    throw new Error(`A negotiation contest needs a random, attribute, or skill property.`); }

  if (Object.keys(unknown).length > 0) {
    throw new Error(`Unknown negotiation contest option [${Object.keys(unknown).join(', ')}]`); }

  function winsContest(context) {
    if (random === true) { return Random.flipCoin(); }
    if (random != null) { return Random.fromFrequencyMap(random) === 'win'; }
    if (skill != null) { return skillContest(context); }
    return attributeContest(context);
  }

  function skillContest(context) {
    return SkillCheck(context.P, skill).value >= SkillCheck(context.T, skill).value;
  }

  function attributeContest(context) {
    return rollAttribute(context.P) >= rollAttribute(context.T);
  }

  function rollAttribute(id) {
    return Random.roll(Attributes(id).getAttribute(attribute));
  }

  return {
    type: 'contest',
    resolve: (context) => (winsContest(context) ? win : loss).resolve(context),
  };
}
