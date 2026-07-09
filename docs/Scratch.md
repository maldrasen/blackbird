






Also let's wire up the potential before I forget to do that. The @application/items/weapon.js wrapper has a getEnchantment function that gets an enchantment as a plain javascript object. We also have a WeaponEnchantment wrapper that takes this enchantment. The enchantment power is used directly here, but we need to be able to look up the enchanted weapon's material and apply the factor to the power. The WeaponEnchantment wrapper will need a handle to the weapon that it enchants, probably as an argument to the factory function.

Armor will also need the same thing, so we can create an ArmorEnchantment that follows the same pattern, even if there are no armor enchantments yet.