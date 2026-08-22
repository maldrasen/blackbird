describe("BreastsLoom", function() {

  const NO_COMPARISON = ['flat','pancakes','tiddys','elongated-sacks','massive-bells','straining-round'];

  function allShapes() {
    return Object.values(BreastData.BreastShapeTable).flatMap(row => Object.values(row).flat());
  }

  function sizeOf(shape) {
    return Object.keys(BreastData.BreastShapeTable).find(size => {
      return Object.values(BreastData.BreastShapeTable[size]).flat().includes(shape);
    });
  }

  describe("BreastComparisons data", function() {

    const SIZE_WORD = /\b(tiny|small|little|large|big|huge|young|overgrown|oversized|swollen|bulging|giant|massive|enormous)\b/;

    it("has a ladder for every shape that isn't explicitly excluded", function() {
      allShapes().forEach(shape => {
        const hasLadder = BreastComparisons[shape] != null;
        const excluded = NO_COMPARISON.includes(shape);
        expect(hasLadder || excluded, `${shape} needs a ladder or an entry in NO_COMPARISON`).to.equal(true);
        expect(hasLadder && excluded, `${shape} is both laddered and excluded`).to.equal(false);
      });
    });

    it("only has ladders for known shapes", function() {
      const shapes = allShapes();
      Object.keys(BreastComparisons).forEach(shape => {
        expect(shapes, `${shape} is not in the BreastShapeTable`).to.include(shape);
      });
    });

    it("has ascending rungs that span exactly the shape's size band", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        const band = BreastData.BreastSizes[sizeOf(shape)];
        expect(ladder.length, `${shape} has no rungs`).to.be.above(0);
        ladder.forEach((rung, i) => {
          if (i > 0) { expect(rung.max, `${shape} rung ${i} does not ascend`).to.be.above(ladder[i-1].max); }
        });
        expect(ladder[0].max, `${shape} first rung ends below its band`).to.be.above(band.min);
        expect(ladder[ladder.length-1].max, `${shape} does not end at its band max`).to.equal(band.max);
      });
    });

    it("has non-empty noun and phrase lists on every rung", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        ladder.forEach((rung, i) => {
          expect(rung.nouns.length, `${shape} rung ${i} has no nouns`).to.be.above(0);
          expect(rung.phrases.length, `${shape} rung ${i} has no phrases`).to.be.above(0);
        });
      });
    });

    it("never uses a size word in a compact noun", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        ladder.forEach(rung => {
          rung.nouns.forEach(noun => {
            expect(noun, `${shape}: "${noun}" contains a size word`).to.not.match(SIZE_WORD);
          });
        });
      });
    });

    it("places each compact noun in at most two adjacent rungs of a ladder", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        const rungsByNoun = {};
        ladder.forEach((rung, i) => {
          rung.nouns.forEach(noun => { (rungsByNoun[noun] ||= []).push(i); });
        });
        Object.entries(rungsByNoun).forEach(([noun, rungs]) => {
          expect(rungs.length, `${shape}: "${noun}" is in ${rungs.length} rungs`).to.be.at.most(2);
          if (rungs.length === 2) {
            expect(rungs[1] - rungs[0], `${shape}: "${noun}" is in non-adjacent rungs`).to.equal(1);
          }
        });
      });
    });

    it("never uses a phrase that can't be pluralized on its last word", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        ladder.forEach(rung => {
          rung.phrases.forEach(phrase => {
            expect(phrase, `${shape}: "${phrase}" won't pluralize cleanly`).to.not.include(' of ');
          });
        });
      });
    });

  });

  describe("size comparison tokens", function() {

    const CONNECTOR = /^(\S+) (the size of|as big as|as large as) (.+)$/;

    function setBreasts(id, shape, volume) {
      BreastsComponent.update(id, { breastSize:sizeOf(shape), breastShape:shape, relativeBreastVolume:volume });
    }

    // Runs the callback once per rung of every ladder, with the character's breasts set to that shape and a volume
    // sitting exactly on the rung's max.
    function onEveryRung(callback) {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        ladder.forEach(rung => {
          setBreasts(id, shape, rung.max);
          callback(id, shape, rung);
        });
      });
    }

    it("weaves appleSized as a compact noun followed by sized", function() {
      onEveryRung((id, shape, rung) => {
        const match = BreastsLoom.weave(id,'appleSized').match(/^(.+) sized$/);
        expect(match, `${shape}@${rung.max}: no match`).to.not.equal(null);
        expect(rung.nouns, `${shape}@${rung.max}`).to.include(match[1]);
      });
    });

    it("weaves appleSizedBreasts as a compact noun, sized, and a plural breasts word", function() {
      onEveryRung((id, shape, rung) => {
        const match = BreastsLoom.weave(id,'appleSizedBreasts').match(/^(.+) sized (\S+)$/);
        expect(match, `${shape}@${rung.max}: no match`).to.not.equal(null);
        expect(rung.nouns, `${shape}@${rung.max}`).to.include(match[1]);
        expect(match[2]).to.match(/s$/);
      });
    });

    it("weaves breastsBigAsApples as a breasts word, a connector, and a plural long-form phrase", function() {
      onEveryRung((id, shape, rung) => {
        const match = BreastsLoom.weave(id,'breastsBigAsApples').match(CONNECTOR);
        expect(match, `${shape}@${rung.max}: no match`).to.not.equal(null);
        expect(match[1]).to.match(/s$/);
        expect(rung.phrases.map(EnglishHelper.pluralize), `${shape}@${rung.max}`).to.include(match[3]);
      });
    });

    it("weaves apples and anApple from the long-form phrases", function() {
      onEveryRung((id, shape, rung) => {
        expect(rung.phrases.map(EnglishHelper.pluralize), `${shape}@${rung.max} apples`).to.include(BreastsLoom.weave(id,'apples'));

        const match = BreastsLoom.weave(id,'anApple').match(/^(an?) (.+)$/);
        expect(match, `${shape}@${rung.max} anApple: no match`).to.not.equal(null);
        expect(rung.phrases, `${shape}@${rung.max} anApple`).to.include(match[2]);
        expect(match[1]).to.equal(EnglishHelper.a_an(match[2]));
      });
    });

    it("warns instead of comparing for shapes without a ladder", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      NO_COMPARISON.forEach(shape => {
        setBreasts(id, shape, BreastData.BreastSizes[sizeOf(shape)].min + 1);
        const text = BreastsLoom.weave(id,'appleSizedBreasts');
        expect(text, shape).to.include('weaver-warning');
        expect(text, shape).to.include(shape);
      });
    });

    it("throws when the relative volume is past the end of the ladder", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      setBreasts(id, 'average', BreastData.BreastSizes.average.max + 1);
      expect(() => BreastsLoom.weave(id,'appleSized')).to.throw(/past the end of the average ladder/);
    });

  });

});
