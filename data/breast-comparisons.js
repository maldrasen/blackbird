// Size comparison objects for each breast shape, keyed by shape and laddered by breast volume in ml. The first rung
// whose max is at or above the volume is used. Each ladder must ascend and end at the max of the size band its shape
// belongs to (BreastData.BreastSizes); a volume past the end of its ladder means the breast volume and size category
// are out of sync, which is an error rather than something to paper over.
//
// Each rung has two lists:
//
//   nouns    Bare objects ("cantaloupe") safe in the attributive slot: "cantaloupe sized tits". These must never
//            contain a size word, because in that position the word reads as describing the breasts rather than the
//            object ("small cantaloupe sized tits" reads as small tits). Without a qualifier to shift it, a noun is
//            placed in the rung (or two adjacent rungs, when they're narrow) that holds the size of the average
//            specimen. A lemon is a lemon: it lives where an average lemon's volume lands, not in every rung that
//            mentions "tiny lemon" or "large lemon".
//   phrases  Granular noun phrases ("small cantaloupe") for use only after a comparative: "the size of a small
//            cantaloupe", "no larger than small cantaloupes". Phrases must pluralize on their last word, so no
//            "bottle of wine" style entries.
//
// Shapes with no round object to compare against (flat, pancakes, tiddys, elongated-sacks, massive-bells,
// straining-round) have no ladder and the loom will emit a warning if a comparison token is used for one.
global.BreastComparisons = {

  // 0 - 200 ml / firm
  'tiny-balls': [
    { max:50,       nouns:['strawberry','walnut'],
                    phrases:['strawberry','large walnut','tiny lime','tiny lemon'] },
    { max:100,      nouns:[`hen's egg`,'apricot','lime'],
                    phrases:['small lime','small lemon','small tart plum',`large hen's egg`,'plump apricot','ripe lemon','ripe lime'] },
    { max:150,      nouns:['lemon','plum'],
                    phrases:['ripe lemon','ripe lime','tiny pear','tiny apple','firm young peach','ripe plum','small orange','large apricot'] },
    { max:200,      nouns:['peach','orange'],
                    phrases:['small green apple','plump peach','large plum','ripe orange'] },
  ],

  // 200 - 400 ml / firm
  'pert': [
    { max:250,      nouns:['pear','avocado'],
                    phrases:['firm young pear','tiny pinecone'] },
    { max:300,      nouns:['pear'],
                    phrases:['ripe pear','small mango','small pinecone'] },
    { max:350,      nouns:['pinecone'],
                    phrases:['large pear','tiny eggplant','small mango','pinecone'] },
    { max:400,      nouns:['mango','pinecone'],
                    phrases:['overgrown pear','small eggplant','ripe mango','pinecone'] },
  ],

  // 200 - 400 ml / firm
  'small-balls': [
    { max:250,      nouns:['apple','peach','orange','bread roll'],
                    phrases:['ripe apple','juicy peach','juicy orange','freshly baked roll'] },
    { max:300,      nouns:['apple','orange'],
                    phrases:['plump apple','large peach','plump orange','large bread roll'] },
    { max:350,      nouns:['cinnamon roll'],
                    phrases:['large apple','large orange','plump bread roll'] },
    { max:400,      nouns:['pomegranate'],
                    phrases:['overgrown apple','overgrown orange','large cinnamon roll','small grapefruit'] },
  ],

  // 400 - 700 ml / soft
  'teardrops': [
    { max:550,      nouns:['mango','eggplant','belt pouch'],
                    phrases:['juicy mango','ripe eggplant','leather belt pouch'] },
    { max:700,      nouns:['wineskin','papaya'],
                    phrases:['large juicy mango','large juicy eggplant','full wineskin'] },
  ],

  // 400 - 700 ml / medium
  'conical': [
    { max:550,      nouns:['eggplant'],
                    phrases:['large pinecone','ripe eggplant'] },
    { max:700,      nouns:['papaya'],
                    phrases:['huge pinecone','large juicy eggplant'] },
  ],

  // 400 - 700 ml / firm
  'balls': [
    { max:550,      nouns:['grapefruit'],
                    phrases:['juicy grapefruit'] },
    { max:700,      nouns:['grapefruit'],
                    phrases:['large ripe grapefruit'] },
  ],

  // 400 - 700 ml / firm / narrow
  'tubular': [
    { max:550,      nouns:['flask'],
                    phrases:['leather flask','small wine bottle'] },
    { max:700,      nouns:['wineskin','wine bottle'],
                    phrases:['small ale tankard','full wineskin','full wine bottle'] },
  ],

  // 700 - 1,200 ml / soft
  'swingers': [
    { max:1000,     nouns:['wineskin','tankard'],
                    phrases:['wineskin','ale tankard'] },
    { max:1200,     nouns:['wine decanter'],
                    phrases:['tavern tankard','bulging wineskin','large wine decanter'] },
  ],

  // 700 - 1,200 ml / medium
  'average': [
    { max:1000,     nouns:['wineskin','tankard'],
                    phrases:['overgrown grapefruit'] },
    { max:1200,     nouns:['wine decanter','ostrich egg'],
                    phrases:['young cantaloupe','small cantaloupe','small honeydew melon'] },
  ],

  // 700 - 1,200 ml / firm
  'perky': [
    { max:1000,     nouns:['wineskin','tankard'],
                    phrases:['wineskin','ale tankard'] },
    { max:1200,     nouns:['ostrich egg','wine decanter'],
                    phrases:['young pineapple','small pineapple'] },
  ],

  // 700 - 1,200 ml / firm / narrow
  'torpedoes': [
    { max:1000,     nouns:['wineskin'],
                    phrases:['large wine bottle'] },
    { max:1200,     nouns:['wine decanter','flagon'],
                    phrases:['oversized wine bottle'] },
  ],

  // 1,200 - 2,000 ml / soft
  'dangling': [
    { max:1600,     nouns:['cantaloupe'],
                    phrases:['small pineapple'] },
    { max:2000,     nouns:['pineapple','cantaloupe'],
                    phrases:['ripe pineapple','juicy pineapple'] },
  ],

  // 1,200 - 2,000 ml / medium
  'heavy-bells': [
    { max:1600,     nouns:['cantaloupe'],
                    phrases:['small pineapple'] },
    { max:2000,     nouns:['pineapple','cantaloupe'],
                    phrases:['ripe pineapple','juicy pineapple'] },
  ],

  // 1,200 - 2,000 ml / firm
  'big-round': [
    { max:1600,     nouns:['cantaloupe','honeydew melon'],
                    phrases:['young coconut','juicy cantaloupe','ripe honeydew melon'] },
    { max:2000,     nouns:['cantaloupe','honeydew melon'],
                    phrases:['small coconut','ripe cantaloupe','juicy honeydew melon'] },
  ],

  // 2,000 - 5,000 ml / soft
  'pendulous': [
    { max:3000,     nouns:['pineapple'],
                    phrases:['ripe pineapple','juicy pineapple','small oblong watermelon'] },
    { max:4000,     nouns:['pumpkin','watermelon'],
                    phrases:['large pineapple','big pineapple','small elongated watermelon','small elongated pumpkin'] },
    { max:5000,     nouns:['pumpkin','watermelon'],
                    phrases:['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / medium
  'hangers': [
    { max:3000,     nouns:['pineapple'],
                    phrases:['ripe pineapple','juicy pineapple','small oblong watermelon'] },
    { max:4000,     nouns:['pumpkin','watermelon'],
                    phrases:['large pineapple','big pineapple','small elongated watermelon','small elongated pumpkin'] },
    { max:5000,     nouns:['pumpkin','watermelon'],
                    phrases:['huge pineapple','overgrown pineapple','ripe watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / medium
  'cow-tits': [
    { max:3000,     nouns:['coconut'],
                    phrases:['ripe coconut','big juicy cantaloupe','big juicy honeydew melon','ripe watermelon'] },
    { max:4000,     nouns:['pumpkin','watermelon'],
                    phrases:['swollen coconut','huge cantaloupe','swollen honeydew melon','swollen watermelon','small swollen pumpkin'] },
    { max:5000,     nouns:['pumpkin','watermelon'],
                    phrases:['bulging coconut','bulging honeydew melon','bulging watermelon','ripe pumpkin'] },
  ],

  // 2,000 - 5,000 ml / firm
  'bimbo': [
    { max:3000,     nouns:['coconut'],
                    phrases:['ripe coconut','big juicy cantaloupe','big juicy honeydew melon','small round watermelon'] },
    { max:4000,     nouns:['watermelon','pumpkin'],
                    phrases:['large coconut','huge cantaloupe','huge honeydew melon','ripe round watermelon','small pumpkin'] },
    { max:5000,     nouns:['watermelon','pumpkin'],
                    phrases:['large ripe coconut','overgrown honeydew melon','round juicy watermelon','ripe pumpkin'] },
  ],

}
