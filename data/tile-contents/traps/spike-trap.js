
TileContents.register('spike-trap',{
  type: TileContentType.trap,

  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    disarm: 12,
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

// TODO: Placeholder text.
function disarmTrap(context) {
  return (context.T === GameSystem.getState().getPlayer()) ?
    `You find the pressure plate under the loose flagstone and wedge it in place. The spikes stay where they are.`:
    `{T:name} finds the pressure plate under the loose flagstone and wedges it in place. The spikes stay where they are.`;
}

// TODO: Placeholder text for the disarmed state.
function describe(options) {
  return (options.state === 'disarmed') ?
    `A loose flagstone sits wedged in place over a spike trap, safe enough as long as nobody pries it free.`:
    `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
}
