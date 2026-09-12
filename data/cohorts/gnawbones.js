
const normal = WeaverPackage('cohort.gnawbones.N');
const ambush = WeaverPackage('cohort.gnawbones.PA');
const surprise = WeaverPackage('cohort.gnawbones.MA');

Cohort.register('gnawbones',{
  monsters:[
    'gnawbones'
  ],
  startText:{
    normal: normal,
    partyAmbushed: ambush,
    monstersAmbushed: surprise,
  },
});

normal.add(`You come across a squat furry creature, sniffing at the ground while waddling towards you in an ungainly
  fashion. When it catches your scent it looks up, snorts loudly, and starts rushing in your direction.`,
  BattleRequirements.againstSingle());
normal.add(`You come across a small group of squat furry creatures, sniffing the ground, searching for a fresh corpse
  to devour. Upon seeing you, they decide that you'll do in a pinch.`, BattleRequirements.againstMultiple());

ambush.add(`You hear a loud snuffling sound behind you and whip around as a gnawbones charges in your direction,
  somewhat embarrassed at being surprised by the dungeon's least stealthy creature.`,BattleRequirements.againstSingle());
ambush.add(`You hear a loud snuffling sound behind you and whip around as gnawbones charge in your direction, somewhat
  embarrassed at being surprised by the dungeon's least stealthy creature.`,BattleRequirements.againstMultiple());

surprise.add(`You come across one of the small furry dungeon scavengers, buried face deep in the chest cavity of a
  dead kobold, too busy feasting to notice you.`, BattleRequirements.againstSingle());
surprise.add(`You hear the sounds of soft grunting and wet plaps as you come across a pair of mating gnawbones, too
  busy fucking to notice your approach.`,BattleRequirements.against(2));
surprise.add(`A small pack of gnawbones are busy fighting over what remains of some unidentifiable carrion in the
  corner of the room. They're too busy snarling and snapping at each other to notice your approach.`,
  BattleRequirements.againstAtLeast(3));
