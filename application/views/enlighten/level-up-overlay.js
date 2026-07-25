global.LevelUpOverlay = (function() {

  function init() {
    X.onClick('#levelUpOverlay .attributes.enabled .pick', pickAttribute);
    X.onClick('#levelUpComplete', close);
  }

  function open(id) {
    GeneralOverlay.open(build(id), { classname:'small', preventClose:true });
    GeneralOverlay.setFooterContent(buildCompleteButton());
  }

  function build(id) {
    const experience = ExperienceComponent.lookup(id);
    const attributes = AttributesComponent.lookup(id);

    const content = X.createElement(`<div id='levelUpOverlay' data-id='${id}'>
      <div class='title'>${Character(id).getName()} advances to level ${experience.level + 1}!</div>
      <ul class='attributes enabled'><li class='note'>Pick one attribute to increase</li></ul>
    </div>`);

    Object.keys(Attrib).forEach(code => {
      X.append(content.querySelector('.attributes'), X.createElement(`
        <li class='pick' data-attribute='${code}'>
          <span class='attribute-name'>${StringHelper.titlecase(code)}</span>
          <span class='attribute-value'>${attributes[code]}</span>
        </li>`
      ));
    });

    return content;
  }

  function buildCompleteButton() {
    return X.createElement(`<a id='levelUpComplete' href='#' class='button button-primary disabled'>Confirm</a>`);
  }

  function pickAttribute(event) {
    const id = X.first('#levelUpOverlay').dataset.id;
    const pick = event.target.closest('.pick');
    const attribute = pick.dataset.attribute;
    const increase = EnlightenSystem.levelUpAttribute(id, attribute);
    const newValue = AttributesComponent.lookup(id)[attribute];

    X.removeClass('#levelUpOverlay .attributes','enabled');
    X.addClass(pick,'selected');
    X.each('#levelUpOverlay .attributes .pick', item => {
      if (X.hasClass(item,'selected') === false) { X.addClass(item,'unselected'); }
    });

    console.log(`ID:${id} ${attribute}`);
    console.log(` > ${increase}`);

    X.fill(pick.querySelector('.attribute-value'), [
      X.createElement(`<span class='increase'>(+${increase})</span>`),
      `${newValue}`,
    ]);

    checkState();
  }

  // TODO: Leveling up will eventually be a multi step process. We've finished leveling up when all the required
  //       decisions have been made. At the moment we only need to select an attribute. Eventually this will go though
  //       all the controls and only enable the button when nothing else needs to be done.

  function checkState() {
    X.removeClass('#levelUpComplete','disabled');
  }

  function close() {
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
