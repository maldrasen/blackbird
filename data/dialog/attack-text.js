
const attackerName = `{S/act}{A:baseName}{/S}`;
const targetName = `{S/tar}{T:baseName's}{/S}`;
const weaponName = `{S/abl}{@weaponName}{/S}`;
const targetsHitLocation = `{S/tar}{T:baseName's}{/S} {@hitLocation}`;

function isLowAttack(context) {
  return [EquipmentSlot.legs, EquipmentSlot.feet].includes(context.hitLocation); }

function isHighAttack(context) {
  return [EquipmentSlot.chest, EquipmentSlot.head].includes(context.hitLocation); }

Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [
    `${attackerName} swings {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `${attackerName} swings {A:his} ${weaponName} in a wide arc toward ${targetsHitLocation}.`,
    `${attackerName}  viciously slashes {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `With a fierce cry, ${attackerName} brings {A:his} ${weaponName} down on ${targetsHitLocation}.`,
    `${attackerName} lunges forward, slashing {A:his} ${weaponName} toward ${targetsHitLocation}.`,
    `${attackerName} executes a swift horizontal slash with {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [
    `${attackerName} thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `${attackerName} leaps forward, plunging {A:his} ${weaponName} toward ${targetsHitLocation}.`,
    `${attackerName} lunges forward, thrusting {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `With a vicious grin, ${attackerName} thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'heavy-axe', context => {
  const options = [
    `${attackerName} heaves a powerful cleaving blow with {A:his} ${weaponName} toward ${targetsHitLocation}.`
  ];
  if (isHighAttack(context)) { options.push(
    `${attackerName} swings {A:his} heavy ${weaponName} overhead, bringing it down toward ${targetsHitLocation}.`,
    `${attackerName} brings {A:his} ${weaponName} down in a brutal overhead strike toward ${targetsHitLocation}.`,
    `Roaring, ${attackerName} brings {A:his} ${weaponName} crashing down onto ${targetsHitLocation}.`,
  )}
  if (isLowAttack(context)) { options.push(
    `${attackerName} swings {A:his} heavy ${weaponName} in a low arc toward ${targetsHitLocation}.`,
    `${attackerName} sweeps low with {A:his} ${weaponName}, aiming for ${targetsHitLocation}.`,
    `Roaring, ${attackerName} chops {A:his} ${weaponName} down at ${targetsHitLocation}.`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'heavy-mace', context => {
  const options = [
    `${attackerName} swings {A:his} ${weaponName} in a crushing arc at ${targetsHitLocation}.`,
    `${attackerName} smashes {A:his} ${weaponName} heavily into ${targetsHitLocation}.`,
    `${attackerName} brings {A:his} ${weaponName} hammering down onto ${targetsHitLocation}.`,
  ];
  if (isHighAttack(context)) { options.push(
    `${attackerName} delivers a brutal overhead smash with {A:his} ${weaponName} onto ${targetsHitLocation}`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'quick-stab', context => {
  return [
    `${attackerName} darts forward, stabbing {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `${attackerName} quickly thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `Lunging forward, ${attackerName} drives {A:his} ${weaponName} straight for ${targetsHitLocation}.`,
    `${attackerName} feints ${Random.from(['left','right'])} then stabs {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

// TODO: We'll probably need ammo name as well in the case of bows.
Dialog.register(DialogCategory.attackText, 'shoot', context => {
  return [
    `${attackerName} draws {A:his} ${weaponName} and fires an arrow at ${targetsHitLocation}.`,
    `${attackerName} fires {A:his} ${weaponName} with precision toward ${targetsHitLocation}.`,
    `Taking careful aim, ${attackerName} fires {A:his} ${weaponName} straight at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'throw', context => {
  return [
    `${attackerName} hurls a ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'punch', context => {
  return [
    `${attackerName} punches {A:his} fist hard into ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'claw', context => {
  return [
    `${attackerName} lashes out with {A:his} claws at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'bite', context => {
  return [
    `${attackerName} bites down ferociously on ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-pierce', context => {
  return [
    `${attackerName} appears behind ${targetName}, driving {A:his} ${weaponName} into {T:his} {@hitLocation}.`,
    `Unseen, ${attackerName} strikes from behind, plunging {A:his} ${weaponName} into ${targetsHitLocation}.`,
    `${attackerName} moves with practiced silence, waiting for the perfect opportunity. Suddenly {A:he} strikes, thrusting {A:his} ${weaponName} into ${targetsHitLocation}.`,
    `${attackerName} closes in unnoticed, suddenly striking ${targetName} from the shadows, thrusting {A:his} ${weaponName} into {T:his} {@hitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-ranged', context => {
  return [
    `From the shadows, ${attackerName} looses an arrow from {A:his} ${weaponName}, aiming for ${targetsHitLocation}.`,
    `${attackerName} draws {A:his} ${weaponName} unseen and fires, aiming for ${targetsHitLocation}.`,
    `Hidden from view, ${attackerName} takes careful aim with {A:his} ${weaponName} and fires an arrow at ${targetsHitLocation}.`,
    `${attackerName} fires {A:his} ${weaponName} from the shadows, the arrow burying itself in ${targetsHitLocation} without warning.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-swing', context => {
  return [
    `${attackerName} bursts from the shadows, swinging {A:his} ${weaponName} at ${targetsHitLocation} before ${targetName} knows {A:he}'s there.`,
    `Unseen until the last instant, ${attackerName} swings {A:his} ${weaponName} into ${targetsHitLocation} with brutal force.`,
  ];
});
