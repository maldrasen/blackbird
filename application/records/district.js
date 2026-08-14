global.District = (function() {
  const districts = {};

  function register(code,data) {
    districts[code] = data;
  }

  function getAllCodes() {
    return Object.keys(districts);
  }

  function lookup(code) {
    if (districts[code] == null) { throw new Error(`Bad district code [${code}]`); }

    const district = { ...districts[code] };

    function getLocationCodes() {
      return Location.getAllCodes().filter(locationCode => {
        return Location.lookup(locationCode).getDistrict() === code;
      });
    }

    return {
      getCode: () => { return code; },
      getName: () => { return district.name; },
      getEntrance: () => { return district.entrance; },
      getMoveTime: () => { return district.moveTime; },
      getLocationCodes,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
