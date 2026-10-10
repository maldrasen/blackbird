---
name: project_test_speed_task222
description: Task 222 test-speed root cause — V8 map churn (not the floor factory) made floor builds 6x slower late in the suite; fixed by caching/freezing Feature/Room bounds + location; how to profile specs via a custom mocha reporter
metadata: 
  node_type: memory
  type: project
  originSessionId: 626ba60b-aed2-421e-9e81-08bb4ac16ca9
  modified: 2026-09-16T02:29:25.804Z
---

Task 222 (2026-09-15): the suite went 5s → 2s. The task's premise (floor factory is slow, route around it) was wrong: a floor builds in ~15ms standalone. Late in the suite the same build took 60-110ms because major GCs mid-run cleared the weakly held V8 maps of short-lived `{xMin,xMax,yMin,yMax}` objects; on recreation they got new identities and the clone/literal sites in `Feature.getBounds/getLocation` and `Room.getBounds` went megamorphic (~40x slower per call, permanent for the process). Symptom signature: spec fast in isolation, slow only after enough earlier specs; CPU profile self-time piles onto a trivial getter.

**Why:** the fix (cache + `Object.freeze` the bounds/location objects, invalidate on `addRoom`/`setPosition`) works by not allocating per call in the O(n²) closest-pair loop, so there are no short-lived maps to churn. Any future hot loop that allocates literals per call can regress the same way.

**How to apply:** profile with `bin/test.sh --reporter <abs path to a custom mocha reporter .js>` (Mocha accepts a module path; require mocha by absolute node_modules path from the scratchpad). Mocha runs specs in manifest order, so `--grep "^(A|B|Dungeon)"` bisections by suite title reproduce order-dependent slowness. Remaining fixed costs: ~450ms module loading (642 files), ~90ms mocha `checkLeaks`, floor builds ~15ms each (~65 per run). The `{...obj}` spread of a cached object is what went slow first; prefer returning frozen cached objects from hot getters. Related: [[project_headless_test_runner]], [[feedback_canonical_test_command]].
