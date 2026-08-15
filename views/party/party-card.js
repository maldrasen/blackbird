global.PartyCard = function(id) {

  const element = X.createElement(`<div class='entity-card party-card' data-id='${id}'>
    <div class='fill content'>
      <div class='name'></div>
    </div>
    <div class='fill background-cover'></div>
    <div class='fill background'></div>
  </div>`);

  element.querySelector('.name').textContent = Character(id).getName();
  element.querySelector('.background').style['background-image'] = X.assetURL(Character(id).getCardArt());

  return {
    getEntity: () => { return id; },
    getElement: () => { return element; },
  };

}
