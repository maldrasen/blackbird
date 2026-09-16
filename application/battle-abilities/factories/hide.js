Ability.Hide = function(options={}) {
  const ability = Ability('Hide');
  ability.setEssence(10);

  if (options.priority != null) { ability.setPriority(options.priority); }

  ability.setPossibleFunction(() => {
    const acting = BattleSystem.getRound().getActing();
    const hasSkill = SkillsComponent.lookup(acting)['stealth'] > 0;
    const notHidden = StatusEffects(acting).hasHidden() === false;
    const inBack = BattleSystem.getState().isInBack(acting);

    return notHidden && inBack && hasSkill;
  });

  // The first observer whose intelligence check beats the stealth roll spots the hider.
  ability.setExecuteFunction(() => {
    const round = BattleSystem.getRound();
    const acting = round.getActing();
    const stealthRoll = SkillCheck(acting,'stealth');
    const spotter = StealthSystem.getObservers(round.getActingPosition()).find(observer => {
      return Attributes(observer.id).check(Attrib.intelligence) > stealthRoll.value;
    });

    round.clearTarget();
    round.addTime(1000);

    if (spotter) {
      return round.addMessage({ text:`{A:ActingName} tries to hide, but ${ActorLoom.compileName(spotter.id)} spots {A:him}.` });
    }

    BattleSystem.addStatus(acting,'hidden');
    round.addMessage({ text:`{A:ActingName} hides in the shadows.` });
  });

  return ability;
}
