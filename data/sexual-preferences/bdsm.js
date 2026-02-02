
// Most of the default BDSM values should be influenced by personality more than gender.

SexualPreferenceRecord.register('dominant',{
  name: 'Dominant',
  description: 'A desire to control others',
  defaultValue: { male:10, female:-10, futa:10, enby:0 },
});

SexualPreferenceRecord.register('submissive',{
  name: 'Submissive',
  description: 'A desire to be controlled by others',
  defaultValue: { male:-10, female:10, futa:-10, enby:0 },
});

SexualPreferenceRecord.register('sadistic',{
  name: 'Sadistic',
  description: 'A desire to hurt others',
  defaultValue: { male:10, female:-10, futa:10, enby:0 },
});

SexualPreferenceRecord.register('masochistic',{
  name: 'Masochistic',
  description: 'A desire for physical pain',
  defaultValue: -25,
});

SexualPreferenceRecord.register('debaser',{
  name: 'Debaser',
  description: 'A desire to degrade, debase, and objectify others.',
  defaultValue: 0,
});

SexualPreferenceRecord.register('affection-slut',{
  name: 'Affection Slut',
  description: 'A desire for emotional comfort, support, and praise',
  defaultValue: 25,
});

SexualPreferenceRecord.register('humiliation-slut',{
  name: 'Humiliation Slut',
  description: 'A desire for emotional abuse, humiliation, degradation, and objectification',
  defaultValue: -25,
});
