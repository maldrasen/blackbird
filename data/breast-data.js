global.BreastData = {

  // With average volume in ml, for average human height. Volume will scale cubically with height, so very tall girls
  // will have much larger breasts than short girls, even when their breasts fall within the same size category.
  BreastSizes: [
    'zero',
    'tiny',    // 200 - 400
    'small',   // 400 - 700
    'average', // 700 - 1200
    'big',     // 1200 - 2000
    'huge',    // 2000 - 5000
    'monster'  // 5000+
  ],

  // Density [.9 / 1.0 / 1.1] for weight calculation. 1 ml of tit flesh will weigh between 0.9 and 1.1 mg
  BreastFirmness: {
    'soft':   0.9,
    'medium': 1,
    'firm':   1.1,
  },

  BreastShapeTable: {
    'tiny':    { soft:['flat','pancakes'],  medium:['tiddys'],             firm:['pert','golfballs']},
    'small':   { soft:['teardrops'],        medium:['conical'],            firm:['small-round','tubular']},
    'average': { soft:['swingers'],         medium:['average'],            firm:['perky','torpedos']},
    'big':     { soft:['dangling'],         medium:['heavy-bells'],        firm:['bigRound']},
    'huge':    { soft:['pendulous'],        medium:['hangers','cowTits'],  firm:['bimbo']},
    'monster': { soft:['elongated-sacks'],  medium:['massive-bells'],      firm:['straining-round']},
  },

  NippleShapes: ['normal','puffy','inverted','teat','mouth','cock','pussy'],
}
