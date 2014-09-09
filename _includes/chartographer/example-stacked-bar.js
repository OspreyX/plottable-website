// Generates randomized category data
function randomStackedCategories(numPoints, scaleFactor) {
  var categories = ['Sea', 'River', 'Pool', 'Puddle'];
  return Array.apply(null, Array(numPoints)).map(function (v, i) {
    return {
      x : categories[i % 4],
      y : Math.random() * scaleFactor
    };
  });
}

// Create a chart!
new Chartographer.StackedBarChart(randomStackedCategories(50, 100))
  .titleLabel('Otter Classification')
  .xLabel('Otter Species')
  .yLabel('Time to Stack Cup')
  .renderTo('#chartographer-example-stacked-bar');