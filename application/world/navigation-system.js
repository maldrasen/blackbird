global.NavigationSystem = (function() {

  // TODO: Eventually we'll need to calculate the time between districts. For a real version of this we'll probably
  //       want a weighted graph or something. First I would need to know most of the districts in the game and where
  //       on the city map they're located. For now, traveling between districts just costs a flat time.
  const _travelTime = 60;

  function getLocalDestinations() {
    const state = GameSystem.getState();
    const location = state.getCurrentLocation();
    const district = state.getCurrentDistrict();
    return District.lookup(district).getLocationCodes().filter(code => code !== location);
  }

  function getDistrictDestinations() {
    const districtCode = GameSystem.getState().getCurrentDistrict();
    return District.getAllCodes().filter(code => code !== districtCode);
  }

  function moveWithinLocation(code) {
    arriveAt(code, District.lookup(Location.lookup(code).getDistrict()).getMoveTime());
  }

  function moveToDistrict(code) {
    arriveAt(District.lookup(code).getEntrance(), _travelTime);
  }

  function arriveAt(code,time) {
    const state = GameSystem.getState();
    state.advanceGameTime(time);
    state.setCurrentLocation(code);
    LocationView.update();
  }

  return Object.freeze({
    getLocalDestinations,
    getDistrictDestinations,
    moveWithinLocation,
    moveToDistrict,
  });

})();
