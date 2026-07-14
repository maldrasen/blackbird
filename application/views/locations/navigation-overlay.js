global.NavigationOverlay = (function() {

  // TODO: Both maps are just lists of links for now. They become actual maps once we know what the house and the city
  //       actually look like.

  function init() {
    X.onClick('#navigationMap a.local-destination', event => {
      GeneralOverlay.close();
      NavigationSystem.moveToLocation(event.target.dataset.code);
    });

    X.onClick('#navigationMap a.district-destination', event => {
      GeneralOverlay.close();
      NavigationSystem.travelToDistrict(event.target.dataset.code);
    });
  }

  function showLocalMap() {
    const district = District.lookup(NavigationSystem.getCurrentDistrict());
    const moveTime = district.getMoveTime();

    open(district.getName(), NavigationSystem.getLocalDestinations().map(code => {
      return {
        code,
        classname: 'local-destination',
        name: Location.lookup(code).getName(),
        time: moveTime,
      };
    }));
  }

  function showCityMap() {
    open('Wolgur', NavigationSystem.getDistrictDestinations().map(code => {
      return {
        code,
        classname: 'district-destination',
        name: District.lookup(code).getName(),
      };
    }));
  }

  function open(title, destinations) {
    GeneralOverlay.open(buildMap(title, destinations), { classname:'narrow' });
  }

  function buildMap(title, destinations) {
    const map = X.createElement(`<div id='navigationMap'><h3>${title}</h3><ul></ul></div>`);
    const list = map.querySelector('ul');

    if (destinations.length === 0) {
      list.appendChild(X.createElement(`<li>There's nowhere else to go.</li>`));
    }

    destinations.forEach(destination => {
      list.appendChild(buildDestination(destination));
    });

    return map;
  }

  function buildDestination(destination) {
    return X.createElement(`<li><a href='#' class='${destination.classname}' data-code='${destination.code}'>${destination.name}</a></li>`);
  }

  return Object.freeze({
    init,
    showLocalMap,
    showCityMap,
  });

})();
