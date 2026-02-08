# Character Factory Triggers
These triggers are used by the `CharacterFactory` to randomly add make adjustments to the body, sexual preferences and 
other components. They are either passed into the factory to make a character that matches the trigger, added by the 
randomly selected name, or randomly added by the body factory.

### Attribute triggers 
Adds or removes 2d10 from associated stat
- `strong` / `weak`
- `skillful` / `clumsy`
- `healthy` / `sickly`
- `smart` / `stupid`
- `ugly` / `beautiful`

### Personality Triggers
- `calm`
- `kind`

### Body Triggers:
- `tall` / `short` (by factor for species)
- `red-hair` (or fur/scales)
- `white-hair` (or fur/scales)
- `pink-hair` (or fur/scales)
- `purple-hair` (or fur/scales)
- `dark-skin` (or fur/scales)
- `light-skin` (or fur/scales)
- `big-cock` (1 size up to at least big size)
- `big-balls` (1 size up to at least big size)
- `dog-cock` (if would be normal)
- `dog-pussy` (if would be normal)
- `horse-cock` (if would be normal)
- `horse-pussy` (if would be normal)
- `horse-anus` (if would be normal)
- `two-cocks` (if would be single)
- `three-cocks` (if would be single)
- `huge-cock` (2 sizes up to at least huge size)
- `huge-balls` (2 sizes up to at least huge size)
- `flat-chest` (set size to 0)
- `small-tits` (1 size down to at most small)
- `big-tits` (1 size up to at least big size)
- `huge-tits` (2 sizes up to at least huge size)
- `cow-tits` (teat nipples)
- `milky` (add lactation)
- `forked-tongue` (tongue shape)

### Preference Trigger:
Adds a sexual preference. We use a regex to find the code and value. Value should be between -100 and 100 
- `(preferenceCode)[value]`

### Aspect Triggers:
- `(aspectCode):(1-5 optional)`

### Other Triggers:
- `magical` Adds a mana component and starting spells
- `virgin` Ensure virginity, lack of sexual experience
- `slut` Has had a lot of sexual experience / multiple partners / extra fetish or two
