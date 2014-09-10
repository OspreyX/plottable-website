var data = [
    { x: "a", y: "d", value: 3 }, { x: "a", y: "e", value: 4 }, { x: "a", y: "f", value: 7 },
    { x: "b", y: "d", value: 1 }, { x: "b", y: "e", value: 6 }, { x: "b", y: "f", value: 8 },
    { x: "c", y: "d", value: 9 }, { x: "c", y: "e", value: 2 }, { x: "c", y: "f", value: 5 }];

// Scales
var xScale     = new Plottable.Scale.Ordinal();
var yScale     = new Plottable.Scale.Ordinal();
var colorScale = new Plottable.Scale.InterpolatedColor();

// Plot Components
var xLabel = new Plottable.Component.Label("Category");
var yLabel = new Plottable.Component.Label("Classification", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Category(yScale, "left");
var plot   = new Plottable.Plot.Grid(data, xScale, yScale, colorScale);

// Layout and render
new Plottable.Component.Table([
  [yLabel, yAxis, plot],
  [null,   null, xAxis],
  [null,   null, xLabel]
])
.renderTo(d3.select('svg#example'));


