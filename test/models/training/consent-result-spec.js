describe.only("ConsentResult", function() {

  describe("Base Classes", function() {
    it("calculates emotional actions", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();

      FeelingsComponent.create(rabbit, { target:wolf, affection:20, fear:100, respect:50 });

      console.log("Calculation:")

      const result = ConsentResult.create(rabbit, wolf);
      result.setSexAction('kiss');

      console.log("Result:",result)
    });

    it("calculates touching actions");
    it("calculates service actions");
    it("calculates roughService actions");
  });

});
