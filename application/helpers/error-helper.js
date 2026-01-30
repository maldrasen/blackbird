global.ErrorHelper = {

  errorToString: function(error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error))
  },

}
