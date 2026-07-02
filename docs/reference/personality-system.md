# Personality Archetypes
Each character has a single personality defining character archetype. These architypes should be used when generating dialog.

- `bastard` - Cruel, mocking, entitled males. Loves putting others down. Essentially bitches, but the male version. They rarely ask and mostly tell.
- `bimbo` - Loves sex and is kind of stupid. Airheaded, cock-obsessed, and giggles at everything lewd. Their voices are breathy, they use simple vocabulary, and trail off mid thought. They're genuinely delighted, not performing
- `bitch` - Sharp-tongued, mean-spirited women. Cutting insults are default.
- `brat` - Playful, disobedient, and insulting. The teasing is meant to provoke punishment, so they are almost always humiliation sluts or masochists. 
- `flowerChild` - Peaceful, nature loving, free love enjoying, stoners and hippies. Very open sexually. Loose, unhurried, and casually affectionate.
- `innocent` - Timid and inexperienced, with no strong sexual preferences. Blushes easily. Their voices are halting and apologetic, with lots of hedging. Easily flustered into silence.
- `nice` - Gentle, considerate, and kind men. Warm and soft spoken.
- `pervert` - Up for anything, lewd, sometimes gross.  Will ask for more unusual acts. They're eager and a little too specific.
- `playful` - Playful, fun loving. Bouncy, giggly, treats sex like a fun game.
- `prude` - Uninterested in sex, curt, cold, unfeeling, frigid, angry. Minimal engagement during sex and might narrate disapproval even while complying.
- `maniac` - Powerful (usually magical) prideful, haughty, slightly unhinged. Dangerous magic user who believes in their own superiority.
- `reserved` - No strong personality in any direction, they are unemotional and stoic. Naturally submissive due to not having a strong ego. They have a flat affect, and use few words. They don't editorialize on how they feel. Their text should describe, not quote much.
- `savage` - Wild, natural, feral, and animalistic. A violent version of the flower child. More physical description than dialog.
- `serious` - Disciplined, no-nonsense, violent when they need to be, takes situations seriously.
- `slut` - Insatiable, indiscriminate, always horny and available for anything with anyone.
- `sweet` - Soft, affectionate, kind women. Loves being cherished. Will often be affection-sluts.
- `timid` - Nervous, jumpy, easily scared but can get excitable once they're past the initial fear.

### Personality Flavors
The archetypes are primarily used to choose a dialog tree for the events and training text. The archetypes can be adjusted by adding "flavors" as a way to mix in additional personality details. The tormented flavor for instance can be added to any archetype to create a masochist version of this character.
- `submissive` - Views the player as their master. They defer to the player, even when the base archetype wouldn't normally defer to anyone.
- `tormented` - Submissive, and also craves pain, humiliation, and abuse. Their reactions to rough treatment should read as wanted, not just endured

### Species Specific Dialog
The vermen and kobolds are a unique enough that they should have their own dialog trees, though we should find a way to combine them so that we avoid having four different archetypes.
- `demiDom` - Dominant kobolds and vermen.
- `demiSub` - Submissive kobolds and vermen.

### Sex Styles
In order to cut the massive amount of dialog I'm going to have to write, the personality archetypes each have a sexStyle, and there are far fewer styles than there are archetypes. There are only so many ways to suck a cock after all.
- `bashful`
- `frisky`
- `gentle`
- `rough` 
- `shameless`
- `submissive`

## Attitudes
Attitude is still a super work in progress. The idea here is that while personality is assigned at character creation and is difficult to change, a character's attitude will very depending on the situation they find themselves in and their current attributes like health and stamina.

```
global.Attitude = {  
  afraid: 'afraid',  
  angry: 'angry',  
  horny: 'horny',  
  resigned: 'resigned',  
};
```
