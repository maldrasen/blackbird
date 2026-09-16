// Using an article in battle is a fixed action: the article's effects are applied around the round's target as soon
// as it's used. It's how a monster throws a grenade. A monster's articles are conjured rather than carried, so
// nothing is taken from an inventory.
//
//   Ability.UseArticle({
//     article: 'blasto',
//   });
//
// Optional keys:
//     essence           A hand-set essence value in place of the appraised one.
//     cooldown          Milliseconds before the user can use this again.
//     priority          How strongly a monster prefers this ability over its others.
Ability.UseArticle = function(options) {
  const consumable = Consumable.lookup(options.article);
  const ability = Ability(`Use ${consumable.getName()}`);

  ability.setEssence(0);
  ability.setTargetingMode(getTargetingMode(consumable));
  ability.setExecuteFunction(() => execute(consumable));
  ability.setDetails({ article:options.article });

  if (options.cooldown != null) { ability.setCooldown(options.cooldown); }
  if (options.essence != null) { ability.setEssence(options.essence); }
  if (options.priority != null) { ability.setPriority(options.priority); }

  return ability;
}

// An article aimed at one enemy or thrown at a position needs a target picked. One that covers a formation or the
// user doesn't.
function getTargetingMode(consumable) {
  return [EffectTarget.single, EffectTarget.position].includes(consumable.getTarget()) ? TargetingMode.anyEnemy : null;
}

function execute(consumable) {
  BattleSystem.getRound().addTime(750);
  EffectSystem.applyDuringBattle(consumable);
}
