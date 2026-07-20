# Inventory View (Task 125 UI)

## Context

Wire the existing managers into a UI: a scrolling inventory list (equipped items sorted to top by slot, with slot icons), a verb button row (Equip / Use / Drop / Trade), and a trade panel listing reachable inventories. Built as its own reusable view, mounted for now in the character overlay's equipment tab. In the future we'll also need inventories for other containers. The overlay also gets gated to player/roster characters only.

**Decisions already made:**
- Drop destroys the item (with a Confirmation dialog).
- Ambiguous equips (multiple valid slots — one-hand weapons) open a slot-picker chooser element.
- Slot icons wire to `assets/icons/slot-<slot>.png`; the art will be supplied later. Missing images render as empty squares in the meantime.
- Use is an always-disabled stub (no consumable items exist yet).

## Step 1 — EquipmentManager additions

`application/items/equipment-manager.js`:
- `getEquippedSlot(itemId)` → the slot currently holding this item, or null.
- `getValidSlots(itemId)` → `Object.values(EquipmentSlot).filter(slot => canEquipItem(itemId, slot))`
  (array — one-hand weapons fit primary or secondary).
- `unequipItem(itemId)` → `equipItem(null, getEquippedSlot(itemId))` when equipped.

## Step 2 — Headless additions

`application/items/inventory-manager.js` (per-character concerns live on the existing manager):
- `listItems()` → sorted `[{ itemId, name, type, slot }]`. Equipped rows first in `EquipmentSlot` enum
  declaration order, then unequipped rows by `name.localeCompare`. `slot` is null when unequipped.
- `dropItem(itemId)` — unequip (via `EquipmentManager(characterId)`) → `removeItem` →
  `Registry.deleteEntity(itemId)`. Equipped items are droppable (auto-unequip); the Confirmation dialog
  guards accidents.

New `application/items/inventory-system.js` — singleton IIFE `global.InventorySystem`, focused on moving
items *between* inventories:
- `getReachableInventories(characterId)` → `[{ id, name }]`: the player (`state.getPlayer()` — not guaranteed
  present in the party configuration) + party configuration keys + roster members whose
  `SituatedComponent.currentLocation` matches `state.getCurrentLocation()` (skip if no situated component).
  Dedupe, exclude self and anyone without an `InventoryComponent`. Built from an internal ordered provider
  list so armory / bag-of-holding inventories can be appended later.
- `transferItem(itemId, sourceId, destinationId)` — unequip → `removeItem` from source → `addItem` to
  destination. Order is mandatory: `EquipmentComponent.validate` requires equipped items to be in the owner's
  inventory.

## Step 3 — The view

New `application/views/character/inventory-panel.js`: factory view
`global.InventoryPanel = function(characterId)` returning `Object.freeze({ getElement, refresh, resize })`
(pattern: `combatant-panel.js`). DOM via `X.createElement`:

```
div.inventory-panel
  div.inventory-main
    div.item-list-frame > div.item-list      ← ScrollingPanel({element})
      div.item-row [data-item-id]
        div.slot-icon (equipped rows only)   ← background-image: X.assetURL(`icons/slot-${slot}.png`)
        div.item-name
    div.verb-row.button-row                  ← Equip / Use(.disabled) / Drop / Trade [data-verb]
  div.trade-panel.hide                       ← "Give to..." + div.trade-destination [data-destination-id]
```

- **Events:** one `click` listener on the panel root (NOT `X.onClick` — the panel is rebuilt each overlay
  open; window-level listeners would stack). Dispatch via `event.target.closest('[data-item-id]')` /
  `[data-verb]` / `[data-destination-id]`; ignore clicks inside `.disabled`.
- **Selection:** local `selectedItemId`; row click toggles `.selected` (single-select), hides the trade
  panel, runs `updateVerbs()`.
- **`updateVerbs()`** (early-return helpers): no selection → all disabled. Equipped selection → Equip button
  reads "Unequip". Unequipped → Equip enabled iff `getValidSlots` non-empty. Use always disabled. Trade
  enabled iff reachable inventories exist.
