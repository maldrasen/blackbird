global.StringHelper = {

  pad: function(string,length) {
    return (string.length < length) ? `${string}${new Array(length - string.length).fill(' ').join('')}` : string;
  }

}
