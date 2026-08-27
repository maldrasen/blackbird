
function describe(options) {
  return `TODO: Mana font with a ${options.color} pool.`
}

RoomContents.register('mana-font',{

  // The first episode whose requirements pass fires. The nightgaunt episode is one-time, so once it has been viewed
  // every font falls through to the repeatable deepen episode.
  episodes:[
    'nightgaunt-at-the-mana-font',
    'deepen-mana-pool',
  ],
  description: describe,
});
