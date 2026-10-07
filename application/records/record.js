// Every record keeps its data in a private map keyed by code and hands out wrapped instances from lookup(). The shared
// register/getAllCodes/lookup shape lives here, so a record file only supplies what makes it different:
//
//   Record.define('Skill', {
//     getInstance: (record, code) => ({ ... }),  Required. Returns the accessors for a copy of the stored data. The
//                                                instance lookup() returns gets getCode() added to it.
//     register:    (code, data) => data,         Optional. Replaces the standard register() and returns the data to
//                                                store, for records that split their data or register it elsewhere.
//     validate:    (record, code) => { ... },    Optional. Runs on what register() returns, before it's stored. Throws
//                                                for bad data.
//     functions:   records => ({ ... }),         Optional. Extra top level functions. They're given the raw data store
//                                                for the few records that patch their data after loading.
//   });
//
// define() adds the record to the global scope and returns it. The standard functions always win over extra
// functions with the same name.
global.Record = (function() {

  function define(name, options) {
    if (global[name] != null) { throw new Error(`Record [${name}] has already been defined.`); }
    Validate.isFunction(`Record[${name}].getInstance`, options.getInstance);

    const records = {};

    function register(code, data) {
      const record = options.register ? options.register(code, data) : data;
      if (options.validate) { options.validate(record, code); }
      records[code] = record;
    }

    function getAllCodes() {
      return Object.keys(records);
    }

    function lookup(code) {
      if (records[code] == null) { throw new Error(`Bad ${name} code [${code}]`); }
      return { ...options.getInstance({ ...records[code] }, code), getCode: () => { return code; } };
    }

    const functions = options.functions ? options.functions(records) : {};

    return global[name] = { ...functions, register, getAllCodes, lookup };
  }

  return { define };

})();
