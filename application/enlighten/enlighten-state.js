global.EnlightenState = function(from,data) {
  Validate.isIn('EnlightenState.from',from,['battle','training']);

  const skillImprovements = data.skillImprovements;

  function getAnima() { return data.anima ? { ...data.anima } : null; }
  function getAnimus() { return data.animus ? { ...data.animus } : null; }
  function getAnger() { return data.anger; }
  function getPartner() { return data.partner; }

  return Object.freeze({
    getFrom: () => { return from },
    getAnima,
    getAnimus,
    getAnger,
    getPartner,
    getSkillImprovements: () => { return skillImprovements },
  });
}
