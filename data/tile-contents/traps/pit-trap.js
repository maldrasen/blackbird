
TileContents.register('pit-trap',{
  type: TileContentType.trap,

  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:3, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    springTrap,
  },

  description: describe,
});

function springTrap(context) {
  const toPlayer = `You hear a loud crack as the stone slab you step on suddenly splits beneath you! The fall into the 
    pit below isn't far, and fortunately the jagged iron spikes break your fall.`
  const toCharacter = `You hear a loud crack and a scream as the floor underneath {T:name} collapses! You rush to the 
    open pit, and quickly help {T:him} to climb free.`;
  return (context.T === GameSystem.getState().getPlayer()) ? toPlayer : toCharacter;
}

// TODO: How does a pit trap look when disarmed? Maybe just marked?
function describe() {
  return `You carefully step over the open pit. The thin slab of stone that covered the trap lies split and shattered 
    at the bottom of the spike filled hole.`;
}
