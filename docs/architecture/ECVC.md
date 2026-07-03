Project Blackbird uses a hybrid between an ECS and an MVC, basically taking the entities and components from ECS and the views and controllers from MVC. At it's core, it's a website so MVC works fine, but instead of a database, we just have all the game data in memory as Entities and Components. Any data that's going to be persisted in a save file will be within a component. Whatever the current view is will also maintain it's own state, just for convenience, though view state doesn't need to be persisted.

### Entities
An entity is nothing more than an ID. The `Registry` is used to manage all of the component data associated with an entity ID. To do this, the `Registry` uses two maps. The first maps the entity ID to a list of component types that that entity has. The second map is a map of component types, under each different component type is a map of entity ID to the component data for that component type. 

When an Entity Id is removed from the Registry the associated components are also removed from each component registry. When an entity is removed any child entities (entities with a `_parentId` that references the entity being removed) are also removed. Because of this relationship, child components should only be things that can't exist without the parent component. Things like body parts or skills, but not things like equipment. If a character with equipment is removed from the game whatever removes it will need handle removing orphaned entities like equipment itself. Components with references to other entities though properties other than `_parentId` are also not automatically removed and may point to entities that no longer exist if they're not properly cleaned.

### Components
The components are simple data objects associated with an Entity Id. The components themselves shouldn't have any complicated business logic, mostly just the CRUD functions for that component. The actual 'programming' of the components belongs to the systems. A few components do have 'wrapper' classes that can be used to add simple calculation functions, though they should be limited to accessing component data, never mutating it. Each component also needs to validate its own data, both on create and update.
##### Character Components
Almost all of the components in the game are associated with characters. The Battle, Dungeon and Training states don't persist after the battle's been won or the dungeon has been exited. The Monster characters used in the battle system share many of the same components, but are either deleted after the battle or fully become persisted characters.

Once a character has become 'real' like this I don't think we ever delete them. There are components like feelings and memory that can reference another character entity. Even if a character were to permanently die, I don't think we want to delete those references. This would allow characters to 'remember' other party members that may have died.

### Data Objects
In addition to the Components, Blackbird has three different types of data objects:
- `Wrappers` - To add functions onto the basic component data objects (Character, Monster, Weapon, etc)
- `Records` - Immutable data objects (BaseWeapon, Species)
- `States` - Internal state for game modes (TrainingState, BattleState)

##### Records
Records are generally accessed by their code, a string label used to access the data with the record's `lookup()` function. The `lookup()` function returns a wrapped record object with accessor functions. When a system or another object needs a reference to a record, only the record code is stored.

##### Game State
The GameState is the one state object that is persisted outside of the entities and components. It's mostly a place to store game state variables that aren't attached to a particular entity, like the current game mode or the game time.
