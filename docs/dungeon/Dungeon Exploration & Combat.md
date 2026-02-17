The entire second pillar of the same is exploration and combat. Even though I'm not planning on implementing much of the combat system yet, I need to consider a few things about it, as some of the other things I'm working on tie into it. Combat and dungeon exploration stuff is also good to work on in public, for obvious reasons, so I might be starting some of this anyway.

### Action Delay and Combat Turns
The wizardry system, where you give people orders at the start of the round, is actually kind of shitty I think. It makes targeting a specific monster or group really weird. It would be much better to have a delay based system. At the start of combat we set an initiative order, based on the character's speed, plus a random value. Speed probably comes from a lot of different factors, like dexterity and even height. (Taller characters are slower) Could even take things like breast size into consideration, as having a pair of huge swinging milkers will slow a person down significantly. 
#### For Example
The initiative order sets all of the character's turn delay value. (Numbers could really be in the 10,000 range to allow for more granular speed adjustments)
`C1[40] C2[85] C3[100] C4[85]`
Once we have all the numbers set we find the lowest and subtract it from all the delay values. 
`C1[0] C2[45] C3[60] C3[45]`
This determines the next character to act. They pick an action. The action determines the delay value before they can act again.
`C1[200] C2[45] C3[60] C3[45]`
We determine the next person to act. If there's a tie the person with the highest dex goes first. If there's still a tie, pick a character at random to act.
`C1[155] C2[0] C3[15] C3[0]`
C3 acted and got a new delay.
`C1[155] C2[0] C3[15] C3[200]`
We check the list, we see that the lowest value is a 0 so they need to act still. 
```C1[155] C2[200] C3[15] C3[200]```
And we're back to picking the lowest.

I think a lot of RPGs and tactics games use a very similar system. It's intuitive, allows for fast characters to have more overall turns, though usually something like 20% more often. Physical attacks should naturally have short delay values. Casting a spell could be a two step process, as in the trails games, where your action is to start casting a spell. That spell's casting time is your delay value. When your next turn happens the spell actually goes off, then you get a normal delay until your next turn. Monsters would have the same mechanics, giving you a chance to interrupt their spell casting. 


### Dungeon Exploration
The game is kind of a rogue like. There's random map generation in the dungeon, random item, equipment, and spell generation. Random character generation. I don't think I'm going to have a meta progression layer where a player is expected to do multiple runs to unlock everything. Multiple runs will be made interesting by the different characters you train, and choices you make while building your manner. 

Dungeon exploration though will be extremely rogue like. You start at the surface level and explore a randomly generated dungeon. You'll need to find stairs on each floor to progress downward. Then, on the way back up, you'll need to find stairs to escape. This adds an interesting logistics element to the game where you need to decide how deep you can delve. You can get into a dangerous situation and might not be able to make it back out of the dungeon. 

Maybe this is more rogue like than I thought then. Perhaps I limit the game to one save file. I would autosave at certain points, when we change floors in a dungeon, after training, after combat, etc. Actually all the save game stuff should be configuration options. You should be allowed to specify if your game autosaves. Or if you only are allowed a single save file. If you're not saving you can manually save, but only in certain places, in certain game modes. So the dungeon needs to sometimes have safe rooms where you can rest, regenerate mana, save the game, have some sex, etc.
##### Grid Map
So I think I'll be making a hybrid kind of rogue like map. In a normal roguelike a tile represents a space where a character can walk. Monsters are in different tiles, they walk around etc. In my version we only travel from room to room. Rooms are arranged in a grid. They can only have right angled walls (at least in the dungeon) Rooms are connected by doors. Sometimes doors are closed, sometimes they can be seen through. Rooms can be different shapes, mostly rectangles, but L shapes are also possible. (Which are just two rectangles on top of each other)

```
[][][]    [][][][][]  [][][][][][][][][][]XXXXXXXXXXXXXX[][]
[][][]XXXX[][][][][]  [][][][][][][][][][]  [][][][]    [][]
[][][]    [][][][][]                XX      [][][][]    [][]
                [][]XX[][][][][]    XX      [][][][]    [][]
                [][]  [][][][][]YYYYYYYYYYYYYY
```

You click on rooms to navigate between them. You can only move to a room that's connected to the current room by a door. The overall vibe is that this is more of a Zork-like dungeon. Rooms with exits. A character's position in the room doesn't really matter. The entire adventuring party is in the room. Rooms though should be interesting. They should have descriptions, furniture, random interesting stuff happening in each one of them. You'll encounter a lot of different monsters as you travel through the rooms. You can negotiate with them, or fight them. Sometimes they'll be friendly and want to trade, or they'll try to trick you, or seduce you. Maybe half of the rooms that you walk into should have some kind of event. Different floors will have different themes. Some themes are rarer than others. Near the top you'll see a lot of sewers or crypts. As you travel lower you'll find jails, torture chambers, then ancient temples, overgrown forbidden groves, a cow level. This needs to be interesting so it's not just endless empty rooms. We don't have any graphics to show how cool the rooms are, so we depend on making the text descriptions interesting.

Anyway, back to the rooms and layout. When we enter a new dungeon floor we randomly select a floor theme. This determines what kind of rooms we'll find. We randomly pick boxes, filling in the grid as much as we can with the large rooms. We then add smaller corridor rooms to make sure that everything can be connected.  Once everything can be connected we add doors until every room can be accessed. I've written something like this before, in Rust. I should still have all that code. It just needs to be redone in JavaScript.

The end result of all this will just be squares, l-shaped rooms, and doors. Rather than using any kind of graphics library, we can just use absolute positioned divs for the rooms and doors. They handle mouse events easily. I can add some graphics like floor textures and walls. The dungeon grid would be a large div, but it could be inside of a scrolling frame. Could even be zoomed and panned. 
