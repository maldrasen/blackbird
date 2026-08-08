global.NegotiationReaction = (function() {

  const reactionMap = {
    neutral:      { control: 10                                          },
    respect:      { control: 20,                  respect: 30            },
    greatRespect: { control: 50,                  respect: 50,           },
    disrespect:   { control:-20,                  respect:-30,  fear:-20 },
    like:         { control: 20,  affection: 30,  respect: 10,  fear:-10 },
    lust:         { control: 30,  affection: 40,                         },
    love:         { control: 40,  affection: 50,  respect: 20,  fear:-10 },
    dislike:      { control:-20,  affection:-20,                         },
    hate:         { control:-50,  affection:-50,  respect:-50            },
    frighten:     { control: 20,  affection:-10,                fear:30  },
    terrify:      { control: 30,  affection:-20,                fear:50  },
    pity:         { control:-20,                  respect:-20,  fear:-40 },
    contempt:     { control:-50,                  respect:-40,  fear:-60 },
  }

  const resolutionMap = {
    join:    reactionMap.love,
    attack:  { affection:-40, respect:-20, fear:-30 },
    ability: { affection:-40, respect:-20, fear:-30 },
    run:     { affection:-20, fear:30 },
  };

  function buildResolution(type, message, options) {
    const feelings = (options.feelings == null) ? resolutionMap[type] : options.feelings
    return Resolution(type, message, feelings, options);
  }

  const methods = {
    getFeelings: code => { return reactionMap[code] },
    attack:   (message, options={}) =>  buildResolution('attack', message, options),
    run:      (message, options={}) =>  buildResolution('run', message, options),
    ability:  (message, options) =>     buildResolution('ability', message, options),
    join:     (message, options={}) =>  buildResolution('join', message, options),
    followUp: (message, options) =>     buildResolution('followUp', message, options),
  };

  Object.keys(reactionMap).forEach(key => {
    methods[key] = (message, options={}) => Resolution('feelings', message, reactionMap[key], options);
  });

  return Object.freeze(methods);

})();
