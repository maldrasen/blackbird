global.ActorLoom = (function() {

  const BREASTS_PATTERN = /^breasts\.(.*)/;
  const COCK_PATTERN = /^cock\.(.*)/;
  const PUSSY_PATTERN = /^pussy\.(.*)/;
  const SPECIES_PATTERN = /^species\.(.*)/;

  function weave(id, token) {
    let match = token.match(BREASTS_PATTERN);
    if (match) { return BreastsLoom.weave(id, match[1]); }

    match = token.match(COCK_PATTERN);
    if (match) { return CockLoom.weave(id, match[1]); }

    match = token.match(PUSSY_PATTERN);
    if (match) { return PussyLoom.weave(id, match[1]); }

    match = token.match(SPECIES_PATTERN);
    if (match) { return speciesValue(id, match[1]); }

    switch (token) {
      case `he`: return PronounHelper.he(ActorComponent.lookup(id).gender);
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
      case `full-name`: return Character(id).getFullName();
      default: return Weaver({}).formatWarning(`Actor:[${token}]`)
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

      default: return Weaver({}).formatWarning(`Actor:Species[${token}]`);
    }
  }

  return Object.freeze({ weave });

})();
