Record.define('FeatureType', {
  getInstance: featureType => ({
    getVariety: () => { return featureType.variety || 'plain' },
    buildFeature: options => { return featureType.build(options) },
  }),
});
