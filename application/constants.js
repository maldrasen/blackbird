
// Set global constants here. Because they're actually just properties on the global object they're not actually
// immutable. Prefix them with an underscore to indicate that they shouldn't be set. I could have made an immutable
// Constants object of course, but having to type Constants.s every time we want to use the south direction is worse
// than just having a global _s variable in my opinion.

global._parentId = '_parentId'

// === Battle ===
global._positionPattern = /([PM])\.(\d)\.(\d)/;
global._battleDamageEffectTime = 500;
global._battleKillEffectTime = 1000;

// === Training ===
// The scale thresholds could be played with a bit, raised or lowered as needed as the levels aren't very even at all.
global._scaleThresholds = [100, 600, 3600, 13600, 43600, 103600, 203600, 453600];

// A third flavor of null.
global._nothing = 'nothing';
