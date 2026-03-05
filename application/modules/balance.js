global.Balance = (function() {

  const active = {
    arousal: true,
  };

  function arousal(data) {
    if (active.arousal) {
      console.log("=== Balance Arousal ===")
      console.log(`  Desire: ${data.desire}`);
      console.log(`  Comparative: ${data.comparative}`);
      console.log(`  Arousal: ${data.previousArousal} → ${data.currentArousal}`);
    }
  }

  return Object.freeze({
    arousal
  });

})();
