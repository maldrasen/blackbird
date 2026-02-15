# Body Part Component Properties
The anus, mouth, pussy, and cock components all have a placement and a `_parentId` property (one to many relation) because while an entity is usually only has one cock or pussy, when we have something like a character with dick nipples we need to have separate cock components for the nipples one one for the normal cock. Currently no plan for breasts to be located anywhere else but the chest. If a character has something like a separate cow udder, that should be it's own component as it doesn't have any of the same breast shape logic, and the volume and lactation calculations would all be different. 

#### Orifice Properties
All of the fuckable orifices will have a `minWidth` and a `maxWidth`, measured in mm. The `minWidth` is the resting width for an orifice. This will usually stay at 0 but if a hole becomes permanently gaped then it will remain open at that width. Penetrations smaller than the minimum will barely be noticed. The maximum width indicates how wide an orifice can stretch open before injury. The size sensation ranges lie between these two extremes:

```

                Label           Pleasure   Pain     Stretch 
  < minWidth    Unnoticible     0
    0% - 20%    Unsatisfying    0.2
    20% - 40%   Comfortable     0.6
    40% - 60%   Satisfying      1                   0.1
    60% - 80%   Challenging     0.8,       0.1,     0.2
    80% - 90%   Stretching      0.6,       0.2,     0.4
    90% - 96%   Painful         0.2,       0.4,     0.6
    96% - 100%  Agonizing       0,         0.8,     0.8
  > maxWidth    Injury          0,         1.5,     1
```

When the insertion width is comparatively high then the orifice will naturally stretch and over time will grow to accommodate the size of the insertion until it's lies firmly within the satisfying range. We may need different thresholds for different body parts. The anus range for instance probably require more stretching for pleasure, while the pussy has a wider comfortable range. The pussy can stretch further than the anus, but it doesn't need to be as full for pleasure. There's a much larger range of discomfort and stretching before you reach the pain thresholds. Max with for pussy should start at a much higher width naturally too then.
# Anus Component Properties

#### Shape
- Between Normal, Puffy, Wrinkled, and Horse.
#### MinWidth
- Natural closed size, usually 0.
#### MaxWidth
- Maximum opening width in mm.

---
# Breasts Component Properties

#### breastCount 
- Always 2 for now until we introduce species with more.
#### breastSize 
- `zero` - (completely flat / men)
- `tiny`  - A cup
- `small` - B cup
- `average` - C cup
- `big` - D cup
- `huge` - E-H cups
- `monster` - I+
#### breastFirmness 
- `soft`, `medium`, or `firm`
#### breastShape
- Breast shape is a complicated, as breasts themselves come in a variety of shapes. When the breasts are created we pick a shape based on the size and firmness. We'll eventually need to figure out how breast size changes effect the breast shape. I might have to take our size/firmness table and add another dimension for the breast length/width ratio, whatever we want to call that, basically adding the round/teardrop/torpedo shape dimension. 
#### absoluteBreastVolume 
- Breast size is usually enough to volume. However, once breasts reach huge level we keep track of volume as we'll need to differentiate between 8 pound breasts and 80 pound breasts. Volume will also be used for lactation calculations.
#### relativeBreastVolume
- The relativeBreast volume is the volume the breasts would have been on a human. We think we need to save this value for breast growth effects and for comparisons and such. For instance, if breast size increases, the size category might also change. But the size category mins and maxes are based off of human sized breasts, so rather than convert the absolute size back to the relative size, just always use the relative size then recalculate the absolute size when the relative size changes.
#### nippleShape 
- normal, puffy, inverted
- teat - Long cow like nipple
- mouth, cock, pussy - Will reference associated child component
#### nippleWidth
- Width of the tip of the nipple in mm.
#### nippleLength
- Length of the tip of the nipple in mm.
#### nippleShade
- A value 0-5. 0 is same as skin color, and 5 is 5 shades darker.
#### areolaWidth
- Width of the areola in mm.
#### lactationFactor 
- An integer normally from 0-100 indicating how much milk is being produced. Milk volume based on breast volume. A value higher that 100 indicates milk production beyond what should be possible.
#### orificeMinWidth
- Nipple closed width in mm. 
#### orificeMaxWidth
- The maximum width that the nipple orifice can stretch to before injury. Made up biology, but hey, it's a fantasy game.

---
# Cock Component Properties

