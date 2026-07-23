global.EnlightenState = function(from, data) {

  const essence = {};

  if (from === 'battle') {
    const party = Object.keys(GameSystem.getState().getPartyConfiguration());
    const essenceGained = Math.floor(data.totalEssence / party.length);

    party.forEach(id => {
      const experience = ExperienceComponent.lookup(id);
      const actor = ActorComponent.lookup(id);

      essence.start = experience.essence;
      essence.end = experience.essence + essenceGained;
      essence.needed = EssenceSystem.totalEssenceToLevel(experience.level + 1, actor.species);

      console.log(`Experience for ${id}`)
      console.log("   Start:",essence.start);
      console.log("   End:",essence.end);
      console.log("   Needed:",essence.needed);
      console.log("Level?",experience.level);
    });
  }

  return Object.freeze({
    getFrom: () => { return from },
    getAnima: () => { return { ...data.anima }},
    getAnimus: () => { return { ...data.animus }},
    getAnger: () => { return data.anger },
    getPartner: () => { return data.partner },
    getSkillImprovements: () => { return { ...data.skillImprovements }},
    getRevived: () => { return [...data.revived] },
    getLoot: () => { return [...data.loot] },
  });

}
