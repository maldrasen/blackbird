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

    GameInterface.showAlert({
      message: compileMessage(consumable, context),
      type: (onUse.level || LogType.success),
      fadeTime: 3000
    });
  }

  function compileMessage(consumable, context) {
    const story = consumable.hasStories() ? consumable.pickStory(context) : consumable.getOnUse().showAlert;
    const resultMessage = consumable.messageForEntity(context.A, applyEffects(consumable, context.A));

    return Weaver(context).weave(resultMessage ? `${story} ${resultMessage}` : story);
  }

  // The battle system adds the story and each entity's result message as separate lines. Out of battle the consumable
  // is only ever applied to the character using it, so the results are keyed the same way, but the message is appended
  // to the story.
  function applyEffects(consumable, id) {
    const results = {};

    (consumable.getEffects() || []).forEach(effect => {
      const result = Effect.apply(id, effect);
      if (result.type === 'add-health') { results.health = result.value; }
      if (result.type === 'add-mana') { results.mana = result.value; }
    });

    return results;
  }

  return {
    useArticle
  }

})();
