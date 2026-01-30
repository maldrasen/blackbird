global.ArrayHelper = {

  find(array, finder) {
    for (let i=0; i<array.length; i++) {
      if (finder(array[i])) { return i; }
    }
  },

  remove(array, element) {
    let index = array.indexOf(element);
    (index >= 0) ? array.splice(index, 1) : array;
  },

  unique(array) {
    return [...new Set(array)];
  },

  compact(array) {
    return array.filter(i => { return i != null });
  },

  differenceInElements(first, second) {
    return {
      added: second.filter(item => !first.includes(item)),
      removed: first.filter(item => !second.includes(item)),
    }
  },

  // Return a new shuffled array.
  shuffle(orig) {
    let array = orig.slice();
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

};
