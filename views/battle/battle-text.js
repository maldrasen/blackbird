global.BattleText = (function() {

  function init() {
    X.onCodeDown('Space', isTextVisible, BattleSystem.advanceBattle);
    X.onCodeDown('Enter', isTextVisible, BattleSystem.advanceBattle);

    // We advance the text if the text panel was clicked, but not if the click was on the scrollbar, otherwise a user
    // might skip the text when they were just trying to scroll it. Scrollbar clicks target the scrollable element
    // itself, at an offset past its client width.
    X.onMouseDown('#textPanel', event => {
      if (event.target.id === 'textScroll' && event.offsetX >= event.target.clientWidth) { return false; }
      BattleSystem.advanceBattle();
    });
  }

  function build() {}

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
        if (message.color === 'miss') { classname += `fg-miss `; }
        X.append('#battleText',X.createElement(`<div class="${classname}">${message.text}</div>`));
      }
    });

    X.first('#textScroll').scrollTop = 0;
  }

  // TODO: We need to get the start text from the cohort or from the premade encounter. We'll need to save it
  //       somewhere because we don't save the encounter in the state anymore.
  function showBattleStartText() {
    const state = BattleSystem.getState();
    const ambushState = state.getAmbushState();
    setMessages([{ text:`[TODO: Find start text for ${ambushState}]`, size:'large', color:'important' }]);
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

  return {
    init,
    build,
    clear,
    hide,
    show,
    setMessages,
    showBattleStartText,
  };

})();