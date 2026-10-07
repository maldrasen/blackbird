Record.define('Location', {
  getInstance: location => ({
    getName: () => { return location.name; },
    getDistrict: () => { return location.district; },
    getBackground: () => { return location.background; },
    getActions: () => { return (location.actions || []).filter(action => Requirements.met(action.requires)); },
  }),
});
