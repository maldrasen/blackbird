Animal Monsters Need
- Actor for name, gender.
- Attributes Component
- Health Component
- Skills Component
- Body, Body Parts (Possibly, if we have weaver tokens that rely on them, or gate these texts to monsters that have bodies)

Update CharacterMath.calculateSpeedFactor() 
- A monster may not have a body component, so speed factor needs to be on base monster.
- And the speed factor is put into the cache component.

Need to ensure that a monster has a species to enable negotiate 