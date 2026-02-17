describe("ConsentResult", function() {

  describe("applyFactor()", function() {
    it("applies emotional actions", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();
      const deer = Registry.createEntity();

      let result, response;

      FeelingsComponent.create(rabbit, { target:wolf, affection:20, fear:100, respect:50 });
      FeelingsComponent.create(deer, { target:wolf, affection:100, fear:20, respect:50 });

      result = ConsentResult(rabbit, wolf);
      result.setSexAction('kiss');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.emotional });
      response = result.getResponse().additive[0];
      expect(response.value).to.equal(-3);
      expect(response.label).to.equal('Emotional');

      result = ConsentResult(deer, wolf);
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

      result = ConsentResult(rabbit, goat);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.touching });
      expect(result.getResponse().additive[0].value).to.equal(7);

      result = ConsentResult(deer, goat);
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

      result = ConsentResult(rabbit, horse);
      result.setSexAction('get-blowjob');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.service });
      expect(result.getResponse().additive[0].value).to.equal(5);

      result = ConsentResult(deer, horse);
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

      result = ConsentResult(rabbit, horse);
      result.setSexAction('get-deepthroat');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.roughService });
      expect(result.getResponse().additive[0].value).to.equal(22);

      result = ConsentResult(deer, horse);
      result.setSexAction('get-deepthroat');
      result.applyFactor({ type:'base', baseClass: SexAction.BaseClass.roughService });
      expect(result.getResponse().additive[0].value).to.equal(16);
    });

    it("applies low arousal", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();
      ArousalComponent.create(cat, { arousal:20 });

      const result = ConsentResult(cat,dog);
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

      const result = ConsentResult(cat,dog);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'arousal' });

      expect(result.getResponse().additive[0].value).to.equal(25);
    });

    it("applies high arousal", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();

      ArousalComponent.create(cat, { arousal:80 });

      const result = ConsentResult(cat,dog);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'arousal' });

      expect(result.getResponse().additive[0].value).to.equal(64);
    });

    it("applies factor strength to arousal value", function() {
      const cat = Registry.createEntity();
      const dog = Registry.createEntity();

      ArousalComponent.create(cat, { arousal:100 });

      const result = ConsentResult(cat,dog);
      result.setSexAction('fondle-breasts');
      result.applyFactor({ type:'arousal', strength:0.2 });

      expect(result.getResponse().additive[0].value).to.equal(20);
    });

    it("applies gender preferences", function() {
      const wolf = Registry.createEntity();
      const lamb = Registry.createEntity();

      ActorComponent.create(wolf, { gender:Gender.male, species:'lupin' });
      ArousalComponent.create(lamb, { arousal:50 });
      SexualPreferencesComponent.create(lamb, { androphilic:75 });

      const result = ConsentResult(lamb, wolf);
      result.setSexAction('get-blowjob');
      result.applyFactor({ type:'arousal' });
      expect(Math.round(result.getConsentValue())).to.equal(25);
      result.applyFactor({ type:'gender' });
      expect(Math.round(result.getConsentValue())).to.equal(39);
      expect(result.getResponse().multiplicative[0].label).to.equal('Gender');
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(156);
    });

    it("applies scaled gender preferences", function() {
      const wolf = Registry.createEntity();
      const lamb = Registry.createEntity();

      ActorComponent.create(wolf, { gender:Gender.male, species:'lupin' });
      ArousalComponent.create(lamb, { arousal:50 });
      SexualPreferencesComponent.create(lamb, { androphilic:75 });

      const result = ConsentResult(lamb, wolf);
      result.setSexAction('get-deepthroat');
      result.applyFactor({ type:'arousal' });
      result.applyFactor({ type:'gender', scale:1.5 });
      expect(Math.round(result.getConsentValue())).to.equal(32);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(128);
    });

    it("applies gender preferences for futanari characters (when straight)", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      ActorComponent.create(wolf, { gender:Gender.futa, species:'lupin' });
      ArousalComponent.create(horse, { arousal:50 });
      SexualPreferencesComponent.create(horse, { androphilic:75, gynophilic:-75 });

      const result = ConsentResult(horse, wolf);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'arousal' });
      expect(Math.round(result.getConsentValue())).to.equal(25);
      result.applyFactor({ type:'gender' });
      expect(Math.round(result.getConsentValue())).to.equal(28);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(112);
    });

    it("applies gender preferences for futanari characters (when bi)", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      ActorComponent.create(wolf, { gender:Gender.futa, species:'lupin' });
      ArousalComponent.create(horse, { arousal:50 });
      SexualPreferencesComponent.create(horse, { androphilic:75, gynophilic:75 });

      const result = ConsentResult(horse, wolf);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'arousal' });
      expect(Math.round(result.getConsentValue())).to.equal(25);
      result.applyFactor({ type:'gender' });
      expect(Math.round(result.getConsentValue())).to.equal(61);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(244);
    });

    it("applies gender preferences for non-binary characters", function() {
      const wolf = Registry.createEntity();
      const goat = Registry.createEntity();

      ActorComponent.create(wolf, { gender:Gender.enby, species:'lupin' });
      ArousalComponent.create(goat, { arousal:50 });
      SexualPreferencesComponent.create(goat, { androphilic:75, gynophilic:75 });

      const result = ConsentResult(goat, wolf);
      result.setSexAction('fondle-ass');
      result.applyFactor({ type:'arousal' });
      expect(Math.round(result.getConsentValue())).to.equal(25);
      result.applyFactor({ type:'gender' });
      expect(Math.round(result.getConsentValue())).to.equal(41);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(164);
    });

    it("applies complementing sexual preferences", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();

      SexualPreferencesComponent.create(rabbit, { masturbator:30 });
      ArousalComponent.create(rabbit, { arousal:50 });

      const result = ConsentResult(rabbit, wolf);
      result.setSexAction('masturbate-pussy');
      result.applyFactor({ type:'arousal' });
      result.applyFactor({ type:'preference', code:'masturbator' });

      expect(Math.round(result.getConsentValue())).to.equal(27);
      expect(result.getResponse().multiplicative[0].label).to.equal('Masturbator');
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(109);
    });

    it("applies conflicting sexual preferences", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      SexualPreferencesComponent.create(horse, { 'humiliation-slut':50 });
      ArousalComponent.create(horse, { arousal:50 });

      const result = ConsentResult(horse, wolf);
      result.setSexAction('kiss');
      result.applyFactor({ type:'arousal' });
      result.applyFactor({ type:'preference', code:'humiliation-slut', conflicting:true });
      expect(Math.round(result.getConsentValue())).to.equal(22);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(88);
    });

    it("applies scaled sexual preferences", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      SexualPreferencesComponent.create(horse, { masturbator:50 });
      ArousalComponent.create(horse, { arousal:50 });

      const result = ConsentResult(horse, wolf);
      result.setSexAction('masturbate-anus');
      result.applyFactor({ type:'arousal' });
      result.applyFactor({ type:'preference', code:'masturbator', scale:3 });
      expect(Math.round(result.getConsentValue())).to.equal(38);
      expect(Math.round(100 * result.getResponse().multiplicative[0].value)).to.equal(150);
    });

    it("applies everything all together", function() {
      const wolf = Registry.createEntity();
      const horse = Registry.createEntity();

      ActorComponent.create(horse, { gender:Gender.male, species:'equian' });

      FeelingsComponent.create(wolf, { target:horse, affection:200, fear:100, respect:150 });
      ArousalComponent.create(wolf, { arousal:33 });
      SexualPreferencesComponent.create(wolf, { androphilic:25, 'oral-slut':30 });

      const result = ConsentResult(wolf,horse);
      result.setSexAction('get-blowjob');
      result.applyFactors();

      expect(Math.round(result.getConsentValue())).to.equal(46);
    });
  });

});
