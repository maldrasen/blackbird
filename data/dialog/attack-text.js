
const targetsHitLocation = `{T:targetName's} {@hitLocation}`;

function isLowAttack(context) {
  return [EquipmentSlot.legs, EquipmentSlot.feet].includes(context.hitLocation); }

function isHighAttack(context) {
  return [EquipmentSlot.chest, EquipmentSlot.head].includes(context.hitLocation); }

Dialog.register(DialogCategory.attackText, 'basic-swing', context => {
  return [
    `{A:ActingName} swings {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `{A:ActingName} swings {hisWeaponName(A)} in a wide arc at ${targetsHitLocation}.`,
    `{A:ActingName}  viciously slashes {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `With a fierce cry, {A:actingName} brings {hisWeaponName(A)} down on ${targetsHitLocation}.`,
    `{A:ActingName} lunges forward, slashing {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `{A:ActingName} executes a swift horizontal slash with {hisWeaponName(A)} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'basic-thrust', context => {
  return [
    `{A:ActingName} thrusts {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `{A:ActingName} leaps forward, plunging {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `{A:ActingName} lunges forward, thrusting {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `With a vicious grin, {A:actingName} thrusts {hisWeaponName(A)} at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'heavy-axe', context => {
  const options = [
    `{A:ActingName} heaves a powerful cleaving blow with {hisWeaponName(A)} at ${targetsHitLocation}.`
  ];
  if (isHighAttack(context)) { options.push(
    `{A:ActingName} swings {hisWeaponName(A)} overhead, bringing it down at ${targetsHitLocation}.`,
    `{A:ActingName} brings {hisWeaponName(A)} down in a brutal overhead strike at ${targetsHitLocation}.`,
    `Roaring, {A:actingName} brings {hisWeaponName(A)} crashing down onto ${targetsHitLocation}.`,
  )}
  if (isLowAttack(context)) { options.push(
    `{A:ActingName} swings {hisWeaponName(A)} in a low arc at ${targetsHitLocation}.`,
    `{A:ActingName} sweeps low with {hisWeaponName(A)}, aiming for ${targetsHitLocation}.`,
    `Roaring, {A:actingName} chops {hisWeaponName(A)} down at ${targetsHitLocation}.`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'heavy-mace', context => {
  const options = [
    `{A:ActingName} swings {hisWeaponName(A)} in a crushing arc at ${targetsHitLocation}.`,
    `{A:ActingName} smashes {hisWeaponName(A)} heavily into ${targetsHitLocation}.`,
    `{A:ActingName} brings {hisWeaponName(A)} hammering down onto ${targetsHitLocation}.`,
  ];
  if (isHighAttack(context)) { options.push(
    `{A:ActingName} delivers a brutal overhead smash with {hisWeaponName(A)} onto ${targetsHitLocation}`,
  )}
  return options;
});

Dialog.register(DialogCategory.attackText, 'quick-stab', context => {
  return [
    `{A:ActingName} darts forward, stabbing {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `{A:ActingName} quickly thrusts {hisWeaponName(A)} at ${targetsHitLocation}.`,
    `Lunging forward, {A:actingName} drives {hisWeaponName(A)} straight for ${targetsHitLocation}.`,
    `{A:ActingName} feints ${Random.from(['left','right'])} then stabs {hisWeaponName(A)} at ${targetsHitLocation}.`,
  ];
});

// TODO: We'll probably need ammo name as well in the case of bows.
Dialog.register(DialogCategory.attackText, 'shoot', context => {
  return [
    `{A:ActingName} draws {hisWeaponName(A)} and fires an arrow at ${targetsHitLocation}.`,
    `{A:ActingName} fires {hisWeaponName(A)} with precision at ${targetsHitLocation}.`,
    `Taking careful aim, {A:actingName} fires {hisWeaponName(A)} straight at ${targetsHitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'throw', context => {
  return [
    `{A:ActingName} hurls {aWeaponName()} at ${targetsHitLocation}.`,
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
    `{A:ActingName} appears behind {T:targetName}, driving {hisWeaponName(A)} into {T:his} {@hitLocation}.`,
    `Unseen, {A:actingName} strikes from behind, plunging {hisWeaponName(A)} into ${targetsHitLocation}.`,
    `{A:ActingName} moves with practiced silence, waiting for the perfect opportunity. Suddenly {A:he} strikes, thrusting {hisWeaponName(A)} into ${targetsHitLocation}.`,
    `{A:ActingName} closes in unnoticed, suddenly striking {T:targetName} from the shadows, thrusting {hisWeaponName(A)} into {T:his} {@hitLocation}.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-ranged', context => {
  return [
    `From the shadows, {A:actingName} looses an arrow from {hisWeaponName(A)}, aiming for ${targetsHitLocation}.`,
    `{A:ActingName} draws {hisWeaponName(A)} unseen and fires, aiming for ${targetsHitLocation}.`,
    `Hidden from view, {A:actingName} takes careful aim with {hisWeaponName(A)} and fires an arrow at ${targetsHitLocation}.`,
    `{A:ActingName} fires {hisWeaponName(A)} from the shadows, the arrow burying itself in ${targetsHitLocation} without warning.`,
  ];
});

Dialog.register(DialogCategory.attackText, 'sneak-attack-swing', context => {
  return [
    `{A:ActingName} bursts from the shadows, swinging {hisWeaponName(A)} at ${targetsHitLocation} before {T:targetName} knows {A:he}'s there.`,
    `Unseen until the last instant, {A:actingName} swings {hisWeaponName(A)} into ${targetsHitLocation} with brutal force.`,
  ];
});
