d3.csv("combined.csv", function(data) {
    // Convert strings to numbers.
    data.forEach(function(d) {
        if (d.Date == 'NA' || d.PublicationYear == 'NA' ){
            d.Date = 0;
        }
        else{
            d.Date = +d.Date;
            d.PublicationYear = +d.PublicationYear;
        }

        if (d.page == 'NaN' || d.page == 'NA' ){
            d.page = 0; 
        }
        else{
            d.page = +d.page;
        }


    });

  // console.log(data);
// var data = [[5,3], [10,17], [15,4], [2,8]];
   
    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([0, d3.max(data, function (d) { return d.page; })])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
    	      .domain([0, d3.max(data, function (d) { return d.Date; })])
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


    var g = main.append("svg:g"); 

    g.selectAll("scatter-dots")
        .data(data)
        .enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d.page); } )
        .attr("cy", function (d) { return y(d.Date); } )
        .attr("r", 8)
        .on("mouseover", function(d) {
            div.transition()     
                .duration(200)      
                .style("opacity", .9);      
            div .html(d.Date)  
            // .style("left", (d3.event.pageX) + "px")     
            // .style("top", (d3.event.pageY - 28) + "px");    
            })
        .on("mouseout", function(d) {     
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });





});