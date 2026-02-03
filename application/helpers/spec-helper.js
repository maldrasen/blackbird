global.SpecHelper = {

  times: function(num, callback) {
    for (let i=0; i<num; i++) {
      callback(i);
    }
  },

};
