

```
application/characters/factories/personality-factory.js                        
application/characters/factories/sexual-preferences-factory.js                 
application/enums.js                                                           
application/records/base-monster.js                                            
bin/reports/archetype-report.js                                                
data/archetypes/kobold-dom.js                                                  
data/archetypes/kobold-sub.js                                                  
data/archetypes/vermen-dom.js                                                  
data/archetypes/vermen-sub.js                                                  
data/dialog/kobold-dom/propose-training.js                                     
data/dialog/kobold-sub/propose-training.js                                     
data/monsters/deepdark-kobold.js                                               
data/monsters/deepdark-whisperer.js                                            
data/monsters/flamescale-kobold.js                                             
data/monsters/flamescale-screamer.js                                           
data/monsters/kobold-dick-puncher.js                                           
data/monsters/kobold-runt.js                                                   
data/monsters/kobold-sneak-slut.js                                             
data/monsters/kobold-tosser.js                                                 
data/monsters/kobold-trapper.js                                                
data/species/kobold.js                                                         
data/species/vermen.js                                                         
docs/reference/personality-system.md                                           
manifest.json                                                                  
test/characters/factories/sexual-preferences-factory-spec.js
```


### Dom
```
  eager.add(`{T:name} bares {T:his} teeth in a sharp grin. "Training? You want {T:name} to train you? Ha! Fine.  
  Then this one will show you no mercy."`);  
  
willing.add(`{T:name} clicks {T:his} claws together, sizing you up. "Training? You mean sex yes?"`);  
  
reluctant.add(`{T:name} snorts a puff of hot air. "You have a lot to learn {P:species.name}. Kobolds never ask.  
  We just take."`);  
  
unwilling.add(`{T:name} snarls, the spines on his head rising. "Try it {P:species.name}, and see what happens."`);
```

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
```
eager.add(`{T:name} drops {T:his} gaze immediately, ears flat and tail slowly raising upward.  
  "Of course master. Use this one however you want."`);  
  
willing.add(`{T:name} nods briefly before turning around and lifting {T:his} tail.`);  
  
reluctant.add(`{T:name} frowns a little and nods. "If that's what you want from me."`);  
  
unwilling.add(`{T:name} backs against the wall, {T:his} claws scraping against the hard floor. "No... don't hurt me."`);
```

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