d3.json("data/2012_stacked_bar.json", function(error, data) {
  var xScale = new Plottable.Scale.Ordinal();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color();

  var formatter = Plottable.Formatters.percentage(0, false);

  var xAxis = new Plottable.Axis.Category(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left", formatter);

  var kWH_to_TWH = Math.pow(10, -9);

  var legend = new Plottable.Component.HorizontalLegend(colorScale);

  var countries = ["United States", "China", "European Union", "India", "Japan", "Russian Federation"];
  var typeKeys = ["coal", "hydroelectric", "gas", "nuclear", "oil", "other_renewable"]
  var percentageAccessor = function(x) {
    var countryIndex = countries.indexOf(x.country);
    var val = x.value;
    var totalVal = d3.sum(typeKeys, function(k) {return data[k][countryIndex].value});
    return val / totalVal;
  }

  var plot = new Plottable.Plot.StackedBar(xScale, yScale, true)
                      .attr("x", "country", xScale)
                      .attr("y", percentageAccessor, yScale)
                      .addDataset(data.coal)
                      .addDataset(data.hydroelectric)
                      .addDataset(data.gas)
                      .addDataset(data.nuclear)
                      .addDataset(data.oil)
                      .addDataset(data.other_renewable)
                      .attr("fill", "type", colorScale)
                      .barLabelsEnabled(true)
                      .barLabelFormatter(formatter);

  var table = new Plottable.Component.Table([
      [null,  legend],
      [yAxis, plot],
      [null,  xAxis]
      ]);
  table.renderTo("svg#example-electricity-stacked-bar-percentage");
});
