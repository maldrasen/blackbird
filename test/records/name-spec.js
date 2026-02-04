describe("Name", function() {

  describe("isUnique()", function() {
    it("tests a single name", function() {
      const entity = Registry.createEntity();
      Registry.createActorComponent(entity,{ name:"Bob", gender:Gender.male, species:'human' });
      expect(Name.isUnique({ name:{ name:'Bob' } })).to.be.false
      expect(Name.isUnique({ name:{ name:'Greg' } })).to.be.true
    });

    it("tests a name with a title", function() {
      const entity = Registry.createEntity();
      Registry.createActorComponent(entity,{ title:"Big Dick", name:"Bob", gender:Gender.male, species:'human' });
      expect(Name.isUnique({ title:{ name:"Big Dick" }, name:{ name:'Bob' }})).to.be.false
      expect(Name.isUnique({ title:{ name:"Huge Cock" }, name:{ name:'Bob' }})).to.be.true
    });

    it("tests a name with a surname", function() {
      const entity = Registry.createEntity();
      Registry.createActorComponent(entity,{ surname:"Cocksucker", name:"Bob", gender:Gender.male, species:'human' });
      expect(Name.isUnique({ surname:{ name:"Cocksucker" }, name:{ name:'Bob' }})).to.be.false
      expect(Name.isUnique({ surname:{ name:"Horsefucker" }, name:{ name:'Bob' }})).to.be.true
    });
  });

});
