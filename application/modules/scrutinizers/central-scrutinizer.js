global.CentralScrutinizer = (function() {

  // It is my responsibility to enforce all the laws that haven't been passed yet.
  //    - Frank Zappa
  //
  // Really all this so that we can have conditions that are easily persisted
  // because functions cannot be serialized to JSON.

  function allConditionsPass(conditions,context) {
    for (const condition of (conditions||[])) {
      if (false === condition.isValid(context)) { return false; }
    }
    return true;
  }

  function anyConditionFails(conditions,context) {
    return allConditionsPass(conditions,context) === false;
  }

  return Object.freeze({
    allConditionsPass,
    anyConditionFails,
  });

})();
