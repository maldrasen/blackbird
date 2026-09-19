global.EquipmentDepot = function(code) {
  const parameters = EquipmentParameters.lookup(code);

  // A depot needs an inventory component, but I don't think it needs much else...
  // We need a map somewhere that maps the depot based on the parameter codes to the inventory entity... probably in the game state.

}
