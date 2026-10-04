global.UsageSystem = (function() {

  // The consume() function will need to consult the onUse property to determine how and where to show the
  // consumable's effects.
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
    const context = { A:id, I:code };
    const consumable = Consumable.lookup(code);
    const onUse = consumable.getOnUse();

    if (onUse.startEpisode) { throw new Error(`TODO: Implement onUse.startEpisode`); }
    if (onUse.storyInOverlay) { throw new Error(`TODO: Implement onUse.storyInOverlay`); }

    Alert.show({
      message: compileMessage(consumable, context),
      type: (onUse.level || LogType.success),
      fadeTime: 3000
    });
  }

  function compileMessage(consumable, context) {
    const onUse = consumable.getOnUse();
    const message = consumable.hasStories() ?  Weaver(context).weave(consumable.stories.pick(context)) : onUse.showAlert;
    const results = consumable.hasEffects() ?  consumable.getEffects().map(effect => Effect.apply(context.A, effect)) : [];

    return `${message} ${results.join(' ')}`
  }

  return {
    useArticle
  }

})();
