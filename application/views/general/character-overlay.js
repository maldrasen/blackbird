global.CharacterOverlay = (function() {

  // The CharacterOverlay is a good example of how the overlay window lifecycle can work. Loading an HTML file from
  // disk is fast enough to not worry about. If we get a fresh copy of the template every time there's no need to
  // worry about clearing the previous character. The only things that really has to happen when opening an overlay is
  // the overlay module needs to be pushed onto the WindowManager stack, and the overlay and cover should both be
  // shown. The WindowManager calls the close() function when the window is popped off the stack. The close() function
  // should empty the overlay, and hide it and the cover.

  let $id, $character;

  function init() {
    X.onClick('start-training', sendStartTrainingCommand);
  }

  // Because the CharacterOverlay displays available character actions, we might need some other options here.
  // Everything I need now though I can determine from the current state and the character data I think.
  //
  // Options
  //   id*  Character entity id.
  //
  function open(options) {
    $id = options.id;
    $character = Character($id);

    X.loadDocument('#characterOverlay','views/character-overlay.html');

    update();

    WindowManager.push(CharacterOverlay)
    X.removeClass('#characterOverlay','hide');
    X.removeClass('#overlayCover','hide');
  }

  function close() {
    X.empty('#characterOverlay');
    X.addClass('#characterOverlay','hide');
    X.addClass('#overlayCover','hide');
  }

  function update() {
    console.log("Update this.")

    X.fill('#characterOverlay .actor-row .full-name', $character.getFullName());
    X.fill('#characterOverlay .actor-row .species', $character.getSpeciesName());
    X.fill('#characterOverlay .actor-row .gender', $character.getGenderName());

    X.fill('#characterOverlay .health-panel .health', getHealthBar());
    X.fill('#characterOverlay .health-panel .stamina', getStaminaBar());
    X.fill('#characterOverlay .health-panel .arousal', getArousalBar());

    X.fill('#characterOverlay .mana-panel .red', getManaBar('red'));
    X.fill('#characterOverlay .mana-panel .yellow', getManaBar('yellow'));
    X.fill('#characterOverlay .mana-panel .green', getManaBar('green'));
    X.fill('#characterOverlay .mana-panel .blue', getManaBar('blue'));
    X.fill('#characterOverlay .mana-panel .black', getManaBar('black'));

    X.fill('#characterOverlay .feelings-panel .control', getControlBar());
    X.fill('#characterOverlay .feelings-panel .affection', getFeelingsBar('affection'));
    X.fill('#characterOverlay .feelings-panel .respect', getFeelingsBar('respect'));
    X.fill('#characterOverlay .feelings-panel .fear', getFeelingsBar('fear'));

    X.fill('#characterOverlay .attributes-panel .strength', getAttributeBar('strength'));
    X.fill('#characterOverlay .attributes-panel .dexterity', getAttributeBar('dexterity'));
    X.fill('#characterOverlay .attributes-panel .vitality', getAttributeBar('vitality'));
    X.fill('#characterOverlay .attributes-panel .intelligence', getAttributeBar('intelligence'));
    X.fill('#characterOverlay .attributes-panel .beauty', getAttributeBar('beauty'));

    fillAspects();
    fillMarks();
    fillSexualPreferences();
    fillSensitivities();
    fillAnima();
    fillAnimus();
    fillSkills();
  }

  function getHealthBar() {
    const health = HealthComponent.lookup($id);
    return `Health (${health.currentHealth}/${health.maxHealth})`;
  }

  function getStaminaBar() {
    const current = Math.round(HealthComponent.lookup($id).currentStamina);
    const max = Math.round(AttributesComponent.createWrapper({ id:$id }).getMaxStamina());
    return `Stamina (${current}/${max})`;
  }

  function getArousalBar() {
    const arousal = ArousalComponent.lookup($id).arousal;
    return `Arousal (${arousal}/100)`;
  }

  // TODO: Implement Mana
  function getManaBar(color) {
    return `${StringHelper.titlecase(color)} Mana(0/0)`
  }

  function getControlBar() {
    const control = ControlledComponent.lookup($id);
    return `Control ${control.control}`
  }

  // I think it's safe to say that the feelings panel should always show the feelings directed towards the player in
  // the status screen. The feelings towards other characters are essentially hidden though.
  function getFeelingsBar(feel) {
    const feelings = FeelingsComponent.findByTarget($id, GameState.getPlayer());
    const value = feelings[feel];
    const letter = feelingLetterValue(value);
    const range = feelingsLetterRange(value);
    const remainder = feelingsLetterRemainder(value);
    return `${StringHelper.titlecase(feel)} ${letter} (${remainder}/${range})`;
  }

  function getAttributeBar(attr) {
    const attributes = AttributesComponent.lookup($id);
    return `${StringHelper.titlecase(attr)} ${attributes[attr]}`;
  }

  function fillAspects() {
    const aspects = AspectsComponent.lookup($id);
    const keys = Object.keys(aspects);
    const list = ListBuilder(`div`,`tag-area`);

    if (keys.length === 0) {
      X.addClass(`#characterOverlay .aspects-area`,'hide');
    }

    if (keys.length > 0) {
      keys.forEach(key => { list.add(makeTag(AspectType[key], aspects[key], 'aspect-tag')); });
      X.fill('#characterOverlay .aspects-area', X.createElement(list.getList()));
    }
  }

  // TODO: Fill marks area once we have any.
  function fillMarks() {
    X.addClass(`#characterOverlay .marks-area`,'hide');
  }

  function fillSexualPreferences() {
    const sexualPreferences = SexualPreferencesComponent.lookup($id);
    const list = ListBuilder(`div`,`tag-area`)

    Object.keys(sexualPreferences).forEach(key => {
      const preference = SexualPreference.lookup(key);
      const value = sexualPreferences[key];
      const name = (value >= 0) ? preference.getName() : preference.getAntiname();
      const letter = preferenceLetterValue(Math.abs(value));

      list.add(makeTag(name, letter, `sexual-preference-tag strength-${letter}`));
    });

    X.fill('#characterOverlay .sexual-preferences-area', X.createElement(list.getList()));
  }


  function fillSensitivities() {
    const sensitives = SensitivitiesComponent.lookup($id);
    const list = ListBuilder(`div`,`tag-area`)

    Object.keys(sensitives).forEach(key => {
      const letter = sensitivityLetterValue(sensitives[key]);
      const label = `${StringHelper.titlecase(key)} Sensitivity`
      list.add(makeTag(label, letter, `sensitivity-tag strength-${letter}`));
    });

    X.fill('#characterOverlay .sensitivities-area',X.createElement(list.getList()));
  }

  function fillAnima() {
    const anima = AnimaComponent.lookup($id);
    const list = ListBuilder('ul');

    Object.keys(anima).forEach(key => {
      if (anima[key] > 0) {
        list.add(`<li>${StringHelper.titlecase(key)} ${anima[key]}</li>`);
      }
    });

    X.fill('#characterOverlay .anima-area',X.createElement(list.getList()));
  }

  function fillAnimus() {
    const animus = AnimusComponent.lookup($id);
    const list = ListBuilder('ul');

    Object.keys(animus).forEach(key => {
      if (animus[key] > 0) {
        list.add(`<li>${StringHelper.titlecase(key)} ${animus[key]}</li>`);
      }
    });

    X.fill('#characterOverlay .animus-area',X.createElement(list.getList()));
  }

  function fillSkills() {
    const skills = SkillsComponent.lookup($id);
    const list = ListBuilder(`div`,`tag-area`);

    Object.keys(skills).forEach(code => {
      const skill = Skill.lookup(code)
      if (skills[code] > 0) {
        list.add(makeTag(skill.getName(), skills[code], 'skill-tag'));
      }
    });

    X.fill('#characterOverlay .skills-area', X.createElement(list.getList()));
  }




  function makeTag(label,value,classname) {
    return `<div class='${classname} tag'>
      <span class='label'>${label}</span>
      <span class='value'>${value}</span>
    </div>`
  }

  // Value will be between 0 and 1000. Over 500 is within the unobtainable S ranks.
  function feelingLetterValue(value) {
    if (value <= 100) { return 'F'; }
    if (value <= 200) { return 'D'; }
    if (value <= 400) { return 'C'; }
    if (value <= 500) { return 'B'; }
    if (value <= 600) { return 'A'; }
    if (value <= 800) { return 'S'; }
    if (value <= 900) { return 'SS'; }
    return 'SSS';
  }

  // Prolly a better way to do this, but I'm lazy.
  function feelingsLetterRange(value) {
    if (value <= 100) { return 100; }
    if (value <= 200) { return 100; }
    if (value <= 400) { return 200; }
    if (value <= 500) { return 100; }
    if (value <= 600) { return 100; }
    if (value <= 800) { return 200; }
    if (value <= 900) { return 100; }
    return 100
  }

  function feelingsLetterRemainder(value) {
    if (value <= 100) { return value; }
    if (value <= 200) { return value-100; }
    if (value <= 400) { return value-200; }
    if (value <= 500) { return value-400; }
    if (value <= 600) { return value-500; }
    if (value <= 800) { return value-600; }
    if (value <= 900) { return value-800; }
    return value-900;
  }

  // Value will be between 1-8
  function sensitivityLetterValue(value) {
    return ['','F','D','C','B','A','S','SS','SSS'][value];
  }

  // Value will be between 0-100 (for now, S ranks will be implemented later)
  function preferenceLetterValue(value) {
    if (value <= 20) { return `F`; }
    if (value <= 40) { return `D`; }
    if (value <= 60) { return `C`; }
    if (value <= 80) { return `B`; }
    if (value <= 100) { return `A`; }
    if (value <= 150) { return `S`; }
    if (value <= 200) { return `SS`; }
    return `SSS`
  }

  // TODO: Right now clicking on a character will just start the training mode with that character. Once I have more
  //       of the game's systems done clicking a character here should either start some kind of character interaction
  //       view or character inspection view. From there you can talk to them or see their character sheet and start
  //       the training mode. You should be able to ask a character to follow you, or capture them, if you want to take
  //       them to a bedroom. Some actions might only be available if the room matches, need to consider if the room
  //       has a bed or a shower or a pillory.
  //

  function sendStartTrainingCommand() {
    close();
    StateMachine.handleCommand(CommandType.startTraining, { characterId:$id });
  }


  return Object.freeze({
    init,
    open,
    close,
  });

})();