describe("EssenceSystem", function() {

  // The spec critters are beasts with the default health and speed factors, so their essence is the bite's price at
  // their strength times the essence scale. A [10,20] bite at strength 12 is worth 11 (see the appraiser specs).
  describe("monsterEssenceValue()", function() {
    before(function() {
      BaseMonster.register('spec-essence-biter', {
        name: 'Spec Essence Biter',
        bodyPlan: 'yeek',
        type: 'critter',
        level: 1,
        abilities: [Ability.Bite({ damage:[10,20], speed:1000 })],
      });

      BaseMonster.register('spec-essence-elder', {
        name: 'Spec Essence Elder',
        bodyPlan: 'yeek',
        type: 'critter',
        level: 1,
        abilities: [Ability.Bite({ damage:[10,20], speed:1000, essence:50 })],
      });
    });

    function build(code, strength) {
      const id = MonsterFactory(code).build();
      AttributesComponent.update(id, { strength });
      return id;
    }

    it("prices a natural attack for the monster's own strength", function() {
      expect(EssenceSystem.monsterEssenceValue(build('spec-essence-biter', 12))).to.equal(110);
      expect(EssenceSystem.monsterEssenceValue(build('spec-essence-biter', 24))).to.equal(280);
    });

    it("keeps a hand-set essence whatever the monster's strength", function() {
      expect(EssenceSystem.monsterEssenceValue(build('spec-essence-elder', 12))).to.equal(500);
      expect(EssenceSystem.monsterEssenceValue(build('spec-essence-elder', 24))).to.equal(500);
    });
  });

});
