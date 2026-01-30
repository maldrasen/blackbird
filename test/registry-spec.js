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

    it("deletes an entity and all of the entity's children");
  });

});
