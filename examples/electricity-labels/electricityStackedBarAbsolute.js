d3.json("absolute_electricity.json", function(error, data) {
  var xScale = new Plottable.Scale.Time();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color();

  var xAxis = new Plottable.Axis.Time(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");

  var kWH_to_TWH = Math.pow(10, -9);

  var xAccessor = function(d) {
    var year = d.year;
    return new Date(year, 6)
  }

  var legend = new Plottable.Component.HorizontalLegend(colorScale);

  var plot = new Plottable.Plot.StackedArea(xScale, yScale, true)
                      .attr("x", xAccessor, xScale)
                      .attr("y", function(x) {return x.value * kWH_to_TWH}, yScale)
                      .addDataset(data.coal)
                      .addDataset(data.hydroelectric)
                      .addDataset(data.gas)
                      .addDataset(data.nuclear)
                      .addDataset(data.oil)
                      .addDataset(data.other_renewable)
                      .attr("fill", "type", colorScale)

  var table = new Plottable.Component.Table([
      [null,  legend],
      [yAxis, plot],
      [null,  xAxis]
      ]);
  table.renderTo("svg#example-electricity-absolute");
});
