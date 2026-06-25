describe('CalendarHelper', function() {

  it('for day 1', function() {
    const info = CalendarHelper.dayInfo(1);
    expect(info.color).to.equal('white');
    expect(info.lesser).to.equal('holiday');
    expect(CalendarHelper.dayName(1)).to.equal('Dawnlight');
    expect(CalendarHelper.seasonName(1)).to.equal('Spring');
    expect(CalendarHelper.yearName(1)).to.equal('Year of The Birth of The Maiden');
    expect(CalendarHelper.fullDate(1)).to.equal('Dawnlight, Spring, Year of The Perverted Incubus');
  });

  it('for day 200', function() {
    expect(CalendarHelper.fullDate(200)).to.equal(
      'Day of The Marlin, Autumn, Year of The Perverted Incubus');
  });

  it('for day 666', function() {
    expect(CalendarHelper.fullDate(666)).to.equal(
      'Goldenglow, Winter, Year of The Solar Blacksmith');
  });

  it('for day 1000', function() {
    expect(CalendarHelper.fullDate(1000)).to.equal(
      'Deadwinter, Winter, Year of The Drumming Lovers');
  });

  it('for day 8888', function() {
    expect(CalendarHelper.fullDate(8888)).to.equal(
      'Day of The Iris, Autumn, Year of The Indefatigable Corpse');
  });

});
