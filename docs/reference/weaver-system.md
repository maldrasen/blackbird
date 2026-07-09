Blackbird generates a lot of text. It could be said that generating text is what this program primarily does. As such, building and evaluating text templates is fairly central to this applications workings. Almost every action will build a template string that gets displayed when the action is complete. These template strings are written in an internal format. The Weaver takes these templates, sequentially replacing each token by passing the token to the matching looms. 

#### Weave Once
`weave()` must only ever be given a **raw template**, never text that has already been woven. Weaving injects HTML (e.g. `<span style="...">` for colored weapon and actor names), and a second pass would treat those attribute quotes as authored dialogue and mangle the markup. To enforce this, `weave()` prefixes its result with an invisible zero-width marker character (U+2060 WORD JOINER) and throws if it is handed a source that already contains that marker. A zero-width prefix is used rather than a wrapper element because some templates emit block-level HTML (`<p>`, `<div>`, result blocks) that a wrapping `<span>` would nest illegally. So don't pre-weave text before passing it to something that weaves for you — `BattleRound.addMessage(message, weaver)` weaves `message.text` itself, so callers pass raw templates (see `data/abilities/basic-attack.js`).

#### Weaver Context
A weaver is created with the context to use for token replacement. This is most often used to specify the actors within the context. The actor tokens use a letter prefix to indicate which actor is being referenced, and by convention the player character should be actor `P`. Likewise the training partner will be the `T` actor.

---
# Context Tokens

#### Actor Tokens
- `{A:he}`,`{A:him}`,`{A:his}`,`{A:hers}`, `{A:men}`, `{A:man}` Replaced with pronouns from the actor's gender.
- `{A:name}` The name from the ActorComponent
- `{A:name's}` The possessive version of the actor's name.
- `{A:fullName}` First and last name.
-  `{A:niceName}`,`{A:meanName}` A nice pet name or an insulting name. This function uses the actor that is saying the name, as the name used will depend on the personality archetype of the person using it.
- `{A:species.elf}`, `{A:species.elven}`, `{A:species.elves}`, `{A:anElf}` The name or plural name of the actor's species. The species name is usually capitalized (because we use it in the ui fairly often) but in the text blocks the species should be lower case.

#### Body Tokens
- `{T:body.eyeColor}` Eye Color
- `{T:body.furColor}` Fur Color
- `{T:body.hairColor}` Hair Color

#### Cock Tokens
- `{A:cock.thickSixInchLongCock}` A long phrase that explicitly includes the length.
- `{A:cock.sixInch}` A short phrase with just the length.
- `{A:cock.bigCock}` A phrase like "huge cock" or "big dick"
- `{A:cock.big}` Just an adjective that can be used to describe the cock.
- `{A:cock.thickCock}` A phrase that doesn't rely on size.
- `{A:cock.thick}` An adjective that doesn't rely on size.

#### Pussy Tokens
- `{A:pussy.tightWetPussy}` A phrase like "tight dripping cunt" or "snug wet pussy"
- `{A:pussy.tightPussy}` A phrase like "tight pussy" or "loose cunt"
- `{A:pussy.wetPussy}` A phrase like "wet pussy" or "dripping cunt"
- `{A:pussy.tight}` Just an adjective describing how tight the pussy is.
- `{A:pussy.wet}` Just an adjective describing how wet the pussy is. This depends on the character's current arousal.
- `{A:pussy.pussy}` A single word for "pussy" that takes the pussy shape into consideration.

#### Breast Tokens
- `{A:breasts.bigSoftBreasts}`A phrase like "big firm tits" or "large soft breasts"
- `{A:breasts.bigBreasts}`A phrase like "big tits" or "large breasts"
- `{A:breasts.softBreasts}`A phrase like "soft tits" or "firm breasts"
- `{A:breasts.bigRoundBreasts}`A phrase describing breast size and shape.
- `{A:breasts.big}` An adjective that can be used to describe the breast size.
- `{A:breasts.soft}`An adjective that can be used to describe the breast firmness
- `{A:breasts.round}` An adjective that can be used to describe the breast shape
- `{A:breasts.breast}` A single word for "breast" (note singular) that takes size and shape into consideration.  
- `{A:breasts.breasts}` A single word for "breasts" (note plural) that takes size and shape into consideration.
- `{A:breasts.bigSoft}`A longer adjective phrase without a word for breasts.
- `{A:breasts.bigRound}`A longer adjective phrase describing the shape without a word for breasts.
- `{A:breasts:thickNipples}` A phrase like 'long nipples' or 'dark teats'
- `{A:breasts:thickInchLongNipples}`
- `{A:breasts:inchLongNipples}`

#### Equipment Tokens
- `{A:equipped.<slot>}` short name of the item in the equipped \<slot>

## Function Tokens
Some function tokens are used to perform some kind of action on the context, changing the state in a minor way. This could be used to change positions or equipment or other simple things that don't have too large of an effect. These function may return an empty string as they change the state rather than producing text.

- `unequip(A,<slot>)` If the action text specifies that a character removes a piece of clothing we can have them unequip that slot.
- `setPosition(<position>)` If the propose training dialog specifies that scene should start in a position, we can update the position in the training state. (It might be possible for this function to change the position from a sex action as well, though we would need to be very careful with persisted actions, perhaps only selecting that kind of text when there are no persisted actions)

Other functions are just complicated enough that they special handling. Weapon name needs to determine if the name is a proper or a common name and give it the specified prefix.
- `aWeaponName(A)` - "an axe", "a dagger", "Stabitha"
- `hisWeaponName(A)` - "his sword", "Sexcalibur"
- `theWeaponName(A)` - "the goosewing", "Goosewang"

## Utility Tokens
None yet, but these will be used for general things like the time of day, or the location name. 

## Simple Tokens
- `{cock}`, `{pussy}`, `{breasts}`, `{breast}`
- `{Cock}`, `{Pussy}`, `{Breasts}`, `{Breast}`
