// Every boot path has already set its Environment global by the time the manifest loads (headless: environment.js is
// required first; renderer: the packed object from the main process; browser: browser-shim.js). Methods can't cross
// the IPC boundary with the packed object, so the shared predicates are added here instead, where all three
// environments can pick them up.
global.Environment = Object.freeze({
  ...global.Environment,
  viewPresent: () => HEADLESS === false && Tests.running() === false,
});
