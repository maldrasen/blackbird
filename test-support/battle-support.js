global.BattleSupport = (function() {

  // The party the battle specs are written against, so it stays as it is whatever the menu fixtures change. The player
  // stands at P.0.2 with a one handed sword and a shield, a tank at P.0.3, and a rogue at P.1.2 and P.1.3, each with a
  // plain dagger in both hands. Nothing is enchanted and every skill is fixed, so a round spends no rolls the specs
  // didn't ask for; a spec that needs an enchantment or a skill level equips or sets it itself.
  //
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

  function prepareParty() {
    addPlayer('P.0.2');
    addTank('P.0.3');
    addRogue('P.1.2');
    addRogue('P.1.3');
  }

  function startBattle(encounter=runtPack()) {
    prepareParty();
    BattleSystem.startBattle({ ambushState:'normal', ...encounter });
    return BattleSystem.getState();
  }

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startCharacterRound(acting, target) {
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'character', id:acting });
    BattleSystem.specRound(acting, { target });
  }

  function addPlayer(position) {
    const player = CharacterSupport.player();
    setSkill(player,'swords',30);
    ItemSupport.equip(player, 'longsword', ['steel']);
    ItemSupport.equip(player, 'round-shield', ['steel']);
    equipOutfit(player, PlayerOutfit);
    PartyConfiguration.setCharacter(player,position);
  }

  function addTank(position) {
    const tank = addCharacter({ skills:{ block:15, swords:15 }});

    ItemSupport.equip(tank, 'longsword', ['steel']);
    ItemSupport.equip(tank, 'round-shield', ['steel']);
    equipOutfit(tank, TankOutfit);
    PartyConfiguration.setCharacter(tank,position);
  }

  function addRogue(position) {
    const rogue = addCharacter({ skills:{ stealth:15, daggers:15 }});

    ItemSupport.equip(rogue, 'dagger', ['steel']);
    ItemSupport.equip(rogue, 'dagger', ['steel'], { slot:EquipmentSlot.secondary });
    equipOutfit(rogue, RogueOutfit);
    PartyConfiguration.setCharacter(rogue,position);
  }

  // A party member needs the components the roster gives a recruit, with placeholder control and feelings values.
  function addCharacter(options) {
    const id = CharacterFactory.build(options);
    const state = GameSystem.getState();
    const location = state.getCurrentLocation();

    ControlledComponent.create(id,{ control:0 });
    ArousalComponent.update(id,{ arousal:Random.between(0,25) });
    state.addToRoster(id);

    if (location) {
      SituatedComponent.create(id,{ currentLocation:location });
    }

    FeelingsComponent.create(id,{ target:state.getPlayer(),
      affection: Random.between(100,400),
      respect: Random.between(100,400),
      fear: Random.between(0,200)
    });

    return id;
  }

  function equipOutfit(id, outfit) {
    outfit.forEach(([code, materials]) => ItemSupport.equip(id, code, materials));
  }

  function setSkill(id, code, value) {
    const skills = SkillsComponent.lookup(id);
    skills[code] = value;
    SkillsComponent.update(id, skills);
  }

  function grantMana(color, amount) {
    const player = GameSystem.getState().getPlayer();
    const mana = ManaComponent.lookup(player);
    mana[color].max = amount;
    mana[color].current = amount;
    ManaComponent.update(player,mana);
  }

  // Stock encounter data for specs that need a battle without going through a cohort or an encounter record. Pass
  // to startBattle() in place of the runt pack, or spread into the BattleSystem.startBattle() options.
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
    prepareParty,
    startBattle,
    startCharacterRound,
    grantMana,
    runtPack,
    trapperPack,
  };

})();
