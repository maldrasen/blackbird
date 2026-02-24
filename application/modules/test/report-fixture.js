global.ReportFixture = (function() {

  function show() {
    X.onClick('#mainList .show-sub-list', showSubList);
    X.onClick('#sexActionReports .sort-actions', sortSexActions);
    MainContent.setMainContent('views/reports.html');
    MainContent.setBackground('backgrounds/reports.jpg');
  }

  function showSubList(event) {
    X.each('#mainList .sub-list', element => { X.addClass(element,'hide'); });
    X.removeClass(`#${event.target.dataset.sub}`,'hide');
    X.removeClass('#subLists','hide');
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
        case 'consentTarget': addNumericResult(action.getConsentTarget()); break;
        case 'time': throw `Implement time`;
        case 'playerStamina': throw `Implement stamina`;
        case 'partnerStamina': throw `Implement stamina`;
        case 'sensation.anus':        addNumericResult(action.getSensations().anus); break;
        case 'sensation.cervix':      addNumericResult(action.getSensations().cervix); break;
        case 'sensation.clit':        addNumericResult(action.getSensations().clit); break;
        case 'sensation.nipple':      addNumericResult(action.getSensations().nipple); break;
        case 'sensation.throat':      addNumericResult(action.getSensations().throat); break;
        case 'sensation.cock':        addNumericResult(action.getSensations().cock); break;
        case 'sensation.prostate':    addNumericResult(action.getSensations().prostate); break;
        case 'sensation.urethra':     addNumericResult(action.getSensations().urethra); break;
        case 'sensation.pussy':       addNumericResult(action.getSensations().pussy); break;
        case 'sensation.anger':       addNumericResult(action.getSensations().anger); break;
        case 'sensation.comfort':     addNumericResult(action.getSensations().comfort); break;
        case 'sensation.desire':      addNumericResult(action.getSensations().desire); break;
        case 'sensation.shame':       addNumericResult(action.getSensations().shame); break;
        case 'sensation.submission':  addNumericResult(action.getSensations().submission); break;
        case 'sensation.suffering':   addNumericResult(action.getSensations().suffering); break;
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

  return Object.freeze({
    show
  })

})();
