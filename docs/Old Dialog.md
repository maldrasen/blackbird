### Dom

We can reflect these sexual preferences in the species, not the archetype
##### Kobold
```
sexualPreferences: {  
  'top':         { chance:50, strength:[10,30], atLeast:1 },  
  'other-rough': { chance:40, strength:[10,20] },  
  'orgy-lover':  { chance:50, strength:[20,30] },  
},
```

##### Vermen
```
sexualPreferences: {  
  'top':         { chance:60, strength:[20,40], atLeast:1 },  
  'other-rough': { chance:30, strength:[10,20] },  
  'perverted':   { chance:60, strength:[20,40] },  
  'beast-lover': { chance:60, strength:[20,30] },  
  'orgy-lover':  { chance:50, strength:[20,30] },  
},
```

### Sub

We can reflect these sexual preferences in the species, not the archetype
##### Kobold
```
sexualPreferences: {  
  'bottom':        { chance:50, strength:[20,30], atLeast:1 },  
  'self-rough':    { chance:10, strength:[10,20] },  
  'humiliating':   { chance:20, strength:[10,20] },  
  'orgy-lover':    { chance:50, strength:[20,30] },  
},
```

##### Vermen
```
sexualPreferences: {  
  'bottom':        { chance:60, strength:[20,30], atLeast:1 },  
  'self-rough':    { chance:15, strength:[10,20] },  
  'humiliating':   { chance:30, strength:[10,30] },  
  'perverted':     { chance:60, strength:[20,40] },  
  'beast-lover':   { chance:60, strength:[20,30] },  
  'orgy-lover':    { chance:50, strength:[20,30] },  
},
```

### New Tasks
Character factory is due for a rewrite. With the other systems I've done what I can to separate the working state out into it's own object. The character factory works by passing all these data objects around into the various sub factories. It would be cleaner if there was a character factory state that all the factories could access, modifying their particular data block. Then, when everything is built and correct, we build the character from the factory state.