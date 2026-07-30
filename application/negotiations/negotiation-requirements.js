global.NegotiationRequirements = (function() {

  // The negotiation requirements are like the weaver requirements, though rather than working off of a weaver context
  // they look at the negotiation state.

  function getState() { return NegotiationSystem.getState(); }
  function checkFlag(flag, value) { return getState().getFlag(flag) === value; }

  return Object.freeze({
    isTrue: flag => { return () => { checkFlag(flag,true); }},
    isFalse: flag => { return () => { checkFlag(flag,false); }},
  });

})();
