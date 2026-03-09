describe("Character", function() {

  describe("Attribute Values", function() {
    it("Compares both characters and raw values", function() {
      const greg = CharacterFixtures.genericMale({ attributes:{ strength:10, intelligence:30 }});
      const grog = CharacterFixtures.genericMale({ attributes:{ strength:30, intelligence:10 }});

      expect(Character(greg).isSmarterThan(grog)).to.be.true;
      expect(Character(greg).isStrongerThan(20)).to.be.false;
      expect(Character(grog).isStrongerThan(greg)).to.be.true;
      expect(Character(grog).isStrongerThan(20)).to.be.true;
    });
  });

  describe("Body Values", function() {
    it("Compares height", function() {
      const biggest = CharacterFixtures.genericFemale({ body:{ height:2700 } });
      const biggy =  CharacterFixtures.genericFemale({ body:{ height:2600 } });
      const biggs =  CharacterFixtures.genericFemale({ body:{ height:2500 } });

      expect(Character(biggs).isShorterThan(biggy)).to.be.true;
      expect(Character(biggs).isShorterThan(biggy,150)).to.be.false;
      expect(Character(biggs).isShorterThan(biggest,150)).to.be.true;
      expect(Character(biggy).isTallerThan(biggs)).to.be.true;
      expect(Character(biggy).isTallerThan(biggs,150)).to.be.false;
      expect(Character(biggest).isTallerThan(biggs,150)).to.be.true;
    });

    it("Compares breast sizes", function() {
      const horse = CharacterFixtures.genericFemale({ species:'equian', breasts:{ breastSize:'big' } });
      const volume = BreastsComponent.lookup(horse).absoluteBreastVolume;

      expect(Character(horse).breastsAreAtLeast('small')).to.be.true;
      expect(Character(horse).breastsAreAtLeast('big')).to.be.true;
      expect(Character(horse).breastsAreAtLeast('huge')).to.be.false;
      expect(Character(horse).breastsAreAtLeast(volume - 10)).to.be.true;
      expect(Character(horse).breastsAreAtLeast(volume + 10)).to.be.false;
    });

    it("Compares cock sizes", function() {
      const horse = CharacterFixtures.genericMale({ species:'equian', cock:{ size:'huge' } });
      const length = CockComponent.lookupNormalOf(horse).length;

      expect(Character(horse).cockIsAtLeast('big')).to.be.true;
      expect(Character(horse).cockIsAtLeast('huge')).to.be.true;
      expect(Character(horse).cockIsAtLeast('monster')).to.be.false;
      expect(Character(horse).cockIsAtLeast(length)).to.be.true;
      expect(Character(horse).cockIsAtLeast(length + 10)).to.be.false;
    });
  });

  describe("Sexual Preferences", function() {
    describe("isStraight()", function() {
      it("males and females can be straight", function() {
        const man = CharacterFixtures.genericMale({ sexualPreferences:{ androphilic:-10, gynophilic:10 } });
        const woman = CharacterFixtures.genericFemale({ sexualPreferences:{ androphilic:10, gynophilic:-10 } });
        expect(Character(man).isStraight()).to.be.true;
        expect(Character(woman).isStraight()).to.be.true;
      });

      it("males and females can be gay", function() {
        const man = CharacterFixtures.genericMale({ sexualPreferences:{ androphilic:10, gynophilic:-10 } });
        const woman = CharacterFixtures.genericFemale({ sexualPreferences:{ androphilic:-10, gynophilic:10 } });
        expect(Character(man).isGay()).to.be.true;
        expect(Character(woman).isGay()).to.be.true;
      });
    });
  });

  describe("Equipment", function() {
    it('knows when you are naked', function() {
      const goat = CharacterFixtures.genericMale({});
      const horse = CharacterFixtures.genericMale({ species:'equian' });
      const wolf = CharacterFixtures.genericMale({ species:'lupin' });

      ItemFixtures.addRandomEquipment(goat)

      const pants = PantsFactory.build();
      InventoryComponent.addItem(horse, pants);
      EquipmentComponent.update(horse, { legs:pants });

      expect(Character(goat).isNaked()).to.be.false
      expect(Character(goat).isTopless()).to.be.false
      expect(Character(horse).isTopless()).to.be.true;
      expect(Character(horse).isBottomless()).to.be.false;
      expect(Character(wolf).isNaked()).to.be.true;
      expect(Character(wolf).isBottomless()).to.be.true;
    });
  });

  describe("Orgasm Data", function() {
    describe("getOrgasmThreshold()", function() {
      it("when normal", function() {
        const lady = Character(CharacterFixtures.genericFemale({}));
        expect(lady.getOrgasmThreshold()).to.equal(10000);
      });

      it("when premature", function() {
        const lady = Character(CharacterFixtures.genericFemale({ aspects:{ premature:2 } }));
        expect(lady.getOrgasmThreshold()).to.equal(5000);
      });
    });

    describe("rollForOrgasm()", function() {
      it("always orgasms when pleasure is above threshold (for now)", function() {
        const lady = Character(CharacterFixtures.genericFemale({ arousal:{ arousal:1, pleasure:10001 } }));
        const ladyboy = Character(CharacterFixtures.genericMale({ arousal:{ arousal:99, pleasure:9999 } }));
        expect(lady.rollForOrgasm({})).to.be.true;
        expect(ladyboy.rollForOrgasm({})).to.be.false;
      });
    });

    describe("rollRefectoryPeriod()", function() {
      it("just randomly picks a number (for now)", function() {
        Random.stubBetween(10);
        expect(Character(CharacterFixtures.genericMale({})).rollRefectoryPeriod()).to.equal(10);
      });
    });
  });

});
