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
      case `baseName`: return findBaseName(id);
      case `baseName's`: return EnglishHelper.possessive(findBaseName(id));
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
  // and monsters though, so when the attack text is for a character we use the character's actual name.
  function findBaseName(id) {
    return MonsterComponent.lookup(id) ? Monster(id).getBaseName() : Character(id).getName();
  }

  return Object.freeze({ weave });

})();
