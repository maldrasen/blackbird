
// Encounter fixtures. These shouldn't go into any of the encounter tables.

Encounter.register('battle-fixture-1',{
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

Encounter.register('negotiation-fixture-1',{
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-runt' }}
});

Encounter.register('negotiation-fixture-2',{
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-sneak-slut' }}
});

Encounter.register('negotiation-fixture-3',{
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-dick-puncher' }}
});

Encounter.register('negotiation-fixture-4',{
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-tosser' }}
});

Encounter.register('test',{
  formation:[[3,2,1,2,3]],
  monsters: {
    1: { code:'lesser-daggermaw' },
    2: { code:'slithering-yeek' },
    3: { code:'revolting-cockroach' },
  }
});
