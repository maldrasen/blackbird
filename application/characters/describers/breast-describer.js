global.BreastsDescriber = (function() {

  // Some shapes (flat/pancake) don't have a round object with which to compare, so the caller of this function should
  // expect to handle a null result for some sizes.
  function sizeShapeComparison(shape, volume) {
    switch (shape) {
      case 'tiny-balls': return compareTinyBalls(volume);
      case 'pert': return comparePert(volume);
      case 'small-balls': return compareSmallBalls(volume);
      case 'teardrops': return compareTeardrops(volume);
      case 'conical': return compareConical(volume);
      case 'balls': return compareBalls(volume);
      case 'tubular': return compareTubular(volume);
      case 'swingers': return compareSwingers(volume);
      case 'average': return compareAverage(volume);
      case 'perky': return comparePerky(volume);
      case 'torpedoes': return compareTorpedoes(volume);
      case 'dangling': return compareDangling(volume);
      case 'heavy-bells': return compareHeavyBells(volume);
      case 'big-round': return compareBigRound(volume);
      case 'pendulous': return comparePendulous(volume);
      case 'hangers': return compareHangers(volume);
      case 'cow-tits': return compareCowTits(volume);
      case 'bimbo': return compareBimbo(volume);
      case 'elongated-sacks': return compareElongatedSacks(volume);
      case 'massive-bells': return compareMassiveBells(volume);
      case 'straining-round': return compareStrainingRound(volume);
    }
  }

  // 0 - 200 ml / firm
  function compareTinyBalls(volume) {
    if (volume < 50) { return null } // Too small to compare to anything.
    if (volume < 100) { return Random.from(['small tart plum',`large hen's egg`,'plump apricot']); }
    if (volume < 150) { return Random.from(['tiny pear','tiny apple','firm young peach','ripe plum','small orange','large apricot']); }
    return Random.from(['small green apple','plump peach','large plum','ripe orange']);
  }

  // 200 - 400 ml / firm
  function comparePert(volume) {
    if (volume < 250) { return Random.from(['firm young pear']); }
    if (volume < 300) { return Random.from(['ripe pear']); }
    if (volume < 350) { return Random.from(['large pear']); }
    return Random.from(['overgrown pear']);
  }

  // 200 - 400 ml / firm
  function compareSmallBalls(volume) {
    if (volume < 250) { return Random.from(['ripe apple','juicy peach','juicy orange','freshly baked roll']); }
    if (volume < 300) { return Random.from(['plump apple','large peach','plump orange','large bread roll']); }
    if (volume < 350) { return Random.from(['large apple','large orange','plump bread roll']); }
    return Random.from(['overgrown apple','overgrown orange','large cinnamon roll']);
  }

  // 400 - 700 ml / soft
  function compareTeardrops(volume) {}
  // 400 - 700 ml / medium
  function compareConical(volume) {}
  // 400 - 700 ml / firm
  function compareBalls(volume) {}
  // 400 - 700 ml / firm / narrow
  function compareTubular(volume) {}
  // 700 - 1,200 ml / soft
  function compareSwingers(volume) {}
  // 700 - 1,200 ml / medium
  function compareAverage(volume) {}
  // 700 - 1,200 ml / firm
  function comparePerky(volume) {}
  // 700 - 1,200 ml / firm / narrow
  function compareTorpedoes(volume) {}
  // 1200 - 2000 / soft
  function compareDangling(volume) {}
  // 1,200 - 2,000 / medium
  function compareHeavyBells(volume) {}
  // 1,200 - 2,000 / firm
  function compareBigRound(volume) {}
  // 2,000 - 5,000 / soft
  function comparePendulous(volume) {}
  // 2,000 - 5,000 / medium
  function compareHangers(volume) {}
  // 2,000 - 5,000 / medium
  function compareCowTits(volume) {}
  // 2,000 - 5,000 / firm
  function compareBimbo(volume) {}
  // 5,000 - 10,000 / soft
  function compareElongatedSacks(volume) {}
  // 5,000 - 10,000 / medium
  function compareMassiveBells(volume) {}
  // 5,000 - 10,000 / firm
  function compareStrainingRound(volume) {}

  return Object.freeze({
    sizeShapeComparison,
  });

})();

