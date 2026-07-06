const playerA = WeaverRequirements.playerIs('A');
const playerB = WeaverRequirements.playerIs('B');

const isLoving = WeaverRequirements.withAttitude(Attitude.loving);
const isLustful = WeaverRequirements.withAttitude(Attitude.lustful);
const isAccepting = WeaverRequirements.withAttitude(Attitude.accepting);
const isFearful = WeaverRequirements.withAttitude(Attitude.fearful);
const isResistant = WeaverRequirements.withAttitude(Attitude.resistant);
const isViolent = WeaverRequirements.withAttitude(Attitude.violent);

const aVisibleCock = WeaverRequirements.visibleCock('A');
const bVisibleCock = WeaverRequirements.visibleCock('B');
const aHardCock = WeaverRequirements.visibleHardCock('A');
const bHardCock = WeaverRequirements.visibleHardCock('B');
const bVisiblePussy = WeaverRequirements.visiblePussy('B');
const bVisibleBreasts = WeaverRequirements.visibleBreasts('B');

const rearrange = WeaverPackage('doggy-style.rearrange');
const centipede = WeaverPackage('doggy-style.move-to-centipede');
const missionary = WeaverPackage('doggy-style.move-to-missionary-reversed');
const spooning = WeaverPackage('doggy-style.move-to-spooning');
const straddle = WeaverPackage('doggy-style.move-to-straddle');

// First on knees, thrusting into second from behind. Second bent over in front of first.
SexPosition.register('doggy-style',{
  name: 'Doggy Style',

  alignment: {
    first: {
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock, HandAlignment.mouth],
      cock: [CockAlignment.frottage, CockAlignment.fucked, CockAlignment.rubbed],
    },
    second: {
      cock: [CockAlignment.frottage, CockAlignment.rubbed],
      ass: [AssAlignment.fingered, AssAlignment.fucked],
    },
  },

  moves: [
    { code:'centipede', package:centipede },
    { code:'missionary-reversed', package:missionary },
    { code:'spooning', package:spooning },
    { code:'straddle', package:straddle },
  ],

  rearrangePackage: rearrange,
});

// There are deliberately no options for the player bending over (as B) in front of a fearful, resistant, or violent
// partner. Having the player voluntarily bend over in front of an unwilling partner seems incompatible.

rearrange.add(`{B:name} settles onto {B:his} knees in front of you, smiling as {B:he} bends forward and raises {B:his} hips.`,
  [playerA, isLoving]);
rearrange.add(`With obvious affection, {B:name} bends over for you, arching {B:his} back invitingly.`,
  [playerA, isLoving]);
rearrange.add(`{B:name} bends over affectionately, {B:his} {B:cock.thickCock} swaying between {B:his} legs.`,
  [playerA, isLoving, bVisibleCock]);
rearrange.add(`{B:name} bends forward with a warm smile, {B:his} {B:breasts.softBreasts} swaying gently as {B:he} settles into position.`,
  [playerA, isLoving, bVisibleBreasts]);
rearrange.add(`{B:name} drops eagerly onto {B:his} knees, bending forward and spreading {B:his} thighs for you.`,
  [playerA, isLustful]);
rearrange.add(`With a needy moan, {B:name} bends over, presenting {B:his} ass for you.`,
  [playerA, isLustful]);
rearrange.add(`{B:name} spreads {B:his} legs eagerly, {B:his} soaked {pussy} glistening as {B:he} bends over for you.`,
  [playerA, isLustful, bVisiblePussy]);
rearrange.add(`{B:name} moans as {B:he} bends over, {B:his} {B:cock.bigHardCock} bobbing between {B:his} legs.`,
  [playerA, isLustful, bHardCock]);
rearrange.add(`{B:name} bends over without complaint, settling into position in front of you.`,
  [playerA, isAccepting]);
rearrange.add(`Without protest, {B:name} kneels and bends forward for you.`,
  [playerA, isAccepting]);
rearrange.add(`{B:name} bends over, {B:his} {B:cock.thickCock} hanging plainly between {B:his} legs.`,
  [playerA, isAccepting, bVisibleCock]);
rearrange.add(`{B:name} bends over nervously, {B:his} body tense as {B:he} settles into position.`,
  [playerA, isFearful]);
rearrange.add(`With a shaky breath, {B:name} kneels and bends forward, unsure what to expect.`,
  [playerA, isFearful]);
