global.CharacterOverviewPanel = (function() {

  function fillHealthBars(id) {
    X.fill('#characterOverlay .health-panel .health', getHealthBar(id));
    X.fill('#characterOverlay .health-panel .stamina', getStaminaBar(id));
    X.fill('#characterOverlay .health-panel .arousal', getArousalBar(id));
  }

  function fillManaBars(id) {
    const mana = ManaComponent.lookup(id);
    X.fill('#characterOverlay .mana-panel .red', getManaBar(mana,'red'));
    X.fill('#characterOverlay .mana-panel .yellow', getManaBar(mana,'yellow'));
    X.fill('#characterOverlay .mana-panel .green', getManaBar(mana,'green'));
    X.fill('#characterOverlay .mana-panel .blue', getManaBar(mana,'blue'));
    X.fill('#characterOverlay .mana-panel .black', getManaBar(mana,'black'));
  }

  // I think it's safe to say that the feelings panel should always show the
  // feelings directed towards the player in the status screen. The feelings
  // towards other characters are essentially hidden though.
  function fillFeelingsBars(id) {
    const control = ControlledComponent.lookup(id);
    const feelings = FeelingsComponent.findByTarget(id, GameState.getPlayer());
    X.fill('#characterOverlay .feelings-panel .control', getControlBar(control));
    X.fill('#characterOverlay .feelings-panel .affection', getFeelingsBar(feelings, 'affection'));
    X.fill('#characterOverlay .feelings-panel .respect', getFeelingsBar(feelings, 'respect'));
    X.fill('#characterOverlay .feelings-panel .fear', getFeelingsBar(feelings, 'fear'));
  }

  function fillAttributes(id) {
    const attributes = AttributesComponent.lookup(id);
    const list = ListBuilder('ul','two-columns');

    ['strength', 'dexterity', 'vitality', 'intelligence', 'beauty'].forEach(key => {
      list.add(`<li class='label'>${StringHelper.titlecase(key)}</li><li class='value'>${attributes[key]}</li>`)
    });

    X.fill('#characterOverlay .attributes-area', X.createElement(list.getList()));
  }

  function fillAspects(id) {
    const aspects = AspectsComponent.lookup(id);
    const keys = Object.keys(aspects);
    const list = ListBuilder(`div`,`tag-area`);

    keys.forEach(key => {
      const value = aspects[key];
      const stars = ['','★','★★','★★★'][value]
      list.add(makeTag(AspectType[key], stars, `aspect-tag strength-${value}`));
    });

    X.fill('#characterOverlay .aspects-area', X.createElement(list.getList()));
  }

  // TODO: Fill marks area once we have any.
  function fillMarks(id) {
    X.addClass(`#characterOverlay .marks-area`,'hide');
  }

  function fillSexualPreferences(id) {
    const sexualPreferences = SexualPreferencesComponent.lookup(id);
    const keys = Object.keys(sexualPreferences).sort();
    const list = ListBuilder(`div`,`tag-area`)

    keys.forEach(key => {
      const preference = SexualPreference.lookup(key);
      const value = sexualPreferences[key];
      const name = (value >= 0) ? preference.getName() : preference.getAntiname();
      const letter = LetterGradeHelper.preferenceValue(Math.abs(value));

      list.add(makeTag(name, letter, `sexual-preference-tag strength-${letter}`));
    });

    X.fill('#characterOverlay .sexual-preferences-area', X.createElement(list.getList()));
  }

  function fillSensitivities(id) {
    const sensitives = SensitivitiesComponent.lookup(id);
    const list = ListBuilder(`div`,`tag-area`);
    const keys = Object.keys(sensitives).sort();

    keys.forEach(key => {
      const letter = LetterGradeHelper.sensitivityValue(sensitives[key]);
      const label = `${StringHelper.titlecase(key)} Sensitivity`
      list.add(makeTag(label, letter, `sensitivity-tag strength-${letter}`));
    });

    X.fill('#characterOverlay .sensitivities-area',X.createElement(list.getList()));
  }

  function fillAnima(id) {
    const anima = AnimaComponent.lookup(id);
    const list = ListBuilder('ul','four-columns anima-animus');
    const keys = Object.keys(anima).sort();

    keys.forEach(key => {
      if (anima[key] > 0) {
        list.add(`<li class='label'>${StringHelper.titlecase(key)}</li><li class='value'>${anima[key]}</li>`);
      }
    });

    X.fill('#characterOverlay .anima-area',X.createElement(list.getList()));
  }

  function fillAnimus(id) {
    const animus = AnimusComponent.lookup(id);
    const list = ListBuilder('ul','four-columns anima-animus');
    const keys = Object.keys(animus).sort();

    keys.forEach(key => {
      if (animus[key] > 0) {
        list.add(`<li class='label'>${StringHelper.titlecase(key)}</li><li class='value'>${animus[key]}</li>`);
      }
    });

    X.fill('#characterOverlay .animus-area',X.createElement(list.getList()));
  }

  function fillSkills(id) {
    const skills = SkillsComponent.lookup(id);
    const list = ListBuilder(`div`,`tag-area`);
    const keys = Object.keys(skills).sort();

    keys.forEach(code => {
      const skill = Skill.lookup(code)
      if (skills[code] > 0) {
        list.add(makeTag(skill.getName(), skills[code], 'skill-tag'));
      }
    });

    X.fill('#characterOverlay .skills-area', X.createElement(list.getList()));
  }

  // === Bars and Tags and Things ===
  // We should probably eventually make tag an element. I'm assuming it will be
  // a common way to display values. Bars too of course.

  function getHealthBar(id) {
    const health = HealthComponent.lookup(id);
    return `Health (${health.currentHealth}/${health.maxHealth})`;
  }

  function getStaminaBar(id) {
    const current = Math.round(HealthComponent.lookup(id).currentStamina);
    const max = Math.round(AttributesComponent.createWrapper({ id:id }).getMaxStamina());
    return `Stamina (${current}/${max})`;
  }

  function getArousalBar(id) {
    const arousal = ArousalComponent.lookup(id).arousal;
    return `Arousal (${arousal}/100)`;
  }

  // TODO: Implement Mana
  function getManaBar(mana,color) {
    return `${StringHelper.titlecase(color)} Mana(0/0)`
  }

  function getControlBar(control) {
    return `Control ${control.control}`
  }

  function getFeelingsBar(feelings, feel) {
    const value = feelings[feel];
    const letterData = LetterGradeHelper.feelingValue(value);
    return `${StringHelper.titlecase(feel)} ${letterData.letter} (${letterData.remainder}/${letterData.range})`;
  }

  function makeTag(label,value,classname) {
    return `<div class='${classname} tag'>
      <span class='label'>${label}</span>
      <span class='value'>${value}</span>
    </div>`
  }

  return Object.freeze({
    fillHealthBars,
    fillManaBars,
    fillFeelingsBars,
    fillAttributes,
    fillAspects,
    fillMarks,
    fillSexualPreferences,
    fillSensitivities,
    fillAnima,
    fillAnimus,
    fillSkills,
  });

})();
