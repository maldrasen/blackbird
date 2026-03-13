
// The preferences are also used to determine the character's preference for using these parts during sex. The
// strongest of these preferences is the character's 'weakness' and gets extra pleasure. Tempted to add aurel sex
// too, but difficult to train something that a person is unlikely to survive.

SexualPreference.register('anal-slut',{
  name: 'Anal Slut',
  description: 'A preference for sexual activities using their anus.',
  sensations: { increase:['anus','prostate'], factor:1.5 },
});

SexualPreference.register('breast-slut',{
  name: 'Breast Slut',
  description: 'A preference for sexual activities using their breasts.',
  sensations: { increase:['nipple'], factor:1.5 },
  requires: 'breasts',
});

SexualPreference.register('cervix-slut',{
  name: 'Cervix Slut',
  description: 'A preference for sexual activities using their cervix and womb.',
  sensations: { increase:['cervix'], factor:1.5 },
  requires: 'erogenousCervix',
});

// And balls too of course
SexualPreference.register('cock-slut',{
  name: 'Cock Slut',
  description: 'A preference for sexual activities using their cock.',
  sensations: { increase:['cock'], factor:1.5 },
  requires: 'cock',
});

SexualPreference.register('oral-slut',{
  name: 'Oral Slut',
  description: 'A preference for sexual activities using their mouth and tongue.',
  sensations: { increase:['throat'], factor:1.5 },
});

SexualPreference.register('pussy-slut',{
  name: 'Pussy Slut',
  description: 'A preference for sexual activities using their pussy.',
  sensations: { increase:['clit','pussy'], factor:1.5 },
  requires: 'pussy',
});

// Hidden until unlocked by action.
SexualPreference.register('urethra-slut',{
  name: 'Urethra Slut',
  description: 'A preference for sexual activities using their urethra.',
  sensations: { increase:['urethra'], factor:1.5 },
  requires: 'erogenousUrethra',
});
