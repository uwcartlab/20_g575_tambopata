var config = {
  "node_size": 100
}
	
function redirect(path){
	window.location.href= path;
}

window.onload = function(){
	var w = 700, h = 500;
	
	var container = d3.select("#graph-container")
		.append("svg")
		.attr("width", w)
        .attr("height", h)
        .attr("class", "container")
		.attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");
		
	var defs = container.append('svg:defs');
		
	data = [{
		posx: 275,
		posy: 100,
		id: "brazil-nut-harvester",
		img: "img/brazil-nut.jpg"
		},
		{
		posx: 150,
		posy: 300,
		id: "wildlife-ecologist",
		img: "img/test1.jpg"
		}
		,
		{
		posx: 400,
		posy: 300,
		id: "small-miner",
		img: "img/pickaxe.jpg"
		}
	]
	
	data.forEach(function(d, i) {
		defs.append("svg:pattern")
			.attr("id", "node-" + d.id)
			.attr("width", config.node_size)
			.attr("height", config.node_size)
			.attr("patternUnits", "userSpaceOnUse")
		.append("svg:image")
			.attr("xlink:href", d.img)
			.attr("width", config.node_size)
			.attr("height", config.node_size)
			.attr("x", 0)
			.attr("y", 0);

		var circle = container.append("circle")
			.attr("id", d.id + "-node")
			.attr("transform", "translate(" + d.posx + "," + d.posy + ")")
			.attr("cx", config.node_size / 2)
			.attr("cy", config.node_size / 2)
			.attr("r", config.node_size / 2)
			.style("fill", "#fff")
			.style("fill", "url(#node-" + d.id + ")")
			.attr('stroke', 'black')
			.attr('stroke-width', 1)
			.on("click", function(){
				console.log(d.id)
				showSpecific(d.id);
			});

	})

}

function showGraph(prev){
	console.log("show graph: hide", prev);
	document.getElementById(prev).style.display = "none";
	document.getElementById("specific-container").style.display = "none";
	document.getElementById("graph-container").style.display = "block";
}

function showSpecific(select){
	console.log("show specific:", select);
	document.getElementById("graph-container").style.display = "none";
	document.getElementById("specific-container").style.display = "block";
	document.getElementById(select).style.display = "block";
}