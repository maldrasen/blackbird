# Plan 1: Item & Inventory Bug Fixes

Two latent bugs found while exploring for task 125 (the inventory view). Both are exercised heavily by the
upcoming UI — trade paths and item-name display — so they get fixed first, standalone.

## Bug 1: `InventoryManager.addItem` cross-inventory guard never worked

`application/items/inventory-manager.js:21` calls `hasItem(invId, itemId)`, but `hasItem` takes only `itemId`
and closes over the current character — the guard actually asks "does this inventory contain the other
inventory's owner id", which is always false. The duplicate-across-inventories check has never done anything.

**Fix:** iterate `Registry.findEntitiesWithComponents([ComponentType.inventory])` and check
`InventoryComponent.lookup(ownerId).items.includes(itemId)` directly; throw naming the offending inventory.

## Bug 2: `Item(id).getName()` always returns `undefined`

`application/items/item.js:4` reads `.name` off `ItemComponent`, whose property whitelist is `['type']` only —
a `name` key can never exist there, so `getName()` always returns `undefined`. (`isLewd()` has the same issue
but stays as-is for now.)

**Fix:** branch on `ItemComponent.lookup(id).type` — `'armor'` → `Armor(id).getName()`, `'weapon'` →
`Weapon(id).getName()`, early-return style. Both wrappers already fall back to base-record names when there's
no custom name.

## Tests

- `test/items/inventory-manager-spec.js` — the file exists with three pending `it()` stubs; implement the
  `addItem` specs: adding an item already held by *another* inventory throws, and re-adding to the same
  inventory throws.
- New `test/items/item-spec.js` — `getName()` returns base names and custom names for both weapons and armor
  (e.g. `WeaponFactory.build('hatchet', { name: 'Gutripper' })`).

## Verification

Run `bash bin/compile-manifest.sh` (tests load from the manifest's testFileList), then `npm run test`. Watch
for collateral failures in CharacterEquipper / fixture paths now that the addItem guard actually works.
