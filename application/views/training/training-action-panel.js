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

      X.addClass(link, sexAction.isAvailable(context) ?
        consentResult.getConsentClassname() :
        'unavailable');
    });
  }

  function createTooltip(link, context, consentResult) {
    link.setAttribute('class','tooltip-parent');

    const sexAction = SexAction.lookup(link.dataset.code);
    const additive = consentResult.getResponse().additive;
    const multiplicative = consentResult.getResponse().multiplicative;

    let content = `<div class='sex-action-tooltip'>`
    content += `<p class='description'>${sexAction.getDescription(context)}</p>`
    content += `<div class='calculation ${consentResult.getConsentClassname()}'>`
    content += `<div class='target'>Consent Target[${sexAction.getConsentTarget()}]</div>`

    content += `<div class='math'>(`
    for (let i=0; i<additive.length; i++) {
      const response = additive[i];
      content += `${response.label}[${StringHelper.formatNumber(response.value)}]`;
      if (i < additive.length-1) { content += ` + ` }
    }
    content += `)`
    if (multiplicative.length > 0) {
      content += ` * `
      for (let i=0; i<multiplicative.length; i++) {
        const response = multiplicative[i];
        content += `${response.label}[${StringHelper.formatNumber(response.value)}]`;
        if (i < multiplicative.length-1) { content += ` * ` }
      }
    }
    content += `</div>`

    content += `<div class='break'></div>`

    content += `<div class='result'>`
    content += `${StringHelper.formatNumber(consentResult.getConsentValue())} `
    content += `(${consentResult.getConsentLabel()})</div>`

    content += `</div>`;
    content += `</div>`;

    Tooltip.register(link.getAttribute('id'),{
      content: content,
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