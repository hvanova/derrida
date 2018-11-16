d3.csv("combined.csv", function(data) {
    // Convert strings to numbers.
    data.forEach(function(d) {
        if (d.Publication_Year == 'NA' ){
            d.Publication_Year = 0;
        }
        else{
            // d.Date = +d.Date;
            d.Publication_Year = +d.Publication_Year;
        }

        if (d.page == 'NaN' || d.page == 'NA' ){
            d.page = 0; 
        }
        else{
            d.page = +d.page;
        }
        // if (d.booktitle == 'NaN' || d.page == 'NA' ){
        //     d.page = 0; 
        // }
        // else{
        //     d.page = +d.page;
        // }
    });

  // console.log(data);
// var data = [[5,3], [10,17], [15,4], [2,8]];
   
    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([0, d3.max(data, function (d) { return d.avg_pos_EL; })])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([0, d3.max(data, function (d) { return d.Publication_Year; })])
    	      .range([ height, 0 ]);
 
    var chart = d3.select('body')
    	.append('svg:svg')
    	.attr('width', width + margin.right + margin.left)
    	.attr('height', height + margin.top + margin.bottom)
    	.attr('class', 'chart')

    var main = chart.append('g')
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    	.attr('width', width)
    	.attr('height', height)
    	.attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient('bottom');

    main.append('g')
    	.attr('transform', 'translate(0,' + height + ')')
    	.attr('class', 'main axis date')
    	.call(xAxis);

// scale the yAxis
    var axisScale = d3.scale.linear()               
      .domain([0,100])
      .range([0,100]);

// https://www.dashingd3js.com/d3js-axes

// http://bl.ocks.org/weiglemc/6185069
    // draw the y axis


    // max plus 1 on the data
    // could toggle the log on and off
    var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient('left');

    main.append('g')
    	.attr('transform', 'translate(0,0)')
    	.attr('class', 'main axis date')
    	.call(yAxis);


    // Define the div for the tooltip
    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

// setup fill color
    var cValue = function(d) { return d.Language;},
        color = d3.scale.category10();

    var g = main.append("svg:g"); 

    g.selectAll("scatter-dots")
        .data(data)
        .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d.avg_pos_EL); } )
        .attr("cy", function (d) { return y(d.Publication_Year); } )
        .attr("r", 5)
        .style("fill", function(d) { return color(cValue(d));})

        .on("mouseover", function(d) {
            div.transition()     
                .duration(200)      
                .style("opacity", .9);      
            div.html(d.book_title +
                "<br/>Author: " + d.Author +
                "<br/>Publication Year: " + d.Publication_Year + 
                "<br/>Reference Type: " + 
                d.ref_type)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
            // .style("left", (d3.event.pageX) + "px")     
            // .style("top", (d3.event.pageY - 28) + "px");    
            })
        .on("mouseout", function(d) {     
            div.transition()        
                .duration(500)   
                .style("opacity", 0);   
        });




// draw legend
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})





});