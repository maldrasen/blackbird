
TODO: Dungeon with multiple up and down stairs. Also stairs don't need to be far away. They could be right next to each other.

TODO: We don't really need this getCenterTile() function. When we add the stairs element to the room in the UI, we want to center an icon in the middle of the main box. The rooms are elements at this point, so we don't really need to align with the grid at all. In a 2x2 room we still want to place the stairs, or any other room icon, in the center of the main box. 

TODO: Moving between rooms advances the game time.

TODO: The panning is a little too jerky, and not fun to watch. I think we'll eventually need to extend this by making the current room a camera target, and panning towards it, but the pan itself needs to have acceleration and velocity as it moves towards the target. Vector math stuff. Camera motion should be its own module.


