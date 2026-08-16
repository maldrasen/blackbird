
const isLowAttack = BattleRequirements.withHitLocation(EquipmentSlot.legs, EquipmentSlot.feet);
const isHighAttack = BattleRequirements.withHitLocation(EquipmentSlot.chest, EquipmentSlot.head);

const basicSwing = WeaverPackage('attack-text.basic-swing');
const basicThrust = WeaverPackage('attack-text.basic-thrust');
const heavyAxe = WeaverPackage('attack-text.heavy-axe');
const heavyMace = WeaverPackage('attack-text.heavy-mace');
const quickStab = WeaverPackage('attack-text.quick-stab');
const shoot = WeaverPackage('attack-text.shoot');
const throwWeapon = WeaverPackage('attack-text.throw');
const punch = WeaverPackage('attack-text.punch');
const claw = WeaverPackage('attack-text.claw');
const bite = WeaverPackage('attack-text.bite');
const sneakAttackPierce = WeaverPackage('attack-text.sneak-attack-pierce');
const sneakAttackRanged = WeaverPackage('attack-text.sneak-attack-ranged');
const sneakAttackSwing = WeaverPackage('attack-text.sneak-attack-swing');

Dialog.register(DialogCategory.attackText, 'basic-swing', basicSwing);
Dialog.register(DialogCategory.attackText, 'basic-thrust', basicThrust);
Dialog.register(DialogCategory.attackText, 'heavy-axe', heavyAxe);
Dialog.register(DialogCategory.attackText, 'heavy-mace', heavyMace);
Dialog.register(DialogCategory.attackText, 'quick-stab', quickStab);
Dialog.register(DialogCategory.attackText, 'shoot', shoot);
Dialog.register(DialogCategory.attackText, 'throw', throwWeapon);
Dialog.register(DialogCategory.attackText, 'punch', punch);
Dialog.register(DialogCategory.attackText, 'claw', claw);
Dialog.register(DialogCategory.attackText, 'bite', bite);
Dialog.register(DialogCategory.attackText, 'sneak-attack-pierce', sneakAttackPierce);
Dialog.register(DialogCategory.attackText, 'sneak-attack-ranged', sneakAttackRanged);
Dialog.register(DialogCategory.attackText, 'sneak-attack-swing', sneakAttackSwing);



