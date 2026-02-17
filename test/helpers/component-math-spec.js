describe("ComponentMath", function() {

  describe("emotionBaseValue()", function() {
    it('calculates apathy range properly', function() {
      expect(ComponentMath.emotionBaseValue(0)).to.equal(0);
      expect(ComponentMath.emotionBaseValue(50)).to.equal(5);
      expect(ComponentMath.emotionBaseValue(100)).to.equal(10);
    });

    it('calculates mild range properly', function() {
      expect(Math.round(ComponentMath.emotionBaseValue(120))).to.equal(12);
      expect(Math.round(ComponentMath.emotionBaseValue(150))).to.equal(17);
      expect(Math.round(ComponentMath.emotionBaseValue(175))).to.equal(23);
      expect(Math.round(ComponentMath.emotionBaseValue(200))).to.equal(30);
    });

    it('calculates moderate range properly', function() {
      expect(Math.round(ComponentMath.emotionBaseValue(250))).to.equal(33);
      expect(Math.round(ComponentMath.emotionBaseValue(300))).to.equal(40);
      expect(Math.round(ComponentMath.emotionBaseValue(350))).to.equal(53);
      expect(Math.round(ComponentMath.emotionBaseValue(400))).to.equal(70);
    });

    it('calculates high range properly', function() {
      expect(Math.round(ComponentMath.emotionBaseValue(450))).to.equal(73);
      expect(Math.round(ComponentMath.emotionBaseValue(500))).to.equal(86);
      expect(Math.round(ComponentMath.emotionBaseValue(550))).to.equal(111);
      expect(Math.round(ComponentMath.emotionBaseValue(600))).to.equal(150);
    });

    it('calculates very high range properly', function() {
      expect(Math.round(ComponentMath.emotionBaseValue(650))).to.equal(153);
      expect(Math.round(ComponentMath.emotionBaseValue(700))).to.equal(166);
      expect(Math.round(ComponentMath.emotionBaseValue(750))).to.equal(197);
      expect(Math.round(ComponentMath.emotionBaseValue(800))).to.equal(250);
    });

    it('calculates extreme range properly', function() {
      expect(Math.round(ComponentMath.emotionBaseValue(850))).to.equal(254);
      expect(Math.round(ComponentMath.emotionBaseValue(900))).to.equal(281);
      expect(Math.round(ComponentMath.emotionBaseValue(950))).to.equal(355);
      expect(Math.round(ComponentMath.emotionBaseValue(1000))).to.equal(500);
    });
  });

  describe('personalityFactorValue()', function() {
    it('handles null values', function() {
      expect(Math.round(ComponentMath.personalityFactorValue(null))).to.equal(1);
      expect(Math.round(ComponentMath.personalityFactorValue(0))).to.equal(1);
    });

    it('calculates positive values', function() {
      expect(Math.round(100 * ComponentMath.personalityFactorValue(10))).to.equal(101);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(20))).to.equal(104);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(30))).to.equal(109);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(40))).to.equal(116);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(50))).to.equal(125);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(60))).to.equal(136);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(70))).to.equal(149);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(80))).to.equal(164);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(90))).to.equal(181);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(100))).to.equal(200);
    });

    it('calculates negative values', function() {
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-10))).to.equal(100);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-20))).to.equal(98);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-30))).to.equal(96);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-40))).to.equal(92);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-50))).to.equal(88);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-60))).to.equal(82);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-70))).to.equal(76);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-80))).to.equal(68);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-90))).to.equal(60);
      expect(Math.round(100 * ComponentMath.personalityFactorValue(-100))).to.equal(50);
    });
  });

  describe('applyFactorScale()', function() {
    it("applies to growth factors", function() {
      expect(ComponentMath.applyFactorScale(2.0,  1.5)).to.equal(1.5);
      expect(ComponentMath.applyFactorScale(2.0,  3.0)).to.equal(3.0);
      expect(ComponentMath.applyFactorScale(1.5,  3.0)).to.equal(2);
      expect(ComponentMath.applyFactorScale(1.1,  4.0)).to.closeTo(1.3,0.0001);
      expect(ComponentMath.applyFactorScale(1.75, 4.0)).to.equal(3.25);
      expect(ComponentMath.applyFactorScale(2.0,  4.0)).to.equal(4);
    });

    it("applies to reduction factors", function() {
      expect(Math.round(100*ComponentMath.applyFactorScale(0.50, 1.25))).to.equal(80);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.50, 1.5))).to.equal(67);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.50, 3))).to.equal(33);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.75, 3))).to.equal(67);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.90, 3))).to.equal(87);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.5,  4))).to.equal(25);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.5,  10))).to.equal(10);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.75, 10))).to.equal(55);
      expect(Math.round(100*ComponentMath.applyFactorScale(0.99, 10))).to.equal(98);
    });
  });

});
