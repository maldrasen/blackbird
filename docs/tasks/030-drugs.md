---
id: 030
title: Drugs
priority: 4
created: 2026-07-03
points: 13
tags: [training]
---
---
Drugs or alcohol can be used as mood enhancers. Drugging a person against their will would of course produce anger, but you could be sneaky about it, if we had some kind of slight of hand skill. A strong enough drug and they won't even remember. A drugged character doesn't receive as much anima or animus, the amount reduced should depend on drug strength.

We're going to have a variety of drugs with different methods for giving them to the partner. They could be drunk, injected, inserted like a suppository, maybe even smoked or snorted. The way a drug is taken effects the consent values for the action, and also the effect in some cases. A sensitivity drug might be localized to only work on the part where it is inserted or injected.

This drug action though is very complex. I think I need to have a single 'use drug' action that starts an event. In the event you select which drug from your inventory, and where and how you want to administer it. The final choice in this event should use the same consent results, which would mean that the consent result model needs to also calculate consent for arbritrary event actions as well. That shouldn't be too involved, just using the same consent factors and target value.

Drugged should be a priority status effect that appears early in the sex action text tree, as the drugged version of a personality might be wholly different from their normal personality. Although some drugs, that only effect sensitivity, won't change personality at all.

---
**Notes (Claude):** Complex, as you note — recommend splitting into: (a) generalize the consent model (`consent-result.js`) to score arbitrary event actions, not just `SexAction`s — a reusable prerequisite that also helps [[028-orders]]; (b) drug items + a "use drug" event to pick drug / site / method, where the method affects both consent and effect (some effects localized to the injected part), needing a sleight-of-hand skill for covert dosing; (c) a `drugged` status effect placed high in the sex-action text tree so a drugged personality reads differently, plus reduced anima/animus scaled by drug strength.
