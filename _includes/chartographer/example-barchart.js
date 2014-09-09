// Generates randomized category data
function randomCategories(numPoints, scaleFactor) {
  var categories = ['Sea', 'River', 'Pool', 'Puddle'];
  return Array.apply(null, Array(categories.length)).map(function (v, i) {
    return {
      x : categories[i % 4],
      y : Math.random() * scaleFactor
    };
  });
}

// Create a chart!
new Chartographer.BarChart(randomCategories(100))
  .titleLabel('Otter Classification')
  .xLabel('Otter Species')
  .yLabel('Time to Stack Cup')
  .renderTo('#chartographer-example-bar');