data = [];

var dat = {"success":true,"message":"transactions retrieved for specified userId","data":[{"amount": 40, "timestamp": "2016-2-27T17:27:01.846Z"}, {"amount": 21, "timestamp": "2016-4-18T17:27:01.846Z"}, {"amount": 47, "timestamp": "2016-5-11T17:27:01.846Z"}, {"amount": 1, "timestamp": "2016-11-27T17:27:01.846Z"}, {"amount": 88, "timestamp": "2016-1-28T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-7-3T17:27:01.846Z"}, {"amount": 99, "timestamp": "2016-2-26T17:27:01.846Z"}, {"amount": 66, "timestamp": "2016-7-26T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-10-26T17:27:01.846Z"}, {"amount": 83, "timestamp": "2016-6-23T17:27:01.846Z"}, {"amount": 28, "timestamp": "2016-12-13T17:27:01.846Z"}, {"amount": 75, "timestamp": "2016-1-17T17:27:01.846Z"}, {"amount": 39, "timestamp": "2016-5-10T17:27:01.846Z"}, {"amount": 0, "timestamp": "2016-11-1T17:27:01.846Z"}, {"amount": 81, "timestamp": "2016-12-23T17:27:01.846Z"}, {"amount": 46, "timestamp": "2016-1-2T17:27:01.846Z"}, {"amount": 24, "timestamp": "2016-12-15T17:27:01.846Z"}, {"amount": 46, "timestamp": "2016-9-8T17:27:01.846Z"}, {"amount": 89, "timestamp": "2016-1-2T17:27:01.846Z"}, {"amount": 20, "timestamp": "2016-10-16T17:27:01.846Z"}, {"amount": 50, "timestamp": "2016-9-10T17:27:01.846Z"}, {"amount": 63, "timestamp": "2016-3-24T17:27:01.846Z"}, {"amount": 81, "timestamp": "2016-1-28T17:27:01.846Z"}, {"amount": 14, "timestamp": "2016-4-4T17:27:01.846Z"}, {"amount": 99, "timestamp": "2016-4-8T17:27:01.846Z"}, {"amount": 62, "timestamp": "2016-12-15T17:27:01.846Z"}, {"amount": 30, "timestamp": "2016-2-26T17:27:01.846Z"}, {"amount": 6, "timestamp": "2016-12-4T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-1-17T17:27:01.846Z"}, {"amount": 94, "timestamp": "2016-3-29T17:27:01.846Z"}, {"amount": 62, "timestamp": "2016-6-13T17:27:01.846Z"}, {"amount": 21, "timestamp": "2016-11-4T17:27:01.846Z"}, {"amount": 75, "timestamp": "2016-12-16T17:27:01.846Z"}, {"amount": 41, "timestamp": "2016-4-18T17:27:01.846Z"}, {"amount": 15, "timestamp": "2016-7-7T17:27:01.846Z"}, {"amount": 66, "timestamp": "2016-10-5T17:27:01.846Z"}, {"amount": 6, "timestamp": "2016-10-5T17:27:01.846Z"}, {"amount": 26, "timestamp": "2016-3-23T17:27:01.846Z"}, {"amount": 78, "timestamp": "2016-1-24T17:27:01.846Z"}, {"amount": 14, "timestamp": "2016-8-8T17:27:01.846Z"}, {"amount": 35, "timestamp": "2016-11-26T17:27:01.846Z"}, {"amount": 14, "timestamp": "2016-11-8T17:27:01.846Z"}, {"amount": 47, "timestamp": "2016-9-13T17:27:01.846Z"}, {"amount": 73, "timestamp": "2016-3-2T17:27:01.846Z"}, {"amount": 25, "timestamp": "2016-4-9T17:27:01.846Z"}, {"amount": 91, "timestamp": "2016-2-27T17:27:01.846Z"}, {"amount": 19, "timestamp": "2016-8-25T17:27:01.846Z"}, {"amount": 80, "timestamp": "2016-7-3T17:27:01.846Z"}, {"amount": 14, "timestamp": "2016-8-16T17:27:01.846Z"}, {"amount": 43, "timestamp": "2016-9-9T17:27:01.846Z"}, {"amount": 6, "timestamp": "2016-3-12T17:27:01.846Z"}, {"amount": 54, "timestamp": "2016-6-14T17:27:01.846Z"}, {"amount": 1, "timestamp": "2016-5-1T17:27:01.846Z"}, {"amount": 27, "timestamp": "2016-10-29T17:27:01.846Z"}, {"amount": 97, "timestamp": "2016-2-7T17:27:01.846Z"}, {"amount": 53, "timestamp": "2016-7-28T17:27:01.846Z"}, {"amount": 89, "timestamp": "2016-1-13T17:27:01.846Z"}, {"amount": 50, "timestamp": "2016-11-17T17:27:01.846Z"}, {"amount": 2, "timestamp": "2016-3-22T17:27:01.846Z"}, {"amount": 13, "timestamp": "2016-1-26T17:27:01.846Z"}, {"amount": 26, "timestamp": "2016-5-9T17:27:01.846Z"}, {"amount": 6, "timestamp": "2016-11-28T17:27:01.846Z"}, {"amount": 59, "timestamp": "2016-8-4T17:27:01.846Z"}, {"amount": 13, "timestamp": "2016-9-22T17:27:01.846Z"}, {"amount": 3, "timestamp": "2016-3-17T17:27:01.846Z"}, {"amount": 70, "timestamp": "2016-9-22T17:27:01.846Z"}, {"amount": 87, "timestamp": "2016-2-4T17:27:01.846Z"}, {"amount": 93, "timestamp": "2016-10-16T17:27:01.846Z"}, {"amount": 6, "timestamp": "2016-7-16T17:27:01.846Z"}, {"amount": 4, "timestamp": "2016-7-28T17:27:01.846Z"}, {"amount": 32, "timestamp": "2016-11-12T17:27:01.846Z"}, {"amount": 81, "timestamp": "2016-11-12T17:27:01.846Z"}, {"amount": 80, "timestamp": "2016-8-12T17:27:01.846Z"}, {"amount": 70, "timestamp": "2016-4-17T17:27:01.846Z"}, {"amount": 10, "timestamp": "2016-5-16T17:27:01.846Z"}, {"amount": 82, "timestamp": "2016-10-1T17:27:01.846Z"}, {"amount": 64, "timestamp": "2016-11-5T17:27:01.846Z"}, {"amount": 65, "timestamp": "2016-10-21T17:27:01.846Z"}, {"amount": 57, "timestamp": "2016-6-1T17:27:01.846Z"}, {"amount": 35, "timestamp": "2016-8-22T17:27:01.846Z"}, {"amount": 27, "timestamp": "2016-3-19T17:27:01.846Z"}, {"amount": 42, "timestamp": "2016-1-29T17:27:01.846Z"}, {"amount": 59, "timestamp": "2016-5-11T17:27:01.846Z"}, {"amount": 34, "timestamp": "2016-10-8T17:27:01.846Z"}, {"amount": 45, "timestamp": "2016-7-29T17:27:01.846Z"}, {"amount": 31, "timestamp": "2016-11-27T17:27:01.846Z"}, {"amount": 24, "timestamp": "2016-9-21T17:27:01.846Z"}, {"amount": 17, "timestamp": "2016-6-15T17:27:01.846Z"}, {"amount": 26, "timestamp": "2016-10-20T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-2-29T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-1-10T17:27:01.846Z"}, {"amount": 85, "timestamp": "2016-8-21T17:27:01.846Z"}, {"amount": 43, "timestamp": "2016-1-14T17:27:01.846Z"}, {"amount": 23, "timestamp": "2016-1-17T17:27:01.846Z"}, {"amount": 11, "timestamp": "2016-2-29T17:27:01.846Z"}, {"amount": 26, "timestamp": "2016-12-23T17:27:01.846Z"}, {"amount": 96, "timestamp": "2016-8-10T17:27:01.846Z"}, {"amount": 93, "timestamp": "2016-3-22T17:27:01.846Z"}, {"amount": 8, "timestamp": "2016-10-10T17:27:01.846Z"}, {"amount": 87, "timestamp": "2016-9-6T17:27:01.846Z"}]};

