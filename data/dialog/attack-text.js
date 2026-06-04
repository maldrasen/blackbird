
Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [`{C:baseName} swings {C:his} {C:primaryWeaponName} at {T:name}.`]
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [`{C:baseName} thrust {C:his} {C:primaryWeaponName} at {T:name}.`]
});

Dialog.register(DialogCategory.attackText, 'dick-punch', context => {
  return [`{C:baseName} punches {T:name} in the dick.`]
});
