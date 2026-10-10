---
name: project_addmessage_weaves
description: "BattleRound.addMessage always weaves message.text; pass raw templates, never pre-woven HTML"
metadata: 
  node_type: memory
  type: project
  originSessionId: b016b49c-9c69-42ca-8c64-efb6171a9b40
---

`BattleRound.addMessage(message, weaver=null)` (application/battle/battle-round.js) ALWAYS calls `message.text = weaver.weave(message.text)`, defaulting the weaver to `Weaver(getContext())` from the round context.

So callers must pass a **raw weaver template** as `message.text`, never already-woven HTML. Pre-weaving (`weaver.weave(...)`) before calling addMessage double-weaves: the second pass sees the injected `<span style="...">` attribute quotes as authored dialogue and wraps them in smart-quote spans, shattering the markup. This was the hide-action bug (data/abilities/hide.js) — fixed by passing the raw template + weaver to addMessage instead of pre-weaving.

Pattern to follow (see data/abilities/basic-attack.js): build message text as a template string, pass the weaver as the 2nd arg. Related: [[project_equipment_material_model]] weapon-name spans are what get mangled.

This is now ENFORCED: Weaver.weave() prefixes its output with an invisible zero-width marker (U+2060 WORD JOINER, application/weaver/weaver.js) and throws on entry if the source already contains that marker. So a double weave fails loud instead of silently mangling markup. A zero-width prefix (not a wrapper `<span>`) is used because some templates emit block-level HTML (e.g. data/episodes/game-start-1.js uses `<p>`/`<div>` and resultBlock emits `<ul>`) that a span would nest illegally. Empty/null weave results return '' unmarked. If you need raw text without the marker, fix the caller to weave once rather than stripping downstream.
