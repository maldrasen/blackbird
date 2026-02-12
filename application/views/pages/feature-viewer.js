global.FeatureViewer = (function(){

  // The FeatureViewer can only be rendered once, and only in the fixtures, so registering events here is fine.
  function show() {
    MainContent.setMainContent("views/feature-viewer.html");

    X.onClick('#featureViewer .generate-feature', generateFeature);
  }

  function generateFeature(event) {
    const featureType = event.target.dataset.feature;

    clear()
    if (featureType === 'random') {
      return buildRandomFeature();
    }
  }

  function clear() {
    X.empty('#viewOverlay');
    X.fill('#viewOverlay', X.copyElement('#templates .feature'));
  }

  function buildRandomFeature() {
    const floor = FloorFactory.build(Random.between(1,10));
    const theme = DungeonTheme.lookup(floor.getTheme());
    X.fill('#viewOverlay .level',floor.getLevel());
    X.fill('#viewOverlay .theme',theme.getName());
  }

  return Object.freeze({
    show
  });

})();
