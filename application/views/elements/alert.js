global.Alert = (function() {

  function show(options) {
    let parent;

    if (options.position == null) { options.position = AlertPosition.side; }
    if (options.position === AlertPosition.center) { parent = X.first('#centerAlerts'); }
    if (options.position === AlertPosition.event) { parent = X.first('#eventAlerts'); }
    if (options.position === AlertPosition.side) { parent = X.first('#sideAlerts'); }

    const element = X.createElement(`<li class='alert ${options.position} ${options.type || ''}'></li>`);

    if (options.title) {
      element.appendChild(X.createElement(`<div class='title'>${options.title}</div>`));
    }

    element.appendChild(X.createElement(`<div class='message'>${options.message}</div>`));
    element.addEventListener('click', () => { dismissAll(parent); });

    parent.appendChild(element);

    if (options.fadeTime) {
      setTimeout(() => { dismiss(element); }, options.fadeTime);
    }
  }

  function showFromLog(logData) {
    const system = logData.system ? `[${logData.system}]` : '';
    const title = (system.length > 0) ? system : logData.message;
    const message = (system.length > 0) ? logData.message : '';

    show({
      title: title,
      message: message,
      position: AlertPosition.side,
      type: logData.type || LogType.info,
    });
  }

  // If there are a lof of alerts for some reason, dismissing them one at a
  // time by clicking on them doesn't feel good. They move around, they block
  // other alerts from being clicked. It would look better to just dismiss all
  // of them.
  function dismissAll(parentElement) {
    const alerts = parentElement.querySelectorAll('.alert');

    alerts.forEach(alert => {
      if (alert.dataset.dismissed == null) {
        const position = X.getPosition(alert);
        alert.style.left = `${position.x}px`;
        alert.style.top = `${position.y}px`;
        alert.dataset.dismissed = true;
      }
    });

    // This needs to be done after all the positions are set in the styles
    // because setting the position to fixed on a single alert will remove it
    // from the flex layout which changes the position on every other element.
    alerts.forEach((alert,i) => {
      alert.style.position = `fixed`;

      setTimeout(() =>{
        X.addClass(alert,'fade');
      }, 100*i)

      setTimeout(() => {
        alert.remove();
      }, (100*i) + 1000);
    });
  }

  // Remove the alert with a short fade effect. This should only happen once
  // per alert, either when clicked or the fade time is reached.
  function dismiss(alert) {
    if (alert.dataset.dismissed) { return; }

    const position = X.getPosition(alert);

    alert.style.position = `fixed`;
    alert.style.left = `${position.x}px`;
    alert.style.top = `${position.y}px`;
    alert.dataset.dismissed = true;

    X.addClass(alert,'fade');
    setTimeout(() => {
      alert.remove();
    }, 1000);
  }

  return Object.freeze({
    show,
    showFromLog,
  });

})();

