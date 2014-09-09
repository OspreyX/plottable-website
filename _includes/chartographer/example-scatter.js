// Generates randomized x/y data
function randomScatterData(numPoints, scaleFactor) {
  return Array.apply(null, Array(numPoints)).map(function (v, i) {
    return {
      x : (1 - 2 * Math.random()) * scaleFactor,
      y : (1 - 2 * Math.random()) * scaleFactor
    };
  });
}

// Create a chart!
new Chartographer.ScatterChart(randomScatterData(50, 100))
  .titleLabel('Otter Distribution')
  .xLabel('Otter Height')
  .yLabel('Otter Weight')
  .renderTo('#chartographer-example-scatter');