```
application/views/dungeon/dungeon-floor-view.js
styles/views/dungeon.scss
```

*TODO*: Door looks like an unnecessary model. Could be turned into a plain object.

*TODO*: Moving between rooms advances the game time.

### Big Tasks

*TODO*: The panning is a little too jerky, and not fun to watch. I think we'll eventually need to extend this by making the current room a camera target, and panning towards it, but the pan itself needs to have acceleration and velocity as it moves towards the target. Vector math stuff. Camera motion should be its own module.

*TODO*: When we build the floor we need to check the room type. If it's a nested room it needs to have extra padding. Doors need to be bumped in the direction of the room by 2px. Actually, we need to think about this task. It might be better to anticipate doing full room graphics, 8 box borders or a combination of the two.




 

