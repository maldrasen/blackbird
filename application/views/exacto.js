global.X = (function() {

  function all(query) {
    return document.querySelectorAll(query);
  }

  function first(query) {
    return document.querySelector(query);
  }

  function body() {
    return document.getElementsByTagName('body')[0];
  }

  function each(query, callback) {
    all(query).forEach(callback);
  }

  // Remove all elements that match the query string. There's no need for this to only work on a single element, just
  // call element.remove() instead.
  function remove(query) {
    all(query).forEach(element => { element.remove(); });
  }

  function removeAttribute(arg, attribute) {
    (typeof arg === 'string' ? first(arg) : arg).removeAttribute(attribute);
  }

  function empty(arg) {
    (typeof arg === 'string' ? first(arg) : arg).replaceChildren();
  }

  function fill(arg, element) {
    (typeof arg === 'string' ? first(arg) : arg).replaceChildren(element);
  }

  function append(arg, element) {
    (typeof arg === 'string' ? first(arg) : arg).appendChild(element);
  }

  function createElement(string) {
    let element = document.createElement("div");
    element.innerHTML = string;
    return element.children[0];
  }

  function copyElement(selector) {
    return first(selector).cloneNode(true);
  }

  function loadDocument(selector, path) {
    fill(first(selector), createElement(FileHelper.readFile(path)));
  }

  function onClick(selector, callback) {
    window.addEventListener('click', event => {
      if (event.target.closest(".disabled") == null && event.target.closest(selector)) {
        callback(event);
      }
    });
  }

  function onMouseDown(selector, callback) {
    window.addEventListener('mousedown', event => {
      if (event.target.closest(".disabled") == null && event.target.closest(selector)) {
        callback(event);
      }
    });
  }

  function onCodeDown(code, when, callback) {
    let active = false;

    window.addEventListener('keyup', event => {
      if (active && event.code === code) { active = false; }
    });

    window.addEventListener('keydown', event => {
      if (!active && event.code === code) {
        if (when === true || when(event)) {
          active = true;
          callback(event);
        }
      }
    });
  }

  function onResize(when, callback) {
    window.addEventListener('resize', (event) => {
      if (when === true || when(event)) { callback(event); }
    });
  }

  // The hasClass() function only makes sense for a single element so it only considers the first element that matches
  // the selector, which should probably be an ID selector.
  function hasClass(arg, classname) {
    const element = typeof arg == "string" ? X.first(arg) : arg;
    return element ? element.classList.contains(classname) : false;
  }

  function addClass(arg, classname) {
    if (typeof arg == "string") {
      return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.add(classname));
    }
    arg.classList.add(classname);
  }

  function removeClass(arg, classname) {
    if (typeof arg == "string") {
      return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.remove(classname));
    }
    arg.classList.remove(classname);
  }

  function removeClassWithin(element, classname) {
    element.querySelectorAll(`.${classname}`)[0].classList.remove(classname);
  }

  function getPosition(element) {
    return element.getBoundingClientRect();
  }

  function windowDimensions() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  function assetURL(path) {
    return `url('${ROOT}/assets/${path}')`;
  }

  return Object.freeze({
    all,
    first,
    body,
    each,
    remove,
    removeAttribute,
    empty,
    fill,
    append,
    createElement,
    copyElement,
    loadDocument,
    onClick,
    onMouseDown,
    onCodeDown,
    onResize,
    hasClass,
    addClass,
    removeClass,
    removeClassWithin,
    getPosition,
    windowDimensions,
    assetURL,
  });

})();
