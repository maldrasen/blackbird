global.AnusDescriber = class AnusDescriber {

  constructor(context) {
    this._context = context;
  }

  get context() { return this._context; }
  get character() { return this.context.get('C').character; }
  get anus() { return this.context.get('C').anus; }

  async updateDescription() {
    await this.anus.update({ description:(await this.getDescription()) });
  }

  // TODO: The normal anus descriptions should probably only be used when the
  //       character has no anal equipment. Describing someone's huge gaping
  //       asshole makes no sense if it's stuffed with a giant anal plug. Does
  //       this mean though that equipping and unequipping an item changes the
  //       character descriptions? Should clothing obscure certain body part
  //       descriptions? Do we add some text about how the character is
  //       presenting their asshole for inspection?

  async getDescription() {
    const injuryDescriber = new AnusInjuryDescriber(this.context);

    let description = `
      ${(await Description.select('anus', this.context)).d}
      ${this.describeProlapse()}
      ${await injuryDescriber.describeInjuries()}
    `.replace(/\n/g,'').replace(/\s+/g,' ');

    return await Weaver.weave(description, this.context);
  }

  // If an asshole is prolapsed the prolapse description is tacked on after.
  // This should only return a description though if the character has no anal
  // equipment. An anal plug should obscure or stuff a prolapse back in unless
  // of course we have special prolapse equipment, bows, ropes, chains, or
  // jewelry for instance.
  describeProlapse() {
    if (this.anus.prolapseLength == 0) { return '' }
    return `(TODO: Describe Anal Prolapse)`
  }

}
