```
[*] application/dungeon/dungeon-floor.js
[*] application/dungeon/dungeon-system.js
[*] application/dungeon/factories/floor-factory.js
[*] application/dungeon/models/feature.js
[] application/dungeon/systems/dungeon-navigation-system.js
[] application/world/game-system.js

[] application/views/dungeon/dungeon-floor-view.js
[] application/views/dungeon/dungeon-view.js
[] application/views/dungeon/dungeon-viewport.js

[] styles/views/dungeon.scss

[] test/dungeon/dungeon-system-spec.js
[] test/dungeon/systems/
```

Bug: Battle state isn't being cleaned between battles. Something in the view still has state maybe?

TODO: Dungeon with multiple up and down stairs. Also stairs don't need to be far away. They could be right next to each other.

TODO: We don't really need this getCenterTile() function. When we add the stairs element to the room in the UI, we want to center an icon in the middle of the main box. The rooms are elements at this point, so we don't really need to align with the grid at all. In a 2x2 room we still want to place the stairs, or any other room icon, in the center of the main box. 



TODO: Create a default formation with the character in it.

