global.Validate = (function() {

  function between(name, value, min, max, message=null) {
    if (typeof value !== 'number') { throw `Validate.between Failed: ${name} is not a number.` }
    if (value < min) { throw message ? message : `Validate.between Failed: ${name}.${value} less than ${min}`; }
    if (value > max) { throw message ? message : `Validate.between Failed: ${name}.${value} greater than ${max}`; }
  }

  function atLeast(name, value, min, message=null) {
    if (typeof value !== 'number') { throw `Validate.atLeast Failed: ${name} is not a number.` }
    if (value < min) { throw message ? message : `Validate.atLeast Failed: ${name} is less than ${min}` }
  }

  function isIn(name, value, list, message=null) {
    if (!list.includes(value)) { throw message ? message : `Validate.isIn Failed: ${name}[${value}] not in list.`; }
  }

  function exists(name, value, message=null) {
    if (value == null) { throw message ? message : `Validate.exists Failed: ${name} is null.` }
  }

  function trueOrNull(name, value, message=null) {
    if (value != null || value !== true) { throw message ? message : `Validate.trueOrNull Failed: ${name} is ${value}`; }
  }

  function equals(name, value, equalTo, message=null) {
    if (value !== equalTo) { throw message ? message : `Validate.equals Failed: ${name} doesn't equal ${equalTo}` }
  }

  function singleKeyFrom(name, data, keyList, message=null) {
    let found;
    Object.keys(data).forEach(key => {
      if (keyList.includes(key)) {
        if (found != null) {
          throw message ? message : `Validate.singleKeyFrom Failed: ${name} cannot include both ${key} and ${found}`
        }
        found = key;
      }
    });
  }

  return Object.freeze({
    between,
    atLeast,
    isIn,
    exists,
    trueOrNull,
    equals,
    singleKeyFrom
  });

})();
