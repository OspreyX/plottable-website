
var caldariBlue = "#597391";
var gallenteGreen = "#A8C0AB";
var amarrGold = "#D6A946";
var minmatarRust = "#915B56";
var pirateRed = "black";
var races = ["Caldari", "Gallente", "Amarr", "Minmatar", "Pirate"];
var hulls = ["Frigate", "Destroyer", "Cruiser", "Battlecruiser", "Battleship"];

var strokeColorScaled3 = d3.scale.ordinal()
                  .domain(["1", "F", "2"]).range(["black", "green", "orange"]);
var strokeColorScale = new Plottable.Abstract.Scale(strokeColorScaled3);

raceScale = new Plottable.Scale.Color()
  .domain(races)
  .range([caldariBlue, gallenteGreen, amarrGold, minmatarRust, pirateRed]);


var xScale = new Plottable.Scale.Linear();
var yScale = new Plottable.Scale.Linear();

var plot = new Plottable.Plot.Scatter([], xScale, yScale);
var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
var yAxis = new Plottable.Axis.Numeric(yScale, "left");
var legend = new Plottable.Component.HorizontalLegend(raceScale);
var gridlines = new Plottable.Component.Gridlines(xScale, yScale);
var center = gridlines.merge(plot);
var table = new Plottable.Component.Table([
  [null, legend],
  [yAxis, center],
  [null, xAxis]
  ]);
new Plottable.Interaction.PanZoom(center, xScale, yScale);


function getRace(datum) {
  var race = datum.Race.trim();
  return races.indexOf(race) !== -1 ? race : "Pirate";
}
console.log("3");

// What follows is weird but I promise it works.
var frigates = ["Frigate", "Interceptor", "Covert Ops", "Stealth Bomber", "Electronic Attack", "Rookie"];
var destroyers = ["Destroyer", "Interdictor"];
var cruisers = ["Cruiser", "Combat Recon", "Force Recon", "Heavy Assault", "Heavy Interdictor", "Logistics"];
var battlecruisers = ["Battlecruiser", "Field Command", "Fleet Command"];
var battleships = ["Battleship", "Marauder", "Black Ops"];
var classes = [frigates, destroyers, cruisers, battlecruisers, battleships];
var hullGetter = {};
classes.forEach(function(theClass) {
  theClass.forEach(function(type) {
    hullGetter[type] = theClass[0];
  });
});
function getHullSize(x) {
  var hull = hullGetter[x["Class"]];
  var sizes = [4, 6, 8, 10, 12];
  return sizes[hulls.indexOf(hull)];
}

var numeric_attributes = ["CPU","PG","H","M","L","Turrets","Launchers","DroneBandwidth","DroneCapacity","cap","C_per_t","cap+","ST","A","SH","sig","vel","ine","m","warp","TR","TC","SR","S_EM","S_TH","S_KIN","S_EXP","SR","A_EM","A_TH","A_KIN","A_EXP"]


d3.json("ships.json", function(error, ships) {
  plot.dataset().data(ships);

  plot.project("x", "A", xScale)
      .project("y", "SH", yScale)
      .project("r", getHullSize)
      .project("stroke", "Tech", strokeColorScale)
      .project("stroke-width", 2)
      .project("opacity", 1)
      .project("fill", getRace, raceScale);
  table.renderTo("svg#example-scatter-pg-cpu")
  new Plottable.Interaction.PanZoom(center, xScale, yScale).registerWithComponent();
})
