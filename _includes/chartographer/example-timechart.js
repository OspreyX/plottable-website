// Generates a time series with a randomized trend
function randomTimeTrend(numPoints, scaleFactor) {
  var start = new Date().getTime();
  var y = Math.random() * scaleFactor;
  return Array.apply(null, Array(numPoints)).map(function (v, i) {
    y += (0.5 - Math.random()) * scaleFactor * 0.1;
    return { x : new Date(start + i * 1000 * 60 * 60 * 24), y : y };
  });
}

// Create a chart!
new Chartographer.LineChart(randomTimeTrend(50, 100))
  .titleLabel('Otter Evolution')
  .xLabel('Date of Otter Observation')
  .yLabel('Cups stacked per hour')
  .renderTo('#chartographer-example-time');