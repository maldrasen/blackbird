describe("AmmunitionSystem", function() {

  function buildArcher(quiverData) {
    const id = CharacterFixtures.genericMale({ quiver:quiverData });
    GameSystem.getState().setPartyConfiguration({ [id]:'p-0' });
    return id;
  }

  describe("restock()", function() {
    it("fills the quiver from the party inventory", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:5 });
      Inventory().addArticle('arrows', 30);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:20 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(15);
    });

    it("takes what there is when the inventory runs short", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:2 });
      Inventory().addArticle('arrows', 7);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id).quantity).to.equal(9);
      expect(Inventory().getArticleQuantity('arrows')).to.equal(0);
    });

    it("restocks an emptied quiver with the ammunition it last held", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:0 });
      Inventory().addArticle('arrows', 4);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:4 });
    });

    it("leaves a full quiver alone", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:20 });
      Inventory().addArticle('arrows', 10);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id).quantity).to.equal(20);
      expect(Inventory().getArticleQuantity('arrows')).to.equal(10);
    });

    it("leaves a quiver that was never loaded alone", function() {
      const id = buildArcher({});
      Inventory().addArticle('arrows', 10);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(10);
    });
  });

  describe("loadQuiver()", function() {
    it("fills an empty quiver from the party inventory", function() {
      const id = buildArcher({});
      Inventory().addArticle('arrows', 30);

      AmmunitionSystem.loadQuiver(id, 'arrows');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:20 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(10);
    });

    it("tops up a quiver that already holds the same ammunition", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:5 });
      Inventory().addArticle('arrows', 8);

      AmmunitionSystem.loadQuiver(id, 'arrows');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:13 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(0);
    });

    it("remembers the ammunition when the inventory has none of it", function() {
      const id = buildArcher({});

      AmmunitionSystem.loadQuiver(id, 'arrows');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:0 });
    });

    it("rejects an ammunition code that doesn't exist", function() {
      const id = buildArcher({});
      expect(function() {
        AmmunitionSystem.loadQuiver(id, 'pebbles');
      }).to.throw('Bad Ammunition code [pebbles]');
    });
  });

  describe("unloadQuiver()", function() {
    it("returns the held ammunition to the party inventory", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:12 });
      Inventory().addArticle('arrows', 3);

      AmmunitionSystem.unloadQuiver(id);

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(15);
    });

    it("forgets the ammunition of an already empty quiver", function() {
      const id = buildArcher({ ammunition:'arrows', quantity:0 });

      AmmunitionSystem.unloadQuiver(id);

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('arrows')).to.equal(0);
    });
  });

});
