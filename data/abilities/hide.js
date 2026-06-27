Ability.register('hide',{
  name: 'Hide',

  canBeUsed: () => { return true; },

  execute: () => {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();
    const acting = round.getActing();

    const observers = StealthSystem.getObservers(round.getActingPosition());
    const stealthRoll = SkillCheck(acting,'stealth');
    const weaver = Weaver({ C:acting });

    let isHidden = true;
    let message;

    observers.forEach(observer => {
      const check = AttributesComponent.check(observer.id, Attrib.intelligence);
      if (isHidden && check > stealthRoll.value) {
        isHidden = false;
        message = {
          text: weaver.weave(`{C:baseName} tries to hide, but ${ActorLoom.findBaseName(observer.id)} spots {C:him}.`)
        };
      }
    });

    if (isHidden) {
      message = { text: weaver.weave(`{C:baseName} hides in the shadows.`) };
      state.addStatus(BattleStatusEffect(acting,'hidden'));
    }

    round.clearTarget();
    round.setTime(1000);
    round.addMessage(message);
  },

});
