
// TODO: Find a place for these where they can be shared.
const gainTriggerForAttribute = {
  strength: 'strong',
  dexterity: 'skillful',
  vitality: 'healthy',
  intelligence: 'smart',
  beauty: 'beautiful',
};

const lossTriggerForAttribute = {
  strength: 'weak',
  dexterity: 'clumsy',
  vitality: 'sickly',
  intelligence: 'stupid',
  beauty: 'ugly',
};

function largeNote(text) {
  return `<div class='large-note' style='margin:160px 80px'>${text}</div>`
}

// We don't allow the user to select the same attribute twice, so if they've added the strong trigger with the goal
// choice we need to leave the strength option out of subsequent choices.
function notChosen(attribute) { return state => {
  if (state.getProperty('goal') === attribute) { return false; }
  if (state.getProperty('memory') === attribute) { return false; }
  return true;
}}

function addTrigger(trigger) {
  const triggers = EpisodeSystem.getPropertyValue('triggers') || [];
  triggers.push(trigger);
  EpisodeSystem.setPropertyValue('triggers', triggers);
}

// This episode also creates the legacy, which is given the family name.
function finishCharacterCreation() {
  const triggers = EpisodeSystem.getPropertyValue('triggers');
  const givenName = EpisodeSystem.getPropertyValue('givenName');
  const familyName = EpisodeSystem.getPropertyValue('familyName');

  const playerId = PlayerFactory.build({ name:givenName, triggers });

  GameState.setPlayer(playerId);
  GameState.setCurrentLocation('family-home-living-room');
  GameState.setGameMode(GameMode.location);
}

// =====================
//    Choice 1 - Goal
// =====================

const goalContent = `
  <p>
    You've been following the long winding road to Wolgur for three days now, stopping at the few established camps
    between the distant farmlands and your new home. You crest the next hill finally catch a glimpse of the city,
    emerging from the thick mist that perpetually clings to the Rhysh valley. You're closer than you thought you were.
    You adjust the heavy pack on your back and walk a little faster now that your goal is in sight.
  </p><p>
    Having lived your entire life in Borr, you're not sure what to expect from the dungeon city. You've heard the 
    stories of course; tales of violence and utter decadence which, rather than dissuading you from this path, may have
    actually hastened your decision to take up the life of a delver.
  </p><p>
    However, there's one thing above all others that you desire. What is it?
  </p>`;

const goalGlory = `You will walk the path of glory. The very stones of the dungeon will tremble at your approach, and they will know you by the corpses left in your wake.`;
const goalMastery = `Only those who have mastered the delver's arts can hope to survive in such a world.`;
const goalImmortality = `They say those who have delved the deepest have uncovered the secrets to eternal life.`;
const goalPower = `They say the dungeon is filled with wonders, and true power can be found by those who can unravel its secrets.`;
const goalAuthority = `You may have come from nothing, but you will gather allies, rise up in this world, and take your position as its master.`;

const goalOptions = [
  { id:'goal-glory',       label:'Glory',       callback:() => { choseGoal(Attrib.strength);     }},
  { id:'goal-mastery',     label:'Mastery',     callback:() => { choseGoal(Attrib.dexterity);    }},
  { id:'goal-immortality', label:'Immortality', callback:() => { choseGoal(Attrib.vitality);     }},
  { id:'goal-power',       label:'Power',       callback:() => { choseGoal(Attrib.intelligence); }},
  { id:'goal-authority',   label:'Authority',   callback:() => { choseGoal(Attrib.beauty);       }},
]

function choseGoal(goal) {
  addTrigger(gainTriggerForAttribute[goal]);
  EpisodeSystem.getState().setPropertyValue('goal',goal);
  EpisodeSystem.nextPage();
}

function goalResult() {
  const goal = EpisodeSystem.getState().getProperty('goal');
  const result = WeaverElements.resultBlock(`You've gained ${goal}`, { classname:'gain' });

  switch (goal) {
    case Attrib.strength: return `${result} ${largeNote(goalGlory)}`;
    case Attrib.dexterity: return `${result} ${largeNote(goalMastery)}`;
    case Attrib.vitality: return `${result} ${largeNote(goalImmortality)}`;
    case Attrib.intelligence: return `${result} ${largeNote(goalPower)}`;
    case Attrib.beauty: return `${result} ${largeNote(goalAuthority)}`;
  }
}

