describe.only('CalendarHelper', function() {

  it('for day 1', function() {
    const info = CalendarHelper.dayInfo(1);
    expect(info.color).to.equal('white');
    expect(info.lesser).to.equal('drink');
    expect(CalendarHelper.dayName(1)).to.equal('Milksday');
    expect(CalendarHelper.seasonName(1)).to.equal('Spring');
    expect(CalendarHelper.yearName(1)).to.equal('Year of The Birth of The Maiden');
    expect(CalendarHelper.fullDate(1)).to.equal('Milksday, Spring, Year of The Perverted Raven, 13th Age of Angoria');
  });

  it('for day 200', function() {
    expect(CalendarHelper.fullDate(200)).to.equal(
      'Day of The Marlin, Autumn, Year of The Perverted Raven, 13th Age of Angoria');
  });

  it('for day 1000', function() {
    expect(CalendarHelper.fullDate(1000)).to.equal(
      'Day of Bile, Winter, Year of The Drumming Twins, 13th Age of Angoria');
  });

  it('for day 8888', function() {
    expect(CalendarHelper.fullDate(8888)).to.equal(
      'Day of The Peacock, Autumn, Year of The Indefatigable Lovers, 13th Age of Angoria');
  });

});