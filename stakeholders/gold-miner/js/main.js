
// this stores globals for creating the stakeholder circles
var config = {
	// used to define the radius of the circle and the size of the image inside it
  "node_size": 100
}

// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
function redirect(path){
	window.location.href= path;
}

// do these on page start
window.onload = function(){

	// dimensions and definition of the graph container
	var w = 700, h = 500;
	var container = d3.select("#graph-container")
		.append("svg")
		.attr("width", w)
        .attr("height", h)
        .attr("class", "container")
		.attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");

	// this is for creating the images
	var defs = container.append('svg:defs');

	// the hard-coded information for each stakeholder and their image
	// posx and posy start at 0 in the top-left of the container svg
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

	// for each of the stakeholders create a pattern with the image and then append a circle filled with it
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
			.on("click", function(){ // this allows for calling with only the specific stakeholder we want to show
				console.log(d.id)
				showSpecific(d.id);
			});

	})

}

// basic function for showing the graph and hiding the specific div(passed by the return button)
function showGraph(prev){
	console.log("show graph: hide", prev);
	document.getElementById(prev).style.display = "none";
	document.getElementById("specific-container").style.display = "none";
	document.getElementById("graph-container").style.display = "block";
}

// basic function to hid graph and display specific stakeholder(passed by clicking a circle)
function showSpecific(select){
	console.log("show specific:", select);
	document.getElementById("graph-container").style.display = "none";
	document.getElementById("specific-container").style.display = "block";
	document.getElementById(select).style.display = "block";
}

function popupFad() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupFed() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};
