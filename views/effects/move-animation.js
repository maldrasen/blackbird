global.MoveAnimation = (function() {

  // Animates an absolutely positioned element to a new location. The target coordinates are committed to the
  // element's style before the animation starts, so cancelling the returned Animation snaps the element to its
  // destination with no race against the finish event. Cancelling skips onComplete.
  //
  // Options: { element, left, top, duration, easing, onComplete }
  function move(options) {
    const element = options.element;
    const from = { left: element.style.left, top: element.style.top };
    const to = { left: `${options.left}px`, top: `${options.top}px` };

    element.style.left = to.left;
    element.style.top = to.top;

    const animation = element.animate([from, to], {
      duration: options.duration,
      easing: options.easing || 'ease-in-out',
    });

    animation.onfinish = () => {
      if (options.onComplete) { options.onComplete(); }
    };

    return animation;
  }

  return Object.freeze({
    move,
  });

})();
