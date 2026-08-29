global.EpisodeRequirements = (function() {

  function propertyValue(key) {
    return EpisodeSystem.getPropertyValue(key);
  }

  return {
    propertyEquals: (key,value) => { return () => { return propertyValue(key) === value; }}
  }

})();