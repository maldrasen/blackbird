describe("StringHelper", function() {

  describe('titlecaseAll()', function() {
    it('converts strings to titlecase', function() {
      expect(StringHelper.titlecaseAll('big floppy donkey-dick')).to.equal('Big Floppy Donkey Dick');
    });
  })

  describe('titlecaseName()', function() {
    it('capitalizes common names', function() {
      expect(StringHelper.titlecaseName('plate mail')).to.equal('Plate Mail');
      expect(StringHelper.titlecaseName('boots')).to.equal('Boots');
    });

    it('leaves proper names alone', function() {
      expect(StringHelper.titlecaseName('Crown of Sorrows')).to.equal('Crown of Sorrows');
    });
  })

  describe('longestCommonSubstring()', function() {
    it('finds the longest substring', function() {
      expect(StringHelper.longestCommonSubstring('dogcock','horsecock')).to.equal(4);
      expect(StringHelper.longestCommonSubstring('Horse','big swinging horse dick')).to.equal(5);
      expect(StringHelper.longestCommonSubstring('Cunt','Bitch')).to.equal(1);
      expect(StringHelper.longestCommonSubstring('Nope','Why')).to.equal(0);
    });
  });

});