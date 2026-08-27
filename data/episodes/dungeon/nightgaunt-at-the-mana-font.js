

const pages = {};
pages.start1 = `When you enter the room your hand tightens around your weapon when you see what waits within. A gaunt
  figure, draped in a dark glistening cloak. Your breath catches in your throat as it turns to look at you. It's dark
  skin is stretched tightly over a blank featureless face. Though it lacks eyes you can feel the menace in its gaze,
  and when it speaks you hear its voice echoing in your skull.`
pages.start2 = `An unblessed being enters into these sacred halls. Come mortal. Drink of this divine nectar.`
pages.start3 = `The creature steps aside, gesturing to the ornate fountain behind him. Like the pool in the entrance
  hall, the water sparkles as if reflecting a bright unseen source. The glimmering rays reflect off of the creature's
  wet looking skin. You realise that what you thought was a dark cloak is actually an extension of its body; a thin
  membrane like a bat's wing that it keeps tightly wrapped around itself.`;
pages.start4 = `Something about this thing makes you think that attacking it would be a phenomenally stupid idea, 
  leaving you with the choice to do as it bids, or politely decline.`

const startButtons = [
  { label:'Drink from the fountain.', jump:'A.accept' },
  { label:'Refuse', jump:'B.refuse' },
]

const refuseButtons = [
  { label:'Are you sure about that', jump:'B.A.killed' },
  { label:'Change Mind', jump:'B.B.accept' },
]

Episode.register('nightgaunt-at-the-mana-font',{
  pages: [
    { content:pages.start1 },
    { contentFunction: () => { return WeaverElements.telepathy(pages.start2); }},
    { content:pages.start3 },
    { content:pages.start4, buttons:startButtons, buttonsStyle:'column' },
    { content:'OK I drinked it.', label:'A.accept', end:true },
    { content:'Nope, not drinked it.', label:'B.refuse', buttons:refuseButtons, buttonsStyle:'column' },
    { content:'It kills you', label:'B.A.killed', gameOver:true },
    { content:'You drinked anyway', label:'B.B.accept', end:true },
  ],
});
