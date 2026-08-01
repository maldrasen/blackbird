describe("RecruitmentSystem", function() {

  it("promotes a monster into a member of the player's roster", function() {
    const player = Registry.createEntity();
    GameSystem.getState().setPlayer(player);

    const monster = MonsterFactory.build('kobold-trapper');
    expect(MonsterComponent.lookup(monster)).to.exist;

    RecruitmentSystem.recruit(monster, { affection:300, fear:50, respect:200, control:0 });

    const feelings = FeelingsComponent.findByTarget(monster, player);
    expect(feelings.affection).to.equal(300);
    expect(feelings.fear).to.equal(50);
    expect(feelings.respect).to.equal(200);

    expect(ControlledComponent.lookup(monster).control).to.equal(0);
    expect(MonsterComponent.lookup(monster)).to.be.undefined;
    expect(GameSystem.getState().isInRoster(monster)).to.equal(true);
  });

  it("keeps the equipment the monster fought with", function() {
    const player = Registry.createEntity();
    GameSystem.getState().setPlayer(player);

    const monster = MonsterFactory.build('kobold-trapper');
    const primary = EquipmentComponent.lookup(monster).primary;

    RecruitmentSystem.recruit(monster, { affection:300, fear:50, respect:200, control:0 });

    expect(EquipmentComponent.lookup(monster).primary).to.equal(primary);
    expect(InventoryManager(monster).hasItem(primary)).to.be.true;
    expect(WeaponComponent.lookup(primary).base).to.be.oneOf(['bone-spear','bone-club']);
  });

});
