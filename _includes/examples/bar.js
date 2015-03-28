// Source: http://www.star941fm.com/photos/main/celebrity-heights-from-small-to-tall-363472/21379533/#/0/21379533
var data   = [
  {name: "Verne Troyer",      height: 81},
  {name: "Olson Twins",       height: 152},
  {name: "Miley Cyrus",       height: 165},
  {name: "Tom Cruise",        height: 170},
  {name: "Leonardo DiCaprio", height: 183},
  {name: "Conan O'Brien",     height: 193},
  {name: "Liam Neeson",       height: 198},
  {name: "Sultan Kösen",      height: 246}
];

// Scales
var xScale = new Plottable.Scale.Category();
var yScale = new Plottable.Scale.Linear();

// Plot Components
var title  = new Plottable.Component.TitleLabel("Celebrities");
var yLabel = new Plottable.Component.Label("Height (cm)", "left");
var xAxis  = new Plottable.Axis.Category(xScale, "bottom");
var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
var lines  = new Plottable.Component.Gridlines(null, yScale);
var plot   = new Plottable.Plot.Bar(xScale, yScale, true)
  .addDataset(data)
  .project("x", "name", xScale)
  .project("y", "height", yScale)
  .animate(true);

// Layout and render
new Plottable.Component.Table([
  [null,    null, title],
  [yLabel, yAxis, lines.below(plot)],
  [null,    null, xAxis]
])
.renderTo("svg#example");
