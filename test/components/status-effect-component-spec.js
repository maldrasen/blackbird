describe("StatusEffectComponent", function() {

  describe("create()", function() {
    it("fills the unset properties with null", function() {
      const entity = Registry.createEntity();
      const id = StatusEffectComponent.create(entity, { code:'hidden' });

      const statusEffect = StatusEffectComponent.lookup(id);
      expect(statusEffect.code).to.equal('hidden');
      expect(statusEffect.count).to.be.null;
      expect(statusEffect.interval).to.be.null;
      expect(statusEffect.duration).to.be.null;
      expect(statusEffect.strength).to.be.null;
      expect(statusEffect.damage).to.be.null;
    });

    it("keeps a damage range", function() {
      const entity = Registry.createEntity();
      const id = StatusEffectComponent.create(entity, { code:'poison', strength:10, damage:[5,10] });

      expect(StatusEffectComponent.lookup(id).damage).to.deep.equal([5,10]);
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

    it("rejects a damage range that isn't a low high pair", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'poison', damage:[5] });
      }).to.throw('Validate.isRange Failed');
    });

    it("rejects a damage range that runs backwards", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'poison', damage:[10,5] });
      }).to.throw('low(10) is greater than high(5)');
    });

    it("rejects a damage range starting below one", function() {
      const entity = Registry.createEntity();
      expect(function() {
        StatusEffectComponent.create(entity, { code:'poison', damage:[0,5] });
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

});
