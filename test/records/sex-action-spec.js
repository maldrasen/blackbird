describe('SexAction', function() {

  describe('validation', function() {
    function register(overrides) {
      return () => SexAction.register('spec-invalid-action', {
        name: 'Spec Action',
        description: `You'll do the spec thing.`,
        mainCategory: SexAction.MainCategory.foreplay,
        playerCategory: SexAction.PartCategory.hands,
        partnerCategory: SexAction.PartCategory.none,
        direction: ActionDirection.playerToPartner,
        time: 1,
        playerStamina: 10,
        partnerStamina: 10,
        consentTarget: 10,
        techniqueTarget: 10,
        consentFactors: [{ type:'base', baseClass:SexAction.BaseClass.touching }],
        partnerSensations: { comfort:10 },
        playerSensations: { desire:10 },
        orientation: { submission:0, masochism:0, shame:0 },
        ...overrides,
      });
    }

    it('rejects a missing name', function() {
      expect(register({ name:null })).to.throw(/name is not a string/);
    });

    it('rejects unknown categories and directions', function() {
      expect(register({ mainCategory:'cuddling' })).to.throw(/mainCategory\[cuddling\] not in list/);
      expect(register({ playerCategory:'tail' })).to.throw(/playerCategory\[tail\] not in list/);
      expect(register({ direction:'sideways' })).to.throw(/direction\[sideways\] not in list/);
    });

    it('rejects a time that is not a number', function() {
      expect(register({ time:'1' })).to.throw(/time is not a number/);
    });

    it('rejects an isPossible that is not a function', function() {
      expect(register({ isPossible:true })).to.throw(/isPossible is not a function/);
    });

    it('rejects missing consent factors', function() {
      expect(register({ consentFactors:null })).to.throw(/consentFactors is not an array/);
      expect(register({ consentFactors:[] })).to.throw(/consentFactors.length is less than 1/);
    });

    it('rejects consent factors that do not start with a base factor', function() {
      expect(register({ consentFactors:[{ type:'arousal' }] }))
        .to.throw(/consentFactors\[0\].type doesn't equal base/);
    });

    it('rejects an unknown factor type', function() {
      expect(register({ consentFactors:[
        { type:'base', baseClass:SexAction.BaseClass.touching },
        { type:'mood' },
      ]})).to.throw(/type\[mood\] not in list/);
    });

    it('rejects consent factors out of order', function() {
      expect(register({ consentFactors:[
        { type:'base', baseClass:SexAction.BaseClass.touching },
        { type:'preference', code:'submissive' },
        { type:'gender' },
      ]})).to.throw(/a gender factor cannot follow a preference factor/);
    });

    it('rejects a base factor with an unknown baseClass', function() {
      expect(register({ consentFactors:[{ type:'base', baseClass:'cuddling' }] }))
        .to.throw(/baseClass\[cuddling\] not in list/);
    });

    it('rejects a preference factor without a code', function() {
      expect(register({ consentFactors:[
        { type:'base', baseClass:SexAction.BaseClass.touching },
        { type:'preference' },
      ]})).to.throw(/code is not a string/);
    });

    it('rejects an unknown minimumConsent', function() {
      expect(register({ minimumConsent:5 })).to.throw(/minimumConsent\[5\] not in list/);
    });

    it('rejects unknown sensation keys', function() {
      expect(register({ partnerSensations:{ tickle:10 } })).to.throw(/partnerSensations.tickle\[tickle\] not in list/);
    });

    it('rejects emotional sensations other than desire on the player', function() {
      expect(register({ playerSensations:{ shame:10 } })).to.throw(/playerSensations.shame\[shame\] not in list/);
    });

    it('rejects a sensation value that is not a number', function() {
      expect(register({ partnerSensations:{ comfort:'high' } })).to.throw(/partnerSensations.comfort is not a number/);
    });

    it('rejects an orientation with unknown or missing keys', function() {
      expect(register({ orientation:{ submission:0, masochism:0, shame:0, sadism:1 } }))
        .to.throw(/orientation.sadism\[sadism\] not in list/);
      expect(register({ orientation:{ submission:0, shame:0 } }))
        .to.throw(/orientation.masochism is not a number/);
    });

    it('rejects skills outside the player and partner roles', function() {
      expect(register({ skills:{ assistant:['servicing'] } })).to.throw(/skills.assistant\[assistant\] not in list/);
      expect(register({ skills:{ player:'servicing' } })).to.throw(/skills.player is not an array/);
    });

    it('rejects a persist without an action', function() {
      expect(register({ persist:{ revert:'kiss' } })).to.throw(/persist.action is not a string/);
      expect(register({ persist:{ action:'kiss', when:9 } })).to.throw(/persist.when\[9\] not in list/);
    });

    it('rejects uses without both slot arrays', function() {
      expect(register({ uses:{ player:[TrainingSlot.hands] } })).to.throw(/uses.partner is not an array/);
      expect(register({ uses:{ player:['tail'], partner:[] } })).to.throw(/uses.player.tail\[tail\] not in list/);
    });

    it('rejects an alignment with a bad target or part', function() {
      expect(register({ alignment:{ player:{}, partner:{}, target:'tail' } }))
        .to.throw(/alignment.target\[tail\] not in list/);
      expect(register({ alignment:{ player:{ pussy:'eaten' }, partner:{} } }))
        .to.throw(/alignment.player.pussy\[pussy\] not in list/);
    });

    it('rejects an availableWhen with unknown keys', function() {
      expect(register({ availableWhen:{ persisted:'kiss' } })).to.throw(/availableWhen.persisted\[persisted\] not in list/);
    });

    it('rejects an availableWhen slot pairing missing a side', function() {
      expect(register({ availableWhen:{ player:[TrainingSlot.cock] } }))
        .to.throw(/availableWhen.partner is not an array/);
    });

    it('rejects a forcePosition without a code', function() {
      expect(register({ forcePosition:{ playerFirst:true } })).to.throw(/forcePosition.code is not a string/);
    });

    it('rejects a penetration missing a side', function() {
      expect(register({ penetration:{ player:'cock' } })).to.throw(/penetration.partner is not a string/);
    });

    it('does not store an action that fails validation', function() {
      expect(register({ name:null })).to.throw();
      expect(() => SexAction.lookup('spec-invalid-action')).to.throw(/Bad sex action code/);
    });
  });

  describe('usesSlot()', function() {
    it('is true if the action uses the slot of that role', function() {
      const finger = SexAction.lookup('finger-anus');
      expect(finger.usesSlot('player',TrainingSlot.hands)).to.be.true;
      expect(finger.usesSlot('player',TrainingSlot.mouth)).to.be.false;
      expect(finger.usesSlot('partner',TrainingSlot.anus)).to.be.false;
      expect(finger.usesSlot('partner',TrainingSlot.hands)).to.be.false;
    });
  });
});
