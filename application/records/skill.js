Record.define('Skill', {

  // Registering a skill also adds the skill code as a property of the Skills component.
  register: (code, data) => {
    SkillsComponent.addSkill(code);
    return data;
  },

  getInstance: skill => ({
    getName: () => { return skill.name; },
    getFactor: () => { return skill.factor; },
    getAttributes: () => { return skill.attributes; },
  }),
});
