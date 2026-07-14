global.TimeHelper = (function() {

  const timesOfDay = [
    { start:       0, name:'The Dead of Night' },
    { start:  3 * 60, name:'The Witching Hour' },
    { start:  4 * 60, name:'Early Morning' },
    { start:  6 * 60, name:'Morning' },
    { start:  9 * 60, name:'Late Morning' },
    { start: 12 * 60, name:'Midday' },
    { start: 13 * 60, name:'Afternoon' },
    { start: 16 * 60, name:'Late Afternoon' },
    { start: 18 * 60, name:'Evening' },
    { start: 21 * 60, name:'Late Evening' },
    { start: 23 * 60, name:'Night' },
  ];

  function getMinuteOfDay(time) {
    return time % (24 * 60);
  }

  function getTimeOfDay(time) {
    const minute = getMinuteOfDay(time);
    return timesOfDay.findLast(span => { return minute >= span.start; }).name;
  }

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

  // TODO: Write a durationInEnglish() function if we need it.
  //    if (minutes === 0) { return `no time at all`; }
  //    if (minutes === 1) { return `a minute`; }
  //    if (minutes === 2) { return `a couple of minutes`; }
  //    if (minutes === 3) { return `a few minutes`; }
  //    etc.

  return Object.freeze({
    getMinuteOfDay,
    getTimeOfDay,
    getTimeString,
  });

})();
