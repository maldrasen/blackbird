global.CockDescriber = class CockDescriber {

  constructor(context) {
    this._context = context;
    this._included = [];
  }

  get context() { return this._context; }
  get character() { return this.context.get('C').character; }
  get cock() { return this.context.get('C').cock; }

  addIncluded(key) { this._included.push(key); }
  isIncluded(key) { return this._included.indexOf(key) >= 0; }

  async updateDescription() {
    if (this.cock != null) {
      await this.cock.update({ description:(await this.getDescription()) });
    }
  }

  async getDescription() {
    const injuryDescriber = new CockInjuryDescriber(this.context);

    let description = `
      ${await this.cockDescription()}
      ${this.sheathDescription()}
      ${this.knotDescription()}
      ${this.ridgesDescription()}
      ${this.knobsDescription()}
      ${this.spinesDescription()}
      ${this.ballsDescription()}
      ${await injuryDescriber.describeInjuries()}
    `.replace(/\n/g,'').replace(/\s+/g,' ');

    return await Weaver.weave(description, this.context);
  }

  async cockDescription() {
    let description = await Description.select('cock', this.context);

    if (description.includes) {
      each(description.includes, inclusion => {
        this.addIncluded(inclusion);
      });
    }

    return description.d;
  }

  // TODO: These are for average sized knots, add more for other sizes.
  knotDescription() {
    if (! this.cock.hasKnot) { return ''; }
    if (this.isIncluded('knot')) { return ''; }

    if (this.cock.count > 1) {
      return Random.from([
        `{{His}} cocks are all adorned with {{C::cock.huge(knot)}} {{C::cock.twoInch(knot)}} {{wide}} knots at their bases.`,
        `Each of {{his}} {{C::cock.count}} cocks have a {{C::cock.aHuge(knot)}} {{C::cock.twoInch(knot)}} {{wide}} knot near the base.`,
        `At the base of each of {{his}} dogcocks is a {{C::cock.twoInch(knot)}} {{wide}} knot the size of {{C::cock.anApple(knot)}}.`,
      ]);
    }

    return Random.from([
      `{{His}} cock is adorned with a {{C::cock.huge(knot)}} {{C::cock.twoInch(knot)}} {{wide}} knot at its base.`,
      `{{His}} {{cock}} swells to {{C::cock.aHuge(knot)}} {{C::cock.twoInch(knot)}} {{wide}} knot near its base.`,
      `The base of {{his}} {{cock}} swells to {{C::cock.aHuge(knot)}} {{C::cock.twoInch(knot)}} {{wide}} knot.`,
      `At the base of {{his}} {{cock}} is a {{C::cock.aHuge(knot)}} knot the size of {{C::cock.anApple(knot)}}.`,
      `The knot at the base of {{his}} {{cock}} is the size of {{C::cock.anApple(knot)}} at around {{C::cock.twoInches(knot)}} {{wide}}.`,
    ]);
  }

  sheathDescription() {
    if (this.cock.sheath == null) { return '' }
    if (this.isIncluded('sheath')) { return ''; }

    if (this.cock.count > 2) {
      return Random.from([
        `{{His}} {{C::cock.count}} cocks emerge from an oversized {{C::cock.furrySheath}} between {{his}} legs.`,
        `{{His}} {{C::cock.count}} cocks extend out from an oversized {{C::cock.furrySheath}}.`,
        `The {{C::cock.count}} shafts emerge from an increadibly wide {{C::cock.furrySheath}}.`,
      ]);
    }

    if (this.cock.count == 2) {
      return Random.from([
        `Both of {{his}} cocks emerge from a overstuffed {{C::cock.furrySheath}} between {{his}} legs.`,
        `{{His}} twin cocks extend out from an oversized {{C::cock.furrySheath}}.`,
        `The two shafts emerge from a {{wide}} {{C::cock.furrySheath}}, situated between {{his}} legs.`,
      ]);
    }

    return Random.from([
      `{{His}} cock emerges from a {{C::cock.furrySheath}} tucked between {{C::gender.his}} legs.`,
      `{{His}} cock lies tucked within a {{C::cock.furrySheath}}.`,
      `The {{C::body.skinColor}} shaft emerges from a {{C::cock.furrySheath}} tucked between {{C::gender.his}} legs.`,
    ]);
  }

  ridgesDescription() {
    if (this.cock.shape != 'dragon') { return ''; }
    if (this.isIncluded('ridges')) { return ''; }

    return Random.from([
      `A series of thick bony ridges run down the entire length of {{his}} {{cock}}.`,
      `{{His}} {{cock}} has a series of thick bony ridges that extend {{C::cock.twoInches(ridge)}} from {{his}} cock's scaley skin.`,
      `Thick bony ridges protrude {{C::cock.twoInches(ridge)}} from the surface of {{his}} shaft.`,
      `The entire shaft of dragon meat is ringed with thick bony ridges.`,
    ]);
  }

  knobsDescription() {
    if (! this.cock.hasKnobs) { return ''; }
    if (this.isIncluded('knobs')) { return ''; }

    let knobHeight = this.cock.knobHeight;
    let choices = [];

    if (this.cock.count == 1) {
      ArrayUtility.addAll(choices,[
        `The entire length of {{his}} cock is textured with gnarled {{C::cock.acorn(knob)}} sized bumps.`,
        `{{His}} {{cock}} is studded, seemingly at random, with hard nubs the size of {{C::cock.acorns(knob)}}.`,
        `Gnarled, {{C::cock.acorn(knob)}} sized bulges adorn every {{inch}} of {{his}} shaft.`
      ]);

      if (knobHeight > 12) { ArrayUtility.addAll(choices,[
        `The entire length of {{his}} cock is textured with gnarled {{C::cock.twoInches(knob)}} high bumps, each the
         size of {{C::cock.anAcorn(knob)}}.`,
        `{{His}} {{cock}} is studded, seemingly at random, with hard {{C::cock.twoInches(knob)}} wide knobs, each the
         size of {{C::cock.anAcorn(knob)}}.`,
      ]); }

      return Random.from(choices);
    }

    ArrayUtility.addAll(choices,[
      `{{His}} {{C::cock.count}} cocks are {{C::cock.both}} textured with gnarled {{C::cock.acorn(knob)}} sized bumps.`,
      `{{His}} cocks are studded, seemingly at random, with hard nubs the size of {{C::cock.acorns(knob)}}.`,
      `Gnarled, {{C::cock.acorn(knob)}} sized bulges, adorn every {{inch}} of {{his}} shafts.`,
    ]);

    if (knobHeight > 12) { ArrayUtility.addAll(choices,[
      `The {{C::cock.count}} cocks are {{C::cock.both}} textured with gnarled {{C::cock.twoInches(knob)}} bumps, each
       the size of {{C::cock.anAcorn(knob)}}.`,
      `{{His}} cocks are studded, seemingly at random, with hard {{C::cock.twoInches(knob)}} wide knobs, each the size
       of {{C::cock.anAcorn(knob)}}.`,
      `Thick, {{C::cock.acorn(knob)}} sized bulges, adorn every {{inch}} of {{his}} shafts.`,
    ]); }

    return Random.from(choices);
  }

  spinesDescription() {
    if (! this.cock.hasSpines) { return ''; }
    if (this.isIncluded('spines')) { return ''; }

    let spineHeight = this.cock.spineHeight;

    if (this.cock.count == 1) {
      if (spineHeight < 6) { return Random.from([
        `The entire length of {{his}} cock is covered in sharp little, backward facing spines.`,
        `Like a cat, {{his}} cock is covered in sharp little, backward facing spines.`,
        `Small sharp spikes adorn the length of {{his}} cock, giving it a rough feline texture.`,
      ]); }

      if (spineHeight < 25) { return Random.from([
        `The entire length of {{his}} cock is covered in hard, backward facing spines. The spines are
         {{C::cock.twoInch(spine)}} long around the crown of {{his}} cockhead, but grow shorter near the base.`,

        `Firm {{C::cock.twoInch(spine)}} long spines adorn the length of {{his}} cock, facing backwards so that they
         rub painfully against whoever {{his}} cock is thrust into.`,

        `Wicked {{C::cock.twoInch(spine)}} long, backward facing spines completely cover {{his}} {{cock}}. The wide,
         dull spikes are thickest around the crown of {{his}} cockhead and flatten out near the base.`,
      ]); }

      return Random.from([
        `Thick {{C::cock.twoInch(spine)}} long spines cover the length of {{his}} cock. The bony spurs are thick and
         dull, but stiff like short fingers pointing backwards from the surface of {{his}} cock.`,

        `{{His}} {{cock}} is a true cunt destroyer; it's entire surface is covered in thick {{C::cock.twoInch(spine)}}
         long spikes. The spines are firm and dull, like thick fingers made to rake painfully against whoever they're
         thrust into. The spines are thickest around {{his}} cockhead, but grow shorter near the base.`
      ]);
    }

    if (spineHeight < 6) { return Random.from([
      `{{His}} cocks are {{C::cock.both}} covered in sharp little, backward facing spines like a cat's.`,
      `Like a cat, {{his}} cocks are covered in sharp little, backward facing spines.`,
      `Small sharp spikes adorn {{C::cock.both}} of {{his}} cocks, giving them a rough feline texture.`,
    ]); }

    if (spineHeight < 25) { return Random.from([
      `{{his}} {{C::cock.count}} cocks are covered in hard, backward facing spines. The spines are
       {{C::cock.twoInches(spine)}} long around the heads of {{his}} cocks, but grow shorter near the base.`,

      `Firm {{C::cock.twoInch(spine)}} long spines adorn the length of {{his}} cocks, facing backwards so that they
       rub painfully against the insides of whoever they're thrust into.`,

      `Wicked {{C::cock.twoInch(spine)}} long, backward facing spines completely cover {{C::cock.both}} of
       {{his}} cocks. The thick, dull spikes are thickest around the crowns of {{his}} cockheads and thin out near
       their base where they lie flat.`
    ]); }

    return Random.from([
      `Thick {{C::cock.twoInch(spine)}} long spines cover the length {{his}} cocks. The bony spurs are thick and dull,
       but stiff like short fingers pointing backwards from the surface of {{his}} cocks.`,

      `{{His}} {{C::cock.count}} cocks are true cunt destroyers, their surfaces are covered in thick
       {{C::cock.twoInch(spine)}} long spurs. They're firm and dull, like thick fingers made to rake painfully against
       whoever they're thrust into. The spines are thickest around {{his}} cockheads, but grow shorter near their base.`
    ]);
  }

  ballsDescription() {
    if (this.cock.internalBalls) { return ''; }

    if (this.cock.sheath) { return Random.from([
      `{{His}} {{C::balls.big}} {{C::balls.furryBallsack}} is the size of {{C::balls.anApple}}.`,
      `{{He}} has {{C::balls.aBig}} {{C::balls.apple}} sized {{ballsack}} hanging under {{his}} {{C::cock.furrySheath}}.`,
      `{{His}} {{C::balls.big}} {{C::balls.furryBallsack}} hangs tightly up against {{his}} cocksheath and measures
       {{C::balls.fourInches}} across.`,
      `{{His}} {{C::balls.big}} {{testicles}} each measure {{C::balls.twoInches}} across, tucked in a tight
       {{C::balls.apple}} sized {{ballsack}} hanging under {{C::gender.his}} {{C::cock.furrySheath}}.`
    ]); }

    return Random.from([
      `{{He}} has {{C::balls.aBig}} {{C::balls.apple}} sized {{ballsack}}.`,
      `{{His}} {{C::balls.big}} {{ballsack}} is the size of {{C::balls.anApple}}.`,
      `{{He}} has {{C::balls.big}} {{C::balls.egg}} sized {{testicles}} tucked in a tight wrinkled {{ballsack}}
       measuring {{C::balls.fourInches}} across.`,
      `{{His}} {{C::balls.big}} {{testicles}} each measure {{C::balls.twoInches}} across, tucked in a tight crinkled
       {{C::balls.apple}} sized {{ballsack}}.`
    ]);
  }

}
