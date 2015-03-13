d3.csv("ships.csv", function(error, data) {

  // Compute the clusters of data for each ship class
  var shipClasses = ["Frigate", "Cruiser", "Battleship", "Battlecruiser"];
  var histograms  = _(data)
    .filter(function(ship){
      return shipClasses.indexOf(ship["Ship class"]) !== -1;
    })
    .groupBy("Ship class")
    .map(function (values, shipClass){
      return _(values)
        .groupBy("Race")
        .map(function (shipValues, race){
          return {
            race      : race,
            shipClass : shipClass,
            count     : shipValues.length
          };
        })
        .sortBy("race")
        .value();
    })
    .sortBy("shipClass")
    .value();

  // Scales
  var xScale     = new Plottable.Scale.Linear();
  var yScale     = new Plottable.Scale.Category();
  var colorScale = new Plottable.Scale.Color();

  // Plot Components
  var title  = new Plottable.Component.TitleLabel("Race Histogram");
  var legend = new Plottable.Component.Legend(colorScale)
                            .maxEntriesPerRow(Infinity);
  var xAxis  = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis  = new Plottable.Axis.Category(yScale, "left");
  var lines  = new Plottable.Component.Gridlines(xScale, null);
  var plot   = new Plottable.Plot.ClusteredBar(xScale, yScale, false)
    .project("x", "count", xScale)
    .project("y", "race",  yScale)
    .project("fill", "shipClass", colorScale)
    .animate(true);

  // Add our histograms to the plot
  histograms.forEach(function(h){
    plot.addDataset(h);
  });

  // Layout and render
  new Plottable.Component.Table([
    [null,  title],
    [null,  legend],
    [yAxis, lines.merge(plot)],
    [null,  xAxis]
  ])
  .renderTo("svg#example-race-histogram");
});
