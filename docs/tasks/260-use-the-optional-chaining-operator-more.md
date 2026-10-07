---
id: 260
title: Use the optional chaining operator more
priority:
created: 2026-10-07
tags: []
points: 0
---
---
I had kind of forgotten that the optional chaining operator (`?.`) even exists. We should look though the codebase, finding places where we're doing null checks "by hand" or across multiple lines, in an effort to simplify things.

## Findings
Scanned `application`, `views`, `data`, `bin`, `test` and `main.js` on 2026-10-07. The operator is already in use in 8 places, all in `views/elements/item-detail-panel.js`. Strict `=== null` comparisons appear only 3 times in the codebase (none near these sites), so a chain that yields `undefined` where the old code yielded `null` is safe unless noted.

### Clean conversions
Same behaviour for every object or function value. Grouped so each group can be one unit of work.

**Battle and abilities**
- `application/battle/battle-system.js:24` `if (state) { state.cleanup(); }` → `state?.cleanup();`
- `application/battle/battle-system.js:43` `round && round.getActing() === entity` → `round?.getActing() === entity`
- `application/battle/battle-state.js:277` `abilityCooldowns[id] != null && abilityCooldowns[id][abilityId] != null` → `abilityCooldowns[id]?.[abilityId] != null`
- `application/battle/models/physical-attack-roll.js:30` `ability && ability.getTargetingMode() === …` → `ability?.getTargetingMode() === …`
- `application/battle/systems/monster-system.js:44` `ability && ability.isPossible()` → `ability?.isPossible()`
- `application/battle/systems/party-configuration.js:93` `match != null && match[1] === 'P'` → `match?.[1] === 'P'`
- `application/battle-abilities/factories/natural-attack.js:77` `options.canTarget && options.canTarget(target) === false` → `options.canTarget?.(target) === false`
- `application/battle-abilities/factories/natural-attack.js:107` `if (options.onHit) { options.onHit(acting, target); }` → `options.onHit?.(acting, target);`
- `application/battle-abilities/factories/special-attack.js:47` `options.isPossible && options.isPossible() === false` → `options.isPossible?.() === false`
- `application/battle-abilities/factories/special-attack.js:82` `if (options.onHit) { options.onHit(context.A, context.T); }` → `options.onHit?.(context.A, context.T);`

**Characters, dungeon, episodes, negotiations**
- `application/characters/factories/character-factory-state.js:87` and `:88` `blocks.cock != null && blocks.cock.placement === 'normal'` → `blocks.cock?.placement === 'normal'` (same for pussy)
- `application/characters/factories/cock-factory.js:103` and `:107` `cockData && cockData.testicleWidth` → `cockData?.testicleWidth`
- `application/characters/factories/sexual-preferences-factory.js:47` `pref.genders && pref.genders.includes(…) === false` → `pref.genders?.includes(…) === false`
- `application/dungeon/dungeon-floor.js:186` `(contents && contents.type === 'stairs') ? contents.direction : null` → `contents?.type === 'stairs' ? contents.direction : null`
- `application/negotiations/negotiation-system.js:96` `state != null && state.getMonster() === id && …` → `state?.getMonster() === id && …`
- `application/test/tests.js:23` `this.currentTest && this.currentTest.state === 'failed'` → `this.currentTest?.state === 'failed'`
- `application/browser.js:42` `mainWindow && mainWindow.webContents` → `mainWindow?.webContents`

**Helpers, items, records, weaver, world**
- `application/helpers/currency-helper.js:81` and `:82` `firstOption && firstOption.value <= remainingValue` → `firstOption?.value <= remainingValue`
- `application/helpers/geometry-helper.js:18` `footprint[y] != null && footprint[y][x] != null && footprint[y][x] !== false` → `footprint[y]?.[x] != null && footprint[y][x] !== false`
- `application/helpers/item-helper.js:30` `(profile || {})[type] || 0` → `profile?.[type] || 0`
- `application/helpers/random.js:67` `limits.within != null && limits.within.includes(value) === false` → `limits.within?.includes(value) === false`
- `application/helpers/random.js:126` `array && array.length` → `array?.length`
- `application/items/armor-enchantment.js:5` and `application/items/weapon-enchantment.js:5` `armor ? armor.getPrimaryMaterial() : null` → `armor?.getPrimaryMaterial()` (the next line already checks `== null`)
- `application/records/base-equipment.js:44` `(record.reduction || {})[type] || 0` → `record.reduction?.[type] || 0`
- `application/records/base-monster.js:99` `(monster.resistances||{})[type] || 0` → `monster.resistances?.[type] || 0`
- `application/records/dungeon-theme.js:22` `(theme.descriptions || {})[variety]` → `theme.descriptions?.[variety]` (the ternary on the next line stays)
- `application/records/material.js:7` `(material.factors || {})[name]` → `material.factors?.[name]`
- `application/records/record.js:29` `if (options.validate) { options.validate(record, code); }` → `options.validate?.(record, code);`
- `application/records/sex-action.js:125` `action.isPossible && action.isPossible(context) === false` → `action.isPossible?.(context) === false`
- `application/weaver/weaver-elements.js:19` `(block.options || {}).classname || ''` → `block.options?.classname || ''`

