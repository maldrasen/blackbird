global.PiecewiseCurve = function(zones) {

  // Like a simple curve, a PiecewiseCurve is used to map a range of values onto another range of values. The
  // PiecewiseCurve though defines different zones where the curve shape can be different in each zone. This function
  // builds a function from a list of curve segments:
  //
  //    { xMin:0,   xMax:100,  yMin:0,   yMax:10,  exp:1.0  },
  //    { xMin:100, xMax:200,  yMin:10,  yMax:30,  exp:1.5  },
  //    { xMin:200, xMax:400,  yMin:30,  yMax:70,  exp:2.0  },
  //    { xMin:400, xMax:600,  yMin:70,  yMax:150, exp:2.33 },
  //    { xMin:600, xMax:800,  yMin:150, yMax:250, exp:2.66 },
  //    { xMin:800, xMax:1000, yMin:250, yMax:500, exp:3.0  },
  //
  // The curve segments just take an exponent to define the curve shape. If we need more complex curves this could take
  // a function or something instead. Because of the way the FeelingsComponent works this function also handles the
  // negative values in the same range symmetrically. We also assume that these curves always start at 0. If a
  // coefficient is needed that can be done outside the curve function.
  return input => {
    if (input === 0) { return 0; }

    const value = Math.abs(input);
    let output;

    // Once we find the correct zone, we normalize the input range, apply the
    // exponent, then denormalize to the output range.
    zones.forEach(zone => {
      if (value > zone.xMin && value <= zone.xMax) {
        const normalized = (value - zone.xMin) / (zone.xMax - zone.xMin);
        const curved = Math.pow(normalized, zone.exp);
        output = curved * (zone.yMax - zone.yMin) + zone.yMin;
      }
    });

    if (output == null) {
      throw `Input Value (${input}) was not found within a defined zone.`
    }

    return (input > 0) ? output : output * -1;
  };
}
