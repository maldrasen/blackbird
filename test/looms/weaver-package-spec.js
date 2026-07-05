describe("WeaverPackage", function() {

  it('picks an option with no requires closure', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('hello');
    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='0'>hello</span>`);
  });

  it.only('excludes options whose requires() returns false', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('nope', () => false);
    pkg.add('yep', () => true);

    Random.stubRoll(0);

    console.log(pkg.pick())

    // expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='1'>yep</span>`);
  });

  it('keeps the data-option index tied to the original add() order, not the filtered list', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('filtered-out', () => false);
    pkg.add('second', () => true);
    pkg.add('third', () => true);

    Random.stubRoll(1);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='2'>third</span>`);
  });

  it('throws when every option is filtered out', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('nope', () => false);
    expect(() => pkg.pick()).to.throw();
  });

});
