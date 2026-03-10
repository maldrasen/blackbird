
// The serious characters are more interested in exploring the dungeon than they are in being trained for sex, but they
// know it's part of the arrangement. They're violent when they need to be, and take situations seriously.

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Eager, context => {
  const partner = Character(context.T);
  const options = [
    `{T:name} smiles and gives a single, decisive nod. "Alright. Let's not waste time then."`,
    `{T:name} nods with obvious respect. "You know what you're doing. I'll follow your lead."`,
    `{T:name} chuckles and meets your gaze, "Okay {P:niceName}, get started whenever you're ready."`];

  if (partner.isStrongerThan(20)) {
    options.push(`{T:name} smiles and cracks {T:his} neck, muscles tensing in preparation. "Let's get to it then."`);
  }

  if (partner.isTallerThan(context.P)) {
    options.push(`{T:name} smiles and looks down at you with quiet intensity. "I'm ready. Show me what you need."`);
  }

  return Random.from(options);
});

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Willing, context => {
  const partner = Character(context.T);
  const options = [
    `{T:name} nods firmly. "I know what this is. Let's do it properly."`,
    `{T:name} meets your gaze evenly. "I can do that. Just tell me what you need."`,
    `{T:name} takes a steady breath, preparing {T:him}self mentally. "I understand. Let's begin."`,
  ];

  if (partner.cockIsAtLeast('big') && partner.isEquipped(EquipmentSlot.legs)) {
    options.push(`{T:name} straightens, the outline of {T:his} {T:cock.large} cock straining against {T:his} 
      {T:equipped.legs}. "Understood. I'm prepared for whatever comes next."`);
  }
  if (partner.breastsAreAtLeast('big') && partner.isEquipped(EquipmentSlot.chest)) {
    options.push(`{T:name} straightens, the outline of {T:his} {T:breasts.bigFirmBreasts} straining against {T:his} 
      {T:equipped.chest}. "Understood. I'm prepared for whatever comes next."`);
  }

  if (partner.isEquipped(EquipmentSlot.chest)) {
    options.push(`{T:name} nods and begins to pull off {T:his} {T.equipped.chest}. 
      {unequip(T,chest)} "Alright, let's get going then."`);
  }

  return Random.from(options);
});

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Reluctant, context => {
  const options = [
    `{T:name} exhales slowly, "Fine, if that's what you require of me."`,
    `{T:name}'s jaw tightens, "Fine... It's not like I have much choice."`,
    `{T:name}'s jaw tightens slightly. "Hmm, well. If you think it's absolutely necessary."`,
    `{T:name} grimaces but nods. "Hmm, I can't say I care for the idea, but I'll comply. Get on with it."`];

  options.push(`{T:name} takes a moment, clearly wrestling with the decision. 
    {T:He} finally gives you a slow nod. "Fine. Let's be done with it."`);

  return Random.from(options);
});

Dialog.register(ArchetypeCode.serious, DialogKeys.proposeTraining_Unwilling, context => {
  const options = [
    `{T:name} steps back, {T:his} voice cold and final. "You lack the authority to demand that of me."`,
    `{T:name} holds up a hand, {T:his} voice flat. "No. That's my final answer."`,
    `{T:name} turns away, {T:his} shoulders rigid. "This conversation is over. The answer is no."`,
    `{T:name} meets your gaze without wavering. "No, and don't ask me again."`];

  return Random.from(options);
});
