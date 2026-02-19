global.TrainingActionPanel = (function() {

  function init() {
    X.onClick('#trainingView .sex-action a', actionClicked);
  }

  function build() {
    TrainingController.getPossibleActions().forEach(code => {
      const action = SexAction.lookup(code);
      const actionList = X.first('#actionList');

      actionList.appendChild(X.createElement(
        `<li class="sex-action"><a class=""
            data-code="${action.getCode()}"
            data-main-category="${action.getMainCategory()}"
            data-partner-category="${action.getPartnerCategory()}"
            data-player-category="${action.getPlayerCategory()}"
            href="#">${action.getName()}</a></li>`));
    });

    ScrollingPanel({ id:'#actionListScroll' });
  }

  function update() {
    const context = TrainingController.getContext();
    const consentResult = ConsentResult(context.T, context.P);

    console.log("Update Action Panel")

    X.each('#actionList .sex-action a', link => {
      const code = link.dataset.code;
      const sexAction = SexAction.lookup(code);

      link.setAttribute('class','');

      consentResult.setSexAction(code);
      consentResult.applyFactors();

      const response = consentResult.getResponse();

      console.log(`Update ${code} Action [${consentResult.getConsentValue()}]=${consentResult.getConsent()}`,response);

      if (sexAction.isAvailable(context) === false) {
        X.addClass(link,'unavailable');
      } else {
        if (consentResult.getConsent() === Consent.unwilling) { X.addClass(link,'unwilling'); }
        if (consentResult.getConsent() === Consent.reluctant) { X.addClass(link,'reluctant'); }
        if (consentResult.getConsent() === Consent.willing)   { X.addClass(link,'willing'); }
        if (consentResult.getConsent() === Consent.eager)     { X.addClass(link,'eager'); }
      }

    });
  }

  function actionClicked(event) {
    console.log("Click:",event.target);
  }

  return Object.freeze({
    init,
    build,
    update,
  });

})();