d3.json("data/2012_stacked_bar.json", function(error, data) {
  var xScale = new Plottable.Scale.Ordinal();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color();

  var xAxis = new Plottable.Axis.Category(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");

  var kWH_to_TWH = Math.pow(10, -9);

  var legend = new Plottable.Component.HorizontalLegend(colorScale);

  var plot = new Plottable.Plot.StackedBar(xScale, yScale, true)
                      .attr("x", "country", xScale)
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
  table.renderTo("svg#example-electricity-stacked-bar");
});