// =======================
//    Choice 2 - Memory
// =======================

const memoryContent = `
  <p>
    Your pulse quickens as you consider what could be. The thought of what you might find in Wolgur is sobering 
    though. Your older brother set out to become a delver himself some three years ago, with promises to send money 
    back home once he'd established himself. He hasn't been heard from since.
  </p><p>
    It's no mystery what must have happened. While the dungeon rewards the strong, or perhaps just the lucky, it
    consumes the rest. Your father, a delver himself, disappeared into the Rhysh dungeon before you were born. Still,
    you try to hold onto the hope that maybe your brother yet lives; that his silence is a sign of his success rather 
    than his demise. 
  </p>
  <p>
    Whenever your thoughts turn to your brother an old memory resurfaces. What is it?
  </p>`;

const mStr = `The two of you were always wrestling. You've been pinned to the ground more often than you can count. One day, you finally manage to best him.`;
const mDex = `You're a boy, being taught to ride for the first time. You kick the horse and it panics, carrying you off into the wood.`;
const mVit = `It's winter, the night before the Long Dawn. Your brother has the blood itch, tied down to his bed while you tend to him.`;
const mInt = `You're up late reading again. When your brother asks you what your book is about, and you're forced to make up something on the spot.`;
const mBut = `The two of you are deep in the woods, hiding in the bushes, watching as the woodnymphs bathe in a stream.`;

const memoryStr = `A year later you were taller than he was. He was starting to regret all the times he made you eat dirt.`
const memoryDex = `You somehow managed to hold on, and the horse forgave you… eventually.`;
const memoryVit = `A horrifying disease, the way the sick will scratch at themselves. It's remarkable how you've never been seriously ill.`;
const memoryInt = `It was actually a rather lurid tale about a nearsighted milkmaid and the farm's bull.`;
const memoryBut = `Looking back on it, you're pretty sure that the nymphs knew you were there all along.`;

const memoryOptions = [
  { id:'memory-strength',     label:mStr, requires:[notChosen(Attrib.strength)],     callback: () => { chooseMemory(Attrib.strength)     }},
  { id:'memory-dexterity',    label:mDex, requires:[notChosen(Attrib.dexterity)],    callback: () => { chooseMemory(Attrib.dexterity)    }},
  { id:'memory-vitality',     label:mVit, requires:[notChosen(Attrib.vitality)],     callback: () => { chooseMemory(Attrib.vitality)     }},
  { id:'memory-intelligence', label:mInt, requires:[notChosen(Attrib.intelligence)], callback: () => { chooseMemory(Attrib.intelligence) }},
  { id:'memory-beauty',       label:mBut, requires:[notChosen(Attrib.beauty)],       callback: () => { chooseMemory(Attrib.beauty)       }},
];

function chooseMemory(memory) {
  addTrigger(gainTriggerForAttribute[memory]);
  EpisodeSystem.getState().setPropertyValue('memory',memory);
  EpisodeSystem.nextPage();
}

function memoryResult() {
  const memory = EpisodeSystem.getState().getProperty('memory');
  const result = WeaverElements.resultBlock(`You've gained ${memory}`, { classname:'gain' });

  switch (memory) {
    case Attrib.strength: return `${result} ${largeNote(memoryStr)}</div>`;
    case Attrib.dexterity: return `${result} ${largeNote(memoryDex)}</div>`;
    case Attrib.vitality: return `${result} ${largeNote(memoryVit)}</div>`;
    case Attrib.intelligence: return `${result} ${largeNote(memoryInt)}</div>`;
    case Attrib.beauty: return `${result} ${largeNote(memoryBut)}</div>`;
  }
}

// =======================
//    Choice 3 - Regret
// =======================

const regretContent = `<p>What choice will you always regret?</p>`

const regretOptions = [
  { id:'regret-strength',     label:'-str', requires:[notChosen(Attrib.strength)],     callback: () => { chooseRegret(Attrib.strength); }},
  { id:'regret-dexterity',    label:'-dex', requires:[notChosen(Attrib.dexterity)],    callback: () => { chooseRegret(Attrib.dexterity); }},
  { id:'regret-vitality',     label:'-vit', requires:[notChosen(Attrib.vitality)],     callback: () => { chooseRegret(Attrib.vitality); }},
  { id:'regret-intelligence', label:'-int', requires:[notChosen(Attrib.intelligence)], callback: () => { chooseRegret(Attrib.intelligence); }},
  { id:'regret-beauty',       label:'-but', requires:[notChosen(Attrib.beauty)],       callback: () => { chooseRegret(Attrib.beauty); }},
];

