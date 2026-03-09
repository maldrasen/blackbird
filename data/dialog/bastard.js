
// The bastard archetype is the male equivalent of bitch, in that the only interesting thing about them is that they're
// kind of mean. I wanted to separate bastards and bitches though as there's a definite gender difference between the
// two dialog trees.

Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Eager, context => {
  const partner = Character(context.T);
  const options = [];

  if (partner.isWearingPants() && partner.cockIsAtLeast('big')) {
    options.push(`{T:name} grabs your wrist roughly and presses your palm against his 
      thick bulge. "You want to train this? Ha! Bend over then {P:insultingName}."`)

    if (partner.isTallerThan(context.P)) {
      options.push(`{T:name} smirks down at you, one hand lazily tightening around the thick bulge in his
        {T:equipped.pants}. "Heh, Fine... train me. But don't think for a second I'll make this easy on you."`);
    }
  }

  if (partner.isStrongerThan(20) && partner.isTallerThan(context.P)) {
    options.push(`{T:name} steps in close, letting you feel the heat radiating off 
      of his broad frame. "Yeah, go ahead and try to break me. I could use the laugh."`)
    options.push(`{T:name} chuckles low, rolling his shoulders so his muscles 
      flex under his shirt. "Alright, {P:insultingName}. Train away."`)
  }

  options.push(`{T:name} leans against the wall with his arms crossed, his cocky grin 
    never fading. "Heh, fine... I'll still be the one making you beg by the end."`)

  return Random.from(options);
});

Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Willing, context => {
  const partner = Character(context.T);
  const options = [];

  if (partner.isWearingPants() && partner.wouldConsentTo('suck-cock')) {
    options.push(`{T:name} grins and hooks a thumb in his waistband, tugging it low enough to 
      show the root of his {T:cock.thick} cock. "All right, I'll let you suck me off"`)
  }

  if (partner.isStrongerThan(20)) {
    options.push(`{T:name} chuckles and cracks his neck, the sound sharp, then fixes you with a 
      bored stare. "Fine. I'll let you play with me. Just don't cry when I take charge instead."`)
  }

  options.push(`{T:name} shrugs, looking you up and down. "Sure, we can
    let you pretend you're in charge for a bit."`)

  return Random.from(options);
});

Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Reluctant, context => {
  const partner = Character(context.T);
  const options = [];

  if (partner.wouldConsentTo('suck-cock', Consent.reluctant)) {
    options.push(`{T:name} rubs the back of his neck, scowling. "Ugh, fine... I could let you suck me off"`);
  }

  options.push(`{T:name} snorts, crossing his arms over his chest. 
    "Yeah? All right {P:insultingName}, let's see what you got."`)
  options.push(`{T:name} shifts his weight, his jaw tight. "This is beneath me... 
    but whatever. Just keep your voice down when I start pounding you."`)

  return Random.from(options);
});

Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Unwilling, context => {
  const partner = Character(context.T);
  const options = [];

  if (partner.isWearingPants() && partner.cockIsAtLeast('big')) {
    options.push(`{T:name} sneers, adjusting the thick bulge in his pants with 
      zero shame. "You want some of this bitch? Heh, you wish."`)
  }
  if (partner.isTallerThan(context.P)) {
    options.push(`{T:name} laughs, stepping closer so his full height towers
      over you. "You? Train me? Heh, cute. Fuck off {P:insultingName}."`)
  }

  options.push(`{T:name} turns away from you, dismissing you with a wave. "I'm not 
    some bitch you can collar. Take your little fantasy somewhere else."`)

  return Random.from(options);
});

