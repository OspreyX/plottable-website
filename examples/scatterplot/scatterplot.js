$(function() {
  // Plottable
  d3.tsv("data.tsv", function(error, data) {
    data.forEach(function(d) {
       d.sepalLength = +d.sepalLength;
       d.sepalWidth = +d.sepalWidth;
     });
    var xScale = new Plottable.Scale.Linear();
    var yScale = new Plottable.Scale.Linear();
    var colorScale = new Plottable.Scale.Color("10");

    var xAxis = new Plottable.Axis.Numeric(xScale, "bottom");
    var yAxis = new Plottable.Axis.Numeric(yScale, "left");
    var xLabel = new Plottable.Component.Label("Sepal Width (cm)");
    var yLabel = new Plottable.Component.Label("Sepal Length (cm)", "left");
    var legend = new Plottable.Component.Legend(colorScale);
    var plot = new Plottable.Plot.Scatter(data, xScale, yScale)
                        .project("x", "sepalWidth", xScale)
                        .project("y", "sepalLength", yScale)
                        .project("fill", "species", colorScale);
    var gridlines = new Plottable.Component.Gridlines(xScale, yScale);
    var center = plot.merge(gridlines).merge(legend);
    var table = new Plottable.Component.Table([[yLabel, yAxis, center], [null, null, xAxis], [null, null, xLabel]]).renderTo(d3.select("svg#plottable-demo"));
  });

  // D3
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 550 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("svg#d3-demo")
      .attr("width", '100%')
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("data.tsv", function(error, data) {
    data.forEach(function(d) {
      d.sepalLength = +d.sepalLength;
      d.sepalWidth = +d.sepalWidth;
    });

    x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
    y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sepal Length (cm)")

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.sepalWidth); })
        .attr("cy", function(d) { return y(d.sepalLength); })
        .style("fill", function(d) { return color(d.species); });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

  });
})
