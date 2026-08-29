global.AreasOfEffect = (function() {

  // TODO: We'll also have another variant of the small shape that only includes the positions from the targeted side.
  //       An AoE healing spell should never heal the other side. We also need to include other shapes. At least a
  //       'large' eight neighboring spaces shape, a three in a row 'sweep' shape, and a two position front and back
  //       shape.

  function get(center, shape) {
    switch (shape) {
      case 'small': return getSmall(center);
      default: throw new Error(`Bad AreaOfEffect shape [${shape}]`);
    }
  }

  // The default 'small' position can cause friendly fire because grenades and fireballs and such aren't smart. If you
  // hit the person standing right in front of you with a grenade, that will hurt you as well. A player though should
  // always be able to target a back row position with a grenade, even if no one is in that position. Doing so can
  // only hit a single front position though, so if you want to hit 3 monsters in the front rank with a grenade you
  // risk hitting your own party members. This could lead to an optimal strategy of leaving the middle front rank empty
  // so that you can always use a grenade against the middle front rank monster. To combat this, we should have a few
  // abilities that can only target a position directly in front of a character.

  function getSmall(center) {
    const [, side, rankString, columnString] = center.match(BattleConstants.positionPattern);
    const rank = parseInt(rankString);
    const column = parseInt(columnString);

    const positions = [center];
    if (column > 0) { positions.push(`${side}.${rank}.${column-1}`); }
    if (column < 4) { positions.push(`${side}.${rank}.${column+1}`); }
    positions.push(`${side}.${rank === 0 ? 1 : 0}.${column}`);
    if (rank === 0) { positions.push(`${side === 'P' ? 'M' : 'P'}.0.${column}`); }

    return positions;
  }

  return { get }

})()