describe('Registry', function() {

  describe('createEntity()', function() {
    it('creates a new entity.', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);

      expect(actor.firstName).to.equal('Jada');
      expect(control.control).to.equal(-200);
    });
  });

  describe('findEntitiesWithComponents()', function() {
    it('finds every entity given a single component', function() {
      const one = Registry.createEntity();
      const two = Registry.createEntity();
      const three = Registry.createEntity();

      Registry.createActorComponent(one,{ name:'One' });
      Registry.createActorComponent(two,{ name:'Two' });
      Registry.createManaComponent(three,{ mana:'Blue' })

      let ids = Registry.findEntitiesWithComponents([ComponentType.actor]);
      expect(ids.size).to.equal(2);
      expect(ids).to.include(one);
      expect(ids).to.include(two);
    });

    it.only('finds the union of all the entities that have all the components', function() {
      const one = Registry.createEntity();
      const two = Registry.createEntity();
      const three = Registry.createEntity();
      const four = Registry.createEntity();
      const five = Registry.createEntity();
      const six = Registry.createEntity();

      Registry.createActorComponent(one,{ a:1 });
      Registry.createActorComponent(two,{ a:2 });
      Registry.createActorComponent(three,{ a:3 });
      Registry.createActorComponent(four,{ a:4 });

      Registry.createManaComponent(three,{ m:3 });
      Registry.createManaComponent(four,{ m:4 });
      Registry.createManaComponent(five,{ m:5 });
      Registry.createManaComponent(six,{ m:6 });

      Registry.createHealthComponent(two,{ h:2 });
      Registry.createHealthComponent(four,{ h:4 });
      Registry.createHealthComponent(six,{ h:6 });

      Registry.createControlledComponent(two,{ c:1 });
      Registry.createControlledComponent(four,{ c:3 });
      Registry.createControlledComponent(six,{ c:5 });

      let find1 = Registry.findEntitiesWithComponents([ComponentType.actor, ComponentType.mana, ComponentType.health])
      let find2 = Registry.findEntitiesWithComponents([ComponentType.actor, ComponentType.mana, ComponentType.controlled])

      console.log("F1",find1)
      console.log("F2",find2)


    });
  });

  describe('updateComponent()', function() {
    it('updates a value in a component', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
      Registry.updateActorComponent(id, { firstName:'Laura' });
      Registry.updateActorComponent(id, { lastName:'Croft', genderCode:'futa' });

      let laura = Registry.lookupActorComponent(id);

      expect(laura.firstName).to.equal('Laura');
      expect(laura.lastName).to.equal('Croft');
      expect(laura.genderCode).to.equal('futa');
      expect(laura.speciesCode).to.equal('nymph');
    });
  });

  describe('deleteComponent()', function() {
    it('deletes a component from an entity', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.deleteActorComponent(id);

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);

      expect(actor).to.be.null;
      expect(control.control).to.equal(-200);
    });
  });

  describe('deleteEntity()', function() {
    it('deletes an entity and all of the associated components.', function() {
      const id = Registry.createEntity();
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
      Registry.createControlledComponent(id,{ control:-200 });
      Registry.deleteEntity(id);

      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);

      expect(actor).to.be.null;
      expect(control).to.be.null;
    });

    it("deletes an entity and all of the entity's children", function() {

    });
  });

});
