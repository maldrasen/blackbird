describe("StatusEffects", function() {

  describe("apply()", function() {
    it("throws on a bad status effect code", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffects(entity).apply('wobbly', { count:1 });
      }).to.throw('Bad status effect code');
    });

    it("creates a new status effect", function() {
      const entity = Registry.createEntity();
      const { id, removed } = StatusEffects(entity).apply('stun', { count:2 });

      expect(removed).to.be.empty;
      expect(StatusEffects(entity).get('stun').count).to.equal(2);
      expect(StatusEffectComponent.lookup(id)._parentId).to.equal(entity);
    });

    it.only("renews an effect keeping the larger values", function() {
      const entity = Registry.createEntity();
      const { id } = StatusEffects(entity).apply('blind', { duration:1000 });

      const renewed = StatusEffects(entity).apply('blind', { duration:2000, strength:5 });
      expect(renewed.id).to.equal(id);
      expect(StatusEffects(entity).get('blind').duration).to.equal(2000);
      expect(StatusEffects(entity).get('blind').strength).to.equal(5);

      StatusEffects(entity).apply('blind', { duration:500, strength:2 });
      expect(StatusEffects(entity).get('blind').duration).to.equal(2000);
      expect(StatusEffects(entity).get('blind').strength).to.equal(5);

      expect(StatusEffectComponent.of(entity).length).to.equal(1);
    });

    it("removes an opposing status effect", function() {
      const entity = Registry.createEntity();

      StatusEffect.apply(entity, 'off-balance', { count:1 });
      const poised = StatusEffect.apply(entity, 'poised', { count:1 });

      expect(poised.removed).to.deep.equal(['off-balance']);
      expect(StatusEffect.has(entity,'off-balance')).to.be.false;
      expect(StatusEffect.has(entity,'poised')).to.be.true;

      const offBalance = StatusEffect.apply(entity, 'off-balance', { count:1 });

      expect(offBalance.removed).to.deep.equal(['poised']);
      expect(StatusEffect.has(entity,'poised')).to.be.false;
      expect(StatusEffect.has(entity,'off-balance')).to.be.true;
    });
  });

  describe("remove()", function() {
    it("throws when the entity does not have the effect", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffect.remove(entity, 'stun');
      }).to.throw(`Entity[${entity}] does not have stun`);
    });

    it("deletes the status effect entity entirely", function() {
      const entity = Registry.createEntity();
      const { id } = StatusEffect.apply(entity, 'stun', { count:1 });

      StatusEffect.remove(entity, 'stun');

      expect(StatusEffect.has(entity,'stun')).to.be.false;
      expect(Registry.entityExists(id)).to.be.false;
    });
  });

  describe("removeBattleEffects()", function() {
    it("removes battle only effects and keeps persistent effects", function() {
      const entity = Registry.createEntity();

      const poised = StatusEffect.apply(entity, 'poised', { count:1 });
      StatusEffect.apply(entity, 'paralysis');

      StatusEffect.removeBattleEffects();

      expect(StatusEffect.has(entity,'poised')).to.be.false;
      expect(StatusEffect.has(entity,'paralysis')).to.be.true;
      expect(Registry.entityExists(poised.id)).to.be.false;
    });
  });

  describe("queries", function() {
    it("finds the effects an entity has", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();

      StatusEffect.apply(wolf, 'stun', { count:1 });
      StatusEffect.apply(wolf, 'poison', { interval:500, strength:10 });
      StatusEffect.apply(rabbit, 'hidden');

      expect(StatusEffect.of(wolf).length).to.equal(2);
      expect(StatusEffect.get(wolf,'poison').interval).to.equal(500);
      expect(StatusEffect.get(wolf,'hidden')).to.be.null;
      expect(StatusEffect.has(rabbit,'hidden')).to.be.true;

      const codes = StatusEffect.listFor(wolf).map(effect => effect.code);
      expect(codes).to.have.members(['stun','poison']);
    });
  });

});
