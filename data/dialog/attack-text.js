
Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [`{S/mon}{C:baseName}{/S} swings {C:his} {S/abl}{C:primaryWeaponName}{/S} at {S/act}{T:name}{/S}.`]
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [`{S/mon}{C:baseName}{/S} thrust {C:his} {S/abl}{C:primaryWeaponName}{/S} at {S/act}{T:name}{/S}.`]
});

Dialog.register(DialogCategory.attackText, 'dick-punch', context => {
  return [`{C:baseName} punches {T:name} in the dick.`]
});
