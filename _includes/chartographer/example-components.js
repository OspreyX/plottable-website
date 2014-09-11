// Generates randomized category data
function randomCategories2(scaleFactor) {
  var categories = ['Water', 'Oil', 'Ketchup', 'Oobleck'];
  return categories.map(function (category, i) {
    return {
      x : category,
      y : Math.random() * scaleFactor
    };
  });
}

// Get the Plottable components
var components = new Chartographer.BarChart(randomCategories2(100))
  .titleLabel('Effects of Fluids on Otter Fur')
  .xLabel('Fluid')
  .yLabel('Runniness')
  .getComponents();

// Re-arrange!
components.yAxis.orient("right");
var table = new Plottable.Component.Table([
  [components.title,  null],
  [components.plot,   components.yAxis, components.yLabel],
  [components.xAxis,  null],
  [components.xLabel, null]
]);

// Render it
table.renderTo('#chartographer-example-components');