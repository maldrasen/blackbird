global.ReportFixture = (function() {

  function show() {
    X.onClick('#mainList .show-sub-list', showSubList);
    X.onClick('#sexActionReports .sort-actions', sortSexActions);
    X.onClick('#archetypeReports .count-archetypes', countArchetypes);
    X.onClick('#weaponReports .report-weapons', reportWeapons);
    X.onClick('#armorReports .report-armor', reportArmor);

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
        default: throw new Error(`Implement ${sort}`);
      }

      return display
    }).sort();

    setOutput(results);
  }

  // === Base Weapon and Armor balancing tables ===
  // Weapons and armor derive a lot of their numbers (damage after the material factor, DPS, value), so these dump the
  // whole set into a fixed-width table to make it easy to eyeball the balance. The data-sort attribute picks the sort.

  function reportWeapons(event) {
    const weapons = BaseWeapon.getAllCodes().map(code => {
      const weapon = BaseWeapon.lookup(code);
      return {
        code:      code,
        type:      weapon.getType(),
        hands:     weapon.getHands(),
        reach:     weapon.getReach(),
        damage:    `${weapon.getLow()}-${weapon.getHigh()}`,
        dps:       weapon.getDamagePerSecond(),
        speed:     weapon.getSpeed(),
        types:     damageTypeString(weapon),
        material:  weapon.getPrimaryMaterial() || '-',
        value:     weapon.getValue(),
      };
    });

    sortReport(weapons, event.target.dataset.sort, weapon => weapon.type);

    setOutput(formatTable([
      { label:'code',         width:18 },
      { label:'type',         width:9 },
      { label:'hands',        width:6 },
      { label:'reach',        width:9 },
      { label:'damage',       width:9 },
      { label:'dps',          width:7, align:'right' },
      { label:'speed',        width:6, align:'right' },
      { label:'damage types', width:20 },
      { label:'material',     width:9 },
      { label:'value',        width:6, align:'right' },
    ], weapons.map(weapon => [
      weapon.code, weapon.type, weapon.hands, weapon.reach, weapon.damage,
      weapon.dps.toFixed(1), weapon.speed, weapon.types, weapon.material, weapon.value,
    ])));
  }

  function reportArmor(event) {
    const armors = BaseArmor.getAllCodes().map(code => {
      const armor = BaseArmor.lookup(code);
      const reduction = armor.getReductionMap();
      return {
        code:      code,
        slot:      armor.getSlot(),
        crush:     reduction.crush,
        slash:     reduction.slash,
        pierce:    reduction.pierce,
        total:     reduction.crush + reduction.slash + reduction.pierce,
        material:  armor.getPrimaryMaterial() || '-',
        value:     armor.getValue(),
      };
    });

    sortReport(armors, event.target.dataset.sort, armor => armor.slot);

    setOutput(formatTable([
      { label:'code',     width:14 },
      { label:'slot',     width:8 },
      { label:'crush',    width:6, align:'right' },
      { label:'slash',    width:6, align:'right' },
      { label:'pierce',   width:7, align:'right' },
      { label:'total',    width:6, align:'right' },
      { label:'material', width:9 },
      { label:'value',    width:6, align:'right' },
    ], armors.map(armor => [
      armor.code, armor.slot, armor.crush, armor.slash, armor.pierce, armor.total, armor.material, armor.value,
    ])));
  }

  // Sort a report array in place. 'value' and 'dps'/'reduction' sort high to low; 'group' sorts by the given grouping
  // key (weapon type, armor slot) then by value within the group.
  function sortReport(entries, sort, groupBy) {
    const byValue = (a,b) => b.value - a.value;

    switch (sort) {
      case 'value':     entries.sort(byValue); break;
      case 'dps':       entries.sort((a,b) => b.dps - a.dps); break;
      case 'reduction': entries.sort((a,b) => b.total - a.total); break;
      default:          entries.sort((a,b) => `${groupBy(a)}`.localeCompare(`${groupBy(b)}`) || byValue(a,b));
    }
  }

  function damageTypeString(weapon) {
    return weapon.getDamageTypes().map(entry => {
      return entry.percent === 100 ? entry.type : `${entry.type}:${entry.percent}`;
    }).join('/');
  }

  // Build a fixed-width text table from a set of column definitions ({ label, width, align }) and an array of rows,
  // each row an array of cell values in column order.
  function formatTable(columns, rows) {
    const line = cells => columns.map((column,index) => {
      const cell = `${cells[index]}`;
      return column.align === 'right' ? cell.padStart(column.width) : cell.padEnd(column.width);
    }).join(' ');

    const header = line(columns.map(column => column.label));
    return [header, '-'.repeat(header.length), ...rows.map(line)];
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
