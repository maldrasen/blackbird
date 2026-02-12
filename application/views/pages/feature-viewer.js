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

    console.log("generate feature:",featureType);
  }

  function clear() {

  }

  function buildRandomFeature() {
    const level = Random.between(1,10);
    const floor = FloorFactory.build({ level });
    console.log(floor)
  }

  return Object.freeze({
    show
  });

})();
