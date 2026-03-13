describe("CharacterMath", function() {

  describe("emotionBaseValue()", function() {
    it('calculates apathy range properly', function() {
      expect(CharacterMath.emotionBaseValue(0)).to.equal(0);
      expect(CharacterMath.emotionBaseValue(50)).to.equal(5);
      expect(CharacterMath.emotionBaseValue(100)).to.equal(10);
    });

    it('calculates mild range properly', function() {
      expect(Math.round(CharacterMath.emotionBaseValue(120))).to.equal(12);
      expect(Math.round(CharacterMath.emotionBaseValue(150))).to.equal(17);
      expect(Math.round(CharacterMath.emotionBaseValue(175))).to.equal(23);
      expect(Math.round(CharacterMath.emotionBaseValue(200))).to.equal(30);
    });

    it('calculates moderate range properly', function() {
      expect(Math.round(CharacterMath.emotionBaseValue(250))).to.equal(33);
      expect(Math.round(CharacterMath.emotionBaseValue(300))).to.equal(40);
      expect(Math.round(CharacterMath.emotionBaseValue(350))).to.equal(53);
      expect(Math.round(CharacterMath.emotionBaseValue(400))).to.equal(70);
    });

    it('calculates high range properly', function() {
      expect(Math.round(CharacterMath.emotionBaseValue(450))).to.equal(73);
      expect(Math.round(CharacterMath.emotionBaseValue(500))).to.equal(86);
      expect(Math.round(CharacterMath.emotionBaseValue(550))).to.equal(111);
      expect(Math.round(CharacterMath.emotionBaseValue(600))).to.equal(150);
    });

    it('calculates very high range properly', function() {
      expect(Math.round(CharacterMath.emotionBaseValue(650))).to.equal(153);
      expect(Math.round(CharacterMath.emotionBaseValue(700))).to.equal(166);
      expect(Math.round(CharacterMath.emotionBaseValue(750))).to.equal(197);
      expect(Math.round(CharacterMath.emotionBaseValue(800))).to.equal(250);
    });

    it('calculates extreme range properly', function() {
      expect(Math.round(CharacterMath.emotionBaseValue(850))).to.equal(254);
      expect(Math.round(CharacterMath.emotionBaseValue(900))).to.equal(281);
      expect(Math.round(CharacterMath.emotionBaseValue(950))).to.equal(355);
      expect(Math.round(CharacterMath.emotionBaseValue(1000))).to.equal(500);
    });
  });

  describe('personalityFactorValue()', function() {
    it('handles null values', function() {
      expect(Math.round(CharacterMath.personalityFactorValue(null))).to.equal(1);
      expect(Math.round(CharacterMath.personalityFactorValue(0))).to.equal(1);
    });

    it('calculates positive values', function() {
      expect(Math.round(100 * CharacterMath.personalityFactorValue(10))).to.equal(101);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(20))).to.equal(104);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(30))).to.equal(109);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(40))).to.equal(116);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(50))).to.equal(125);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(60))).to.equal(136);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(70))).to.equal(149);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(80))).to.equal(164);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(90))).to.equal(181);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(100))).to.equal(200);
    });

    it('calculates negative values', function() {
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-10))).to.equal(100);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-20))).to.equal(98);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-30))).to.equal(96);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-40))).to.equal(92);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-50))).to.equal(88);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-60))).to.equal(82);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-70))).to.equal(76);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-80))).to.equal(68);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-90))).to.equal(60);
      expect(Math.round(100 * CharacterMath.personalityFactorValue(-100))).to.equal(50);
    });
  });

  describe('applyFactorScale()', function() {
    it("applies to growth factors", function() {
      expect(CharacterMath.applyFactorScale(2.0,  1.5)).to.equal(1.5);
      expect(CharacterMath.applyFactorScale(2.0,  3.0)).to.equal(3.0);
      expect(CharacterMath.applyFactorScale(1.5,  3.0)).to.equal(2);
      expect(CharacterMath.applyFactorScale(1.1,  4.0)).to.closeTo(1.3,0.0001);
      expect(CharacterMath.applyFactorScale(1.75, 4.0)).to.equal(3.25);
      expect(CharacterMath.applyFactorScale(2.0,  4.0)).to.equal(4);
    });

    it("applies to reduction factors", function() {
      expect(Math.round(100*CharacterMath.applyFactorScale(0.50, 1.25))).to.equal(80);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.50, 1.5))).to.equal(67);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.50, 3))).to.equal(33);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.75, 3))).to.equal(67);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.90, 3))).to.equal(87);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.5,  4))).to.equal(25);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.5,  10))).to.equal(10);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.75, 10))).to.equal(55);
      expect(Math.round(100*CharacterMath.applyFactorScale(0.99, 10))).to.equal(98);
    });
  });

  describe('saturatingGrowthCurve()', function() {
    it('can have have slow growth', function() {
      expect(Math.round(CharacterMath.saturatingGrowthCurve(100, 100, 0.003))).to.equal(26);
      expect(Math.round(CharacterMath.saturatingGrowthCurve(300, 100, 0.003))).to.equal(59);
      expect(Math.round(CharacterMath.saturatingGrowthCurve(500, 100, 0.003))).to.equal(78);
      expect(Math.round(CharacterMath.saturatingGrowthCurve(750, 100, 0.003))).to.equal(89);
      expect(Math.round(CharacterMath.saturatingGrowthCurve(1000, 100, 0.003))).to.equal(95);
    });
  });

});