- **Equip verb:** equipped → `unequipItem` + refresh; one valid slot → equip immediately; multiple → slot
  picker.
- **Slot picker** (private to this file): `div.item-select-window.slot-picker` reusing the unused CSS stub in
  `styles/elements/item-select.scss`; one `.item-element` per valid slot showing
  `StringHelper.titlecaseAll(slot)` + current occupant name or "empty", `data-slot` attr. Click equips into
  that slot; clicks elsewhere close it.
- **Drop verb:** `Confirmation.show({ text, onConfirm: dropItem + clear selection + refresh })`.
- **Trade verb:** toggle `.trade-panel`, fill from `getReachableInventories`; destination click →
  `transferItem`, clear selection, hide panel, refresh.
- `refresh()` rebuilds rows, re-runs verbs, `scrollingPanel.resize()`. `resize()` proxies the ScrollingPanel
  resize (it no-ops while hidden — `scrolling-panel.js:62` returns early on `clientHeight === 0`).

## Step 4 — Character overlay integration

- `views/character-overlay.html` — rename tab label "Equipment" → "Inventory" (keep `data-tab="equipment"` /
  `#equipmentTab` ids); empty the TODO stub.
- `application/views/character/character-overlay.js` — module-level `let inventoryPanel;`. In `update()`:
  `inventoryPanel = InventoryPanel(id)` and fill `#equipmentTab` with its element. In `init()`: `X.onClick`
  on the equipment tab calling `inventoryPanel.resize()` so the scrollbar sizes on first tab activation.
  **Risk:** races TabController's delegated listener on the same click — if the panel is still hidden when
  resize runs, wrap in `setTimeout(…, 0)`. Verify manually.

## Step 5 — Gate the overlay

`application/views/locations/location-view.js` `characterClicked` (~line 65): early-return unless
`GameSystem.getState().isInRoster(characterId)`. Non-roster/NPC clicks do nothing (monster and NPC inspect
panels are future tasks). The player entry point (`game-state-frame.js:104`) is unchanged.

## Step 6 — SCSS

- New `styles/views/inventory-panel.scss`: `.inventory-panel` flex row; list frame with explicit height
  (ScrollingPanel needs a clientHeight); `.item-row` ~32px flex with hover/`.selected` via
  `variables.$select-shade`; `.slot-icon` 24×24 `background-size: contain`; `.trade-panel` fixed-width right
  column. Verbs reuse the global `.button` / `.button-row` / `.disabled` styles.
- `styles/blackbird.scss` — add `@use 'views/inventory-panel';`.

## Step 7 — Tests

- `test/items/inventory-manager-spec.js`: add `listItems` exact sort order (hard-coded expected names) and
  `dropItem` (`Registry.entityExists` false, works on equipped item).
- New `test/items/inventory-system-spec.js`: `getReachableInventories` (player + party member + co-located
  roster member in; absent roster member and self out; player not duplicated when also in party);
  `transferItem` (equipped item ends unequipped, moved, equipment validate doesn't throw).
- `test/items/equipment-manager-spec.js`: add `getEquippedSlot` / `getValidSlots` / `unequipItem` specs.

## Verification

1. `bash bin/compile-manifest.sh`, then `npm run test`.
2. Manual UI checklist (in Electron): overlay opens for player + roster, NPC clicks do nothing; equipped
   items on top in slot order with icon squares; select/deselect + verb enable states; equip a helm
   (immediate) vs a one-hand weapon (slot picker with occupant names); Unequip re-sorts; Drop (confirm →
   gone); Trade to a party member and verify arrival in their overlay; trade an equipped item
   (auto-unequips); scrollbar correct on first tab activation with 15+ items.

## Risks

- Tab-activation resize ordering — may need `setTimeout 0`.
- ScrollingPanel inside a fixed-position overlay may need `setContentHeight` (see the warning at
  `scrolling-panel.js:56-59`).
- `assets/icons/slot-*.png` don't exist yet; missing images render as empty squares until art arrives.
