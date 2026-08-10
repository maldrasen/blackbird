/*
# Take the Dungeon Oath
This event establishes the role of the Church in the setting. It sets up a small conflict, forcing the player into a
situation where they must take an oath, then soon break it, in order to progress. All the delvers are quickly forced
into this situation where they need to participate in this fiction that the adventurers are delving to destroy the
dungeon, though it's obvious that no one is actually doing that.

This episode will always be one of the first played. At the start of the game the dungeon district is the only other
district that's been unlocked, and this episode fires when you navigate there.

### Facts
- Delvers, despite having taken an oath not to accept power from the dungeon, seem powerful.
- It's common to see parties with a harem configuration. A single male human, with 4 or 5 barely dressed women.
- Wolgur is a city of walls. There aren't a lot of public spaces. Even businesses like shops and bars. There are
  brothels though.
- The proper name for the dungeon is the Great Rhysh Dungeon. It's in the Rhysh valley, and it's big.
 */
const pages = {};
const theOath = `vow to do all in my power to destroy the Rhysh Dungeon, and to never accept the corrupting endowments
  that it offers.`;

pages.travel = `You walk through Wolgur's narrow streets, trying not to look like someone fresh from the farmlands.
  It's difficult though. You walk past several groups of adventurers. Dangerous looking people who surround themselves
  beautiful but inhuman creatures. Most of whom could pass for human except for a few noticeable features; the horns,
  the tails, the thick swinging cocks barely concealed behind a thin skirt or a loincloth. It looks like Wolgur is as
  shameless as the stories make it out to be.`;

pages.empty = `Other than the small bands of delvers, the city seems surprisingly empty. You had expected to see dozens
  of shops and taverns along the main road through town, but Wolgur is strangely closed off. You're surrounded by tall,
  dark stone buildings, all behind gates and walls; nothing open to the public. Borr's central market was more lively
  than this place, with the notable exception of the brothels. You pass by several on your way to the dungeon. It's
  obvious what they are, given the barely dressed or sometimes entirely nude women who smile and wink in your direction
  as you walk past.`;

pages.thePit = `A short while later you find yourself at the gateway to the Great Rhysh Dungeon, a huge, perfectly
  circular hole in the ground. A few small streams cascade over the edge of the pit, the water plunging downward,
  splashing against the walls of the shaft, turning into a thick mist that makes the pit look bottomless. A pair of
  stairways cling to the sides of the pit, angling downward and meeting again at the opposite side of the pit at a
  landing where the actual door to the dungeon sits.`;

pages.approach = `A large man in polished armor is standing guard at the top of the pit where both stairways begin. The
  featureless helmet tilts downward as you approach. "New delver?" The man's voice is strange, reverberating, hollow.`;

const approachButtons = [
  { label:'"Yes."', jump:'A.Yes' },
  { label:'"I just want to take a look."', jump:'B.Look' },
  { label:'"How did you know?"', jump:'C.Know' },
];

// A Branch - Yes I'm new

pages.yesNew = `The man in the armor nods. "Then you must take the delver's oath. Clasp your right hard over your
  heart and repeat after me. I, state your name, ${theOath}"`;
const oathButtons = [
  { label:'"I, state your name..."', jump:'A.A.Slapped' },
  { label:`"I, {P:fullName}, ${theOath}"`, jump:'A.B.Taken-1', requires:CharacterRequirements.isNotNamed('P','Sheepfucker') },
  { label:`"I, {P:fullName}, ${theOath}"`, jump:'A.B.Taken-2', requires:CharacterRequirements.isNamed('P','Sheepfucker') },
  { label:'"What? Why do I have to do that?"', jump:'A.C.Why' },
];

pages.slapped = `<p>The man in the armor slaps you hard across the face with a metal fist. "Try again."</p><p>You rub
  the stinging side of your face, feeling a trickle of blood where his gauntlet bit into your skin.</p>`;
pages.oathTaken1 = `The man in the armor nods, and without much ceremony steps aside. "Very well. You're free to enter
  the dungeon."`;
pages.oathTaken2 = `The man is silent for a moment, your name catching him by surprise perhaps. After an uncomfortable
  pause he finally clears his throat and says, "Very well... Sheepfucker. You're free to enter the dungeon."`
pages.becauseLaw = `The man crosses his arms. "Because it is the law. Take the oath or leave."`;

// A/A Branch - Slapped for being cheeky.

const slappedButtons = [
  { label:`"I, {P:fullName}, ${theOath}"`, jump:'A.B.Taken-1', requires:CharacterRequirements.isNotNamed('P','Sheepfucker') },
  { label:`"I, {P:fullName}, ${theOath}"`, jump:'A.B.Taken-2', requires:CharacterRequirements.isNamed('P','Sheepfucker') },
  { label:'"Why should I?"', jump:'A.C.Why' },
];

// A/C Branch - Why should I?

const finalButtons = [
  { label:`"Very well."`, jump:'A.C.Yes' },
  { label:`"Laws need to have a reason to exist. You can't just slavishly follow them without reason."`, jump:'A.C.Killed' },
  { label:'"No, I refuse."', jump:'Refused' },
];

pages.oathTaken3 = `<p>"Now then. Clasp your right hard over your heart and repeat after me. I, state your name,
  ${theOath}"</p><p>You repeat the short oath, and he gives you a curt nod before stepping aside. "You're free to enter
  the dungeon."</p>`

