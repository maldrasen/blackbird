
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

const goalGlory = `You will walk the path of glory. The very stones of the dungeon will tremble at your approach.`;
const goalMastery = `Only those who have mastered the delver's arts can hope to survive in such a world.`;
const goalImmortality = `They say those who have delved the deepest have uncovered the secrets to eternal life.`;
const goalPower = `The dungeon itself grants power to those who can overcome its challenges.`;
const goalAuthority = `You may have come from nothing, but you will rise up in this world and take your position as its master.`;

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
    case Attrib.strength: return `${result} ${goalGlory}`;
    case Attrib.dexterity: return `${result} ${goalMastery}`;
    case Attrib.vitality: return `${result} ${goalImmortality}`;
    case Attrib.intelligence: return `${result} ${goalPower}`;
    case Attrib.beauty: return `${result} ${goalAuthority}`;
  }
}

// =======================
//    Choice 2 - Memory
// =======================

const memoryContent = `
  <p>Your pulse quickens at the thought of what could be.</p>
  <p>What memory from home will you cherish?</p>`;

const memoryOptions = [
  { id:'memory-strength',     label:'+str', requires:[notChosen(Attrib.strength)],     callback: () => { chooseMemory(Attrib.strength)     }},
  { id:'memory-dexterity',    label:'+dex', requires:[notChosen(Attrib.dexterity)],    callback: () => { chooseMemory(Attrib.dexterity)    }},
  { id:'memory-vitality',     label:'+vit', requires:[notChosen(Attrib.vitality)],     callback: () => { chooseMemory(Attrib.vitality)     }},
  { id:'memory-intelligence', label:'+int', requires:[notChosen(Attrib.intelligence)], callback: () => { chooseMemory(Attrib.intelligence) }},
  { id:'memory-beauty',       label:'+but', requires:[notChosen(Attrib.beauty)],       callback: () => { chooseMemory(Attrib.beauty)       }},
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
    case Attrib.strength: return `${result} [Strength Choice]`;
    case Attrib.dexterity: return `${result} [Dexterity Choice]`;
    case Attrib.vitality: return `${result} [Vitality Choice]`;
    case Attrib.intelligence: return `${result} [Intelligence Choice]`;
    case Attrib.beauty: return `${result} [Beauty Choice]`;
  }
}

// =======================
//    Choice 3 - Regret
// =======================

// TODO: Real prose. Traveling to Wolgur, finding the home in ruins with a squatter's camp and no brother in sight.

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

// A guard at the gate to Wolgur asks for the character's name.

const nameContent = `
  <p>
    The guard, a tall black furred lupin, looks you over with a contemptuous sneer. He takes a deep breath, taking in 
    your scent. "All right sheep fucker, fill this in and be on your way."
  </p>
  <p> 
    He hands you a scrap of paper, already partially filled in…
  </p>
  <div class='border-normal padding inline-fields'>
    <div class='field-row'>
      <label>Given Name:</label>
      <input type='text' id='givenName' placeholder='Sheepfucker' />
    </div>
    <div class='field-row'>
      <label>Family Name:</label>
      <input type='text' id='familyName' placeholder='' />
    </div>
  </div>`;

const nameButton = [
  { id:'nameSubmitButton', label:'Continue', classname:'disabled', callback:submitName },
];

function submitName() {
  const givenName = X.first('#givenName').value.trim() || 'Sheepfucker';
  const familyName = X.first('#familyName').value.trim();

  console.log(`Given Name[${givenName}]`)
  console.log(`Family Name[${familyName}]`)

  EpisodeSystem.setPropertyValue('givenName', givenName);
  EpisodeSystem.setPropertyValue('familyName', familyName);
  EpisodeSystem.nextPage();
}

// ===============
//    Shared
// ===============

Episode.register('game-start-1', {
  layout: 'large-centered',
  background: 'backgrounds/wood.jpg',
  pages: [
    { content:goalContent, buttons:goalOptions },
    { contentFunction:goalResult },
    { content:memoryContent, buttons:memoryOptions },
    { contentFunction:memoryResult },
    { content:regretContent, buttons:regretOptions },
    { contentFunction:regretResult },
    { content:nameContent, buttons:nameButton },
  ],
  endFunction: finishCharacterCreation,
});

