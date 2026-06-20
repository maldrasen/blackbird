global.Hide = (function() {

  function execute(id) {
    const state = BattleSystem.getState();
    const observers = getObservers(state, state.getPosition(id));
    const stealthRoll = SkillCheck(id,'stealth');
    const weaver = Weaver({ C:id });

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
      state.addStatus(BattleStatusEffect(id,'hidden'));
    }

    return {
      time: 1000,
      messages: [message],
    }
  }

  // Given the hiding character's position, get the entity closest to them on the other side of the formation (this
  // will be the front row in the same position) as well as the entities in the three positions surrounding the
  // opposite position. The entities at these positions will be able to make an intelligence check to detect the
  // hiding character.

  function getObservers(state, position) {
    const side = (position[0] === 'M') ? 'P' : 'M';
    const observers = []

    const p = parseInt(position[4]);
    const p1 = `${side}.0.${p}`;
    const p2 = `${side}.1.${p}`;
    const p3 = (p > 0) ? `${side}.1.${p-1}` : null;
    const p4 = (p < 4) ? `${side}.1.${p+1}` : null;

    const e1 = state.getEntityAtPosition(p1);
    const e2 = state.getEntityAtPosition(p2);
    const e3 = state.getEntityAtPosition(p3);
    const e4 = state.getEntityAtPosition(p4);

    if (e1) { observers.push({ position:p1, id:e1, detection:'full' }); }
    if (e2) { observers.push({ position:p2, id:e2, detection:'half' }); }
    if (e3) { observers.push({ position:p3, id:e3, detection:'half' }); }
    if (e4) { observers.push({ position:p4, id:e4, detection:'half' }); }

    return observers;
  }

  return Object.freeze({
    execute,
  })

})();