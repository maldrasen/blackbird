global.EquipmentSummaryPanel = (function() {
  let summaryPanel;

  function update(id) {
    summaryPanel = X.first(`#equipmentTab .equipment-summary-panel`);

    const equipment = EquipmentManager(id);
    const damages = equipment.summarizeDamages();
    const resistances = equipment.summarizeResistances();

    buildWeaponSection(damages);
    buildArmorSection(resistances.physical);
    buildResistanceSection(resistances.magical);
  }

  // The damage shown here is what the character really deals with the weapon, unlike the attack power in the item
  // details, which is the weapon's range before strength is applied.
  function buildWeaponSection(weapons) {
    if (weapons.primary || weapons.secondary) {
      summaryPanel.appendChild(X.createElement(`<div class='weapon-section'>
        ${buildWeapon(weapons.primary)} ${buildWeapon(weapons.secondary)}
      </div>`));
    }
  }

  function buildWeapon(weapon) {
    const properties = [
      { label:'Damage', content:`${weapon.low} – ${weapon.high} ${damageTypesText(weapon.damageTypes)}` },
      { label:'Attack Time', content:`${weapon.speed}` },
      { label:'Range', content:StringHelper.titlecase(weapon.reach) },
    ].map(buildProperty).join('');

    return `<div class='weapon'>
      <div class='margin-bottom'>${ItemName({ itemId:weapon.itemId, showIcon:true, size:'large' }).asString()}</div>
      <ul class='properties'>${properties}</ul>
    </div>`;
  }

  function damageTypesText(damageTypes) {
    if (damageTypes.length === 1) { return damageTypes[0].type; }
    return `(${damageTypes.map(entry => `${entry.percent}% ${entry.type}`).join(', ')})`;
  }

  // <div class='armor-section section'>
  //   <div class='section-title'>Armor</div>
  //   <div class='resistance-grid'></div>
  // </div>

  function buildArmorSection(physical) {
    // const types = Object.keys(Object.values(physical)[0]);
    // const headings = types.map(type => `<div class='heading'>${StringHelper.titlecase(type)}</div>`).join('');
    //
    // const rows = Object.entries(physical).map(([location, reductions]) => {
    //   const amounts = types.map(type => buildAmount(reductions[type])).join('');
    //   return `<div class='label'>${StringHelper.titlecase(location)}</div>${amounts}`;
    // }).join('');

    // Append headings and rows to resistance grid

  }

  // <div class='resistance-section section'>
  //   <div class='section-title'>Resistances</div>
  //   <ul class='resistance-list'></ul>
  // </div>

  function buildResistanceSection(magical) {
    // const rows = Object.entries(magical).map(([type, amount]) => {
    //   return `<div class='label'>${StringHelper.titlecase(type)}</div>${buildAmount(amount)}`;
    // }).join('');
  }

  function buildAmount(reduction) {
    if (reduction === 0) { return `<div class='amount none'>0%</div>`; }
    if (reduction < 0) { return `<div class='amount vulnerable'>${reduction}%</div>`; }
    return `<div class='amount'>${reduction}%</div>`;
  }

  function buildProperty(property) {
    return `<li><span class='label'>${property.label}</span><div class='content'>${property.content}</div></li>`;
  }


  return {
    update,
  };

})();
