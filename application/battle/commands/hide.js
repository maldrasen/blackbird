global.Hide = (function() {

  function execute() {
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

    if (round.isActingCharacter()) {
      BattleSystem.finishCharacterRound()
    }
  }

  // TODO: I need to wait until we have abilities with friendly targets before I can implement this. This will pretty
  //       much do the same stuff that hide does though, only it removes hidden on fail rather than adding it on
  //       success. No need for a message unless the hide check failed.
  function stayHidden() { throw new Error(`Not yet implemented.`); }

  return Object.freeze({
    execute,
    stayHidden,
  })

})();