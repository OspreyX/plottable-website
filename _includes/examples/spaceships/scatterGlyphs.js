$.when(
  $.getJSON("ships.json").then(_.identity),
  $.getJSON("raceSchema.json").then(_.identity),
  $.getJSON("hullSchema.json").then(_.identity)
).then(function(ships, raceSchema, hullSchema){

  // Returns the race for a given datum
  function getRace(d) {
    var race = d.Race.trim();
    return _(raceSchema).keys().contains(race) ? race : "Pirate";
  }

  // Returns the hull size for a given datum
  function getHullSize(d) {
    var shipClass = _.find(hullSchema, function(hullClass){
      return (hullClass.shipClasses.indexOf(d.Class) !== -1);
    });
    return shipClass.size;
  }

  // Assign keys for layout
  _(ships)
    .groupBy(getRace)
    .forEach(function(ss, ssi){
      ss.forEach(function(s, si){
        s.raceKey = ssi;
        s.shipKey = si;
      });
    });

  // Scales
  var xScale    = new Plottable.Scale.Linear();
  var yScale    = new Plottable.Scale.Category()
    .domain(_(raceSchema).keys().reverse().value());
  var raceScale = new Plottable.Scale.Color()
    .domain(_.keys(raceSchema))
    .range(_.map(raceSchema, "color"));
  var techScale = new Plottable.Scale.Color()
    .domain(["1", "F", "2"])
    .range(["black", "green", "orange"]);

  // Plot Components
  var title      = new Plottable.Component.TitleLabel("Ships");
  var raceLegend = new Plottable.Component.Legend(raceScale)
                                          .maxEntriesPerRow(Infinity);
  var plot       = new Plottable.Plot.Scatter(xScale, yScale)
    .addDataset(ships)
    .project("x", "shipKey", xScale)
    .project("y", "raceKey", yScale)
    .project("size", getHullSize)
    .project("stroke", "Tech", techScale)
    .project("stroke-width", 2)
    .project("opacity", 1)
    .project("fill", getRace, raceScale);

  // Layout and render
  new Plottable.Component.Table([
    [title],
    [raceLegend],
    [plot]
  ])
  .renderTo("svg#example-scatter-glyphs");
});
