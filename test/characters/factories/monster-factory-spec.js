describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("leaves a natural fighter's hands empty", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      const equipment = EquipmentComponent.lookup(id);

      expect(equipment.primary).to.be.undefined;
      expect(InventoryComponent.lookup(id).items).to.be.empty;
      expect(Monster(id).getPrioritizedAbilities().map(a => a.code)).to.include('punch');
    });

    it("equips real weapons", function() {
      const id = MonsterFactory.build('kobold-tosser');
      const primary = EquipmentComponent.lookup(id).primary;

      expect(WeaponComponent.lookup(primary).base).to.equal('bone-spear');
      expect(Weapon(primary).getName()).to.equal('bone spear');
      expect(InventoryComponent.lookup(id).items).to.include(primary);
    });

    it("equips armor", function() {
      const id = MonsterFactory.build('kobold-trapper');
      const chest = EquipmentComponent.lookup(id).chest;

      expect(ArmorComponent.lookup(chest).base).to.equal('leather-doublet');
      expect(Armor(chest).getName()).to.equal('leather doublet');
    });
  });

  describe('Building a beast type monster', function() {
    it("builds an actor component without a species", function() {
      const id = MonsterFactory.build('rabid-skitterfang');
      const actor = ActorComponent.lookup(id);

      expect(actor.name).to.equal('Rabid Skitterfang');
      expect(actor.gender).to.equal(Gender.none);
      expect(actor.species).to.be.undefined;
    });

    it("builds a skills component with every skill at zero", function() {
      const id = MonsterFactory.build('rabid-skitterfang');
      const skills = SkillsComponent.lookup(id);

      expect(skills.dodge).to.equal(0);
      SkillsComponent.getSkills().forEach(code => {
        expect(skills[code]).to.equal(0);
      });
    });
  });

});
