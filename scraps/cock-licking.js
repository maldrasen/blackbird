SummonAction.build('cock-licking', {
  category: 'Oral',
  name: 'Cock Licking',
  description: `I'm going to have {{C::character.firstName}} lick my cock until I cum all over {{C::gender.his}} face.`,

  requirements: [
    'player.has-cock',
    'canSuckCock(C,P).mouthFit=impossible'],

  difficulty:    1,
  effects:       'head',
  complementing: ['cock-lover','cum-lover','oral-slut','submissive'],
  conflicting:   ['dominant'],

  supportClass: () => SummonAction.CockLicking,
});

// The cock licking action is an oral event that's only available when the
// player's cock is far too large for a minion to suck. As a result they'll
// only be able to lick and kiss along the shaft, and rub their bodies along it.

SummonAction.CockLicking = (function() {

  async function writeEnthusiasticStory(summoner) {
    if (summoner.character.speciesCode == 'scaven') { return await enthusiasticScavenStory(summoner); }
    return "TODO: Enthusiastic Cock Licking Story."
  }

  async function writeConsentStory(summoner) {
    if (summoner.character.speciesCode == 'scaven') { return await consentingScavenStory(summoner); }
    return "TODO: Consenting Cock Licking Story."
  }

  async function writeReluctantStory(summoner) {
    if (summoner.character.speciesCode == 'scaven') { return await reluctantScavenStory(summoner); }
    return "TODO: Reluctant Cock Licking Story."
  }

  async function writeRapeStory(summoner) {
    if (summoner.character.speciesCode == 'scaven') { return await rapeScavenStory(summoner); }
    return "TODO: Rape Cock Licking Story."
  }

  // ===========================================================================
  //
  //                         Scaven Specific Stories
  //
  // ===========================================================================
  // Starting off with these. The scaven are pretty unique in all the summon
  // actions because they're so small. The player's cock can be as large as
  // they are and while licking they'll use their many nipples as well.

  async function normalStart(summoner) {
    const storyTeller = new StoryTeller(summoner);
    await storyTeller.startSummoning();
    await storyTeller.addSegment(await summoner.character.reactToPlayer())
    await storyTeller.showCock();
    await storyTeller.addSegment(await summoner.character.reactToCock(await storyTeller.getPlayerCock()))

    return storyTeller;
  }

  async function enthusiasticScavenStory(summoner) {
    const storyTeller = await normalStart(summoner);
    return storyTeller.compile();
  }

  async function consentingScavenStory(summoner) {
    const storyTeller = await normalStart(summoner);
    const cock = await storyTeller.getPlayerCock();
    const body = await storyTeller.getCharacterBody();
    const sizeComparison = getSizeComparison(cock.length, body.height);

    // === Part One ===
    // The character approaches me and starts rubbing and licking my cock,
    // getting me hard if I'm not already.
    storyTeller.addSeparator();
    let options = [];

    if (sizeComparison == 'huge') {
      if (storyTeller.mightBe('playerPosition','standing')) {
        if (storyTeller.mightBe('playerCock','soft')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} reaches out and takes my cock in {{C::gender.his}} small hands and starts to
             slowly rub them up and down its full {{P::cock.sixInch}} length. {{C::character.He}}'s so much shorter
             than myself so {{C::gender.his}} face is right at dick level. {{C::character.He}} closes the space
             between us and nuzzles {{C::gender.his}} face against the side of my cock, opening {{C::gender.his}} mouth
             wide and letting {{C::gender.his}} tongue drag along its side as it grows hard in {{C::gender.his}}
             hands.`,

            `{{C::character.firstName}} closes the space between us and presses {{C::gender.his}} face against my
             shaft, nuzzling against it affectionately. {{C::gender.He}} opens {{C::gender.his}} mouth wide and lets
             {{C::gender.his}} tongue loll out of {{C::gender.his}} mouth, then drags it slowly up the length of my
             {{P::cock.sixInch}} long cock. And then again. And with each long lick my cock grows harder until it's
             standing straight up in front of me.`,

            `{{C::character.firstName}} reaches out and takes my cock in {{C::gender.his}} hands, lifting it, feeling
             it's weight. {{C::gender.He}} leans in closer and, nuzzles {{C::gender.his}} face down against my
             ballsack, licking and kissing the underside of my dangling balls before running {{C::gender.his}} tongue
             up the entire length of my hardening shaft. {{C::gender.He}}'s short enough that {{C::gender.he}} needs to
             stand on {{C::gender.his}} toes to reach the tip of my {{P::cock.sixInch}} long cock, now standing
             straight up in front of me.`,
          ],{ playerPosition:'standing', playerCock:'hard' });
        }
        if (storyTeller.mightBe('playerCock','hard')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} closes the distance between us and presses {{C::gender.his}} face against my
             hard throbbing member, nuzzling its hot flesh and planting kisses over its surface. {{C::gender.He}} opens
             {{C::gender.his}} mouth wide and drags {{C::gender.his}} tongue up its {{P::cock.sixInch}} length, taking
             long languid strokes from my dangling ballsack all the way to the tip, while softly stroking it with
             {{C::gender.his}} hands at the same time.`,

            `{{C::character.firstName}} opens {{C::gender.his}} mouth wide, extending {{C::gender.his}} tongue as
             {{C::gender.he}} presses {{C::gender.his}} face against my hard dick. {{C::gender.He}} starts taking long
             licks up and down my {{P::cock.sixInch}} long shaft, slowly, but with a pleasant amount of pressure. At
             the same time {{C::gender.he}} reaches up under my balls, softly caressing them with the sharp tips of
             {{C::gender.his}} claws as {{C::gender.he}} kisses and licks the shaft.`
          ],{ playerPosition:'standing', playerCock:'hard' });
        }
      }

      if (storyTeller.mightBe('playerPosition','sitting')) {
        if (storyTeller.mightBe('playerCock','soft')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} leans down and rests {{C::gender.his}} head in my lap, nuzzling up against my
             ballsack. I feel {{C::gender.his}} wet tongue snake out between my balls and leg, licking the day's sweat
             off of me as {{C::gender.he}} takes hold of my soft cock and starts rubbing it against the side of
             {{C::gender.his}} face. My cock begins to grow hard from {{C::gender.his}} kissing and licking and soon
             {{C::gender.he}}'s licking the full {{P::cock.sixInch}} length of my cock. Slowly dragging
             {{C::gender.his}} tongue up and down the shaft.`,

            `{{C::character.firstName}} bends down and closes {{C::gender.his}} hands around my soft cock, squeezing it
             tightly so that the thick head bulges outward. {{C::gender.He}} sucks my cockhead into {{C::gender.his}}
             wide open mouth, completely filling it. My dick grows hard from the attention, and soon {{C::gender.he}}'s
             unable to keep it in {{C::gender.his}} mouth as it grows to its full {{P::cock.sixInch}} length.
             {{C::gender.He}} keeps {{C::gender.his}} mouth open wide as {{C::gender.he}} starts to rub it up and down
             the side my shaft. {{C::gender.His}} hand rubs against the other side of my cock, keeping it firmly
             pressed against {{C::gender.his}} face.`,
          ],{ playerPosition:'sitting', playerCock:'hard' });
        }

        if (storyTeller.mightBe('playerCock','hard')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} leans down and takes my cock in {{C::gender.his}} hands, pulling it towards
             {{C::gender.his}} open mouth. {{C::gender.He}} starts to kiss and swirl {{C::gender.his}} tongue around the
             tip as {{C::gender.his}} sharp claws lightly stroke up the sides of my {{P::cock.sixInch}} long cock.
             {{C::gender.He}} lets the head pop wetly out of {{C::gender.his}} mouth before running {{C::gender.his}}
             soft tongue down then back up the entire length of my shaft.`,

            `I take my hard cock in one hand and the back of {{C::character.firstName's}} head in the other, guiding
             {{C::gender.his}} face down to my cock. {{C::gender.He}} opens {{C::gender.his}} mouth as wide as
             {{C::gender.he}} can as I push the head into it, completely stuffing {{C::gender.his}} mouth with its
             width. I hold {{C::gender.him}} there for a moment while {{C::gender.his}} small hands softly glide up and
             down my {{P::cock.sixInch}} long cock. Finally I release {{C::gender.him}} and {{C::gender.he}} begins to
             earnestly lick my cock, taking long slow licks along its entire length.`,
          ],{ playerPosition:'sitting', playerCock:'hard' });
        }
      }

      // We want to make sure the player is actually laying down here. It
      // doesn't make sense for the character to "climb on top" of the player
      // if we don't know they're laying down yet, and if we do know we
      // don't want to mention it twice.
      if (storyTeller.getStatus('playerPosition') == 'laying') {
        let laying = [];

        if (storyTeller.mightBe('playerCock','soft')) {
          if (storyTeller.character.genderCode == 'female') {
            laying.push(`{{C::character.firstName}} quickly slips out of {{C::gender.his}} clothing then climbs on top
              of me, straddling my leg. I feel {{C::gender.his}} pussy hot against my thigh as {{C::gender.he}} nuzzles
              {{C::gender.his}} face up against my ballsack. {{C::gender.He}} reaches out and grabs my balls in
              {{C::gender.his}} two small claws and pulls them upward, kissing and licking along the underside of my
              sack. My cock soon grows hard and {{C::gender.he}} slides up my leg slightly so that {{C::gender.he}} can
              lick the full length of my {{P::cock.sixInch}} long cock.`);
          }
          if (storyTeller.character.genderCode != 'female') {
            laying.push(`{{C::character.firstName}} quickly slips out of {{C::gender.his}} clothing then climbs on top
              of me, straddling my leg. I feel {{C::gender.his}} own cock hot and hardening against my thigh as
              {{C::gender.he}} nuzzles {{C::gender.his}} face up against my ballsack. {{C::gender.He}} reaches out and
              grabs my balls in {{C::gender.his}} two small claws and pulls them upward, kissing and licking along
              the underside of my sack. My own cock soon grows hard and {{C::gender.he}} slides up my leg slightly so
              that {{C::gender.he}} can lick the full length of my {{P::cock.sixInch}} long cock.`);
          }
        }

        if (storyTeller.mightBe('playerCock','hard')) {
          if (storyTeller.character.genderCode == 'female') {
            laying.push(`{{C::character.firstName}} quickly slips out of {{C::gender.his}} clothing then climbs on top
              of me, straddling my leg. I feel {{C::gender.his}} pussy hot against my thigh as {{C::gender.he}} lowers
              {{C::gender.his}} face towards my hard {{P::cock.sixInch}} long cock. {{C::gender.He}} starts by planting
              light kisses all over my shaft, nuzzling and licking the hot flesh while reaching down to caress my
              balls. Soon though {{C::gender.he}} props himself up so that {{C::gender.he}} can firmly lick the entire
              length of my cock, rubbing {{C::gender.his}} pussy against my leg with each long lick.`);
          }
          if (storyTeller.character.genderCode != 'female') {
            laying.push(`{{C::character.firstName}} quickly slips out of {{C::gender.his}} clothing then climbs on top
              of me, straddling my leg. I feel {{C::gender.his}} own cock hot and hardening against my thigh as
              {{C::gender.he}} lowers {{C::gender.his}} face towards my hard {{P::cock.sixInch}} long cock.
              {{C::gender.He}} starts by planting light kisses all over my shaft, nuzzling and licking the hot flesh
              while reaching down to caress my balls. Soon though {{C::gender.he}} props himself up so that
              {{C::gender.he}} can firmly lick the entire length of my cock, rubbing {{C::gender.his}}
              {{C::cock.sixInch}} long dick against my leg with each long lick.`);
          }
        }

        StoryTeller.addOptionsWith(options, laying, { playerCock:'hard' });
      }
    }

    // My cock is over half of her body length, it's least as large as one of
    // her legs. We can skip these segments for now. They require an huge cock
    // which is hard to get at the moment.
    if (sizeComparison == 'massive') {
      if (storyTeller.mightBe('playerPosition','standing')) {
        if (storyTeller.mightBe('playerCock','soft')) {
          StoryTeller.addOptionsWith(options,[
            `(TODO: Get massive cock hard while standing)`
          ],{ playerPosition:'standing', playerCock:'hard' });
        }
        if (storyTeller.mightBe('playerCock','hard')) {
          StoryTeller.addOptionsWith(options,[
            `(TODO: Massive cock is already hard while standing)`
          ],{ playerPosition:'standing', playerCock:'hard' });
        }
      }

      if (storyTeller.mightBe('playerPosition','sitting')) {
        if (storyTeller.mightBe('playerCock','soft')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} climbs up into my lap, spreading {{C::gender.his}} legs wide around my own.
             {{C::character.He}} takes my massive cock in {{C::gender.his}} small hands and starts to slowly rub them
             up and down its full {{P::cock.sixInch}} length, urging it to grow hard between us. {{C::character.He}}
             leans down and nuzzles {{C::gender.his}} face against the head as it grows upward to meet him, then opens
             {{C::gender.his}} mouth wide to let {{C::gender.his}} tongue swirl around the tip.`,

            `{{C::character.firstName}} puts {{C::gender.his}} head in my lap and nuzzles my soft cock with
             {{C::gender.his}} face. {{C::gender.He}} starts to kiss and lick me all over my shaft and balls. I feel
             {{C::gender.his}} tongue work it's way under my foreskin as {{C::gender.he}} coaxes my cock to grow hard.
             Then, as my massive dick grows fully erect {{C::gender.he}} climbs up into my lap, dragging
             {{C::gender.his}} tongue up its entire {{P::cock.sixInch}} length before pressing {{C::gender.his}} body
             against it, sandwiching it between us.`
          ],{ playerPosition:'sitting', playerCock:'hard' });
        }

        if (storyTeller.mightBe('playerCock','hard')) {
          StoryTeller.addOptionsWith(options,[
            `{{C::character.firstName}} climbs up into my lap, spreading {{C::gender.his}} legs wide around my own as
             {{C::gender.he}} presses {{C::gender.his}} body fully against my hard shaft. {{C::gender.He}} knows my
             massive {{P::cock.sixInch}} long cock is far too large for {{C::gender.him}} to really do much with, so
             {{C::gender.he}} concentrates on pleasuring my cockhead with {{C::gender.his}} mouth and tongue while
             keeping {{C::gender.his}} lithe body pressed against the shaft.`,

            `{{C::character.firstName}} starts low, pressing {{C::gender.his}} face into my lap, nuzzling against my
             ballsack while softly running {{C::gender.his}} claws up the length of my massive {{P::cock.sixInch}} long
             shaft. {{C::gender.He}} starts taking long slow licks up the entire length, ending each lick with a kiss
             on the top of my cockhead. Then, with {{C::gender.his}} last lick {{C::gender.he}} climbs up into my lap
             and presses {{C::gender.his}} lithe body fully against my shaft, sandwiching it tightly between us.`
          ],{ playerPosition:'sitting', playerCock:'hard' });
        }
      }

      if (storyTeller.mightBe('playerPosition','laying')) {
        if (storyTeller.mightBe('playerCock','soft')) {
          StoryTeller.addOptionsWith(options,[
            `(TODO: Get massive cock hard while laying)`
          ],{ playerPosition:'laying', playerCock:'hard' });
        }

        if (storyTeller.mightBe('playerCock','hard')) {
          StoryTeller.addOptionsWith(options,[
            `(TODO: Massive cock is already hard while laying)`
          ],{ playerPosition:'laying', playerCock:'hard' });
        }
      }
    }

    storyTeller.addSegment(Random.from(options));

    // === Part Two ===
    // Licking and nibbling about the glans of my cock.

    options = [
      `{{C::gender.He}} pushes the head of my cock into {{C::gender.his}} open mouth, trying to open up as wide as
       {{C::gender.he}} can but {{C::gender.he}} can't quite get {{C::gender.his}} lips all the way around the
       {{P::cock.twoInch}} wide head. {{C::gender.His}} tongue playfully pokes at my urethra for a few seconds, but
       then moves down to lick and nibble along {{P::cock.theGlansOfHisCock}}.`,

      `{{C::gender.He}} opens {{C::gender.his}} mouth and tries to stuff as much of the {{P::cock.twoInch}} wide head
       into it as {{C::gender.he}} can manage. {{C::gender.He}} sucks hard on the head for a while before moving down
       to lick and nibble along {{P::cock.theGlansOfHisCock}}.`
    ];

    storyTeller.addSegment({ text:Random.from(options) });
    options = [];

    // === Part Three ===
    // Working the shaft.

    if (storyTeller.mightBe('playerPosition','standing') || storyTeller.mightBe('playerPosition','sitting')) {
      options.push(`{{C::gender.He}} starts panting as {{C::gender.he}} starts to really put some more effort into
        working the shaft. {{C::gender.His}} hands and tongue work opposite each other, licking downwards while
        stroking upwards then dragging {{C::gender.his}} tongue up along the underside of my cock as {{C::gender.he}}
        firmly pulls down on my dick flesh. I grab {{C::gender.his}} head in both hands, pulling {{C::gender.his}} open
        mouth harder against my cock, practically stroking myself with {{C::gender.his}} face.`);
    }

    if (storyTeller.mightBe('playerPosition','laying')) {
      if (storyTeller.character.genderCode == 'female') {
        options.push(`While licking enthusiastically at the head of my cock {{C::gender.he}} lays down fully on the
          shaft, smashing it between our bodies. {{C::gender.He}} wiggles {{C::gender.his}} furry chest against me,
          dragging {{C::gender.his}} twelve {{C::tits.shape}} tits and hard nipples across the surface of my cock
          while humping {{C::gender.his}} wet pussy into my leg.`);
      }
      if (storyTeller.character.genderCode == 'male') {
        options.push(`While licking enthusiastically at the head of my cock {{C::gender.he}} lays down fully on the
          shaft, smashing it between our bodies. {{C::gender.He}} firmly rubs {{C::gender.his}} muscular furry chest
          against me, while humping {{C::gender.his}} cock against my leg.`);
      }
      if (storyTeller.character.genderCode == 'futa') {
        options.push(`While licking enthusiastically at the head of my cock {{C::gender.he}} lays down fully on the
          shaft, smashing it between our bodies. {{C::gender.He}} wiggles {{C::gender.his}} furry chest against me,
          dragging {{C::gender.his}} twelve {{C::tits.shape}} tits and hard nipples across the surface of my cock
          while humping {{C::gender.his}} cock against my leg.`);
      }
    }

    storyTeller.addSegment({ text:Random.from(options) });

    // === Part Four ===
    // Orgasm. I don't really have a lot of details for this yet, amounts of
    // cum and so forth, so I'll keep this pretty generic for now and expand it
    // at some later date. This 'cum in mouth' segment could probably be made
    // generic as well.

    storyTeller.addSeparator();
    storyTeller.addSegment({ text:`I feel my orgasm slowly building. I grab {{C::character.firstName}} by the back of
      {{C::gender.his}} head and push {{C::gender.his}} mouth down over my cock, filling it completely. I start to cum.
      A hard shudder coursing through my body forces my cock even further into {{C::gender.his}} overstuffed mouth.
      {{C::gender.His}} eyes grow wide as {{C::gender.his}} mouth fills with cum, and with no place else to go
      {{C::gender.he}} desperately tries to swallow it all. However, after three or four spurts from my cock it begins
      to dribble freely from {{C::gender.his}} nose. Finally I release {{C::gender.him}}, letting {{C::gender.him}}
      fall backwards while coughing up cum. Despite nearly drowning in my seed though {{C::gender.he}}'s still
      smiling.` });

    return storyTeller.compile();
  }

  async function reluctantScavenStory(summoner) {
    const storyTeller = await normalStart(summoner);
    return storyTeller.compile();
  }

  async function rapeScavenStory(summoner) {
    const storyTeller = await normalStart(summoner);
    return storyTeller.compile();
  }

  // Used specifically by the scaven versions of this action where the cock
  // length can potentially be a significant percentage of the character's
  // overall height. I originally had more size classes, but after looking into
  // this for a bit I think we only need two. This action is gated by mouth
  // size, so for this event to appear we know the cock is going to be about
  // arm length. However, even the largest monster cock can't be larger than an
  // average scaven is tall, so really we just need to consider two size
  // classes, huge arm sized cocks, or massive leg sized cocks.
  function getSizeComparison(cockLength, bodyHeight) {
    return (cockLength > bodyHeight * 0.5) ? 'massive' : 'huge';
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();
