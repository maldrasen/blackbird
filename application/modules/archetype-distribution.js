global.ArchetypeDistribution = function(gender, species=SpeciesCode.human) {

  const femaleStandard = {
    bastard:     0,
    bimbo:       20,
    bitch:       100,
    brat:        10,
    flowerChild: 80,
    innocent:    50,
    maniac:      10,
    nice:        0,
    pervert:     10,
    playful:     30,
    prude:       100,
    reserved:    30,
    savage:      20,
    serious:     50,
    slut:        50,
    sweet:       100,
    timid:       40,
  };

  const futaStandard = {
    bastard:     0,
    bimbo:       30,
    bitch:       60,
    brat:        20,
    flowerChild: 80,
    innocent:    20,
    maniac:      20,
    nice:        0,
    pervert:     20,
    playful:     40,
    prude:       40,
    reserved:    20,
    savage:      40,
    serious:     30,
    slut:        70,
    sweet:       80,
    timid:       30,
  };

  const maleStandard = {
    bastard:     70,
    bimbo:       0,
    bitch:       0,
    brat:        10,
    flowerChild: 40,
    innocent:    30,
    maniac:      20,
    nice:        100,
    pervert:     40,
    playful:     20,
    prude:       50,
    reserved:    30,
    savage:      60,
    serious:     100,
    slut:        40,
    sweet:       0,
    timid:       30,
  };

  const enbyStandard = {
    bastard:     0,
    bimbo:       0,
    bitch:       0,
    brat:        50,
    flowerChild: 40,
    innocent:    20,
    maniac:      10,
    nice:        0,
    pervert:     30,
    playful:     60,
    prude:       40,
    reserved:    30,
    savage:      0,
    serious:     20,
    slut:        40,
    sweet:       30,
    timid:       50,
  };

  let distribution = maleStandard;
  if (gender === Gender.female) { distribution = femaleStandard; }
  if (gender === Gender.futa) { distribution = futaStandard; }
  if (gender === Gender.enby) { distribution = enbyStandard; }

  if (species === SpeciesCode.elf) {
    distribution.bastard *=     1.3;
    distribution.bimbo *=       0.5;
    distribution.bitch *=       1.7;
    distribution.brat *=        0.6;
    distribution.flowerChild *= 1.4;
    distribution.innocent *=    1.7;
    distribution.maniac *=      0.3;
    distribution.nice *=        0.7;
    distribution.pervert *=     0.4;
    distribution.playful *=     0.8;
    distribution.prude *=       1.8;
    distribution.reserved *=    1.2;
    distribution.savage *=      0.0;
    distribution.serious *=     2.0;
    distribution.slut *=        0.5;
    distribution.sweet *=       0.7;
    distribution.timid *=       1.2;
  }
  if (species === SpeciesCode.equian) {
    distribution.bastard *=     1.1;
    distribution.bimbo *=       0.6;
    distribution.bitch *=       0.4;
    distribution.brat *=        0.4;
    distribution.flowerChild *= 1.2;
    distribution.innocent *=    0.6;
    distribution.maniac *=      0.2;
    distribution.nice *=        1.1;
    distribution.pervert *=     0.6;
    distribution.playful *=     0.5;
    distribution.prude *=       1.2;
    distribution.reserved *=    0.4;
    distribution.savage *=      1.3;
    distribution.serious *=     1.7;
    distribution.slut *=        0.8;
    distribution.sweet *=       1.2;
    distribution.timid *=       0.0;
  }
  if (species === SpeciesCode.halfling) {
    distribution.bastard *=     0.2;
    distribution.bimbo *=       1.2;
    distribution.bitch *=       0.8;
    distribution.brat *=        1.4;
    distribution.flowerChild *= 1.6;
    distribution.innocent *=    1.2;
    distribution.maniac *=      0.2;
    distribution.nice *=        1.9;
    distribution.pervert *=     1.1;
    distribution.playful *=     1.3;
    distribution.prude *=       1.2;
    distribution.reserved *=    0.6;
    distribution.savage *=      0.0;
    distribution.serious *=     0.6;
    distribution.slut *=        1.3;
    distribution.sweet *=       1.8;
    distribution.timid *=       2.0;
  }
  if (species === SpeciesCode.lupin) {
    distribution.bastard *=     1.1;
    distribution.bimbo *=       1.2;
    distribution.bitch *=       1.4;
    distribution.brat *=        1.4;
    distribution.flowerChild *= 1.8;
    distribution.innocent *=    0.6;
    distribution.maniac *=      0.5;
    distribution.nice *=        1.7;
    distribution.pervert *=     1.1;
    distribution.playful *=     1.5;
    distribution.prude *=       0.7;
    distribution.reserved *=    0.4;
    distribution.savage *=      2.5;
    distribution.serious *=     1.8;
    distribution.slut *=        1.3;
    distribution.sweet *=       1.5;
    distribution.timid *=       0.0;
  }
  if (species === SpeciesCode.nymph) {
    distribution.bastard *=     0.0;
    distribution.bimbo *=       1.4;
    distribution.bitch *=       0.6;
    distribution.brat *=        0.3;
    distribution.flowerChild *= 2.2;
    distribution.innocent *=    1.4;
    distribution.maniac *=      0.2;
    distribution.nice *=        0.0;
    distribution.pervert *=     1.1;
    distribution.playful *=     0.5;
    distribution.prude *=       0.6;
    distribution.reserved *=    0.4;
    distribution.savage *=      0.0;
    distribution.serious *=     0.3;
    distribution.slut *=        1.6;
    distribution.sweet *=       2.2;
    distribution.timid *=       1.6;
  }
  if (species === SpeciesCode.sylph) {
    distribution.bastard *=     1.5;
    distribution.bimbo *=       1.3;
    distribution.bitch *=       1.7;
    distribution.brat *=        2.3;
    distribution.flowerChild *= 1.7;
    distribution.innocent *=    1.4;
    distribution.maniac *=      1.7;
    distribution.nice *=        0.1;
    distribution.pervert *=     1.3;
    distribution.playful *=     2.5;
    distribution.prude *=       0.1;
    distribution.reserved *=    0.1;
    distribution.savage *=      0.1;
    distribution.serious *=     0.0;
    distribution.slut *=        1.5;
    distribution.sweet *=       0.7;
    distribution.timid *=       1.8;
  }

  const rounded = {}
  Object.entries(distribution).forEach(([key,value]) => {
    let actual = key;
    if (key === 'flowerChild') { actual = ArchetypeCode.flowerChild; }
    if (Math.round(value) > 0) { rounded[actual] = Math.round(value); }
  });

  return rounded;
}