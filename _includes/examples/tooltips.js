// Generate random data
var species = [
  "Hairy-nosed Otter",
  "Japanese Otter",
  "European Otter",
  "Giant Otter"
];
var data = species.map(function (otter){
  return {
    species : otter,
    y : Math.random() * (otter === "Giant Otter" ? 400 : 100),
  };
});

// Scales
var xScale = new Plottable.Scale.Category();
var yScale = new Plottable.Scale.Linear();

// Plot Components
var title = new Plottable.Component.TitleLabel("Otter Species");
var xAxis = new Plottable.Axis.Category(xScale, "bottom");
var yAxis = new Plottable.Axis.Numeric(yScale, "left");
var plot  = new Plottable.Plot.Bar(xScale, yScale)
  .addDataset(data)
  .project("x", "species", xScale)
  .project("y", "y", yScale)
  // Store the tooltip content in the "title" attribute
  .project("title", function(d){
    return "<strong class=\"tooltip-title\">" + d.species + "</strong><br>" +
      "<span class=\"tooltip-value\">" + d3.format("0,.2f")(d.y) + "</span>";
  })
  .classed("tooltipped", true);

// Layout and render
new Plottable.Component.Table([
  [null,  title],
  [yAxis, plot],
  [null,  xAxis]
])
.renderTo("svg#example");

// Make sure rects are ready in the SVG
Plottable.Core.RenderController.flush();

// Attach tooltips with qTip2 (which uses the "title" attribute by default)
$("svg#example .tooltipped rect").qtip({
  position : {
    my : "bottom middle",
    at : "top middle"
  },
  style : {
    classes : "qtip-dark"
  }
});
