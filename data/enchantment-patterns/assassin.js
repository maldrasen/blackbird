// chance to remain hidden after a sneak attack
//   Trigger - Any sneak attack
//    Applies to daggers

EnchantmentPattern.register(`assassin`, {
  rarity: Rarity.unusual,
  appliesTo: [ItemType.dagger],
  trigger: EnchantmentTrigger.onHit,
  processAfterHit,
  getName: id => { return { name:`Assassin's ${Item(id).getName()}` }},
  buildEffects: () => { return [] },
});

function processAfterHit() {
  return { effects:[], message:'{A:ActingName} slips back into the shadows.' }
}