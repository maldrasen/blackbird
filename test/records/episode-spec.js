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
    expect(register({ layout:'sideways' })).to.throw(/layout\[sideways\] not in list/);
  });

  it('rejects an endFunction that is not a function', function() {
    expect(register({ endFunction:'finish' })).to.throw(/endFunction is not a function/);
  });

  it('rejects a record with no pages', function() {
    expect(register({ pages:null })).to.throw(/pages is not an array/);
    expect(register({ pages:[] })).to.throw(/pages.length is less than 1/);
  });

  it('rejects a page with neither content nor a contentFunction', function() {
    expect(registerPage({})).to.throw(/exactly one of content or contentFunction/);
  });

  it('rejects a page with both content and a contentFunction', function() {
    expect(registerPage({ content:`<p>Text</p>`, contentFunction:() => `<p>Text</p>` }))
      .to.throw(/exactly one of content or contentFunction/);
  });

  it('rejects a page with an unknown buttonsStyle', function() {
    expect(registerPage({ content:`<p>Text</p>`, buttonsStyle:'grid' })).to.throw(/buttonsStyle\[grid\] not in list/);
  });

  it('rejects a page onShow that is not a function', function() {
    expect(registerPage({ content:`<p>Text</p>`, onShow:'playEffect' })).to.throw(/onShow is not a function/);
  });

  it('rejects a non-string page label', function() {
    expect(registerPage({ content:`<p>Text</p>`, label:7 })).to.throw(/label is not a string/);
  });

  it('rejects duplicate page labels', function() {
    expect(register({ pages:[
      { content:`<p>Text</p>`, label:'again' },
      { content:`<p>Text</p>`, label:'again' },
    ]})).to.throw(/duplicate page label \[again\]/);
  });

  it('rejects a page jump to an unknown label', function() {
    expect(registerPage({ content:`<p>Text</p>`, jump:'nowhere' })).to.throw(/jumps to an unknown label \[nowhere\]/);
  });

  it('rejects a page with both jump and end', function() {
    expect(register({ pages:[
      { content:`<p>Text</p>`, label:'here' },
      { content:`<p>Text</p>`, jump:'here', end:true },
    ]})).to.throw(/cannot have both jump and end/);
  });

  it('rejects an end that is not true', function() {
    expect(registerPage({ content:`<p>Text</p>`, end:'yes' })).to.throw(/end is yes/);
    expect(registerButton({ label:'Leave', end:false })).to.throw(/end is false/);
  });

  it('rejects page requires that are not functions', function() {
    expect(registerPage({ content:`<p>Text</p>`, requires:[() => true, 'hasPlayer'] }))
      .to.throw(/pages\[0\].requires is not a function or an array of functions/);
  });

  it('rejects page buttons that are not an array', function() {
    expect(registerPage({ content:`<p>Text</p>`, buttons:{ label:'Continue' } })).to.throw(/buttons is not an array/);
  });

  it('rejects an unknown standard button', function() {
    expect(registerButton({ standard:'proceed' })).to.throw(/standard\[proceed\] not in list/);
  });

  it('rejects a button without a label', function() {
    expect(registerButton({ id:'specButton' })).to.throw(/buttons\[0\].label is not a string/);
  });

  it('rejects a button callback that is not a function', function() {
    expect(registerButton({ label:'Continue', callback:'endEpisode' })).to.throw(/callback is not a function/);
  });

  it('rejects a button jump to an unknown label', function() {
    expect(registerButton({ label:'Approach', jump:'nowhere' })).to.throw(/jumps to an unknown label \[nowhere\]/);
  });

  it('rejects a button with both jump and end', function() {
    expect(registerButton({ label:'Approach', jump:'here', end:true })).to.throw(/cannot have both jump and end/);
  });

  it('rejects a button classname that is not a string or string array', function() {
    expect(registerButton({ label:'Continue', classname:['button-primary',7] }))
      .to.throw(/classname is not a string or an array of strings/);
  });

  it('rejects a queue with no placement', function() {
    expect(register({ queue:{ on:'enter' } })).to.throw(/needs one of global, district, or location/);
  });

  it('rejects a queue with multiple placements', function() {
    expect(register({ queue:{ global:true, district:'dungeon' } })).to.throw(/cannot include both/);
  });

  it('rejects an unknown queue moment', function() {
    expect(registerQueue({ on:'entre' })).to.throw(/queue.on\[entre\] not in list/);
  });

  it('rejects a queue chance outside 0 to 100', function() {
    expect(registerQueue({ chance:101 })).to.throw(/chance.101 greater than 100/);
    expect(registerQueue({ chance:'25' })).to.throw(/chance is not a number/);
  });

  it('rejects a queue priority that is not a number', function() {
    expect(registerQueue({ priority:'critical' })).to.throw(/priority is not a number/);
  });

  it('rejects a queue repeat that is not true', function() {
    expect(registerQueue({ repeat:'yes' })).to.throw(/repeat is yes/);
    expect(registerQueue({ repeat:false })).to.throw(/repeat is false/);
  });

  it('rejects a queue removeWhen that is not a function', function() {
    expect(registerQueue({ removeWhen:true })).to.throw(/removeWhen is not a function/);
  });

  it('rejects queue requires that are not functions', function() {
    expect(registerQueue({ requires:'hasPlayer' })).to.throw(/queue.requires is not a function or an array of functions/);
  });

  it('does not store an episode that fails validation', function() {
    expect(register({ layout:'sideways' })).to.throw();
    expect(() => Episode.lookup('spec-invalid-episode')).to.throw(/Bad episode code/);
  });

});
