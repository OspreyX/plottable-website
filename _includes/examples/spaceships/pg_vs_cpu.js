
var caldariBlue = "#597391";
var gallenteGreen = "#A8C0AB";
var amarrGold = "#D6A946";
var minmatarRust = "#915B56";
var pirateRed = "#550207";
var races = ["Caldari", "Gallente", "Amarr", "Minmatar", "Pirate"];

var hulls = ["Frigate", "Destroyer", "Cruiser", "Battlecruiser", "Battleship"];

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
var center = plot.merge(gridlines);
var table = new Plottable.Component.Table([
  [null, legend],
  [yAxis, center],
  [null, xAxis]
  ]);
new Plottable.Interaction.PanZoom(center, xScale, yScale);

function parseNumber(n) {
  if (typeof(n) === "string") {
    if (n[n.length-1] === "k") {
    n = (+n.substr(0, n.length-1)) * 1000;
    }
    if (n[n.length-1] === "%") {
      n = (+n.substr(0, n.length-1));
    }
  }
  return +n;
}

function numericKey(key) {
  return function(datum) {
    return parseNumber(datum[key]);
  };
}

function getRace(datum) {
  var race = datum.Race.trim();
  var n = races.indexOf(races) !== -1 ? race : "Pirate";
  console.log(race, n);
  return n;
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
  var sizes = [2, 4, 6, 8, 12];
  return sizes[hulls.indexOf(hull)];
}

// var s = raceScale.scale;
// raceScale.scale = function(x) {
//   console.log(x, s(x));
//   return s(x);
// }

var numeric_attributes = ["CPU","PG","H","M","L","Turrets","Launchers","DroneBandwidth","DroneCapacity","cap","C_per_t","cap+","ST","A","SH","sig","vel","ine","m","warp","TR","TC","SR","S_EM","S_TH","S_KIN","S_EXP","SR","A_EM","A_TH","A_KIN","A_EXP"]

d3.csv("ships_clean.csv", function(error, ships) {
  plot.dataset().data(ships);
  ships.forEach(function(ship) {
    numeric_attributes.forEach(function(attr) {
      ship[attr] = parseNumber(ship[attr]);
    })
    ship["Name"] = ship["Name"].trim();
  })
  debugger;
  plot.project("x", numericKey("PG"), xScale)
      .project("y", numericKey("CPU"), yScale)
      .project("r", getHullSize)
      .project("fill", getRace, raceScale);
  table.renderTo("svg#example-scatter-pg-cpu")
})
