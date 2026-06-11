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
    X.onCodeDown('Space', isTextVisible, BattleSystem.advanceBattle);
    X.onCodeDown('Enter', isTextVisible, BattleSystem.advanceBattle);
    X.onClick('#textPanel', BattleSystem.advanceBattle);
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
      if (message.element) {
        addElement(message)
      }
      if (message.text) {
        let classname = ``;
        if (message.size === 'large') { classname += `fs-huge `; }
        if (message.color === 'important') { classname += `fg-strong `; }
        X.append('#battleText',X.createElement(`<div class="${classname}">${message.text}</div>`));
      }
    });
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

  function addElement(message) {
    switch (message.element) {
      case 'roll-display': return addRollDisplay(message);
      default: throw new Error(`Unrecognized Element: ${message.element}`);
    }
  }

  function addRollDisplay(message) {
    const display = X.createElement(`<div class="roll-display"><div class='title'>${message.title}</div></div>`);

    let attackText = `<span class='value'>${Math.floor(message.attack.value)}</span>`;
    let defendText = `<span class='value'>${Math.floor(message.defend.value)}</span>`;
    let attackClass = '';
    let defendClass = '';

    if (message.attack.value > message.defend.value) {
      attackClass = 'high';
      defendClass = 'low';
    } else {
      attackClass = 'low';
      defendClass = 'high';
    }

    if (message.attack.crit) {
      attackText += ` <span class='bright'>(crit)</span>`; }
    if (message.attack.fumble) {
      attackText += ` <span class='bright'>(fumble)</span>`; }
    if (message.defend.crit) {
      defendText += ` <span class='bright'>(crit)</span>`; }
    if (message.defend.fumble) {
      defendText += ` <span class='bright'>(fumble)</span>`; }

    display.appendChild(X.createElement(`<div class='attack-roll ${attackClass}'>Attack ${attackText}</div>`));
    display.appendChild(X.createElement(`<div class='defend-roll ${defendClass}'>Defend ${defendText}</div>`));

    X.append('#battleText',display);
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