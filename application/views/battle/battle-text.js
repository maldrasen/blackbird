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

  function init() {
    X.onCodeDown('Space', isTextVisible, advanceBattle);
    X.onCodeDown('Enter', isTextVisible, advanceBattle);
    X.onClick('#textPanel', advanceBattle);
  }

  function build() { ScrollingPanel({ id:'#textScroll' }); }
  function clear() { X.empty('#battleText'); }
  function hide() { X.addClass('#textPanel','hide'); }
  function show() { X.removeClass('#textPanel','hide'); }

  function isTextVisible() {
    return X.first('#battleView') != null && X.hasClass('#textPanel','hide') === false;
  }

  function setMessages(messages) {
    clear();

    messages.forEach(message => {
      let classname = ``;
      if (message.size === 'large') { classname += `fs-huge `; }
      if (message.color === 'important') { classname += `fg-strong `; }
      X.append('#battleText',X.createElement(`<div class="${classname}">${message.text}</div>`));
    });
  }

  function advanceBattle() {
    BattleSystem.advanceBattle();
  }

  // TODO: The description and start phrases will work for most encounter types, though some will need their own start
  //       and ambush phrases.
  function showBattleStartText() {
    const state = BattleSystem.getState();
    const encounter = state.getEncounter();
    const phrase = StringHelper.titlecase(getStartPhrase(state.getAmbushState()).replace(`XXX`, encounter.getDescription()));
    setMessages([{ text:phrase, size:'large', color:'important' }]);
  }

  function getStartPhrase(ambushState) {
    if (ambushState === 'party-ambushed') { return Random.from(partyAmbushedPhrases); }
    if (ambushState === 'monsters-ambushed') { return Random.from(monstersAmbushedPhrases); }
    return Random.from(startPhrases);
  }

  return Object.freeze({
    init,
    build,
    clear,
    hide,
    show,
    setMessages,
    showBattleStartText,
  });

})();