describe('LetterGradeHelper', function() {

  describe('feelingValue()', function() {
    it('when value is 0', function() {
      const feel = LetterGradeHelper.feelingValue(0);
      expect(feel.letter).to.equal('F');
      expect(feel.range).to.equal(100);
      expect(feel.progress).to.equal(0);
      expect(feel.remainder).to.equal(100);
    });

    it('when value is 80', function() {
      const feel = LetterGradeHelper.feelingValue(80);
      expect(feel.letter).to.equal('F');
      expect(feel.range).to.equal(100);
      expect(feel.progress).to.equal(80);
      expect(feel.remainder).to.equal(20);
    });

    it('when value is 125', function() {
      const feel = LetterGradeHelper.feelingValue(125);
      expect(feel.letter).to.equal('D');
      expect(feel.range).to.equal(100);
      expect(feel.progress).to.equal(25);
      expect(feel.remainder).to.equal(75);
    });

    it('when value is 210', function() {
      const feel = LetterGradeHelper.feelingValue(210);
      expect(feel.letter).to.equal('C');
      expect(feel.range).to.equal(200);
      expect(feel.progress).to.equal(10);
      expect(feel.remainder).to.equal(190);
    });

    it('when value is 490', function() {
      const feel = LetterGradeHelper.feelingValue(490);
      expect(feel.letter).to.equal('B');
      expect(feel.range).to.equal(100);
      expect(feel.progress).to.equal(90);
      expect(feel.remainder).to.equal(10);
    });

    it('when value is 575', function() {
      const feel = LetterGradeHelper.feelingValue(575);
      expect(feel.letter).to.equal('A');
      expect(feel.range).to.equal(100);
      expect(feel.progress).to.equal(75);
      expect(feel.remainder).to.equal(25);
    });
  });

  describe('sensitivityValue()', function() {
    it('translates indices to letters', function() {
      expect(LetterGradeHelper.sensitivityValue(0)).to.equal('');
      expect(LetterGradeHelper.sensitivityValue(1)).to.equal('F');
      expect(LetterGradeHelper.sensitivityValue(2)).to.equal('D');
      expect(LetterGradeHelper.sensitivityValue(3)).to.equal('C');
      expect(LetterGradeHelper.sensitivityValue(4)).to.equal('B');
      expect(LetterGradeHelper.sensitivityValue(5)).to.equal('A');
      expect(LetterGradeHelper.sensitivityValue(6)).to.equal('S');
      expect(LetterGradeHelper.sensitivityValue(7)).to.equal('SS');
      expect(LetterGradeHelper.sensitivityValue(8)).to.equal('SSS');
    });
  });

  describe('preferenceValue()', function() {
    it('translates ranges to letters', function() {
      expect(LetterGradeHelper.preferenceValue(10)).to.equal('F');
      expect(LetterGradeHelper.preferenceValue(20)).to.equal('F');
      expect(LetterGradeHelper.preferenceValue(30)).to.equal('D');
      expect(LetterGradeHelper.preferenceValue(50)).to.equal('C');
      expect(LetterGradeHelper.preferenceValue(75)).to.equal('B');
      expect(LetterGradeHelper.preferenceValue(100)).to.equal('A');
      expect(LetterGradeHelper.preferenceValue(120)).to.equal('S');
      expect(LetterGradeHelper.preferenceValue(200)).to.equal('SS');
      expect(LetterGradeHelper.preferenceValue(201)).to.equal('SSS');
    });
  });

  describe('scaleValue()', function() {
    it(`when value is 0`, function() {
      const range = LetterGradeHelper.scaleValue(0);
      expect(range.letter).to.equal('F');
      expect(range.progress).to.equal(0);
      expect(range.range).to.equal(100);
      expect(range.remainder).to.equal(100);
      expect(range.threshold).to.equal(100);
    });

    it('when value is 50', function() {
      const range = LetterGradeHelper.scaleValue(50);
      expect(range.letter).to.equal('F');
      expect(range.progress).to.equal(50);
      expect(range.range).to.equal(100);
      expect(range.remainder).to.equal(50);
      expect(range.threshold).to.equal(100);
    });

    it('when value is 100', function() {
      const range = LetterGradeHelper.scaleValue(100);
      expect(range.letter).to.equal('D');
      expect(range.progress).to.equal(0);
      expect(range.range).to.equal(400);
      expect(range.remainder).to.equal(400);
      expect(range.threshold).to.equal(500);
    });

    it('when value is 250', function() {
      const range = LetterGradeHelper.scaleValue(250);
      expect(range.letter).to.equal('D');
      expect(range.progress).to.equal(150);
      expect(range.range).to.equal(400);
      expect(range.remainder).to.equal(250);
      expect(range.threshold).to.equal(500);
    });

    it('when value is 2800', function() {
      const range = LetterGradeHelper.scaleValue(2800);
      expect(range.letter).to.equal('C');
      expect(range.progress).to.equal(2300);
      expect(range.range).to.equal(2500);
      expect(range.remainder).to.equal(200);
      expect(range.threshold).to.equal(3000);
    });

    it('when value is 9999', function() {
      const range = LetterGradeHelper.scaleValue(9999);
      expect(range.letter).to.equal('B');
      expect(range.progress).to.equal(6999);
      expect(range.range).to.equal(7000);
      expect(range.remainder).to.equal(1);
      expect(range.threshold).to.equal(10000);
    });

    it('when value is 249876', function() {
      const range = LetterGradeHelper.scaleValue(249876);
      expect(range.letter).to.equal('SSS');
      expect(range.progress).to.equal(149876);
      expect(range.range).to.equal(150000);
      expect(range.remainder).to.equal(124);
      expect(range.threshold).to.equal(250000);
    });

    it('when value is 250000', function() {
      expect(function() {
        LetterGradeHelper.scaleValue(250000)
      }).to.throw('Scale value [250000] is higher than the max scale threshold.');
    });
  });

});
