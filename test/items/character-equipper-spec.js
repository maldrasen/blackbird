describe('CharacterEquipper', function() {

  describe('equip()', function() {

    // Every bow is two-handed, so an archer is the character most likely to shop their way out of a preset shield.
    it('only picks a primary that leaves a preset off-hand alone', function() {
      const id = CharacterSupport.genericMale({ skills:{ bows:50 } });
      const shield = ItemSupport.equip(id, 'round-shield', ['steel']);

      const equipment = CharacterEquipper(id).equip({ budget:150, naked:true });

      expect(EquipmentComponent.lookup(id).secondary).to.equal(shield);
      expect(Item(equipment.primary).getBase().getHands()).to.not.equal(WeaponHandedness.two);
    });

    // The elves shop the standard depot, which is stocked with known pieces so the specs can say what should
    // be picked. A leather low corset is slutty, feminine, and natural, and is worth a little more than a wool
    // doublet, so value alone would always take the corset.
    describe('armor', function() {
      function female(archetype) { return CharacterSupport.genericFemale({ personality:{ archetype } }); }

      function chestCodeFor(id, budget) {
        const equipment = CharacterEquipper(id).equip({ budget, bareHanded:true });
        return equipment.chest ? Item(equipment.chest).getBase().getCode() : null;
      }

      it('takes the piece the character likes over the better value', function() {
        ItemSupport.stockArmor('standard', [['low-corset',['leather']], ['doublet',['wool']]]);
        expect(chestCodeFor(female(ArchetypeCode.bimbo), 150)).to.equal('low-corset');
      });

      it('skips a piece the character dislikes when there is something else to wear', function() {
        ItemSupport.stockArmor('standard', [['low-corset',['leather']], ['doublet',['wool']]]);
        expect(chestCodeFor(female(ArchetypeCode.prude), 150)).to.equal('doublet');
      });

      it('wears a hated piece rather than going bare when the character minds showing skin', function() {
        ItemSupport.stockArmor('standard', [['low-corset',['leather']]]);
        expect(chestCodeFor(female(ArchetypeCode.prude), 150)).to.equal('low-corset');
      });

      it('goes bare rather than wearing a hated piece when the character likes showing skin', function() {
        ItemSupport.stockArmor('standard', [['hauberk',['iron']]]);
        expect(chestCodeFor(female(ArchetypeCode.slut), 300)).to.be.null;
        expect(chestCodeFor(female(ArchetypeCode.prude), 300)).to.equal('hauberk');
      });

      it('leaves a slot that is fine bare empty rather than wearing a hated piece', function() {
        ItemSupport.stockArmor('standard', [['sabatons',['steel']]]);
        const equipment = CharacterEquipper(female(ArchetypeCode.bimbo)).equip({ budget:600, bareHanded:true });
        expect(equipment.feet).to.be.undefined;
      });

      it('still shops by value for a character with no opinion of the stock', function() {
        ItemSupport.stockArmor('standard', [['doublet',['wool']], ['doublet',['silk']]]);
        const equipment = CharacterEquipper(female(ArchetypeCode.reserved)).equip({ budget:150, bareHanded:true });
        expect(Item(equipment.chest).getPrimaryMaterial()).to.equal('silk');
      });
    });
  });

  describe('assignSkills()', function() {

    // The sword is built and the equipper is made before the roll is stubbed because building an item rolls for its
    // materials.
    function swordsmanAt(level, skills={}) {
      const id = CharacterSupport.genericMale({ skills });
      ExperienceComponent.update(id, { level:level, essence:1000000 });
      ItemSupport.equip(id, 'longsword', ['steel']);
      return id;
    }

    it('gives an untrained character the minimum skill with their weapon', function() {
      const id = swordsmanAt(1);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(1);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(11);
    });

    // A stubbed roll throws when it's outside of the rolled range, so a 9 only passes if the limit was 2 * level.
    it('rolls a higher minimum for a higher level character', function() {
      const id = swordsmanAt(5);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(19);
    });

    it('leaves a skill alone when it already beats the rolled minimum', function() {
      const id = swordsmanAt(5, { swords:30 });
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(30);
    });

    it('raises a trained skill that falls short of the rolled minimum', function() {
      const id = swordsmanAt(5, { swords:12 });
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(19);
    });

    it('covers the off-hand as well', function() {
      const id = swordsmanAt(1);
      ItemSupport.equip(id, 'round-shield', ['steel']);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(0, 1);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(10);
      expect(SkillsComponent.lookup(id).block).to.equal(11);
    });
  });

});
