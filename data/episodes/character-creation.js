
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

const goalGlory = `Chose Glory`;
const goalMastery = `Chose Mastery`;
const goalImmortality = `Chose Immortality`;
const goalPower = `Chose Power`;
const goalAuthority = `Chose Authority`;

const goalOptions = [
  { id:'goal.glory',       label:'Glory',       callback:() => { choseGoal('glory',       'strong',    Attrib.strength); }},
  { id:'goal.mastery',     label:'Mastery',     callback:() => { choseGoal('mastery',     'skillful',  Attrib.dexterity); }},
  { id:'goal.immortality', label:'Immortality', callback:() => { choseGoal('immortality', 'healthy',   Attrib.vitality); }},
  { id:'goal.power',       label:'Power',       callback:() => { choseGoal('power',       'smart',     Attrib.intelligence); }},
  { id:'goal.authority',   label:'Authority',   callback:() => { choseGoal('authority',   'beautiful', Attrib.beauty); }},
]

function choseGoal(goal, trigger, attribute) {
  const state = EpisodeSystem.getState();
  addTrigger(trigger);
  state.setPropertyValue('goal',goal);
  state.setPropertyValue('goal-attribute',attribute);
  EpisodeSystem.nextPage();
}

function goalResult() {
  const state = EpisodeSystem.getState();
  const result = WeaverElements.resultBlock(`You've gained ${state.getProperty('goal-attribute')}`, { classname:'gain' });

  switch (EpisodeSystem.getState().getPropertyValue('goal')) {
    case 'glory': return `${result} ${goalGlory}`;
    case 'mastery': return `${result} ${goalMastery}`;
    case 'immortality': return `${result} ${goalImmortality}`;
    case 'power': return `${result} ${goalPower}`;
    case 'authority': return `${result} ${goalAuthority}`;
  }
}

// ===============
//    Choice 2
// ===============
// TODO: Real prose. Older brother left to become an adventurer and hasn't been heard from since; the family home in
//       Wolgur has sat empty ~15 years.

function storyTwoContent() {
  return `<div>
    <p>TODO: Story 2 text.</p>
  </div>`;
}

const storyTwoButtons = [
  { id:'story2OptionA', label:'TODO: Option A', callback:chooseStory2OptionA },
  { id:'story2OptionB', label:'TODO: Option B', callback:chooseStory2OptionB },
  { id:'story2OptionC', label:'TODO: Option C', callback:chooseStory2OptionC },
];

function chooseStory2OptionA() { addTrigger('skillful'); EpisodeSystem.nextPage(); }
function chooseStory2OptionB() { addTrigger('healthy'); EpisodeSystem.nextPage(); }
function chooseStory2OptionC() { addTrigger('weak'); EpisodeSystem.nextPage(); }

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

Episode.register('character-creation', {
  layout: 'large-centered',
  background: 'backgrounds/wood.jpg', // TODO: placeholder background, no dedicated art yet
  pages: [
    { content:goalContent, buttons:goalOptions },
    { contentFunction:goalResult },
    { contentFunction:storyTwoContent, buttons:storyTwoButtons },
    { contentFunction:storyThreeContent, buttons:storyThreeButtons },
    { contentFunction:namingContent, buttons:namingButtons },
  ],
  endFunction: finishCharacterCreation,
});

