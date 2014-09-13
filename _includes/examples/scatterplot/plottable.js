d3.tsv("data.tsv", function(error, data) {
  var xScale = new Plottable.Scale.Linear();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color("10");

  var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");

  var xLabel = new Plottable.Component.Label("Sepal Width (cm)");
  var yLabel = new Plottable.Component.Label("Sepal Length (cm)", "left");

  var plot = new Plottable.Plot.Scatter(data, xScale, yScale)
                      .attr("x", "sepalWidth", xScale)
                      .attr("y", "sepalLength", yScale)
                      .attr("r", 3.5)
                      .attr("fill", "species", colorScale);

  var legend = new Plottable.Component.Legend(colorScale);

  var center = plot.merge(legend);
  var table = new Plottable.Component.Table([
                [yLabel, yAxis, center],
                [null  , null , xAxis ],
                [null  , null , xLabel]]
    ).renderTo(d3.select("#scatterplot-plottable-demo"));
});

