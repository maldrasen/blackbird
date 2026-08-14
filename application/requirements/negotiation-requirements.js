global.NegotiationRequirements = (function() {

  function getState() { return NegotiationSystem.getState(); }
  function checkFlag(flag, value) { return getState().getFlag(flag) === value; }

  return {
    isTrue: flag => { return () => { return checkFlag(flag,true); }},
    isFalse: flag => { return () => { return checkFlag(flag,false); }},
    contextSet: key => { return (context) => { return context[key] != null; }},
  };

})();
