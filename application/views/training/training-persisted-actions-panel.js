global.TrainingPersistedActionsPanel = (function() {

  let persistedScrollingPanel;

  function init() {
    window.addEventListener('resize', calculatePersistedHeight);
    X.onClick('#persistedActions .stop-action', stopAction);
  }

  function build() {
    persistedScrollingPanel = ScrollingPanel({ id:'#persistedActionScroll' });
    calculatePersistedHeight();

  }

  function update() {
    X.empty('#persistedActions');

    const list = X.first('#persistedActions');
    const actions = TrainingController.getState().getPersistedActions();
    const playerActions = [];
    const partnerActions = [];

    actions.forEach(persistedAction => {
      const acting = persistedAction.getAction().getActingCharacter();
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

    calculatePersistedHeight();
  }

  function buildListHeader(title) {
    return X.createElement(`<li class='list-header'>${title}</li>>`);
  }

  function buildPersistedActionItem(persistedAction) {
    return X.createElement(`<li class='persisted-action-item' data-code='${persistedAction.getCode()}'>
      <div class='name'>${persistedAction.getName()}</div>
      <div class='uses'>${JSON.stringify(persistedAction.getAction().getUses())}</div>
      <div class='spacer'></div>
      <div><a href='#' class='stop-action button button-danger button-small'>Stop</a></div>
    </li>`);
  }

  function stopAction(event) {
    const code = event.target.closest('.persisted-action-item').getAttribute('data-code');
    TrainingController.removePersistedAction(code);
  }

  // Can't seem to make this layout work by just fucking around with the flex
  // box stuff, so I guess I'll just brute force the height of the final
  // element to force it to fill the proper space. We'll need to call this
  // every round because the heights of many of the other panels will change.
  function calculatePersistedHeight() {
    const statusRow = X.first('#statusRow');
    const scalesRow = X.first('#scalesRow');
    const actionRow = X.first('#actionRow');

    if (persistedScrollingPanel) {
      const status = X.getPosition(statusRow).height;
      const scales = X.getPosition(scalesRow).height;
      const action = X.getPosition(actionRow).height;
      const heights = status + scales + action + 25

      persistedScrollingPanel.setHeight(window.innerHeight - heights);
      persistedScrollingPanel.resize();
    }
  }

  return Object.freeze({
    init,
    build,
    update,
  });

})();
