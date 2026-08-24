global.PartyRequirements = (function() {

  function partySize() {
    return GameSystem.getState().getPartySize();
  }

  function sizeBetween(min,max) {
    const size = partySize();
    return size <= max && size >= min;
  }

  return {
    sizeAtLeast: min => { return () => { return partySize() >= min; }},
    sizeAtMost: max => { return () => { return partySize() <= max; }},
    sizeBetween: (min,max) => { return () => { return sizeBetween(min,max); }},
  };

})();
