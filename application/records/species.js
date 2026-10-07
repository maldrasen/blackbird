Record.define('Species', {
  getInstance: species => {

    function getAverageHeight(gender=Gender.male) {
      const maleHeight = species.body.maleHeight;
      const femaleHeight = species.body.femaleHeight;
      const futaHeight = (maleHeight + femaleHeight) / 2;

      switch (gender) {
        case Gender.male: return maleHeight;
        case Gender.female: return femaleHeight;
        case Gender.futa: return futaHeight;
      }
    }

    function genderRatio() {
      return getAverageHeight() / species.body.maleHeight
    }

    function getNegotiationGreeting(context) {
      return (species.negotiationGreeting != null) ?
          species.negotiationGreeting.pick(context):
          `[${species.name} Negotiation Greeting]`;
    }

    return {
      getName: () => { return species.name; },
      getAdjective: () => { return species.adjective || species.name; },
      getGenderRatio: () => { return species.genderRatio; },
      getAttributes: () => { return species.attributes; },
      getMana: () => { return species.mana; },
      getHealthFactor: () => { return species.healthFactor; },
      getSpeedFactor: () => { return species.speedFactor; },
      getResistances: () => { return species.resistances; },
      getResistance: type => { return species.resistances[type] || 0; },
      getArchetypes: () => { return species.archetypes; },
      getEquipmentParameters: () => { return species.equipmentParameters; },
      getSensitivities: () => { return species.sensitivities; },
      getSexualPreferences: () => { return species.sexualPreferences; },
      getAspects: () => { return species.aspects; },
      getBody: () => { return species.body; },
      getAverageHeight: getAverageHeight,
      getHeightDeviation: () => { return species.body.heightDeviation; },
      getLengthRatio: () => { return genderRatio(); },
      getAreaRatio: () => { return genderRatio() ** 2; },
      getVolumeRatio: () => { return genderRatio() ** 3; },
      getMutability: () => { return species.body.mutability || 0; },
      getSkinType: () => { return species.body.skinType || 'skin'; },
      getEyeShape: () => { return species.body.eyeShape || 'round'; },
      getEarShape: () => { return species.body.earShape; },
      getTailShape: () => { return species.body.tailShape; },
      getHornShape: () => { return species.body.hornShape; },
      getSmellFamily: () => { return species.body.smellFamily; },
      getNegotiationGreeting,
    };
  },
});
