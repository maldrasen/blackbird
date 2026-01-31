//
//  Tab Structure
//  The tab-control list and the tab container can be anywhere in the document
//  as long as the control's container and the container's name match. Tabs are
//  likewise matched by name.
//
//      <ul className="tab-control" data-container="options">
//        <li className="tab active" data-tab="stuff">Stuff</li>
//        <li className="tab" data-tab="thing">Thing</li>
//      </ul>
//
//      <div className='tab-container' data-container-name="options">
//        <div className="tab-content active" data-tab="stuff">...</div>
//        <div className="tab-content" data-tab="thing">...</div>
//      </div>
//
global.TabController = (function () {

  function init() {
    X.onClick('.tab-control .tab', event => {
      setActiveByElement(event.target);
    });
  }

  function setActiveByElement(tab) {
    if (X.hasClass(tab, 'active')) {
      return false;
    }

    let control = tab.closest('.tab-control');
    let container = findContainer(control);
    let content = findContent(control, tab.dataset.tab);

    activate(control, container, tab, content);
  }

  function setActiveByName(control, name) {
    if (!X.hasClass(control, 'tab-control')) {
      throw "First argument must be a tab control";
    }

    let container = findContainer(control);
    let content = findContent(control, name);
    let tab = findTab(control, name);

    activate(control, container, tab, content);
  }

  function activate(control, container, tab, content) {
    X.removeClassWithin(control, 'active');
    X.addClass(tab, 'active');

    X.removeClassWithin(container, 'active');
    X.addClass(content, 'active');
  }

  function findContainer(control) {
    return X.first(`.tab-container[data-container-name='${control.dataset.container}']`);
  }

  function findContent(control, name) {
    return X.first(`.tab-container[data-container-name='${control.dataset.container}'] .tab-content[data-tab='${name}']`);
  }

  function findTab(control, name) {
    return control.querySelector(`.tab[data-tab='${name}']`)
  }

  return {
    init,
    setActiveByName,
  }

})();