var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for(var i = 0; i < dat.data.length; i++){
 var temp = dat.data[i].timestamp.toString();
 var ind = temp.indexOf("-");
 ++months[parseInt(temp.substring(ind + (temp.charAt(1+ind) === '0' ? 2:1), ind + 3), 10) - 1];
}

for(var i = 0; i < 12; i++){
  var temp = moment([2016, i, 1])
  data.push({"date":temp.format("DD-MMM-YY"), "close":months[i]});
}


var div_width = parseInt(d3.select('body').style('width').replace('px',''));
var margin = {top: 20, right: 50, bottom: 30, left: 30},
    width = div_width - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(",.2f");

var maxY = d3.max(data, function(d) { return d.close; });

var x = d3.time.scale()
    .range([0, width-margin.left-margin.right]);

var y = d3.scale.linear()
    .range([height-margin.top-margin.bottom, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickFormat(d3.time.format('%b'))
    .ticks(d3.time.months, 1);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .ticks(maxY / 1000);

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .attr('viewBox','0 0 '+width+' '+height+margin.top)
.attr('preserveAspectRatio','xMinYMin')
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  data.sort(function(a, b) {
    return a.date - b.date;
  });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) { return d.close; }));

  var area = d3.svg.area()
	.x(function(d) { return x(d.date); })
	.y0(height)
	.y1(function(d) { return y(d.close); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(width-50)+",0)")
      .call(yAxis);
d3.selectAll('.y.axis g.tick').attr("class", "yAxisTicks tick");
d3.selectAll('.x.axis g.tick').attr("class", "xAxisTicks tick");
function make_y_axis() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(maxY / 1000);
    
};
  svg.append("g")         
      .attr("class", "grid")
      .style("stroke-dasharray", ("3, 3"))
      .call(make_y_axis()
        .tickSize((-width+margin.right+margin.left), 0, 0)
        .tickFormat("")
       );

  svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  var focusLine = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  var focusText = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 6);

  focusLine.append("line")
        .attr("class", "x")
        .style("stroke", "#46464F")
        .style("opacity", 0.9)
        .attr("y1", 0)
        .attr("y2", -maxY);

  focusText.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null);        
                                    focusLine.style("display", null)
                                    focusText.style("display", null);;})
      .on("mouseout", function() { focus.style("display", "none"); 
                                   focusLine.style("display", "none");
                                   focusText.style("display", "none");})
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    focusText.select("text").attr("transform", "translate(" + x(d.date) + "," + -10 + ")").text(parseInt(d.close, 10) + " TRANSACTIONS");
    focusLine.attr("transform", "translate(" + x(d.date) + "," + height + ")");
  }