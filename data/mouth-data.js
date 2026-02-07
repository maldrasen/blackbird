global.MouthData = {

  // The mouth doesn't use all the same penetration levels. Mouth pleasure doesn't come from the mouth sensations, but
  // rather in doing the task itself. Pain and stretch still apply though, but the lower range can fall entirely within
  // the satisfying level.
  PenetrationThresholds: {
    satisfying:   {          max:50  },
    challenging:  { min:50,  max:78  },
    stretching:   { min:78,  max:92  },
    painful:      { min:92,  max:97  },
    agonizing:    { min:97,  max:100 },
    destructive:  { min:100,         },
  },

  TongueShapes: ['normal','dog','forked'],

};
