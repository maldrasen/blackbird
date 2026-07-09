describe("BaseWeapon", function() {

  // Register a controlled set of base weapons so the assertions test the record's math rather than the (still being
  // tuned) shipped weapon data. Where a test depends on a factor that gets tuned (iron's sharpness, the effort cost),
  // it derives the expected value from the live material/constant rather than hard-coding a number, so tuning the
  // balance does not break the specs. Only the contractual anchors are hard-coded: a baseline material sits at 1.0,
  // and crush damage is never improved by a weapon's material.
  before(function() {
    BaseWeapon.register('spec-steel-sword', {
      name:'spec steel sword', type:'sword', damageType:DamageType.slash, hands:WeaponHandedness.main,
      low:50, high:100, speed:1000, effort:6,
      materials:{ blade:{ material:MaterialType.steel, amount:3 }, grip:{ material:MaterialType.leather, amount:1 }},
    });
    BaseWeapon.register('spec-iron-sword', {
      name:'spec iron sword', type:'sword', damageType:DamageType.slash, hands:WeaponHandedness.main,
      low:50, high:100, speed:1000, effort:6,
      materials:{ blade:{ material:MaterialType.iron, amount:3 }, grip:{ material:MaterialType.leather, amount:1 }},
    });
    BaseWeapon.register('spec-steel-mace', {
      name:'spec steel mace', type:'mace', damageType:DamageType.crush, hands:WeaponHandedness.one,
      low:20, high:100, speed:1000, effort:3,
      materials:{ head:{ material:MaterialType.steel, amount:2 }},
    });
    BaseWeapon.register('spec-iron-mace', {
      name:'spec iron mace', type:'mace', damageType:DamageType.crush, hands:WeaponHandedness.one,
      low:20, high:100, speed:1000, effort:3,
      materials:{ head:{ material:MaterialType.iron, amount:2 }},
    });
    BaseWeapon.register('spec-iron-morningstar', {
      name:'spec iron morningstar', type:'mace', hands:WeaponHandedness.main,
      damageTypes:[{ type:DamageType.crush, percent:50 }, { type:DamageType.pierce, percent:50 }],
      low:50, high:200, speed:1200, effort:4,
      materials:{ head:{ material:MaterialType.iron, amount:2 }},
    });
    BaseWeapon.register('spec-bullwhip', {
      name:'spec bullwhip', type:'whip', damageType:DamageType.slash, hands:WeaponHandedness.main,
      low:20, high:50, speed:1000, effort:3,
      materials:{ cord:{ material:MaterialType.leather, amount:2 }},
    });
    BaseWeapon.register('spec-bow', {
      name:'spec bow', type:'bow', damageType:DamageType.pierce, hands:WeaponHandedness.two,
      low:40, high:80, speed:1000, effort:3,
      materials:{ stave:{ material:MaterialType.wood, amount:2 }},
    });
    BaseWeapon.register('spec-unarmed', {
      name:'spec unarmed', type:'fist', damageType:DamageType.crush, hands:WeaponHandedness.one,
      low:25, high:50, speed:500,
    });
  });

  describe("calculated damage range", function() {
    it("leaves a steel blade at its authored damage (sharpness baseline is 1.0)", function() {
      const weapon = BaseWeapon.lookup('spec-steel-sword');
      expect(weapon.getLow()).to.equal(50);
      expect(weapon.getHigh()).to.equal(100);
    });

    it("scales slash and pierce damage down for a lesser blade material", function() {
      const iron = BaseWeapon.lookup('spec-iron-sword');
      const sharpness = Material.getFactor(MaterialType.iron, MaterialFactor.sharpness);
      expect(iron.getLow()).to.equal(Math.round(50 * sharpness));
      expect(iron.getHigh()).to.equal(Math.round(100 * sharpness));
      expect(iron.getLow()).to.be.below(BaseWeapon.lookup('spec-steel-sword').getLow());
    });

    it("leaves crush damage alone regardless of material", function() {
      // A stone mace hits as hard as a steel one, so iron and steel maces of the same shape match.
      expect(BaseWeapon.lookup('spec-iron-mace').getLow()).to.equal(BaseWeapon.lookup('spec-steel-mace').getLow());
      expect(BaseWeapon.lookup('spec-iron-mace').getHigh()).to.equal(BaseWeapon.lookup('spec-steel-mace').getHigh());
    });

    it("blends the factor across a mixed-damage head", function() {
      // 50% crush (heft) + 50% pierce (sharpness) for the primary material.
      const blend = 0.5 * Material.getFactor(MaterialType.iron, MaterialFactor.heft)
                  + 0.5 * Material.getFactor(MaterialType.iron, MaterialFactor.sharpness);
      const weapon = BaseWeapon.lookup('spec-iron-morningstar');
      expect(weapon.getLow()).to.equal(Math.round(50 * blend));
      expect(weapon.getHigh()).to.equal(Math.round(200 * blend));
    });

    it("returns the authored damage when the weapon has no materials", function() {
      const weapon = BaseWeapon.lookup('spec-unarmed');
      expect(weapon.getLow()).to.equal(25);
      expect(weapon.getHigh()).to.equal(50);
    });
  });

  describe("getDamagePerSecond", function() {
    it("is the average damage over the attack time in seconds", function() {
      // (50+100)/2 = 75 over a 1000ms swing.
      expect(BaseWeapon.lookup('spec-steel-sword').getDamagePerSecond()).to.equal(75);
    });

    it("is based on the material-adjusted damage, not the raw shape numbers", function() {
      const weapon = BaseWeapon.lookup('spec-iron-sword');
      const expected = ((weapon.getLow() + weapon.getHigh()) / 2) / (weapon.getSpeed() / 1000);
      expect(weapon.getDamagePerSecond()).to.equal(expected);
      expect(weapon.getDamagePerSecond()).to.be.below(BaseWeapon.lookup('spec-steel-sword').getDamagePerSecond());
    });

    it("accounts for faster weapons", function() {
      // unarmed is 25-50, average 37.5, over a 500ms strike => 75.
      expect(BaseWeapon.lookup('spec-unarmed').getDamagePerSecond()).to.equal(75);
    });
  });

  describe("getMaterialParts", function() {
    it("lists each part with its material and amount, primary first", function() {
      expect(BaseWeapon.lookup('spec-steel-sword').getMaterialParts()).to.deep.equal([
        { part:'blade', material:MaterialType.steel, amount:3 },
        { part:'grip', material:MaterialType.leather, amount:1 },
      ]);
    });

    it("is empty when the weapon has no materials", function() {
      expect(BaseWeapon.lookup('spec-unarmed').getMaterialParts()).to.deep.equal([]);
    });
  });

  describe("getPrimaryMaterial", function() {
    it("is the material of the first part listed", function() {
      expect(BaseWeapon.lookup('spec-steel-sword').getPrimaryMaterial()).to.equal(MaterialType.steel);
      expect(BaseWeapon.lookup('spec-iron-mace').getPrimaryMaterial()).to.equal(MaterialType.iron);
    });

    it("is null when the weapon has no materials", function() {
      expect(BaseWeapon.lookup('spec-unarmed').getPrimaryMaterial()).to.be.null;
    });
  });

  describe("getDamageStat", function() {
    it("is sharpness for bladed and pointed weapons", function() {
      expect(BaseWeapon.lookup('spec-steel-sword').getDamageStat()).to.equal(MaterialFactor.sharpness);
      expect(BaseWeapon.lookup('spec-iron-mace').getDamageStat()).to.equal(MaterialFactor.sharpness);
    });

    it("is lash for whips", function() {
      expect(BaseWeapon.lookup('spec-bullwhip').getDamageStat()).to.equal(MaterialFactor.lash);
    });

    it("is tension for bows", function() {
      expect(BaseWeapon.lookup('spec-bow').getDamageStat()).to.equal(MaterialFactor.tension);
    });
  });

  describe("getDamageFactor", function() {
    it("is 1.0 for a baseline steel blade", function() {
      expect(BaseWeapon.lookup('spec-steel-sword').getDamageFactor()).to.equal(1);
    });

    it("is the material's sharpness for a pure slash or pierce weapon", function() {
      expect(BaseWeapon.lookup('spec-iron-sword').getDamageFactor())
        .to.equal(Material.getFactor(MaterialType.iron, MaterialFactor.sharpness));
    });

    it("is the material's heft for a crush weapon", function() {
      expect(BaseWeapon.lookup('spec-iron-mace').getDamageFactor())
        .to.equal(Material.getFactor(MaterialType.iron, MaterialFactor.heft));
    });

    it("blends the per-type factors by their percentages", function() {
      const blend = 0.5 * Material.getFactor(MaterialType.iron, MaterialFactor.heft)
                  + 0.5 * Material.getFactor(MaterialType.iron, MaterialFactor.sharpness);
      expect(BaseWeapon.lookup('spec-iron-morningstar').getDamageFactor()).to.equal(blend);
    });

    it("is 1.0 when the weapon has no materials", function() {
      expect(BaseWeapon.lookup('spec-unarmed').getDamageFactor()).to.equal(1);
    });
  });

  describe("getValue", function() {
    // Value = (sum of material cost x amount) + (effort x _effortCost), rounded to the nearest 5. Derived from the
    // live cost/constant so retuning the economy does not break the spec.
    function expectedValue(code) {
      const weapon = BaseWeapon.lookup(code);
      const material = weapon.getMaterialParts().reduce((sum,p) => sum + (Material.getCost(p.material) * p.amount), 0);
      return Math.round((material + (weapon.getEffort() * _effortCost)) / 5) * 5;
    }

    it("is the material cost plus the build effort", function() {
      expect(BaseWeapon.lookup('spec-steel-sword').getValue()).to.equal(expectedValue('spec-steel-sword'));
    });

    it("always comes out as a multiple of 5", function() {
      ['spec-steel-sword','spec-iron-sword','spec-iron-morningstar','spec-bullwhip'].forEach(code => {
        expect(BaseWeapon.lookup(code).getValue() % 5).to.equal(0);
      });
    });

    it("rises with more costly materials", function() {
      // Same shape and effort, steel blade versus iron blade.
      expect(BaseWeapon.lookup('spec-steel-sword').getValue())
        .to.be.above(BaseWeapon.lookup('spec-iron-sword').getValue());
    });

    it("is 0 for a weapon with no materials or effort", function() {
      expect(BaseWeapon.lookup('spec-unarmed').getValue()).to.equal(0);
    });
  });

});
