describe("RecruitmentSystem", function() {

  it("promotes a monster into a member of the player's roster", function() {
    const player = Registry.createEntity();
    GameSystem.getState().setPlayer(player);

    const monster = MonsterFactory.build('kobold-trapper');
    expect(MonsterComponent.lookup(monster)).to.exist;

    RecruitmentSystem.recruit(monster, { affection:300, fear:50, respect:200, control:0 });

    // Feelings are seeded towards the player from the negotiation results.
    const feelings = FeelingsComponent.findByTarget(monster, player);
    expect(feelings.affection).to.equal(300);
    expect(feelings.fear).to.equal(50);
    expect(feelings.respect).to.equal(200);

    // The monster is now a controlled member of the roster, no longer a battle monster.
    expect(ControlledComponent.lookup(monster).control).to.equal(0);
    expect(MonsterComponent.lookup(monster)).to.be.undefined;
    expect(GameSystem.getState().isInRoster(monster)).to.equal(true);
  });

});
