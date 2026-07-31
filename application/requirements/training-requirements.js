global.TrainingRequirements = (function() {

  return Object.freeze({
    withAttitude: code => { return (context) => { return context.attitude === code; }},
    withAction: code =>   { return (context) => { return context.action === code; }},
  });

})();