**Views**
- `views/battle/battle-text.js:55` `state != null && state.isAutoBattle()` → `state?.isAutoBattle()`
- `views/battle/command-panel.js:62` `if (button) { button.click(); }` → `button?.click();`
- `views/battle/formation-panel.js:180` `if (position) { position.click(); }` → `position?.click();`
- `views/battle/formation-panel.js:287` `if (move.animation) { move.animation.cancel(); }` → `move.animation?.cancel();`
- `views/dungeon/room-content-overlay.js:33` `loot && loot.length > 0` → `loot?.length > 0`
- `views/effects/move-animation.js:22` `if (options.onComplete) { options.onComplete(); }` → `options.onComplete?.();`
- `views/elements/bar-display.js:91` and `:100` `if (onComplete) { onComplete(); }` → `onComplete?.();`
- `views/elements/casement.js:103-105` three-line `if (resizeHandle) { … }` → `resizeHandle?.addEventListener(…);`
- `views/elements/item-detail-panel.js:20-22` `if (partySelect) { partySelect.hide(); }` → `partySelect?.hide();`
- `views/elements/item-detail-panel.js:87` `if (itemPanel) { itemPanel.update(); }` → `itemPanel?.update();`
- `views/elements/item-detail-panel.js:108-110` `if (buildActions) { buildActions(item).forEach(…); }` → `buildActions?.(item).forEach(…);` (the whole chain short-circuits)
- `views/elements/item-panel.js:58` `if (detailPanel) { detailPanel.update(null); }` → `detailPanel?.update(null);`
- `views/elements/item-panel.js:72-74` three-line `if (detailPanel) { … }` → `detailPanel?.update(…);`
- `views/elements/slider.js:29` `if (options.onChange) { options.onChange(value); }` → `options.onChange?.(value);`
- `views/elements/slider.js:103-105` three-line `if (input) { … }` → `input?.addEventListener('change', inputChanged);`
- `views/episodes/episode-view.js:35` `if (button) { button.click(); }` → `button?.click();`
- `views/episodes/episode-view.js:107`, `:114`, `:121` `if (callback) { callback(); }` → `callback?.();`
- `views/general/key-bindings-panel.js:102` and `:139` `if (onChange) { onChange(); }` → `onChange?.();`
- `views/interactions/dragon-drop.js:28` `registration.canDrag && registration.canDrag(element) === false` → `registration.canDrag?.(element) === false`
- `views/interactions/window-manager.js:37` `modal.isLocked && modal.isLocked()` → `modal.isLocked?.()`

**Scripts and specs**
- `bin/soak-tests.js:27` `summary && summary[0].startsWith(…)` → `summary?.[0].startsWith(…)`
- `test/dungeon/factories/tile-content-placer-spec.js:19` `contents && contents.type === TileContentType.trap` → `contents?.type === TileContentType.trap`

### Judgement calls
Convertible, but the behaviour shifts in an edge case, or the result reads worse.
- Ternaries with a literal fallback, `x ? x.y : null`. The `x?.y ?? null` form was tried at `application/battle/models/physical-attack-roll.js:80` and reverted on 2026-10-07 because the ternary is easier to parse than a chain plus `??`. Leave these as written: `application/dungeon/dungeon-floor.js:157`, `:163`, `:168`, `application/dungeon/models/room.js:374`, `application/records/consumable.js:43`, `application/records/encounter.js:5`, `application/world/key-bindings.js:148`, `views/exacto.js:98`, `bin/reports/loot-report-shared.js:28`, `bin/reports/negotiation-reaction-report.js:37`, `bin/soak-tests.js:32`.
- `typeof fn === 'function'` guards at `application/episodes/episode-page.js:25`, `views/episodes/episode-view.js:40`, `views/elements/confirmation.js:37` and `:42`. `fn?.()` still throws if the option is a non-function truthy value. Fine if those options are only ever a function or absent.
- Ternaries with a real fallback at `application/battle/battle-round.js:130` (`ability?.getName() ?? roundType`) and `application/battle/models/physical-attack-roll.js:36` and `:41` (`weapon?.getTextKey() ?? attackSource.getTextKey()`). With `??` the fallback is also used when the method itself returns null or undefined.
- Early return then call at `application/records/battle-command.js:19-20` and `application/episodes/episode-page.js:65-66`. Collapsing to `return fn?.(…) ?? fallback` treats an undefined return as "use the fallback". Marginal gain, probably leave as is.
- `application/records/sex-action.js:187` → `action.availableWhen?.isPossible?.(context) ?? true`. Big readability win with the same undefined-return caveat.

### Flagged but not convertible
- Assignment targets at `application/characters/factories/breasts-factory.js:105`, `cock-factory.js:119` and `:123`, `views/elements/slider.js:41`. `x?.y = v` is a syntax error.
- `test/dungeon/dungeon-system-spec.js:34` `other != null && other.getIndex() !== room.getIndex()`. The chained form is true when `other` is null, flipping the result.
- Guards that lead into multiple uses or a loop continue: `application/battle/systems/party-configuration.js:102`, `application/characters/skill-check.js:54-55`, `bin/reports/negotiation-question-report.js:59`, `application/dungeon/systems/dungeon-tile-system.js:40`, `application/battle-abilities/ability-appraiser.js:114`, `application/battle/systems/battle-damage-system.js:83`.
- `application/records/validators/reference-validator.js:81` `Object.keys(data.skills || {})` is a default value, not a null guard.