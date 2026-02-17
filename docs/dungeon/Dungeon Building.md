The DungeonController (like the TrainingController) is used to maintain all of the state for the current dungeon floor. This is not part of the ECS because this is all temporary state. The game will have no way to save a dungeon floor. Technically we might be able to save between floors, but that would only save the current floor number. The saved game state would need to persist the game mode and the floor number when save then.

### Features
When building the dungeon we create features. A feature is a collection of rooms and doors. The simplest feature is just a single room, and no doors. Features will need to have their own build function in order to build themselves parametrically. Even a single square room will need to know it's aspect ratio, height and width ranges. More complex features will need to work like a miniature version of the dungeon builder itself, where we need to keep track of the sizes and position of the rooms as they're added to the feature. 

I think the best way to take care of this is to keep a footprint grid for the feature. A simple grid where we can check to see if a space is empty or has a floor tile in it. Even though the game isn't doing tile movement, the layout is essentially tile based. Perhaps before I even work on the dungeon fixture I can build a feature fixture, where I build and display a random feature. The feature viewer should show both the final, finished version of the feature, (built out of absolute positioned divs), and a representation of the footprint grid. 

### Rooms
Navigation in the game is done on the room level. When exploring the dungeon the current location in the dungeon should be set to the room id. This value can be kept in the dungeon controller and doesn't need to be persisted. When a new floor is entered the new location is always a room with the stairs. A room is composed of one or two boxes that describe the room size and shape. We want to limit the number of boxes to just two I think. From the two boxes we can determine the footprint of that room. When we A room's origin point is always in the lower left, at 0,0. The lower left corner won't always be a floor tile though.

```
          "Two-Box" Rooms

 L-Shaped     X-Shaped    T-Shaped

 XXXXXXXX     ...XX...    XXXXXXXX
 XXXXXXXX     ...XX...    XXXXXXXX
 XXXXXXXX     XXXXXXXX    ..XXXX..
 .....XXX     XXXXXXXX    o.XXXX..
 o....XXX     ...XX...
              o..XX...
```

As rooms are added to the feature we need to figure out if they fit or not. I think we can do that by overlaying the room grid, on top of the feature grid, offsetting the location by the origin offset. We can check cell by cell if there's a collision or not.

Getting the grid size correct for randomly sized two box rooms is a bit tricky. I think we always put the first box at (0,0). We place the second box randomly, such that the new box extent could go into the negatives. We then find the bounds of both boxes and recalculate the origin at the lowest point. 
```
(X,Y) Box Origin
[H,W] Box Size
Bounds measured as {N,S,E,W} limits

1st             2nd             Adjust origin (Y+2)
(0,0)[4,2]      (3,-2)[2,2]     (0,2)[4,2]     
{1,0,3,0}       {1,-2,3,0}      (3,0)[2,2]
                                {3,0,3,0}      (Y+2 adds 2 to N,S) (S,W should always be 0,0 when done)
                                
XXXX            XXXX            XXXX
OXXX            OXXX            XXXX
                  YY              YY
                  YY            O YY
```

For each shape (L, Z, X, or T) there needs to be some kind of function that determines where to place the second box in order to get the desired shape. Every feature will need it's own build function as well of course, so best to just make the two box room a type of feature. 

When rendering a room with divs, each div will probably have a border for the wall. It should be easy to detect the tiles where the two rooms share a wall. We could either draw a div over the overlap to hide the borders, or draw the wall divs first, then draw the room interior divs. With either technique, the floor texture will need to be solid. 

### Doors
The doors should be rendered on a layer above the rooms. A door can be defined with two grid locations, indicating which two tiles the door should be drawn between. 

Doors connect two rooms. We'll need to be able to find which doors are connected to which rooms. I think the best way to do this is for the the room to have a reference to its doors, and for doors to have a reference to its rooms. When we're checking to see if all the rooms on the map are connected we'll need to build a graph from the rooms and doors. 

### Contents
Rooms can have a variety of 'contents'. A room can contain a short even that starts a fight, or a longer event where choices would need to be made, including negotiations with groups of not quite hostile monsters. Normal dungeon stuff, traps, treasure. They could run into a vender. There are shrines where spells and abilities can be learned, or mana pools can be deepened. The dungeon view will at least need to show a room description, show available exits, and general commands. When we change room we can start an event, and could start a combat directly.