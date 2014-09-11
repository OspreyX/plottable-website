// Source: http://www.tylervigen.com/view_correlation?id=3890
d3.tsv("data.tsv", function(error, data) {
  // Parse Data
  var keys      = d3.keys(data[0]);
  var parseDate = d3.time.format("%Y").parse;
  data = data.slice(1).map(function (d) {
    return {
      date    : parseDate(d[keys[0]]),
      cheese  : +d[keys[1]],
      degrees : +d[keys[2]]
    };
  });

  // Scales
  var xScale     = new Plottable.Scale.Time();
  var yScale0    = new Plottable.Scale.Linear();
  var yScale1    = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color("Category10");

  // Plot Components
  var title   = new Plottable.Component.TitleLabel("Spurious Correlation");
  var xLabel  = new Plottable.Component.Label("Year");
  var yLabel0 = new Plottable.Component.Label(keys[1], "left");
  var yLabel1 = new Plottable.Component.Label(keys[2], "right");
  var xAxis   = new Plottable.Axis.Time(xScale, "bottom");
  var yAxis0  = new Plottable.Axis.Numeric(yScale0, "left");
  var yAxis1  = new Plottable.Axis.Numeric(yScale1, "right");
  var plot0   = new Plottable.Plot.Line(data, xScale, yScale0)
    .project("x", "date", xScale)
    .project("y", "cheese", yScale0)
    .project("stroke", colorScale.scale(0));
  var plot1   = new Plottable.Plot.Line(data, xScale, yScale1)
    .project("x", "date", xScale)
    .project("y", "degrees", yScale1)
    .project("stroke", colorScale.scale(1));
  var plots = new Plottable.Component.Group([plot0, plot1]);

  // Layout and render
  new Plottable.Component.Table([
    [null,    null,   title,  null,   null],
    [yLabel0, yAxis0, plots,  yAxis1, yLabel1],
    [null,    null,   xAxis,  null,   null],
    [null,    null,   xLabel, null,   null]
  ])
  .renderTo(d3.select('svg#example'));
});