describe("ConsentResult", function() {

  describe("applyFactor()", function() {
    it("applies emotional actions", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const deer = Registry.createEntity();

      let result, response;

      FeelingsComponent.create(rabbit, { target:wolf, affection:20, fear:100, respect:50 });
      FeelingsComponent.create(deer, { target:wolf, affection:100, fear:20, respect:50 });

      result = ConsentResult.build(rabbit, wolf);
      result.setSexAction('kiss');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.emotional });
      response = result.getResponse().additive[0];
      expect(response.value).to.equal(-3);
      expect(response.label).to.equal('Emotional');

      result = ConsentResult.build(deer, wolf);
      result.setSexAction('deep-kiss');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.emotional });
      response = result.getResponse().additive[0];
      expect(response.value).to.equal(9);
      expect(response.label).to.equal('Emotional');
    });

    it("applies touching actions", function() {
      const goat = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const deer = Registry.createEntity();

      let result;

      FeelingsComponent.create(rabbit, { target:goat, affection:20, fear:100, respect:50 });
      FeelingsComponent.create(deer, { target:goat, affection:100, fear:20, respect:50 });

      result = ConsentResult.build(rabbit, goat);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.touching });
      expect(result.getResponse().additive[0].value).to.equal(7);

      result = ConsentResult.build(deer, goat);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.touching });
      expect(result.getResponse().additive[0].value).to.equal(11);
    });

    it("applies service actions", function() {
      const horse = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const deer = Registry.createEntity();

      let result;

      FeelingsComponent.create(rabbit, { target:horse, affection:20, fear:100, respect:40 });
      FeelingsComponent.create(deer, { target:horse, affection:100, fear:20, respect:80 });

      result = ConsentResult.build(rabbit, horse);
      result.setSexAction('get-blowjob');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.service });
      expect(result.getResponse().additive[0].value).to.equal(5);

      result = ConsentResult.build(deer, horse);
      result.setSexAction('get-blowjob');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.service });
      expect(result.getResponse().additive[0].value).to.equal(13);
    });

    it("applies roughService actions", function() {
      const horse = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const deer = Registry.createEntity();

      let result;

      FeelingsComponent.create(rabbit, { target:horse, affection:20, fear:300, respect:40 });
      FeelingsComponent.create(deer, { target:horse, affection:100, fear:20, respect:200 });

      result = ConsentResult.build(rabbit, horse);
      result.setSexAction('get-deepthroat');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.roughService });
      expect(result.getResponse().additive[0].value).to.equal(22);

      result = ConsentResult.build(deer, horse);
      result.setSexAction('get-deepthroat');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.roughService });
      expect(result.getResponse().additive[0].value).to.equal(16);
    });

    it("applies low arousal", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();
      ArousalComponent.create(cat, { arousal:20 });

      const result = ConsentResult.build(cat,dog);
            result.setSexAction('fondle-ass');
            result.applyFactor({ type:'arousal' });

      const response = result.getResponse().additive[0];

      expect(response.label).to.equal('Arousal');
      expect(response.value).to.equal(4);
    });

    it("applies moderate arousal", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();

      ArousalComponent.create(cat, { arousal:50 });

      const result = ConsentResult.build(cat,dog);
            result.setSexAction('fondle-ass');
            result.applyFactor({ type:'arousal' });

      expect(result.getResponse().additive[0].value).to.equal(25);
    });

    it("applies high arousal", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();

      ArousalComponent.create(cat, { arousal:80 });

      const result = ConsentResult.build(cat,dog);
            result.setSexAction('fondle-ass');
            result.applyFactor({ type:'arousal' });

      expect(result.getResponse().additive[0].value).to.equal(64);
    });

    it("applies factor strength to arousal value", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();

      ArousalComponent.create(cat, { arousal:100 });

      const result = ConsentResult.build(cat,dog);
            result.setSexAction('fondle-breasts');
            result.applyFactor({ type:'arousal', strength:0.2 });

      expect(result.getResponse().additive[0].value).to.equal(20);
    });

    it("applies everything all together", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      ActorComponent.create(horse, { gender:Gender.male, species:'equian' });

      FeelingsComponent.create(wolf, { target:horse, affection:200, fear:100, respect:150 });
      ArousalComponent.create(wolf, { arousal:33 });
      SexualPreferencesComponent.create(wolf, { androphilic:25 });

      const result = ConsentResult.build(wolf,horse);
            result.setSexAction('get-blowjob');
            result.applyFactors();

      expect(Math.round(result.getConsentValue())).to.equal(36);
    });
  });

  describe("feelingBaseValue()", function() {
    it('calculates apathy range properly', function() {
      expect(ConsentResult.feelingBaseValue(0)).to.equal(0);
      expect(ConsentResult.feelingBaseValue(50)).to.equal(5);
      expect(ConsentResult.feelingBaseValue(100)).to.equal(10);
    });

    it('calculates mild range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(120))).to.equal(12);
      expect(Math.round(ConsentResult.feelingBaseValue(150))).to.equal(17);
      expect(Math.round(ConsentResult.feelingBaseValue(175))).to.equal(23);
      expect(Math.round(ConsentResult.feelingBaseValue(200))).to.equal(30);
    });

    it('calculates moderate range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(250))).to.equal(33);
      expect(Math.round(ConsentResult.feelingBaseValue(300))).to.equal(40);
      expect(Math.round(ConsentResult.feelingBaseValue(350))).to.equal(53);
      expect(Math.round(ConsentResult.feelingBaseValue(400))).to.equal(70);
    });

    it('calculates high range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(450))).to.equal(73);
      expect(Math.round(ConsentResult.feelingBaseValue(500))).to.equal(86);
      expect(Math.round(ConsentResult.feelingBaseValue(550))).to.equal(111);
      expect(Math.round(ConsentResult.feelingBaseValue(600))).to.equal(150);
    });

    it('calculates very high range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(650))).to.equal(153);
      expect(Math.round(ConsentResult.feelingBaseValue(700))).to.equal(166);
      expect(Math.round(ConsentResult.feelingBaseValue(750))).to.equal(197);
      expect(Math.round(ConsentResult.feelingBaseValue(800))).to.equal(250);
    });

    it('calculates extreme range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(850))).to.equal(254);
      expect(Math.round(ConsentResult.feelingBaseValue(900))).to.equal(281);
      expect(Math.round(ConsentResult.feelingBaseValue(950))).to.equal(355);
      expect(Math.round(ConsentResult.feelingBaseValue(1000))).to.equal(500);
    });
  });

  describe('sexualPreferenceValue()', function() {
    it('handles null values', function() {
      expect(Math.round(ConsentResult.sexualPreferenceValue(null))).to.equal(1);
      expect(Math.round(ConsentResult.sexualPreferenceValue(0))).to.equal(1);
    });

    it('calculates strength 2 positive values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(10))).to.equal(101);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(20))).to.equal(104);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(30))).to.equal(109);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(40))).to.equal(116);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(50))).to.equal(125);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(60))).to.equal(136);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(70))).to.equal(149);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(80))).to.equal(164);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(90))).to.equal(181);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(100))).to.equal(200);
    });

    it('calculates strength 2 negative values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-10))).to.equal(100);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-20))).to.equal(98);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-30))).to.equal(96);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-40))).to.equal(92);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-50))).to.equal(88);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-60))).to.equal(82);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-70))).to.equal(76);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-80))).to.equal(68);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-90))).to.equal(60);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-100))).to.equal(50);
    });

    it('calculates strength 3 positive values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(20,3))).to.equal(108);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(40,3))).to.equal(132);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(60,3))).to.equal(172);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(80,3))).to.equal(228);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(100,3))).to.equal(300);
    });

    it('calculates strength 3 negative values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-20,3))).to.equal(97);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-40,3))).to.equal(89);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-60,3))).to.equal(76);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-80,3))).to.equal(57);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-100,3))).to.equal(33);
    });

    it('calculates strength 4 positive values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(20,4))).to.equal(112);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(40,4))).to.equal(148);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(60,4))).to.equal(208);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(80,4))).to.equal(292);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(100,4))).to.equal(400);
    });

    it('calculates strength 4 negative values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-20,4))).to.equal(97);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-40,4))).to.equal(88);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-60,4))).to.equal(73);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-80,4))).to.equal(52);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-100,4))).to.equal(25);
    });

    it('calculates strength 5 positive values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(20,5))).to.equal(116);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(40,5))).to.equal(164);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(60,5))).to.equal(244);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(80,5))).to.equal(356);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(100,5))).to.equal(500);
    });

    it('calculates strength 5 negative values', function() {
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-20,5))).to.equal(97);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-40,5))).to.equal(87);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-60,5))).to.equal(71);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-80,5))).to.equal(49);
      expect(Math.round(100 * ConsentResult.sexualPreferenceValue(-100,5))).to.equal(20);
    });
  });

});
