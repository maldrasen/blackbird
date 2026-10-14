describe("AmmunitionSystem", function() {

  function buildArcher(quiverData) {
    const id = CharacterSupport.genericMale({ quiver:quiverData });
    GameSystem.getState().setPartyConfiguration({ [id]:'p-0' });
    return id;
  }

  describe("restock()", function() {
    it("fills the quiver from the party inventory", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:5 });
      Inventory().addArticle('elm-arrow', 30);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:20 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(15);
    });

    it("takes what there is when the inventory runs short", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:2 });
      Inventory().addArticle('elm-arrow', 7);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id).quantity).to.equal(9);
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(0);
    });

    it("restocks an emptied quiver with the ammunition it last held", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:0 });
      Inventory().addArticle('elm-arrow', 4);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:4 });
    });

    it("leaves a full quiver alone", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:20 });
      Inventory().addArticle('elm-arrow', 10);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id).quantity).to.equal(20);
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(10);
    });

    it("leaves a quiver that was never loaded alone", function() {
      const id = buildArcher({});
      Inventory().addArticle('elm-arrow', 10);

      AmmunitionSystem.restock();

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(10);
    });
  });

  describe("loadQuiver()", function() {
    it("fills an empty quiver from the party inventory", function() {
      const id = buildArcher({});
      Inventory().addArticle('elm-arrow', 30);

      AmmunitionSystem.loadQuiver(id, 'elm-arrow');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:20 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(10);
    });

    it("tops up a quiver that already holds the same ammunition", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:5 });
      Inventory().addArticle('elm-arrow', 8);

      AmmunitionSystem.loadQuiver(id, 'elm-arrow');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:13 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(0);
    });

    it("returns the old ammunition when switching to another type", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:12 });
      Inventory().addArticle('razerfang-arrow', 5);

      AmmunitionSystem.loadQuiver(id, 'razerfang-arrow');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'razerfang-arrow', quantity:5 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(12);
      expect(Inventory().getArticleQuantity('razerfang-arrow')).to.equal(0);
    });

    it("remembers the ammunition when the inventory has none of it", function() {
      const id = buildArcher({});

      AmmunitionSystem.loadQuiver(id, 'elm-arrow');

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:0 });
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
      const id = buildArcher({ ammunition:'elm-arrow', quantity:12 });
      Inventory().addArticle('elm-arrow', 3);

      AmmunitionSystem.unloadQuiver(id);

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(15);
    });

    it("forgets the ammunition of an already empty quiver", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:0 });

      AmmunitionSystem.unloadQuiver(id);

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
      expect(Inventory().getArticleQuantity('elm-arrow')).to.equal(0);
    });
  });

  describe("getAmmunitionFor()", function() {
    it("lists the ammunition in the party inventory by name", function() {
      const id = buildArcher({});
      Inventory().addArticle('razerfang-arrow', 10);
      Inventory().addArticle('elm-arrow', 30);
      Inventory().addArticle('rhysh-apple', 3);

      expect(AmmunitionSystem.getAmmunitionFor(id)).to.deep.equal([
        { code:'elm-arrow', name:'Elm Arrow', quantity:30, isLoaded:false },
        { code:'razerfang-arrow', name:'Razerfang Arrow', quantity:10, isLoaded:false },
      ]);
    });

    it("lists the loaded ammunition at the quantity left in the inventory", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:20 });
      Inventory().addArticle('elm-arrow', 16);
      Inventory().addArticle('blackflame-arrow', 5);

      expect(AmmunitionSystem.getAmmunitionFor(id)).to.deep.equal([
        { code:'blackflame-arrow', name:'Blackflame Arrow', quantity:5, isLoaded:false },
        { code:'elm-arrow', name:'Elm Arrow', quantity:16, isLoaded:true },
      ]);
    });

    it("keeps listing the loaded ammunition when the inventory has run out of it", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:20 });

      expect(AmmunitionSystem.getAmmunitionFor(id)).to.deep.equal([
        { code:'elm-arrow', name:'Elm Arrow', quantity:0, isLoaded:true },
      ]);
    });

    it("lists nothing for an unloaded quiver when the inventory has no ammunition", function() {
      const id = buildArcher({});
      Inventory().addArticle('rhysh-apple', 3);

      expect(AmmunitionSystem.getAmmunitionFor(id)).to.deep.equal([]);
    });
  });

  describe("spend()", function() {
    it("takes one piece of ammunition from the quiver", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:3 });

      AmmunitionSystem.spend(id);

      expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'elm-arrow', quantity:2 });
    });

    it("throws when the quiver is already empty", function() {
      const id = buildArcher({ ammunition:'elm-arrow', quantity:0 });

      expect(function() {
        AmmunitionSystem.spend(id);
      }).to.throw('Quiver.quantity is negative');
    });
  });

  describe("isRequired()", function() {
    it("is required for a character with a bow", function() {
      const id = buildArcher({});
      expect(AmmunitionSystem.isRequired(id, Item(ItemSupport.build('shortbow', ['wood'])))).to.equal(true);
    });

    it("is not required for a weapon that doesn't use ammunition", function() {
      const id = buildArcher({});
      expect(AmmunitionSystem.isRequired(id, Item(ItemSupport.build('dagger', ['steel'])))).to.equal(false);
    });
  });

  describe("hasAmmunitionFor()", function() {
    it("needs a loaded quiver for a bow", function() {
      const bow = Item(ItemSupport.build('shortbow', ['wood']));
      expect(AmmunitionSystem.hasAmmunitionFor(buildArcher({}), bow)).to.equal(false);
      expect(AmmunitionSystem.hasAmmunitionFor(buildArcher({ ammunition:'elm-arrow', quantity:1 }), bow)).to.equal(true);
    });

    it("is satisfied by any weapon that doesn't use ammunition", function() {
      const dagger = Item(ItemSupport.build('dagger', ['steel']));
      expect(AmmunitionSystem.hasAmmunitionFor(buildArcher({}), dagger)).to.equal(true);
    });
  });

});
