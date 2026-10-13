describe("Validate", function() {

  describe("isWholeNumber()", function() {
    it("accepts an integer", function() {
      expect(function() { Validate.isWholeNumber('count', 4); }).to.not.throw();
    });

    it("rejects a fraction", function() {
      expect(function() { Validate.isWholeNumber('count', 4.5); }).to.throw('count is not a whole number');
    });

    it("rejects a non-number", function() {
      expect(function() { Validate.isWholeNumber('count', '4'); }).to.throw('count is not a whole number');
    });
  });

  describe("isNotNegative()", function() {
    it("accepts zero", function() {
      expect(function() { Validate.isNotNegative('count', 0); }).to.not.throw();
    });

    it("rejects a negative number", function() {
      expect(function() { Validate.isNotNegative('count', -0.5); }).to.throw('count is negative');
    });

    it("rejects a non-number", function() {
      expect(function() { Validate.isNotNegative('count', null); }).to.throw('count is negative');
    });

    it("rejects NaN", function() {
      expect(function() { Validate.isNotNegative('count', NaN); }).to.throw('count is negative');
    });
  });

});
