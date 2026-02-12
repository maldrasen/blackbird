global.Floor = (function() {

  function build(data) {
    const $level = data.level;
    const $theme = data.theme;

    Validate.atLeast('level', $level, 1);
    Validate.exists('theme', $theme);

    function getLevel() { return $level; }
    function getTheme() { return $theme; }

    return Object.freeze({
      getLevel,
      getTheme,
    })
  }

  return Object.freeze({
    build,
  });

})();
