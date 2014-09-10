var data   = [{x : 'Left', y : 10}, {x : 'Right', y : 20}];

// Scales
var xScale = new Plottable.Scale.Ordinal();
var yScale = new Plottable.Scale.Linear();

// Plot Components
var yLabel = new Plottable.Component.Label("Amount", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
var lines  = new Plottable.Component.Gridlines(null, yScale);
var plot   = new Plottable.Plot.VerticalBar(data, xScale, yScale)
  .animate(true);

// Layout and render
new Plottable.Component.Table([
  [yLabel, yAxis, lines.merge(plot)],
  [null,    null, xAxis]
])
.renderTo(d3.select('svg#example'));
