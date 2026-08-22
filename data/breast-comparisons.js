// Size comparison objects for each breast shape, keyed by shape and laddered by absolute breast volume in ml. The first
// rung whose max is greater than the volume is used, so each ladder must ascend and end with max:Infinity.
//
// Each rung has two lists:
//
//   nouns    Bare objects ("cantaloupe") safe in the attributive slot: "cantaloupe sized tits". These must never
//            contain a size word, because in that position the word reads as describing the breasts rather than the
//            object ("small cantaloupe sized tits" reads as small tits).
//   phrases  Granular noun phrases ("small cantaloupe") for use only after a comparative: "the size of a small
//            cantaloupe", "no larger than small cantaloupes". Phrases must pluralize on their last word, so no
//            "bottle of wine" style entries.
//
// Shapes with no round object to compare against (flat, pancakes, tiddys, elongated-sacks, massive-bells,
// straining-round) have no ladder and the loom will emit a warning if a comparison token is used for one.
global.BreastComparisons = {

  // 0 - 200 ml / firm
  'tiny-balls': [
    { max:50,       nouns:['strawberry','walnut','lime','lemon'],
                    phrases:['strawberry','large walnut','tiny lime','tiny lemon'] },
    { max:100,      nouns:['lime','lemon','plum',`hen's egg`,'apricot'],
                    phrases:['small lime','small lemon','small tart plum',`large hen's egg`,'plump apricot','ripe lemon','ripe lime'] },
    { max:150,      nouns:['lemon','lime','pear','apple','peach','plum','orange','apricot'],
                    phrases:['ripe lemon','ripe lime','tiny pear','tiny apple','firm young peach','ripe plum','small orange','large apricot'] },
    { max:Infinity, nouns:['green apple','peach','plum','orange'],
                    phrases:['small green apple','plump peach','large plum','ripe orange'] },
  ],

  // 200 - 400 ml / firm
  'pert': [
    { max:250,      nouns:['pear','pinecone'],
                    phrases:['firm young pear','tiny pinecone'] },
    { max:300,      nouns:['pear','mango','pinecone'],
                    phrases:['ripe pear','small mango','small pinecone'] },
    { max:350,      nouns:['pear','eggplant','mango','pinecone'],
                    phrases:['large pear','tiny eggplant','small mango','pinecone'] },
    { max:Infinity, nouns:['pear','eggplant','mango','pinecone'],
                    phrases:['overgrown pear','small eggplant','ripe mango','pinecone'] },
  ],

  // 200 - 400 ml / firm
  'small-balls': [
    { max:250,      nouns:['apple','peach','orange','bread roll'],
                    phrases:['ripe apple','juicy peach','juicy orange','freshly baked roll'] },
    { max:300,      nouns:['apple','peach','orange','bread roll'],
                    phrases:['plump apple','large peach','plump orange','large bread roll'] },
    { max:350,      nouns:['apple','orange','bread roll'],
                    phrases:['large apple','large orange','plump bread roll'] },
    { max:Infinity, nouns:['apple','orange','cinnamon roll','grapefruit'],
                    phrases:['overgrown apple','overgrown orange','large cinnamon roll','small grapefruit'] },
  ],

  // 400 - 700 ml / soft
  'teardrops': [
    { max:550,      nouns:['mango','eggplant','belt pouch'],
                    phrases:['juicy mango','ripe eggplant','leather belt pouch'] },
    { max:Infinity, nouns:['mango','eggplant','wineskin'],
                    phrases:['large juicy mango','large juicy eggplant','full wineskin'] },
  ],

  // 400 - 700 ml / medium
  'conical': [
    { max:550,      nouns:['pinecone','eggplant'],
                    phrases:['large pinecone','ripe eggplant'] },
    { max:Infinity, nouns:['pinecone','eggplant'],
                    phrases:['huge pinecone','large juicy eggplant'] },
  ],

  // 400 - 700 ml / firm
  'balls': [
    { max:550,      nouns:['grapefruit'],
                    phrases:['juicy grapefruit'] },
    { max:Infinity, nouns:['grapefruit'],
                    phrases:['large ripe grapefruit'] },
  ],

  // 400 - 700 ml / firm / narrow
  'tubular': [
    { max:550,      nouns:['flask','wine bottle'],
                    phrases:['leather flask','small wine bottle'] },
    { max:Infinity, nouns:['tankard','wineskin','wine bottle'],
                    phrases:['small ale tankard','full wineskin','full wine bottle'] },
  ],

  // 700 - 1,200 ml / soft
  'swingers': [
    { max:1000,     nouns:['wineskin','tankard'],
                    phrases:['wineskin','ale tankard'] },
    { max:Infinity, nouns:['tankard','wineskin','wine decanter'],
                    phrases:['tavern tankard','bulging wineskin','large wine decanter'] },
  ],

  // 700 - 1,200 ml / medium
  'average': [
    { max:1000,     nouns:['grapefruit'],
                    phrases:['overgrown grapefruit'] },
    { max:Infinity, nouns:['cantaloupe','honeydew melon'],
                    phrases:['young cantaloupe','small cantaloupe','small honeydew melon'] },
  ],

  // 700 - 1,200 ml / firm
  'perky': [
    { max:1000,     nouns:['wineskin','tankard'],
                    phrases:['wineskin','ale tankard'] },
    { max:Infinity, nouns:['pineapple'],
                    phrases:['young pineapple','small pineapple'] },
  ],

  // 700 - 1,200 ml / firm / narrow
  'torpedoes': [
    { max:1000,     nouns:['wine bottle'],
                    phrases:['large wine bottle'] },
    { max:Infinity, nouns:['wine bottle'],
                    phrases:['oversized wine bottle'] },
  ],

  // 1,200 - 2,000 ml / soft
  'dangling': [
    { max:1600,     nouns:['pineapple'],
                    phrases:['small pineapple'] },
    { max:Infinity, nouns:['pineapple'],
                    phrases:['ripe pineapple','juicy pineapple'] },
  ],

  // 1,200 - 2,000 ml / medium
  'heavy-bells': [
    { max:1600,     nouns:['pineapple'],
                    phrases:['small pineapple'] },
    { max:Infinity, nouns:['pineapple'],
                    phrases:['ripe pineapple','juicy pineapple'] },
  ],

  // 1,200 - 2,000 ml / firm
  'big-round': [
    { max:1600,     nouns:['coconut','cantaloupe','honeydew melon'],
                    phrases:['young coconut','juicy cantaloupe','ripe honeydew melon'] },
    { max:Infinity, nouns:['coconut','cantaloupe','honeydew melon'],
                    phrases:['small coconut','ripe cantaloupe','juicy honeydew melon'] },
  ],

  // 2,000 - 5,000 ml / soft
  'pendulous': [
    { max:3000,     nouns:['pineapple','watermelon'],
                    phrases:['ripe pineapple','juicy pineapple','small oblong watermelon'] },
    { max:4000,     nouns:['pineapple','watermelon','pumpkin'],
                    phrases:['large pineapple','big pineapple','small elongated watermelon','small elongated pumpkin'] },
    { max:Infinity, nouns:['pineapple','watermelon','pumpkin'],
                    phrases:['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / medium
  'hangers': [
    { max:3000,     nouns:['pineapple','watermelon'],
                    phrases:['ripe pineapple','juicy pineapple','small oblong watermelon'] },
    { max:4000,     nouns:['pineapple','watermelon','pumpkin'],
                    phrases:['large pineapple','big pineapple','small elongated watermelon','small elongated pumpkin'] },
    { max:Infinity, nouns:['pineapple','watermelon','pumpkin'],
                    phrases:['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / medium
  'cow-tits': [
    { max:3000,     nouns:['coconut','cantaloupe','honeydew melon','watermelon'],
                    phrases:['ripe coconut','big juicy cantaloupe','big juicy honeydew melon','ripe watermelon'] },
    { max:4000,     nouns:['coconut','cantaloupe','honeydew melon','watermelon','pumpkin'],
                    phrases:['swollen coconut','huge cantaloupe','swollen honeydew melon','swollen watermelon','small swollen pumpkin'] },
    { max:Infinity, nouns:['coconut','honeydew melon','watermelon','pumpkin'],
                    phrases:['bulging coconut','bulging honeydew melon','bulging watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / firm
  'bimbo': [
    { max:3000,     nouns:['coconut','cantaloupe','honeydew melon','watermelon'],
                    phrases:['ripe coconut','big juicy cantaloupe','big juicy honeydew melon','small round watermelon'] },
    { max:4000,     nouns:['coconut','cantaloupe','honeydew melon','watermelon','pumpkin'],
                    phrases:['large coconut','huge cantaloupe','huge honeydew melon','ripe round watermelon','small pumpkin'] },
    { max:Infinity, nouns:['coconut','honeydew melon','watermelon','pumpkin'],
                    phrases:['large ripe coconut','overgrown honeydew melon','round juicy watermelon','ripe pumpkin'] },
  ],

}
