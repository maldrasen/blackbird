global.GenderHelper = {
  Male: function(gender) {
    if (gender === Gender.male) { return 'Male'; }
    if (gender === Gender.female) { return 'Female'; }
    if (gender === Gender.futa) { return 'Futanari'; }
  },
  he: function(gender) {
    if (gender === Gender.male) { return 'he'; }
    if (gender === Gender.female) { return 'she'; }
    if (gender === Gender.futa) { return 'shi'; }
  },
  him: function(gender) {
    if (gender === Gender.male) { return 'him'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
  },
  his: function(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'her'; }
    if (gender === Gender.futa) { return 'hir'; }
  },
  hers: function(gender) {
    if (gender === Gender.male) { return 'his'; }
    if (gender === Gender.female) { return 'hers'; }
    if (gender === Gender.futa) { return 'hirs'; }
  },
}
