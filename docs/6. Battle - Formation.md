The game's battleground uses a simplified grid of sorts. Kind of an extended version of Wizardry's simple front rank / bank rank system where horizontal positioning matters as well, though not as involved as something like Disgaea where characters are on a grid. This is still a work in progress, but coming together I think.

I'm limiting both characters and monsters to two ranks, a front and a back. A combat then can't have more than 10 characters. Rather than having multiple groups of weak monsters, each monster you encounter in the dungeon is potentially as strong as a character.

```
[1.1][1.2][1.3][1.4][1.5]
[0.1][0.2][0.3][0.4][0.5]

[0.1][0.2][0.3][0.4][0.5]
[1.1][1.2][1.3][1.4][1.5]
```

### Positioning Rules
There are a couple rules to this system. First, a character can only be in the back rank if there's a character in the first rank in front of them. If the character in the first rank dies they can make a horizontal move to be behind someone else, but if there's no room they'll move forward into the front rank. A standard formation will have the healers and casters in the front rank, so part of the strategy will be to force them to move forward.

The other rule is that the center column shouldn't be empty. As monsters (or party members) die, it might leave a column empty. When this happens the other columns shift towards the center.

These rules will funnel the monsters to position `[0.3]`, which is the position in range of most characters that would attack it.

### Attack Range
In Wizardry a close range attack could hit any monster in the front rank. Since the battles are fought on a grid, it doesn't make a lot of sense for the player a position `[0.1]` to hit a monster in `[0.5]`. Close range weapons should have a horizontal reach of 2 positions, so that a character in position `[0.1]` can hit positions `[0.1]`, `[0.2]`, and `[0.3]`. The central player in position `[0.3]` can hit any position in the first row. And positions `[0.2]` and `[1.4]` can hit all but the opposite corner.

Some weapons will have reduced or extended ranges. Daggers or martial arts only have a reach of 1 position, so `[0.1]` could hit position `[0.1]`, or `[0.2]`

Conversely extended ranged weapons have a reach of 3 in the front rank and 1 in the back rank. So a front line spear wielder in rank `[0.1]` can hit positions `[0.1]`, `[0.2]`, `[0.3]`, `[0.4]`, `[1.1]`, and `[1.2]`

Spells and abilities will have a similar reach mechanic. Some of the more powerful healing spells might require the character to be adjacent to the character being healed, though a diagonal is still adjacent for this. Some spells can hit any character in any rank. Something like a fireball might not hit a group of monsters like they did in wizardry, but instead hit a circle of tiles in the formation, centered on the targeted monster. (Could even hit the party)
