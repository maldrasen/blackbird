global.TrainingCategoryToggles = (function() {

  function init() {
    X.onClick('#trainingView #showPlayerToggles', showPlayerToggles);
    X.onClick('#trainingView #showPartnerToggles', showPartnerToggles);
    X.onClick('#trainingView .toggles a', clickToggle);
  }

  function build() {
    let $mainCategories = new Set();
    let $partnerCategories = new Set();
    let $playerCategories = new Set();

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

    $mainCategories.forEach(code => {
      mainToggles.appendChild(X.createElement(
        `<li><a data-type="main" data-code="${code}" href="#"
          class='no-underline off'>${StringHelper.titlecaseAll(code)}</a></li>`));
    });

    $partnerCategories.forEach(code => {
      partnerToggles.appendChild(X.createElement(
        `<li><a data-type="partner" data-code="${code}" href="#"
          class='no-underline off'>${StringHelper.titlecaseAll(code)}</a></li>`));
    });

    $playerCategories.forEach(code => {
      playerToggles.appendChild(X.createElement(
        `<li><a data-type="player" data-code="${code}" href="#"
          class='no-underline off'>${StringHelper.titlecaseAll(code)}</a></li>`));
    });
  }

  function showPlayerToggles() {
    resetToggles();
    X.removeClass('#showPartnerToggles','hide');
    X.removeClass('#partnerToggles','hide');
    X.addClass('#showPlayerToggles','hide');
    X.addClass('#playerToggles','hide');
    adjustVisibleActions();
  }

  function showPartnerToggles() {
    resetToggles();
    X.removeClass('#showPlayerToggles','hide');
    X.removeClass('#playerToggles','hide');
    X.addClass('#showPartnerToggles','hide');
    X.addClass('#partnerToggles','hide');
    adjustVisibleActions();
  }

  function resetToggles() {
    ['#playerToggles','#partnerToggles'].forEach(id => {
      X.removeClass(id, 'active');
      X.removeClass(`${id} a`,'on');
      X.addClass(id,'inactive');
      X.addClass(`${id} a`,'off');
    });
  }

  function clickToggle(event) {
    const element = event.target;
    const toggles = element.closest('.toggles');

    if (X.hasClass(element,'off')) {
      X.removeClass(element,'off');
      X.addClass(element,'on');
    } else {
      X.addClass(element,'off');
      X.removeClass(element,'on');
    }

    adjustTogglesClass(toggles.getAttribute('id'));
    adjustVisibleActions();
  }

  function adjustTogglesClass(id) {
    const toggles = X.first(`#${id}`);
    const anyActive = X(`#${id} .on`).length > 0;

    if (anyActive && X.hasClass(toggles, 'inactive')) {
      X.addClass(toggles,'active');
      X.removeClass(toggles,'inactive');
    }
    if (anyActive === false && X.hasClass(toggles,'active')) {
      X.addClass(toggles,'inactive');
      X.removeClass(toggles,'active');
    }
  }

  function adjustVisibleActions() {
    const isPlayer = displayedToggles() === "playerToggles";
    const mainCategories = getActiveTogglesWithin('mainToggles');
    const partCategories = getActiveTogglesWithin(displayedToggles());

    X.each("#actionList a", actionLink => {
      let visible = true;

      const mainCat = actionLink.getAttribute('data-main-category');
      const partCat = actionLink.getAttribute(isPlayer ? 'data-player-category' : 'data-partner-category');
      const listItem = actionLink.closest('li');

      if (mainCategories.length > 0 && mainCategories.includes(mainCat) === false) { visible = false; }
      if (partCategories.length > 0 && partCategories.includes(partCat) === false) { visible = false; }

      visible ? X.removeClass(listItem,'hide') : X.addClass(listItem,'hide')
    });
  }

  function displayedToggles() {
    return X.hasClass('#playerToggles','hide') ? 'partnerToggles' : 'playerToggles';
  }

  function getActiveTogglesWithin(id) {
    const categories = [];

    if (X.hasClass(`#${id}`,'active')) {
      X.each(`#${id} a`, link => {
        if (X.hasClass(link,'on')) {
          categories.push(link.dataset.code);
        }
      });
    }

    return categories;
  }

  return Object.freeze({
    init,
    build,
  });

})();