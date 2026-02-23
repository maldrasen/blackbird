global.TrainingView = (function() {

  let outputScrollingPanel;

  function init() {

    window.addEventListener('resize', calculateOutputHeight);

    TrainingCategoryToggles.init();
    TrainingActionPanel.init();
  }

  function show() {
    MainContent.setMainContent("views/training.html");
    MainContent.setBackground(`backgrounds/training.png`);

    TrainingCategoryToggles.build();
    TrainingActionPanel.build();
    TrainingStatusPanel.build();
    TrainingScalesPanel.build();

    TrainingActionPanel.update();

    ScrollingPanel({ id:'#persistedActionScroll' });
    ScrollingPanel({ id:'#actionListScroll' });
    outputScrollingPanel = ScrollingPanel({ id:'#outputTextScroll' });

    calculateOutputHeight()

    GameStateFrame.show();
  }

  // Can't seem to make this layout work by just fucking around with the flex
  // box stuff, so I guess I'll just brute force the height of the final
  // element to force it to fill the proper space. We'll need to call this
  // every round because the heights of many of the other panels will change.
  function calculateOutputHeight() {
    const outputText = X.first('#outputTextScroll')
    const outputPosition = X.getPosition(outputText);

    outputScrollingPanel.setHeight(window.innerHeight - outputPosition.top - 12);
    outputScrollingPanel.resize();
  }

  return Object.freeze({
    init,
    show,
  });

})();
