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

    Random.stubRoll(0, 0);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='1'>yep</span>`);
  });

  it('keeps the data-option index tied to the original add() order, not the filtered list', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('filtered-out',[isYes,isNo]);
    pkg.add('second',isYes);
    pkg.add('third',isYes);

    Random.stubRoll(0, 150);

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

    Random.stubRoll(0, 105);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='1'>rare</span>`);
  });

  it('assembles a multipart format from its parts', function() {
    const pkg = WeaverPackage('test.package');
    pkg.defineFormat('{{motion}}, "{{dialogue}}"');
    pkg.addPart('motion', 'Herp');
    pkg.addPart('dialogue', "Derp?");

    Random.stubRoll(0, 0, 0);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-format='0' data-parts='0,0'>Herp, "Derp?"</span>`);
  });

  it('picks between a single option and a format', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('whole line', null, 100);
    pkg.defineFormat('{{motion}}', 100);
    pkg.addPart('motion', 'a fragment');

    Random.stubRoll(0, 0);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-format='0' data-parts='0'>a fragment</span>`);
  });

  it('excludes a format when one of its keys has no valid part', function() {
    const pkg = WeaverPackage('test.package');
    pkg.add('fallback');
    pkg.defineFormat('{{motion}} {{dialogue}}');
    pkg.addPart('motion', 'a fragment');
    pkg.addPart('dialogue', 'gated', isNo);

    Random.stubRoll(0, 0);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-option='0'>fallback</span>`);
  });

  it('weights parts within a key independently', function() {
    const pkg = WeaverPackage('test.package');
    pkg.defineFormat('{{motion}}');
    pkg.addPart('motion', 'common', null, 100);
    pkg.addPart('motion', 'rare', null, 10);

    Random.stubRoll(0, 105);

    expect(pkg.pick()).to.equal(`<span data-package='test.package' data-format='0' data-parts='1'>rare</span>`);
  });

});
