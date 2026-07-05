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

    // Options default to weight:100 each, so with 'second' and 'third' both valid the frequency map is {1:100,2:100}
    // and Random.roll() is called with a total of 200. A stubbed roll of 150 falls in the second bucket ('third').
    Random.stubRoll(150);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='2'>third</span>`);
  });

  it('throws when every option is filtered out', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('nope', () => false);
    expect(() => pkg.pick()).to.throw();
  });

  it('favors options with a higher weight', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('common', null, 100);
    pkg.add('rare', null, 10);

    // Frequency map is {0:100,1:10}, total 110. A stubbed roll of 105 lands past the first bucket (0-99), in the
    // second ('rare').
    Random.stubRoll(105);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='1'>rare</span>`);
  });

});
