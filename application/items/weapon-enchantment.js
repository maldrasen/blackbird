global.WeaponEnchantment = function(enchantment) {

  // Environment includes: { attacker, target, damage }
  // The result return value should include the updated damage and a message.
  function processOnHit(environment) {
    const result = {};
    console.log("=== Process On Hit ===");
    console.log("Enchant:",enchantment)
    console.log("Env:",environment);
    return result;
  }

  return Object.freeze({
    processOnHit,
  });
}
