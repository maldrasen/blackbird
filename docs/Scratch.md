

Update CharacterMath.calculateSpeedFactor() 
- A monster may not have a body component, so speed factor needs to be on base monster.
- And the speed factor is put into the cache component.

Need to ensure that a monster has a species to enable negotiate 