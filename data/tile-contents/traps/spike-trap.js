
TileContents.register('spike-trap',{
  type: TileContentType.trap,

  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    disarm: 20,
    springTrap,
    disarmTrap,
  },

  description: describe,
});

function springTrap(context) {
  return (context.T === GameSystem.getState().getPlayer()) ?
    `You feel a sudden stabbing pain as jagged iron spikes stab into your legs from below!`:
    `{T:name} lets out a sudden scream as jagged iron spikes stab into {T:his} legs from below!`;
}

function disarmTrap(context) {
  return (context.T === GameSystem.getState().getPlayer()) ?
    `You disarm the trap, wedging a loose stone beneath the pressure plate.`:
    `{T:name} disarms the trap, wedging a loose stone beneath the pressure plate`;
}

function describe(options) {
  return (options.state === 'disarmed') ?
    `The pressure plate that would have triggered the spike trap has been disabled and safe to walk on now.`:
    `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
}
