global.Casement = (function() {
  const BAR_HEIGHT = 20;
  const BORDER_WIDTH = 3;

  const $$currentCasements = {};
  let $$casementCounter = 100;
  let $$dragContext;

  function init() {
    X.onClick('.casement-window .close-button',event => {
      findCasement(event).close();
    });
  }

  function findCasement(event) {
    return $$currentCasements[event.target.closest('.casement-window').getAttribute('id')]
  }

  function getAssociatedCasements(association) {
    return Object.values($$currentCasements).filter(casement => {
      return casement.getAssociatedWith() === association;
    });
  }

  function fromPath(path,options={}) {
    fromString(FileHelper.readFile(path),options);
  }

  // Available Options:
  //    scrollingPanel   (true by default)
  //    resizable        (true by default)
  //
  function fromString(html,options={}) {
    const index = $$casementCounter++;
    const id = `casement-${index}`;

    const enableScrollingPanel = options.scrollingPanel !== false;
    const enableResize = options.resizable !== false;

    const casementWindow = X.createElement(`
      <div id='${id}' class='casement-window' style='z-index:${4000+index}'>
        <div class='casement-bar'>
          <h1 class='title'>[TITLE]</h1>
          <a href='#' class='close-button'></a>
        </div>
        <div class='casement-container'>
          <div class='casement-content'>${html}</div>
        </div>
      </div>
    `);

    const casementContent = casementWindow.querySelector('.casement-content');
    const casementContainer = casementWindow.querySelector('.casement-container');
    let scrollingPanel = null;

    casementWindow.querySelector('.close-button').style['background-image'] = X.assetURL('ui/x-icon.png');

    if (enableResize) {
      casementWindow.appendChild(X.createElement(`<div class='resize-handle'></div>`));
    }

    if (enableScrollingPanel) {
      scrollingPanel = ScrollingPanel({ element:casementContent });
    } else {
      casementContainer.style.overflow = 'hidden';
    }

    X.first('#casementsArea').appendChild(casementWindow);

    const casement = buildCasement({ id, casementContent, casementWindow, scrollingPanel });
    $$currentCasements[id] = casement;
    WindowManager.push(casement);

    return casement;
  }

  function buildCasement(options) {
    const $id = options.id;
    const $casementContent = options.casementContent;
    const $casementWindow = options.casementWindow;
    const $scrollingPanel = options.scrollingPanel;

    let $associatedWith;
    let $bounds = {};

    let $minHeight = 200;
    let $minWidth = 300;

    function getID() { return $id }
    function getCasementContent() { return $casementContent; }
    function getCasementWindow() { return $casementWindow; }

    function wireEvents() {
      const casementBar = $casementWindow.querySelector('.casement-bar');
      const resizeHandle = $casementWindow.querySelector('.resize-handle');

      casementBar.addEventListener('mousedown', event => startMoveDrag(event));

      if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', event => startResizeDrag(event));
      }
    }

    function setAssociatedWith(association) { $associatedWith = association; }
    function getAssociatedWith() { return $associatedWith; }
    function setZIndex(index) { getCasementWindow().style['z-index'] = index; }
    function getZIndex() { return getCasementWindow().style['z-index'] }

    function setTitle(title) {
      $casementWindow.querySelector('h1.title').innerHTML = title;
    }

    function setBackground(color) {
      $casementWindow.querySelector('.casement-container').style['background-color'] = color;
    }

    // We can only set the minimum height and width to values greater than the
    // scrolling panel's minimum height and width.
    function setMinimumHeight(height) { if (height >= 200) { $minHeight = height } }
    function setMinimumWidth(width) { if (width >= 300) { $minWidth = width; } }

    function getBounds() { return $bounds; }
    function setBounds(bounds) {
      Validate.exists("top", bounds.top);
      Validate.exists("left", bounds.left);
      Validate.exists("height", bounds.height);
      Validate.exists("width", bounds.width);

      $bounds = bounds;
      reposition();
    }

    function setLocation(point) {
      $bounds.left = point.x;
      $bounds.top = point.y;
      reposition();
    }

    function setSize(size) {
      $bounds.height = size.height;
      $bounds.width = size.width;
      reposition();
    }

    function reposition() {
      if (Object.keys($bounds).length !== 4) {
        throw `Casement bounds have not been set.`
      }

      if ($bounds.height < $minHeight) { $bounds.height = $minHeight; }
      if ($bounds.width < $minWidth) { $bounds.width = $minWidth; }
      if ($bounds.height > window.innerHeight - 100) { $bounds.height = window.innerHeight - 100; }
      if ($bounds.width > window.innerWidth - 100) { $bounds.width = window.innerWidth - 100; }

      if ($bounds.top < 0) { $bounds.top = 0; }
      if ($bounds.left < 0) { $bounds.left = 0; }
      if ($bounds.left + $bounds.width + (BORDER_WIDTH*2) > window.innerWidth) {
        $bounds.left = window.innerWidth - $bounds.width - (BORDER_WIDTH*2); }
      if ($bounds.top + $bounds.height + (BORDER_WIDTH*2) > window.innerHeight) {
        $bounds.top = window.innerHeight - $bounds.height - (BORDER_WIDTH*2);
      }

      $casementWindow.style['top'] = `${$bounds.top}px`;
      $casementWindow.style['left'] = `${$bounds.left}px`;
      $casementWindow.style['height'] = `${$bounds.height}px`;
      $casementWindow.style['width'] = `${$bounds.width}px`;

      if ($scrollingPanel) {
        $scrollingPanel.setHeight($bounds.height - BAR_HEIGHT);
        $scrollingPanel.resize();
      }
    }

    // The scrolling panel needs to be resized if the size of the content
    // changes.
    function contentResized() {
      if ($scrollingPanel) { $scrollingPanel.resize(); }
    }

    function close() {
      $casementWindow.remove();
      delete $$currentCasements[$id];
      if (Object.keys($$currentCasements).length === 0) {
        $$casementCounter = 100;
      }
      WindowManager.remove($self);
    }

    wireEvents();

    const $self = Object.freeze({
      getID,
      getCasementContent,
      getCasementWindow,
      setAssociatedWith,
      getAssociatedWith,
      setZIndex,
      getZIndex,
      setTitle,
      setBackground,
      setMinimumHeight,
      setMinimumWidth,
      setBounds,
      getBounds,
      setLocation,
      setSize,
      contentResized,
      close,
    });

    return $self;
  }

  function startMoveDrag(event) {
    const casement = findCasement(event);
    const bounds = casement.getBounds();

    $$dragContext = {
      moving: true,
      casement: casement,
      origin: {
        x: (bounds.left - event.clientX),
        y: (bounds.top - event.clientY)
      }
    };

    reorderWindows(casement);

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', moveWindow);
  }

  function startResizeDrag(event) {
    const casement = findCasement(event);
    const bounds = casement.getBounds();

    $$dragContext = {
      resizing: true,
      casement: casement,
      origin: { x:event.clientX, y:event.clientY },
      size: { height:bounds.height, width:bounds.width },
    };

    reorderWindows(casement);

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', resizeWindow);
  }

  function moveWindow(event) {
    $$dragContext.casement.setLocation({
      x: event.clientX + $$dragContext.origin.x,
      y: event.clientY + $$dragContext.origin.y,
    });
  }

  function resizeWindow(event) {
    if (event.clientX + BORDER_WIDTH < window.innerWidth && event.clientY + BORDER_WIDTH < window.innerHeight) {
      const width = (event.clientX - $$dragContext.origin.x) + $$dragContext.size.width;
      const height = (event.clientY - $$dragContext.origin.y) + $$dragContext.size.height;
      $$dragContext.casement.setSize({ height,width });
    }
  }

  function stopDrag() {
    if ($$dragContext) {
      document.removeEventListener('mouseup', stopDrag);
      if ($$dragContext.moving) { document.removeEventListener('mousemove', moveWindow); }
      if ($$dragContext.resizing) { document.removeEventListener('mousemove', resizeWindow); }
      $$dragContext = null;
    }
  }

  // First get all the casements except for the top casement, sort them by
  // their current z-index, reassign a new z-index in order, then finally
  // assign the topCasement the highest z-index.
  function reorderWindows(topCasement) {
    $$casementCounter = 100;

    Object.keys($$currentCasements).filter(key => {
      return key !== topCasement.getID();
    }).toSorted((a,b) => {
      return $$currentCasements[a].getZIndex() - $$currentCasements[b].getZIndex();
    }).forEach(id => {
      $$currentCasements[id].setZIndex(4000 + $$casementCounter++);
    });

    topCasement.setZIndex(4000 + $$casementCounter++);
  }

  return Object.freeze({
    init,
    fromPath,
    fromString,
    getAssociatedCasements,
  });

})();
