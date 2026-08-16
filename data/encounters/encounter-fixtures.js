
// Encounter fixtures. These shouldn't go into any of the encounter tables.

Encounter.register('negotiation-fixture-1',{
  description: `someone to talk to`,
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-runt' }}
});

Encounter.register('negotiation-fixture-2',{
  description: `someone to talk to`,
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-sneak-slut' }}
});

Encounter.register('negotiation-fixture-3',{
  description: `someone to talk to`,
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-dick-puncher' }}
});

Encounter.register('negotiation-fixture-4',{
  description: `someone to talk to`,
  formation:[[0,0,1,0,0]],
  monsters: { 1: { code:'kobold-tosser' }}
});

Encounter.register('test',{
  description: `test`,
  formation:[[3,2,1,2,3]],
  monsters: {
    1: { code:'lesser-daggermaw' },
    2: { code:'slithering-yeek' },
    3: { code:'revolting-cockroach' },
  }
});
