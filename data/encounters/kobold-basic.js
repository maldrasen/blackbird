
Encounter.register('kobold-sneak-sluts',{
  description: `some naked, knife wielding, kobold sluts.`,
  formation:[
    [2,1,1,1,2],
  ],
  monsters:{
    1: { code:'kobold-sneak-slut' },
    2: { code:'kobold-sneak-slut', chance:33, }
  }
});

Encounter.register('kobold-trappers',{
  description: `a small group of spear wielding kobolds.`,
  formation:[
    [0,0,1,0,0],
    [0,1,1,1,0],
  ],
  monsters:{
    1: { code:'kobold-trapper' },
  }
});

Encounter.register('kobold-1',{
  description: `a small group of weak looking kobolds`,
  formation:[
    [2,1,1,1,2],
  ],
  monsters:{
    1: { code:'kobold-runt' },
    2: { code:'kobold-runt', chance:33, }
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
    3:{ code:'kobold-tosser', chance:66 },
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
    2:{ codeMap:{ 'kobold-sneak-slut':10, 'kobold-tosser':20 } },
    3:{ codeMap:{ 'kobold-sneak-slut':10, 'kobold-tosser':20 }, chance:50 },
  }
});

