describe('NameBuilder', function() {

  it("gets a random demon female name", function() {
    SpecHelper.startLog('Female Demon Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Demon', gender:Gender.female });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random demon male name", function() {
    SpecHelper.startLog('Male Demon Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Demon', gender:Gender.male });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random demon futa name", function() {
    SpecHelper.startLog('Futa Demon Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Demon', gender:Gender.futa });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random elf female name", function() {
    SpecHelper.startLog('Female Elf Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Elf', gender:Gender.female });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random elf male name", function() {
    SpecHelper.startLog('Male Elf Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Elf', gender:Gender.male });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random elf futa name", function() {
    SpecHelper.startLog('Futa Elf Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Elf', gender:Gender.futa });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random goblin female name", function() {
    SpecHelper.startLog('Female Goblin Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Goblin', gender:Gender.female });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random goblin male name", function() {
    SpecHelper.startLog('Male Goblin Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Goblin', gender:Gender.male });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random goblin futa name", function() {
    SpecHelper.startLog('Futa Goblin Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Goblin', gender:Gender.futa });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

  it("gets a random female kobold name", function() {
    SpecHelper.startLog('Female Kobold Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Kobold', gender:Gender.female });
      SpecHelper.log(`${name.first.name}`);
    });
  });

  it("gets a random male kobold name", function() {
    SpecHelper.startLog('Male Kobold Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Kobold', gender:Gender.male });
      SpecHelper.log(`${name.first.name}`);
    });
  });

  it("gets a random futa kobold name", function() {
    SpecHelper.startLog('Futa Kobold Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Kobold', gender:Gender.futa });
      SpecHelper.log(`${name.first.name}`);
    });
  });

  it("gets a random rat name", function() {
    SpecHelper.startLog('Rat Name');
    SpecHelper.times(10, () => {
      let name = NameBuilder.getRandom({ category:'Rat', gender:Gender.male });
      SpecHelper.log(`${name.first.name} ${name.last.name}`);
    });
  });

});
