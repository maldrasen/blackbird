global.CharacterOverlay = (function() {

  // The CharacterOverlay is a good example of how the overlay window lifecycle can work. Loading an HTML file from
  // disk is fast enough to not worry about. If we get a fresh copy of the template every time there's no need to
  // worry about clearing the previous character. The only things that really has to happen when opening an overlay is
  // the overlay module needs to be pushed onto the WindowManager stack, and the overlay and cover should both be
  // shown. The WindowManager calls the close() function when the window is popped off the stack. The close() function
  // should empty the overlay, and hide it and the cover.

  let $id, $character, $isPlayer;

  function init() {}

  // Because the CharacterOverlay displays available character actions, we might need some other options here.
  // Everything I need now though I can determine from the current state and the character data I think.
  //
  // Options
  //   id*        Character entity id.
  //   isPlayer   true if we're viewing the player character (they have fewer options)
  //
  function open(options) {
    $isPlayer = (options.isPlayer === true);
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
    fillHeader();
    fillPortrait();

    CharacterOverviewPanel.fillHealthBars($id);
    CharacterOverviewPanel.fillManaBars($id);
    CharacterOverviewPanel.fillAttributes($id);
    CharacterOverviewPanel.fillAspects($id);
    CharacterOverviewPanel.fillSexualPreferences($id);
    CharacterOverviewPanel.fillSensitivities($id);
    CharacterOverviewPanel.fillSkills($id);

    if ($isPlayer === false) {
      CharacterOverviewPanel.fillPersonality($id);
      CharacterOverviewPanel.fillFeelingsBars($id);
      CharacterOverviewPanel.fillMarks($id);
      CharacterOverviewPanel.fillAnima($id);
      CharacterOverviewPanel.fillAnimus($id);
    }
    if ($isPlayer) {
      X.addClass('#characterOverlay .personality-panel','hide');
      X.addClass('#characterOverlay .feelings-panel','hide');
      X.addClass('#characterOverlay .marks-panel','hide');
      X.addClass('#characterOverlay .anima-panel','hide');
      X.addClass('#characterOverlay .animus-panel','hide');
    }

    CharacterBodyPanel.fillAnus($id);
    CharacterBodyPanel.fillBody($id);
    CharacterBodyPanel.fillBreasts($id);
    CharacterBodyPanel.fillCock($id);
    CharacterBodyPanel.fillPussy($id);
  }

  function fillHeader() {
    X.fill('#characterOverlay .header-panel .full-name', $character.getFullName());
    X.fill('#characterOverlay .header-panel .species', $character.getSpeciesName());
    X.fill('#characterOverlay .header-panel .gender', $character.getGenderName());
  }

  // Yak shaving, completely temporary, mostly wrong, but fun to look at pictures. The real version of this will allow
  // a user to click on the portrait. This will open the portrait library, where a portrait can be selected from the
  // defaults. There will be an option to upload a portrait as well. When we upload a portrait we set its scale and
  // location within a viewport with the correct aspect ratio. Future plan stuff.
  function fillPortrait() {
    let gender = ActorComponent.lookup($id).gender;
    if (gender === Gender.enby) { gender = Gender.female; }

    function pickRandom() {
      if (gender === Gender.female) {
        const roll = Random.between(1,35);
        const file = (roll < 10) ? `female-0${roll}.jpg` : `female-${roll}.jpg`
        return X.assetURL(`ai-assets/${file}`);
      }
      if (gender === Gender.futa) {
        const roll = Random.between(1,20);
        const file = (roll < 10) ? `futa-0${roll}.jpg` : `futa-${roll}.jpg`
        return X.assetURL(`ai-assets/${file}`);
      }
      if (gender === Gender.male) {
        const roll = Random.between(1,13);
        const file = (roll < 10) ? `male-0${roll}.jpg` : `male-${roll}.jpg`
        return X.assetURL(`ai-assets/${file}`);
      }
    }

    X.first('#characterOverlay .portrait').setAttribute('style',`background-image:${pickRandom()}`);
  }

  // It's best for the view that opened the character overlay to decide what
  // interactions are available from this view.
  function addInteraction(label, callback) {
    const link = X.createElement(`<li><a href='#'>${label}</a></li>`)
    link.addEventListener('mousedown',callback);

    X.removeClass('#characterOverlay .interaction-title','hide');
    X.first('#characterOverlay .interaction-list').appendChild(link);
  }

  return Object.freeze({
    init,
    open,
    close,
    addInteraction,
  });

})();
