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

  // Initialize Scales
  var xScale    = new Plottable.Scale.Linear();
  var yScale    = new Plottable.Scale.Linear();
  var raceScale = new Plottable.Scale.Color()
    .domain(_.keys(raceSchema))
    .range(_.map(raceSchema, "color"));
  var techScale = new Plottable.Scale.Color()
    .domain(["1", "F", "2"])
    .range(["black", "green", "orange"]);

  // Initialize Components
  var xAxis  = new Plottable.Axis.Numeric(xScale, "bottom");
  var yAxis  = new Plottable.Axis.Numeric(yScale, "left");
  var xLabel = new Plottable.Component.Label("Shields");
  var yLabel = new Plottable.Component.Label("Armor", "left");
  var legend = new Plottable.Component.HorizontalLegend(raceScale);
  var lines  = new Plottable.Component.Gridlines(xScale, yScale);
  var title  = new Plottable.Component.TitleLabel("EVE Online Ships by Armor and Shield");
  var plot   = new Plottable.Plot.Scatter(ships, xScale, yScale)
      .project("x", "A", xScale)
      .project("y", "SH", yScale)
      .project("r", getHullSize)
      .project("stroke", "Tech", techScale)
      .project("stroke-width", 2)
      .project("opacity", 1)
      .project("fill", getRace, raceScale)
      .project("title", function(d){
        return "<strong class=\"tooltip-title\">" + d.Name + "</strong><br>" +
           d.Race + " " + d.Class + "<br>" +
          "Armor: " + d.A + ", Shields: " + d.SH;
      })
      .classed("tooltipped", true);
  var center = lines.merge(plot);

  // Layout and render
  var table  = new Plottable.Component.Table([
    [null,   null,  title ],
    [null,   null,  legend],
    [yLabel, yAxis, center],
    [null,   null,  xAxis ],
    [null,   null,  xLabel],
  ]).renderTo("svg#example-scatter-pg-cpu");
  var interaction = new Plottable.Interaction.PanZoom(xScale, yScale);
  lines.registerInteraction(interaction);

  // Make sure everything is ready in the SVG
Plottable.Core.RenderController.flush();

// Attach tooltips with qTip2 (which uses the "title" attribute by default)
$("svg .tooltipped circle").qtip({
  position : {
    my : "bottom middle",
    at : "top middle"
  },
  style : {
    classes : "qtip-dark"
  }
});

});
