// Generates randomized category data
function randomCategories(scaleFactor) {
  var categories = ['Stack Cups', 'Look Adorable', 'Eat Fish', 'Chess', 'Marco Polo'];
  return categories.map(function (category, i) {
    return {
      x : category,
      y : Math.random() * scaleFactor
    };
  });
}

// Create a chart!
new Chartographer.BarChart(randomCategories(100))
  .titleLabel('Otter Games')
  .xLabel('Game Name')
  .yLabel('Popularity Amongst Otters')
  .renderTo('#chartographer-example-bar');