global.PartySelectFrame = function() {
  const frameElement = X.createElement(`<div class='party-select-frame hide'></div>`);
  const characterFrames = {};

  Object.keys(GameSystem.getState().getPartyConfiguration()).forEach(id => {
    characterFrames[id] = buildCharacterFrame(id);
    frameElement.appendChild(characterFrames[id]);
  });

  // TODO: The party select frame is only used the out of combat inventory, so this status effects list can only
  //       display status effects that can survive outside of combat. (Paralyze, drunk, etc.) With a frame this small
  //       though, I think it's only possible to show at most 4 status effect icons at 32x32 px each. There really
  //       aren't that many, but if a character does get that many we'll need some kind of show overflow effects on
  //       hover. It would probably be a good idea to show a full status effects list as a tooltip anyway, listing all
  //       the effects by name, rather than only showing the icon. Status effect tooltip can be a separate eventual
  //       task.

  function buildCharacterFrame(id) {
    const character = Character(id);
    const element = X.createElement(`<div class='character-frame'>
      <div class='portrait'><ul class='status-effects'></ul></div>
      <div class='right-side'>
        <div class='name'>${character.getName()}</div>
        <div class='health-bar'></div>
        <div class='mana-bar'></div>
        <div class='stamina-bar'></div>
      </div>
    </div>`);

    element.querySelector('.portrait').style['background-image'] = X.assetURL(character.getCardArt());
    return element;
  }

  // Loop though all character frames and update bars and status effects.
  function update() {}

  return {
    getElement: () => { return frameElement; },
    getSelected: () => { return null; },
    show: () => { X.removeClass(frameElement,'hide'); },
    hide: () => { X.addClass(frameElement, 'hide'); },
    update,
  }
}
