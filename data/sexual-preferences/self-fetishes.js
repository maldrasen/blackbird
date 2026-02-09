
SexualPreference.register('breath-player',{
  name: 'Breath Player',
  description: 'A love of being choked or having their breathing restricted.',
});

SexualPreference.register('breeder',{
  name: 'Breeder',
  description: 'A love of pregnancy and birthing.',
});

SexualPreference.register('cum-dump',{
  name: 'Cum Dump',
  description: 'A love of drinking cum, being covered in cum, or having cum inside of them.',
  defaultValue: -10,
});

SexualPreference.register('enemas',{
  name: 'Enema Lover',
  description: 'A love of having their colon filled with fluids.',
  defaultValue: -20,
});

SexualPreference.register('exhibitionist',{
  name: 'Exhibitionist',
  description: 'A love of having others watch.',
  defaultValue: -10,
});

SexualPreference.register('gape-queen',{
  name: 'Gape Queen',
  description: 'A love of their holes permanently stretched open.',
  defaultValue: -30,
});

// Most characters will be very reluctant to perform sex acts with family. I'm assuming we're eventually going to keep
// track of family relationships. If a pair of siblings were captured we would need to know that they're siblings.
SexualPreference.register('incest-lover',{
  name: 'Incest Lover',
  description: "A sexual desire for members of one's own family.",
  defaultValue: -40,
});

SexualPreference.register('masterbator',{
  name: 'Masterbator',
  description: 'An love of self pleasure',
  defaultValue: { male:20, female:10, futa:30, enby:10 },
});

SexualPreference.register('orgy-lover',{
  name: 'Orgy Lover',
  description: 'An love of group sex.',
});

// This defaults to -20 in order to give a global distaste for perverted actions.
SexualPreference.register('perverted',{
  name: 'Perverted',
  description: 'A desire for unusual sex acts.',
  defaultValue: -20,
});

SexualPreference.register('piss-slut',{
  name: 'Piss Slut',
  description: 'A love of drinking piss and being pissed on.',
  defaultValue: -20,
});

SexualPreference.register('prolapse-queen',{
  name: 'Prolapse Queen',
  description: 'A love of having their asses or pussies pulled out of their gaping holes.',
  defaultValue: -50,
});

SexualPreference.register('punching-bag',{
  name: 'Punching Bag',
  description: 'A love of impact play and being slapped, punched and beaten.',
  defaultValue: -30,
});

SexualPreference.register('rope-bunny',{
  name: 'Rope Bunny',
  description: 'A love of bondage and being bound or restrained.',
  defaultValue: -10,
});

SexualPreference.register('sex-toy-lover',{
  name: 'Sex Toy Lover',
  description: 'A love of equipment like dildos, vibrators, anal plugs, and other such toys.',
});

SexualPreference.register('size-queen',{
  name: 'Size Queen',
  description: 'A love of being stretched open by huge insertions.',
  defaultValue: -10,
});
