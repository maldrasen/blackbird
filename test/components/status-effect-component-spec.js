describe("StatusEffectComponent", function() {

  describe("create()", function() {
    it("fills the numeric properties with null", function() {
      const entity = Registry.createEntity();
      const id = StatusEffectComponent.create(entity, { code:'hidden' });

      const statusEffect = StatusEffectComponent.lookup(id);
      expect(statusEffect.code).to.equal('hidden');
      expect(statusEffect.count).to.be.null;
      expect(statusEffect.interval).to.be.null;
      expect(statusEffect.duration).to.be.null;
      expect(statusEffect.strength).to.be.null;
    });
  });

  describe("validate()", function() {
    it("rejects an unknown property", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'stun', wobble:1 });
      }).to.throw('does not have a wobble property');
    });

    it("rejects an unregistered code", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'wobbly' });
      }).to.throw('Validate.isIn Failed');
    });

    it("rejects a numeric property below one", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'stun', count:0 });
      }).to.throw('Validate.atLeast Failed');
    });

    it("rejects a duplicate effect on the same entity", function() {
      const entity = Registry.createEntity();
      StatusEffectComponent.create(entity, { code:'stun', count:1 });
      expect(function() {
        StatusEffectComponent.create(entity, { code:'stun', count:2 });
      }).to.throw('Validate.equals Failed');
    });
  });

  describe("apply()", function() {
    it("throws on a bad status effect code", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.apply(entity, 'wobbly', { count:1 });
      }).to.throw('Bad status effect code');
    });

    it("creates a new status effect", function() {
      const entity = Registry.createEntity();
      const { id, removed } = StatusEffectComponent.apply(entity, 'stun', { count:2 });

      expect(removed).to.be.empty;
      expect(StatusEffectComponent.findByCode(entity,'stun').count).to.equal(2);
      expect(StatusEffectComponent.lookup(id)._parentId).to.equal(entity);
    });

    it("renews an effect keeping the larger values", function() {
      const entity = Registry.createEntity();
      const { id } = StatusEffectComponent.apply(entity, 'blind', { duration:1000 });

      const renewed = StatusEffectComponent.apply(entity, 'blind', { duration:2000, strength:5 });
      expect(renewed.id).to.equal(id);
      expect(StatusEffectComponent.findByCode(entity,'blind').duration).to.equal(2000);
      expect(StatusEffectComponent.findByCode(entity,'blind').strength).to.equal(5);

      StatusEffectComponent.apply(entity, 'blind', { duration:500, strength:2 });
      expect(StatusEffectComponent.findByCode(entity,'blind').duration).to.equal(2000);
      expect(StatusEffectComponent.findByCode(entity,'blind').strength).to.equal(5);

      expect(StatusEffectComponent.of(entity).length).to.equal(1);
    });

    it("removes an opposing status effect", function() {
      const entity = Registry.createEntity();

      StatusEffectComponent.apply(entity, 'off-balance', { count:1 });
      const poised = StatusEffectComponent.apply(entity, 'poised', { count:1 });

      expect(poised.removed).to.deep.equal(['off-balance']);
      expect(StatusEffectComponent.has(entity,'off-balance')).to.be.false;
      expect(StatusEffectComponent.has(entity,'poised')).to.be.true;

      const offBalance = StatusEffectComponent.apply(entity, 'off-balance', { count:1 });

      expect(offBalance.removed).to.deep.equal(['poised']);
      expect(StatusEffectComponent.has(entity,'poised')).to.be.false;
      expect(StatusEffectComponent.has(entity,'off-balance')).to.be.true;
    });
  });

  describe("remove()", function() {
    it("throws when the entity does not have the effect", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.remove(entity, 'stun');
      }).to.throw(`Entity[${entity}] does not have stun`);
    });

    it("deletes the status effect entity entirely", function() {
      const entity = Registry.createEntity();
      const { id } = StatusEffectComponent.apply(entity, 'stun', { count:1 });

      StatusEffectComponent.remove(entity, 'stun');

      expect(StatusEffectComponent.has(entity,'stun')).to.be.false;
      expect(Registry.entityExists(id)).to.be.false;
    });
  });

  describe("removeBattleEffects()", function() {
    it("removes battle only effects and keeps persistent effects", function() {
      const entity = Registry.createEntity();

      const poised = StatusEffectComponent.apply(entity, 'poised', { count:1 });
      StatusEffectComponent.apply(entity, 'paralysis');

      StatusEffectComponent.removeBattleEffects();

      expect(StatusEffectComponent.has(entity,'poised')).to.be.false;
      expect(StatusEffectComponent.has(entity,'paralysis')).to.be.true;
      expect(Registry.entityExists(poised.id)).to.be.false;
    });
  });

  describe("queries", function() {
    it("finds the effects an entity has", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();

      StatusEffectComponent.apply(wolf, 'stun', { count:1 });
      StatusEffectComponent.apply(wolf, 'poison', { interval:500, strength:10 });
      StatusEffectComponent.apply(rabbit, 'hidden');

      expect(StatusEffectComponent.of(wolf).length).to.equal(2);
      expect(StatusEffectComponent.findByCode(wolf,'poison').interval).to.equal(500);
      expect(StatusEffectComponent.findByCode(wolf,'hidden')).to.be.null;
      expect(StatusEffectComponent.has(rabbit,'hidden')).to.be.true;

      const codes = StatusEffectComponent.listFor(wolf).map(effect => effect.code);
      expect(codes).to.have.members(['stun','poison']);
    });
  });

});
