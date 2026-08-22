describe("BreastsLoom", function() {

  function allShapes() {
    return Object.values(BreastData.BreastShapeTable).flatMap(row => Object.values(row).flat());
  }

  function sizeOf(shape) {
    return Object.keys(BreastData.BreastShapeTable).find(size => {
      return Object.values(BreastData.BreastShapeTable[size]).flat().includes(shape);
    });
  }

  describe("BreastData.ComparisonShapes", function() {

    it("has an entry for every shape in the BreastShapeTable, even if it's null", function() {
      allShapes().forEach(shape => {
        expect(BreastData.ComparisonShapes, `${shape} needs a ComparisonShapes entry`).to.have.property(shape);
      });
    });

    it("only has entries for known shapes", function() {
      const shapes = allShapes();
      Object.keys(BreastData.ComparisonShapes).forEach(shape => {
        expect(shapes, `${shape} is not in the BreastShapeTable`).to.include(shape);
      });
    });

    it("only maps shapes to ladders that exist in BreastComparisons", function() {
      Object.entries(BreastData.ComparisonShapes).forEach(([shape, comparisonShape]) => {
        if (comparisonShape == null) { return; }
        expect(BreastComparisons, `${shape} maps to ${comparisonShape}`).to.have.property(comparisonShape);
      });
    });

  });

  describe("BreastComparisons data", function() {

    const SIZE_WORD = /\b(tiny|small|little|large|big|huge|young|overgrown|oversized|swollen|bulging|giant|massive|enormous)\b/;

    function eachLadder(callback) {
      Object.entries(BreastComparisons).forEach(([key, ladder]) => callback(key, ladder));
    }

    function eachBand(callback) {
      eachLadder((key, ladder) => {
        Object.keys(ladder.nouns).forEach((max, i) => callback(key, max, ladder.nouns[max], ladder.phrases[max], i));
      });
    }

    it("keys the nouns and phrases of every ladder by the same ascending volume bands", function() {
      eachLadder((key, ladder) => {
        const maxes = Object.keys(ladder.nouns).map(Number);
        expect(maxes.length, `${key} has no bands`).to.be.above(0);
        maxes.forEach((max, i) => {
          expect(Number.isInteger(max) && max > 0, `${key} band ${max} is not a whole volume`).to.equal(true);
          if (i > 0) { expect(max, `${key} band ${max} does not ascend`).to.be.above(maxes[i-1]); }
        });
        expect(Object.keys(ladder.phrases), `${key} phrases are not banded like its nouns`).to.deep.equal(Object.keys(ladder.nouns));
      });
    });

    it("has non-empty noun and phrase lists in every band", function() {
      eachBand((key, max, nouns, phrases) => {
        expect(nouns.length, `${key}@${max} has no nouns`).to.be.above(0);
        expect(phrases.length, `${key}@${max} has no phrases`).to.be.above(0);
      });
    });

    it("never uses a size word in a compact noun", function() {
      eachBand((key, max, nouns) => {
        nouns.forEach(noun => {
          expect(noun, `${key}@${max}: "${noun}" contains a size word`).to.not.match(SIZE_WORD);
        });
      });
    });

    it("places each compact noun in consecutive bands of a ladder", function() {
      eachLadder((key, ladder) => {
        const bandsByNoun = {};
        Object.values(ladder.nouns).forEach((nouns, i) => {
          nouns.forEach(noun => { (bandsByNoun[noun] ||= []).push(i); });
        });
        Object.entries(bandsByNoun).forEach(([noun, bands]) => {
          bands.forEach((band, i) => {
            if (i > 0) { expect(band - bands[i-1], `${key}: "${noun}" skips a band`).to.equal(1); }
          });
        });
      });
    });

    it("never uses a phrase that can't be pluralized on its last word", function() {
      eachBand((key, max, nouns, phrases) => {
        phrases.forEach(phrase => {
          expect(phrase, `${key}@${max}: "${phrase}" won't pluralize cleanly`).to.not.include(' of ');
        });
      });
    });

  });

  describe("size comparison tokens", function() {

    const CONNECTOR = /^(\S+) (the size of|as big as|as large as) (.+)$/;

    function shapeUsing(comparisonShape) {
      return allShapes().find(shape => BreastData.ComparisonShapes[shape] === comparisonShape);
    }

    function setBreasts(id, shape, volume) {
      BreastsComponent.update(id, { breastSize:sizeOf(shape), breastShape:shape, absoluteBreastVolume:volume });
    }

    function topBandOf(ladder) {
      const maxes = Object.keys(ladder.nouns);
      return maxes[maxes.length-1];
    }

    // Runs the callback once per band of every ladder, with the character's breasts set to a shape that uses the
    // ladder and an absolute volume sitting exactly on the band's max.
    function onEveryBand(callback) {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      Object.entries(BreastComparisons).forEach(([comparisonShape, ladder]) => {
        const shape = shapeUsing(comparisonShape);
        Object.keys(ladder.nouns).forEach(max => {
          setBreasts(id, shape, Number(max));
          callback(id, `${shape}@${max}`, { nouns:ladder.nouns[max], phrases:ladder.phrases[max] });
        });
      });
    }

    it("weaves appleSized as a compact noun followed by sized", function() {
      onEveryBand((id, label, band) => {
        const match = BreastsLoom.weave(id,'appleSized').match(/^(.+) sized$/);
        expect(match, `${label}: no match`).to.not.equal(null);
        expect(band.nouns, label).to.include(match[1]);
      });
    });

    it("weaves appleSizedBreasts as a compact noun, sized, and a plural breasts word", function() {
      onEveryBand((id, label, band) => {
        const match = BreastsLoom.weave(id,'appleSizedBreasts').match(/^(.+) sized (\S+)$/);
        expect(match, `${label}: no match`).to.not.equal(null);
        expect(band.nouns, label).to.include(match[1]);
        expect(match[2]).to.match(/s$/);
      });
    });

    it("weaves breastsBigAsApples as a breasts word, a connector, and a plural long-form phrase", function() {
      onEveryBand((id, label, band) => {
        const match = BreastsLoom.weave(id,'breastsBigAsApples').match(CONNECTOR);
        expect(match, `${label}: no match`).to.not.equal(null);
        expect(match[1]).to.match(/s$/);
        expect(band.phrases.map(EnglishHelper.pluralize), label).to.include(match[3]);
      });
    });

    it("weaves apples and anApple from the long-form phrases", function() {
      onEveryBand((id, label, band) => {
        expect(band.phrases.map(EnglishHelper.pluralize), `${label} apples`).to.include(BreastsLoom.weave(id,'apples'));

        const match = BreastsLoom.weave(id,'anApple').match(/^(an?) (.+)$/);
        expect(match, `${label} anApple: no match`).to.not.equal(null);
        expect(band.phrases, `${label} anApple`).to.include(match[2]);
        expect(match[1]).to.equal(EnglishHelper.a_an(match[2]));
      });
    });

    it("bands by the absolute volume, not the relative volume", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      BreastsComponent.update(id, { breastSize:'huge', breastShape:'bimbo', relativeBreastVolume:3000, absoluteBreastVolume:140 });
      const match = BreastsLoom.weave(id,'appleSized').match(/^(.+) sized$/);
      expect(BreastComparisons.round.nouns[150]).to.include(match[1]);
    });

    it("uses the first band at or above the volume", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      setBreasts(id, 'balls', 201);
      const match = BreastsLoom.weave(id,'appleSized').match(/^(.+) sized$/);
      expect(BreastComparisons.round.nouns[250]).to.include(match[1]);
    });

    it("uses the top band for volumes past the end of the ladder", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      const top = topBandOf(BreastComparisons.teardrop);
      setBreasts(id, 'massive-bells', Number(top) * 3);
      const match = BreastsLoom.weave(id,'appleSized').match(/^(.+) sized$/);
      expect(BreastComparisons.teardrop.nouns[top]).to.include(match[1]);
    });

    it("errors instead of comparing for shapes without a ladder", function() {
      const id = CharacterFactory.build({ gender:Gender.female, species:SpeciesCode.human });
      const shapes = allShapes().filter(shape => BreastData.ComparisonShapes[shape] == null);
      expect(shapes).to.not.be.empty;
      shapes.forEach(shape => {
        setBreasts(id, shape, BreastData.BreastSizes[sizeOf(shape)].min + 1);
        const text = BreastsLoom.weave(id,'appleSizedBreasts');
        expect(text, shape).to.include('weaver-error');
        expect(text, shape).to.include(shape);
      });
    });

  });

});
