global.Validate = (function() {

  function between(name, value, min, max, message=null) {
    if (typeof value !== 'number') { throw `Validation Failed: ${name} is not a number.` }
    if (value < min) { throw message ? message : `Validation Failed: ${name}.${value} less than ${min}`; }
    if (value > max) { throw message ? message : `Validation Failed: ${name}.${value} greater than ${max}`; }
  }

  function atLeast(name, value, min, message=null) {
    if (typeof value !== 'number') { throw `Validation Failed: ${name} is not a number.` }
    if (value < min) { throw message ? message : `Validation Failed: ${name} is less than ${min}` }
  }

  function isIn(name, value, list, message=null) {
    if (!list.includes(value)) { throw message ? message : `Validation Failed: ${name}[${value}] not in list.`; }
  }

  function exists(name, value, message=null) {
    if (value == null) { throw message ? message : `Validation Failed: ${name} is null.` }
  }

  function equals(name, value, equalTo, message=null) {
    if (value !== equalTo) { throw message ? message : `Validation Failed: ${name} doesn't equal ${equalTo}` }
  }

  return Object.freeze({
    between,
    atLeast,
    isIn,
    exists,
    equals,
  });

})();
