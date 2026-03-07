Episode.register('propose-training',{
  layout: 'centered',
  pages: [{ contentFunction:generate, buttons:[{ standard:'continue' }] }],
});

function generate() {
  const partner = EpisodeController.getContext().T;
  const personality = Personality(partner);
  const archetype = personality.getArchetype();
  const attitude = personality.attitudeTowardsTraining();

  if (attitude === TrainingAttitude.eager) { return `<div>${eagerText(archetype, partner)}</div>`; }
  if (attitude === TrainingAttitude.willing) { return `<div>${willingText(archetype, partner)}</div>`; }
  if (attitude === TrainingAttitude.reluctant) { return `<div>${reluctantText(archetype, partner)}</div>`; }

  if (attitude === TrainingAttitude.unwilling) {
    return `<div>
      <div>${unwillingText(archetype)}<div>
      <div>(Unwilling Partner Options)</div>
    </div>`
  }

  throw `Unimplemented training attitude: ${attitude}`;
}

function eagerText(archetype, partner) {
  switch(archetype) {
    case Architype.innocent: return `{T:name} looks up at you with wide frightened eyes, "I... okay. I trust you. 
      Just... be gentle with me?"`;
    case Architype.prude: return `{T:name} stiffens, then exhales slowly. "...Fine. That is my purpose here I 
      suppose."`;
    case Architype.slut: return ` {T:name} licks {T:his} lips and is already moving toward you before you finish
      speaking. "Fuck yes. Let go."`;
    case Architype.sweet: return `{T:name} smiles warmly and takes your hand. "Of course. I really just want to make 
      you happy. Whatever you need."`;
    case Architype.playful: return `{T:name} laughs and bends over a little in front of you, wiggling {T:his} ass 
      invitingly. "Finally! Come and take it then."`;
    case Architype.brat: return `{T:name} crosses {T:his} arms and smirks. "Training? Fine. But I'm not making it 
      easy on you."`;
    case Architype.serious: return `{T:name} gives a single, decisive nod. "Alright. Let's not waste time then."`;
    case Architype.heartless: return `{T:name} looks you over with cold amusement. "Oh? You want to play? Fine. Just
      know I won't go easy on you."`;
    case Architype.timid: return `{T:name} looks startled, then breaks into a sudden, nervous smile. "Oh! Um... yes. 
      Yes, okay. Sorry, you just surprised me."`;
    case Architype.bitch: return `{T:name} looks you up and down, then smirks. "Fine. But you better leave me 
      satisfied."`;
    case Architype.reserved: return `{T:name} pauses, then nods once. "Yes. I'm ready when you are."`;
    case Architype.koboldDom: return `{T:name} bares {T:his} teeth in a sharp grin. "Training? You want {T:name} to 
      train you? Ha! Fine. Then this one will show you no mercy."`;
    case Architype.koboldSub: return `{T:name} drops {T:his} gaze immediately, ears flat and tail slowly raising 
      upward. "Of course master. Use this one however you want."`;
  }

  // TODO: We actually need to check breast size and gender here.
  if (archetype === Architype.bimbo) {
    return `{T:name} bounces in place, {T:his} {T:breasts.bigTits} swinging enticingly, "Training? Sure! Let's do it 
      right now!"`;
  }

  // TODO: I think I need a function to get their top fetishes first.
  if (archetype === Architype.pervert) {
    return `TODO: Eager perverted suggestions.`
  }
}

function willingText(archetype, partner) {
  switch(archetype) {
    case Architype.innocent: return `{T:name} hesitates, cheeks flushing pink. "I've never really... but if you think 
      it's okay, then... alright."`;
    case Architype.bimbo: return `{T:name} grins and twirls a strand of {T:body.hairColor} hair around {T:his} finger. 
      "Umm, sure! That sounds fun."`;
    case Architype.prude: return `{T:name} crosses {T:his} arms and looks away. "I suppose if it must happen, then it 
      must. Just don't expect me to like it."`;
    case Architype.sweet: return `"You want to... train me?" {T:name} nods gently. "Okay. I'll try my best."`;
    case Architype.playful: return `{T:name} taps {T:his} chin with one finger, pretending to think it over. "Hmm... 
      okay, sure, let's do it."`;
    case Architype.brat: return `{T:name} shrugs with exaggerated indifference. "Whatever, sure. Just don't expect me 
      to do all the work."`;
    case Architype.serious: return `{T:name} meets your gaze evenly. "I can do that. Just tell me what you need."`;
    case Architype.heartless: return `"Training?" {T:name} shrugs. "Sure. It's not like I have anything better to do."`;
    case Architype.timid: return `{T:name} flinches slightly, then steadies. "Training? Um... I can do that. Just... 
      be gentle with me."`;
    case Architype.bitch: return `{T:name} heaves a dramatic sigh. "Training? Is that what you call it? Whatever, 
      just try not to bore me."`;
    case Architype.reserved: return `{T:name} considers for a moment before answering. "Alright. I don't have any 
      objections."`;
    case Architype.koboldDom: return `{T:name} clicks {T:his} claws together, sizing you up. "Training? You mean 
      sex yes?"`;
    case Architype.koboldSub: return `{T:name} nods briefly before turning around and lifting {T:his} tail."`;
  }

  // TODO: We want a version where they're thrusting their tits out.
  if (archetype === Architype.slut) {
    return `{T:name} smiles lazily and stretches. "Sure, I've got nothing better going on.`;
  }

  // TODO: Again with the perverse suggestions.
  if (archetype === Architype.pervert) {
    return `{T:name} leans against the wall with a slow grin. "Yeah, I'm in. I've got a few ideas if you want to hear 
      them."`;
  }
}

