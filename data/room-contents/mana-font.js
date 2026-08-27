
function describe(options) {
  return `TODO: Mana font with a ${options.color} pool.`
}

RoomContents.register('mana-font',{

  // TODO: We need to look into how episodes are triggered from a room's contents. Episodes can repeat, or they can be
  //       one time events. There's nothing that prevents a room's contents from reappearing. A mana font will have
  //       both types of episodes, an episode that starts the first time you arrive in one, and episodes for repeat
  //       visits, so we don't need to worry about if an episode should trigger here. We do need to look though the
  //       array of episodes and return the first valid episode. In the future though there might be contents that
  //       need to be locked after its episode or episodes have been viewed. Also, repeatability is part of the queue
  //       properties, but episodes in room contents aren't queued, they're triggered. Do we need trigger properties?
  //       The requirements are part of the queue as well, so maybe we move those properties both up a level.

  episodes:[
    'nightgaunt-at-the-mana-font', // Executes the first time a pool is found. Non-repeatable.
    'deepen-mana-pool', // Executes every other time, repeatable.
  ],
  description: describe,
});
