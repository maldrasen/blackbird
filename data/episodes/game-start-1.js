
// =====================
//    Choice 1 - Goal
// =====================

// TODO: Find a place for this where it can be shared.
const triggerForAttribute = {
  strength: 'strong',
  dexterity: 'skillful',
  vitality: 'healthy',
  intelligence: 'smart',
  beauty: 'beautiful',
}

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
  addTrigger(triggerForAttribute[goal]);
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

// ===============
//    Choice 2
// ===============

const memoryContent = `
  <p>Your pulse quickens at the thought of what could be.</p>
  <p>What memory from home will you cherish?</p>
`

// We don't allow the user to select the same attribute twice, so if they've added the strong trigger with the goal
// choice we need to hide the strength option from the memory choice.
function hideGoalOption() {
  X.addClass(`#memory-${EpisodeSystem.getState().getProperty('goal')}`,'hide');
}

const memoryOptions = [
  { id:'memory-strength',     label:'TODO: Option A', callback: () => { chooseMemory(Attrib.strength)     }},
  { id:'memory-dexterity',    label:'TODO: Option B', callback: () => { chooseMemory(Attrib.dexterity)    }},
  { id:'memory-vitality',     label:'TODO: Option C', callback: () => { chooseMemory(Attrib.vitality)     }},
  { id:'memory-intelligence', label:'TODO: Option C', callback: () => { chooseMemory(Attrib.intelligence) }},
  { id:'memory-beauty',       label:'TODO: Option C', callback: () => { chooseMemory(Attrib.beauty)       }},
];

function chooseMemory(memory) {
  addTrigger(triggerForAttribute[memory]);
  EpisodeSystem.getState().setPropertyValue('memory',memory);
  EpisodeSystem.nextPage();
}

// ===============
//    Choice 3 (aspect)
// ===============
// TODO: Real prose. Traveling to Wolgur, finding the home in ruins with a squatter's camp and no brother in sight,
//       landing on the sheep accusation. Response picks an aspect.

function storyThreeContent() {
  return `<div>
    <p>TODO: Story 3 text.</p>
  </div>`;
}

const storyThreeButtons = [
  { id:'story3OptionA', label:'TODO: Option A', callback:chooseStory3OptionA },
  { id:'story3OptionB', label:'TODO: Option B', callback:chooseStory3OptionB },
  { id:'story3OptionC', label:'TODO: Option C', callback:chooseStory3OptionC },
];

// TODO: These aspect codes are placeholders standing in for whatever this story actually grants. Replace once
//       there's a proper Aspect record with names/descriptions to choose from.
function chooseStory3OptionA() { addTrigger('flexible:1'); EpisodeSystem.nextPage(); }
function chooseStory3OptionB() { addTrigger('premature:1'); EpisodeSystem.nextPage(); }
function chooseStory3OptionC() { addTrigger('productive:1'); EpisodeSystem.nextPage(); }

// ===============
//    Naming
// ===============
// TODO: Real prose. A guard at the gate to Wolgur asks for the character's name.

function namingContent() {
  return `<div>
    <p>TODO: Naming text.</p>
    <input type='text' id='characterNameInput' placeholder='Enter your name' />
  </div>`;
}

const namingButtons = [
  { id:'nameSubmitButton', label:'Continue', callback:submitName },
];

function submitName() {
  const input = X.first('#characterNameInput');
  const name = (input.value || '').trim() || 'Wanderer';
  EpisodeSystem.setPropertyValue('name', name);
  EpisodeSystem.nextPage();
}

// ===============
//    Shared
// ===============

function addTrigger(trigger) {
  const triggers = EpisodeSystem.getPropertyValue('triggers') || [];
  triggers.push(trigger);
  EpisodeSystem.setPropertyValue('triggers', triggers);
}

function finishCharacterCreation() {
  const triggers = EpisodeSystem.getPropertyValue('triggers') || [];
  const name = EpisodeSystem.getPropertyValue('name');

  const playerId = PlayerFactory.build({ name, triggers });

  GameState.setPlayer(playerId);
  GameState.setCurrentLocation('family-home-living-room');
  GameState.setGameMode(GameMode.location);
}

Episode.register('game-start-1', {
  layout: 'large-centered',
  background: 'backgrounds/wood.jpg', // TODO: placeholder background, no dedicated art yet
  pages: [
    { content:goalContent, buttons:goalOptions },
    { contentFunction:goalResult },
    { content:memoryContent, buttons:memoryOptions, onShow:hideGoalOption },
    { contentFunction:storyThreeContent, buttons:storyThreeButtons },
    { contentFunction:namingContent, buttons:namingButtons },
  ],
  endFunction: finishCharacterCreation,
});

