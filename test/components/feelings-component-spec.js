describe("FeelingsComponent", function() {
  describe("findByTarget()", function() {

    it("validates uniqueness of the target character", function() {
      const wolf = Registry.createEntity();
      const deer = Registry.createEntity();

      expect(function() {
        Registry.createFeelingsComponent(wolf, { target:deer, affection:0, fear:0, respect:0 });
        Registry.createFeelingsComponent(wolf, { target:deer, affection:0, fear:0, respect:0 });
      }).to.throw('Validation Failed');
    });

    it("finds the feelings a character has for another character", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const horse = Registry.createEntity();

      Registry.createFeelingsComponent(wolf, { target:rabbit, affection:80, fear:0, respect:10 });
      Registry.createFeelingsComponent(wolf, { target:horse, affection:40, fear:20, respect:30 });
      Registry.createFeelingsComponent(horse, { target:rabbit, affection:10, fear:0, respect:0 });

      const feelings = FeelingsComponent.findByTarget(wolf, rabbit);
      expect(feelings._parentId).to.equal(wolf);
      expect(feelings.target).to.equal(rabbit);
      expect(feelings.affection).to.equal(80);
    });

  });
});
