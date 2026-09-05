
function springTrap(context) {
  return (context.T === GameSystem.getState().getPlayer()) ?
    `You feel a sudden stabbing pain as jagged iron spikes stab into your legs from below!`:
    `{T:name} lets out a sudden scream as jagged iron spikes stab into {T:his} legs from below!`;
}

function describe() {
  const success = `One of the stone floor tiles is raised slightly above the others. It's probably a trap, but easy
      enough to avoid if you know it's there.`;
  const failure = `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
  return (DungeonRequirements.scoutingSuccess())() ? success : failure;
}

RoomContents.register('dungeon-spike-trap',{
  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    onScoutingFailure: springTrap,
  },

  description: describe,
});