function chooseRegret(regret) {
  addTrigger(lossTriggerForAttribute[regret]);
  EpisodeSystem.getState().setPropertyValue('regret',regret);
  EpisodeSystem.nextPage();
}

function regretResult() {
  const regret = EpisodeSystem.getState().getProperty('regret');
  const result = WeaverElements.resultBlock(`You've lost ${regret}`, { classname:'loss' });

  switch (regret) {
    case Attrib.strength: return `${result} [Strength Choice]`;
    case Attrib.dexterity: return `${result} [Dexterity Choice]`;
    case Attrib.vitality: return `${result} [Vitality Choice]`;
    case Attrib.intelligence: return `${result} [Intelligence Choice]`;
    case Attrib.beauty: return `${result} [Beauty Choice]`;
  }
}

// ===============
//    Naming
// ===============

const nameContent = `
  <p>
    Your steps carry you closer to the city gate, now looming in the swirling mists above you. Given that the city is
    situated in a deep valley, the outer wall spans between the two rocky cliff faces on either side. What had been a
    dirt path is now worn stone, dark and slick.
  </p>
  <p>
    As you approach the gate you don't anticipate any problems. You should be able to enter the city freely as someone
    whose family <i>technically</i> owns a home here. The condition of the home is… unknown at the moment. After your 
    father died your mother abandoned the old home here in Wolgur, so it's been empty for almost two decades now.
  </p>
  <p>
    You're met at the gate by one of the city guards, a tall black furred lupin. You give him your name and purpose 
    for coming. Your house is unknown, forgotten, almost as bad as having no house at all. The guard looks you over 
    with a contemptuous sneer. He takes a deep breath, taking in your scent. "All right sheep fucker, fill this in 
    and be on your way."
  </p>
  <p> 
    He hands you a scrap of paper, already partially filled in…
  </p>
  <div class='border-normal padding inline-fields'>
    <div class='field-row'>
      <label>Given Name:</label>
      <input type='text' id='givenName' value='Sheepfucker'/>
    </div>
    <div class='field-row'>
      <label>Family Name:</label>
      <input type='text' id='familyName'/>
    </div>
  </div>`;

const nameButtons = [
  { id:'nameSubmitButton', label:'Continue', classname:['button-primary','disabled'], callback:submitName },
];

// The other game starts will have something similar, checking given name as the legacy name should be set. We'll
// need to make this a general page function then. Page data will need to include a list of inputs and a validator
// function for each one. We'd need to pass the button id as well.
function bindNameInputs() {
  X.first('#familyName').addEventListener('keyup', () => {
    (X.first('#familyName').value.trim().length > 0) ?
      X.removeClass('#nameSubmitButton','disabled') :
      X.addClass('#nameSubmitButton','disabled');
  });
}

function submitName() {
  const givenName = X.first('#givenName').value.trim() || 'Sheepfucker';
  const familyName = X.first('#familyName').value.trim();

  console.log(`Given Name[${givenName}]`)
  console.log(`Family Name[${familyName}]`)

  EpisodeSystem.setPropertyValue('givenName', givenName);
  EpisodeSystem.setPropertyValue('familyName', familyName);
  EpisodeSystem.nextPage();
}


const acceptName = `Sheepfucker, why not...`
const changeName = `Ahh hell no...`


// ==============
//    Register
// ==============

Episode.register('game-start-1', {
  layout: 'large-centered',
  background: 'backgrounds/wood.jpg',
  pages: [
    { content:goalContent, buttons:goalOptions, buttonsStyle:'column' },
    { contentFunction:goalResult },
    { content:memoryContent, buttons:memoryOptions, buttonsStyle:'column' },
    { contentFunction:memoryResult },
    { content:regretContent, buttons:regretOptions, buttonsStyle:'column' },
    { contentFunction:regretResult },
    { content:nameContent, buttons:nameButtons, onShow:bindNameInputs },
    { content:acceptName, requires:(state) => { return true; } },
    { content:changeName, requires:(state) => { return false; } }
  ],
  endFunction: finishCharacterCreation,
});
