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
    fillScales();
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
    return `${StringHelper.titlecase(feel)} ${feelings[feel]}`
  }

  function getAttributeBar(attr) {
    const attributes = AttributesComponent.lookup($id);
    return `${StringHelper.titlecase(attr)} ${attributes[attr]}`;
  }

  function fillAspects() {
    const aspects = AspectsComponent.lookup($id);
    const keys = Object.keys(aspects);
    let html;

    if (keys.length === 0) {
      X.addClass(`#characterOverlay .aspects-area`,'hide');
    }

    if (keys.length > 0) {
      html = `<div class='tag-area'>`;
      keys.forEach(key => {
        html += makeTag(AspectType[key], aspects[key], 'aspect-tag');
      });
      html += `</div>`;

      X.fill('#characterOverlay .aspects-area', X.createElement(html));
    }
  }

  // TODO: Fill marks area once we have any.
  function fillMarks() {
    X.addClass(`#characterOverlay .marks-area`,'hide');
  }

  function fillSexualPreferences() {
    const sexualPreferences = SexualPreferencesComponent.lookup($id);

    let html = `<div class='tag-area'>`
    Object.keys(sexualPreferences).forEach(key => {
      const preference = SexualPreference.lookup(key);
      html += makeTag(preference.getName(), sexualPreferences[key], 'sexual-preference-tag');
    });
    html += `</div>`

    X.fill('#characterOverlay .sexual-preferences-area', X.createElement(html));
  }

  function fillSkills() {
    const skills = SkillsComponent.lookup($id);
    let anySkill = false;
    let html = `<div class='tag-area'>`

    Object.keys(skills).forEach(code => {
      const skill = Skill.lookup(code)
      if (skills[code] > 0) {
        html += makeTag(skill.getName(), skills[code], 'skill-tag');
        anySkill = true;
      }
    });
    html += `</div>`

    if (anySkill) {
      X.fill('#characterOverlay .skills-area', X.createElement(html));
    } else {
      X.addClass('#characterOverlay .skills-area','hide');
    }
  }

  function fillScales() {
    const scales = ScalesComponent.lookup($id);

    console.log("Scales:",scales);
  }

  function makeTag(label,value,classname) {
    return `<div class='${classname} tag'>
      <span class='label'>${label}</span>
      <span class='value'>${value}</span>
    </div>`
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