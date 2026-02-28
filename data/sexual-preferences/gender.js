
// The default gender preferences should only be used for the baseline for straight characters when there is no other
// information to go off of. The character factory will need to determine if a character is gay or bi and set the
// preferences accordingly. More detailed gender preferences and rates should be defined by the character's species.

SexualPreference.register('gynophilic',{
  name: 'Gynophilic',
  antiname: 'Gynophobic',
  description: 'An attraction to feminine traits',
});

SexualPreference.register('androphilic',{
  name: 'Androphilic',
  antiname: 'Androphobic',
  description: 'An attraction to masculine traits',
});
