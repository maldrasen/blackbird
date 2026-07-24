global.LevelUpOverlay = (function() {

  function init() {
    X.onClick('#levelUpOverlay .attribute-pick', pickAttribute);
    X.onClick('#levelUpOverlay .confirm-button', confirmLevelUp);
  }

  function open(id) {
    GeneralOverlay.open(build(id), { classname:'small' });
  }

  function build(id) {
    const experience = ExperienceComponent.lookup(id);
    const attributes = AttributesComponent.lookup(id);

    const content = X.createElement(`<div id='levelUpOverlay' data-id='${id}'>
      <div class='title'>${Character(id).getName()}</div>
      <p class='summary'>Level ${experience.level} → ${experience.level + 1}. Choose an attribute to raise.</p>
      <ul class='attribute-picks'></ul>
      <div class='button-row align-right'>
        <a href='#' class='button button-primary confirm-button disabled'>Confirm</a>
      </div>
    </div>`);

    Object.keys(Attrib).forEach(code => {
      X.append(content.querySelector('.attribute-picks'), X.createElement(`<li>
        <a href='#' class='attribute-pick' data-attribute='${code}'>
          <span class='attribute-name'>${StringHelper.titlecase(code)}</span>
          <span class='attribute-value'>${attributes[code]}</span>
        </a>
      </li>`));
    });

    return content;
  }

  function pickAttribute(event) {
    X.removeClass('#levelUpOverlay .attribute-pick','selected');
    X.addClass(event.target.closest('.attribute-pick'),'selected');
    X.removeClass('#levelUpOverlay .confirm-button','disabled');
  }

  function confirmLevelUp() {
    const id = X.first('#levelUpOverlay').dataset.id;
    const attribute = X.first('#levelUpOverlay .attribute-pick.selected').dataset.attribute;

    EnlightenSystem.chooseLevelUpAttribute(id, attribute);
    WindowManager.pop();
    EnlightenView.resume(id);
  }

  return Object.freeze({
    init,
    open,
  });

})();
