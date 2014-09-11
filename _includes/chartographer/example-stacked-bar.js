// Generates randomized category data
function randomStackedCategories(numSeries, scaleFactor) {
  var categories = ['Sea', 'River', 'Pool', 'Puddle'];
  var data = {};
  for(i = 0; i < numSeries; i++){
    data['Cup #' + (i + 1)] = categories.map(function (category, i) {
      return {
        x : category,
        y : Math.random() * scaleFactor
      };
    });
  }
  return data;
}

// Create a chart!
new Chartographer.StackedBarChart(randomStackedCategories(5, 100))
  .titleLabel('Otter Efficiency')
  .xLabel('Otter Species')
  .yLabel('Time to Stack Cup')
  .renderTo('#chartographer-example-stacked-bar');