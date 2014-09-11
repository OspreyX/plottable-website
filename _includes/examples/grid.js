var data = [
    { x: "Otter", y: "Stacking", value: 9 },
    { x: "Otter", y: "Swimming", value: 8 },
    { x: "Otter", y: "Plotting", value: 10 },
    { x: "Stoat", y: "Stacking", value: 3 },
    { x: "Stoat", y: "Swimming", value: 1 },
    { x: "Stoat", y: "Plotting", value: 2 },
    { x: "Mink",  y: "Stacking", value: 2 },
    { x: "Mink",  y: "Swimming", value: 5 },
    { x: "Mink",  y: "Plotting", value: 2 }];

// Scales
var xScale     = new Plottable.Scale.Ordinal();
var yScale     = new Plottable.Scale.Ordinal();
var colorScale = new Plottable.Scale.InterpolatedColor();

// Plot Components
var title  = new Plottable.Component.TitleLabel("Mustelidae Skills");
var units  = new Plottable.Component.Label("Red is more");
var xLabel = new Plottable.Component.Label("Species");
var yLabel = new Plottable.Component.Label("Skill", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Category(yScale, "left");
var plot   = new Plottable.Plot.Grid(data, xScale, yScale, colorScale);

// Layout and render
new Plottable.Component.Table([
  [null,   null,  title],
  [null,   null,  units],
  [yLabel, yAxis, plot],
  [null,   null,  xAxis],
  [null,   null,  xLabel]
])
.renderTo(d3.select('svg#example'));


