global.CalendarHelper = (function() {

  // We define these as constants rather than using the array lengths because it's important that they remain the same.
  const highCount = 53;
  const lowCount = 191;
  const lesserCount = 9;
  const colorCount = 10;

  // We add an offset to the year so that the game doesn't start right at the beginning of an age.
  const yearStart = 1974;

  // ----------------
  //    Honorifics
  // ----------------

  const higherHonorifics = [
    'Maiden',
    'Weaver',
    'Vixen',
    'Hermit',
    'Dryad',
    'Priestess',
    'Twins',
    'Raven',
    'Wellspring',
    'Judge',
    'Rat',
    'Naga',
    'Incubus',
    'Blacksmith',
    'Lovers',
    'Stallion',
    'Sacrifice',
    'Centaur',
    'Archivist',
    'Snake',
    'Ragpicker',
    'Prisoner',
    'Sailor',
    'Rakshasa',
    'Flame Keeper',
    'Mother',
    'Nymph',
    'Cupbearer',
    'Fairies',
    'Hare',
    'Hunter',
    'Kobold',
    'Shepard',
    'Farmer',
    'Slave',
    'Wolf',
    'Corpse',
    'Knight',
    'Succubus',
    'Troll',
    'Spectre',
    'Magician',
    'Goat',
    'Sylph',
    'Traveler',
    'Contortionist',
    'Spider',
    'Otter',
    'Scrivener',
    'Whore',
    'Warrior',
    'Cutpurse',
    'Crone',
  ];

  // There's room for 191 lower honorifics, though we might not need them all. As we're adding them, we should cluster
  // them around the 60s.
  const lowerHonorifics = {
    y1:'Birth of The',
    y2:'of Dubious Consent',
    y6:'Twisted',
    y9:'of Many Colors',
    y10:'Lucky',
    y11:'Rotting',
    y12:'Tranquil',
    y13:'Dirty',
    y17:'Grateful',
    y21:'Lustful',
    y22:'Sleeping',
    y29:'Inverted',
    y30:'Lunar',
    y31:'of the Greenwood',
    y35:'Frolicking',
    y36:'Raging',
    y37:'Bloody',
    y38:'Eloquent',
    y39:'Laughing',
    y40:'Pure',
    y41:'Blind',
    y42:'Mangled',
    y43:'Giant',
    y44:'Greedy',
    y45:'Unspeakable',
    y50:'Gilded',
    y51:'Curserotten',
    y62:'Piebald',
    y63:'Fecund',
    y64:'Perverted',
    y65:'Solar',
    y66:'Drumming',
    y67:'Thrice Damned',
    y68:'Lonely',
    y69:'Bound',
    y70:'Effulgent',
    y71:'Bountiful',
    y72:'Generous',
    y75:'Filthy',
    y76:'Burning',
    y77:'Holy',
    y78:'Envious',
    y79:'Screaming',
    y80:'Turgid',
    y81:'Accursed',
    y87:'of The Deep',
    y88:'Indefatigable',
    y89:'Horned',
    y90:'Weeping',
    y91:'Bathing',
    y92:'Drunken',
    y93:'Silent',
    y94:'Wounded',
    y95:'Dancing',
    y96:'Ecstatic',
    y99:'Singing',
    y100:'Radiant',
    y111:'Clockwork',
    y118:'Dream of The',
    y120:'Cosmic',
    y121:'Beaten',
    y127:'Tormented',
    y131:'Diseased',
    y132:'Exhausted',
    y142:'Corrupted',
    y150:'Spectral',
    y154:'Unholy',
    y166:'Crystalline',
    y180:'of the Beyond',
    y181:'Cerulean',
    y190:'of Ill Intent',
    y191:'Death',
  }

  const lesserHonorifics = ['holiday','fish','crystal','monster','flower','bird','place','animal','paragon'];
  const colorNames = ['white','red','pink','orange','brown','yellow','green','blue','purple','black'];

  // ---------------
  //    Day Names
  // ---------------

  const holidayNames = {
    Spring:{
      white:  'Dawnlight', // New Years Day, celebrated early in the morning.
      red:    'The Blood Orgy of Saint Theladin', // A blood themed orgy.
      pink:   'Slutsmarch', // A naked parade with public sex.
      orange: null,
      brown:  'Leery Duckings', // A day when it's traditional to throw donkey shit at people.
      yellow: null,
      green:  'The Blossoming', // A spring and flower themed feast.
      blue:   null,
      purple: null,
      black:  'The Dance Macabre', // A formal ball, and a reminder that all are mortal.
    },
    Summer:{
      white:  'The Orgy of Saint Harris', // A very normal orgy.
      red:    'Cacophony', // Fireworks and explosions and shit.
      pink:   'Fullbright', // The longest day of the year. (Day 163)
      orange: null,
      brown:  'Castaway', // A day when everyone is supposed to cast off their clothing, and spend the day in the nude.
      yellow: null,
      green:  'Hallarinbrimbore', // - an animal themed holiday
      blue:   null,
      purple: 'Oblivant', // A celebration of the nobility, a day when bribery is encouraged for favors later in the year.
      black:  'The Grim Feast', // A death themed feast
    },
    Autumn:{
      white:  null,
      red:    'Bloodfeast', // A feast for the hunters, where raw red meat is consumed
      pink:   'The Orgy of Saint Victoria', // A female only orgy.
      orange: 'Hayward', // - a harvest themed holiday featuring Jolly Jack Pumpkins as a mascot.
      brown:  `Gan'Battar`, // The centaur's day of breeding, observed locally.
      yellow: null,
      green:  'Frolicsome', // - Jumping into piles of leaves.
      blue:   'The Chalcedony Feast', // To honor the fae folk.
      purple: 'Dicksout', // Dicks out for Harambe,
      black:  'The Deathknells', // A musical event, honoring the day.
    },
    Winter:{
      white:  'Wintersmite', // A day for fighting in honor of the brutality of winter.
      red:    null,
      pink:   'The Long Dawn', // The shortest day of the year, where the sun barely crests the horizon. (day 343, 180 days after Fullbright)
      orange: 'Silenca', // A day of silent contemplation
      brown:  null,
      yellow: 'Hearthlight', // A day to stay home and relax around the fire.
      green:  'Evergreen', // A day when the trees are honored.
      blue:   null,
      purple: 'The Orgy of Saint Grant', // A male only orgy
      black:  'Deadwinter', // Honoring the dead, celebrated privately.
    },
  };

  const commonDayNames = {
    fish:    { white:'Tuna',   red:'Snapper', pink:'Salmon',      orange:'Carp',     brown:'Trout',         yellow:'Yellowtail', green:'Bass',    blue:'Shark',     purple:'Squid',    black:'Marlin'   },
    crystal: { white:'Pearl',  red:'Ruby',    pink:'Quartz',      orange:'Topaz',    brown:'Agate',         yellow:'Citrine',    green:'Emerald', blue:'Sapphire',  purple:'Amethyst', black:'Obsidian' },
    monster: { white:'Yeti',   red:'Dragon',  pink:'Abomination', orange:'Djinn',    brown:'Manticore',     yellow:'Griffin',    green:'Goblin',  blue:'Leviathan', purple:'Hydra',    black:'Revenant' },
    flower:  { white:'Lily',   red:'Poppy',   pink:'Rose',        orange:'Marigold', brown:'Chrysanthemum', yellow:'Daffodil',   green:'Orchid',  blue:'Iris',      purple:'Petunia',  black:'Pansy'    },
    bird:    { white:'Dove',   red:'Robin',   pink:'Tit',         orange:'Heron',    brown:'Partridge',     yellow:'Canary',     green:'Ibis',    blue:'Peacock',   purple:'Pigeon',   black:'Raven'    },
    place:   { white:'Shrine', red:'Farm',    pink:'Brothel',     orange:'Tavern',   brown:'Mountain',      yellow:'Field',      green:'Grove',   blue:'Lake',      purple:'Meadow',   black:'Cave'     },
    animal:  { white:'Hare',   red:'Fox',     pink:'Pig',         orange:'Tiger',    brown:'Bear',          yellow:'Lion',       green:'Toad',    blue:'Butterfly', purple:'Serpent',  black:'Panther'  },
  }

  const paragonDayNames = {
    white:  `Snowfall`,
    red:    `Bloodmoon`,
    pink:   `Risingsun`,
    orange: `Settingsun`,
    brown:  `Filthrot`,
    yellow: `Goldenglow`,
    green:  `Greengrass`,
    blue:   `Skyblue`,
    purple: `Moonshade`,
    black:  `Nightsky`,
  }

  function fullDate(day) {
    let dayNumber = (day%360) || 360;
    let yearNumber = Math.floor(day/360) + yearStart;
    return `${dayName(dayNumber)}, ${seasonName(dayNumber)}, ${yearName(yearNumber)}`;
  }

  function dayInfo(dayNumber) {
    let lesser = (dayNumber % lesserCount) || lesserCount;
    let color = (dayNumber % colorCount)   || colorCount;
    return {
      lesserIndex: lesser,
      colorIndex: color,
      lesser: lesserHonorifics[lesser-1],
      color: colorNames[color-1],
    };
  }

  // The year cycle is almost a modulo, but 0 is not allowed.
  function yearInfo(yearNumber) {
    return {
      high: (yearNumber % highCount) || highCount,
      low:  (yearNumber % lowCount)  || lowCount,
    };
  }

  function dayName(dayNumber) {
    const info = dayInfo(dayNumber);
    switch (info.lesser) {
      case 'holiday': return holidayNames[seasonName(dayNumber)][info.color] || `[TODO: Holiday/${seasonName(dayNumber)}/${info.color}]`;
      case 'paragon': return paragonDayNames[info.color];
      case 'crystal': return `Day of ${commonDayNames[info.lesser][info.color]}`;
      default: return `Day of The ${commonDayNames[info.lesser][info.color]}`;
    }
  }

  // The year has 4, 90 day seasons.
  function seasonName(dayNumber) {
    return [
      "Spring",
      "Summer",
      "Autumn",
      "Winter",
    ][Math.floor((dayNumber-1) / 90)]
  }

  function yearName(yearNumber) {
    let info = yearInfo(yearNumber);
    let lower = lowerHonorifics[`y${info.low}`] || `Unknown(${info.low})`;
    let higher = higherHonorifics[info.high - 1];
    return "Year of The " + (lower.match(/^of/) ? (higher+" "+lower) : (lower+' '+higher));
  }

  function allDays() {
    for (let i=1; i<=360; i++) { console.log(`(${i}) ${CalendarHelper.dayName(i)}`) }
  }

  function allYears() {
    for (let i=1; i<=10123; i++) { console.log(`(${i}) ${CalendarHelper.yearName(i)}`) }
  }

  return Object.freeze({
    dayInfo,
    yearInfo,
    dayName,
    seasonName,
    yearName,
    fullDate,
    allDays,
    allYears,
  });

})();
