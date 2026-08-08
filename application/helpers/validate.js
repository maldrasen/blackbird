global.Validate = (function() {

  function between(name, value, min, max, message=null) {
    if (typeof value !== 'number') {
      throw new Error(`Validate.between Failed: ${name} is not a number.`);
    }
    if (value < min) {
      throw new Error(message ? message : `Validate.between Failed: ${name}.${value} less than ${min}`);
    }
    if (value > max) {
      throw new Error(message ? message : `Validate.between Failed: ${name}.${value} greater than ${max}`);
    }
  }

  function atLeast(name, value, min, message=null) {
    if (typeof value !== 'number') {
      throw new Error(`Validate.atLeast Failed: ${name} is not a number.`);
    }
    if (value < min) {
      throw new Error(message ? message : `Validate.atLeast Failed: ${name} is less than ${min}`);
    }
  }

  function isIn(name, value, list, message=null) {
    if (!list.includes(value)) {
      throw new Error(message ? message : `Validate.isIn Failed: ${name}[${value}] not in list.`);
    }
  }

  function exists(name, value, message=null) {
    if (value == null) {
      throw new Error(message ? message : `Validate.exists Failed: ${name} is null.`);
    }
  }

  function trueOrNull(name, value, message=null) {
    if (value === undefined || value === null || value === true) { return; }
    throw new Error(message ? message : `Validate.trueOrNull Failed: ${name} is ${value}`);
  }

  function equals(name, value, equalTo, message=null) {
    if (value !== equalTo) {
      throw new Error(message ? message : `Validate.equals Failed: ${name} doesn't equal ${equalTo}`);
    }
  }

  function isString(name, value, message=null) {
    if (typeof value !== 'string') {
      throw new Error(message ? message : `Validate.isString Failed: ${name} is not a string.`);
    }
  }

  function isNumber(name, value, message=null) {
    if (typeof value !== 'number') {
      throw new Error(message ? message : `Validate.isNumber Failed: ${name} is not a number.`);
    }
  }

  function isFunction(name, value, message=null) {
    if (typeof value !== 'function') {
      throw new Error(message ? message : `Validate.isFunction Failed: ${name} is not a function.`);
    }
  }

  function isArray(name, value, message=null) {
    if (!Array.isArray(value)) {
      throw new Error(message ? message : `Validate.isArray Failed: ${name} is not an array.`);
    }
  }

  // Accepts a single value of the given type or an array of them, the shape used by properties like requires and
  // classname.
  function singleOrArrayOf(name, value, type, message=null) {
    const entries = Array.isArray(value) ? value : [value];
    if (entries.some(entry => typeof entry !== type)) {
      throw new Error(message ? message : `Validate.singleOrArrayOf Failed: ${name} is not a ${type} or an array of ${type}s.`);
    }
  }

  function singleKeyFrom(name, data, keyList, message=null) {
    let found;
    Object.keys(data).forEach(key => {
      if (keyList.includes(key)) {
        if (found != null) {
          throw new Error(message ? message :
            `Validate.singleKeyFrom Failed: ${name} cannot include both ${key} and ${found}`);
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
    isString,
    isNumber,
    isFunction,
    isArray,
    singleOrArrayOf,
    singleKeyFrom
  });

})();
