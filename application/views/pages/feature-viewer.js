global.FeatureViewer = (function(){

  // The FeatureViewer can only be rendered once, and only in the fixtures, so registering events here is fine.
  function show() {
    MainContent.setMainContent("views/feature-viewer.html");

    X.onClick('#featureViewer .generate-feature', generateFeature);
  }

  function generateFeature(event) {
    const featureType = event.target.dataset.feature;
    console.log("generate feature:",featureType)
  }

  return Object.freeze({
    show
  });

})();
