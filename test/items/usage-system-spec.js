describe('UsageSystem', function() {

  // The game interface doesn't show alerts while the specs are running, so the alert is captured here instead.
  const showAlert = GameInterface.showAlert;
  let alerts;

  beforeEach(function() {
    alerts = [];
    GameInterface.showAlert = options => { alerts.push(options); };
  });

  afterEach(function() {
    GameInterface.showAlert = showAlert;
  });

  describe('useArticle()', function() {
    it('rejects an unknown article', function() {
      const greg = CharacterSupport.genericMale({});

      expect(() => UsageSystem.useArticle(greg, 'no-such-article')).to.throw('Bad Consumable code');
      expect(alerts).to.have.lengthOf(0);
    });

    it('removes one of the article from the party inventory', function() {
      const greg = CharacterSupport.genericMale({ health:{ currentHealth:50 } });
      Inventory().addArticle('rhysh-apple', 3);

      UsageSystem.useArticle(greg, 'rhysh-apple');

      expect(Inventory().getArticleQuantity('rhysh-apple')).to.equal(2);
    });

    it("throws when the party doesn't have the article and applies nothing", function() {
      const greg = CharacterSupport.genericMale({ health:{ currentHealth:50 } });

      expect(() => UsageSystem.useArticle(greg, 'rhysh-apple')).to.throw('only has 0 of Article:rhysh-apple');
      expect(HealthComponent.lookup(greg).currentHealth).to.equal(50);
      expect(alerts).to.have.lengthOf(0);
    });

    it('applies the effects of the consumable to the character', function() {
      const greg = CharacterSupport.genericMale({ health:{ currentHealth:50 } });
      Random.stubBetween(20);

      Inventory().addArticle('rhysh-apple', 1);
      UsageSystem.useArticle(greg, 'rhysh-apple');

      expect(HealthComponent.lookup(greg).currentHealth).to.equal(70);
    });

    it('shows the shared woven message in a success alert', function() {
      const greg = CharacterSupport.genericMale({ health:{ currentHealth:50 } });

      Inventory().addArticle('rhysh-apple', 1);
      UsageSystem.useArticle(greg, 'rhysh-apple');

      expect(alerts).to.have.lengthOf(1);
      expect(alerts[0].type).to.equal(LogType.success);
      expect(alerts[0].fadeTime).to.equal(3000);
      expect(alerts[0].message).to.include('Greg');
      expect(alerts[0].message).to.include('uses the Rhysh Apple');
    });

    it('shows the onUse message at the onUse level for a consumable without stories', function() {
      const greg = CharacterSupport.genericMale({});

      Inventory().addArticle('ale', 1);
      UsageSystem.useArticle(greg, 'ale');

      expect(alerts).to.have.lengthOf(1);
      expect(alerts[0].type).to.equal(LogType.warning);
      expect(alerts[0].message).to.include('TODO: Drunk status effects.');
    });

    it('reports the health a consumable restored', function() {
      const greg = CharacterSupport.genericMale({ health:{ currentHealth:50 } });
      Random.stubBetween(20);

      Inventory().addArticle('rhysh-apple', 1);
      UsageSystem.useArticle(greg, 'rhysh-apple');

      expect(alerts[0].message).to.include('uses the Rhysh Apple, regaining 20 health.');
      expect(alerts[0].message).to.not.include('[object Object]');
    });

    it('reports the colour of the mana a consumable restored', function() {
      const greg = CharacterSupport.genericMale({ mana:{ red:{ current:0, max:20 } } });
      Random.stubBetween(8);

      Inventory().addArticle('crimson-tear', 1);
      UsageSystem.useArticle(greg, 'crimson-tear');

      expect(alerts[0].message).to.include('uses the Crimson Tear, regaining 8 red mana.');
    });

    it('shows only the onUse message when the consumable has no result message', function() {
      const greg = CharacterSupport.genericMale({});

      Inventory().addArticle('horse-juice', 1);
      UsageSystem.useArticle(greg, 'horse-juice');

      expect(alerts[0].message).to.include('TODO: Implement Increase Potency Effect');
      expect(alerts[0].message).to.not.include('[object Object]');
    });
  });

});
