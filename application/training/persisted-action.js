global.PersistedAction = function(code, context) {
  const action = SexAction.lookup(code);
  const playerParts = action.getUses().player;
  const partnerParts = action.getUses().partner;

  function getName() {
    return Weaver(context).weave(action.getPersistedName());
  }

  function usesParts(player, partner) {
    const allPlayer = player.every(part => playerParts.includes(part));
    const allPartner = partner.every(part => partnerParts.includes(part));
    return allPlayer && allPartner
  }

  return Object.freeze({
    getCode: () => { return code; },
    getName,
    getAction: () => { return action; },
    getPlayerParts: () => { return [...playerParts] },
    getPartnerParts: () => { return [...partnerParts] },
    usesParts,
  });
}
