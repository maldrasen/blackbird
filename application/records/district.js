Record.define('District', {
  getInstance: (district, code) => {

    function getLocationCodes() {
      return Location.getAllCodes().filter(locationCode => {
        return Location.lookup(locationCode).getDistrict() === code;
      });
    }

    return {
      getName: () => { return district.name; },
      getEntrance: () => { return district.entrance; },
      getMoveTime: () => { return district.moveTime; },
      getLocationCodes,
    };
  },
});
