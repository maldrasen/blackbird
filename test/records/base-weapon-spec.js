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

  describe("getValue", function() {
    it("prices a longsword from its steel and its forging effort", function() {
      expect(BaseWeapon.lookup('longsword').getValue()).to.equal(645);
    });

    it("prices a heavy two handed sword higher", function() {
      expect(BaseWeapon.lookup('claymore').getValue()).to.equal(885);
    });

    it("prices a spear cheaply - mostly a wooden shaft", function() {
      expect(BaseWeapon.lookup('spear').getValue()).to.equal(215);
    });

    it("is 0 for an unarmed strike", function() {
      expect(BaseWeapon.lookup('fist').getValue()).to.equal(0);
    });
  });

});