rearrange.add(`{B:name's} {B:cock.sixInch} long {cock} trembles as {B:he} nervously bends over for you.`,
  [playerA, isFearful, bVisibleCock]);
rearrange.add(`{B:name} grumbles, reluctantly bending over in front of you.`,
  [playerA, isResistant]);
rearrange.add(`With a huff, {B:name} kneels and bends forward, clearly unhappy about it.`,
  [playerA, isResistant]);
rearrange.add(`{B:name} thrashes as you force {B:him} into position, bending {B:him} over in front of you.`,
  [playerA, isViolent]);
rearrange.add(`{B:name} struggles, but you push {B:him} down onto {B:his} knees and bend {B:him} over anyway.`,
  [playerA, isViolent]);
rearrange.add(`{A:name} settles behind you with obvious affection as you bend over, arching your back for {A:him}.`,
  [playerB, isLoving]);
rearrange.add(`You settle onto your knees, bending forward as {A:name} kneels behind you with a warm smile.`,
  [playerB, isLoving]);
rearrange.add(`{A:name} kneels behind you affectionately, {A:his} {A:cock.thickCock} resting against your ass as you bend over.`,
  [playerB, isLoving, aVisibleCock]);
rearrange.add(`{A:name} moans with need as you bend over, {A:his} eyes fixed on your upturned ass.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} settles hungrily behind you as you drop onto your knees, bending forward for {A:him}.`,
  [playerB, isLustful]);
rearrange.add(`{A:name} moans as {A:he} settles behind you, {A:his} {A:cock.bigHardCock} pressing between your cheeks.`,
  [playerB, isLustful, aHardCock]);
rearrange.add(`You bend over, and {A:name} settles in behind you without comment.`,
  [playerB, isAccepting]);
rearrange.add(`You kneel and bend forward, and {A:name} settles behind you without protest.`,
  [playerB, isAccepting]);



// First bends over further, pushing their face into Second's ass.
centipede.add(`You bend over further, pressing your face into {B:name's} ass as {B:he} sighs happily.`,
  [playerA, isLoving]);
centipede.add(`{B:name} arches {B:his} back invitingly as you lean down, pressing your face between {B:his} cheeks.`,
  [playerA, isLoving]);
centipede.add(`{B:name} moans as you bend over further, pushing your face into {B:his} ass.`,
  [playerA, isLustful]);
centipede.add(`Eager for more, {B:name} pushes back against your face as you lean down between {B:his} cheeks.`,
  [playerA, isLustful]);
centipede.add(`You bend over further, pushing your face into {B:name's} ass without complaint from {B:him}.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} stays in position without protest as you lean down to press your face between {B:his} cheeks.`,
  [playerA, isAccepting]);
centipede.add(`{B:name} tenses nervously as you bend over further, pushing your face into {B:his} ass.`,
  [playerA, isFearful]);
centipede.add(`With a shaky breath, {B:name} stays in position as you lean down between {B:his} cheeks.`,
  [playerA, isFearful]);
centipede.add(`{B:name} grumbles, reluctantly staying in position as you bend over further and push your face into {B:his} ass.`,
  [playerA, isResistant]);
centipede.add(`With a huff, {B:name} stays put as you lean down between {B:his} cheeks.`,
  [playerA, isResistant]);
centipede.add(`{B:name} thrashes as you bend over further, forcing your face into {B:his} ass despite {B:his} struggling.`,
  [playerA, isViolent]);
centipede.add(`{B:name} tries to pull away, but you push your face into {B:his} ass anyway.`,
  [playerA, isViolent]);
centipede.add(`You feel {A:name} bending down behind you affectionately, pushing {A:his} face into your ass.`,
  [playerB, isLoving]);
centipede.add(`{A:name} sighs happily as {A:he} leans down, pressing {A:his} face between your cheeks.`,
  [playerB, isLoving]);
centipede.add(`You feel {A:name} bending down hungrily behind you, pushing {A:his} face into your ass.`,
  [playerB, isLustful]);
centipede.add(`{A:name} moans as {A:he} leans down, pressing {A:his} face eagerly between your cheeks.`,
  [playerB, isLustful]);
centipede.add(`You feel {A:name} bending down behind you without complaint, pushing {A:his} face into your ass.`,
  [playerB, isAccepting]);
centipede.add(`{A:name} leans down without protest, pressing {A:his} face between your cheeks.`,
  [playerB, isAccepting]);
centipede.add(`You feel {A:name} bending down nervously behind you, pushing {A:his} face into your ass.`,
  [playerB, isFearful]);
