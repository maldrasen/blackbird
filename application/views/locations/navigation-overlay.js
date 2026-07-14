global.NavigationOverlay = (function() {

  // TODO: Both maps are just lists of links for now. They become actual maps once we know what the house and the city
  //       actually look like. The city map should eventually be a large image with each unlocked exit absolute
  //       positioned on top of its location on the map. For now this just builds a list of district links.

  function init() {
    X.onClick('#cityMap .move-district', clickDistrict);
    X.onClick('#districtMap .move-location', clickLocation);
  }

  function open() {
    const exits = NavigationSystem.getLocalDestinations();
    GeneralOverlay.open(exits.length === 0 ? buildCityMap() : buildDistrictMap(exits));
  }

  function buildCityMap() {
    return buildShittyMap('cityMap', 'Wolgur', NavigationSystem.getDistrictDestinations().map(code => {
      return { code, label:District.lookup(code).getName(), classname:'move-district' };
    }));
  }

  // TODO: When we show a district map, we also need a way to back out of the map to show the city map.
  function buildDistrictMap(exits) {
    const districtCode = GameSystem.getState().getCurrentDistrict();
    const districtName = District.lookup(districtCode).getName();
    return buildShittyMap(`${districtCode}Map`, districtName, exits.map(code => {
      return { code, label:Location.lookup(code).getName(), classname:'move-location' };
    }));
  }

  function buildShittyMap(id, label, exits) {
    const template = X.createElement(`<div id='${id}' class='padding'>
      <h4 class='border-bottom margin-bottom'>${label}</h4>
      <ul class='exits'></ul>
    </div>`);

    exits.forEach(exit => {
      X.append(template.querySelector('.exits'), X.createElement(`<li><a href='#' class='${exit.classname}' data-code='${exit.code}'>${exit.label}</a></li>`))
    });

    return template;
  }

  function clickDistrict(event) {
    WindowManager.pop();
    NavigationSystem.moveToDistrict(event.target.dataset.code);
  }

  function clickLocation(event) {
    WindowManager.pop();
    NavigationSystem.moveWithinLocation(event.target.dataset.code);
  }

  return Object.freeze({
    init,
    open,
  });

})();
