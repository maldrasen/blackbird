global.CalendarHelper = (function() {
  const highCount = 53;
  const lowCount = 191;
  const lesserCount = 9;
  const colorCount = 10;
  const yearStart = 1974;

  function dayInfo(dayNumber) {
    let lesser = (dayNumber % lesserCount) || lesserCount;
    let color = (dayNumber % colorCount)   || colorCount;
    return {
      lesserIndex: lesser,
      colorIndex: color,
      lesser: lesserHonorific(lesser),
      color: colorName(color),
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
    let info = dayInfo(dayNumber);

    // TODO: Exceptions to rules. Probably will end up changing these to be less crude, but this is from an old
    //       version of the game.
    if (info.lesser === 'drink'   && info.color === 'pink')   { return "Day of Pussy's Nectar" }
    if (info.lesser === 'drink'   && info.color === 'yellow') { return "Day of Piss" }
    if (info.lesser === 'drink'   && info.color === 'green')  { return "Day of Flower's Nectar" }
    if (info.lesser === 'drink'   && info.color === 'purple') { return "Day of Vile Poisons" }
    if (info.lesser === 'drink'   && info.color === 'black')  { return "Day of Bile" }
    if (info.lesser === 'food'    && info.color === 'brown')  { return "Day of Shit" }
    if (info.lesser === 'food'    && info.color === 'orange') { return "Day of Orange" }
    if (info.lesser === 'paragon' && info.color === 'red')    { return "Day of Blood" }
    if (info.lesser === 'paragon' && info.color === 'pink')   { return "Festival of the Spread Pussy" }
    if (info.lesser === 'paragon' && info.color === 'purple') { return "Festival of the Swollen Cock" }

    let name = {
      drink:   { white:"Milksday",   red:"Winesday", pink:"-",        orange:"Honeysday", brown:"Beersday",      yellow:"-",          green:"-",       blue:"Watersday", purple:"-",         black:"-"           },
      fish:    { white:'Tuna',       red:'Snapper',  pink:'Salmon',   orange:'Carp',      brown:'Trout',         yellow:'Yellowtail', green:'Bass',    blue:'Shark',     purple:'Squid',     black:'Marlin'      },
      crystal: { white:'Pearl',      red:'Ruby',     pink:'Quartz',   orange:'Topaz',     brown:'Agate',         yellow:'Citrine',    green:'Emerald', blue:'Sapphire',  purple:'Amethyst',  black:'Obsidian'    },
      flower:  { white:'Lily',       red:'Poppy',    pink:'Rose',     orange:'Marigold',  brown:'Chrysanthemum', yellow:'Daffodil',   green:'Orchid',  blue:'Iris',      purple:'Petunia',   black:'Pansy'       },
      bird:    { white:'Dove',       red:'Robin',    pink:'Tit',      orange:'Heron',     brown:'Partridge',     yellow:'Canary',     green:'Ibis',    blue:'Peacock',   purple:'Pigeon',    black:'Raven'       },
      food:    { white:"Cakesday",   red:"Beefsday", pink:"Porksday", orange:"-",         brown:"-",             yellow:"Lemonsday",  green:"Peasday", blue:"Berrysday", purple:"Grapesday", black:"Puddingsday" },
      place:   { white:'Home',       red:'Farm',     pink:'Brothel',  orange:'Tavern',    brown:'Mountain',      yellow:'Field',      green:'Grove',   blue:'Lake',      purple:'Meadow',    black:'Cave'        },
      animal:  { white:'White Hart', red:'Fox',      pink:'Pig',      orange:'Tiger',     brown:'Bear',          yellow:'Lion',       green:'Toad',    blue:'Dragon',    purple:'Serpent',   black:'Panther'     },
      paragon: { white:'Snow',       red:'-',        pink:'-',        orange:'Sunset',    brown:'Wood',          yellow:'Sun',        green:'Grass',   blue:'Sky',       purple:'-',         black:'Night'       },
    }[info.lesser][info.color];

    if (info.lesser === 'drink')   { return name; }
    if (info.lesser === 'food')    { return name; }
    if (info.lesser === 'crystal') { return `Day of ${name}`; }

    return `Day of The ${name}`;
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
    let lower = lowerHonorific(info.low);
    let higher = higherHonorific(info.high);
    return "Year of The " + (lower.match(/^of/) ? (higher+" "+lower) : (lower+' '+higher));
  }

  function fullDate(day) {
    let dayNumber = (day%360) || 360;
    let yearNumber = Math.floor(day/360) + yearStart;

    return `${dayName(dayNumber)}, ${seasonName(dayNumber)}, ${yearName(yearNumber)}, 13th Age of Angoria`;
  }

  function higherHonorific(i) {
    return [
      'Maiden',
      'White King',
      'Oak',
      'Gnome',
      'Hermit',
      'Wellspring',
      'Fox',
      'High Priestess',
      'Red Duke',
      'Oracle',
      'Bear',
      'Dryad',
      'Raven',
      'Rat',
      'Twins',
      'Judge',
      'Hierophant',
      'Blacksmith',
      'Doctor',
      'Stallion',
      'Snake',
      'Nymph',
      'Iron Bull',
      'Cupbearer',
      'Demon',
      'Fairies',
      'Mother',
      'Dragon',
      'Wizard',
      'Hare',
      'Maker',
      'Hunter',
      'Flame Keeper',
      'Farmer',
      'Goblin',
      'Sailor',
      'Lovers',
      'White Hart',
      'Hung Man',
      'Wolf',
      'Thief',
      'Traveler',
      'Spider',
      'Whore',
      'Green Knight',
      'Demoness',
      'Otter',
      'Sylph',
      'Titan',
      'Serpent',
      'Warrior',
      'Black Queen',
      'Crone',
    ][i-1];
  }

  function lowerHonorific(i) {
    return {
      y1:'Birth of The',
      y6:'Twisted',
      y10:'Lucky',
      y11:'Rotting',
      y12:'Tranquil',
      y13:'Dirty',
      y17:'Grateful',
      y21:'Lustful',
      y22:'Sleeping',
      y30:'Lunar',
      y31:'of the Greenwood',
      y33:'Harmonic',
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
      y64:'Perverted',
      y65:'Solar',
      y66:'Drumming',
      y69:'Bound',
      y70:'Effulgent',
      y76:'Burnt',
      y77:'Holy',
      y78:'Envious',
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
      y96:'Ecstasy',
      y99:'Singing',
      y100:'Radiant',
      y111:'Clockwork',
      y118:'Dream of The',
      y120:'Cosmic',
      y127:'Tormented',
      y131:'Diseased',
      y142:'Corrupted',
      y150:'Spectral',
      y154:'Unholy',
      y166:'Crystalline',
      y180:'of the Beyond',
      y191:'Death',
    }[`y${i}`] || `Unknown(${i})`
  }

  function lesserHonorific(i) {
    return ['drink','fish','crystal','flower','bird','food','place','animal','paragon'][i-1];
  }

  function colorName(i) {
    return ['white','red','pink','orange','brown','yellow','green','blue','purple','black'][i-1];
  }

  return Object.freeze({
    dayInfo,
    yearInfo,
    dayName,
    seasonName,
    yearName,
    fullDate
  });

})();
