global.StealthSystem = (function() {

  // The stealth system is needed to remove the hidden status from characters if they perform an action that targets
  // another character. If they target a character on their own side, there's a chance that they can remain hidden by
  // rerolling their stealth skill. Otherwise, if they attack an opponent (or use an ability that targets the
  // opponent's side) then the hidden status is removed.

  function processRound() {
    const state = BattleSystem.getState();
    const round = BattleSystem.getRound();

    const acting = round.getActing();
    const actingPosition = round.getActingPosition();
    const targetPosition = round.getTargetPosition();

    if (state.hasStatusEffect(acting,'hidden') && targetPosition != null) {
      (actingPosition[0] !== targetPosition[0]) ? state.removeStatus(acting,'hidden') : stayHidden();
    }
  }

  // Stay hidden will need to do everything the hide ability does, adding a message if the hiding fails, and without
  // changing the time that the executed ability takes.
  function stayHidden() { throw new Error(`Implement this`); }

  // Given the hiding character's position, get the entity closest to them on the other side of the formation (this
  // will be the front row in the same position) as well as the entities in the three positions surrounding the
  // opposite position. The entities at these positions will be able to make an intelligence check to detect the
  // hiding character.

  function getObservers(position) {
    const state = BattleSystem.getState();
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
    processRound,
    getObservers,
  });

})();

