global.BattleView = (function() {

  function init() {
    BattleText.init();
    CommandPanel.init();
    FormationPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/battle.html");
    FormationPanel.build();
    BattleText.build();
    BattleText.showBattleStartText();
  }

  function update() {
    const state = BattleSystem.getState();
    FormationPanel.updateAll(state);
  }

  // This function takes an object describing the damage being done. Because it's used both in the formation damage
  // highlighting and in the battle text I'm moving it to the view level, though I don't know if it's ever needed
  // outside of battle? The data should have the format:
  //
  //     { killed, isCrit, damageTypes:[{ type, percent }] }
  //
  // We determine the damage color by first finding the most significant damage type. If the percentages of damage
  // are the same then the first type in the array is the most significant. If this is crit or fatal damage then the
  // color will be more vibrant.
  function getDamageColor(data) {
    let typePercent = 0
    let type;

    data.damageTypes.forEach(t => {
      if (t.percent > typePercent) {
        typePercent = t.percent;
        type = t.type;
      }
    });

    if ([DamageType.crush, DamageType.pierce, DamageType.slash].includes(type)) {
      if (data.killed) { return `rgb(200,25,25)`; }
      if (data.isCrit) { return `rgb(150,20,20)`; }
      return `rgb(75,10,10)`;
    }
    throw new Error(`TODO: Implement colors for damage type ${type}`)
  }

  return Object.freeze({
    init,
    show,
    update,
    getDamageColor,
  });

})();
