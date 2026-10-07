Record.define('MonsterType', {
  getInstance: type => ({
    getPreferredPosition: () => { return type.preferredPosition || 'flexible'; },
    getThreatWeights: () => { return type.threatWeights; },
    getAbilities: () => { return type.abilities || []; },
    getAttributes: () => { return type.attributes; },
    getAttributeGrowth: () => { return type.attributeGrowth; },
    getBaseSkills: () => { return type.baseSkills; },
    getSkillGrowth: () => { return type.skillGrowth; }
  }),

  // The abilities are built once all the records are loaded and kept on the stored data, shared by every monster of
  // the type.
  functions: records => ({
    compile: () => {
      Object.values(records).forEach(type => {
        if (type.buildAbilities) { type.abilities = type.buildAbilities(); }
      });
    },
  }),
});
