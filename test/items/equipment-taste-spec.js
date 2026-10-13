describe('EquipmentTaste', function() {

  // The expected numbers come straight from the shipped archetype weights and the module's gender table, so retuning
  // either trips these on purpose. A leather low corset is tagged slutty, feminine, and natural.

  function female(archetype) { return CharacterSupport.genericFemale({ personality:{ archetype } }); }
  function male(archetype) { return CharacterSupport.genericMale({ personality:{ archetype } }); }

  describe('getPreference()', function() {
    it('sums the archetype weights for every tag on the item', function() {
      const corset = ItemSupport.build('low-corset', ['leather']);
      expect(EquipmentTaste(female(ArchetypeCode.bimbo)).getPreference(corset)).to.equal(90);
      expect(EquipmentTaste(female(ArchetypeCode.prude)).getPreference(corset)).to.equal(-60);
    });

    it('adds the gender weight on top of the archetype', function() {
      const corset = ItemSupport.build('low-corset', ['leather']);
      expect(EquipmentTaste(male(ArchetypeCode.prude)).getPreference(corset)).to.equal(-140);
      expect(EquipmentTaste(male(ArchetypeCode.slut)).getPreference(corset)).to.equal(40);
    });

    it('weighs a style the archetype dislikes', function() {
      const plate = ItemSupport.buildSteel('plate');
      expect(EquipmentTaste(female(ArchetypeCode.prude)).getPreference(plate)).to.equal(100);
      expect(EquipmentTaste(female(ArchetypeCode.bimbo)).getPreference(plate)).to.equal(-50);
    });

    it('weighs only gender for the player, who has no archetype', function() {
      const corset = ItemSupport.build('low-corset', ['leather']);
      expect(EquipmentTaste(CharacterSupport.player()).getPreference(corset)).to.equal(-80);
    });

    it('is neutral about an untagged item', function() {
      const sword = ItemSupport.buildSteel('longsword');
      expect(EquipmentTaste(female(ArchetypeCode.bimbo)).getPreference(sword)).to.equal(0);
      expect(EquipmentTaste(male(ArchetypeCode.prude)).getPreference(sword)).to.equal(0);
    });
  });

  describe('acceptsBare()', function() {
    it('never minds a bare head, hands, or feet', function() {
      const taste = EquipmentTaste(female(ArchetypeCode.prude));
      expect(taste.acceptsBare(EquipmentSlot.head)).to.be.true;
      expect(taste.acceptsBare(EquipmentSlot.hands)).to.be.true;
      expect(taste.acceptsBare(EquipmentSlot.feet)).to.be.true;
    });

    it('only goes bare at the chest or legs when the archetype likes slutty things', function() {
      expect(EquipmentTaste(female(ArchetypeCode.slut)).acceptsBare(EquipmentSlot.chest)).to.be.true;
      expect(EquipmentTaste(female(ArchetypeCode.bimbo)).acceptsBare(EquipmentSlot.legs)).to.be.true;
      expect(EquipmentTaste(female(ArchetypeCode.prude)).acceptsBare(EquipmentSlot.chest)).to.be.false;
      expect(EquipmentTaste(male(ArchetypeCode.nice)).acceptsBare(EquipmentSlot.legs)).to.be.false;
    });

    it('keeps the player covered at the chest and legs', function() {
      const taste = EquipmentTaste(CharacterSupport.player());
      expect(taste.acceptsBare(EquipmentSlot.chest)).to.be.false;
      expect(taste.acceptsBare(EquipmentSlot.legs)).to.be.false;
    });
  });

});
