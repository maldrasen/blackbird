describe('Episode', function() {

  function register(overrides) {
    return () => Episode.register('spec-invalid-episode', {
      pages: [{ content:`<p>Text</p>` }],
      ...overrides,
    });
  }

  function registerPage(page) { return register({ pages:[page] }); }
  function registerButton(button) { return registerPage({ content:`<p>Text</p>`, buttons:[button] }); }
  function registerQueue(queue) { return register({ queue:{ global:true, ...queue } }); }

  it('rejects an unknown layout', function() {
    expect(register({ layout:'sideways' })).to.throw(/unknown layout/);
  });

  it('rejects an endFunction that is not a function', function() {
    expect(register({ endFunction:'finish' })).to.throw(/endFunction must be a function/);
  });

  it('rejects a record with no pages', function() {
    expect(register({ pages:null })).to.throw(/at least one page/);
    expect(register({ pages:[] })).to.throw(/at least one page/);
  });

  it('rejects a page with neither content nor a contentFunction', function() {
    expect(registerPage({})).to.throw(/exactly one of content or contentFunction/);
  });

  it('rejects a page with both content and a contentFunction', function() {
    expect(registerPage({ content:`<p>Text</p>`, contentFunction:() => `<p>Text</p>` }))
      .to.throw(/exactly one of content or contentFunction/);
  });

  it('rejects a page with an unknown buttonsStyle', function() {
    expect(registerPage({ content:`<p>Text</p>`, buttonsStyle:'grid' })).to.throw(/unknown buttonsStyle/);
  });

  it('rejects a page onShow that is not a function', function() {
    expect(registerPage({ content:`<p>Text</p>`, onShow:'playEffect' })).to.throw(/onShow must be a function/);
  });

  it('rejects page requires that are not functions', function() {
    expect(registerPage({ content:`<p>Text</p>`, requires:[() => true, 'hasPlayer'] }))
      .to.throw(/page 0 requires must be a function/);
  });

  it('rejects page buttons that are not an array', function() {
    expect(registerPage({ content:`<p>Text</p>`, buttons:{ label:'Continue' } })).to.throw(/buttons must be an array/);
  });

  it('rejects an unknown standard button', function() {
    expect(registerButton({ standard:'proceed' })).to.throw(/unknown standard button/);
  });

  it('rejects a button without a label', function() {
    expect(registerButton({ id:'specButton' })).to.throw(/button 0 needs a label/);
  });

  it('rejects a button callback that is not a function', function() {
    expect(registerButton({ label:'Continue', callback:'endEpisode' })).to.throw(/callback must be a function/);
  });

  it('rejects a button classname that is not a string or string array', function() {
    expect(registerButton({ label:'Continue', classname:['button-primary',7] })).to.throw(/classname must be a string/);
  });

  it('rejects a queue with no placement', function() {
    expect(register({ queue:{ on:'enter' } })).to.throw(/exactly one of global, district, or location/);
  });

  it('rejects a queue with multiple placements', function() {
    expect(register({ queue:{ global:true, district:'dungeon' } }))
      .to.throw(/exactly one of global, district, or location/);
  });

  it('rejects an unknown queue moment', function() {
    expect(registerQueue({ on:'entre' })).to.throw(/queue on must be 'enter' or 'move'/);
  });

  it('rejects a queue chance outside 0 to 100', function() {
    expect(registerQueue({ chance:101 })).to.throw(/chance must be a number from 0 to 100/);
    expect(registerQueue({ chance:'25' })).to.throw(/chance must be a number from 0 to 100/);
  });

  it('rejects a queue priority that is not a number', function() {
    expect(registerQueue({ priority:'critical' })).to.throw(/priority must be a number/);
  });

  it('rejects a queue repeat that is not a boolean', function() {
    expect(registerQueue({ repeat:'yes' })).to.throw(/repeat must be a boolean/);
  });

  it('rejects a queue removeWhen that is not a function', function() {
    expect(registerQueue({ removeWhen:true })).to.throw(/removeWhen must be a function/);
  });

  it('rejects queue requires that are not functions', function() {
    expect(registerQueue({ requires:'hasPlayer' })).to.throw(/queue requires must be a function/);
  });

  it('does not store an episode that fails validation', function() {
    expect(register({ layout:'sideways' })).to.throw();
    expect(() => Episode.lookup('spec-invalid-episode')).to.throw(/Bad episode code/);
  });

});
