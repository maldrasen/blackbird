describe('Registry', function() {

  describe('createEntity()', function() {
    it('creates a new entity.', function() {
      const id = Registry.createEntity();

      expect(Registry.listEntityComponents(id)).to.be.empty;

      ActorComponent.create(id,{ name:'Jada', surname:'Fire', gender:'female', species:'nymph' });
      ControlledComponent.create(id,{ control:-200 });

      expect(Registry.listEntityComponents(id)).to.include(ComponentType.actor);
      expect(Registry.listEntityComponents(id)).to.include(ComponentType.controlled);

      const actor = ActorComponent.lookup(id);
      const control = ControlledComponent.lookup(id);

      expect(actor.name).to.equal('Jada');
      expect(control.control).to.equal(-200);
    });
  });

  describe('deleteEntity()', function() {
    it('deletes an entity and all of the associated components.', function() {
      const id = Registry.createEntity();
      ActorComponent.create(id,{ name:'Jada', surname:'Fire', gender:'female', species:'nymph' });
      ControlledComponent.create(id,{ control:-200 });
      Registry.deleteEntity(id);

      const actor = ActorComponent.lookup(id);
      const control = ControlledComponent.lookup(id);
      const types = Registry.listEntityComponents(id);

      expect(actor).to.be.undefined;
      expect(control).to.be.undefined;
      expect(types).to.be.undefined;
    });

    it("deletes an entity and all of the entity's children", function() {
      const actor = Registry.createEntity();

      ActorComponent.create(actor,{ name:'Angela', surname:'White', gender:'female', species:'elf' });
      AnusComponent.create(actor,{ placement:'normal', shape:'normal', minWidth:0, maxWidth:100, prolapseLength:500 });
      AnusComponent.create(actor,{ placement:'mouth', shape:'normal', minWidth:0, maxWidth:100, prolapseLength:1000 });

      expect(Registry.compileEntityData(actor).children.length).to.equal(2);
      expect(Registry.findEntitiesWithComponents([ComponentType.anus]).length).to.equal(2);

      Registry.deleteEntity(actor)

      expect(ActorComponent.lookup(actor)).to.be.undefined
      expect(Registry.findEntitiesWithComponents([ComponentType.anus]).length).to.equal(0);
    });
  });

  describe('updateComponent()', function() {
    it('updates a value in a component', function() {
      const id = Registry.createEntity();
      ActorComponent.create(id,{ name:'Jada', surname:'Fire', gender:'female', species:'nymph' });
      ActorComponent.update(id, { name:'Skylar' });
      ActorComponent.update(id, { surname:'Vox', gender:'futa' });

      let skylar = ActorComponent.lookup(id);

      expect(skylar.name).to.equal('Skylar');
      expect(skylar.surname).to.equal('Vox');
      expect(skylar.gender).to.equal('futa');
      expect(skylar.species).to.equal('nymph');
    });
  });

  describe('deleteComponent()', function() {
    it('deletes a component from an entity', function() {
      const id = Registry.createEntity();
      ActorComponent.create(id,{ name:'Jada', surname:'Fire', gender:'female', species:'nymph' });
      ControlledComponent.create(id,{ control:-200 });
      ActorComponent.destroy(id);

      const actor = ActorComponent.lookup(id);
      const control = ControlledComponent.lookup(id);

      expect(actor).to.be.undefined;
      expect(control.control).to.equal(-200);
    });
  });

  describe('findEntitiesWithComponents()', function() {
    it('finds every entity given a single component', function() {
      const one = Registry.createEntity();
      const two = Registry.createEntity();
      const three = Registry.createEntity();

      ControlledComponent.create(one,{ control:1 });
      ControlledComponent.create(two,{ control:2 });
      SituatedComponent.create(three,{ currentLocation:'filthy-hovel' })

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

      ActorComponent.create(one,  { name:'A', gender:'female', species:'elf' });
      ActorComponent.create(two,  { name:'B', gender:'female', species:'elf' });
      ActorComponent.create(three,{ name:'C', gender:'female', species:'elf' });
      ActorComponent.create(four, { name:'D', gender:'female', species:'elf' });

      ManaComponent.create(three,{});
      ManaComponent.create(four,{});
      ManaComponent.create(five,{});
      ManaComponent.create(six,{});

      HealthComponent.create(two, { currentStamina:1000, currentHealth:100, maxHealth:100 });
      HealthComponent.create(four,{ currentStamina:1000, currentHealth:100, maxHealth:100 });
      HealthComponent.create(six, { currentStamina:1000, currentHealth:100, maxHealth:100 });

      ControlledComponent.create(one,  { control:100 });
      ControlledComponent.create(three,{ control:100 });
      ControlledComponent.create(five, { control:100 });

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

      ActorComponent.create(actor1,{ name:'Hard', surname:'Beefslab', gender:'male', species:'equian' });
      ActorComponent.create(actor2,{ name:'Slappy', surname:'Balls', gender:'futa', species:'equian' });
      ActorComponent.create(actor3,{ name:'Dixon', surname:'Cox', gender:'male', species:'equian' });
      SituatedComponent.create(location,{ currentLocation:'in your mom' });

      const results = Registry.findComponentsWith(ComponentType.actor, data => data.gender === 'male');

      expect(results).to.have.members([actor1,actor3]);
    });
  });

});
