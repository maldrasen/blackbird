describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory('deepdark-whisperer').build();
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("merges option triggers with the base triggers without duplicating them", function() {
      const id = MonsterFactory('deepdark-kobold',{ triggers:['black-hair'] }).build();
      expect(id).to.not.be.undefined;
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("leaves a natural fighter's hands empty", function() {
      const id = MonsterFactory('kobold-dick-puncher').build();
      const equipment = EquipmentComponent.lookup(id);

      expect(equipment.primary).to.be.undefined;
      expect(InventoryComponent.lookup(id).items).to.be.empty;
      expect(Monster(id).getPrioritizedAbilities().map(a => a.code)).to.include('punch');
    });

    it("equips real weapons", function() {
      const id = MonsterFactory('kobold-tosser').build();
      const primary = EquipmentComponent.lookup(id).primary;

      expect(WeaponComponent.lookup(primary).base).to.equal('bone-spear');
      expect(Weapon(primary).getName()).to.equal('bone spear');
      expect(InventoryComponent.lookup(id).items).to.include(primary);
    });

    it("equips armor", function() {
      const id = MonsterFactory('kobold-trapper').build();
      const chest = EquipmentComponent.lookup(id).chest;

      expect(ArmorComponent.lookup(chest).base).to.equal('leather-doublet');
      expect(Armor(chest).getName()).to.equal('leather doublet');
    });
  });

  describe('Building a beast type monster', function() {
    it("builds an actor component without a species", function() {
      const id = MonsterFactory('rabid-skitterfang').build();
      const actor = ActorComponent.lookup(id);

      expect(actor.name).to.equal('Rabid Skitterfang');
      expect(actor.gender).to.equal(Gender.none);
      expect(actor.species).to.be.undefined;
    });

    it("builds an attributes component from the monster type's attribute grades", function() {
      const id = MonsterFactory('rabid-skitterfang').build();
      const attributes = AttributesComponent.lookup(id);

      expect(attributes.strength).to.be.within(9,13);
      expect(attributes.dexterity).to.be.within(12,16);
      expect(attributes.vitality).to.be.within(7,11);
      expect(attributes.intelligence).to.be.within(7,11);
      expect(attributes.beauty).to.be.within(7,11);
    });

    it("builds a health component from the rolled vitality", function() {
      const id = MonsterFactory('rabid-skitterfang').build();
      const health = HealthComponent.lookup(id);

      expect(health.maxHealth).to.be.within(5,36);
      expect(health.currentHealth).to.equal(health.maxHealth);
      expect(health.currentStamina).to.be.within(3843,5586);
    });

    it("builds a skills component from the monster type's base skill ranges", function() {
      const id = MonsterFactory('rabid-skitterfang').build();
      const skills = SkillsComponent.lookup(id);

      expect(skills.dodge).to.be.within(10,20);
      expect(skills.daggers).to.be.within(10,20);
      expect(skills.stealth).to.equal(0);
    });

    it("levels a beast at creation without tracking experience", function() {
      const id = MonsterFactory('slithering-yeek').build();
      const attributes = AttributesComponent.lookup(id);
      const total = Object.values(attributes).reduce((sum,value) => sum + value, 0);

      expect(ExperienceComponent.lookup(id)).to.be.undefined;
      expect(total).to.be.within(47,83);
    });

    it("grows one skill from the type's skill growth map on each level", function() {
      const id = MonsterFactory('slithering-yeek').build();
      const skills = SkillsComponent.lookup(id);

      expect(skills.dodge + skills.daggers).to.be.within(22,65);
      expect(skills.stealth).to.equal(0);
    });
  });

});
