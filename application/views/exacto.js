
// X (or Exacto) is a super tiny replacement for jQuery, just a quick
// reimplementation of everything I would actually use from that library.

global.X = function(query) {
  return document.querySelectorAll(query)
}

X.first = function(query) {
  return document.querySelector(query)
}

X.body = function() { return document.getElementsByTagName('body')[0]; }
X.each = function(query, callback) { X(query).forEach(callback); }

// === Create and Modify Elements -=============================================

// Either remove all elements that match the query string. There's no need for
// this to only work on a single element, just call element.remove() instead.
X.remove = function(query) {
  X(query).forEach(element => { element.remove(); });
}

X.removeAttribute = function(arg, attribute) {
  (typeof arg == "string" ? X.first(arg) : arg).removeAttribute(attribute);
}

X.empty = function(arg) {
  (typeof arg == "string" ? X.first(arg) : arg).replaceChildren();
}

X.fill = function(arg, element) {
  (typeof arg == "string" ? X.first(arg) : arg).replaceChildren(element);
}

X.createElement = function(string) {
  let element = document.createElement("div");
  element.innerHTML = string;
  return element.children[0];
}

X.copyElement = function(selector) {
  return X.first(selector).cloneNode(true);
}

X.loadDocument = function(selector, path) {
  X.fill(X.first(selector), X.createElement(FileHelper.readFile(path)));
}

// === Events ==================================================================

X.onClick = function(selector, callback) {
  window.addEventListener('click', event => {
    if (event.target.matches(".disabled") === false && event.target.closest(selector)) {
      callback(event);
    }
  });
}

X.onCodeDown = function(code, when, callback) {
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

X.onResize = function(when, callback) {
  window.addEventListener('resize', (event) => {
    if (when === true || when(event)) { callback(event); }
  });
}

// === Classes =================================================================

// These class manipulation function can all take either an element or a query
// selector. With hasClass() the function really only makes sense for a single
// element so it only considers the first element with the selector, intended
// for use with element IDs.

X.hasClass = function(arg, classname) {
  const element = typeof arg == "string" ? X.first(arg) : arg;
  return element ? element.classList.contains(classname) : false;
}

X.addClass = function(arg, classname) {
  if (typeof arg == "string") {
    return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.add(classname));
  }
  arg.classList.add(classname);
}

X.removeClass = function(arg, classname) {
  if (typeof arg == "string") {
    return Array.from(document.querySelectorAll(arg)).forEach((element) => element.classList.remove(classname));
  }
  arg.classList.remove(classname);
}

X.removeClassWithin = function(element, classname) {
  element.querySelectorAll(`.${classname}`)[0].classList.remove(classname);
}

X.getPosition = function(element) {
  return element.getBoundingClientRect();
}

X.windowDimensions = function() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

X.assetURL = function(path) {
  return `url('${ROOT}/assets/${path}')`;
}
