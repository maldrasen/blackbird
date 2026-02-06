global.BodyDescriber = class BodyDescriber {

  constructor(context) {
    this._context = context;
    this._included = [];
    this._tries = 0;
  }

  get context() { return this._context; }
  get character() { return this.context.get('C').character; }
  get body() { return this.context.get('C').body; }
  get mouth() { return this.context.get('C').mouth; }

  addInclusions(inclusions) { each(inclusions||[], inclusion => { this.addIncluded(inclusion); }); }
  addIncluded(key) { this._included.push(key); }
  isIncluded(key) { return this._included.indexOf(key) >= 0; }
  isNotIncluded(key) { return !this.isIncluded(key); }

  async updateDescription() {
    if (this.body.faceDescription == null) {
      await this.body.update({ faceDescription: (await this.getfaceDescription()) });
    }
    if (this.body.bodyDescription == null) {
      await this.body.update({ bodyDescription: (await this.getBodyDescription()) });
    }
  }

  async getBodyDescription() {
    const injuries = await (new BodyInjuryDescriber(this.context)).bodyInjuries();
    const description = await Description.select('body', this.context);

    this.addInclusions(description.includes);

    return await Weaver.weave(
      `${description.d} ${injuries} ${this.finishBody()}`
    , this.context);
  }

  // TODO: Right now the body's face type is only used in this function to build
  //       up the character's description. Once the personality system is more
  //       fleshed out though we should use the the face type to influence the
  //       personality or visa versa.
  //
  //         - Violent minions should have hard faces.
  //         - Passive minions should have soft faces.
  //         - Plain faced minions are not influenced one way or the other.
  //         - Exotic faces should have some influence, but not sure what.
  //
  // TODO: Goblins are going to need their own descriptions because of their
  //       unusual faces. They may even need their own goblin only faceTypes.
  //
  // TODO: Maybe once this is all done I can add a copy of this function that
  //       rewrites all of these descriptions from a first person perspective.
  //       The tone is wrong for a person describing their own face.
  //
  async getfaceDescription() {
    const injuries = await (new BodyInjuryDescriber(this.context)).headInjuries()
    const descriptions = await this.selectFaceAndHead();

    this.addInclusions(descriptions.face.includes);
    this.addInclusions(descriptions.head.includes);

    return await Weaver.weave(`
      ${descriptions.face.d} ${this.mythicAdditions()}
      ${descriptions.head.d} ${this.finishHead()} ${injuries}`,
    this.context);
  }

  // This function will randomly select a face and head description. The two
  // main descriptions here can't share any of the same inclusions. We don't
  // want a character's eyes described twice. It can happen tough, so I'm
  // printing out a big warning when it happens so I know to add more
  // descriptions.
  async selectFaceAndHead() {
    const faceDescription = await Description.select('face', this.context);
    const headDescription = await Description.select('head', this.context);

    if (this._tries++ == 10) {
      console.log(`Warning: There doesn't seem to be enough face and head descriptions so this character's`);
      console.log(`         description will probably share inclusions.`);
      console.log(` - Face: ${faceDescription.d}`)
      console.log(` - Head: ${headDescription.d}`)
    }

    for (let i=0; i<(faceDescription.includes||[]).length; i++) {
      if (this._tries < 10 && (headDescription.includes||[]).indexOf(faceDescription.includes[i])>=0) {
        return await this.selectFaceAndHead();
      }
    }

    return { face:faceDescription, head:headDescription };
  }

  // === Face Additions ===

  // If a character has more than 90 personal they fall into the mythic beauty
  // category. In this case they still get a 'breathtaking' description but
  // with an additional sentence to highlight they their beauty is otherworldly.
  mythicAdditions() {
    if (this.character.personal < 90) { return ''; }

    const additions = [
      `{{His}} face is so perfect that it's almost unnatural, like some otherworldly being come to dwell with us mere mortals.`,
    ]

    if (this.isNotIncluded('eye-color')) {
      ArrayUtility.addAll(additions,[
        `{{His}} beautiful and memorizing {{C::body.eyeColor}} eyes shine with an otherworldly sheen.`,
        `{{His}} {{C::body.eyeColor}} eyes somehow always seem to catch the light in the most perfect way possible`,
      ]);

      if (this.body.faceType == 'plain') { additions.push(`{{His}} {{C::body.eyeColor}} eyes are so compelling,
        beautiful and memorizing, that there's almost a danger of getting lost within them for an eternity.`) }

      if (this.body.faceType == 'exotic') { additions.push(`{{His}} face is so strangely compelling that I could see
        getting lost in {{his}} piercing {{C::body.eyeColor}} eyes for an eternity.`); }
    }

    if (this.isNotIncluded('skin-color') && this.character.hasSkinBody) { ArrayUtility.addAll(additions,[
      `{{His}} {{C::body.skinColor}} skin is absolutely perfect and shines like polished marble.`,
      `{{His}} {{C::body.skinColor}} skin somehow always manages to catch the light in the most perfect way possible.`,
    ]); }

    if (this.isNotIncluded('scale-color') && this.character.isScalie) { ArrayUtility.addAll(additions,[
      `{{His}} {{C::body.scaleColor}} scales are absolutely perfect and shine like polished gemstones.`,
      `{{His}} {{C::body.scaleColor}} scales are absolutely perfect and shine like glittering jewels.`,
    ]); }

    if (this.body.faceType == 'soft') { additions.push(`I'm not sure how to describe it, but {{he}} has an aura about
      {{him}} that makes me want to possess {{him}} in every way.`); }

    if (this.body.faceType == 'hard') { additions.push(`I'm not sure how to describe it, but {{he}} has an aura about
      {{him}} that could make anyone want to be possessed by {{him}}.`); }

    if (this.body.faceType == 'exotic') { additions.push(`There's something about {{him}} that seems absolutely
      otherworldly.`); }

    const addition = Random.from(additions);

    if (addition.match(/eyeColor/)) { this.addIncluded('eye-color'); }
    if (addition.match(/skinColor/)) { this.addIncluded('skin-color'); }
    if (addition.match(/scaleColor/)) { this.addIncluded('scale-color'); }

    return addition;
  }

  // To finish up the head description we need to figure out what parts were
  // not described by the face and head descriptions.
  finishHead() {
    if (this.body.furColor && this.body.hairColor) {
      if (this.isNotIncluded('eye-color') && this.isNotIncluded('fur-color') && this.isNotIncluded('hair-color')) { return this.describeEyesHairAndFur(); }
      if (this.isNotIncluded('fur-color') && this.isNotIncluded('hair-color')) { return this.describeHairAndFur();  }
      if (this.isNotIncluded('eye-color') && this.isNotIncluded('hair-color')) { return this.describeEyesAndHair(); }
      if (this.isNotIncluded('eye-color') && this.isNotIncluded('fur-color'))  { return this.describeEyesAndFur();  }
      if (this.isNotIncluded('eye-color'))  { return this.describeEyes(); }
      if (this.isNotIncluded('hair-color')) { return this.describeHair(); }
    }

    // Only bother describing fur if the eyes haven't been described yet.
    if (this.body.furColor && this.isNotIncluded('fur-color') && this.isNotIncluded('eye-color')) {
      return this.describeEyesAndFur();
    }

    // We don't worry about describing skin or scales if they're not included,
    // that will be taken care of in the body description. We do want to take
    // care of hair and eyes though.
    if (this.body.hairColor && this.isNotIncluded('hair-color')) {
      return this.isIncluded('eye-color') ? this.describeHair() : this.describeEyesAndHair();
    }

    if (this.isNotIncluded('eye-color')) {
      return this.describeEyes();
    }

    return '';
  }

  // Checks to make sure that all the nessessary inclusions have been added.
  // This runs after the finishHead() function and includes the fur and skin
  // colors if they were skipped by the head description. Always assume that
  // the base description will include either fur or skin or height and weight.
  finishBody() {
    if (this.character.hasSkinBody && this.isNotIncluded('skin-color')) { return this.describeSkin();   }
    if (this.body.scaleColor && this.isNotIncluded('scale-color'))      { return this.describeScales(); }
    if (this.body.furColor && this.isNotIncluded('fur-color'))          { return this.describeFur();    }
    return this.isNotIncluded('height-weight') ? this.describeHeightWeight() : '';
  }

  // It's likely that the face and head descriptions will not include eye color.
  describeEyes() {
    if (this.body.faceType == 'hard') { return Random.from([
      `{{He}} has small, hard looking {{C::body.eyeColor}} eyes.`,
      `{{His}} {{C::body.eyeColor}} eyes are small and hard looking.`,
    ]); }

    if (this.body.faceType == 'soft') { return Random.from([
      `{{He}} has big {{C::body.eyeColor}} eyes.`,
      `{{His}} {{C::body.eyeColor}} eyes are big and friendly looking.`,
    ]); }

    if (this.body.faceType == 'exotic') { return Random.from([
      `{{He}} has seductive {{C::body.eyeColor}} eyes.`,
      `{{His}} {{C::body.eyeColor}} eyes are sly and seductive looking.`,
    ]); }

    return `{{He}} has {{C::body.eyeColor}} eyes.`;
  }

  describeEyesAndFur() {
    this.addIncluded('fur-color');
    return `[TODO: EYES AND FUR]`
  }

  // For now, gender and face shape are used to determine hair style when
  // mentioned. This might change at some point if I feel like implementing
  // hair styling more fully.
  describeHair() {
    this.addIncluded('hair-color');

    if (this.character.isMale) {
      if (this.body.faceShape == 'exotic') { return Random.from([
        `{{He}} has long {{C::body.hairColor}} hair that hangs loosely down {{his}} back.`,
        `{{He}} has long {{C::body.hairColor}} hair tied up in a neat ponytail.`,
      ]); }

      return Random.from([
        `{{He}} has short {{C::body.hairColor}} hair.`,
        `{{His}} {{C::body.hairColor}} hair is short and spiky.`,
        `{{His}} {{C::body.hairColor}} hair is short and neat.`,
        `{{His}} {{C::body.hairColor}} hair is short and a little messy.`,
      ]);
    }

    if (this.body.faceShape == 'soft') { return Random.from([
      `{{His}} {{C::body.hairColor}} hair is long and curly and hangs down {{his}} back in long rings.`,
      `{{His}} hair is short and curly with thick {{C::body.hairColor}} ringlets adorning the top of {{her}} head.`,
    ]); }

    return Random.from([
      `{{He}} has long straight {{C::body.hairColor}} hair that hangs loosely down {{his}} back.`,
      `{{His}} {{C::body.hairColor}} hair is long and wavy and hangs loosely down {{his}} back.`,
      `{{He}} has long {{C::body.hairColor}} hair tied up in a neat ponytail.`,
    ]);
  }

  // Lots of copy pasta between the hair description functions, but I think it
  // would be too difficult to programatically include eye descriptions or not.
  describeEyesAndHair() {
    this.addIncluded('hair-color');

    if (this.character.isMale) {
      if (this.body.faceShape == 'exotic') { return Random.from([
        `{{He}} has {{C::body.eyeColor}} eyes and long {{C::body.hairColor}} hair that hangs loosely down {{his}} back.`,
        `{{He}} has {{C::body.eyeColor}} eyes and long {{C::body.hairColor}} hair tied up in a neat ponytail.`,
      ]); }

      return Random.from([
        `{{He}} has {{C::body.eyeColor}} eyes and short {{C::body.hairColor}} hair.`,
        `{{He}} has {{C::body.eyeColor}} eyes and {{his}} {{C::body.hairColor}} hair is short and spiky.`,
        `{{He}} has {{C::body.eyeColor}} eyes and {{his}} {{C::body.hairColor}} hair is short and neat.`,
        `{{He}} has {{C::body.eyeColor}} eyes and {{his}} {{C::body.hairColor}} hair is short and a little messy.`,
      ]);
    }

    if (this.body.faceShape == 'soft') { return Random.from([
      `{{He}} has {{C::body.eyeColor}} eyes and {{his}} {{C::body.hairColor}} hair is long and curly and hangs down {{his}} back in long rings.`,
      `{{He}} has {{C::body.eyeColor}} eyes and {{his}} hair is short and curly with thick {{C::body.hairColor}} ringlets adorning the top of {{her}} head.`,
    ]); }

    return Random.from([
      `{{He}} has {{C::body.eyeColor}} eyes and short long straight {{C::body.hairColor}} hair that hangs loosely down {{his}} back.`,
      `{{He}} has {{C::body.eyeColor}} eyes and short long {{C::body.hairColor}} hair tied up in a neat ponytail.`,
      `{{He}} has {{C::body.eyeColor}} eyes and {{his}} {{C::body.hairColor}} hair is long and wavy and hangs loosely down {{his}} back.`,
    ]);
  }

  describeEyesHairAndFur() {
    this.addIncluded('fur-color');
    this.addIncluded('hair-color');
    return `[TODO: EYES, HAIR, AND FUR]`
  }

  describeHairAndFur() {
    this.addIncluded('fur-color');
    this.addIncluded('hair-color');
    return `[TODO: HAIR AND FUR]`
  }

  // Skin fur and scale descriptions are similar, but probably not similar
  // enough to combine. Still if we tweek the descriptions in one of the
  // hair/fur/scales function it probably would make sense to make the same
  // adjustment to the other functions.

  describeSkin() {
    this.addIncluded('skin-color');

    if (this.character.physical >= 25) {
      return (this.character.isMale) ?
        `Thick muscles undulate beneath {{his}} {{C::body.skinColor}} skin.`:
        `Subtle muscles undulate under {{his}} smooth {{C::body.skinColor}} skin giving {{his}} body a toned athletic appearance.`;
    }

    return this.character.isMale ?
      `{{His}} masculine {{C::species.elven}} body has toned {{C::body.skinColor}} skin.`:
      `{{His}} feminine {{C::species.elven}} body has soft {{C::body.skinColor}} skin.`;
  }

  describeFur() {
    this.addIncluded('fur-color');

    let adjectives = [];
    if (this.body.faceType == 'hard') { adjectives = ['rough','coarse']; }
    if (this.body.faceType == 'soft') { adjectives = ['soft','smooth','supple']; }
    let soft = Random.from(adjectives) || ''

    if (this.character.physical >= 25) {
      if (this.character.isMale) {
        return Random.from([
          `{{His}} muscular body is covered in ${soft} {{C::body.furColor}} fur.`,
          `Thick muscles undulate beneath {{his}} ${soft} {{C::body.furColor}} fur.`
        ]);
      }

      return Random.from([
        `{{His}} toned athletic body is covered in ${soft} {{C::body.furColor}} fur.`,
        `Subtle muscles undulate under {{his}} ${soft} {{C::body.furColor}} fur giving {{his}} body a toned athletic appearance.`,
      ]);
    }

    return Random.from([
      `{{His}} body is covered in ${soft} {{C::body.furColor}} fur.`,
      `{{He}} has ${soft} {{C::body.furColor}} fur covering {{his}} entire body.`,
    ]);
  }

  describeScales() {
    this.addIncluded('scale-color');

    let adjectives = [];
    if (this.body.faceType == 'hard') { adjectives = ['dull','thick','rough']; }
    if (this.body.faceType == 'soft') { adjectives = ['smooth','glistening','gleaming']; }
    let dull = Random.from(adjectives) || ''

    if (this.character.physical >= 25) {
      if (this.character.isMale) {
        return Random.from([
          `{{His}} muscular body is covered in ${dull} {{C::body.scaleColor}} scales.`,
          `Thick muscles undulate beneath {{his}} ${dull} {{C::body.scaleColor}} scales.`
        ]);
      }

      return Random.from([
        `{{His}} toned athletic body is covered in ${dull} {{C::body.scaleColor}} scales.`,
        `Subtle muscles undulate under {{his}} ${dull} {{C::body.scaleColor}} scales giving {{his}} body a toned athletic appearance.`,
      ]);
    }

    return Random.from([
      `{{His}} body is covered in ${dull} {{C::body.scaleColor}} scales.`,
      `{{He}} has ${dull} {{C::body.scaleColor}} scales covering {{his}} entire body.`,
    ]);
  }

  // I'm just going to recreate the short tall logic from the HasBody concern
  // here, rather than making everything up to this point async. We already
  // have the character and the body which is why it needed to be async in the
  // first place.
  describeHeightWeight() {
    const height = this.body.height;
    const average = this.character.species.averageHeight();

    if (height < average * 0.8) {
      return Random.from([
        `{{He}}'s smaller than most {{C::species.elves}}, weighing {{C::body.fiftyPounds}} and standing {{C::body.fiveFootTenInches}} tall.`,
        `{{He}}'s shorter than most {{C::species.elves}}; {{C::body.fiveFootTenInches}} tall and weighing {{C::body.fiftyPounds}}.`,
        `{{He}}'s {{C::body.fiveFootTenInches}} tall, and weighs {{C::body.fiftyPounds}}, which makes {{him}} a bit small for {{C::species.anElf}}.`,
        `{{He}} weighs {{C::body.fiftyPounds}} and is {{C::body.fiveFootTenInches}} tall, which is a bit short for {{C::species.anElf}}.`,
      ])
    }

    if (height > average * 1.2) {
      return Random.from([
        `{{He}}'s larger than most {{C::species.elves}}, weighing {{C::body.fiftyPounds}} and standing {{C::body.fiveFootTenInches}} tall.`,
        `{{He}}'s taller than most {{C::species.elves}}; {{C::body.fiveFootTenInches}} tall and weighing {{C::body.fiftyPounds}}.`,
        `{{He}}'s {{C::body.fiveFootTenInches}} tall, and weighs {{C::body.fiftyPounds}}, which makes {{him}} large for {{C::species.anElf}}.`,
        `{{He}} weighs {{C::body.fiftyPounds}} and is {{C::body.fiveFootTenInches}} tall, which is a tall for {{C::species.anElf}}.`,
      ])
    }

    return Random.from([
      `{{He}}'s {{C::body.fiveFootTenInches}} tall, and weighs {{C::body.fiftyPounds}}.`,
      `{{He}} weighs {{C::body.fiftyPounds}} and is {{C::body.fiveFootTenInches}} tall.`,
    ]);
  }
}
