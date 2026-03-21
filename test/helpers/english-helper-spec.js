describe("EnglishHelper", function() {

  it("pluralize() pluralizes the last word", function() {
    expect(EnglishHelper.pluralize('Vermen')).to.equal('Vermen');
    expect(EnglishHelper.pluralize('Woman')).to.equal('Women');
    expect(EnglishHelper.pluralize('man')).to.equal('men');
    expect(EnglishHelper.pluralize('Cock')).to.equal('Cocks');
    expect(EnglishHelper.pluralize('Fox')).to.equal('Foxes');
    expect(EnglishHelper.pluralize('sex toy')).to.equal('sex toys');
    expect(EnglishHelper.pluralize('titty')).to.equal('titties');
    expect(EnglishHelper.pluralize('leaf')).to.equal('leaves');
    expect(EnglishHelper.pluralize('wife')).to.equal('wives');
    expect(EnglishHelper.pluralize('potato')).to.equal('potatoes');
  });

});
