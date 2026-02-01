describe('Registry', function() {

  describe('createEntity()', function() {
    it('creates a new entity.', function() {
      const id = Registry.createEntity();

      expect(Registry.listEntityComponents(id)).to.be.empty;

      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', gender:'female', species:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });

      expect(Registry.listEntityComponents(id)).to.include(ComponentType.actor);
      expect(Registry.listEntityComponents(id)).to.include(ComponentType.controlled);

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);

      expect(actor.firstName).to.equal('Jada');
      expect(control.control).to.equal(-200);
    });
  });

  describe('deleteEntity()', function() {
    it('deletes an entity and all of the associated components.', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', gender:'female', species:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.deleteEntity(id);

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);
      const types = Registry.listEntityComponents(id);

      expect(actor).to.be.undefined;
      expect(control).to.be.undefined;
      expect(types).to.be.undefined;
    });

    it("deletes an entity and all of the entity's children", function() {
      const actor = Registry.createEntity();
      const skill1 = Registry.createEntity();
      const skill2 = Registry.createEntity();

      Registry.createActorComponent(actor,{ firstName:'Angela', lastName:'White', gender:'female', species:'elf' });
      Registry.createSkillComponent(actor,skill1,{ code:'deepthroat' });
      Registry.createSkillComponent(actor,skill2,{ code:'fisting' });

      expect(Registry.compileEntityData(actor).children.length).to.equal(2);

      Registry.deleteEntity(actor)

      expect(Registry.lookupActorComponent(actor)).to.be.undefined
      expect(Registry.lookupSkillComponent(skill1)).to.be.undefined
      expect(Registry.lookupSkillComponent(skill2)).to.be.undefined
    });
  });

  describe('updateComponent()', function() {
    it('updates a value in a component', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', gender:'female', species:'nymph' });
      Registry.updateActorComponent(id, { firstName:'Skylar' });
      Registry.updateActorComponent(id, { lastName:'Vox', gender:'futa' });

      let skylar = Registry.lookupActorComponent(id);

      expect(skylar.firstName).to.equal('Skylar');
      expect(skylar.lastName).to.equal('Vox');
      expect(skylar.gender).to.equal('futa');
      expect(skylar.species).to.equal('nymph');
    });
  });

  describe('deleteComponent()', function() {
    it('deletes a component from an entity', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', gender:'female', species:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.deleteActorComponent(id);

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);

      expect(actor).to.be.undefined;
      expect(control.control).to.equal(-200);
    });
  });

  describe('findEntitiesWithComponents()', function() {
    it('finds every entity given a single component', function() {
      const one = Registry.createEntity();
      const two = Registry.createEntity();
      const three = Registry.createEntity();

      Registry.createControlledComponent(one,{ control:1 });
      Registry.createControlledComponent(two,{ control:2 });
      Registry.createSituatedComponent(three,{ currentLocation:'filthy-hovel' })

      let ids = Registry.findEntitiesWithComponents([ComponentType.controlled]);

      expect(ids.length).to.equal(2);
      expect(ids).to.have.members([one,two]);
    });

    it('finds the union of all the entities that have all the components', function() {
      const one = Registry.createEntity();
      const two = Registry.createEntity();
      const three = Registry.createEntity();
      const four = Registry.createEntity();
      const five = Registry.createEntity();
      const six = Registry.createEntity();

      Registry.createActorComponent(one,  { firstName:'A', lastName:'E', gender:'female', species:'elf' });
      Registry.createActorComponent(two,  { firstName:'B', lastName:'F', gender:'female', species:'elf' });
      Registry.createActorComponent(three,{ firstName:'C', lastName:'G', gender:'female', species:'elf' });
      Registry.createActorComponent(four, { firstName:'D', lastName:'H', gender:'female', species:'elf' });

      Registry.createManaComponent(three,{});
      Registry.createManaComponent(four,{});
      Registry.createManaComponent(five,{});
      Registry.createManaComponent(six,{});

      Registry.createHealthComponent(two, { currentStamina:1000, maxStamina:1000 });
      Registry.createHealthComponent(four,{ currentStamina:1000, maxStamina:1000 });
      Registry.createHealthComponent(six, { currentStamina:1000, maxStamina:1000 });

      Registry.createControlledComponent(one,  { control:100 });
      Registry.createControlledComponent(three,{ control:100 });
      Registry.createControlledComponent(five, { control:100 });

      let find1 = Registry.findEntitiesWithComponents([ComponentType.actor, ComponentType.mana]);
      let find2 = Registry.findEntitiesWithComponents([ComponentType.actor, ComponentType.mana, ComponentType.health])
      let find3 = Registry.findEntitiesWithComponents([ComponentType.mana, ComponentType.controlled])

      expect(find1).to.have.members([three,four]);
      expect(find2).to.have.members([four]);
      expect(find3).to.have.members([three,five]);
    });
  });

  describe('findComponentsWith()', function() {
    it('finds components given a filter', function() {
      const actor1 = Registry.createEntity();
      const actor2 = Registry.createEntity();
      const actor3 = Registry.createEntity();
      const location = Registry.createEntity();

      Registry.createActorComponent(actor1,{ firstName:'Hard', lastName:'Beefslab', gender:'male', species:'elf' });
      Registry.createActorComponent(actor2,{ firstName:'Slappy', lastName:'Balls', gender:'futa', species:'elf' });
      Registry.createActorComponent(actor3,{ firstName:'Dixon', lastName:'Cox', gender:'male', species:'elf' });
      Registry.createSituatedComponent(location,{ currentLocation:'in your mom' });

      const results = Registry.findComponentsWith(ComponentType.actor, data => data.gender === 'male');

      expect(results).to.have.members([actor1,actor3]);
    });
  });

});
