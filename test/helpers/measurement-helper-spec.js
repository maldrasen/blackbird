describe('MeasurementHelper', function() {

  describe('feetAndInches()', function() {
    it('converts millimeters to feet and inches', function() {
      expect(MeasurementHelper.feetAndInches(20)).to.deep.equal({   feet:0, inches:1 });
      expect(MeasurementHelper.feetAndInches(300)).to.deep.equal({  feet:1, inches:0 });
      expect(MeasurementHelper.feetAndInches(1500)).to.deep.equal({ feet:4, inches:11 });
      expect(MeasurementHelper.feetAndInches(1600)).to.deep.equal({ feet:5, inches:3 });
      expect(MeasurementHelper.feetAndInches(1700)).to.deep.equal({ feet:5, inches:7 });
      expect(MeasurementHelper.feetAndInches(1800)).to.deep.equal({ feet:5, inches:11 });
      expect(MeasurementHelper.feetAndInches(3000)).to.deep.equal({ feet:9, inches:10 });
      expect(MeasurementHelper.feetAndInches(5000)).to.deep.equal({ feet:16, inches:5 });
    });
  });

  describe('feetInchesAndFraction()', function() {
    it('converts millimeters to feet, inches, and a quarter fraction index', function() {
      expect(MeasurementHelper.feetInchesAndFraction(0)).to.deep.equal({ feet:0, inches:0, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(3)).to.deep.equal({ feet:0, inches:0, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(4)).to.deep.equal({ feet:0, inches:0, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(7)).to.deep.equal({ feet:0, inches:0, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(13)).to.deep.equal({ feet:0, inches:0, index:2 });
      expect(MeasurementHelper.feetInchesAndFraction(20)).to.deep.equal({ feet:0, inches:0, index:3 });
      expect(MeasurementHelper.feetInchesAndFraction(22)).to.deep.equal({ feet:0, inches:0, index:3 });
      expect(MeasurementHelper.feetInchesAndFraction(23)).to.deep.equal({ feet:0, inches:1, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(40)).to.deep.equal({ feet:0, inches:1, index:2 });
      expect(MeasurementHelper.feetInchesAndFraction(80)).to.deep.equal({ feet:0, inches:3, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(300)).to.deep.equal({ feet:0, inches:11, index:3 }); // When we round to the inch 300mm is a foot.
      expect(MeasurementHelper.feetInchesAndFraction(303)).to.deep.equal({ feet:1, inches:0, index:0 }); // When we round to the quarter inch 303mm is a foot.
      expect(MeasurementHelper.feetInchesAndFraction(310)).to.deep.equal({ feet:1, inches:0, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(1500)).to.deep.equal({ feet:4, inches:11, index:0 });
    });

    it('converts millimeters to feet, inches, and an eight fraction index', function() {
      expect(MeasurementHelper.feetInchesAndFraction(0,true)).to.deep.equal({ feet:0, inches:0, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(1,true)).to.deep.equal({ feet:0, inches:0, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(2,true)).to.deep.equal({ feet:0, inches:0, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(4,true)).to.deep.equal({ feet:0, inches:0, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(5,true)).to.deep.equal({ feet:0, inches:0, index:2 });
      expect(MeasurementHelper.feetInchesAndFraction(13,true)).to.deep.equal({ feet:0, inches:0, index:4 });
      expect(MeasurementHelper.feetInchesAndFraction(20,true)).to.deep.equal({ feet:0, inches:0, index:6 });
      expect(MeasurementHelper.feetInchesAndFraction(21,true)).to.deep.equal({ feet:0, inches:0, index:7 });
      expect(MeasurementHelper.feetInchesAndFraction(23,true)).to.deep.equal({ feet:0, inches:0, index:7 });
      expect(MeasurementHelper.feetInchesAndFraction(24,true)).to.deep.equal({ feet:0, inches:1, index:0 });
      expect(MeasurementHelper.feetInchesAndFraction(40,true)).to.deep.equal({ feet:0, inches:1, index:5 });
      expect(MeasurementHelper.feetInchesAndFraction(80,true)).to.deep.equal({ feet:0, inches:3, index:1 });
      expect(MeasurementHelper.feetInchesAndFraction(303,true)).to.deep.equal({ feet:0, inches:11, index:7 });
      expect(MeasurementHelper.feetInchesAndFraction(304,true)).to.deep.equal({ feet:1, inches:0, index:0 }); // When we round to the eighth inch 304mm is a foot.
      expect(MeasurementHelper.feetInchesAndFraction(310,true)).to.deep.equal({ feet:1, inches:0, index:2 });
      expect(MeasurementHelper.feetInchesAndFraction(1500,true)).to.deep.equal({ feet:4, inches:11, index:0 });
    });
  });

  describe('feetAndInchesAbbreviated()', function() {
    it('uses prime symbols for feet and inches', function() {
      expect(MeasurementHelper.feetAndInchesAbbreviated(1530)).to.equal('5′0″');
      expect(MeasurementHelper.feetAndInchesAbbreviated(1600)).to.equal('5′3″');
      expect(MeasurementHelper.feetAndInchesAbbreviated(1830)).to.equal('6′0″');
      expect(MeasurementHelper.feetAndInchesAbbreviated(2300)).to.equal('7′7″');
    });
  });

  describe('feetAndInchesInEnglish()', function() {
    it('handles zero inches', function() {
      expect(MeasurementHelper.feetAndInchesInEnglish(1530)).to.equal('five feet');
      expect(MeasurementHelper.feetAndInchesInEnglish(1830)).to.equal('six feet');
    });

    it('handles singular inch', function() {
      expect(MeasurementHelper.feetAndInchesInEnglish(1550)).to.equal('five feet, one inch');
      expect(MeasurementHelper.feetAndInchesInEnglish(1860)).to.equal('six feet, one inch');
    });

    it('handles plural inches', function() {
      expect(MeasurementHelper.feetAndInchesInEnglish(1600)).to.equal('five feet, three inches');
      expect(MeasurementHelper.feetAndInchesInEnglish(5000)).to.equal('sixteen feet, five inches');
    });
  });

  describe('footAndInchesInEnglish()', function() {
    it('uses the singular foot', function () {
      expect(MeasurementHelper.footAndInchesInEnglish(1530)).to.equal('five foot');
      expect(MeasurementHelper.footAndInchesInEnglish(1600)).to.equal('five foot, three inches');
    });
  });

  describe('feetAndInchesWithFractions()', function() {
    it('handles whole lengths', function () {
      expect(MeasurementHelper.feetAndInchesWithFractions(25)).to.equal('one inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(305)).to.equal('one foot');
      expect(MeasurementHelper.feetAndInchesWithFractions(610)).to.equal('two feet');
      expect(MeasurementHelper.feetAndInchesWithFractions(813)).to.equal('two feet, eight inches');
    });

    it('handles fractional lengths down to the quarter inch', function () {
      expect(MeasurementHelper.feetAndInchesWithFractions(1)).to.equal('1 millimeter');
      expect(MeasurementHelper.feetAndInchesWithFractions(2)).to.equal('2 millimeters');
      expect(MeasurementHelper.feetAndInchesWithFractions(3)).to.equal('3 millimeters');
      expect(MeasurementHelper.feetAndInchesWithFractions(4)).to.equal('quarter inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(12)).to.equal('half inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(20)).to.equal('three-quarter inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(45)).to.equal('one and three-quarters inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(165)).to.equal('six and a half inches');
      expect(MeasurementHelper.feetAndInchesWithFractions(349)).to.equal('one foot, one and three-quarters inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(527)).to.equal('one foot, eight and three-quarters inches');
      expect(MeasurementHelper.feetAndInchesWithFractions(806)).to.equal('two feet, seven and three-quarters inches');
    });

    it('handles fractional lengths down to the eighth inch', function () {
      expect(MeasurementHelper.feetAndInchesWithFractions(2, true)).to.equal('eighth inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(10, true)).to.equal('three-eighths inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(16, true)).to.equal('five-eighths inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(22, true)).to.equal('seven-eighths inch');
      expect(MeasurementHelper.feetAndInchesWithFractions(70, true)).to.equal('two and three-quarters inches');
      expect(MeasurementHelper.feetAndInchesWithFractions(20000, true)).to.equal('sixty-five feet, seven and three-eighths inches');
    });
  });

  describe('inchesWithFractions()', function() {
    it('creates an english phrase for length with inches down to the quarter inch', function() {
      expect(MeasurementHelper.inchesWithFractions(4)).to.equal('quarter inch');
      expect(MeasurementHelper.inchesWithFractions(12)).to.equal('half inch');
      expect(MeasurementHelper.inchesWithFractions(20)).to.equal('three-quarter inch');
      expect(MeasurementHelper.inchesWithFractions(45)).to.equal('one and three-quarters inch');
      expect(MeasurementHelper.inchesWithFractions(165)).to.equal('six and a half inches');
      expect(MeasurementHelper.inchesWithFractions(349)).to.equal('thirteen and three-quarters inch');
      expect(MeasurementHelper.inchesWithFractions(527)).to.equal('twenty and three-quarters inches');
      expect(MeasurementHelper.inchesWithFractions(806)).to.equal('thirty-one and three-quarters inches');
      expect(MeasurementHelper.inchesWithFractions(1600)).to.equal('sixty-three inches');
    });

    it('creates an english phrase for length with inches down to the eighth inch', function() {
      expect(MeasurementHelper.inchesWithFractions(2, true)).to.equal('eighth inch');
      expect(MeasurementHelper.inchesWithFractions(10, true)).to.equal('three-eighths inch');
      expect(MeasurementHelper.inchesWithFractions(16, true)).to.equal('five-eighths inch');
      expect(MeasurementHelper.inchesWithFractions(22, true)).to.equal('seven-eighths inch');
      expect(MeasurementHelper.inchesWithFractions(70, true)).to.equal('two and three-quarters inches');
      expect(MeasurementHelper.inchesWithFractions(165, true)).to.equal('six and a half inches');
      expect(MeasurementHelper.inchesWithFractions(412, true)).to.equal('sixteen and a quarter inches');
      expect(MeasurementHelper.inchesWithFractions(617, true)).to.equal('twenty-four and a quarter inches');
      expect(MeasurementHelper.inchesWithFractions(1120, true)).to.equal('forty-four and one-eighth inches');
    });
  });

});