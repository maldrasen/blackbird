
// TODO: Still needed for specs for now.

Encounter.register('kobold-trappers',{
  description: `a small group of spear wielding kobolds.`,
  formation:[
    [0,1,1,1,0],
    [0,0,1,0,0],
  ],
  monsters:{
    1: { code:'kobold-trapper' },
  }
});

Encounter.register('kobold-1',{
  description: `a small group of weak looking kobolds`,
  formation:[
    [0,1,1,1,0],
  ],
  monsters:{
    1: { code:'kobold-runt' },
  }
});

Encounter.register('kobold-2',{
  description: `a group of vicious kobolds`,
  formation:[
    [2,2,1,2,2],
    [0,3,0,3,0],
  ],
  monsters:{
    1:{ code:'kobold-dick-puncher' },
    2:{ code:'kobold-runt' },
    3:{ code:'kobold-tosser' },
  }
});

Encounter.register('kobold-3',{
  description: `a group of angry kobolds`,
  formation:[
    [2,2,1,2,2],
    [0,3,3,3,0],
  ],
  monsters:{
    1:{ code:'kobold-dick-puncher' },
    2:{ code:'kobold-runt' },
    3:{ code:'kobold-sneak-slut' },
  }
});

Encounter.register('kobold-4',{
  description: `a group of shifty looking kobolds`,
  formation:[
    [0,1,1,1,0],
    [0,3,2,3,0],
  ],
  monsters:{
    1:{ code:'kobold-trapper' },
    2:{ code:'kobold-tosser' },
    3:{ code:'kobold-sneak-slut' },
  }
});

Encounter.register('kobold-5',{
  description: `a group of shifty looking kobolds`,
  formation:[
    [0,1,1,1,0],
    [0,2,2,2,0],
  ],
  monsters:{
    1:{ code:'kobold-trapper' },
    2:{ code:'kobold-sneak-slut' },
  }
});

