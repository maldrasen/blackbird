global.PersistedAction = function(code, context) {
  const sexAction = SexAction.lookup(code);
  const playerParts = sexAction.getUses().player;
  const partnerParts = sexAction.getUses().partner;

  function getName() {
    return Weaver(context).weave(sexAction.getPersistedName());
  }

  function usesParts(player, partner) {
    const allPlayer = player.every(part => playerParts.includes(part));
    const allPartner = partner.every(part => partnerParts.includes(part));
    return allPlayer && allPartner
  }

  return Object.freeze({
    getCode: () => { return code; },
    getName,
    getSexAction: () => { return sexAction; },
    getPlayerParts: () => { return [...playerParts] },
    getPartnerParts: () => { return [...partnerParts] },
    usesParts,
  });
}
