global.CockDescriber = function(id) {
  const cock = CockComponent.lookupNormalOf(id);
  const pack = WeaverPackage('cock-description');

  console.log(cock);

  function buildFullDescription() {
    switch (cock.shape) {
      case 'normal': buildFullNormalDescription(); break;
      case 'dog': buildFullDogDescription(); break;
      case 'dragon': buildFullDragonDescription(); break;
      case 'horse': buildFullHorseDescription(); break;
      default: throw new Error(`Unknown Cock Shape: ${cock.shape}`);
    }
    return Weaver({ C:id }).weave(pack.pick({ C:id }));
  }

  function buildFullNormalDescription() {
    if (cock.size === 'tiny') { pack.add(`TODO: Describe a tiny human cock.`); }
    if (['small','average','big'].includes(cock.size)) { pack.add(`Just a normal dick, ranging from small to big`); }
    if (cock.size === 'huge') { pack.add(`TODO: Describe a huge human cock.`); }
    if (cock.size === 'monster') { pack.add(`TODO: Describe a monstrous human cock.`); }
    if (cock.size === 'giant') { pack.add(`TODO: Describe a gigantic human cock.`); }
    if (cock.size === 'titanic') { pack.add(`TODO: Describe a titanic human cock.`); }
  }

  function buildFullHorseDescription() { pack.add(`TODO: Horse cock descriptions.`); }
  function buildFullDogDescription() { pack.add(`TODO: Dog cock descriptions.`); }
  function buildFullDragonDescription() { pack.add(`TODO: Dragon cock descriptions.`); }

  return {
    buildFullDescription,
  }

};
