
// TODO: We need a way for a character to retain the natural attacks they had as a monster. A kobold runt has a bite
//       attack. (Really every kobold should have one.) If a kobold is recruited to the party they should have the
//       same abilities they have as a monster. We'd need to take the monster abilities and convert them into a list
//       of commands that we save in a character component. Some abilities like spells would go into whatever spellbook
//       component we end up having. Abilities like use article wouldn't transfer at all. A bite attack though would
//       need to have an associated battle command and a character would need to know what commands they have access
//       to. These monster commands could simply reference the base monster ability. { BaseMonsterCode, AbilityKey }
//       An ability that can be transferred like this would need to have set a stamina or mana cost that the monster
//       doesn't use at all until they're recruited. A yeek's venom bite wouldn't need a stamina cost though as they
//       can't be recruited. This is a separate task entirely, not part of the ongoing refactor.
