function absolutePlot(svg, data) {
  var xScale = new Plottable.Scale.Time();
  var yScale = new Plottable.Scale.Linear();

  var xAxis = new Plottable.Axis.Date(xScale);
  var yAxis = new Plottable.Axis.Numeric(yScale);

  var coal = data["Electricity production from coal sources (kWh)"]
  var hydroelectric = data["Electricity production from hydroelectric sources (kWh)"]
  var naturalGas = data["Electricity production from natural gas (kWh)"]
  var nuclear = data["Electricity production from nuclear sources (kWh)"]
  var oil = data["Electricity production from oil sources (kWh)"]
  var renewable = data["Electricity production from renewable sources, excluding hydroelectric (kWh)"]

  var plot = new Plottable.Plot.StackedBar(xScale, yScale, true)
                      .addDataset(coal.data)
                      .addDataset(hydroelectric.data)
                      .addDataset(naturalGas.data)
                      .addDataset(nuclear.data)
                      .addDataset(oil.data)
                      .addDataset(renewable.data)
                      .attr("y", "value", yScale)
                      .attr("x", "year", xScale)
                      .barLabelsEnabled(true)

  var table = new Plottable.Component.Table([
      [yAxis, plot],
      [null,  xAxis]
      ]);
  table.renderTo(svg);
}
