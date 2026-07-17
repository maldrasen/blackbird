---
id: 114
title: Rework death mechanics
priority: 2
created: 2026-07-17
points: 8
tags: []
---
---
Monsters and characters are killed when they drop to 0 HP. I think I want to rework this so that there's a chance that they'll only be mostly dead. First we need to update the health component to allow negative health. When an attack brings a character to 0 HP they're knocked out. The fight mechanics are the same, they're removed from the formation. However after the battle we can revive a knocked out character immediately. Only a character that drops below a negative threshold will be killed. Threshold should be based on vitality, maybe at -vitality they're dead. That or something like -10% of max health. We'll look at the numbers. 

As part of this we should rework the dead and fled piles. The battle state should have condition map, where each entity can be alive, dead, knocked-out, or fled. Better than managing three arrays of conditions. 

With this change there's a possibility that monsters will be knocked out after the battle, but not dead. Most of the knocked out monsters should still die or this will be too common. Knocked out monsters should remain in the turn order when knocked out, rolling silent death saves. That way monsters who were knocked out later are more likely to be alive after the battle. They roll their first (more difficult) save when they're first knocked out though, so there's still a large chance they won't survive.

We'll add an after battle episode to decide what to do with the knocked out monsters. They can be finished off for more experience, healed (that's a whole other can of worms I'll have to think over), or captured (there's a separate task for that).

---
**Notes (Claude):** A cross-cutting battle change. Allow negative health (`health-component.js` currently clamps at 0 in `moderate()`), KO at 0, death only past a vitality-based threshold. Replace the dead/fled arrays with a condition map (alive / dead / knocked-out / fled) on the battle state — touches `battle-death-system.js`, `battle-state`, and the win/loss checks. KO'd monsters stay in the turn order rolling silent death saves (first save the hardest, so late KOs survive more often). Adds an after-battle episode to handle survivors. Prerequisite for [[115-add-deathblow-messages]] and [[116-capture-monsters]]; overlaps the after-battle flow in [[017-game-over-episode]].
