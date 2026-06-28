global.ActorLoom = (function() {

  const BODY_PATTERN = /^body\.(.*)/;
  const BREASTS_PATTERN = /^breasts\.(.*)/;
  const COCK_PATTERN = /^cock\.(.*)/;
  const PUSSY_PATTERN = /^pussy\.(.*)/;
  const SPECIES_PATTERN = /^species\.(.*)/;

  function weave(id, token) {
    let match = token.match(BODY_PATTERN);
    if (match) { return BodyLoom.weave(id, match[1]); }

    match = token.match(BREASTS_PATTERN);
    if (match) { return BreastsLoom.weave(id, match[1]); }

    match = token.match(COCK_PATTERN);
    if (match) { return CockLoom.weave(id, match[1]); }

    match = token.match(PUSSY_PATTERN);
    if (match) { return PussyLoom.weave(id, match[1]); }

    match = token.match(SPECIES_PATTERN);
    if (match) { return speciesValue(id, match[1]); }

    switch (token) {
      case `he`: return PronounHelper.he(ActorComponent.lookup(id).gender);
      case `he's`: return PronounHelper.hes(ActorComponent.lookup(id).gender);
      case `him`: return PronounHelper.him(ActorComponent.lookup(id).gender);
      case `his`: return PronounHelper.his(ActorComponent.lookup(id).gender);
      case `hers`: return PronounHelper.hers(ActorComponent.lookup(id).gender);
      case `man`: return PronounHelper.man(ActorComponent.lookup(id).gender);
      case `men`: return PronounHelper.men(ActorComponent.lookup(id).gender);
      case `He`: return StringHelper.titlecase(weave(id,'he'));
      case `Him`: return StringHelper.titlecase(weave(id,'him'));
      case `His`: return StringHelper.titlecase(weave(id,'his'));
      case `Hers`: return StringHelper.titlecase(weave(id,'hers'));
      case `Man`: return StringHelper.titlecase(weave(id,'man'));
      case `Men`: return StringHelper.titlecase(weave(id,'men'));
      case `name`: return Character(id).getName();
      case `name's`: return EnglishHelper.possessive(Character(id).getName());
      case `fullName`: return Character(id).getFullName();

      case `actingName`: return compileName(id, 'act', false);
      case `actingName's`: return EnglishHelper.possessive(compileName(id, 'act', false));
      case `ActingName`: return compileName(id, 'act', true);
      case `ActingName's`: return EnglishHelper.possessive(compileName(id, 'act', true));
      case `targetName`: return compileName(id, 'tar', false);
      case `targetName's`: return EnglishHelper.possessive(compileName(id, 'tar', false));
      case `TargetName`: return compileName(id, 'tar', true);
      case `TargetName's`: return EnglishHelper.possessive(compileName(id, 'tar', true));

      default: return Weaver({}).formatWarning(`[Actor:${token}]`)
    }
  }

  function speciesValue(id, token) {
    const actor = ActorComponent.lookup(id);
    const species = Species.lookup(actor.species);
    switch (token) {
      case `elf`: return species.getName().toLocaleLowerCase();
      case `elves`: return EnglishHelper.pluralize(species.getName()).toLocaleLowerCase();
      case `elven`: return species.getAdjective().toLocaleLowerCase();
      case `anElf`: return EnglishHelper.a_an(species.getName());

      default: return Weaver({}).formatWarning(`[Species:${token}]`);
    }
  }

  // Monsters have both names and base names because the monster factory builds the monster with an actor component.
  // (Which has the actor name) In the battle UI though it doesn't make sense to call monsters by their first name, so
  // we call them by the name of the base monster they're derived from. The attack text is used by both the characters
  // and monsters though, so when the attack text is for a character we use the character's actual name. Also, monsters
  // can have common names like "Kobold Dick Puncher" or proper names like "Old Greg" so this function prefixes common
  // names with "the" so that they read better. The 'tag' is used to color the name text, and is optional.
  function compileName(id, tag=null, capitalize=false) {
    const the = capitalize ? 'The' : 'the';
    const start = tag ? `{S/${tag}}` : '';
    const end = tag ? `{/S}` : '';

    if (MonsterComponent.lookup(id)) {
      const base = Monster(id).getBaseMonster();
      return (base.getNameType() === 'proper') ? `${start}${base.getName()}${end}` : `${the} ${start}${base.getName()}${end}`
    }

    return `${start}${Character(id).getName()}${end}`;
  }

  return Object.freeze({
    weave,
    compileName,
  });

})();
