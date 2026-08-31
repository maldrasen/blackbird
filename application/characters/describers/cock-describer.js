global.CockDescriber = function(id) {
  const cock = CockComponent.lookupNormalOf(id);
  const cockPack = WeaverPackage('cock-description');
  const ballsPack = WeaverPackage('balls-description');

  function buildFullDescription() {
    switch (cock.shape) {
      case 'normal': buildFullNormalDescription(); break;
      case 'dog': buildFullDogDescription(); break;
      case 'dragon': buildFullDragonDescription(); break;
      case 'horse': buildFullHorseDescription(); break;
      default: throw new Error(`Unknown Cock Shape: ${cock.shape}`);
    }

    const width = cock.testicleWidth;

    if (width < 26) { buildSmallBalls(); }
    if (width >= 26 && width < 39) { buildAverageBalls(); }
    if (width >= 39 && width < 52) { buildBigBalls(); }
    if (width >= 52 && width < 78) { buildHugeBalls(); }
    if (width >= 78) { buildMonsterBalls(); }

    const context = { C:id };
    const cockPart = cockPack.pick(context);
    const ballsPart = ballsPack.pick(context);

    return Weaver({ C:id }).weave(`${cockPart} ${ballsPart}`);
  }

  function buildSmallBalls() {
    const twoInch = MeasurementHelper.inchesWithFractions(cock.testicleWidth, true, true);

    ballsPack.add(`{C:His} small scrotum is tight against the underside of his cock, the ${twoInch} wide orbs forming
      small bulges in the wrinkled flesh.`);
    ballsPack.add(`{C:His} small, ${twoInch} wide {balls} are held in a tight sack at the base of {C:his} cock.`);
  }

  function buildAverageBalls() { ballsPack.add(`{C:He} has average balls.`); }
  function buildBigBalls() { ballsPack.add(`{C:He} has big balls.`); }
  function buildHugeBalls() { ballsPack.add(`{C:He} has huge balls.`); }
  function buildMonsterBalls() { ballsPack.add(`{C:He} has monster balls.`); }

  function buildFullNormalDescription() {

    if (cock.size === 'tiny') {
      if (cock.length < 26) {
        cockPack.add(`{C:His} micropenis is tiny. At {C:cock.sixInches} long it's as wide as it is long. Little more 
          than a sensitive cockhead, or a thick clit.`);
        cockPack.add(`{C:His} little micropenis is so tiny, it could easily be confused for a bulbous clit. At 
          {C:cock.sixInches} long it's barely as long as it is wide.`);
      }
      cockPack.add(`{C:His} cock is, in a word, cute; barely {C:cock.sixInches} in length, even when fully hard.`);
      cockPack.add(`{C:His} little dick is tiny, cute even. Even when hard it barely extends {C:cock.sixInches} from 
        {C:his} slender waist.`);
    }

    if (['small','average','big'].includes(cock.size)) { cockPack.add(`Just a normal dick, ranging from small to big`); }
    if (cock.size === 'huge') { cockPack.add(`TODO: Describe a huge human cock.`); }
    if (cock.size === 'monster') { cockPack.add(`TODO: Describe a monstrous human cock.`); }
    if (cock.size === 'giant') { cockPack.add(`TODO: Describe a gigantic human cock.`); }
    if (cock.size === 'titanic') { cockPack.add(`TODO: Describe a titanic human cock.`); }
  }

  function buildFullHorseDescription() { cockPack.add(`TODO: Horse cock descriptions.`); }
  function buildFullDogDescription() { cockPack.add(`TODO: Dog cock descriptions.`); }
  function buildFullDragonDescription() { cockPack.add(`TODO: Dragon cock descriptions.`); }

  return {
    buildFullDescription,
  }

};
