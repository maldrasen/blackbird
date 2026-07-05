describe("WeaverPackage", function() {

  function isYes() { return true; }
  function isNo() { return false; }

  it('picks an option with no requires closure', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('hello');
    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='0'>hello</span>`);
  });

  it('excludes options whose requires() returns false', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('nope',isNo);
    pkg.add('yep',[isYes,isYes]);

    Random.stubRoll(0);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='1'>yep</span>`);
  });

  it('keeps the data-option index tied to the original add() order, not the filtered list', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('filtered-out',[isYes,isNo]);
    pkg.add('second',isYes);
    pkg.add('third',isYes);

    Random.stubRoll(1);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='2'>third</span>`);
  });

  it('throws when every option is filtered out', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('nope', () => false);
    expect(() => pkg.pick()).to.throw();
  });

});
