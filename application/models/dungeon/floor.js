global.Floor = (function() {

  let $level;
  let $theme;

  function build(data) {
    $level = data.level;
    $theme = data.theme;

    Validate.atLeast('level', $level, 1);
    Validate.exists('theme', $theme);

    return Object.freeze({
      getLevel,
      getTheme,
    })
  }

  function getLevel() { return $level; }
  function getTheme() { return $theme; }

  return Object.freeze({
    build,
  });

})();
