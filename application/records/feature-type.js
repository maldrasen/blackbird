Record.define('FeatureType', {
  getInstance: featureType => ({
    buildFeature: options => { return featureType.build(options) },
  }),
});
