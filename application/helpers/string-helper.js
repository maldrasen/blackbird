global.StringHelper = {

  pad: function(string,length) {
    return (string.length < length) ? `${string}${new Array(length - string.length).fill(' ').join('')}` : string;
  },

  // Turns "   a   b   c " into "a b c"
  pack: function(string) {
    return string.replace(/\s+/g,' ').trim();
  }

}
