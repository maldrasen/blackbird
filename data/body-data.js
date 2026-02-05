global.BodyData = {

  ScaleColors: ['red','gold','green','blue','purple','black','gray'],

  HumanSkinTones: ['porcelain','ivory','fair','light','warm','medium','olive','golden','sunkissed','tan',
    'caramel','richTan','deepTan','richBrown','deepBrown','darkBrown','ebony'],
  LightHumanSkinTones: ['porcelain','ivory','fair','light'],
  DarkHumanSkinTones: ['richBrown','deepBrown','darkBrown','ebony'],

  CommonHairColors: ['white','platinumBlond','blond','strawberryBlond','goldenBlond','darkBlond','lightBrown',
    'brown','copper','auburn','chestnut','darkBrown','blackBrown','black','jetBlack','darkRed','red','gray'],
  UncommonHairColors: ['lightBlue','blue','darkBlue','lightGreen','green','darkGreen','lightPurple','purple',
    'darkPurple'],

  EyeShapes: ['round','dragon','cat','heart'],
  CommonEyeColors: ['brown','hazel','amber','green','blue','gray','black'],
  UncommonEyeColors: ['purple','pink','red','gold'],

  EarShapes: ['cat','dog','elf','fox','horse','human','rabbit'],
  UncommonEarShapes: ['cat','dog','fox','horse','rabbit'],

  HornShapes: ['deer','curved-ram','forward-cow','curved-back','unicorn'],
  TailShapes: ['cat','cow','demon','dog','dragon','fox','horse','rabbit'],

  EarthySmells: ['rain','pine','sage','freshCutGrass','sandalwood','cedar','clover','woodsmoke','patchouli'],
  FloralSmells: ['jasmine','rose','lavender','honeysuckle','vanilla','peach','orange','strawberry'],
  LustySmells: ['cinnamon','clove','blackPepper','leather','cardamom','honey','oak']
}

BodyData.EyeColors = [ ...BodyData.CommonEyeColors, ...BodyData.UncommonEyeColors ];
BodyData.HairColors = [ ...BodyData.CommonHairColors, ...BodyData.UncommonHairColors ];
BodyData.AllSmells = [ ...BodyData.EarthySmells, ...BodyData.FloralSmells, ...BodyData.LustySmells ];
