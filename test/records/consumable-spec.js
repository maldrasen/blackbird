describe("Consumable", function() {

  // These specs run against the real shipped consumables rather than throwaway fixtures - there is no way to
  // unregister an article, so registering test consumables would leave them polluting the registry.

  describe("battle properties", function() {
    it("exposes the blasto's targeting and area of effect", function() {
      const blasto = Consumable.lookup('blasto');
      expect(blasto.getTarget()).to.equal('position');
      expect(blasto.getAreaOfEffect()).to.equal('small');
    });

    it("exposes the blasto's battle effects", function() {
      const effects = Consumable.lookup('blasto').getBattleEffects();
      expect(effects.map(effect => effect.type)).to.deep.equal(['damage','status','status']);
      expect(effects.map(effect => effect.code)).to.include('blind').and.include('stun');
    });

    it("defaults to an out of combat consumable's self target with no area", function() {
      const tripe = Consumable.lookup('dungeon-tripe');
      expect(tripe.getTarget()).to.equal('self');
      expect(tripe.getAreaOfEffect()).to.equal(null);
      expect(tripe.getBattleEffects()).to.deep.equal([]);
    });
  });

  describe("messageForEntity()", function() {
    it("returns null for a consumable that doesn't define one", function() {
      expect(Consumable.lookup('dungeon-tripe').messageForEntity(null,{ damage:7 })).to.equal(null);
    });

    it("builds the blasto's message from whichever effects landed", function() {
      const blasto = Consumable.lookup('blasto');
      expect(blasto.messageForEntity(null,{ damage:7, blind:true, stun:true }))
        .to.equal(`{A:ActingName} takes 7 damage, and is both blinded and stunned!`);
      expect(blasto.messageForEntity(null,{ damage:7, blind:true, stun:false }))
        .to.equal(`{A:ActingName} takes 7 damage, and is blinded!`);
      expect(blasto.messageForEntity(null,{ damage:7, blind:false, stun:true }))
        .to.equal(`{A:ActingName} takes 7 damage, and is stunned!`);
      expect(blasto.messageForEntity(null,{ damage:7, blind:false, stun:false }))
        .to.equal(`{A:ActingName} takes 7 damage!`);
    });
  });

});
