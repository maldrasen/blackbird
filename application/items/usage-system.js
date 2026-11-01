global.UsageSystem = (function() {

  // TODO: At some point items will also need to be usable. The main difference between items and articles is that
  //       items are components and can carry data, while articles are fungible and can be stacked. An item like a
  //       wand though might be usable, but could carry data like number of charges. A wand with a damage effect would
  //       only be usable in battle, but a wand with a healing effect should be usable at any time.

  // TODO: Some articles may be perpetual any can be used without it being removed. Something like The Phial of
  //       Galadriel in Angband for instance. It could be used for a light effect, but using it wouldn't remove it. I
  //       would assume an article like this would have a proper name and perhaps something that would ensure
  //       uniqueness as well, though something like an "Everburning Torch" could be both perpetual and non-unique.

  // The useArticle() function consults the onUse property to determine how and where to show the consumable's
  // effects.
  //
  //   { showAlert:message, level }  -  For a simple message for consumables that don't actually have any effects.
  //
  //   { storyInAlert:true }         -  For a simple or routine message that can be shown in an alert and doesn't get
  //                                    in the way.
  //
  //   { storyInOverlay:true }       -  For a more complicated message that we may need a sentence or two to describe.
  //                                    A character is cured of their paralysis or has become drunk.
  //
  //   { startEpisode:code, state }  -  Some consumables will have very complex effects. A body transformation effect
  //                                    will need an entire episode to property describe.
  //
  function useArticle(id, code) {
    const context = { A:id, T:id, I:code };
    const consumable = Consumable.lookup(code);
    const onUse = consumable.getOnUse();

    if (onUse.startEpisode) { throw new Error(`TODO: Implement onUse.startEpisode`); }
    if (onUse.storyInOverlay) { throw new Error(`TODO: Implement onUse.storyInOverlay`); }

    Inventory().removeArticle(code, 1);

    const message = consumable.hasEffects() ? applyAndDescribe(id, consumable) : onUse.showAlert;

    GameInterface.showAlert({
      message: Weaver(context).weave(message),
      type: (onUse.level || LogType.success),
      fadeTime: 3000
    });
  }

  // Applies the consumable's effects to the entity and returns the shared message describing what they did. The
  // message is left unwoven so that each caller can supply its own context. Out of battle it goes into an alert, and
  // in battle the EffectSystem adds it to the round when a consumable has no story of its own.
  function applyAndDescribe(id, consumable) {
    return resultMessage(applyEffects(consumable, id));
  }

  // The consumable results will usually be shown in an alert, so they need to be short and to the point. Consumables
  // with more complex effects will either need to start an episode or display an overlay. Most usable items will have
  // a single effect with a standardized message. It's possible that some future consumables will have multiple
  // effects, though I don't think we'll have any consumables without visible effects.
  function resultMessage(results) {
    if (results.length !== 1) {
      throw `We're only handling consumables with one result for now.`;
    }

    const result = results[0];
    switch (result.type) {
      case 'add-mana': return `{A:ActingName} uses the {I.name}, regaining ${result.value} ${result.color} mana.`;
      case 'add-health': return `{A:ActingName} uses the {I.name}, regaining ${result.value} health.`;
      default: throw `Unknown result type: ${result.type}`;
    }
  }

  function applyEffects(consumable, id) {
    return (consumable.getEffects() || []).map(effect => Effect.apply(id, effect));
  }

  return {
    useArticle,
    applyAndDescribe,
  };

})();
