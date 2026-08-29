
// Copied from the orchard-empty episode. Not really worth making it into a global function.
function getAppleCount() {
  return  Math.ceil(DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size / 5);
}

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

const talkOptions = [
  { label:`"Ahh, sounds lovely. Mind if I join you?"`, jump:'B.join' },
  { label:`"Nice looking apples you've got there. Mind if I grab some?"`, jump:'B.take' },
  { label:`"Nothing really, just passing though."`, jump:'B.nothing' },
];

function tryJoin() {
  const check = SkillCheck(GameSystem.getState().getPlayer(),'conversation',RollMode.advantage);
  if (check < 15) {
    EpisodeSystem.setPropertyValue('join.result', 'fail')
    return `No you can't join`
  }

  EpisodeSystem.setPropertyValue('join.result', 'pass');
  return `OK, let's party`
}

pages.joinFail = ``;
pages.joinPass = ``;

function tryTake() {
  const check = SkillCheck(GameSystem.getState().getPlayer(),'conversation').value;
  if (check < 15) {
    EpisodeSystem.setPropertyValue('take.result', 'fail')
    return `The kobold squints at you with growing suspicion, "Yeah. I know they're nice. They're mine." With a nod 
      from their leader the other kobolds begin to surround you.`
  }

  EpisodeSystem.setPropertyValue('take.result', 'pass');
  return `The kobold chuckles and tosses his half eaten apple at you. "Help yourself sexy."`
}

function takePass() {
  const count = getAppleCount();
  const lootBlock = WeaverElements.lootBlock([{ articleCode:'rhysh-apple', quantity:count }]);

  InventoryManager().addArticle('rhysh-apple',count);

  return `<p>You deftly catch the half eaten apple, and nod at the little creature. "Alright... I'll just, grab some 
    then."</p><p>You walk a short distance away to start harvesting some of the apples from the low hanging branches. 
    He stares at your ass as you reach up to pluck them from the tree, and gives you a wink when you notice his 
    leering.</p>${lootBlock}`;
}

function takeFail() {
  const size = GameSystem.getState().getPartySize();
  const number = EnglishHelper.numberInEnglish(size);

  if (size <= 3) {
    return `You raise your hands and start to back away. Even against kobolds, six to ${number} odds aren't great, 
      especially when they already have you surrounded. And knowing them, there might be a few more you didn't notice
      hiding in the shadows. They're at least willing to let you leave, albeit empty handed.`;
  }

  return `You look at the others and see a few nods in return. Not worth it. "Fine. Fine. Keep your damn apples. We'll 
    just... let you finish your break then." You and your {party} back away slowly. The kobolds eye you warily, but 
    they let you leave without incident.`
}

pages.nothing = `The kobold stares at you for a moment and shrugs. "Nothing huh? Well pass on through then." While not
  necessarily hostile, the look he gives you isn't exactly friendly either. Perhaps it would be best to leave them be.`;

Episode.register('orchard-kobolds',{
  layout: 'centered',
  repeat: true,
  pages: [
    { content:pages.start, buttons:startOptions, buttonsStyle:'column' },
    { content:pages.sneak, label:'A.sneak', end:true },
    { content:pages.talk, label:'B.talk', buttons:talkOptions, buttonsStyle:'column' },
    { contentFunction:tryJoin, label:'B.join' },
    { content:pages.joinPass, requires:EpisodeRequirements.propertyEquals('join.result','pass'), end:true },
    { content:pages.joinFail, requires:EpisodeRequirements.propertyEquals('join.result','fail'), end:true },
    { contentFunction:tryTake, label:'B.take' },
    { contentFunction:takePass, requires:EpisodeRequirements.propertyEquals('take.result','pass'), end:true },
    { contentFunction:takeFail, requires:EpisodeRequirements.propertyEquals('take.result','fail'), end:true },
    { content:pages.nothing, label:'B.nothing' },
  ],
});
