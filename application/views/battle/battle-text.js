global.BattleText = (function() {

  const startPhrases = [
    `You've been attacked by XXX!`,
    `Suddenly XXX attacks you!`,
    `XXX attacks you!`
  ];
  const partyAmbushedPhrases = [
    `XXX ambushes you!`
  ];
  const monstersAmbushedPhrases = [
    `You ambush XXX!`
  ];

  function build() {
    ScrollingPanel({ id:'#textScroll' });
  }

  function clear() {
    X.empty('#battleText');
  }

  function addText(text, properties={}) {
    let classname = ``;

    if (properties.size === 'large') { classname += `fs-huge `; }
    if (properties.color === 'important') { classname += `fs-strong `; }

    X.fill('#battleText',X.createElement(`<div class="${classname}">${text}</div>`));
  }

  // TODO: The description and start phrases will work for most encounter types, though some will need their own start
  //       and ambush phrases.
  function showBattleStartText() {
    const state = BattleController.getState();
    const encounter = state.getEncounter();
    const phrase = StringHelper.titlecase(getStartPhrase(state.getAmbushState()).replace(`XXX`, encounter.getDescription()));
    addText(phrase,{ size:'large', color:'important' });
  }

  function getStartPhrase(ambushState) {
    if (ambushState === 'party-ambushed') { return Random.from(partyAmbushedPhrases); }
    if (ambushState === 'monsters-ambushed') { return Random.from(monstersAmbushedPhrases); }
    return Random.from(startPhrases);
  }


  return Object.freeze({
    build,
    clear,
    addText,
    showBattleStartText,
  });

})();