centipede.add(`With a shaky breath, {A:name} leans down, pressing {A:his} face between your cheeks.`,
  [playerB, isFearful]);
centipede.add(`You feel {A:name} bending down behind you, grumbling reluctantly as {A:he} pushes {A:his} face into your ass.`,
  [playerB, isResistant]);
centipede.add(`With a huff, {A:name} leans down, clearly unhappy about it.`,
  [playerB, isResistant]);
centipede.add(`{A:name} thrashes as you push {A:his} face down into your ass, {A:his} struggles doing nothing to stop you.`,
  [playerB, isViolent]);
centipede.add(`{A:name} tries to pull away, but you force {A:his} face into your ass anyway.`,
  [playerB, isViolent]);



missionary.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach with a contented sigh as you settle on top of {B:him}.`,
  [playerA, isLoving]);
missionary.add(`With obvious affection, {B:name} stretches out beneath you, letting you cover {B:his} body with your own.`,
  [playerA, isLoving]);
missionary.add(`{B:name} lowers {B:him}self flat as you settle on top, your {A:cock.thickCock} resting warmly against {B:his} lower back.`,
  [playerA, isLoving, aVisibleCock]);
missionary.add(`{B:name} moans and lowers {B:him}self flat, arching {B:his} hips up as you settle on top of {B:him}.`,
  [playerA, isLustful]);
missionary.add(`Eager for more, {B:name} spreads out beneath you, pressing back against you as you lower yourself onto {B:his} back.`,
  [playerA, isLustful]);
missionary.add(`{B:name} moans as you settle on top, your {A:cock.bigHardCock} pressing against {B:his} lower back.`,
  [playerA, isLustful, aHardCock]);
missionary.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint, letting you settle on top of {B:him}.`,
  [playerA, isAccepting]);
missionary.add(`Without protest, {B:name} stretches out beneath you.`,
  [playerA, isAccepting]);
missionary.add(`{B:name} lowers {B:him}self flat nervously, {B:his} body tense as you settle on top of {B:him}.`,
  [playerA, isFearful]);
missionary.add(`With a shaky breath, {B:name} lies down beneath you.`,
  [playerA, isFearful]);
missionary.add(`{B:name's} {B:cock.sixInch} long {cock} trembles nervously as you settle on top of {B:him}.`,
  [playerA, isFearful, bVisibleCock]);
missionary.add(`{B:name} grumbles, reluctantly lowering {B:him}self flat as you settle on top of {B:him}.`,
  [playerA, isResistant]);
missionary.add(`With a huff, {B:name} lies down beneath you, clearly unhappy about it.`,
  [playerA, isResistant]);
missionary.add(`{B:name} thrashes as you force {B:him} down flat, pinning {B:him} beneath your weight.`,
  [playerA, isViolent]);
missionary.add(`{B:name} struggles, but you push {B:him} down onto {B:his} stomach and settle on top anyway.`,
  [playerA, isViolent]);
missionary.add(`You lower yourself flat, and {A:name} settles warmly on top of you, nuzzling the back of your neck.`,
  [playerB, isLoving]);
missionary.add(`{A:name} covers your body with {A:his} own affectionately as you stretch out beneath {A:him}.`,
  [playerB, isLoving]);
missionary.add(`{A:name} settles on top of you, {A:his} {A:cock.thickCock} resting warmly against your lower back.`,
  [playerB, isLoving, aVisibleCock]);
missionary.add(`You lower yourself flat, and {A:name} settles on top of you eagerly, grinding {A:his} hips down with a needy moan.`,
  [playerB, isLustful]);
missionary.add(`{A:name} presses down against you hungrily as you spread out beneath {A:him}.`,
  [playerB, isLustful]);
missionary.add(`{A:name} settles on top of you with a moan, {A:his} {A:cock.bigHardCock} pressing eagerly against your lower back.`,
  [playerB, isLustful, aHardCock]);
missionary.add(`You lower yourself flat, and {A:name} settles on top of you without comment.`,
  [playerB, isAccepting]);
missionary.add(`You stretch out flat, and {A:name} settles down onto your back without protest.`,
  [playerB, isAccepting]);
missionary.add(`{A:name} settles on top of you nervously, {A:his} body tense.`,
  [playerB, isFearful]);
missionary.add(`With a shaky breath, {A:name} lies down flat on top of you.`,
  [playerB, isFearful]);