#### count
- Always 1 for now until we add the ability for some characters to have multiple cocks in one location. Naga will have 2 by default.
#### shape
- Overall cock shape (normal, horse, dog, dragon) Shape determines presence of cock sheath or if testicles are internal or not.
#### length
- The cock length in mm when erect. The breast descriptions care about the relative size of breasts and how they work with the body as a whole, so we sometimes need to consider the relative volume vs the absolute volume. With the cocks, in the descriptions and mechanics I think we really only ever care about the actual width and length. If we need to calculate how this cock compares to the species average, that's easy enough to do.
#### width
- The cock width in mm when erect.
#### flaccidLength
- The length of the cock when flaccid.
#### headFlare
- Width multiplier for the cock head during orgasm.
#### knotFlare
- Width multiplier for the knot during orgasm.
#### cockFlare (future)
- Width multiplier for the entire cock during orgasm.
#### lengthFlare (future)
- Length multiplier for the entire cock length during orgasm.
#### knotRatio
- Normal knot width to cock width ratio when erect.
#### bumpSize (future)
- Diameter in mm of round hard bumps that cover the surface of the cock, giving it a rough gnarled texture. 
#### spineSize (future)
- Length and diameter of fleshy, thorn like spines that can cover the surface of a cock.
#### ridgeSize (future)
- Thickness in mm of hard ring like ridges common on dragon cocks. 
#### testicleSize
- Diameter of one testicle in mm. Scrotum size can be calculated from testicle size.
#### testicleCount
- Always 2 for now. Maybe other species have more?
#### cumVolume
- Cum volume in ml. The range should come from the species. Not terribly tied to testicle size. Either size can change without effecting the other. If we have spells or effects that change these though, then both properties should be altered just for cosmetic effect. 
#### foreskinStatus (future)
- Might include something to describe foreskin status: circumcised, uncircumcised, turtleneck
#### smegma (future)
- Has the cock been washed recently?
#### lastOrgasm (future)
- Date time of the last orgasm. Can add bonus to cum volume.
#### UrethraMinWidth (future)
#### UrethraMaxWidth (future)

---

# Mouth Component Properties
We also need mouth depth and throat depth. We need to determine how deep a character can suck a cock without needing to deepthroat, or when a deepthroat becomes stomach fucking. These lengths can always be a percentage of the character height though I think, so they don't need to be stored as their own property.
#### maxMouthWidth
- The max mouth width in mm, that is the widest that the mouth can be opened without injury. minWidth will always be 0 for mouths. I don't anticipate any mouth gaping, doesn't really make sense.
#### maxThroatWidth
- Smaller than the mouth width, usually by about half I think.
#### comfortableThroatDepth
- Value to determine the depth at which a character might start gagging from throat penetration. Once a penetration is past the comfortable depth there should be a chance that the character will gag. The more a penetration surpasses the comfortable depth the higher that chance is. The species data can specify a `gagReflex` value, that's used to determine this depth based on the character height. 
#### tongueLength
- Tongue length in mm. This is how far the tongue can protrude from the mouth, and not the size of the actual tongue organ.
#### tongueShape
- Shape of the tongue. Can be normal, forked, dog, or cock. 
#### comfortableThroatDepth
- Value to determine the depth at which a character might start gagging from throat penetration. Once a penetration is past the comfortable depth there should be a chance that the character will gag. The more a penetration surpasses the comfortable depth the higher that chance is. The species data can specify a `gagReflex` as a value between 0-100, used to determine the depth based on percentage of throat depth. Actual comfortable cock sucking depth is `comfortableThroatDepth` + `mouthDepth`. Stomach penetration happens at `throatDepth` + `mouthDepth`. A character should feel their esophagus being stretched downwards at about half throat depth. 

---
# Pussy Component Properties
#### pussyShape
- (normal, dog, horse)
#### minPussyWidth / maxPussyWidth
#### maxPussyDepth
- The maximum length in mm for an insertion before the cervix must be breached. The pussy depth works like the throat depth. The actual length from the entrance to the cervix is probable half the max depth. Once the halfway point is reached the vagina and cervix are pushed backwards, causing a stretching sensation. A loose cervix my open for a cock even before max depth is reached. 
#### MinCervixWidth / MaxCervixWidth
- These values always start at 0. Special training actions, 'cervix rubbing', are needed to start to increase max width.
#### MinUrethraWidth / MaxUrethraWidth
- It's tempting to measure urethra width in micrometers or at least tenth of milimeters, but I think if urethra stretching actions have a percent based change to cause a 1mm increase in max width, that would work in the same way. A 0.2mm increase vs a 20% chance of a 1mm increase are essentially the same. Mostly trying to avoid having to persist any float values in my JSON save files. 
#### clitLength / clitWidth
#### innerLabiaLength
- Length measured in mm. Assume reasonable width based on length.
#### outerLabiaSize
- General size class (1-5)
#### prolapseLength



