global.TrainingView = (function() {

  let $mainCategories;
  let $partnerCategories;
  let $playerCategories;

  function init() {
    X.onClick('#trainingView #showPlayerToggles', showPlayerToggles);
    X.onClick('#trainingView #showPartnerToggles', showPartnerToggles);
  }

  function show() {
    MainContent.setMainContent("views/training.html");
    MainContent.setBackground(Location.lookup(GameState.getCurrentLocation()).getBackground());

    buildCategoryPanels();
    buildActionsPanel();
    buildStatusPanel();
  }

  function buildStatusPanel() {

  }

  function buildCategoryPanels() {
    $mainCategories = new Set();
    $partnerCategories = new Set();
    $playerCategories = new Set();

    const player = TrainingController.getPlayer();
    const partner = TrainingController.getPartner();
    const playerActor = ActorComponent.lookup(player);
    const partnerActor = ActorComponent.lookup(partner);

    X.fill('#showPlayerToggles', EnglishHelper.possessive(playerActor.name));
    X.fill('#showPartnerToggles', EnglishHelper.possessive(partnerActor.name));

    TrainingController.getPossibleActions().forEach(code => {
      const action = SexAction.lookup(code);
      $mainCategories.add(action.getMainCategory());
      $partnerCategories.add(action.getPartnerCategory());
      $playerCategories.add(action.getPlayerCategory());
    });

    $mainCategories = [...$mainCategories].sort();
    $partnerCategories = [...$partnerCategories].sort();
    $playerCategories = [...$playerCategories].sort();

    // Let's try not filtering by the none category. This might make these
    // actions difficult to find though as they'll  never appear under any of
    // the part filters.
    ArrayHelper.remove($partnerCategories,SexAction.PartCategory.none);
    ArrayHelper.remove($playerCategories,SexAction.PartCategory.none);

    const mainToggles = X.first('#mainToggles');
    const partnerToggles = X.first('#partnerToggles');
    const playerToggles = X.first('#playerToggles');

    $mainCategories.forEach(name => {
      mainToggles.appendChild(X.createElement(
        `<li><a data-type="main" data-name="${name}" href="#" class='off'>${name}</a></li>`));
    });

    $partnerCategories.forEach(name => {
      partnerToggles.appendChild(X.createElement(
        `<li><a data-type="partner" data-name="${name}" href="#" class='off'>${name}</a></li>`));
    });

    $playerCategories.forEach(name => {
      playerToggles.appendChild(X.createElement(
        `<li><a data-type="player" data-name="${name}" href="#" class='off'>${name}</a></li>`));
    });
  }

  // Each round will need to determine which actions should be enabled. Potentially, this game with have a hundred or
  // more actions and eventually the action list will need to be placed in a scrolling panel.
  function buildActionsPanel() {

    TrainingController.getPossibleActions().forEach(code => {
      const action = SexAction.lookup(code);
      const actionList = X.first('#actionList');

      actionList.appendChild(X.createElement(
        `<li><a class="button disabled"
            data-code="${action.getCode()}"
            data-main-category="${action.getMainCategory()}"
            data-partner-category="${action.getPartnerCategory()}"
            data-player-category="${action.getPlayerCategory()}"
            href="#">${action.getName()}</a></li>`));
    });
  }

  // Should first disable any active filters...
  function showPlayerToggles() {
    X.removeClass('#showPartnerToggles','hide');
    X.removeClass('#partnerToggles','hide');
    X.addClass('#showPlayerToggles','hide');
    X.addClass('#playerToggles','hide');
  }

  function showPartnerToggles() {
    X.removeClass('#showPlayerToggles','hide');
    X.removeClass('#playerToggles','hide');
    X.addClass('#showPartnerToggles','hide');
    X.addClass('#partnerToggles','hide');
  }

  return Object.freeze({
    init,
    show,
  });

})();




// Name (Status Effects) (Relevant Stats)
// [Stamina Bar] (2000/2000)
// [Health Bar] (100/100)
// -- PALAM ----- -------------- -------------- --------------
// C Ples         V Ples         A Ples         B Ples        // Include pleasure ramps?
// M Ples         Loyal          Desire         Submission
// V Wet          A Wet          Shame          Learn         // These attributes are limited to the current scene and start at 0.
// Pain           Fear           Hostile        Depression    // Which make sense to carry over. The whole convert to gems step is still mysterious.
// Milk [7000/10000]
// Sex[   ](0/2) Semen[XX  ](4/9) womb[X   ](3646p)       // Satasfaction Row [number of orgasms] []
// In Use: [Clit Cap], [Nipple Cap]

// My attributes:
// [Control] slow changing, but training is used to increase it, so probably good to have.
// [Affection/Fear/Respect] - Top level attributes to replace favor and service?
// [Arousal/Pleasure] important to track. Can be on top rather than tracked on each part.

// Pleasure bars would work better as a column of body parts.
// Second column for training values, (loyal/obedience)/desire/submission/(shame/exposure)/(hostile/anger)/(depression/trauma)

// Obedience / Desire / Submission (Built with light actions, kissing, carressing. More difficult actions possible as Obedience level increases.)
//   desire => Lust Mark
//
// Shame / Anger / Suffering
//   shame =>
//   anger => Hate Mark (Hate marks raise all training thresholds. Results in orb/gem loss.)
//   suffering(depression) = Pain Mark


// The 'PALAM' bars overflow from the raw 'SOURCE' values generated by the actions.
// The amount that overflows from the bars are what gets converted into JUEL (the gems)
// Gems are spent on abilities.

// Controller will need to maintain a training state, these training values are converted into the 'gems'