missionary.add(`{A:name's} {A:cock.sixInch} long {cock} trembles nervously as {A:he} settles on top of you.`,
  [playerB, isFearful, aVisibleCock]);
missionary.add(`{A:name} grumbles, reluctantly lowering {A:him}self on top of you.`,
  [playerB, isResistant]);
missionary.add(`With a huff, {A:name} lies down on top of you, clearly unhappy about it.`,
  [playerB, isResistant]);
missionary.add(`{A:name} thrashes as you pull {A:him} down on top of you anyway, {A:his} struggles doing nothing to stop you.`,
  [playerB, isViolent]);
missionary.add(`{A:name} struggles, but you keep pulling {A:him} down on top of you regardless.`,
  [playerB, isViolent]);



spooning.add(`{B:name} lowers {B:him}self onto {B:his} side with a contented sigh as you settle in behind {B:him}.`,
  [playerA, isLoving]);
spooning.add(`With obvious affection, {B:name} nestles back against you as you both settle onto your sides.`,
  [playerA, isLoving]);
spooning.add(`{B:name} settles onto {B:his} side, {B:his} {B:cock.thickCock} resting against {B:his} leg as you spoon up behind {B:him}.`,
  [playerA, isLoving, bVisibleCock]);
spooning.add(`{B:name} moans and lowers {B:him}self onto {B:his} side, pressing back against you eagerly.`,
  [playerA, isLustful]);
spooning.add(`Eager for more, {B:name} settles onto {B:his} side, grinding {B:his} hips back against you.`,
  [playerA, isLustful]);
spooning.add(`{B:name} settles onto {B:his} side, {B:his} soaked {pussy} glistening as {B:he} presses back against you.`,
  [playerA, isLustful, bVisiblePussy]);
spooning.add(`{B:name} lowers {B:him}self onto {B:his} side without complaint as you settle in behind {B:him}.`,
  [playerA, isAccepting]);
spooning.add(`Without protest, {B:name} settles onto {B:his} side.`,
  [playerA, isAccepting]);
spooning.add(`{B:name} lowers {B:him}self onto {B:his} side nervously as you settle in behind {B:him}.`,
  [playerA, isFearful]);
spooning.add(`With a shaky breath, {B:name} settles onto {B:his} side.`,
  [playerA, isFearful]);
spooning.add(`{B:name} grumbles, reluctantly settling onto {B:his} side as you settle in behind {B:him}.`,
  [playerA, isResistant]);
spooning.add(`With a huff, {B:name} lies onto {B:his} side, clearly unhappy about it.`,
  [playerA, isResistant]);
spooning.add(`{B:name} thrashes as you pull {B:him} onto {B:his} side, settling in behind {B:him} anyway.`,
  [playerA, isViolent]);
spooning.add(`{B:name} struggles, but you settle in behind {B:him} regardless.`,
  [playerA, isViolent]);
spooning.add(`You lower yourself onto your side, and {A:name} settles in behind you, wrapping an arm warmly around you.`,
  [playerB, isLoving]);
spooning.add(`{A:name} nestles affectionately behind you as you both settle onto your sides.`,
  [playerB, isLoving]);
spooning.add(`{A:name} settles behind you, {A:his} {A:cock.thickCock} resting warmly against your leg.`,
  [playerB, isLoving, aVisibleCock]);
spooning.add(`You lower yourself onto your side, and {A:name} presses against your back with an eager moan.`,
  [playerB, isLustful]);
spooning.add(`{A:name} settles behind you hungrily, grinding {A:his} hips against your ass.`,
  [playerB, isLustful]);
spooning.add(`{A:name} settles behind you, {A:his} {A:cock.bigHardCock} pressing against your ass.`,
  [playerB, isLustful, aHardCock]);
spooning.add(`You lower yourself onto your side, and {A:name} settles in behind you without comment.`,
  [playerB, isAccepting]);
spooning.add(`You settle onto your side, and {A:name} lies down behind you without protest.`,
  [playerB, isAccepting]);
spooning.add(`{A:name} settles in behind you nervously as you lie on your side.`,
  [playerB, isFearful]);
spooning.add(`With a shaky breath, {A:name} nestles in behind you.`,
  [playerB, isFearful]);
spooning.add(`{A:name} grumbles, reluctantly settling in behind you.`,
  [playerB, isResistant]);
spooning.add(`With a huff, {A:name} lies down behind you, clearly unhappy about it.`,
  [playerB, isResistant]);
spooning.add(`{A:name} thrashes as you reach back and pull {A:him} against you anyway.`,
  [playerB, isViolent]);
