describe("Record", function() {

  let widgets;
  let gadgets;
  let addedToGlobal;

  // Mocha checks for leaked globals after every hook and test, so the throwaway records are taken back out of the
  // global scope as soon as define() has put them there.
  before(function() {
    widgets = Record.define('SpecWidget', {
      getInstance: (widget, code) => ({
        getName: () => { return widget.name; },
        getLabel: () => { return `${code}:${widget.name}`; },
        rename: name => { widget.name = name; },
      }),
    });

    gadgets = Record.define('SpecGadget', {
      register: (code, data) => { return { ...data, registered:true }; },
      validate: (gadget, code) => { if (gadget.size == null) { throw new Error(`SpecGadget[${code}] needs a size.`); } },
      getInstance: gadget => ({
        getSize: () => { return gadget.size; },
        isRegistered: () => { return gadget.registered === true; },
      }),
      functions: records => ({
        count: () => { return Object.keys(records).length; },
        lookup: () => { return 'shadowed'; },
      }),
    });

    addedToGlobal = (global.SpecWidget === widgets && global.SpecGadget === gadgets);
    delete global.SpecWidget;
    delete global.SpecGadget;

    widgets.register('cog', { name:'Cog' });
    gadgets.register('lever', { size:3 });
  });

  it("adds the record to the global scope and returns it", function() {
    expect(addedToGlobal).to.equal(true);
    expect(widgets.getAllCodes()).to.deep.equal(['cog']);
  });

  it("looks up an instance with getCode() added to the accessors", function() {
    const cog = widgets.lookup('cog');

    expect(cog.getCode()).to.equal('cog');
    expect(cog.getName()).to.equal('Cog');
    expect(cog.getLabel()).to.equal('cog:Cog');
  });

  it("throws for an unknown code, naming the record", function() {
    expect(() => widgets.lookup('sprocket')).to.throw('Bad SpecWidget code [sprocket]');
  });

  it("hands getInstance a copy of the stored data", function() {
    widgets.lookup('cog').rename('Sprocket');
    expect(widgets.lookup('cog').getName()).to.equal('Cog');
  });

  it("stores what a custom register returns", function() {
    const lever = gadgets.lookup('lever');

    expect(lever.getSize()).to.equal(3);
    expect(lever.isRegistered()).to.equal(true);
  });

  it("validates the data before storing it", function() {
    expect(() => gadgets.register('broken', {})).to.throw('SpecGadget[broken] needs a size.');
    expect(gadgets.getAllCodes()).to.deep.equal(['lever']);
  });

  it("adds the extra functions and gives them the data store", function() {
    expect(gadgets.count()).to.equal(1);
  });

  it("keeps the standard functions over extra functions with the same name", function() {
    expect(gadgets.lookup('lever').getSize()).to.equal(3);
  });

  it("refuses to define over an existing global or without getInstance", function() {
    expect(() => Record.define('Material', { getInstance: () => ({}) })).to.throw('already been defined');
    expect(() => Record.define('SpecNothing', {})).to.throw('getInstance is not a function');
  });

});
