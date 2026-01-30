global.SpecHelper = {

  times: function(num, callback) {
    for (let i=0; i<num; i++) {
      callback(i);
    }
  },

  startLog(title) {
    X.first('#testLog').appendChild(X.createElement(`<h1>${title}</h1>`));
  },

  log(message) {
    X.first('#testLog').appendChild(X.createElement(`<p>${message}</p>`));
  },

};
