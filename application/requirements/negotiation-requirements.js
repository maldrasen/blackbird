global.NegotiationRequirements = (function() {

  function getState() { return NegotiationSystem.getState(); }
  function checkFlag(flag, value) { return getState().getFlag(flag) === value; }

  function hasStyle(context, style) {
    return Archetype.lookup(Character(context.T).getArchetype()).getNegotiationStyle() === style;
  }

  return {
    isTrue: flag => { return () => { return checkFlag(flag,true); }},
    isFalse: flag => { return () => { return checkFlag(flag,false); }},
    contextSet: key => { return (context) => { return context[key] != null; }},
    hasStyle: style => { return (context) => { return hasStyle(context,style); }},
  };

})();
