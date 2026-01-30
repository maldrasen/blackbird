global.MathHelper = {

  // Points should have the format { x:0, y:0 }
  distanceBetweenPoints: function(a,b) {
    let x = a.x - b.x
    let y = a.y - b.y

    x = x * x;
    y = y * y;

    return Math.floor(Math.sqrt(x+y))
  }

};
