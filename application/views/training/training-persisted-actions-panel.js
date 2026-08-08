global.TrainingPersistedActionsPanel = (function() {

  function init() {
    X.onClick('#persistedActions .stop-action', stopAction);
  }

  function update() {
    X.empty('#persistedActions');

    const list = X.first('#persistedActions');
    const actions = TrainingSystem.getState().getPersistedActions();
    const playerActions = [];
    const partnerActions = [];

    actions.forEach(persistedAction => {
      const acting = persistedAction.getSexAction().getActingCharacter();
      acting === 'player' ? playerActions.push(persistedAction) : partnerActions.push(persistedAction);
    });

    if (playerActions.length > 0) {
      list.appendChild(buildListHeader('Player Actions'));
      playerActions.forEach(persistedAction => {
        list.appendChild(buildPersistedActionItem(persistedAction));
      });
    }
    if (partnerActions.length > 0) {
      list.appendChild(buildListHeader('Partner Actions'));
      partnerActions.forEach(persistedAction => {
        list.appendChild(buildPersistedActionItem(persistedAction));
      });
    }
  }

  function buildListHeader(title) {
    return X.createElement(`<li class='list-header'>${title}</li>>`);
  }

  function buildPersistedActionItem(persistedAction) {
    return X.createElement(`<li class='persisted-action-item' data-code='${persistedAction.getCode()}'>
      <div class='name'>${persistedAction.getName()}</div>
      <div class='uses'>${JSON.stringify(persistedAction.getSexAction().getUses())}</div>
      <div class='spacer'></div>
      <div><a href='#' class='stop-action button button-danger button-small'>Stop</a></div>
    </li>`);
  }

  // After stoping a persisted action we update the action panel to add the action back to the list of available
  // actions. It seems a little silly to do that as they just stopped the action, but that should be the expected
  // behavior. We need to do a full update because we need to check to see if the action is still available (it super
  // should be) and recalculate its consent value for the tooltip and consent style.
  function stopAction(event) {
    const code = event.target.closest('.persisted-action-item').getAttribute('data-code');
    TrainingSystem.removePersistedAction(code);
    TrainingActionPanel.update();
  }

  return Object.freeze({
    init,
    update,
  });

})();
