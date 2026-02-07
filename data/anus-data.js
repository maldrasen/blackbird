global.AnusData = {

  PenetrationThresholds: {
    unnoticeable: {           max:0   }, // < (minWidth)
    unsatisfying: {  min:0,   max:20  },
    comfortable:  {  min:20,  max:40  },
    satisfying:   {  min:40,  max:60  },
    challenging:  {  min:60,  max:80  },
    stretching:   {  min:80,  max:90  },
    painful:      {  min:90,  max:96  },
    agonizing:    {  min:96,  max:100 },
    destructive:  {  min:100,         }, // > (maxWidth)
  },

  AnusShapes:['normal','puffy','wrinkled','horse'],

};

