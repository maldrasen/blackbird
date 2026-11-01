describe("Ability.CastSpell", function() {

  // The flamescale screamer is the only spellcasting monster. A single monster battle puts it at M.0.2.
  function startBattle() {
    return BattleSupport.startBattle({ monster:'flamescale-screamer' });
  }

  it("rejects an unknown spell or a missing power level", function() {
    expect(() => Ability.CastSpell({ spell:'no-such-spell', powerLevel:1 })).to.throw('Bad Spell code');
    expect(() => Ability.CastSpell({ spell:'ember' })).to.throw('CastSpell.powerLevel');
  });

  it("is named for its spell and carries the monster's cooldown and priority", function() {
    const ability = Ability.CastSpell({ spell:'searing-lance', powerLevel:3, cooldown:2000, priority:75 });

    expect(ability.getName()).to.equal('Cast Searing Lance');
    expect(ability.getCooldown()).to.equal(2000);
    expect(ability.getPriority()).to.equal(75);
    expect(ability.getDetails()).to.deep.equal({ spell:'searing-lance', powerLevel:3 });
    expect(ability.isPossible()).to.equal(true);
  });

  it("targets an enemy for a single target spell, an ally for a support spell, and nobody for a formation spell", function() {
    expect(Ability.CastSpell({ spell:'ember', powerLevel:1 }).getTargetingMode()).to.equal(TargetingMode.anyEnemy);
    expect(Ability.CastSpell({ spell:'mending', powerLevel:1 }).getTargetingMode()).to.equal(TargetingMode.anyAlly);
    expect(Ability.CastSpell({ spell:'overwhelming-effulgence', powerLevel:2 }).getTargetingMode()).to.equal(null);
  });

  // Ember is a medium cast, so power level 1 takes 1000ms before the speed factor.
  it("spends the turn starting the cast and stores the spell for the caster's next action", function() {
    const state = startBattle();
    const caster = state.getActiveMonsters()[0];
    const target = BattleSupport.player();
    const ability = Ability.CastSpell({ spell:'ember', powerLevel:1 });

    BattleSystem.specRound(caster, { target });
    ability.execute();

    const round = BattleSystem.getRound();
    expect(round.getAbility()).to.equal(ability);
    expect(round.getTime()).to.equal(Math.ceil(1000 * round.getSpeedFactor()));
    expect(round.getMessages()[0].text).to.include('begins casting');
    expect(state.isCastingSpell(caster)).to.equal(true);

    BattleSystem.specRound(caster);
    expect(state.finishCastingSpell()).to.deep.equal({ code:'ember', powerLevel:1, target, targetPosition:'P.0.2' });
  });

  // Ember costs 2 red mana a level, paid as soon as the cast begins.
  it("spends a character's mana when the cast begins", function() {
    const state = startBattle();
    const player = BattleSupport.player();
    BattleSupport.grantMana(Mana.red, 10);

    BattleSystem.specRound(player, { target:state.getActiveMonsters()[0] });
    Ability.CastSpell({ spell:'ember', powerLevel:3 }).execute();

    expect(ManaSystem.getPool(player, Mana.red).current).to.equal(4);
    expect(state.isCastingSpell(player)).to.equal(true);
  });

  it("refuses a cast the character can't afford", function() {
    const state = startBattle();
    const player = BattleSupport.player();
    BattleSupport.grantMana(Mana.red, 5);

    BattleSystem.specRound(player, { target:state.getActiveMonsters()[0] });

    expect(() => Ability.CastSpell({ spell:'ember', powerLevel:3 }).execute()).to.throw("doesn't have 6 red mana");
    expect(state.isCastingSpell(player)).to.equal(false);
  });

  it("casts for free as a monster", function() {
    const state = startBattle();
    const caster = state.getActiveMonsters()[0];
    const before = ManaSystem.getPool(caster, Mana.red).current;

    BattleSystem.specRound(caster, { target:BattleSupport.player() });
    Ability.CastSpell({ spell:'ember', powerLevel:3 }).execute();

    expect(ManaSystem.getPool(caster, Mana.red).current).to.equal(before);
    expect(state.isCastingSpell(caster)).to.equal(true);
  });

});
