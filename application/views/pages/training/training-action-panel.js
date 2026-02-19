global.TrainingActionPanel = (function() {

  function init() {
    X.onClick('#trainingView .sex-action a', actionClicked);
  }

  function build() {
    TrainingController.getPossibleActions().forEach(code => {
      const action = SexAction.lookup(code);
      const actionList = X.first('#actionList');

      actionList.appendChild(X.createElement(
        `<li class="sex-action"><a
            data-code="${action.getCode()}"
            data-main-category="${action.getMainCategory()}"
            data-partner-category="${action.getPartnerCategory()}"
            data-player-category="${action.getPlayerCategory()}"
            href="#">${action.getName()}</a></li>`));
    });

    ScrollingPanel({ id:'#actionListScroll' });
  }

  function update() {
    console.log("Update Action Panel")
    TrainingController.getPossibleActions().forEach(code => {
      const sexAction = SexAction.lookup(code);
      console.log("Update Action:",code);
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