global.TrainingView = (function() {

  function init() {
    X.onClick('#endTrainingButton', showEndConfirm);

    TrainingCategoryToggles.init();
    TrainingActionPanel.init();
    TrainingPersistedActionsPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/templates/training.html");
    MainContent.setBackground(`backgrounds/training.jpg`);

    TrainingCategoryToggles.build();
    TrainingActionPanel.build();
    TrainingStatusPanel.build();
    TrainingScalesPanel.build();
    TrainingActionPanel.update();

    GameStateFrame.show();
  }

  function update() {
    MainContent.unhalt();

    TrainingStatusPanel.update();
    TrainingScalesPanel.update();
    TrainingActionPanel.update();
    TrainingPersistedActionsPanel.update();

    GameStateFrame.update();
  }

  function showEndConfirm() {
    Confirmation.show({ text:`End Training?`, onConfirm:TrainingSystem.endTraining });
  }

  return {
    init,
    show,
    update,
  };

})();