basicSwing.add(`{A:ActingName} swings {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicSwing.add(`{A:ActingName} swings {hisWeaponName(A)} in a wide arc at {targetsHitLocation(T)}.`);
basicSwing.add(`{A:ActingName} viciously slashes {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicSwing.add(`With a fierce cry, {A:actingName} brings {hisWeaponName(A)} down on {targetsHitLocation(T)}.`);
basicSwing.add(`{A:ActingName} lunges forward, slashing {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicSwing.add(`{A:ActingName} executes a swift horizontal slash with {hisWeaponName(A)} at {targetsHitLocation(T)}.`);



basicThrust.add(`{A:ActingName} thrusts {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicThrust.add(`{A:ActingName} leaps forward, plunging {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicThrust.add(`{A:ActingName} lunges forward, thrusting {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
basicThrust.add(`With a vicious grin, {A:actingName} thrusts {hisWeaponName(A)} at {targetsHitLocation(T)}.`);



heavyAxe.add(`{A:ActingName} heaves a powerful cleaving blow with {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
heavyAxe.add(`{A:ActingName} swings {hisWeaponName(A)} overhead, bringing it down at {targetsHitLocation(T)}.`,
  [isHighAttack]);
heavyAxe.add(`{A:ActingName} brings {hisWeaponName(A)} down in a brutal overhead strike at {targetsHitLocation(T)}.`,
  [isHighAttack]);
heavyAxe.add(`Roaring, {A:actingName} brings {hisWeaponName(A)} crashing down onto {targetsHitLocation(T)}.`,
  [isHighAttack]);
heavyAxe.add(`{A:ActingName} swings {hisWeaponName(A)} in a low arc at {targetsHitLocation(T)}.`,
  [isLowAttack]);
heavyAxe.add(`{A:ActingName} sweeps low with {hisWeaponName(A)}, aiming for {targetsHitLocation(T)}.`,
  [isLowAttack]);
heavyAxe.add(`Roaring, {A:actingName} chops {hisWeaponName(A)} down at {targetsHitLocation(T)}.`,
  [isLowAttack]);



heavyMace.add(`{A:ActingName} swings {hisWeaponName(A)} in a crushing arc at {targetsHitLocation(T)}.`);
heavyMace.add(`{A:ActingName} smashes {hisWeaponName(A)} heavily into {targetsHitLocation(T)}.`);
heavyMace.add(`{A:ActingName} brings {hisWeaponName(A)} hammering down onto {targetsHitLocation(T)}.`);
heavyMace.add(`{A:ActingName} delivers a brutal overhead smash with {hisWeaponName(A)} onto {targetsHitLocation(T)}`,
  [isHighAttack]);



quickStab.add(`{A:ActingName} darts forward, stabbing {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
quickStab.add(`{A:ActingName} quickly thrusts {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
quickStab.add(`Lunging forward, {A:actingName} drives {hisWeaponName(A)} straight for {targetsHitLocation(T)}.`);
quickStab.add(`{A:ActingName} feints left then stabs {hisWeaponName(A)} at {targetsHitLocation(T)}.`);
quickStab.add(`{A:ActingName} feints right then stabs {hisWeaponName(A)} at {targetsHitLocation(T)}.`);



// TODO: We'll probably need ammo name as well in the case of bows.
shoot.add(`{A:ActingName} draws {hisWeaponName(A)} and fires an arrow at {targetsHitLocation(T)}.`);
shoot.add(`{A:ActingName} fires {hisWeaponName(A)} with precision at {targetsHitLocation(T)}.`);
shoot.add(`Taking careful aim, {A:actingName} fires {hisWeaponName(A)} straight at {targetsHitLocation(T)}.`);



throwWeapon.add(`{A:ActingName} hurls {aWeaponName()} at {targetsHitLocation(T)}.`);



punch.add(`{A:ActingName} punches {A:his} fist hard into {targetsHitLocation(T)}.`);



claw.add(`{A:ActingName} lashes out with {A:his} claws at {targetsHitLocation(T)}.`);



bite.add(`{A:ActingName} bites down hard on {targetsHitLocation(T)}.`);
bite.add(`{A:ActingName} lunges at {T:targetName}, biting into {hisHitLocation(T)}.`);
bite.add(`{A:ActingName} lunges at {T:targetName}, sinking {A:his} {teeth} into {hisHitLocation(T)}.`);



sneakAttackPierce.add(`{A:ActingName} appears behind {T:targetName}, driving {hisWeaponName(A)} into {hisHitLocation(T)}.`);
sneakAttackPierce.add(`Unseen, {A:actingName} strikes from behind, plunging {hisWeaponName(A)} into {targetsHitLocation(T)}.`);
sneakAttackPierce.add(`{A:ActingName} moves with practiced silence, waiting for the perfect opportunity. Suddenly
  {A:he} strikes, thrusting {hisWeaponName(A)} into {targetsHitLocation(T)}.`);
sneakAttackPierce.add(`{A:ActingName} closes in unnoticed, suddenly striking {T:targetName} from the shadows,
  thrusting {hisWeaponName(A)} into {hisHitLocation(T)}.`);



sneakAttackRanged.add(`From the shadows, {A:actingName} looses an arrow from {hisWeaponName(A)}, aiming for {targetsHitLocation(T)}.`);
sneakAttackRanged.add(`{A:ActingName} draws {hisWeaponName(A)} unseen and fires, aiming for {targetsHitLocation(T)}.`);
sneakAttackRanged.add(`Hidden from view, {A:actingName} takes careful aim with {hisWeaponName(A)} and fires an arrow
  at {targetsHitLocation(T)}.`);
sneakAttackRanged.add(`{A:ActingName} fires {hisWeaponName(A)} from the shadows, the arrow burying itself in
  {targetsHitLocation(T)} without warning.`);



sneakAttackSwing.add(`{A:ActingName} bursts from the shadows, swinging {hisWeaponName(A)} at {targetsHitLocation(T)}
  before {T:targetName} knows {A:he}'s there.`);
sneakAttackSwing.add(`Unseen until the last instant, {A:actingName} swings {hisWeaponName(A)} into {targetsHitLocation(T)}
  with brutal force.`);
