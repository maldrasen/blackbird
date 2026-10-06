global.EquipmentSummaryPanel = (function() {

  function update(id) {
    const equipment = EquipmentManager(id);
    const damages = equipment.summarizeDamages();
    const resistances = equipment.summarizeResistances();
    const summaryPanel = X.first(`#equipmentTab .equipment-summary-panel`);

    X.fill(summaryPanel,X.createElement(`<div>
      <div class='weapon-section'></div>
      <div class='protection-section row-of-panels'></div>
    </div>`));

    buildWeaponPanel(damages);
    buildArmorPanel(resistances.physical);
    buildResistancePanel(resistances.magical);
  }

  function findSummaryPanel() { return X.first('#equipmentTab .equipment-summary-panel'); }
  function findWeaponSection() { return X.first('#equipmentTab .weapon-section'); }
  function findProtectionSection() { return X.first('#equipmentTab .protection-section'); }

  function hide() { X.addClass(findSummaryPanel(),'hide'); }
  function show() { X.removeClass(findSummaryPanel(),'hide'); }

  // The damage is what the character really deals with the weapon. The attack power is the weapon's own range before
  // strength is applied, listed the same way the item details do.
  function buildWeaponPanel(weapons) {
    if (weapons.primary || weapons.secondary) {
      findWeaponSection().appendChild(X.createElement(`<div class='panel'>
        <div class='panel-label'>Weapons</div>
        <div class='weapon-row'>${buildWeapon(weapons.primary)} ${buildWeapon(weapons.secondary)}</div>
      </div>`));
    }
  }

  function buildWeapon(weapon) {
    if (weapon) {
      const properties = [
        { label:'Damage', content:`${weapon.low} – ${weapon.high}` },
        { label:'Attack Power', content:`${weapon.attackPower.low} – ${weapon.attackPower.high} ${damageTypesText(weapon.damageTypes)}` },
        { label:'Attack Time', content:`${weapon.speed}` },
        { label:'Range', content:StringHelper.titlecase(weapon.reach) },
      ].map(buildProperty).join('');

      return `<div class='weapon'>
        <div class='margin-bottom'>${ItemName({ itemId:weapon.itemId, showIcon:true, size:'large' }).asString()}</div>
        <ul class='properties'>${properties}</ul>
      </div>`;
    }
    return '';
  }

  function damageTypesText(damageTypes) {
    if (damageTypes.length === 1) { return damageTypes[0].type; }
    return `(${damageTypes.map(entry => `${entry.percent}% ${entry.type}`).join(', ')})`;
  }

  function buildArmorPanel(armor) {
    const types = [DamageType.crush, DamageType.slash, DamageType.pierce];
    const headings = types.map(type => `<div class='heading'>${StringHelper.titlecase(type)}</div>`).join('');

    const rows = Object.entries(armor).map(([location, reductions]) => {
      const amounts = types.map(type => buildAmount(reductions[type])).join('');
      return `<div class='label'>${StringHelper.titlecase(location)}</div>${amounts}`;
    }).join('');

    findProtectionSection().appendChild(X.createElement(`<div class='armor-section panel'>
      <div class='panel-label'>Protection</div>
      <div class='panel-content armor-table'>
        <div class='heading'>&nbsp;</div>
        ${headings}
        ${rows}
      </div>
    </div>`));
  }

  function buildResistancePanel(resistances) {
    if (Object.keys(resistances).length > 0) {
      const rows = Object.entries(resistances).map(([type, amount]) => {
        return `<li><span class='label'>${StringHelper.titlecase(type)}</span>${buildAmount(amount)}</li>`;
      }).join('');

      findProtectionSection().appendChild(X.createElement(`<div class='resistance-section panel'>
        <div class='panel-label'>Resistances</div>
        <ul class='panel-content'>${rows}</ul>
      </div>`));
    }
  }

  function buildAmount(reduction) {
    if (reduction === 0) { return `<span class='amount none'>0%</span>`; }
    if (reduction < 0) { return `<span class='amount vulnerable'>${reduction}%</span>`; }
    return `<span class='amount'>${reduction}%</span>`;
  }

  function buildProperty(property) {
    return `<li><span class='label'>${property.label}</span><div class='content'>${property.content}</div></li>`;
  }

  return {
    hide,
    show,
    update
  };

})();
