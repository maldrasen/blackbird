# Plan 2: Equipment Single-Slot Refactor

The original design let armor span multiple slots (`slots: [...]` arrays on BaseArmor records, with
`canEquipItem`'s comment anticipating cross-slot replacement on equip). That adds complexity nothing uses:
every one of the ~25 armor records in `data/armor/*.js` has a single-element `slots` array. Refactor to a
single `slot` value per armor record.

## Changes (full consumer list, verified by grep)

- `data/armor/{chests,feet,hands,head,legs}.js` — `slots: [EquipmentSlot.x]` → `slot: EquipmentSlot.x` on
  every record.
- `application/records/base-armor.js:63` — `getSlots()` → `getSlot()` returning `armor.slot`.
- `application/items/equipment-manager.js:19-23` — armor branch of `canEquipItem` becomes
  `base.getSlot() === slot`; delete the multi-slot comment block (lines 15-18).
- `application/components/equipment-component.js:41` — validate check becomes `base.getSlot() !== slot`.
- `application/items/character-equipper.js:148` — filter becomes `armor.getSlot() === slot`.
- `application/test/report-fixture.js:140` — `slot: armor.getSlots().join(',')` → `slot: armor.getSlot()`.

## Out of scope

Weapons are untouched — handedness (`main`/`off`/`one`/`two` vs primary/secondary) already models their slot
fit. Two-handed weapons occupying only `primary` (leaving `secondary` free for a shield) remains current
engine behavior.

## Verification

Existing suites (`base-armor-spec`, `equipment-manager-spec`, `character-equipper-spec`) don't reference
`getSlots` directly, so they should pass unchanged — run `bash bin/compile-manifest.sh` then `npm run test`
to confirm. No new specs needed; the inventory view task adds equipment-manager specs that cover the
single-slot accessors.
