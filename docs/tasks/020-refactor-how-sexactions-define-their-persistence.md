---
id: 020
title: Refactor how SexActions define their persistence
priority: 3
created: 2026-07-03
tags: [training]
---
The way persistence is defined is a bit too terse and confusing. We should make the keys a bit more self-explanatory. Something more like:

```
persist: {
  becomes: 'get-deepthroat',
  minimumConsent: Consent.willing,
  fallback: 'get-blowjob',
}
```

The current revert and when keys controls whether the stop-check runs at all. An action with when but no revert never gets its consent rechecked. Only the presence of a fallback determines when a persisted action will stop. The original thinking was that the actions are 'partner driven' need to have their consent checked because it's their decision to keep going or not, while some actions are more player driven, so it's up to the player to decide to keep going or not. We could specify that an action is playerDriven or partnerDriven, and that it's the partnerDriven actions that need the consent values to be checked every round. Or we could have a system where if the partner stops consenting to an action the player is doing we have them do something to try and stop them, which would fold into the Denial Reactions system that I have yet to add.
