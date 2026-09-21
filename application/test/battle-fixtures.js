global.BattleFixtures = (function() {

  const koboldFucker = {
    name:'Longsword of Kobold Endangerment',
    enchantment:{ type:WeaponEnchantments.endanger, species:'kobold', power:100 }
  }

  // The party wears fixed outfits rather than shopping from an equipment depot. What a depot stocks is random, so a
  // shopper can come away missing a slot entirely (an unlucky player ends up with no pants, which changes which
  // negotiation questions are possible.)
  const PlayerOutfit = [
    ['hauberk',['steel']],
    ['chainmail',['steel']],
    ['boots',['leather']],
    ['gloves',['leather']],
  ];

  const TankOutfit = [
    ['breastplate',['steel']],
    ['greaves',['steel']],
    ['helm',['steel']],
    ['boots',['leather']],
  ];

  const RogueOutfit = [
    ['doublet',['leather']],
    ['leggings',['leather']],
    ['boots',['leather']],
  ];

  function prepareForBattle() {
    addPlayer('P.0.2');
    addTank('P.0.3');
    addRogue('P.1.2');
    addRogue('P.1.3');
  }

  function addPlayer(position) {
    const player = CharacterFixtures.randomPlayer();
    setSkill(player,'swords',Random.between(20,40));
    ItemFixtures.equip(player, 'longsword', ['steel'], koboldFucker);
    ItemFixtures.equip(player, 'round-shield', ['steel']);
    equipOutfit(player, PlayerOutfit);
    PartyConfiguration.setCharacter(player,position);
  }

  function addTank(position) {
    const tank = CharacterFixtures.randomCharacters(1,{ skills: {
      block: Random.between(10,20),
      swords: Random.between(10,20),
    }})[0];

    ItemFixtures.equip(tank, 'longsword', ['steel']);
    ItemFixtures.equip(tank, 'round-shield', ['steel']);
    equipOutfit(tank, TankOutfit);
    PartyConfiguration.setCharacter(tank,position);
  }

  function addRogue(position) {
    const rogue = CharacterFixtures.randomCharacters(1,{ skills:{
      stealth: Random.between(10,20),
      daggers: Random.between(10,20),
    }})[0];

    ItemFixtures.equip(rogue, 'dagger', ['steel']);
    ItemFixtures.equip(rogue, 'dagger', ['steel'], { slot:EquipmentSlot.secondary });
    equipOutfit(rogue, RogueOutfit);
    PartyConfiguration.setCharacter(rogue,position);
  }

  function equipOutfit(id, outfit) {
    outfit.forEach(([code, materials]) => ItemFixtures.equip(id, code, materials));
  }

  function setSkill(id, code, value) {
    const skills = SkillsComponent.lookup(id);
    skills[code] = value;
    SkillsComponent.update(id, skills);
  }

  // Stock encounter data for specs that need a battle without going through a cohort or an encounter record.
  // Spread into the BattleSystem.startBattle() options.
  function runtPack() {
    return {
      formation:[
        [0,1,1,1,0],
      ],
      monsters:{ 1:{ code:'kobold-runt' } },
    };
  }

  function trapperPack() {
    return {
      formation:[
        [0,1,1,1,0],
        [0,0,1,0,0],
      ],
      monsters:{ 1:{ code:'kobold-trapper' } },
    };
  }

  return {
    prepareForBattle,
    runtPack,
    trapperPack,
  };

})();