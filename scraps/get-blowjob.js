SummonAction.build('get-blowjob', {
  category: 'Oral',
  name: 'Get Blowjob',
  description: `I'll have {{C::character.firstName}} suck my cock.`,

  requirements:[
    'player.has-cock',
    'canSuckCock(C,P).mouthFit!=impossible'],

  difficulty:    2,
  effects:       'head',
  complementing: ['cock-lover','cum-lover','oral-slut','submissive'],
  conflicting:   ['dominant'],
  skill:         'oral',

  supportClass: () => SummonAction.GetBlowjob,
});

SummonAction.GetBlowjob = (function() {

  // ===========================================================================
  // Enthusiastic
  // ===========================================================================

  async function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Get Blowjob Story."
  }

  // ===========================================================================
  // Consenting
  // ===========================================================================

  async function writeConsentStory(summoner) {
    const storyTeller = await normalStart(summoner);
    storyTeller.addSeparator();

    await storyTeller.positionCharacterForGivingCockOral();
    storyTeller.addSeparator();

    let playerPosition = storyTeller.getStatus('playerPosition');
    let characterPosition = storyTeller.getStatus('characterPosition');

    if (playerPosition == 'standing') {
      if (characterPosition == 'table-on-back') { return await writeConsentTableOnBack(storyTeller); }
    }
    if (playerPosition == 'sitting') {
      if (characterPosition == 'standing') { return await writeConsentInChair(storyTeller); }
      if (characterPosition == 'kneeling') { return await writeConsentInChair(storyTeller); }
    }
    if (playerPosition == 'laying') {
      if (characterPosition == 'straddle') { return await writeConsentStraddle(storyTeller); }
      if (characterPosition == 'reverse-straddle') { return await writeConsentReverseStraddle(storyTeller); }
    }

    throw `Unexpected positioning Player:${playerPosition} Character:${characterPosition}`
  }

  async function writeConsentTableOnBack(storyTeller) {
    await storyTeller.startOnBackBlowjob();
    storyTeller.addSegment({ text:`TODO: Pull on {{his}} nipples.` });
    await storyTeller.continueOnBackBlowjob();
    await storyTeller.cumFromBlowjob();
    return storyTeller.compile();
  }

  async function writeConsentInChair(storyTeller) {
    await storyTeller.startFrontBlowjob();
    await storyTeller.continueFrontBlowjob();
    await storyTeller.cumFromBlowjob();
    return storyTeller.compile();
  }

  async function writeConsentStraddle(storyTeller) {
    await storyTeller.startFrontBlowjob();
    storyTeller.addSegment({ text:`TODO: Rub pussy or cock against my leg.` });
    await storyTeller.continueFrontBlowjob();
    await storyTeller.cumFromBlowjob();
    return storyTeller.compile();
  }

  // This position is more complex than the others. It first depends on the
  // character's height because only a character of about your height will be
  // a good 69 position. If the character is shorter we still want to finger
  // their ass or play with their balls or something. They shouldn't be on top
  // though if they're larger.
  async function writeConsentReverseStraddle(storyTeller) {
    storyTeller.addSegment({ text:'TODO: Blowjob, straddling chest.' })
    return storyTeller.compile();
  }

  // ===========================================================================
  // Reluctant
  // ===========================================================================

  async function writeReluctantStory(summoner) {
    return "TODO: Reluctant Get Blowjob Story."
  }

  // ===========================================================================
  // Rape
  // ===========================================================================

  async function writeRapeStory(summoner) {
    return "TODO: Rape Get Blowjob Story."
  }

  // ===========================================================================
  // Shared Segments
  // ===========================================================================

  // Same as the normal start for cock licking as well. Will probably be
  // similar for all of the oral scenes with a dick.
  async function normalStart(summoner) {
    const storyTeller = new StoryTeller(summoner);
    await storyTeller.startSummoning();
    await storyTeller.addSegment(await summoner.character.reactToPlayer())
    await storyTeller.showCock();
    await storyTeller.addSegment(await summoner.character.reactToCock(await storyTeller.getPlayerCock()))

    return storyTeller;
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();
