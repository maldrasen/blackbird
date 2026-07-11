describe.only("NegotiationOpening", function() {

  it("has a list of responses for a given monster", function() {
    const monster = MonsterFactory.build('kobold-runt');
    const opening = NegotiationOpening(monster);

    console.log(opening.getQuestions());

  });

});
