global.LetterGradeHelper = (function() {

  // Value will be between -1000 and 1000. Values over 600 is within the
  // unobtainable S ranks. The feelings bars are a bit more complicated as we
  // take a raw value and covert it to a letter grade and a bar showing the
  // progress to the next level.
  //
  // TODO: We'll need to figure out how this will handle negative values.
  //
  function feelingValue(value) {
    if (value <= 100) { return { letter:'F',  range:100, remainder:value }; }
    if (value <= 200) { return { letter:'D',  range:100, remainder:(value-100)}; }
    if (value <= 400) { return { letter:'C',  range:200, remainder:(value-200)}; }
    if (value <= 500) { return { letter:'B',  range:100, remainder:(value-400)}; }
    if (value <= 600) { return { letter:'A',  range:100, remainder:(value-500)}; }
    if (value <= 800) { return { letter:'S',  range:200, remainder:(value-600)}; }
    if (value <= 900) { return { letter:'SS', range:100, remainder:(value-800)}; }
    return { letter:'SSS', range:100, remainder:(value-900) };
  }

  // Value will be between 1-8
  function sensitivityValue(value) {
    return ['','F','D','C','B','A','S','SS','SSS'][value];
  }

  // Value will be between 0-100 (for now, S ranks will be implemented later)
  // Sexual preferences themselves are measured between -100 and 100, but this
  // function should always get the absolute value. Negative sexual preferences
  // are displayed with their antiname and a positive value. The preferences
  // could also be used for skill letter as they're on the same scale.
  function preferenceValue(value) {
    if (value <= 20) { return `F`; }
    if (value <= 40) { return `D`; }
    if (value <= 60) { return `C`; }
    if (value <= 80) { return `B`; }
    if (value <= 100) { return `A`; }
    if (value <= 150) { return `S`; }
    if (value <= 200) { return `SS`; }
    return `SSS`
  }

  return Object.freeze({
    feelingValue,
    sensitivityValue,
    preferenceValue,
  });

})();
