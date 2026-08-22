global.BreastData = {

  // With average volume in ml, for average human height. Volume will scale cubically with height, so very tall girls
  // will have much larger breasts than short girls, even when their breasts fall within the same size category.
  BreastSizes: {
    'zero':    { min:0,    max:200 },
    'tiny':    { min:200,  max:400 },
    'small':   { min:400,  max:700, },
    'average': { min:700,  max:1200 },
    'big':     { min:1200, max:2000 },
    'huge':    { min:2000, max:5000 },
    'monster': { min:5000, max:10000 },
  },

  // Density [.9 / 1.0 / 1.1] for weight calculation. 1 ml of tit flesh will weigh between 0.9 and 1.1 mg
  BreastFirmness: {
    'soft':   0.9,
    'medium': 1,
    'firm':   1.1,
  },

  BreastShapeTable: {
    'zero':    { soft:['flat'],             medium:['flat'],               firm:['tiny-balls']},
    'tiny':    { soft:['flat','pancakes'],  medium:['tiddys'],             firm:['pert','small-balls']},
    'small':   { soft:['teardrops'],        medium:['conical'],            firm:['balls','tubular']},
    'average': { soft:['swingers'],         medium:['average'],            firm:['perky','torpedoes']},
    'big':     { soft:['dangling'],         medium:['heavy-bells'],        firm:['big-round']},
    'huge':    { soft:['pendulous'],        medium:['hangers','cow-tits'], firm:['bimbo']},
    'monster': { soft:['elongated-sacks'],  medium:['massive-bells'],      firm:['straining-round']},
  },

  SaggyShapes: ['swingers','dangling','heavy-bells','pendulous','hangers','elongated-sacks','massive-bells'],

  // The BreastComparisons ladder to use for each shape. Shapes that are flat or the long narrow torpedo/tubular kind
  // have no common object to compare against and map to null; the comparison tokens error for them, so templates
  // that use those tokens need to be gated on the shape being comparable.
  ComparisonShapes: {
    'flat':             null,
    'pancakes':         null,
    'tiny-balls':       'round',
    'tiddys':           null,
    'pert':             'teardrop',
    'small-balls':      'round',
    'teardrops':        'teardrop',
    'conical':          'teardrop',
    'balls':            'round',
    'tubular':          null,
    'swingers':         'teardrop',
    'average':          'round',
    'perky':            'teardrop',
    'torpedoes':        null,
    'dangling':         'teardrop',
    'heavy-bells':      'teardrop',
    'big-round':        'round',
    'pendulous':        'teardrop',
    'hangers':          'teardrop',
    'cow-tits':         'round',
    'bimbo':            'round',
    'elongated-sacks':  null,
    'massive-bells':    'teardrop',
    'straining-round':  'round',
  },

  NippleShapes: {
    normal: 80,
    puffy: 15,
    inverted: 5,
    teat: 0,
    mouth: 0,
    cock: 0,
    pussy: 0,
  },

}
