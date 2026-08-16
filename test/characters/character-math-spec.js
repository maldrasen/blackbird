describe("CharacterMath", function() {

  describe("calculateSpeedFactor()", function() {
    it('a baseline speed', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:1 } });
      expect(CharacterMath.calculateSpeedFactor(greg)).to.equal(1);
    });

    it('with 30 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:30 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(956);
    });

    it('with 50 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:50 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(926);
    });

    it('with 90 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:90 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(865);
    });

    it('with 150 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:150 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(842);
    });

    it('with 500 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:500 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(783);
    });

    it('with 2000 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:2000 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(683);
    });

    it('with 10000 dex', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1500 }, attributes:{ dexterity:10000 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(550);
    });

    it('when kinda smol', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1200 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(967);
    });

    it('when smol', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1000 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(933);
    });

    it('when hella smol', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:550 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(858);
    });

    it('when kinda big', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1700 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(1025);
    });

    it('when big', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:1900 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(1075);
    });

    it('when hella big', function() {
      const greg = CharacterFixtures.genericMale({ body:{ height:2100 }, attributes:{ dexterity:1 } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(greg))).to.equal(1125);
    });

    it('big fat milkers', function() {
      const milky = CharacterFixtures.genericFemale({ body:{ height:1500 }, attributes:{ dexterity:1 }, breasts:{ breastSize:'big' } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(milky))).to.equal(1020);
    });

    it('huge swinging cow tits', function() {
      const milky = CharacterFixtures.genericFemale({ body:{ height:1500 }, attributes:{ dexterity:1 }, breasts:{ breastSize:'huge' } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(milky))).to.equal(1060);
    });

    it('big fat giant swinging monster tits', function() {
      const milky = CharacterFixtures.genericFemale({ body:{ height:1500 }, attributes:{ dexterity:1 }, breasts:{ breastSize:'monster' } });
      expect(Math.round(1000 * CharacterMath.calculateSpeedFactor(milky))).to.equal(1100);
    });
  });

});
