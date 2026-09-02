
// Starting an episode in the dungeon entrance isn't possible without some special handling. Instead, I'm adding an
// inspect button to optionally start this episode.
RoomContents.register('dungeon-entrance', {
  description: `The entrance chamber is filled with the sound of gently falling water. The rippling pool sparkles 
    brightly, as though catching rays of sunlight. The narrow causeway, flanked by statues of twelve faceless and 
    impossibly well endowed creatures, leads to a stout wooden door and the dungeon beyond.`,
  commands:[{ label:'Inspect', startEpisode:`dungeon-entrance` }],
});