/*

These all need to be rewritten, converted to a templated format, and selected based on shape. Not a bad starting point
though.

flat (tiny/soft)
  Her breasts are completely flat, barely rising above her chest,

pancakes (tiny/soft)
  Her breasts are almost completely flat, offering only the faintest soft swell against her chest.
  Her breasts are almost completely flat against her chest, showing only the softest, slightest swell.

tiddys (tiny/medium)
  Her tiny breasts form delicate, youthful buds that sit high and tight against her chest, barely swelling outward.
  Her small, dainty peaks rise gently from her chest, firm and delicately pointed.

golfballs (tiny/firm)
  Tiny round mounds sit high on her chest, no larger than golf balls and perfectly spherical.
  Tiny, perfectly rounded mounds sit high on her chest like delicate golf balls, firm and unyielding.
  Tiny, perfectly rounded mounds rest high on her chest, compact and noticeably spherical even at their modest size.

pert (tiny/firm)
  Her breasts form tiny, firm cones that jut forward from her chest, defying gravity despite their modest size.

---

teardrops (small/soft)
  Her breasts are like small gentle teardrops, hanging with a slight downward curve and swaying subtly with her movements.

conical (small/medium)
  Her breasts form small, upward-pointing cones that jiggle slightly when she moves.

smallRound (small/firm)
  Her small firm breasts form compact, perfectly rounded spheres that rest high and proud on her chest.

tubular (small/firm)
  Her small, firm breasts project outward in narrow, tube-like shapes, elongated and pointed rather than rounded.

---

swingers (average/soft)
  Her soft, modestly sized breasts swell forward in a soft, gentle curve before dropping into a natural sag.
  Her modestly sized breasts look incredibly soft, swinging from side to side her every movement.

extraMedium (average/medium)
  Her breasts form a soft, classic teardrop shape, full at the bottom and tapering gently upward with a natural, relaxed curve.
  Full and softly rounded, her breasts sway heavily with her movements.
  Perfectly balanced orbs rest evenly on her chest, round and full, with a subtle lift that gives them a harmonious, natural appearance.
  Her average sized breasts flare into a gentle bell shape, widening toward the base with a soft, inviting fullness.
  Her breasts are full and round, hanging like soft swaying bells.

perky (average/firm)
  Her firm, modestly sized breasts form round perky hemispheres, sitting high on her torso, and lifting upward with almost no sag.

torpedos (average/firm)
  Her firm breasts project forward in an elongated torpedo shape, sloping gently downward with noticeable weight.
  Her firm breasts extend forward in an elongated shape that slopes gently downward, carrying a subtle forward projection.
  Her long firm breasts extend outward in a somewhat torpedo-like form, sloping forward but yielding noticeably to gravity.
  Her breasts project sharply forward in a firm, elongated torpedo shape, maintaining a pointed, upward-angled profile with minimal sag.

---

dangling (big/soft)
  Her breasts look large and heavy, dangling udders that swing freely with every step, stretching downward under their own weight.
  Heavy and sack-like, her breasts sway pendulously, slapping softly against her ribs when she moves.
  Her ripe, drooping melons hang low from her chest, their weight pulling them into a lewd, swaying arc that begs to be grabbed.

heavyBells (big/medium)
  Her large breasts form heavy bells, swinging and pulling downward, creating deep cleavage and a soft, pendulous bounce.
  Her big, bouncing globes dominate her frame, rolling and shifting with every motion in a hypnotic, fleshy display.
  Deep, plunging cleavage forms where her breasts drop heavily together, slapping together heavily when she leans forward.

bigRound (big/firm)
  Her large breasts form big rounded orbs that remain surprisingly high and firm.
  Her big round breasts thrust sharply forward, high and firm.
  Taut, bulging orbs sit proud and unyielding on her chest, straining against gravity and practically demanding attention.

---

pendulous (huge/soft)
  Enormous pendulous teardrops hang low, swaying heavily and brushing against her torso with each motion.

hangers (huge/medium)
  Her huge breasts hang deeply and heavily from her chest, creating a pronounced lower curve and soft, rolling bounce with each step.
  Massive and full, her breasts drop low under their own weight, forming generous, swaying orbs that dominate her silhouette.

cowTits (huge/medium)
  Massive, cow-like udders sag deeply, their sheer weight causing them to swing and slap together.
  Massive, heavy breasts hang low and full, swaying pendulously with every movement like swollen udders.
  Massive breasts hang low and full, swaying heavily with every movement and creating a pronounced, pendulous curve.

bimbo (huge/firm)
  Huge, impossibly round and high-set globes jut forward like exaggerated bimbo implants, barely yielding to gravity.
  Huge, impossibly round and high-set globes thrust forward, taut and defiant against gravity.
  Huge, impossibly round breasts thrust forward and upward, remaining taut and high despite their extraordinary size.

---

elongatedSacks (monster/soft)
  Colossal, elongated sacks dangle almost to her waist, stretching and swinging with hypnotic motion.

massiveBells (monster/medium)
  Monstrously heavy bells dominate her frame, hanging low with deep cleavage and overwhelming presence.

strainingRound (monster/firm)
  Gigantic, straining rounded spheres sit improbably high, taut and bulging against their own mass.

*/