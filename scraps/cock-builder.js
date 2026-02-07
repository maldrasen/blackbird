
    // The Caprien's have huge dangling goat balls. If a ballsSizeFactor
    // wasn't set, generate one between 1.2 and 1.8.
    if (character.species.code == 'caprien' && options.ballsSizeFactor == null) {
      params.ballsSizeFactor = 1.2 + (Random.upTo(60)/100);
    }
