global.PartyCard = function(id) {

  const element = X.createElement(`<div class='party-card' data-id='${id}'>
    <div class='fill content'>
      <div class='name'></div>
    </div>
    <div class='fill background-cover'></div>
    <div class='fill background'></div>
  </div>`);

  element.querySelector('.name').textContent = Character(id).getName();

  const code = GameSystem.getState().getPlayer() === id ? 'player' : 'character';
  element.querySelector('.background').style['background-image'] = X.assetURL(`temp-art/${code}.png`);

  return Object.freeze({
    getEntity: () => { return id; },
    getElement: () => { return element; },
  });

}
