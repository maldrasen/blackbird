
// Set global constants here. Because they're actually just properties on the
// global object they're not actually immutable. Prefix them with an underscore
// to indicate that they shouldn't be set. I could have made an immutable
// Constants object of course, but having to type Constants.s every time we
// want to use the south direction is worse than just having a global _s
// variable in my opinion.

global._parentId = '_parentId'


// If a species doesn't have height data specified, then we fallback to these constants which are used to calculate a
// random heights for the species. The standard deviation is normally around 70mm, but I represent it as a ratio
// below so that a species with a different average height can still have a comparable height deviation. The same is
// true for the female height ratio. Different species can set these to different values to allow more or less
// deviation between random heights or the sexes. We also assume that the deviation for futanari would be half of
// what females would be.
global._humanMaleHeight = 1750;
global._humanDeviationRatio = 100 / 1750; // (Actual standard deviation is around 70, but I want to make it a bit more extreme)
global._humanFemaleRatio = 1500 / 1750;   // (Actual female average height is 1620, but again I want the male/female ratio to be more noticeable.)

// === Dungeon ===
global._tileSize = 30;

// === Training ===
// The scale thresholds could be played with a bit, raised or lowered as needed as the levels aren't very even at all.
global._scaleThresholds = [100, 500, 3000, 10000, 30000, 60000, 100000, 250000];
