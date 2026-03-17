global.TrainingActionPanel = (function() {

  function init() {
    X.onClick('#trainingView .sex-action a', actionClicked);
  }

  function build() {
    ScrollingPanel({ id:'#actionListScroll' });

    TrainingController.getState().getPossibleActions().forEach(code => {
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
  }

  function update() {
    const context = TrainingController.getState().getContext();
    const consentResult = ConsentResult(context.T, context.P);

    X.each('#actionList .sex-action a', link => {
      const item = link.closest('li');
      const code = link.dataset.code;
      const sexAction = SexAction.lookup(code);

      item.setAttribute('class','sex-action');
      link.setAttribute('class','');

      consentResult.setSexAction(code);
      consentResult.applyFactors();

      const actionContext = { consent:consentResult.getConsent(), ...context };

      sexAction.isAvailable(actionContext) ?
        createTooltip(link, context, consentResult) :
        X.addClass(item, 'unavailable');

      // Calling this not-enabled because disabled already has hooks.
      if (sexAction.isEnabled(actionContext) === false) {
        X.addClass(link, 'not-enabled'); }

      // The consent classname is important for filtering, even if an action is
      // unavailable. This also needs to be set after the tooltip is created
      // because of a bug I'm too lazy to fix right now.
      X.addClass(link, consentResult.getConsentClassname());
    });

    TrainingCategoryToggles.applyToggleFilters();
  }

  function actionClicked(event) {
    if (X.hasClass(event.target,'not-enabled') === false) {
      MainContent.halt();
      StateMachine.handleCommand(CommandType.trainingSexAction,{ code:event.target.dataset.code });
    }
  }

  // === Big Messy Tooltip ===

  function createTooltip(link, context, consentResult) {
    link.setAttribute('class','tooltip-parent');

    const sexAction = SexAction.lookup(link.dataset.code);

    let content = `<div class='sex-action-tooltip'>`
    content += `<p class='description'>${sexAction.getDescription(context)}</p>`
    content += `<div class='calculation ${consentResult.getConsentClassname()}'>`
    content += `<div class='target'>Consent Target[${sexAction.getConsentTarget()}]</div>`
    content += buildMathSegment(consentResult);
    content += buildResultSegment(consentResult);
    content += `</div></div>`;

    Tooltip.register(link.getAttribute('id'),{
      content: content,
      position: 'bottom',
      delay: 100,
    });
  }

  function buildMathSegment(consentResult) {
    const additive = consentResult.getResponse().additive;
    const multiplicative = consentResult.getResponse().multiplicative;

    let content = `<div class='math'>(`
    for (let i=0; i<additive.length; i++) {
      const response = additive[i];
      content += `${response.label}[${StringHelper.formatNumber(response.value)}]`;
      if (i < additive.length-1) { content += ` + ` }
    }
    content += `)`

    for (let i=0; i<multiplicative.length; i++) {
      const response = multiplicative[i];
      content += ` × ${response.label}[${StringHelper.formatNumber(response.value)}]`;
    }

    return content + `</div>`;
  }

  function buildResultSegment(consentResult) {
    return `<div class='break'></div>
      <div class='result'>
        ${StringHelper.formatNumber(consentResult.getConsentValue())}
        (${consentResult.getConsentLabel()})
      </div>`;
  }

  return Object.freeze({
    init,
    build,
    update,
  });

})();