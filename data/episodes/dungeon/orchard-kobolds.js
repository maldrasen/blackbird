
const pages = {};
pages.start = `You step into what looks like a large underground orchard, filled with rows of dark, twisted trees.
  Before you're able to investigate further though, you hear a sharply backed laugh. Through a break in the trees you
  spot half a dozen kobolds, lounging, snacking on apples. One of them is taking a leak on a tree. They haven't spotted
  you yet.`

const startOptions = [
  { label:`Try to sneak past them.`, jump:'A.sneak' },
  { label:`Ambush them while they're distracted.`, startEncounter: { record:'orchard-kobolds', ambushState:AmbushState.monstersAmbushed }},
  { label:`Speak with them.`, jump:'B.talk' },
];

pages.sneak = `You quietly sneak around the edge of the room, putting more of the trees between you and the lizards.
  They fail to notice you, though you should probably try to leave here before they do.`

pages.talk = `You clear your throat as you approach them. They're startled by your sudden appearance as you walk out
  from the trees, though they don't seem immediately hostile. The one pissing against the tree doesn't even turn 
  around. A large, dark scaled kobold with a broken horn looks you over and says, "What do you want? Can't you see 
  we're on break here?"`

Episode.register('orchard-kobolds',{
  layout: 'centered',
  repeat: true,
  pages: [
    { content:pages.start, buttons:startOptions, buttonsStyle:'column' },
    { content:pages.sneak, label:'A.sneak', end:true },
    { content:pages.talk, label:'B.talk' }
  ],
});
