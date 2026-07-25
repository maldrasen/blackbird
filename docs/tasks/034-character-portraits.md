---
id: 034
title: Character Portraits
priority: 4
created: 2026-07-03
points: 8
tags: [character]
---
---
Characters need to have portraits, but I don't think I'm going to actually be including any character graphics into the app, at least not at first. Hiring an artist to do the hundreds of character portraits I'd want to include is currently beyond the scope of the project as it is currently. Generating AI slop portraits is another option, but I think point I think people would actually prefer blank spaces to AI generated art. 

Instead, I think we can have users place image files into a portraits folder their user data directory. I still worry about relying on any Electron specific function, but I think any application framework will have to have some access to the filesystem. If we need to move to a complete web version we would just need to disable the user portrait library.

We're going to need another persistent state file for portrait library management. The library is application level, not game level. When the app starts we need to scan this image library and create an entry for each image. We should get a hash of the image file data to keep track of which image is which, as the filenames could change from under us. Might take a while to load a large library doing this, but we can try it. 

We also need to add a portrait library manager UI. Probably accessed from the main menu. We should be able to set a crop and zoom level on each image, defining the portrait background properties so that an image is displayed with the correct aspect ratio. That saves the player from having to crop and zoom each image in an image editor. We can also add the ability to rename, and tag portrait file. A file can be tagged with a species and gender in order to make it easier to find a character portrait to use. Renaming a file will just set a name in our data, but we'll show the filename if the name is null.

Once we have this library we can set a character's portrait in the character status overlay. If we're in a game we can also show an icon next to the portrait's name if that portrait is currently being used by any other character. We should allow setting a portrait on both roster characters and NPCs. NPC characters may have actual art someday, but we can still allow that art to be overwritten if the player prefers their own art.