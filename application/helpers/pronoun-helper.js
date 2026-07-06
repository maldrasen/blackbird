global.PronounHelper = (function() {

  // Enby characters use the ze/zem/zir set rather than singular they. Every woven verb is conjugated third-person
  // singular ("{B:he} lies back"), which "they" can't support ("they lies"), while "ze lies back" works. The set
  // also can't collide with the futa shi/hir set, and the object form has to survive the "{B:him}self" reflexive
  // construction (zem + self = zemself).
  function he(gender) {
    if (gender === Gender.male) { return 'he'; }
    if (gender === Gender.female) { return 'she'; }
    if (gender === Gender.futa) { return 'shi'; }
    if (gender === Gender.enby) { return 'ze'; }
  }

  // Conjunction he's, she's, shi's, or ze's
  function hes(gender) {
    if (gender === Gender.male) { return `he's`; }
    if (gender === Gender.female) { return `she's`; }
    if (gender === Gender.futa) { return `shi's`; }
    if (gender === Gender.enby) { return `ze's`; }
  }

  function him(gender) {
    if (gender === Gender.male) { return 'him'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'zem'; }
  }

  // Third-person determinator
  function his(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'zir'; }
  }

  // Third-person possessive
  function hers(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'hers'; }
    if (gender === Gender.futa) { return 'hirs'; }
    if (gender === Gender.enby) { return 'zirs'; }
  }

  function man(gender) {
    if (gender === Gender.male) { return 'man'; }
    if (gender === Gender.female) { return 'woman'; }
    if (gender === Gender.futa) { return 'futa'; }
    if (gender === Gender.enby) { return 'enby'; }
  }

  function men(gender) {
    if (gender === Gender.male) { return 'men'; }
    if (gender === Gender.female) { return 'women'; }
    if (gender === Gender.futa) { return 'futas'; }
    if (gender === Gender.enby) { return 'enbies'; }
  }

  return Object.freeze({ he, hes, him, his, hers, man, men });

})();
