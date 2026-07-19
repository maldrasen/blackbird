### Experience Component
Validate that the character has enough essence for their current level. Any character that has an experience component will also have a species.

### Monsters need essence in the experience component
If they're added as a party member they'll need both levels and essence. Essence value should be the lowest they need for the level they are. If monsters have an experience component the level up system can validate that the character has enough essence to go up a level.


### Monster health should factor into their essence


### Use level system when setting initial attributes
Look into adjusting this attribute bonus. Right now it's a simple 1-5 depending on the species. At character creation a vermin may have a beauty between 1-10 and gain 2-6 when raising beauty. An equin could have a strength between 5 and 50, but only get 6-10 when leveling up. The level up ranges should be comparable to the character creation ranges. Probably better to change how character creation works though. Perhaps characters start with 1 level of each attribute, and maybe an extra roll for their max attribute, essentially starting them at level 5 or 6. Sounds more correct than what we're doing now.

### Game Over
We can go ahead and add the game over episode now. Doesn't need to be complicated, a simple "You Died" is fine for now. The episode is started when the player dies. It shows a single page and a confirm button that kicks you back to the main menu. The confirm button should go through the same path as a quit game button, completely resetting the game state. 
