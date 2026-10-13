describe("Character", function() {

  describe("Attribute Values", function() {
    it("Compares both characters and raw values", function() {
      const greg = CharacterSupport.genericMale({ attributes:{ strength:10, intelligence:30 }});
      const grog = CharacterSupport.genericMale({ attributes:{ strength:30, intelligence:10 }});

      expect(Character(greg).isSmarterThan(grog)).to.be.true;
      expect(Character(greg).isStrongerThan(20)).to.be.false;
      expect(Character(grog).isStrongerThan(greg)).to.be.true;
      expect(Character(grog).isStrongerThan(20)).to.be.true;
    });
  });

  describe("Body Values", function() {
    it("Compares height", function() {
      const biggest = CharacterSupport.genericFemale({ body:{ height:2700 } });
      const biggy =  CharacterSupport.genericFemale({ body:{ height:2600 } });
      const biggs =  CharacterSupport.genericFemale({ body:{ height:2500 } });

      expect(Character(biggs).isShorterThan(biggy)).to.be.true;
      expect(Character(biggs).isShorterThan(biggy,150)).to.be.false;
      expect(Character(biggs).isShorterThan(biggest,150)).to.be.true;
      expect(Character(biggy).isTallerThan(biggs)).to.be.true;
      expect(Character(biggy).isTallerThan(biggs,150)).to.be.false;
      expect(Character(biggest).isTallerThan(biggs,150)).to.be.true;
    });

    it("Compares breast sizes", function() {
      const horse = CharacterSupport.genericFemale({ species:SpeciesCode.equian, breasts:{ breastSize:'big' } });
      const volume = BreastsComponent.lookup(horse).absoluteBreastVolume;

      expect(Character(horse).breastsAreAtLeast('small')).to.be.true;
      expect(Character(horse).breastsAreAtLeast('big')).to.be.true;
      expect(Character(horse).breastsAreAtLeast('huge')).to.be.false;
      expect(Character(horse).breastsAreAtLeast(volume - 10)).to.be.true;
      expect(Character(horse).breastsAreAtLeast(volume + 10)).to.be.false;
    });

    it("Knows when breasts have a shape that can be compared to an object", function() {
      const round = CharacterSupport.genericFemale({ breasts:{ breastShape:'balls' } });
      const torpedo = CharacterSupport.genericFemale({ breasts:{ breastShape:'torpedoes' } });
      const flat = CharacterSupport.genericMale({});

      expect(Character(round).hasComparableBreasts()).to.be.true;
      expect(Character(torpedo).hasComparableBreasts()).to.be.false;
      expect(Character(flat).hasComparableBreasts()).to.be.false;
      expect(CharacterRequirements.shapeComparableBreasts('C')({ C:round })).to.be.true;
      expect(CharacterRequirements.shapeComparableBreasts('C')({ C:torpedo })).to.be.false;
    });

    it("Compares cock sizes", function() {
      const horse = CharacterSupport.genericMale({ species:SpeciesCode.equian, cock:'huge' });
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
        const man = CharacterSupport.genericMale({ sexualPreferences:{ androphilic:-10, gynophilic:10 } });
        const woman = CharacterSupport.genericFemale({ sexualPreferences:{ androphilic:10, gynophilic:-10 } });
        expect(Character(man).isStraight()).to.be.true;
        expect(Character(woman).isStraight()).to.be.true;
      });

      it("males and females can be gay", function() {
        const man = CharacterSupport.genericMale({ sexualPreferences:{ androphilic:10, gynophilic:-10 } });
        const woman = CharacterSupport.genericFemale({ sexualPreferences:{ androphilic:-10, gynophilic:10 } });
        expect(Character(man).isGay()).to.be.true;
        expect(Character(woman).isGay()).to.be.true;
      });
    });
  });

  describe("Equipment", function() {
    it('knows when you are naked', function() {
      const goat = CharacterSupport.genericMale({});
      const horse = CharacterSupport.genericMale({ species:SpeciesCode.equian });
      const wolf = CharacterSupport.genericMale({ species:SpeciesCode.lupin });

      ItemSupport.equip(goat, 'leggings', ['leather']);
      ItemSupport.equip(goat, 'boots', ['leather']);
      ItemSupport.equip(horse, 'leggings', ['leather']);

      expect(Character(goat).isNaked()).to.be.false
      expect(Character(wolf).isNaked()).to.be.true;
      expect(Character(goat).isEquipped(EquipmentSlot.legs)).to.be.true
      expect(Character(horse).isEquipped(EquipmentSlot.legs)).to.be.true;
      expect(Character(horse).isEquipped(EquipmentSlot.chest)).to.be.false;
    });
  });

  describe("Orgasm Data", function() {
    describe("getOrgasmThreshold()", function() {
      it("when normal", function() {
        const lady = Character(CharacterSupport.genericFemale({}));
        expect(lady.getOrgasmThreshold()).to.equal(10000);
      });

      it("when premature", function() {
        const lady = Character(CharacterSupport.genericFemale({ aspects:{ premature:2 } }));
        expect(lady.getOrgasmThreshold()).to.equal(5000);
      });
    });

    describe("rollForOrgasm()", function() {
      it("always orgasms when pleasure is above threshold (for now)", function() {
        const lady = Character(CharacterSupport.genericFemale({ arousal:{ arousal:1, pleasure:10001 } }));
        const ladyboy = Character(CharacterSupport.genericMale({ arousal:{ arousal:99, pleasure:9999 } }));
        expect(lady.rollForOrgasm(10001)).to.be.true;
        expect(ladyboy.rollForOrgasm(9999)).to.be.false;
      });
    });

    describe("rollRefractoryPeriod()", function() {
      it("just randomly picks a number (for now)", function() {
        Random.stubBetween(10);
        expect(Character(CharacterSupport.genericMale({})).rollRefractoryPeriod()).to.equal(10);
      });
    });
  });

  describe("Equipment", function() {
    it("is naked or exposed", function() {
      const entity = CharacterSupport.genericMale({});
      const character = Character(entity);
      const asslessChaps = EquipmentFactory().build('chaps');
      const titsOutCorset = EquipmentFactory().build('low-corset');
      const equipment = EquipmentManager(entity);

      expect(character.isNaked()).to.be.true;
      equipment.equipItem(titsOutCorset,EquipmentSlot.chest);
      equipment.equipItem(asslessChaps,EquipmentSlot.legs);

      expect(character.isNaked()).to.be.false;
      expect(character.isCrotchExposed()).to.be.true;
      expect(character.areBreastsExposed()).to.be.true;
    });
  });

});
