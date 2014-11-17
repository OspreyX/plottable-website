function commitScatterPlot(commitData) {
  // Define the scales that will map data to visual properties
  var xScale     = new Plottable.Scale.Time();
  var yScale     = new Plottable.Scale.Linear();
  var colorScale = new Plottable.Scale.Color("10");

  // Create the components we use: axes, gridlines, and a legend
  var xAxis     = new Plottable.Axis.Time(xScale, "bottom");
  var yAxis     = new Plottable.Axis.Numeric(yScale, "left", hourFormatter);
  var gridlines = new Plottable.Component.Gridlines(xScale, yScale);
  var legend    = new Plottable.Component.Legend(colorScale);

  // Create the scatter plot
  //
  // This where most of the action happens; it grabs keyed values out of the data
  // store and then projects it through our scales. In the case of yAxis, it uses
  // custom logic (the hourAccessor) to compute what hour the commit was given
  // the date object attached.
  //
  // We project through the colorScale to have fills that synchronize with the
  // legend, and then project constant values for radius and opacity, although we
  // could have used a scale to have these be data-dependent as well.
  var scatter = new Plottable.Plot.Scatter(xScale, yScale)
    .addDataset(commitData)
    .attr("x", "parsedDate", xScale)
    .attr("y", hourAccessor, yScale)
    .attr("fill", "authorName", colorScale)
    .attr("r", 5)
    .attr("opacity", 0.4 );

  // Finally, merge the pieces together into a StandardChart, render it, and
  // attach an interaction.
  var center = gridlines.merge(scatter).merge(legend);
  var table = new Plottable.Component.Table([
    [yAxis, center],
    [null,  xAxis]
  ]).renderTo("svg");
}

function hourAccessor(d) {
  var date = d.parsedDate;
  var hour =  date.getHours() + date.getMinutes() / 60;
  hour = hour < 5 ? hour + 24 : hour;
  return hour;
}

function hourFormatter(hour) {
  if (hour < 12) {
    return hour + "AM";
  } else if (hour === 12) {
    return "12PM";
  } else if (hour < 24) {
    return (hour - 12) + "PM";
  } else if (hour == 24) {
    return "12AM";
  } else {
    return (hour - 24) + "AM";
  }
}
