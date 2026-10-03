global.ItemDetailPanel = function() {
  let panelElement;
  let partySelect;

  // Create and return a panel element;
  function build() {
    panelElement = X.createElement(`<div class='item-detail-panel'></div>`);
    return panelElement;
  }

  // This details panel is used in the inventory overlay and will be used in the character overlay equipment tab. In
  // both cases we know we're out of combat, so non-combat items and items that can be used at any time are usable from
  // this panel.
  function update(selected) {
    X.empty(panelElement);
    partySelect.hide();

    if (selected && selected.code) {
      const article = Article.lookup(selected.code);

      if (isUsableNow(article)) {
        partySelect.show();
      }

      panelElement.appendChild(buildArticleDetails(article));
    }
  }

  function isUsableNow(article) {
    return [UsableWhen.outOfCombat, UsableWhen.anyTime].includes(article.getUsableWhen());
  }

  // TODO: Button row isn't a general style?

  function buildArticleDetails(article) {
    const details = X.createElement(`<div class='details'>
      <div class='top'>
        <div class='name'>${article.getName()}</div>
        <div class='description'>${article.getDescription()}</div>
        <div class='value'>Value: ${JSON.stringify(CurrencyHelper.valueToCurrency(article.getValue()))}</div>
      </div>
      <div class='actions button-row'>
        <a href='#' class='button button-danger drop-button'>Drop</a>
      </div>
    </div>`);

    const dropButton = details.querySelector('.drop-button');
    dropButton.addEventListener('click', () => { console.log("Drop:",article.getName()) });

    if (isUsableNow(article)) {
      const disabledState = partySelect.getSelected() == null ? 'disabled' : '';
      const useButton = X.createElement(`<a href='#' class='button button-primary use-button ${disabledState}'>Use</a>`);
      useButton.addEventListener('click', () => { console.log("Use:",article.getName()) })
      details.querySelector('.button-row').appendChild(useButton);
    }

    return details;
  }

  return {
    build,
    update,
    setPartySelect: select => { partySelect = select; },
  }
}
