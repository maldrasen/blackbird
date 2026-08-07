// A general purpose drag and drop manager. A consumer registers a draggable element selector along with the targets
// it can be dropped onto, then applies whatever the drop means when notified. The manager only moves the dragged
// element visually, restoring its original inline styles when the drag ends, so an element that wasn't dropped
// anywhere snaps back into place on its own.
//
// Registration options:
// - `source` - A delegated selector for the draggable elements.
// - `targets` - An array of selectors for the elements that can be dropped onto.
// - `onDrop(sourceElement, targetElement)` - Called when the drag ends. The target is null when the element wasn't
//    dropped on any target. The consumer owns what the drop means and any redraw that follows.
// - `canDrag(sourceElement)` - Optional. Return false to prevent the drag from starting.
//
// While an element is being dragged it gets the `dragging` class, which disables pointer events so the element under
// the cursor can be hit tested. The target currently under the cursor gets the `drop-target` class, which consumers
// can style for their own drop feedback.
global.DragDrop = (function() {

  let dragContext = null;

  function register(registration) {
    X.onMouseDown(registration.source, event => startDrag(registration, event));
  }

  function startDrag(registration, event) {
    if (dragContext) { return; }

    const element = event.target.closest(registration.source);
    if (registration.canDrag && registration.canDrag(element) === false) { return; }

    event.preventDefault();

    const bounds = X.getPosition(element);
    dragContext = {
      registration,
      element,
      target: null,
      offset: { x:(event.clientX - bounds.left), y:(event.clientY - bounds.top) },
      originalStyle: {
        left: element.style['left'],
        top: element.style['top'],
        width: element.style['width'],
        height: element.style['height'],
      },
    };

    element.style['width'] = `${bounds.width}px`;
    element.style['height'] = `${bounds.height}px`;
    X.addClass(element,'dragging');
    moveElement(event);

    document.addEventListener('mousemove', mouseMoved);
    document.addEventListener('mouseup', dropped);
    document.addEventListener('mouseleave', cancelDrag);
  }

  function mouseMoved(event) {
    moveElement(event);
    setTarget(findTarget(event));
  }

  function moveElement(event) {
    dragContext.element.style['left'] = `${event.clientX - dragContext.offset.x}px`;
    dragContext.element.style['top'] = `${event.clientY - dragContext.offset.y}px`;
  }

  function findTarget(event) {
    const hit = document.elementFromPoint(event.clientX, event.clientY);
    if (hit == null) { return null; }

    return dragContext.registration.targets
      .map(selector => hit.closest(selector))
      .find(target => target != null) || null;
  }

  function setTarget(target) {
    if (target === dragContext.target) { return; }

    if (dragContext.target) { X.removeClass(dragContext.target,'drop-target'); }
    if (target) { X.addClass(target,'drop-target'); }
    dragContext.target = target;
  }

  function dropped() {
    const { registration, element, target } = dragContext;
    stopDrag();
    registration.onDrop(element, target);
  }

  function cancelDrag() {
    stopDrag();
  }

  function stopDrag() {
    document.removeEventListener('mousemove', mouseMoved);
    document.removeEventListener('mouseup', dropped);
    document.removeEventListener('mouseleave', cancelDrag);

    setTarget(null);

    const element = dragContext.element;
    X.removeClass(element,'dragging');

    // An element that positions itself with inline styles needs them put back, not cleared.
    Object.entries(dragContext.originalStyle).forEach(([property, value]) => {
      if (value === '') {
        element.style.removeProperty(property);
      } else {
        element.style[property] = value;
      }
    });

    dragContext = null;
  }

  return Object.freeze({
    register,
    isDragging: () => { return dragContext != null; },
  });

})();
