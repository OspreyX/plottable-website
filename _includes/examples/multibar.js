var data0  = [{x : 'Left', y : 10}, {x : 'Right', y : 20}];
var data1  = [{x : 'Left', y : 10}, {x : 'Right', y : 5}];

// Scales
var xScale     = new Plottable.Scale.Ordinal();
var yScale     = new Plottable.Scale.Linear();
var colorScale = new Plottable.Scale.Color("Category10");

// Plot Components
var title   = new Plottable.Component.TitleLabel("Comparison of Bars", "horizontal" );
var legend  = new Plottable.Component.HorizontalLegend(colorScale);
var yLabel0 = new Plottable.Component.Label("Amount", "left");
var yLabel1 = new Plottable.Component.Label("Amount", "left");
var yAxis0  = new Plottable.Axis.Numeric(yScale, "left");
var yAxis1  = new Plottable.Axis.Numeric(yScale, "left");
var xAxis   = new Plottable.Axis.Category(xScale, "bottom");
var plot0   = new Plottable.Plot.VerticalBar(xScale, yScale)
  .addDataset(data0)
  .animate(true)
  .attr("fill", function(){return "Top";}, colorScale);
var plot1   = new Plottable.Plot.VerticalBar(xScale, yScale)
  .addDataset(data1)
  .animate(true)
  .attr("fill", function(){return "Bottom";}, colorScale);

// Layout and render
new Plottable.Component.Table([
  [null,    null,   title],
  [null,    null,   legend],
  [yLabel0, yAxis0, plot0],
  [yLabel1, yAxis1, plot1],
  [null,    null,   xAxis]
])
.renderTo("svg#example");
