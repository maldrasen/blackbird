global.ActorLoom = (function() {

  function weave(id, token) {
    switch (token) {
      case `he`: return PronounHelper.he(ActorComponent.lookup(id).gender);
      case `him`: return PronounHelper.him(ActorComponent.lookup(id).gender);
      case `his`: return PronounHelper.his(ActorComponent.lookup(id).gender);
      case `hers`: return PronounHelper.hers(ActorComponent.lookup(id).gender);
      case `name`: return Character(id).getName();
      case `name's`: return EnglishHelper.possessive(Character(id).getName());
      case `full-name`: return Character(id).getFullName();
      default: throw `Unknown Token (${token})`
    }
  }

  return Object.freeze({ weave });

})();
