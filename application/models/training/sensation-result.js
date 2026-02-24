global.SensationResult = function(code, context) {
  const player = context.P;
  const partner = context.T;

  const consentResult = ConsentResult(partner, player);
        consentResult.setSexAction(code);
        consentResult.applyFactors();

  const consent = consentResult.getConsent();
  const response = {}

  function applyFactors() {
    applyBaseline();
  }

  function applyBaseline() {
    console.log("Calculate Baseline:")
  }

  return Object.freeze({
    getResponse: () => { return response; },
    applyFactors,
    applyBaseline,
  });
}
