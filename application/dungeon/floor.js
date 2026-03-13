global.Floor = data => {

  const $level = data.level;
  const $theme = data.theme;

  Validate.atLeast('level', $level, 1);
  Validate.exists('theme', $theme);

  return Object.freeze({
    getLevel: () => { return $level; },
    getTheme: () => { return $theme; },
  });
}
