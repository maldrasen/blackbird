global.EquipmentSummaryPanel = function() {
  let panelElement;

  function build() {
    panelElement = X.createElement(`<div class='equipment-summary-panel'></div>`);
    return panelElement;
  }

  function update(characterId) {
    X.empty(panelElement);

    const equipment = EquipmentManager(characterId);
    const damages = equipment.summarizeDamages();
    const resistances = equipment.summarizeResistances();
    const magical = ObjectHelper.select(resistances.magical, (type, amount) => amount !== 0);

    panelElement.appendChild(X.createElement(`<div class='title'>Equipment Summary</div>`));
    if (Object.keys(damages).length > 0) { panelElement.appendChild(buildAttacks(damages)); }
    panelElement.appendChild(buildProtection(resistances.physical));
    if (Object.keys(magical).length > 0) { panelElement.appendChild(buildMagicResistances(magical)); }
  }

  // The damage shown here is what the character really deals with the weapon, unlike the attack power in the item
  // details, which is the weapon's range before strength is applied.
  function buildAttacks(damages) {
    const section = X.createElement(`<div class='section'>
      <div class='section-title'>Weapons</div>
      <div class='attack-row'></div>
    </div>`);

    [EquipmentSlot.primary, EquipmentSlot.secondary].filter(slot => damages[slot]).forEach(slot => {
      const damage = damages[slot];
      const attack = X.createElement(`<div class='attack'>
        <div class='weapon'>${ItemName({ itemId:damage.itemId, showIcon:true, size:'large' }).asString()}</div>
        <ul class='properties'></ul>
      </div>`);

      [
        { label:'Damage', content:`${damage.low} – ${damage.high} ${damageTypesText(damage.damageTypes)}` },
        { label:'Attack Time', content:`${damage.speed}` },
        { label:'Range', content:StringHelper.titlecase(damage.reach) },
      ].forEach(property => attack.querySelector('.properties').appendChild(buildProperty(property)));

      section.querySelector('.attack-row').appendChild(attack);
    });

    return section;
  }

  function buildProperty(property) {
    return X.createElement(`<li><span class='label'>${property.label}</span><div class='content'>${property.content}</div></li>`);
  }

  function damageTypesText(damageTypes) {
    if (damageTypes.length === 1) { return damageTypes[0].type; }
    return `(${damageTypes.map(entry => `${entry.percent}% ${entry.type}`).join(', ')})`;
  }

  function buildProtection(physical) {
    const types = Object.keys(Object.values(physical)[0]);
    const headings = types.map(type => `<div class='heading'>${StringHelper.titlecase(type)}</div>`).join('');

    const rows = Object.entries(physical).map(([location, reductions]) => {
      const amounts = types.map(type => buildAmount(reductions[type])).join('');
      return `<div class='label'>${StringHelper.titlecase(location)}</div>${amounts}`;
    }).join('');

    return X.createElement(`<div class='section'>
      <div class='section-title'>Armor</div>
      <div class='resistance-grid' style='--columns:${types.length}'><div></div>${headings}${rows}</div>
    </div>`);
  }

  function buildMagicResistances(magical) {
    const rows = Object.entries(magical).map(([type, amount]) => {
      return `<div class='label'>${StringHelper.titlecase(type)}</div>${buildAmount(amount)}`;
    }).join('');

    return X.createElement(`<div class='section'>
      <div class='section-title'>Resistances</div>
      <div class='resistance-grid' style='--columns:1'>${rows}</div>
    </div>`);
  }

  function buildAmount(reduction) {
    if (reduction === 0) { return `<div class='amount none'>0%</div>`; }
    if (reduction < 0) { return `<div class='amount vulnerable'>${reduction}%</div>`; }
    return `<div class='amount'>${reduction}%</div>`;
  }

  return {
    build,
    update,
  };
}
