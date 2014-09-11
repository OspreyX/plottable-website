d3.csv("ships.csv", function(error, ships) {
  ships = _(ships)
    .sortBy("Race")
    .forEach(function(ship, i){
      ship.i = i;
    })
    .value();

  // Scales
  var xScale     = new Plottable.Scale.Linear();
  var yScale     = new Plottable.Scale.Linear();
  var classScale = new Plottable.Scale.Ordinal();
  var raceColors = new Plottable.Scale.Color();

  // Plot Components
  var title      = new Plottable.Component.TitleLabel("Ships");
  var raceLegend = new Plottable.Component.HorizontalLegend(raceColors);
  var plot       = new Plottable.Plot.Scatter(ships, xScale, yScale)
    .project("x", "i", xScale)
    .project("y", 0, yScale)
    .project("stroke-width", "Ship class", classScale)
    .project("fill", "Race", raceColors)
    .project("r", "Turrets");

  // Layout and render
  new Plottable.Component.Table([
    [title],
    [raceLegend],
    [plot]
  ])
  .renderTo(d3.select('svg#example-scatter-glyphs'));
});