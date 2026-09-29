
TileContents.register('spike-trap',{
  type: TileContentType.trap,

  range: [1,4],
  secrecy: 15,

  trap: {
    damage: { x:2, d:6 },
    damageType: DamageType.pierce,
    hitLocation: EquipmentSlot.legs,
    target: EpisodeTarget.anyInParty,
    springTrap,
  },

  description: describe,
});

// TODO: Traps should always work the same way. Stepping close to a tile with a trap in makes a scouting roll. If the
//       scouting roll fails (below the secrecy) the trap glyph remains hidden. Stepping on the hidden trap tile calls
//       the springTrap function. The trap system needs to determine the trap target and put it in the context. If the
//       trap is successfully scouted we show the armed trap glyph. I'm not sure yet if we want a disarm command or
//       if stepping on the visible trap attempts to disarm it. The later is more efficient, but it's kind of annoying
//       if there's no "avoid this if it can't be disarmed" option. Disarming comes with the risk of setting off the
//       trap, so I think I'm leaning towards the simpler "step on this to disarm it" option. Disarming should use the
//       mechanics skill, which hasn't been used at all yet.

function springTrap(context) {
  return (context.T === GameSystem.getState().getPlayer()) ?
    `You feel a sudden stabbing pain as jagged iron spikes stab into your legs from below!`:
    `{T:name} lets out a sudden scream as jagged iron spikes stab into {T:his} legs from below!`;
}

// TODO: The tile description is what's shown when standing on the tile. Stepping on a trap tile will trigger it if
//       it's still armed, so here we need to describe the trap as either disarmed or tripped.

function describe() {
  return `Bloodstained spikes jut upward from the floor; a reminder to be more careful in the future.`;
}
