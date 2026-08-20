
const deepdarkNormal = WeaverPackage('cohort.deepdark-kobolds.normal');
deepdarkNormal.add(`A warband of deepdark kobolds pours out of the shadows!`);
deepdarkNormal.add(`Deepdark kobolds skitter into the torchlight, spears leveled!`);

const deepdarkAmbush = WeaverPackage('cohort.deepdark-kobolds.party-ambushed');
deepdarkAmbush.add(`Deepdark kobolds drop silently from the darkness above!`);
deepdarkAmbush.add(`Deepdark kobolds spring their trap, and the dark is suddenly full of spears!`);

const deepdarkSurprised = WeaverPackage('cohort.deepdark-kobolds.monsters-ambushed');
deepdarkSurprised.add(`You catch a warband of deepdark kobolds unaware!`);
deepdarkSurprised.add(`The deepdark kobolds are too busy bickering to notice your approach!`);

Cohort.register('deepdark-kobolds',{
  monsters:[
    'deepdark-kobold',
    'deepdark-whisperer',
    'kobold-dick-puncher',
    'kobold-runt',
    'kobold-tosser',
    'kobold-trapper',
  ],
  startText:{
    'normal': deepdarkNormal,
    'party-ambushed': deepdarkAmbush,
    'monsters-ambushed': deepdarkSurprised,
  },
});

const flamescaleNormal = WeaverPackage('cohort.flamescale-kobolds.normal');
flamescaleNormal.add(`A warband of flamescale kobolds charges in, shrieking!`);
flamescaleNormal.add(`Flamescale kobolds swagger out of the gloom, looking for a fight!`);

const flamescaleAmbush = WeaverPackage('cohort.flamescale-kobolds.party-ambushed');
flamescaleAmbush.add(`Flamescale kobolds burst from hiding with a triumphant shriek!`);
flamescaleAmbush.add(`A screech from behind — the flamescale kobolds have you surrounded!`);

const flamescaleSurprised = WeaverPackage('cohort.flamescale-kobolds.monsters-ambushed');
flamescaleSurprised.add(`You catch the flamescale kobolds mid-argument, completely unaware!`);
flamescaleSurprised.add(`The flamescale kobolds never hear you coming!`);

Cohort.register('flamescale-kobolds',{
  monsters:[
    'flamescale-kobold',
    'flamescale-screamer',
    'kobold-runt',
    'kobold-sneak-slut',
    'kobold-tosser',
    'kobold-trapper',
  ],
  startText:{
    'normal': flamescaleNormal,
    'party-ambushed': flamescaleAmbush,
    'monsters-ambushed': flamescaleSurprised,
  },
});
