describe("BreastsLoom", function() {

  describe("BreastComparisons data", function() {

    const NO_COMPARISON = ['flat','pancakes','tiddys','elongated-sacks','massive-bells','straining-round'];
    const SIZE_WORD = /\b(tiny|small|little|large|big|huge|young|overgrown|oversized|swollen|bulging|giant|massive|enormous)\b/;

    function allShapes() {
      return Object.values(BreastData.BreastShapeTable).flatMap(row => Object.values(row).flat());
    }

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

    it("has ascending rungs that end at Infinity", function() {
      Object.entries(BreastComparisons).forEach(([shape, ladder]) => {
        expect(ladder.length, `${shape} has no rungs`).to.be.above(0);
        ladder.forEach((rung, i) => {
          if (i > 0) { expect(rung.max, `${shape} rung ${i} does not ascend`).to.be.above(ladder[i-1].max); }
        });
        expect(ladder[ladder.length-1].max, `${shape} does not end at Infinity`).to.equal(Infinity);
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

});
