// Source: http://www.star941fm.com/photos/main/celebrity-heights-from-small-to-tall-363472/21379533/#/0/21379533
var data   = [
  {x: "Verne Troyer",      y: 81},
  {x: "Olson Twins",       y: 152},
  {x: "Miley Cyrus",       y: 165},
  {x: "Tom Cruise",        y: 170},
  {x: "Leonardo DiCaprio", y: 183},
  {x: "Conan O'Brien",     y: 193},
  {x: "Liam Neeson",       y: 198},
  {x: "Sultan Kösen",      y: 246}
];

// Scales
var xScale = new Plottable.Scale.Ordinal();
var yScale = new Plottable.Scale.Linear();

// Plot Components
var title  = new Plottable.Component.TitleLabel("Celebrities");
var yLabel = new Plottable.Component.Label("Height (cm)", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
var lines  = new Plottable.Component.Gridlines(null, yScale);
var plot   = new Plottable.Plot.VerticalBar(data, xScale, yScale)
  .animate(true);

// Layout and render
new Plottable.Component.Table([
  [null,    null, title],
  [yLabel, yAxis, lines.merge(plot)],
  [null,    null, xAxis]
])
.renderTo(d3.select('svg#example'));
