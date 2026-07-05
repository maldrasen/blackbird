
// The bastard archetype is the male equivalent of bitch. Bastards are always sadists or debasers, but never bottoms.
// I wanted to separate bastards and bitches though as there's a definite gender difference between the two dialog
// trees.

const legsCovered = WeaverRequirements.legsAreCovered('T');
const bigCock = WeaverRequirements.minimumCockSize('T', 'big');
const taller = WeaverRequirements.isTallerThan('T', 'P');
const strong = WeaverRequirements.minimumStrength('T', 20);
const wouldSuckWillingly = WeaverRequirements.wouldConsentTo('T', 'suck-cock', Consent.willing);
const wouldSuckReluctantly = WeaverRequirements.wouldConsentTo('T', 'suck-cock', Consent.reluctant);

const eager = WeaverPackage('bastard.propose-training.eager');
const willing = WeaverPackage('bastard.propose-training.willing');
const reluctant = WeaverPackage('bastard.propose-training.reluctant');
const unwilling = WeaverPackage('bastard.propose-training.unwilling');

Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Eager, eager);
Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Willing, willing);
Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Reluctant, reluctant);
Dialog.register(ArchetypeCode.bastard, DialogKeys.proposeTraining_Unwilling, unwilling);



eager.add(`{T:name} grabs your wrist roughly and presses your palm against his thick bulge. "You want to train this? 
  Ha! Bend over then {T:meanName}."`,
  [legsCovered, bigCock]);
eager.add(`{T:name} smirks down at you, one hand lazily tightening around the thick bulge in his {T:equipped.legs}.
  "Heh, Fine... train me. But don't think for a second I'll make this easy on you."`,
  [legsCovered, bigCock, taller]);
eager.add(`{T:name} steps in close, letting you feel the heat radiating off of his broad frame. "Yeah, go ahead and
   try to break me. I could use the laugh."`,
  [strong, taller]);
eager.add(`{T:name} chuckles low, rolling his shoulders so his muscles flex under his shirt. "Alright, {T:meanName}. 
  Train away."`,
  [strong, taller]);
eager.add(`{T:name} leans against the wall with his arms crossed, his cocky grin never fading. "Heh, fine... I'll 
  still be the one making you beg by the end."`);



willing.add(`{T:name} grins and hooks a thumb in his waistband, tugging it low enough to show the root of his
  {T:cock.thick} cock. "All right, I'll let you suck me off"`,
  [legsCovered, wouldSuckWillingly]);
willing.add(`{T:name} chuckles and cracks his neck, the sound sharp, then fixes you with a bored stare.
  "Fine. I'll let you play with me. Just don't cry when I take charge instead."`,
  strong);
willing.add(`{T:name} shrugs, looking you up and down. "Sure, we can let you pretend you're in charge for a bit."`);



reluctant.add(`{T:name} rubs the back of his neck, scowling. "Ugh, fine... I guess I could let you suck me off"`,
  wouldSuckReluctantly);
reluctant.add(`{T:name} snorts, crossing his arms over his chest. "Yeah? All right {T:meanName}, let's see what you got."`);
reluctant.add(`{T:name} shifts his weight, his jaw tight. "This is beneath me... but whatever. Just keep your voice 
  down when I start pounding you."`);



unwilling.add(`{T:name} sneers, adjusting the thick bulge in his pants with zero shame. "You want some of this bitch? Heh, you wish."`,
  [legsCovered, bigCock]);
unwilling.add(`{T:name} laughs, stepping closer so his full height towers over you. "You? Train me? Heh, cute. Fuck off {T:meanName}."`,
  [taller]);
unwilling.add(`{T:name} turns away from you, dismissing you with a wave. "I'm not some bitch you can collar. Take this little fantasy of yours somewhere else."`);
