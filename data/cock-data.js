global.CockData = {

  // Also used for some sex toy size categories.
  CockSizes: {
    tiny:     { min:24,  max:103,  minWidth:19, maxWidth:25, cumVolume:2 },   // length 1" - 4"   | width .75" - 1"
    small:    { min:103, max:178,  minWidth:25, maxWidth:32, cumVolume:5 },   // length 4" - 7"   | width 1" - 1.25"
    average:  { min:178, max:228,  minWidth:32, maxWidth:38, cumVolume:10 },  // length 7" - 9"   | width 1.25" - 1.5"
    big:      { min:228, max:305,  minWidth:38, maxWidth:44, cumVolume:20 },  // length 9" - 12"  | width 1.5" - 1.75"
    huge:     { min:305, max:405,  minWidth:44, maxWidth:50, cumVolume:35 },  // length 12" - 16" | width 1.75" - 2"
    monster:  { min:405, max:508,  minWidth:50, maxWidth:57, cumVolume:60 },  // length 16" - 20" | width 2" - 2.25"
    giant:    { min:508, max:660,  minWidth:57, maxWidth:70, cumVolume:120 }, // length 20" - 26" | width 2.25" - 2.75"
    titanic:  { min:660, max:814,  minWidth:70, maxWidth:90, cumVolume:250 }, // length 26" - 32" | width 2.75" - 3.5"
  },

  CockShapes: {
    normal:  {},
    horse:   { sheath:true, headFlare:true },
    dog:     { sheath:true, knot:true },
    dragon:  { sheath:true, internalTesticles:true },
  }

};
