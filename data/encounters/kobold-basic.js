
Encounter.register('kobold-1',{
  formation:[
    [0,2,1,1,1,2,0],
  ],
  monsters:{
    1: { code:'kobold-runt' },
    2: { code:'kobold-runt', chance:33, }
  }
});

Encounter.register('kobold-2',{
  formation:[
    [2,2,1,1,1,2,2],
    [0,0,0,3,0,0,0],
  ],
  monsters:{
    1:{ code:'kobold-dick-puncher' },
    2:{ code:'kobold-runt' },
    3:{ code:'kobold-tosser', chance:66 },
  }
});

Encounter.register('kobold-3',{
  formation:[
    [0,2,2,1,2,2,0],
    [0,0,3,3,3,0,0],
  ],
  monsters:{
    1:{ code:'kobold-dick-puncher' },
    2:{ code:'kobold-runt' },
    3:{ code:'kobold-sneak-slut' },
  }
});

Encounter.register('kobold-4',{
  formation:[
    [0,0,1,1,1,0,0],
    [0,0,3,2,3,0,0],
  ],
  monsters:{
    1:{ code:'kobold-trapper' },
    2:{ codeMap:{ 'kobold-sneak-slut':10, 'kobold-tosser':20 } },
    3:{ codeMap:{ 'kobold-sneak-slut':10, 'kobold-tosser':20 }, chance:50 },
  }
});

