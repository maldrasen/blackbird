global.LevelUpOverlay = (function() {

  function init() {
    X.onClick('#levelUpOverlay .attribute-pick', pickAttribute);
    X.onClick('#levelUpConfirm', confirmLevelUp);
  }

  function open(id) {
    GeneralOverlay.open(build(id), { classname:'small', preventClose:true });
    GeneralOverlay.setFooterContent(buildConfirmButton());
  }

  function build(id) {
    const experience = ExperienceComponent.lookup(id);
    const attributes = AttributesComponent.lookup(id);

    const content = X.createElement(`<div id='levelUpOverlay' data-id='${id}'>
      <div class='title'>${Character(id).getName()}</div>
      <p class='summary'>Level ${experience.level} → ${experience.level + 1}. Choose an attribute to raise.</p>
      <ul class='attribute-picks'></ul>
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

  function buildConfirmButton() {
    return X.createElement(`<a id='levelUpConfirm' href='#' class='button button-primary disabled'>Confirm</a>`);
  }

  // Picking an attribute levels up immediately so the player can see the result. Disabling the entire pick list
  // prevents a second level up, though the picked attribute stays highlighted.
  function pickAttribute(event) {
    const id = X.first('#levelUpOverlay').dataset.id;
    const pick = event.target.closest('.attribute-pick');
    const result = EnlightenSystem.chooseLevelUpAttribute(id, pick.dataset.attribute);

    X.addClass('#levelUpOverlay .attribute-picks','disabled');
    X.addClass(pick,'selected');

    X.fill(pick.querySelector('.attribute-value'), [
      `${AttributesComponent.lookup(id)[result.attribute]}`,
      X.createElement(`<span class='increase'>+${result.increase}</span>`),
    ]);

    X.fill('#levelUpOverlay .summary', `${StringHelper.titlecase(result.attribute)} increased by ${result.increase}.`);
    X.removeClass('#levelUpConfirm','disabled');
  }

  function confirmLevelUp() {
    const id = X.first('#levelUpOverlay').dataset.id;
    GeneralOverlay.unlock();
    WindowManager.pop();
    EnlightenView.resume(id);
  }

  return Object.freeze({
    init,
    open,
  });

})();
