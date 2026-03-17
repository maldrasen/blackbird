global.TrainingView = (function() {

  function init() {
    X.onClick('#endTrainingButton', showEndConfirm);

    TrainingCategoryToggles.init();
    TrainingActionPanel.init();
    TrainingPersistedActionsPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/training.html");
    MainContent.setBackground(`backgrounds/training.jpg`);

    TrainingCategoryToggles.build();
    TrainingActionPanel.build();
    TrainingStatusPanel.build();
    TrainingScalesPanel.build();
    TrainingPersistedActionsPanel.build();
    TrainingActionPanel.update();

    GameStateFrame.show();
  }

  function update() {
    console.log("=== Training View Update ===")
    MainContent.unhalt();

    TrainingStatusPanel.update();
    TrainingScalesPanel.update();
    TrainingActionPanel.update();
    TrainingPersistedActionsPanel.update();

    GameStateFrame.update();
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
