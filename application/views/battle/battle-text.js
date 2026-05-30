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

  let messageList;

  function init() {
    X.onCodeDown('Space', isTextVisible, advanceText);
    X.onCodeDown('Enter', isTextVisible, advanceText);
    X.onClick('#textPanel', advanceText);
  }

  function build() { ScrollingPanel({ id:'#textScroll' }); }
  function clear() { X.empty('#battleText'); }
  function hide() { X.addClass('#textPanel','hide'); }
  function show() { X.removeClass('#textPanel','hide'); }

  function isTextVisible() {
    return X.first('#battleView') != null && X.hasClass('#textPanel','hide') === false;
  }

  function setMessages(messages) {
    messageList = messages;
    clear();
    advanceText();
  }

  // TODO: Add an optional mode where we just show all the messages at once rather than clicking though them all.
  function advanceText() {
    console.log("=== Advance Text ===");

    if (messageList == null || messageList.length === 0) {
      return BattleController.advanceBattle();
    }

    const next = messageList.shift();
    addText(next.text, next.properties);
  }

  function addText(text, properties={}) {
    let classname = ``;

    if (properties.size === 'large') { classname += `fs-huge `; }
    if (properties.color === 'important') { classname += `fg-strong `; }

    X.append('#battleText',X.createElement(`<div class="${classname}">${text}</div>`));
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
    init,
    build,
    clear,
    hide,
    show,
    setMessages,
    addText,
    showBattleStartText,
  });

})();