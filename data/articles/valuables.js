
const churchNote = `While not something that would normally be valuable, the Holy Church pays well for the return of human remains.`;

Article.register('string-of-teeth',{
  name: 'String of Teeth',
  pluralName: 'Strings of Teeths',
  description: `A set of thirty two human teeth worn as a talisman. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  baseValue: 15,
  sources: [
    { group:'valuables', rarity:Rarity.common },
    { group:'kobolds', rarity:Rarity.common },
    { group:'vermen', rarity:Rarity.common },
  ],
});

Article.register('fingerbone-satchel',{
  name: 'Fingerbone Satchel',
  description: `A small leather bag filled with human fingerbones. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  baseValue: 25,
  sources: [
    { group:'valuables', rarity:Rarity.common },
    { group:'kobolds', rarity:Rarity.common },
    { group:'vermen', rarity:Rarity.common },
  ],
});

Article.register('rattlebones',{
  name: 'Rattlebones',
  pluralName: 'Rattlebones',
  description: `A bundle of loosely strung human bones. They might serve some ceremonial purpose. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  baseValue: 35,
  sources: [
    { group:'valuables', rarity:Rarity.common },
    { group:'kobolds', rarity:Rarity.common },
    { group:'vermen', rarity:Rarity.common },
  ],
});

Article.register('fluted-femur',{
  name: 'Fluted Femur',
  description: `A large human femur that's been hollowed out and turned into a musical instrument. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  baseValue: 50,
  sources: [
    { group:'valuables', rarity:Rarity.unusual },
    { group:'kobolds', rarity:Rarity.unusual },
    { group:'vermen', rarity:Rarity.unusual },
  ],
});

Article.register('grim-totem',{
  name: 'Grim Totem',
  description: `A crude talisman made from human bones and preserved organs. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone','flesh'],

  baseValue: 60,
  sources: [
    { group:'valuables', rarity:Rarity.common },
    { group:'kobolds', rarity:Rarity.common },
    { group:'vermen', rarity:Rarity.common },
  ],
});

Article.register('intact-human-skull',{
  name: 'Intact Human Skull',
  description: `A human skull, denuded of flesh. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['bone'],

  baseValue: 66,
  sources: [
    { group:'valuables', rarity:Rarity.common },
    { group:'kobolds', rarity:Rarity.common },
    { group:'vermen', rarity:Rarity.common },
  ],
});

Article.register('runecarved-femur',{
  name: 'Runecarved Femur',
  description: `A large human femur that's been intricately carved with arcane symbols. The bone has a faint magical 
    aura about it, but doesn't seem to do anything itself.`,
  category: InventoryCategory.valuables,
  tags: ['bone','magic'],

  baseValue: 110,
  sources: [
    { group:'valuables', rarity:Rarity.unusual },
    { group:'kobolds', rarity:Rarity.unusual },
    { group:'vermen', rarity:Rarity.unusual },
  ],
});

Article.register('runecarved-human-skull',{
  name: 'Runecarved Human Skull',
  description: `A human skull, denuded of flesh and intricately carved with arcane symbols. The skull has a faint 
  magical aura about it, but doesn't seem to do anything itself.`,
  category: InventoryCategory.valuables,
  tags: ['bone','magic'],

  baseValue: 130,
  sources: [
    { group:'valuables', rarity:Rarity.unusual },
    { group:'kobolds', rarity:Rarity.unusual },
    { group:'vermen', rarity:Rarity.unusual },
  ],
});

Article.register('faintly-glowing-human-skull',{
  name: 'Faintly Glowing Human Skull',
  description: `This human skull glows with a warm but sinister light. The skull's eyes glow the brightest; the light 
    emanating from somewhere within.`,
  category: InventoryCategory.valuables,
  tags: ['bone','magic'],

  baseValue: 210,
  sources: [
    { group:'valuables', rarity:Rarity.rare },
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('ball-bag',{
  name: 'Ball Bag',
  description: `This small leather bag is unassuming at first. On closer inspection though it's clearly been made 
    from a tanned human scrotum. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 42,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('impressive-ball-bag',{
  name: 'Impressive Ball Bag',
  description: `A large and remarkably well preserved human scrotum, cured and worked into a leather pouch. The cock 
    is still attached, stuffed and sewn onto the bag decoratively. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 90,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('human-leather-pouch',{
  name: 'Human Leather Pouch',
  description: `This leather pouch is unassuming at first. On closer inspection though it's clearly been made 
    from a tanned human breast, given the plump nipple on the underside of the bag. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 63,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('human-leather-bag',{
  name: 'Large Human Leather Bag',
  description: `This leather bag is made from a well preserved, and remarkably large, human breast. The thick nipple 
    on the underside of the bag even has a ring piercing. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 120,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('preserved-human-heart',{
  name: 'Preserved Human Heart',
  description: `A preserved human heart. ${churchNote}`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 20,
  sources: [
    { group:'valuables', rarity:Rarity.unusual },
    { group:'kobolds', rarity:Rarity.unusual },
    { group:'vermen', rarity:Rarity.unusual },
  ],
});

Article.register('throbbing-human-heart',{
  name: 'Preserved Human Heart',
  description: `This preserved human heart is still softly beating and warm to the touch.`,
  category: InventoryCategory.valuables,
  tags: ['flesh','magic'],

  baseValue: 150,
  sources: [
    { group:'valuables', rarity:Rarity.rare },
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('unblinking-eye',{
  name: 'Unblinking Eye',
  description: `A magically preserved human eye. It's pupils contract when exposed to light, but can it see?`,
  category: InventoryCategory.valuables,
  tags: ['flesh','magic'],

  baseValue: 72,
  sources: [
    { group:'valuables', rarity:Rarity.rare },
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('smashed-horse-assholes',{
  name: 'A Bag of Smashed Horse Assholes',
  pluralName: 'Bags of Smashed Horse Assholes',
  description: `Why would anyone want this?`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 10,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});

Article.register('hickory-smoked-horse-assholes',{
  name: 'A Bag of Hickory Smoked Horse Assholes',
  pluralName: 'Bags of Hickory Smoked Horse Assholes',
  description: `Better than the raw ones.`,
  category: InventoryCategory.valuables,
  tags: ['flesh'],

  baseValue: 18,
  sources: [
    { group:'kobolds', rarity:Rarity.rare },
    { group:'vermen', rarity:Rarity.rare },
  ],
});
