var isometricAngle = 45 / 180 * Math.PI;
var maxSize = 5.0;
var svgHeight = 500, svgWidth = 500;
var svg = d3.selectAll('svg');
var distance = 1.0;
var scale = d3.scale.linear();

// Scale setup
scale.range([0, 250]);

function isometric(x, y, z)
{
    var X = x + z * Math.cos(isometricAngle);
    var Y = y + z * Math.sin(isometricAngle);
    return [X, Y]
}

function sizeFactor(x, y, z)
{
    z += distance;
    return maxSize / (z * z);
}

function renderData(x, y, z)
{
    return [isometric(x, y, z), sizeFactor(x, y, z)]
}

function translate(x, y)
{
    return "translate(" + x + ", " + y + ")"
}

function drawPoints(points)
{
    var data = points.map(function(point) {return renderData.apply(this, point);});
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return translate.apply(this, d[0].map(scale)); })
        .append("circle")
        .attr("r", function(d) { return d[1]; });
    
    return data;
}

// Testing

var a = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1],
        [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
        
var b = drawPoints(a);