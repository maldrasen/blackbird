### Marks
The mark mechanic is a carry over from the Era games. I think it's a good mechanic, but it's really not clear what they represent. I think a hate mark is something like a memory, it's something a character is mad about. They resent the character for it. Clearing a hate mark is really the character forgiving the player. I should keep the mechanic, but make it more clear that they represent memories. There are other types of marks as well then, perhaps a love mark that represent romantic things a player has done. Lust marks are memories of particularly good sex. 

Because they represent a memory I should save the conditions that created the mark. It might be useful in conversation to have a character say what they're angry about, or remind them of a past sex act they enjoyed. If a character got a lust mark for a mind blowing anal orgasm, they'll want more anal sex for instance. 

Both lust and hate marks will lower control; hate marks because they're resentful, and lust marks because they crave pleasure. Love marks will keep affection high, which effects control by default. 

Each successive mark will be more difficult to get. Assuming we're keeping track of an anger value, If the first hate mark took 1000 anger to get, then another hate mark should take 3000, and the third should take 9000, tripling every time. A character's personality might effect the amount of anger needed to trigger a mark, or just effect how much anger is accumulated. 

### Memory
All characters will keep a list of memories where we record everything that's happened to them. This is used in the marks to reference what happened to give them the mark, but could also be useful for statistics. We'll have to figure out the format of the memory data as we find ways to use it. This could potentially be quite large, so we want to keep the memory entries small.
```
Something like:

           Memory type code
           |
Memories:['SA1:12,34,69,...']
             . |
               Parameters
```
