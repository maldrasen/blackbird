global.ReportFixture = (function() {

  function show() {
    X.onClick('#mainList .show-sub-list', showSubList);
    X.onClick('#sexActionReports .sort-actions', sortSexActions);
    X.onClick('#archetypeReports .count-archetypes', countArchetypes);

    MainContent.setMainContent('views/reports.html');
    MainContent.setBackground('backgrounds/reports.jpg');
  }

  function showSubList(event) {
    X.addClass('#subLists .sub-list','hide');
    X.addClass('#output','hide');
    X.removeClass(`#${event.target.dataset.sub}`,'hide');
    X.removeClass('#subLists','hide');
  }

  function countArchetypes(event) {
    Registry.clear();

    const gender = (event.target.dataset.gender === 'M') ? Gender.male : Gender.female;
    const species = event.target.dataset.species;
    const archetypeTable = {};

    for (let i=0; i<1000; i++) {
      const id = CharacterFactory.build({ gender:gender, species:species });
      const archetype = Personality(id).getArchetype();
      if (archetypeTable[archetype] == null) { archetypeTable[archetype] = 0; }
      archetypeTable[archetype] += 1;
    }

    const sorted = Object.keys(archetypeTable).map(code => {
      return { code:code, count:archetypeTable[code] }
    }).sort((a,b) => { return b.count - a.count });

    setOutput(sorted.map(entry => {
      return `${entry.code} - ${entry.count}`;
    }));
  }

  function sortSexActions(event) {
    const sort = event.target.dataset.sort;
    const results = SexAction.getAllCodes().map(code => {
      const action = SexAction.lookup(code);
      let display;

      const addNumericResult = (value) => {
        if (value != null) { display = `${formatNumber(value, 3, 4)} - ${code}` }
      };

      switch (sort) {
        case 'consentTarget':         addNumericResult(action.getConsentTarget()); break;
        case 'techniqueTarget':       addNumericResult(action.getTechniqueTarget()); break;
        case 'time':                  addNumericResult(action.getTime()); break;
        case 'playerStamina':         addNumericResult(action.getPlayerStamina()); break;
        case 'partnerStamina':        addNumericResult(action.getPartnerStamina()); break;
        case 'sensation.anus':        addNumericResult(action.getPartnerSensations().anus); break;
        case 'sensation.cervix':      addNumericResult(action.getPartnerSensations().cervix); break;
        case 'sensation.clit':        addNumericResult(action.getPartnerSensations().clit); break;
        case 'sensation.nipple':      addNumericResult(action.getPartnerSensations().nipple); break;
        case 'sensation.throat':      addNumericResult(action.getPartnerSensations().throat); break;
        case 'sensation.cock':        addNumericResult(action.getPartnerSensations().cock); break;
        case 'sensation.prostate':    addNumericResult(action.getPartnerSensations().prostate); break;
        case 'sensation.urethra':     addNumericResult(action.getPartnerSensations().urethra); break;
        case 'sensation.pussy':       addNumericResult(action.getPartnerSensations().pussy); break;
        case 'sensation.anger':       addNumericResult(action.getPartnerSensations().anger); break;
        case 'sensation.comfort':     addNumericResult(action.getPartnerSensations().comfort); break;
        case 'sensation.desire':      addNumericResult(action.getPartnerSensations().desire); break;
        case 'sensation.shame':       addNumericResult(action.getPartnerSensations().shame); break;
        case 'sensation.submission':  addNumericResult(action.getPartnerSensations().submission); break;
        case 'sensation.suffering':   addNumericResult(action.getPartnerSensations().suffering); break;
        case 'player.anus':           addNumericResult(action.getPlayerSensations().anus); break;
        case 'player.cervix':         addNumericResult(action.getPlayerSensations().cervix); break;
        case 'player.clit':           addNumericResult(action.getPlayerSensations().clit); break;
        case 'player.nipple':         addNumericResult(action.getPlayerSensations().nipple); break;
        case 'player.throat':         addNumericResult(action.getPlayerSensations().throat); break;
        case 'player.cock':           addNumericResult(action.getPlayerSensations().cock); break;
        case 'player.prostate':       addNumericResult(action.getPlayerSensations().prostate); break;
        case 'player.urethra':        addNumericResult(action.getPlayerSensations().urethra); break;
        case 'player.pussy':          addNumericResult(action.getPlayerSensations().pussy); break;
        case 'player.desire':         addNumericResult(action.getPlayerSensations().desire); break;
        default: throw `Implement ${sort}`;
      }

      return display
    }).sort();

    setOutput(results);
  }

  // Turn a number into a string of set length. The leading 0s are needed to
  // sort numbers as strings. We pad the end to make the codes line up.
  function formatNumber(number, start, end) {
    return `${number}`.padStart(start, '0').padEnd(end, ' ');
  }

  // Display an array of result strings in a <pre> element.
  function setOutput(array) {
    X.empty('#output');
    X.removeClass('#output', 'hide');
    X.fill('#output', X.createElement(`<pre>${array.join(`\n`)}</pre>`))
  }

  return Object.freeze({ show });

})();
