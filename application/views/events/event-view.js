global.EventView = (function() {

  let $event;
  let $returnState;

  function init() {
    X.onCodeDown(KeyCodes.Space, isVisible, advance);
    X.onClick('#eventView .next-button', nextPage);
    X.onClick('#eventView .continue-button', nextStage);
    X.loadDocument('#eventArea','/views/event-view.html');
  }

  function show(event) {
    $event = event;
    $event.onBefore();
    $event.compile();

    // We should render the event here, going through the pages and performing
    // any necessary text replacement.

    $returnState = { };

    log("Show",{ system:"EventView", data:{ code:$event.getCode() }});

    setLayout();
    showStage();
  }

  function isVisible() {
    return !X.hasClass('#eventView','hide');
  }

  function advance() {
    if (X.hasClass('#eventView .next-button','hide') === false) { nextPage(); }
    if (X.hasClass('#eventView .continue-button','hide') === false) { nextStage(); }
  }

  function completeEvent() {
    X.addClass('#eventView','hide');
    X.addClass('#eventView .continue-button','hide');
    X.removeClass('#eventView .continue-button','show');

    X.empty('#eventView #textArea');
    X.removeAttribute('#eventView #layoutContainer','class');
    X.removeAttribute('#eventView #layoutContainer','class');
    X.removeAttribute('#eventView #imageArea','style');

    $event.onFinish($returnState);
    $event = null;
  }

  function setLayout() {
    X.addClass('#layoutContainer',$event.getLayout());

    if ($event.getImage()) {
      X.removeClass('#eventView #imageArea','hide');
      X.first('#eventView #imageArea').style['background-image'] = X.assetURL($event.getImage());
    }

    X.removeClass('#eventView','hide');
  }

  function showStage() {
    let stage = $event.getCurrentStage();
    if (stage.pages) { return showPage(); }

    throw `Unrecognized Stage Type`;
  }

  function showPage() {
    let page = $event.getCurrentPage();

    if (shouldShowContinue()) { enableContinueButton(); }
    if (shouldShowNext()) { enableNextButton(); }

    let container = X.first('#eventView #textArea');
    X.empty(container);

    container.appendChild(X.createElement(`<div class='event-text'>${page.text}</div>`));
  }

  // // We should show the continue button when we are on the last page of the
  // // stage when we are on the last stage or when the next stage doesn't have
  // // pages.
  function shouldShowContinue() {
    if ($event.getPageIndex() === $event.getCurrentStage().pages.length - 1) {
      let nextStage = $event.getNextStage();
      return nextStage == null || nextStage.pages == null;
    }
    return false;
  }

  // // We should enable the click advance when we are not at the last page of the
  // // stage or when the next stage has pages.
  function shouldShowNext() {
    if ($event.getPageIndex() < $event.getCurrentStage().pages.length - 1) { return true; }
    if ($event.getNextStage() && $event.getNextStage().pages != null) { return true; }
    return false;
  }

  function enableNextButton() {
    if (X.hasClass('#eventView .next-button','hide')) {
      X.addClass('#eventView .button','hide');
      X.removeClass('#eventView .next-button','hide');
    }
  }

  // Adding the 'show' class to the continue button needs to be done in a short
  // timeout so that the transition works.
  function enableContinueButton() {
    if (X.hasClass('#eventView .continue-button','hide')) {
      X.addClass('#eventView .button','hide');
      X.removeClass('#eventView .continue-button','hide');
    }
  }

  function nextStage() {
    $event.advancePage() ? showStage() : completeEvent();
  }

  function nextPage() {
    if ($event.advancePage()) { return showPage(); }
    throw `Event is complete, but this should have been called by the complete button I think?`
  }

  return {
    init,
    show,
    isVisible,
  }

})();
