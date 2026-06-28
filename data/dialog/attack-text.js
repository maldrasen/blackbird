
const weaponName = `{S/abl}{@weaponName}{/S}`;
const targetsHitLocation = `{T:targetName's} {@hitLocation}`;

function isLowAttack(context) {
  return [EquipmentSlot.legs, EquipmentSlot.feet].includes(context.hitLocation); }

function isHighAttack(context) {
  return [EquipmentSlot.chest, EquipmentSlot.head].includes(context.hitLocation); }

Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [
    `{A:ActingName} swings {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `{A:ActingName} swings {A:his} ${weaponName} in a wide arc toward ${targetsHitLocation}.`,
    `{A:ActingName}  viciously slashes {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `With a fierce cry, {A:actingName} brings {A:his} ${weaponName} down on ${targetsHitLocation}.`,
    `{A:ActingName} lunges forward, slashing {A:his} ${weaponName} toward ${targetsHitLocation}.`,
    `{A:ActingName} executes a swift horizontal slash with {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [
    `{A:ActingName} thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `{A:ActingName} leaps forward, plunging {A:his} ${weaponName} toward ${targetsHitLocation}.`,
    `{A:ActingName} lunges forward, thrusting {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `With a vicious grin, {A:actingName} thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'heavy-axe', context => {
  const options = [
    `{A:ActingName} heaves a powerful cleaving blow with {A:his} ${weaponName} toward ${targetsHitLocation}.`
  ];
  if (isHighAttack(context)) { options.push(
    `{A:ActingName} swings {A:his} heavy ${weaponName} overhead, bringing it down toward ${targetsHitLocation}.`,
    `{A:ActingName} brings {A:his} ${weaponName} down in a brutal overhead strike toward ${targetsHitLocation}.`,
    `Roaring, {A:actingName} brings {A:his} ${weaponName} crashing down onto ${targetsHitLocation}.`,
  )}
  if (isLowAttack(context)) { options.push(
    `{A:ActingName} swings {A:his} heavy ${weaponName} in a low arc toward ${targetsHitLocation}.`,
    `{A:ActingName} sweeps low with {A:his} ${weaponName}, aiming for ${targetsHitLocation}.`,
    `Roaring, {A:actingName} chops {A:his} ${weaponName} down at ${targetsHitLocation}.`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'heavy-mace', context => {
  const options = [
    `{A:ActingName} swings {A:his} ${weaponName} in a crushing arc at ${targetsHitLocation}.`,
    `{A:ActingName} smashes {A:his} ${weaponName} heavily into ${targetsHitLocation}.`,
    `{A:ActingName} brings {A:his} ${weaponName} hammering down onto ${targetsHitLocation}.`,
  ];
  if (isHighAttack(context)) { options.push(
    `{A:ActingName} delivers a brutal overhead smash with {A:his} ${weaponName} onto ${targetsHitLocation}`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'quick-stab', context => {
  return [
    `{A:ActingName} darts forward, stabbing {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `{A:ActingName} quickly thrusts {A:his} ${weaponName} at ${targetsHitLocation}.`,
    `Lunging forward, {A:actingName} drives {A:his} ${weaponName} straight for ${targetsHitLocation}.`,
    `{A:ActingName} feints ${Random.from(['left','right'])} then stabs {A:his} ${weaponName} at ${targetsHitLocation}.`,
  ];
});

// TODO: We'll probably need ammo name as well in the case of bows.
Dialog.register(DialogCategory.attackText, 'shoot', context => {
  return [
    `{A:ActingName} draws {A:his} ${weaponName} and fires an arrow at ${targetsHitLocation}.`,
    `{A:ActingName} fires {A:his} ${weaponName} with precision toward ${targetsHitLocation}.`,
    `Taking careful aim, {A:actingName} fires {A:his} ${weaponName} straight at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'throw', context => {
  return [
    `{A:ActingName} hurls a ${weaponName} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'punch', context => {
  return [
    `{A:ActingName} punches {A:his} fist hard into ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'claw', context => {
  return [
    `{A:ActingName} lashes out with {A:his} claws at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'bite', context => {
  return [
    `{A:ActingName} bites down ferociously on ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-pierce', context => {
  return [
    `{A:ActingName} appears behind {T:targetName}, driving {A:his} ${weaponName} into {T:his} {@hitLocation}.`,
    `Unseen, {A:actingName} strikes from behind, plunging {A:his} ${weaponName} into ${targetsHitLocation}.`,
    `{A:ActingName} moves with practiced silence, waiting for the perfect opportunity. Suddenly {A:he} strikes, thrusting {A:his} ${weaponName} into ${targetsHitLocation}.`,
    `{A:ActingName} closes in unnoticed, suddenly striking {T:targetName} from the shadows, thrusting {A:his} ${weaponName} into {T:his} {@hitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-ranged', context => {
  return [
    `From the shadows, {A:actingName} looses an arrow from {A:his} ${weaponName}, aiming for ${targetsHitLocation}.`,
    `{A:ActingName} draws {A:his} ${weaponName} unseen and fires, aiming for ${targetsHitLocation}.`,
    `Hidden from view, {A:actingName} takes careful aim with {A:his} ${weaponName} and fires an arrow at ${targetsHitLocation}.`,
    `{A:ActingName} fires {A:his} ${weaponName} from the shadows, the arrow burying itself in ${targetsHitLocation} without warning.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-swing', context => {
  return [
    `{A:ActingName} bursts from the shadows, swinging {A:his} ${weaponName} at ${targetsHitLocation} before {T:targetName} knows {A:he}'s there.`,
    `Unseen until the last instant, {A:actingName} swings {A:his} ${weaponName} into ${targetsHitLocation} with brutal force.`,
  ];
});
