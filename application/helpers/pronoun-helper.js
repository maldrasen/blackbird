global.PronounHelper = (function() {

  function he(gender) {
    if (gender === Gender.male) { return 'he'; }
    if (gender === Gender.female) { return 'she'; }
    if (gender === Gender.futa) { return 'shi'; }
    if (gender === Gender.enby) { return 'they'; }
  }

  function him(gender) {
    if (gender === Gender.male) { return 'him'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'them'; }
  }

  // Third-person determinator
  function his(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'their'; }
  }

  // Third-person possessive
  function hers(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'hers'; }
    if (gender === Gender.futa) { return 'hirs'; }
    if (gender === Gender.enby) { return 'theirs'; }
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

  return Object.freeze({ he, him, his, hers, man, men });

})();
