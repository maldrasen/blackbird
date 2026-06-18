
Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [`{S/act}{A:baseName}{/S} swings {A:his} {S/abl}{@weaponName}{/S} at {S/tar}{T:baseName's}{/S} {@hitLocation}.`]
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [`{S/act}{A:baseName}{/S} thrust {A:his} {S/abl}{@weaponName}{/S} at {S/tar}{T:baseName's}{/S} {@hitLocation}.`]
});

Dialog.register(DialogCategory.attackText, 'dick-punch', context => {
  return [`{A:baseName} punches {T:baseName} in the dick.`]
});
