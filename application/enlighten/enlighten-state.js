global.EnlightenState = function(from, data) {

  const essence = {};

  if (from === 'battle') {
    const party = Object.keys(GameSystem.getState().getPartyConfiguration());
    const essenceGained = Math.floor(data.totalEssence / party.length);

    party.forEach(id => {
      const experience = ExperienceComponent.lookup(id);

      essence[id] = {
        start: experience.essence,
        end:   experience.essence + essenceGained,
      };
    });
  }

  return Object.freeze({
    getFrom: () => { return from },
    getAnima: () => { return data.anima },
    getAnimus: () => { return data.animus },
    getAnger: () => { return data.anger },
    getPartner: () => { return data.partner },
    getSkillImprovements: () => { return data.skillImprovements },
    getRevived: () => { return data.revived },
    getLoot: () => { return data.loot },
    getEssence: () => { return essence; },
  });

}
