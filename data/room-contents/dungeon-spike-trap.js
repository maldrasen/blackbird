RoomContents.register('dungeon-spike-trap',{
  range: [1,4],
  secrecy: 10,

  // TODO: When a room is entered, and it has a trap, we check to see if the scouting was a success. If it was than
  //       nothing happens. The detected trap is part of the description, but there's no need to show an event. If the
  //       scouting was a failure then we determine the target of the trap, add them to the context as T. We roll the
  //       trap damage if there is any (some traps may have other effects). If there was damage display it as an effect
  //       in an overlay along with the return value of the onScoutingFailure() function.

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    target: EpisodeTarget.anyInParty,
    onScoutingFailure: context => {
      return (context.T === GameSystem.getPlayer()) ?
        `You feel a sudden stabbing pain as jagged iron spikes stab into your legs from below!`:
        `{T:name} lets out a sudden scream as jagged iron spikes stab into {T:his} legs from below!`;
    },
  },
  description: () => {
    const success = `One of the stone floor tiles is raised slightly above the others. It's probably a trap, but easy
      enough to avoid now that you know its there.`;
    const failure = `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
    return DungeonRequirements.scoutingSuccess() ? success : failure;
  },
});
