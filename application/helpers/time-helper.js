global.TimeHelper = {

  getTimeString: function() {
    const date = new Date();
    let h = `${date.getHours()}`
    let m = `${date.getMinutes()}`
    let s = `${date.getSeconds()}`

    if (h.length === 1) { h = `0${h}` }
    if (m.length === 1) { m = `0${m}` }
    if (s.length === 1) { s = `0${s}` }

    return `${h}:${m}:${s}`
  },

  millisecondsToTimeString: function(ms) {
    let minutes = `${Math.floor((ms / 1000) / 60)}`;
    let seconds = `${Math.floor((ms / 1000) % 60)}`;

    if (minutes.length === 1) { minutes = `0${minutes}` }
    if (seconds.length === 1) { seconds = `0${seconds}` }

    return `${minutes}:${seconds}`;
  }

};
