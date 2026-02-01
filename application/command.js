global.Command = function(type, data) {
  const $type = type;
  const $data = data;

  function getType() { return $type; }
  function getData() { return $data; }
  function getValue(key) { return $data[key] }

  return Object.freeze({
    getType,
    getData,
    getValue,
  });
}

Command.Type = {
  startTraining: 'startTraining',
};
