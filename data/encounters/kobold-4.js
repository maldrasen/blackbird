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
