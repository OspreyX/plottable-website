// Generates a random trend
function randomTrend(numPoints, scaleFactor) {
  var y = Math.random() * scaleFactor;
  return Array.apply(null, Array(numPoints)).map(function (v, i) {
    y += (0.5 - Math.random()) * scaleFactor * 0.1;
    return { x : i, y : y };
  });
}

// Create a chart!
new Chartographer.LineChart(randomTrend(50, 100))
  .titleLabel('Otter Trends')
  .xLabel('Number of Otters')
  .yLabel('Otter Playfulness')
  .renderTo('#chartographer-example-line');