
// The nice archetype is the male equivalent of sweet. Because of the way personalities are balanced most men are
// either going to end up in the serious or nice archetype, and as such we'll need a lot of variety in these dialog
// trees.

Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Eager, context => {
  const options = [
    `{T:name} exhales shakily, fingers tightening around yours. "I'm ready whenever you are."`];

  options.push(`{T:name} smiles softly and steps closer, resting a warm hand on your 
    shoulder. "Yeah... I'd like that. Whatever you need from me, I'm here for it."`);
  options.push(`{T:name} smiles a little, cheeks faintly pink. "Of course. 
    It makes me happy just knowing you want me like this."`);
  options.push(`{T:name} leans in until his forehead gently touches yours, breath warm 
    against your lips. "Yes. Please. I want to feel closer to you in every way."`);
  options.push(`{T:name} presses his chest lightly against you, voice low and sincere. 
    "Anything you want. I'm yours to shape."`);

  return Random.from(options);
});

Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Willing, context => {
  const options = [];

  options.push(`{T:name} nods once, steady and calm, a small smile tugging at the
    corner of his mouth. "Okay. If that's what you want. Let's see how it goes."`);
  options.push(`{T:name} reaches out and rests his palm flat against your chest, 
    feeling your heartbeat. "Sure. If that's what you want from me."`);
  options.push(`{T:name} rubs the back of his neck, a shy chuckle escaping. 
    "Yeah, alright. I'm not great at saying no to you anyway."`);

  return Random.from(options);
});

Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Reluctant, context => {
  const partner = Character(context.T);
  const options = [
    `{T:name} crosses his arms over his chest. "Alright, It's a lot to ask… but I'll try for you."`,
    `{T:name} gives a small nod. "Alright... just don't push me too hard yet. I know the sort of things you're in to."`,
    `{T:name} exhales slowly, shoulders dropping. "Well... I'm nervous, but I don't want to let you down."`];

  if (partner.isEquipped(EquipmentSlot.legs) && partner.cockIsAtLeast('huge')) {
    options.push(`{T:name} hesitates, glancing down at the massive bulge in the front of his 
      pants before looking back at you. "I want to say yes... but I wouldn't want to hurt you."`);
  }

  if (partner.isEquipped(EquipmentSlot.legs) && partner.cockIsAtLeast('big')) {
    options.push(`{T:name} shifts uncomfortably, the heavy outline of his {T:cock.big} cock 
      stirring faintly against his thigh. "Okay, we can give it a try, if that's what you want."`);
  }

  return Random.from(options);
});


Dialog.register(ArchetypeCode.reserved, DialogKeys.proposeTraining_Unwilling, context => {
  const player = Character(context.P);
  const partner = Character(context.T);
  let options = []

  options.push(`{T:name} turns slightly away, back to you for a moment before 
      glancing back. "I'm flattered you asked, honestly... but no."`);

  // If the partner is straight their refusal should say as much and not act
  // like it might be possible at some point.
  if (player.isMale() && partner.isStraight()) {
    options.push(`{T:name} takes a slow breath, placing a hand on your arm.
      "I'm sorry... that's just not something I want."`);
    options.push(`{T:name} looks down at the floor, shoulders tense. "No,
      not... not with another man. That doesn't feel right to me."`);
    options.push(`{T:name} crosses his arms over his chest, the motion protective.
      "Sorry, it's just... I don't feel anything sexual toward other men."`);
    options.push(`{T:name} meets your eyes directly, expression kind yet resolute. 
      "Sorry, it's just... I'm straight. Whatever this is... it's not for me."`);
    return Random.from(options);
  }

  options.push(`{T:name} steps back half a pace, hands raised in quiet 
    surrender. "I'm sorry, I just... I can't yet."`)
  options.push(`{T:name} offers a small, apologetic smile. "Um, maybe some 
    other time? I promise I'll think about it seriously."`);
  options.push(`{T:name} rubs his forearm, voice soft. "I don't want to 
    disappoint you... but I can't. Not yet."`);
  options.push(`{T:name} shakes his head gently, expression pained but kind. 
    "I'm sorry... but I'm just not there yet. Can we wait a little longer?"`);

  return Random.from(options);
});
