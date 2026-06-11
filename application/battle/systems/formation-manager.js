global.FormationManager = (function() {

  // Moves the character in the back rank to the front. The character in the front should be dead, so it's removed
  // from the formation, replaced by the character that was behind.
  function moveForwardOnDeath(columnData) {
    console.log("Column Data:",columnData);
  }

  return Object.freeze({
    moveForwardOnDeath
  });

})();