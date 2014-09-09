// Generates randomized x/y data
function randomScatterData(numPoints, scaleFactor) {
  return Array.apply(null, Array(numPoints)).map(function (v, i) {
    return {
      x : (1 + Math.random()) * scaleFactor,
      y : (1 + Math.random()) * scaleFactor
    };
  });
}

// Create a chart!
new Chartographer.ScatterChart(randomScatterData(50, 100))
  .titleLabel('Otter Distribution')
  .xLabel('Otter Height (cm)')
  .yLabel('Otter Weight (GmP)')
  .renderTo('#chartographer-example-scatter');