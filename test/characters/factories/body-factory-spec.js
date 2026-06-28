describe("BodyFactory", function() {

  describe("body height", function() {
    it("the tallest equin", function () {
      const tallBoi = CharacterFactory.build({species: 'equian', gender: 'male', triggers: ['tall']});
      const height = BodyComponent.lookup(tallBoi).height;
      expect(height).to.be.within(2217,2239);
    });

    it("the shortest kobold", function () {
      const shorty = CharacterFactory.build({species: 'kobold', gender: 'female', triggers: ['short']});
      const height = BodyComponent.lookup(shorty).height;
      expect(height).to.be.within(604,611);
    });
  });

});
