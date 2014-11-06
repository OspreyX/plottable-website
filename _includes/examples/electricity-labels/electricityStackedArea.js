d3.json("data/world_stacked_area.json", function(error, data) {
  var xScale = new Plottable.Scale.Time();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color()
                      .domain(["coal", "hydroelectric", "gas", "nuclear", "oil", "other_renewable"])
                      .range(["black", "dodgerblue", "lightcoral", "darkorange", "saddlebrown", "mediumseagreen"]);
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
                      .attr("fill", "type", colorScale);


  var title = new Plottable.Component.TitleLabel("Worldwide Electricity Production over Time");
  var axisLabel = new Plottable.Component.Label("Tera-watt hours per year", "left")
  var table = new Plottable.Component.Table([
      [null     , null ,  title ],
      [null     , null ,  legend],
      [axisLabel, yAxis,  plot  ],
      [null     , null ,  xAxis ]
      ]);
  table.renderTo("svg#example-electricity-stacked-area");
  plot.registerInteraction(new Plottable.Interaction.PanZoom(xScale, null));
});
