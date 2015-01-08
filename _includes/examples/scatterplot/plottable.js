d3.tsv("data.tsv", function(error, data) {
  var xScale = new Plottable.Scale.Linear();
  var yScale = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color("10");

  var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");

  var xLabel = new Plottable.Component.Label("Sepal Width (cm)");
  var yLabel = new Plottable.Component.Label("Sepal Length (cm)", "left");

  var plot = new Plottable.Plot.Scatter(xScale, yScale)
                      .addDataset(data)
                      .project("x", "sepalWidth", xScale)
                      .project("y", "sepalLength", yScale)
                      .project("r", 3.5)
                      .project("fill", "species", colorScale);

  var legend = new Plottable.Component.Legend(colorScale);

  var center = plot.merge(legend);
  var table = new Plottable.Component.Table([
                [yLabel, yAxis, center],
                [null  , null , xAxis ],
                [null  , null , xLabel]]
    ).renderTo("#scatterplot-plottable-demo");
});

