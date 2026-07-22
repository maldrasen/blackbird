global.EnlightenState = function(from, data) {
  Validate.isIn('EnlightenState.from', from, ['battle','training']);

  const skillImprovements = data.skillImprovements;
  const essenceAwards = data.essenceAwards || null;
  const levelUpQueue = [...(data.party || [])];
  const revived = [...(data.revived || [])];

  let levelUpIndex = 0;

  function getAnima() { return data.anima ? { ...data.anima } : null; }
  function getAnimus() { return data.animus ? { ...data.animus } : null; }
  function getAnger() { return data.anger; }
  function getPartner() { return data.partner; }

  function getEssenceAwards() {
    return essenceAwards ? { ...essenceAwards, awards:{ ...essenceAwards.awards } } : null;
  }

  return Object.freeze({
    getFrom: () => { return from },
    getAnima,
    getAnimus,
    getAnger,
    getPartner,
    getSkillImprovements: () => { return skillImprovements },
    getEssenceAwards,
    getRevived: () => { return [...revived] },
    getLevelUpQueue: () => { return [...levelUpQueue] },
    getLevelUpIndex: () => { return levelUpIndex },
    advanceLevelUpQueue: () => { levelUpIndex += 1 },
  });
}
