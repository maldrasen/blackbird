describe("ObjectHelper", function() {

  describe("filter()", function() {
    it("filters by a list of allowable keys", function() {
      const object = { a:1, b:2, c:3, horse:'cock' }
      const result = ObjectHelper.filter(object, ['a','b','c']);
      expect(Object.values(result)).to.deep.equal([1,2,3]);
    });
  });

  describe("select()", function() {
    it("selects an object's properties that pass a selector function", function() {
      const object = { a:5, b:10, c:20, d:100 }
      const result = ObjectHelper.select(object, (key,value) => key === 'a' || value > 50);
      expect(Object.entries(result)).to.deep.equal([['a',5],['d',100]]);
    });
  });

  describe("unfloat()", function() {
    it("rounds floats to ints", function() {
      const object = { a:6.1, b:8.9, horse:'cock' };
      const result = ObjectHelper.unfloat(object);
      expect(Object.values(result)).to.deep.equal([6,9,'cock']);
    });
  });

});