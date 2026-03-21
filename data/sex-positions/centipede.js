// First kneeling behind second with face against second's ass. Second bent
// over in front of first. (Rimming and milking handjob position)
SexPosition.register('centipede',{
  name: 'Centipede',

  // Technically can suck cock in this position, but it's weird, having to pull
  // the cock backwards behind the person.
  alignment: {
    first: {
      mouth: [MouthAlignment.ass, MouthAlignment.cock],
      hands: [HandAlignment.ass, HandAlignment.breasts, HandAlignment.cock],
    },
    second: {
      cock: [CockAlignment.rubbed, CockAlignment.sucked],
      ass: [AssAlignment.eaten, AssAlignment.fingered],
    },
  },

  moves:[
    { code:'doggy-style', generator:moveDoggyStyle },
    { code:'kneeling-service', generator:moveKneelingService, switch:true },
  ],

  generateRearrange: rearrange,
});

// TODO: For all of these functions, we need to take the partner's attitude into consideration. These messages
//   should be fairly different depending on how they feel about the sex action that's about to be performed. I'm
//   really just getting started with the sex position implementation though, so this is probably fine for now.

function rearrange(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    options.push(`Gently placing your hand on {B:name's} back, you push {B:him} down into a kneeling position in 
      front of you. Then, once {B:his} ass is raised high in the air, you kneel behind {B:him}, pressing your face 
      between {B:his} ass cheeks.`);
  }

  if (b.isPlayer()) {
    options.push(`You give {A:name} a sly wink, slowly bending over in front of {A:him}. {A:He} watches as you raise 
      your ass high in the air, then with a lustful look on {A:his} face, {A:He} kneels behind you, pushing {A:his} 
      face between your ass cheeks.`);
  }

  return Random.from(options);
}

function moveDoggyStyle(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    options.push(`You raise up and grab {B:name's} hips, positioning yourself behind {B:him}.`);
    if (a.hasNormalCock()) {
      options.push(`You raise up behind {B:name}, grabbing {B:his} hips and letting your
        {A:cock.sixInch} long {cock} rest against the swell of {B:his} upturned ass.`);
    }
  }

  if (b.isPlayer()) {
    options.push(`{A:Name} raises up and grabs your hips, positioning {A:him}self behind you.`);
    if (b.hasNormalCock()) {
      options.push(`You feel {A:name} raising up behind you, grabbing your hips and letting 
        {A:his} {A:cock.sixInch} long {cock} rest against the swell of your upturned ass.`);
    }
  }

  return Random.from(options);
}

function moveKneelingService(context) {
  const a = Character(context.A);
  const b = Character(context.B);
  const options = [];

  if (a.isPlayer()) {
    options.push(`As {B:name} starts to stand you grab onto {B:his} hips, 
      keeping your face pressed firmly between {B:his} ass cheeks.`);
  }
  if (b.isPlayer()) {
    options.push(`From your position kneeling in front of {A:name}, you reach back to grab hold of {A:his} head,
      keeping {A:his} face pressed firmly between the cheeks of your ass as you move to stand in front of {A:him}.`);
  }

  return Random.from(options);
}
