global.GenderHelper = {

  Male: function(gender) {
    if (gender === Gender.male) { return 'Male'; }
    if (gender === Gender.female) { return 'Female'; }
    if (gender === Gender.futa) { return 'Futanari'; }
    if (gender === Gender.enby) { return 'Non-Binary'; }
  },

  he: function(gender) {
    if (gender === Gender.male) { return 'he'; }
    if (gender === Gender.female) { return 'she'; }
    if (gender === Gender.futa) { return 'shi'; }
    if (gender === Gender.enby) { return 'they'; }
  },

  him: function(gender) {
    if (gender === Gender.male) { return 'him'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'them'; }
  },

  // Third-person determinator
  his: function(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
    if (gender === Gender.enby) { return 'their'; }
  },

  // Third-person possessive
  hers: function(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'hers'; }
    if (gender === Gender.futa) { return 'hirs'; }
    if (gender === Gender.enby) { return 'theirs'; }
  },
}