spooning.add(`{A:name} struggles, but you pull {A:him} in behind you regardless.`,
  [playerB, isViolent]);



straddle.add(`You climb up onto {B:name's} back, straddling {B:his} waist as {B:he} settles down flat with a contented sigh.`,
  [playerA, isLoving]);
straddle.add(`{B:name} lowers {B:him}self onto {B:his} stomach affectionately as you rise up and swing a leg over {B:his} hips.`,
  [playerA, isLoving]);
straddle.add(`You climb up onto {B:name's} back, your {A:cock.thickCock} resting warmly along {B:his} spine as {B:he} settles down flat beneath you.`,
  [playerA, isLoving, aVisibleCock]);
straddle.add(`{B:name} moans as {B:he} lowers {B:him}self flat, arching {B:his} back as you climb up to straddle {B:his} waist.`,
  [playerA, isLustful]);
straddle.add(`Eager for more, {B:name} spreads out beneath you as you rise up and settle astride {B:his} hips.`,
  [playerA, isLustful]);
straddle.add(`{B:name} moans as you climb up, your {A:cock.bigHardCock} dragging along {B:his} back as you settle astride {B:his} hips.`,
  [playerA, isLustful, aHardCock]);
straddle.add(`{B:name} lowers {B:him}self flat onto {B:his} stomach without complaint as you climb up to straddle {B:his} waist.`,
  [playerA, isAccepting]);
straddle.add(`Without protest, {B:name} stretches out beneath you as you settle astride {B:his} hips.`,
  [playerA, isAccepting]);
straddle.add(`{B:name} lowers {B:him}self flat nervously as you climb up to straddle {B:his} waist.`,
  [playerA, isFearful]);
straddle.add(`With a shaky breath, {B:name} lies down flat as you settle astride {B:his} hips.`,
  [playerA, isFearful]);
straddle.add(`{B:name} grumbles, reluctantly lowering {B:him}self flat as you climb up to straddle {B:his} waist.`,
  [playerA, isResistant]);
straddle.add(`With a huff, {B:name} lies down as you settle astride {B:his} hips.`,
  [playerA, isResistant]);
straddle.add(`{B:name} thrashes as you force {B:him} down flat, climbing up to straddle {B:his} waist regardless.`,
  [playerA, isViolent]);
straddle.add(`{B:name} struggles, but you push {B:him} down and settle astride {B:his} hips anyway.`,
  [playerA, isViolent]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist, {A:his} hands warm on your shoulders.`,
  [playerB, isLoving]);
straddle.add(`{A:name} rises up affectionately, swinging a leg over your hips as you settle down flat beneath {A:him}.`,
  [playerB, isLoving]);
straddle.add(`{A:name} climbs up onto your back, {A:his} {A:cock.thickCock} resting warmly along your spine as you settle down flat beneath {A:him}.`,
  [playerB, isLoving, aVisibleCock]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist with an eager little grind of {A:his} hips.`,
  [playerB, isLustful]);
straddle.add(`{A:name} rises up eagerly, settling astride your hips as you spread out beneath {A:him}.`,
  [playerB, isLustful]);
straddle.add(`{A:name} climbs up with a hungry sound, {A:his} {A:cock.bigHardCock} dragging along your back as {A:he} settles astride your hips.`,
  [playerB, isLustful, aHardCock]);
straddle.add(`You lower yourself flat, and {A:name} climbs up to straddle your waist without comment.`,
  [playerB, isAccepting]);
straddle.add(`You stretch out flat, and {A:name} settles astride your hips without protest.`,
  [playerB, isAccepting]);
straddle.add(`{A:name} climbs up nervously to straddle your waist as you lie flat beneath {A:him}.`,
  [playerB, isFearful]);
straddle.add(`With a shaky breath, {A:name} settles astride your hips.`,
  [playerB, isFearful]);
straddle.add(`{A:name} grumbles, reluctantly climbing up to straddle your waist.`,
  [playerB, isResistant]);
straddle.add(`With a huff, {A:name} settles astride your hips, unhappy about the whole thing.`,
  [playerB, isResistant]);
straddle.add(`{A:name} thrashes as you pull {A:him} up to straddle you anyway, {A:his} struggles doing nothing to stop you.`,
  [playerB, isViolent]);
straddle.add(`{A:name} struggles, but you keep pulling {A:him} onto your hips regardless.`,
  [playerB, isViolent]);
