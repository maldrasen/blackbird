---
id: 046
title: Create Text Packages
priority: 2
created: 2026-07-05
tags: []
---
---
While creating the position change text, I realized that it's going to be important to be able to figure out where text
is coming from when debugging the game. Currently, the big text generation modules all have an options array that they
build before selecting an option at random. We can change the options array to a package, give the package an 
identifier and when the package picks an option it can sorround the text in a span tag with the package identifier.

Each option would probably need its own identifier as well. We can't use the selected index as the indices will change
depending on the conditions that created the package. Unless the packages aren't built at runtime anymore. Instead
of gating adding options to an array we could include a requirements closure with the item. 
 