pages.killed = `<p>The man stares down at you for a moment and nods. "You're right. We should only follow the laws when
  we feel like it. In fact, I don't think the city's provision against murder should really apply right now, do you?"
  </p><p>Faster than you can comprehend, the man's sword leaves it's sheath, passing though your midsection almost
  painlessly. The world spins as the upper half of your body tumbles down into the well like entrance of the dungeon,
  followed a short time later by your legs as the templar kicks them into the pit.</p>`

// B Branch - Just taking a look.

pages.takingALook = `<p>The man lets out a contemptuous snort, "This isn't a goddamned tourest attraction. If you're
  not here to delve, then leave."</p>`;
pages.hereToDelve = `<p>Not wanting to have your access the dungeon blocked you quickly correct him, "No, no I'm here
  to delve. I just wanted to see the great Well before heading in."</p>`;
pages.mustTakeOath = `<p>He stares at you for a moment, then shrugs. "Fine, but before you can go get yourself killed,
  you must take the delver's oath."</p>`;

// C Branch - How do you know?

pages.howDoYouKnow = `<p>The armored man lets out a hollow sounding laugh, "Beyond the fact that I've never seen you,
  not to mention the sorry state of your equipment? You're alone. A component delver would have at least a companion
  or two with them. A man approaching The Well by himself is either fresh or a fool. Usually both."</p><p>"However,
  before you can go get yourself killed, you must take the delver's oath."</p>`;

const otherOathButtons = [
  { label:`"An oath? Why?"`, jump:'C.A.Why' },
  { label:`"Alright, what's this oath?"`, jump:`C.B.WhatOath` },
  { label:`"No, I won't be swearing any oaths."`, jump:'Refused' },
];

// C/B Branch - What's this oath?

pages.whatOath = `<p>"It's a simple matter. More of a formality than anything. The oath states that your intent is to
  destroy the dungeon, and that you will not allow yourself to fall to corruption. Too many have been enthralled by its
  subtle manipulations. Those who do inevitably betray their fellow humans."</p><p>"Clasp your right hard over your
  heart. I'll administer your oath now."</p>`;

const whatOathButtons = [
  { label:'Do as he says', jump:'C.B.Yes-1',  requires:CharacterRequirements.isNotNamed('P','Sheepfucker') },
  { label:'Do as he says', jump:'C.B.Yes-2',  requires:CharacterRequirements.isNamed('P','Sheepfucker') },
  { label:`"Thanks, but I think I'll hold off for now."`, jump:'C.B.No' },
];

const preamble = `<p>You place your hand over your heart as instructed. In his strange hollow voice he says, "Now,
  repeat after me. I, state your name, ${theOath}"</p>`;
pages.oathTaken4 = `${preamble}<p>You repeat the short oath, and he gives you a curt nod before stepping aside.
  "You're free to enter the dungeon."</p>`;
pages.oathTaken5 = `${preamble}<p>After repeating the short oath the man stares at you. After a long, uncomfortable
  pause he finally clears his throat and says, "Very well... Sheepfucker. You're free to enter the dungeon."`;

pages.stopWastingTime = `"Then stop wasting my time."`
pages.refused = `"Then begone."`;

Episode.register('take-the-dungeon-oath',{
  queue: {
    district: 'dungeon',
    on: 'enter',
    priority: EpisodePriority.critical,
  },

  pages: [
    { content:pages.travel },
    { content:pages.empty },
    { content:pages.thePit },

    { content:pages.approach, buttons:approachButtons, buttonsStyle:'column' },
    { content:pages.yesNew, label:'A.Yes', buttons:oathButtons, buttonsStyle:'column' },
    { content:pages.takingALook, label:'B.Look' },
    { content:pages.hereToDelve },
    { content:pages.mustTakeOath, buttons:otherOathButtons, buttonsStyle:'column' },
    { content:pages.howDoYouKnow, label:'C.Know', buttons:otherOathButtons, buttonsStyle:'column' },

    { content:pages.slapped, label:'A.A.Slapped', buttons:slappedButtons, buttonsStyle:'column', damage:5 }, // TODO: Take damage, show damage effect.
    { content:pages.oathTaken1, label:'A.B.Taken-1', setFlag:{[GameFlags.oathTaken]:true }, end:true },
    { content:pages.oathTaken2, label:'A.B.Taken-2', setFlag:{[GameFlags.oathTaken]:true }, end:true }, // TODO: Set a game state flag. We need to hide the enter the dungeon option if this isn't set.
    { content:pages.becauseLaw, label:'A.C.Why', buttons:finalButtons,  buttonsStyle:'column' },
    { content:pages.oathTaken3, label:'A.C.Yes', setFlag:{[GameFlags.oathTaken]:true }, end:true },
    { content:pages.killed, label:'A.C.Killed', gameOver:true }, // TODO: Trigger game over from poor choices. (Is error now, because it's falling through)

    { content:pages.becauseLaw, label:'C.A.Why', buttons:finalButtons, buttonsStyle:'column' },
    { content:pages.whatOath, label:'C.B.WhatOath', buttons:whatOathButtons, buttonsStyle:'column' },
    { content:pages.oathTaken4, label:'C.B.Yes-1', setFlag:{[GameFlags.oathTaken]:true }, end:true },
    { content:pages.oathTaken5, label:'C.B.Yes-2', setFlag:{[GameFlags.oathTaken]:true }, end:true },
    { content:pages.stopWastingTime, label:'C.B.No', end:true },

    { content:pages.refused, label:'Refused' },
  ],

});
