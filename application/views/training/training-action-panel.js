global.TrainingActionPanel = (function() {

  function init() {
    X.onClick('#trainingView .sex-action a', actionClicked);
  }

  function build() {
    TrainingController.getPossibleActions().forEach(code => {
      const action = SexAction.lookup(code);
      const actionList = X.first('#actionList');

      actionList.appendChild(X.createElement(
        `<li class="sex-action"><a id="sexAction_${code}" href="#"
            data-code="${action.getCode()}"
            data-main-category="${action.getMainCategory()}"
            data-partner-category="${action.getPartnerCategory()}"
            data-player-category="${action.getPlayerCategory()}"
            class="">${action.getName()}</a></li>`));
    });

    ScrollingPanel({ id:'#actionListScroll' });
  }

  function update() {
    const context = TrainingController.getContext();
    const consentResult = ConsentResult(context.T, context.P);

    X.each('#actionList .sex-action a', link => {
      const code = link.dataset.code;
      const sexAction = SexAction.lookup(code);

      consentResult.setSexAction(code);
      consentResult.applyFactors();
      createTooltip(link, context, consentResult);

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

  function createTooltip(link, context, consentResult) {
    link.setAttribute('class','tooltip-parent');

    const sexAction = SexAction.lookup(link.dataset.code);

    console.log(`TT:[${consentResult.getConsentValue()}]`,consentResult.getResponse());

    Tooltip.register(link.getAttribute('id'),{
      content: `<div style='width:400px'>${sexAction.getDescription(context)}</div>`,
      position: 'bottom',
      delay: 100,
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