describe("BaseWeapon", function() {

  // These specs run against the real shipped weapons rather than throwaway fixtures - there is no way to unregister a
  // base weapon, so registering test weapons would leave them polluting the armory (starting equipment, shops, etc.).
  // Every base weapon is built at baseline material (steel sharpness, steel heft, leather lash, wood tension all sit
  // at 1.0), so getLow/getHigh come out at the authored numbers; the expected values are hard-coded so that any change
  // to a weapon's data - or to a baseline material factor - trips the spec.

  describe("calculated damage range", function() {
    it("returns the authored damage of a steel blade", function() {
      const longsword = BaseWeapon.lookup('longsword');
      expect(longsword.getLow()).to.equal(50);
      expect(longsword.getHigh()).to.equal(100);
    });

    it("handles a two handed sword", function() {
      const claymore = BaseWeapon.lookup('claymore');
      expect(claymore.getLow()).to.equal(100);
      expect(claymore.getHigh()).to.equal(200);
    });

    it("handles a crush weapon", function() {
      const mace = BaseWeapon.lookup('mace');
      expect(mace.getLow()).to.equal(20);
      expect(mace.getHigh()).to.equal(100);
    });

    it("handles a mixed crush and pierce head", function() {
      const morningStar = BaseWeapon.lookup('morning-star');
      expect(morningStar.getLow()).to.equal(50);
      expect(morningStar.getHigh()).to.equal(200);
    });

    it("handles a whip", function() {
      const bullwhip = BaseWeapon.lookup('bullwhip');
      expect(bullwhip.getLow()).to.equal(20);
      expect(bullwhip.getHigh()).to.equal(50);
    });
  });

  describe("getDamagePerSecond", function() {
    it("is the average damage over a one second swing", function() {
      // longsword is 50-100, average 75, over a 1000ms swing.
      expect(BaseWeapon.lookup('longsword').getDamagePerSecond()).to.equal(75);
    });

    it("is higher for a fast weapon", function() {
      // stiletto is 100-120, average 110, over a 500ms strike.
      expect(BaseWeapon.lookup('stiletto').getDamagePerSecond()).to.equal(220);
    });

    it("is lower for a slow reaching weapon", function() {
      // spear is 50-100, average 75, over a 1200ms thrust.
      expect(BaseWeapon.lookup('spear').getDamagePerSecond()).to.equal(62.5);
    });
  });

  describe("getMaterialParts", function() {
    it("lists each part with its material and amount, primary first", function() {
      expect(BaseWeapon.lookup('longsword').getMaterialParts()).to.deep.equal([
        { part:'blade', material:MaterialType.steel, amount:3 },
        { part:'grip', material:MaterialType.leather, amount:1 },
      ]);
    });

    it("keeps a wooden shaft as a secondary part", function() {
      expect(BaseWeapon.lookup('spear').getMaterialParts()).to.deep.equal([
        { part:'tip', material:MaterialType.steel, amount:1 },
        { part:'shaft', material:MaterialType.wood, amount:2 },
      ]);
    });

    it("is empty for an unarmed strike", function() {
      expect(BaseWeapon.lookup('fist').getMaterialParts()).to.deep.equal([]);
    });
  });

  describe("getPrimaryMaterial", function() {
    it("is the steel blade of a sword", function() {
      expect(BaseWeapon.lookup('longsword').getPrimaryMaterial()).to.equal(MaterialType.steel);
    });

    it("is the leather cord of a whip", function() {
      expect(BaseWeapon.lookup('bullwhip').getPrimaryMaterial()).to.equal(MaterialType.leather);
    });

    it("is the wooden stave of a bow", function() {
      expect(BaseWeapon.lookup('shortbow').getPrimaryMaterial()).to.equal(MaterialType.wood);
    });

    it("is null for an unarmed strike", function() {
      expect(BaseWeapon.lookup('fist').getPrimaryMaterial()).to.be.null;
    });
  });

  describe("getDamageStat", function() {
    it("is sharpness for a bladed weapon", function() {
      expect(BaseWeapon.lookup('longsword').getDamageStat()).to.equal(MaterialFactor.sharpness);
    });

    it("is lash for a whip", function() {
      expect(BaseWeapon.lookup('bullwhip').getDamageStat()).to.equal(MaterialFactor.lash);
    });

    it("is tension for a bow", function() {
      expect(BaseWeapon.lookup('shortbow').getDamageStat()).to.equal(MaterialFactor.tension);
    });
  });

  describe("getDamageFactor", function() {
    // Every base weapon is baseline material, so all of these land on 1.0. Hard-coding that pins the contract that
    // steel (sharpness and heft), leather (lash) and wood (tension) are the 1.0 baselines - drop any of them below
    // 1.0 and the matching weapon's factor, and its damage, would move.
    it("is 1.0 for a steel blade", function() {
      expect(BaseWeapon.lookup('longsword').getDamageFactor()).to.equal(1);
    });

    it("is 1.0 across a steel crush and pierce head", function() {
      expect(BaseWeapon.lookup('morning-star').getDamageFactor()).to.equal(1);
    });

    it("is 1.0 for a leather whip", function() {
      expect(BaseWeapon.lookup('bullwhip').getDamageFactor()).to.equal(1);
    });

    it("is 1.0 for a wooden bow", function() {
      expect(BaseWeapon.lookup('shortbow').getDamageFactor()).to.equal(1);
    });

    it("is 1.0 for an unarmed strike with no material", function() {
      expect(BaseWeapon.lookup('fist').getDamageFactor()).to.equal(1);
    });
  });

  describe("getReduction", function() {
    // Shields are the only weapons with a reduction profile, authored at steel quality and scaled by the face
    // material's absorption just like armor.
    it("returns the authored profile for a steel shield", function() {
      const buckler = BaseWeapon.lookup('buckler');
      expect(buckler.getReduction(DamageType.crush)).to.equal(3);
      expect(buckler.getReduction(DamageType.slash)).to.equal(5);
      expect(buckler.getReduction(DamageType.pierce)).to.equal(4);
    });

    it("scales a wooden shield down by its absorption", function() {
      expect(BaseWeapon.lookup('targe').getReductionMap()).to.deep.equal({ crush:4, slash:6, pierce:5 });
    });

    it("maps all three physical damage types", function() {
      expect(BaseWeapon.lookup('heater-shield').getReductionMap()).to.deep.equal({ crush:8, slash:11, pierce:10 });
    });

    it("is zero for a weapon without a profile", function() {
      expect(BaseWeapon.lookup('longsword').getReductionMap()).to.deep.equal({ crush:0, slash:0, pierce:0 });
      expect(BaseWeapon.lookup('longsword').getTotalReduction()).to.equal(0);
    });
  });

  describe("registered variants", function() {
    // The bone spear is derived from the spear at registration: same shape, bone (0.65 sharpness, cost 2) swapped in
    // for the steel tip, which scales the authored 50-100 pierce damage and the price down with it.
    it("substitutes the primary part's material", function() {
      expect(BaseWeapon.lookup('bone-spear').getMaterialParts()).to.deep.equal([
        { part:'tip', material:MaterialType.bone, amount:1 },
        { part:'shaft', material:MaterialType.wood, amount:2 },
      ]);
    });

    it("names itself after its material unless a name is given", function() {
      expect(BaseWeapon.lookup('bone-spear').getName()).to.equal('bone spear');
      expect(BaseWeapon.lookup('bone-club').getName()).to.equal('bone club');
    });

    it("scales the damage to the substituted material", function() {
      const boneSpear = BaseWeapon.lookup('bone-spear');
      expect(boneSpear.getLow()).to.equal(33);
      expect(boneSpear.getHigh()).to.equal(65);
    });

    it("prices the weapon at the substituted material", function() {
      expect(BaseWeapon.lookup('bone-spear').getValue()).to.equal(183);
    });

    it("does not touch the record it was derived from", function() {
      expect(BaseWeapon.lookup('spear').getPrimaryMaterial()).to.equal(MaterialType.steel);
      expect(BaseWeapon.lookup('spear').getName()).to.equal('spear');
    });
  });

  describe("getValue", function() {
    // Value is the construction cost (materials + effort) nudged by a bounded factor from the weapon's DPS.
    it("prices a longsword from its steel and its forging effort", function() {
      expect(BaseWeapon.lookup('longsword').getValue()).to.equal(640);
    });

    it("prices a heavy two handed sword higher", function() {
      expect(BaseWeapon.lookup('claymore').getValue()).to.equal(920);
    });

    it("prices a spear cheaply - mostly a wooden shaft", function() {
      expect(BaseWeapon.lookup('spear').getValue()).to.equal(208);
    });

    it("is 0 for an unarmed strike", function() {
      expect(BaseWeapon.lookup('fist').getValue()).to.equal(0);
    });

    // A shield's performance factor weighs its whole-body reduction (1.5) over its damage (0.5), so shields carry
    // a premium above their construction cost.
    it("prices a heavy steel shield mostly from its reduction", function() {
      expect(BaseWeapon.lookup('tower-shield').getValue()).to.equal(1004);
    });

    it("prices a small buckler cheaply", function() {
      expect(BaseWeapon.lookup('buckler').getValue()).to.equal(387);
    });
  });

});
