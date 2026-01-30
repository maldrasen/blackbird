
// Set global constants here. Because they're actually just properties on the
// global object they're not actually immutable. Prefix them with an underscore
// to indicate that they shouldn't be set. I could have made an immutable
// Constants object of course, but having to type Constants.s every time we
// want to use the south direction is worse than just having a global _s
// variable in my opinion.

// Not actually using these, but I'll probably need some constants eventually.
// I like a leading `_` for a constant.
global._n = 'n';
global._s = 's';
global._e = 'e';
global._w = 'w';
