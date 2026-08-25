
function trapSprung(context) {
  const toPlayer = `You hear a loud crack as the stone slab you step on suddenly splits beneath you! The fall into the 
    pit below isn't far, and fortunately the jagged iron spikes break your fall.`
  const toCharacter = `You hear a loud crack and a scream as the floor underneath {T:name} collapses! You rush to the 
    open pit, and quickly help {T:him} to climb free.`;
  return (context.T === GameSystem.getState().getPlayer()) ? toPlayer : toCharacter;
}

function describe() {
  const success = `Someone has scrawled a bright red X on one of the floor tiles in the room. Probably best to avoid
    stepping on that one.`;
  const failure = `An open pit lies in the center of the room. The thin slab of stone that covered it lies split and 
    shattered at the bottom of the spike filled pit.`;
  return (DungeonRequirements.checkScoutingRoll())() ? success : failure;
}

RoomContents.register('dungeon-pit-trap',{
  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:3, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    onScoutingFailure: trapSprung,
  },
  description: describe,
});
