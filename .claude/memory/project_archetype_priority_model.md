---
name: archetype-priority-model
description: "Archetype selection priority: name triggers > base monster archetypes map > ArchetypeDistribution(gender, species); kobold/vermen archetypes removed"
metadata: 
  node_type: memory
  type: project
  originSessionId: 891c51ce-550f-40bf-b245-85240529469a
  modified: 2026-07-28T15:41:36.212Z
---

Implemented 2026-07-28 on branch remove-kobold-archetypes: the gender-locked kobold-dom/kobold-sub/vermen-dom/vermen-sub archetypes are gone (records, enums, dialog dirs deleted). Archetype selection in PersonalityFactory.buildPersonality now goes: `~archetype` name triggers first ("named for their personality"), then the base monster's optional `archetypes` frequency map (filtered to what the species+gender map allows), then ArchetypeDistribution(gender, species), which now has kobold and vermen multiplier blocks. Base monsters pass the map through MonsterFactory → CharacterFactory `options.archetypes`. SexualPreferencesFactory no longer rejects preference triggers on kobolds/vermen. The user tunes the drafted frequency numbers themselves. See [[roster-and-name-pool]].
