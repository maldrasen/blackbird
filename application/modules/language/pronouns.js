global.Pronouns = (function() {

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

  return Object.freeze({ he, him, his, hers });

})();
