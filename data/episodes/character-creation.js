
// ===============
//    Story 1
// ===============
// TODO: Real prose. Father was an adventurer who vanished in the dungeon shortly before the player was born.

function storyOneContent() {
  return `<div>
    <p>TODO: Story 1 text.</p>
  </div>`;
}

const storyOneButtons = [
  { id:'story1OptionA', label:'TODO: Option A', callback:chooseStory1OptionA },
  { id:'story1OptionB', label:'TODO: Option B', callback:chooseStory1OptionB },
  { id:'story1OptionC', label:'TODO: Option C', callback:chooseStory1OptionC },
];

function chooseStory1OptionA() { addTrigger('strong'); EpisodeSystem.nextPage(); }
function chooseStory1OptionB() { addTrigger('smart'); EpisodeSystem.nextPage(); }
function chooseStory1OptionC() { addTrigger('beautiful'); EpisodeSystem.nextPage(); }

// ===============
//    Story 2
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
//    Story 3 (aspect)
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
  layout: 'centered',
  background: 'backgrounds/wood.jpg', // TODO: placeholder background, no dedicated art yet
  pages: [
    { contentFunction:storyOneContent, buttons:storyOneButtons },
    { contentFunction:storyTwoContent, buttons:storyTwoButtons },
    { contentFunction:storyThreeContent, buttons:storyThreeButtons },
    { contentFunction:namingContent, buttons:namingButtons },
  ],
  endFunction: finishCharacterCreation,
});

