RoomContents.register('dungeon-spike-trap',{
  range: [1,4],
  secrecy: 10,

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    onScoutingFailure: context => {
      return (context.T === GameSystem.getState().getPlayer()) ?
        `You feel a sudden stabbing pain as jagged iron spikes stab into your legs from below!`:
        `{T:name} lets out a sudden scream as jagged iron spikes stab into {T:his} legs from below!`;
    },
  },
  description: () => {
    const success = `One of the stone floor tiles is raised slightly above the others. It's probably a trap, but easy
      enough to avoid now that you know its there.`;
    const failure = `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
    return DungeonSystem.getDungeonFloor().getCurrentRoom().checkScoutingRoll() ? success : failure;
  },
});
