
NegotiationRequest.register('can-i-cut-you', {
  requirements: [
    CharacterRequirements.healthAtLeast('P', 10),
    CharacterRequirements.hasArchetypeIn('T',['bastard','bitch','maniac','pervert','savage']),
  ],
  requestText: `Can I cut you? Just a little bit...`,
  answers: {
    yes: { text:'Um... okay.', reaction:yesReaction },
    no: { text:'Refuse.', reaction:noReaction },
  },
  isRepeatable: false,
});

function yesReaction(context, parameters) {
  const archetype = Character(context.T).getArchetype();

  if (archetype === 'maniac') {
    return Reaction.respect(`{T:TargetName} pulls a knife and raises it high over {T:his} head. With a wild gleam in 
      {T:his} eye he brings the knife down, but turns the blade aside at the last moment. "Just kidding."`)
  }

  // TODO: We need to update the view here, even though the character panel is below the overlay. Or maybe always
  //       update the view that way we won't have to remember to do it in other requests? We could move the "deal
  //       damage" block below into the negotiation system and make it a more general function for when the player
  //       takes damage as part of the negotiation.

  const health = HealthComponent.lookup(context.P);
  const damage = Math.min(health.currentHealth-1, Random.rollDice({ x:2, d:6 }));
  health.currentHealth -= damage;
  HealthComponent.update(context.P, health);

  if (archetype === 'pervert') {
    return Reaction.lust(`{T:TargetName} grins and licks {T:his} lips. {T:He} takes your hand in {T:his} and slowly 
      draws {T:his} blade across the palm of your hand. Then, with a lustful blush on {T:his} face, {T:he} presses 
      {T:his} lips against the fresh wound, tasting your blood. You take ${damage} damage.`,
      { givePreferences:{ sadistic:20 }});
  }

  return Reaction.disrespect(`{T:TargetName} pulls a knife on you, cutting deeply into the flesh of your arm. "Ha! Idiot." You take ${damage} damage.`);
}

function noReaction(context, parameters) {
  const archetype = Character(context.T).getArchetype();
  if (archetype === 'maniac') { return Reaction.dislike(`"Aww, you're no fun at all."`); }
  if (archetype === 'pervert') { return Reaction.neutral(`"{T:He} gives you a shrug, "Not into that? Well whatever."`); }
  return Reaction.respect(`{T:TargetName} chuckles a little and nods. "Mmm, would have been fun though."`);
}

