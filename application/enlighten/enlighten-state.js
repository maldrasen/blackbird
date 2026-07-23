global.EnlightenState = function(from, data) {
  const totalEssence = data.totalEssence;



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
