describe('Registry', function() {

  describe('createEntity()', function() {
    it('creates a new entity.', function() {
      const id = Registry.createEntity();

      expect(Registry.listEntityComponents(id)).to.be.empty;

      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
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
      Registry.createActorComponent(id,{ firstName:'Jada', lastName:'Fire', genderCode:'female', speciesCode:'nymph' });
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

      Registry.createActorComponent(actor,{ name:'Belladonna' });
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

      expect(actor).to.be.undefined;
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

      Registry.createControlledComponent(one,{ c:1 });
      Registry.createControlledComponent(three,{ c:3 });
      Registry.createControlledComponent(five,{ c:5 });

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

      Registry.createActorComponent(actor1,{ gender:'female' });
      Registry.createActorComponent(actor2,{ gender:'futa'});
      Registry.createActorComponent(actor3,{ gender:'female'});
      Registry.createAtLocationComponent(location,{ gender:'female'});

      const results = Registry.findComponentsWith(ComponentType.actor, data => data.gender === 'female');

      expect(results).to.have.members([actor1,actor3]);
    });
  });

});
