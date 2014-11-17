var data0  = [{x : 'Left', y : 10}, {x : 'Right', y : 20}];
var data1  = [{x : 'Left', y : 12}, {x : 'Right', y : 5}];

// Save index to each datum for colorScale
[data0, data1].forEach(function(data, i){
  data.forEach(function(d){
    d.i = i;
  });
});

// Scales
var xScale     = new Plottable.Scale.Ordinal();
var yScale     = new Plottable.Scale.Linear();
var colorScale = new Plottable.Scale.Color("Category10");

// Plot Components
var title  = new Plottable.Component.TitleLabel("Comparison of Bars", "horizontal" );
var legend = new Plottable.Component.HorizontalLegend(colorScale);
var yLabel = new Plottable.Component.Label("Amount", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
var lines  = new Plottable.Component.Gridlines(null, yScale);
var plot   = new Plottable.Plot.StackedBar(xScale, yScale)
  .animate(true)
  .addDataset(data0)
  .addDataset(data1)
  .attr("fill", function(d){return "Series #" + d.i;}, colorScale);

// Layout and render
new Plottable.Component.Table([
  [null,    null, title],
  [null,    null, legend],
  [yLabel, yAxis, lines.merge(plot)],
  [null,    null, xAxis]
])
.renderTo("svg#example");
