describe("FunctionLoom", function() {

  describe("hit locations", function() {

    function chestHits(id, count) {
      const context = { T:id, hitLocation:EquipmentSlot.chest };
      const hits = [];
      for (let i=0; i<count; i++) { hits.push(FunctionLoom.weave(context, 'hisHitLocation', ['T'])); }
      return hits;
    }

    it("offers a breast size comparison when the breasts have a comparable shape", function() {
      const id = CharacterFixtures.genericFemale({ breasts:{ breastShape:'balls' } });
      expect(chestHits(id, 200).some(hit => hit.includes('breasts.appleSizedBreasts'))).to.be.true;
    });

    it("never compares the breasts when the shape has no comparable object", function() {
      const id = CharacterFixtures.genericFemale({ breasts:{ breastShape:'torpedoes' } });
      const hits = chestHits(id, 200);
      expect(hits.some(hit => hit.includes('bigSoftBreasts'))).to.be.true;
      expect(hits.some(hit => hit.includes('appleSizedBreasts'))).to.be.false;
    });

    it("only hits the chest when there are no breasts", function() {
      const id = CharacterFixtures.genericMale({});
      chestHits(id, 50).forEach(hit => expect(hit).to.equal('{T:his} chest'));
    });

  });

});
