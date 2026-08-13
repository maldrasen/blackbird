
// The Environment object comes from the Node side when the application loads, but functions can't pass through the
// IPC boundry.
Environment.viewPresent = function() {
  return HEADLESS === false && Tests.running() === false;
}
