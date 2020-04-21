
	
function redirect(path){
	window.location.href= path;
}

window.onload = function(){
	var w = 900, h = 500;
	
	var container = d3.select("#graph-container")
		.append("svg")
		.attr("width", w)
        .attr("height", h)
        .attr("class", "container")
		.attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");
		
	
	container.append('g')
		.append("circle")
			.attr("id", "brazil-nut-harvester-node")
			.attr("cx", 100)
			.attr("cy", 100)
			.attr("r", 25)
			.attr("fill", "#fff")
			.attr("stroke", "black")
			.on("click", function(){
				showSpecific('brazil-nut-harvester');
			})
			.append("svg:image")
				.attr("xlink:href", "img/test.jpg");
				
	container.select('g')
			.append("circle")
			.attr("id", "wildlife-ecologist-node")
			.attr("cx", 150)
			.attr("cy", 250)
			.attr("r", 25)
			.attr("fill", "#fff")
			.attr("stroke", "black")
			.on("click", function(){
				console.log("click");
				showSpecific('wildlife-ecologist');
			})
			.append("svg:image")
				.attr("xlink:href", "img/test.jpg");
			
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