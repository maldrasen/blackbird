global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getBaseMonster() { return BaseMonster.lookup(monsterComponent().code); }
  function getBrain() { return getBaseMonster().getBrain(); }

  function getBasicAttack() {
    const attackData = monsterComponent().basicAttack;
    console.log("[Monster.getBasicAttack()]",attackData)
    return attackData;
  }

  // ==========
  //   Threat
  // ==========

  function populateThreatTable() {
    const state = BattleController.getState();

    console.log("=== Populate threat table ===")
  }

  function getThreatTable() {
    return monsterComponent().threatTable;
  }

  function updateThreat(character, threat) {
    const component = monsterComponent();
    component.threatTable[character] = threat;
    MonsterComponent.update(id, component);
  }

  return Object.freeze({
    getBaseMonster,
    getBrain,
    getBasicAttack,

    populateThreatTable,
    getThreatTable,
    updateThreat,
  });

}
