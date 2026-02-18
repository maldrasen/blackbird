global.TimeHelper = (function() {

  // Used in the console when logging. I don't think we use the actual system time anywhere else.
  function getTimeString() {
    const date = new Date();
    let h = `${date.getHours()}`
    let m = `${date.getMinutes()}`
    let s = `${date.getSeconds()}`

    if (h.length === 1) { h = `0${h}` }
    if (m.length === 1) { m = `0${m}` }
    if (s.length === 1) { s = `0${s}` }

    return `${h}:${m}:${s}`
  }

  return Object.freeze({
    getTimeString,
  });

})();
