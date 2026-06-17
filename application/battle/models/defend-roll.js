global.DefendRoll = function() {


  // const defendRoll = SkillCheck(target, defendSkill);

  return Object.freeze({
    isCrit: () => { return false },
    isFumble: () => { return false },
  })

}