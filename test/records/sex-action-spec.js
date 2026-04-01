describe('SexAction', function() {
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