function reluctantText(archetype, partner) {
  switch(archetype) {
    case Architype.innocent: return `{T:name} wrings {T:his} hands, avoiding your gaze. "Training? I don't know if 
      I'm ready for something like that..."`;
    case Architype.bimbo: return `{T:name} tilts {T:his} head, looking a little confused. "I guess? I mean... it's 
      kind of a lot. But okay, sure."`;
    case Architype.prude: return `{T:name}'s expression tightens with visible distaste. "What a deeply uncomfortable 
      thing to ask of someone... Fine. Let's just... get it over with."`;
    case Architype.slut: return `{T:name} raises an eyebrow. "I guess. It's not like I'm going to say no."`;
    case Architype.pervert: return `{T:name} yawns and scratches the back of {T:his} neck. "Ehh sure, just try to 
      make it interesting for me, K?"`;
    case Architype.sweet: return `{T:name} looks down at {T:his} hands. "I want to say yes for your sake, but... I'm
      a little scared."`;
    case Architype.playful: return `{T:name} squints at you with a lopsided grin. "You're serious? Alright, but you 
      owe me one."`;
    case Architype.brat: return `{T:name} snorts. "Wow, really? You've got some nerve asking. Maybe you'll just have
      to make me."`;
    case Architype.serious: return `{T:name}'s jaw tightens slightly. "Hmm, well. If you think it's absolutely 
      necessary."`;
    case Architype.heartless: return `{T:name} regards you with barely concealed contempt. "Oh? I might let you, if 
      you can convince me it's worth my time."`;
    case Architype.timid: return `{T:name} pulls {T:his} arms in close. "What? I don't... I'm not sure. Can I think
      about it?"`;
    case Architype.bitch: return `{T:name} narrows {T:his} eyes. "You think I'd just agree to let you touch me like 
      that?"`;
    case Architype.reserved: return `{T:name} is quiet for a beat. "Well... I'm not opposed. I just need a moment."`;
    case Architype.koboldDom: return `{T:name} snorts a puff of hot air. "You have a lot to learn {P:species.name}. 
      Kobolds never ask. We just take."`;
    case Architype.koboldSub: return `{T:name} frowns a little and nods. "If that's what you want from me."`;
  }
}

function unwillingText(archetype, partner) {
  switch(archetype) {
    case Architype.innocent: return `"Training?" {T:name} takes a small step back, {T:her} eyes wide. "No, I... I 
      really don't think I can do something like that."`;
    case Architype.bimbo: return `{T:name} pouts and shakes {T:his} head. "No, I don't wanna. I've got like, a
      headache or something."`;
    case Architype.prude: return `{T:name} fixes you with a cold stare. "No. Absolutely not."`;
    case Architype.slut: return `{T:name} gives you a flat look. "Mmm... nope. Not interested. Find someone else."`;
    case Architype.pervert: return `{T:name} looks up and and down before laughing. "Haha, no. I'll happily suck off a
      horse or whatever. But you? No. Not interested."`;
    case Architype.sweet: return `{T:name} shakes {T:his} head, {T:his} voice quiet but firm. "I'm sorry, I'm just not 
      ready for that yet. Please don't be upset with me."`;
    case Architype.playful: return `{T:name} sticks out {T:his} tongue. "Nope! Not happening. Ask again maybe 
      sometime never."`;
    case Architype.brat: return `{T:name} rolls {T:his} eyes so hard it looks painful. "With you? No. Dream on."`;
    case Architype.serious: return `{T:name} holds up a hand, voice flat. "No. That's my final answer."`;
    case Architype.heartless: return `{T:name} laughs, short and sharp. "You? Seriously? Get out of my sight."`;
    case Architype.timid: return `{T:name} shrinks back, shaking {T:his} head quickly. "I'm sorry, please. I just...
      can't do that."`;
    case Architype.bitch: return `{T:name} gives you a withering look. "Of course not. It's insulting that you even 
      asked."`;
    case Architype.reserved: return `{T:name} shakes {T:his} head without any particular emotion. "No. I would prefer 
      not to."`;
    case Architype.koboldDom: return `{T:name} snarls, the spines on his head rising. "Try it {P:species.name}, and 
      see what happens."`;
    case Architype.koboldSub: return `{T:name} backs against the wall, {T:his} claws scraping against the hard floor.
      "No... don't hurt me."`;
  }
}
