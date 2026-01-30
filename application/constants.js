
// Set global constants here. Because they're actually just properties on the
// global object they're not actually immutable. Prefix them with an underscore
// to indicate that they shouldn't be set. I could have made an immutable
// Constants object of course, but having to type Constants.s every time we
// want to use the south direction is worse than just having a global _s
// variable in my opinion.

global._parentId = '_parentId'
