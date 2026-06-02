global.Monster = function(id) {

  function monsterComponent() { return MonsterComponent.lookup(id); }
  function getBaseMonster() { return BaseMonster.lookup(monsterComponent().code); }
  function getBrain() { return getBaseMonster().getBrain(); }


  function getBasicAttack() {
    const attackData = monsterComponent().basicAttack;

    console.log("Attack Data:",attackData)

    return attackData;
  }

  return Object.freeze({
    getBaseMonster,
    getBrain,
    getBasicAttack,
  });

}
