global.TrainingView = (function() {

  let persistedScrollingPanel;

  function init() {
    X.onClick('#endTrainingButton', showEndConfirm);

    window.addEventListener('resize', calculatePersistedHeight);

    TrainingCategoryToggles.init();
    TrainingActionPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/training.html");
    MainContent.setBackground(`backgrounds/training.jpg`);

    TrainingCategoryToggles.build();
    TrainingActionPanel.build();
    TrainingStatusPanel.build();
    TrainingScalesPanel.build();

    TrainingActionPanel.update();

    persistedScrollingPanel = ScrollingPanel({ id:'#persistedActionScroll' });
    ScrollingPanel({ id:'#actionListScroll' });

    calculatePersistedHeight()

    GameStateFrame.show();
  }

  function update() {
    MainContent.unhalt();

    TrainingScalesPanel.update();

    calculatePersistedHeight();
  }

  // Can't seem to make this layout work by just fucking around with the flex
  // box stuff, so I guess I'll just brute force the height of the final
  // element to force it to fill the proper space. We'll need to call this
  // every round because the heights of many of the other panels will change.
  function calculatePersistedHeight() {
    if (persistedScrollingPanel) {
      const status = X.getPosition(X.first('#statusRow')).height;
      const scales = X.getPosition(X.first('#scalesRow')).height;
      const action = X.getPosition(X.first('#actionRow')).height;
      const heights = status + scales + action + 25

      persistedScrollingPanel.setHeight(window.innerHeight - heights);
      persistedScrollingPanel.resize();
    }
  }

  function showEndConfirm() {
    Confirmation.show({ text:`End Training?`, onConfirm:TrainingController.endTraining });
  }

  return Object.freeze({
    init,
    show,
    update,
  });

})();
