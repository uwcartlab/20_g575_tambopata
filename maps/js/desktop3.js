function desktop(){
	console.log("desktop!")
//create map
var map;
var zones;
var roadsPOI;
var view1;
var view2;
var zone2;
var swipe;
var pointsPOI;

var view1Data;
var view2Data;

function setMap(zones) {
    //<- initialize()
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});

    map = L.map('map', {
		center: [-12.9, -69.5],
		zoom: 9,
		minZoom: 9,
		layers: [roads],
		maxBounds: ([
			[-9.2,-73.5],
			[-17.2, -65.5]
		])

	});

	var hybrid  = L.gridLayer.googleMutant({
		type: 'hybrid'
	}) // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'})
	var earth = L.gridLayer.googleMutant({
		type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
	})

	var deFault = "data/proposal1.geojson"
	getZones(deFault)
	getPOIs()
	createProposals()
	createLegend(roads, earth, hybrid, view1, view2, swipe)
	getLeftZones();
	getRightZones();
};
function createProposals(){
	var rowBar = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function () {
            // create the control container div with a particular class name
            var row = L.DomUtil.create('div', 'proposal-container');

			// ... initialize other DOM elements
			$(row).append('<div class="container-fluid" align = "center">');
			$(row).append('<div class="row">');
			$(row).append('<button id = "proposal1" class="active proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 1</button>');
			$(row).append('<button id = "proposal2" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 2</button>');
			$(row).append('<button id = "proposal3" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 3</button>');
			$(row).append('<button id = "proposal4" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 4</button>');
			$(row).append('</div>');
			$(row).append('</div>');

			return row;

		}

	});
	map.addControl(new rowBar());
	$('.proposal').click(function(){
		$('.proposal').removeClass('active');
		if ($(this).attr('id') == 'proposal1'){
			removeZones(zones)
			var zone = "data/proposal1.geojson";
			$(this).addClass('active');
			getZones(zone);
		} else if ($(this).attr('id') == 'proposal2'){
			removeZones(zones)
			var zone = "data/proposal2.geojson";
			$(this).addClass('active');
			getZones(zone);
		}
		else if ($(this).attr('id') == 'proposal3'){
			removeZones(zones)
			var zone = "data/proposal3.geojson";
			$(this).addClass('active');
			getZones(zone);
		}
		else if ($(this).attr('id') == 'proposal4'){
			removeZones(zones)
			var zone = "data/proposal4.geojson";
			$(this).addClass('active');
			getZones(zone);
		}

	});
};
function createLegend(roads, earth, hybrid){
	var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        onAdd: function () {
            // create the control container with a particular class name
			var container = L.DomUtil.create('div', 'legendFrame');


			$(container).append('<input id = "Road" type = "radio" class = "baseMap" checked><span>Roads</span><br>')
			$(container).append('<input id = "Satellite" type = "radio" class = "baseMap"><span>Satellite</span><br>')
			$(container).append('<input id = "Hybrid" type = "radio" class = "baseMap"><span>Hybrid</span><br>')
			$(container).append('<input id = "pointsOfInterest" type = "checkbox" class = "roads" unchecked><span>Additional Roads<span><br>')
			$(container).append('<input id = "Compare" type = "checkbox" class = "Compare" unchecked><span>Compare Proposals<span><br>')
			$(container).append('<span class = "opacityTxt" style="margin-left: 10%;">0%</span>');
			$(container).append('<input class="range-slider" type="range">');
			$(container).append('<span class = "opacityTxt">100%</span>')
			$(container).append('<br><br>')

			$(container).append('<p class="legendtxt">Buffer Zone</p>');
			$(container).append('<div class="legend" id="bufferZone" ></div>');
			$(container).append('<p class="legendtxt">Community Reserve</p>');
			$(container).append('<div class="legend" id="communityReserve" ></div>');
			$(container).append('<p class="legendtxt">Strict Protection</p>');
			$(container).append('<div class="legend" id="strictProtection" ></div>');
			$(container).append('<p class="legendtxt">Wildlands</p>');
			$(container).append('<div class="legend" id="wildlands" ></div>');
			$(container).append('<p class="legendtxt">Ese\'eja and Harakmbut Territories</p>');
			$(container).append('<div class="legend" id="nativeCommunities" ></div>');
			$(container).append('<p class="legendtxt">Tourism</p>');
			$(container).append('<div class="legend" id="Tourism" ></div>');
			$(container).append('<p class="legendtxt">Low Impact Non-Timber Forest Use</p>');
			$(container).append('<div class="legend" id="forestUse" ></div>');
			$(container).append('<p class="legendtxt">Direct Use</p>');
			$(container).append('<div class="legend" id="directUse" ></div>');
			$(container).append('<p class="legendtxt">Restoration</p>');
			$(container).append('<div class="legend" id="Restoration" ></div>');
			L.DomEvent.disableClickPropagation(container)
            return container;
        }
	});
    // adds the legend to the map.
	map.addControl(new LegendControl());
	$('.roads').on('input',function(){
		if(document.getElementById("pointsOfInterest").checked == true){
			getRoads(roadsPOI)
		} else if(document.getElementById("pointsOfInterest").checked == false){
			removeRoads(roadsPOI)
		}
	});
	$('.Compare').on('input',function(){
		if(document.getElementById("Compare").checked == true){
			console.log("creating panes!");
			map.createPane('left');
			map.createPane('right');
			console.log(view1Data)
			console.log(view2Data);
			map.removeLayer(zones);
			$('.proposal').removeClass('active');
			if ($('.proposal').attr('id') == 'proposal1'){
				var lZone = "data/proposal1.geojson";
				$('#proposal1').addClass('active');
				$('#proposal3').addClass('active');
				createLeftZone(view1Data);
			};
			if ($('.proposal').attr('id') == 'proposal2'){
				$('#proposal2').removeClass('active');
				console.log("number two")
			};
			if ($('.proposal').attr('id') == 'proposal3'){
				var rZone = "data/proposal3.geojson";
				$('#proposal3').addClass('active');
				console.log("here!");
				createRightZone(view2Data);
			};
			if ($('.proposal').attr('id') == 'proposal4'){$('#proposal4').removeClass('active');};
			console.log("doing side by side!");
			createRightZone(view2Data);
			console.log(view1);
			console.log(view2);
			swipe = L.control.sideBySide(view1, view2).addTo(map);
			}
		else if(document.getElementById("Compare").checked == false){
			$('.proposal').removeClass('active');
			map.removeLayer(view1);
			map.removeControl(swipe)
			}

	});
	$('.baseMap').on('input',function(){
		if ($(this).attr('id') == 'Road'){
			document.getElementById("Satellite").checked = false;
			document.getElementById("Hybrid").checked = false;
			map.removeLayer(Satellite);
			map.removeLayer(Hybrid);
			roads.addTo(map)
		}
		else if($(this).attr('id') == 'Satellite') {
			document.getElementById("Road").checked = false;
			document.getElementById("Hybrid").checked = false;
			map.removeLayer(roads);
			map.removeLayer(hybrid);
			earth.addTo(map)
		}
		else if($(this).attr('id') == 'Hybrid') {
			document.getElementById("Road").checked = false;
			document.getElementById("Satellite").checked = false;
			map.removeLayer(roads);
			map.removeLayer(earth);
			hybrid.addTo(map)
		}
	});
	$('.range-slider').attr({
        max: 1,
        min: 0,
        value: 1,
		step: 0.01,
	});
	$('.range-slider').on('input',function(){
		zones.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
		});
		opacity=this.value
	});
};
function removeSwipe(swipe){
	map.removeLayer(swipe);
}

function roadsStyle(feature) {
	return{
		fillColor: "#000000",
		color: "#000000",
		weight: 1,
		opacity: 1
	}
};
function style(feature){
	// sets the style of the zones
    var opacity = 1.0;
	var color; // color of the zone
    var zoneName = feature.properties.ZONES
	if(zoneName == "Buffer Zone"){ // if it's the buffer zone, make it Powder blue
	color = "#9B8917";
	lineWidth = 0.3;
	lineColor = "Black";
	fillop = opacity
		}
		else if(zoneName == "Strict Protection"){
			color = "#f5aa1c";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Ese’eja and Harakmbut Territories"){
			color = "#C1A76A";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Wildlands"){
			color = "#005c50";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Tourism"){
			color = "#35a649";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity
        }
		else if(zoneName == "Restoration"){
			color = "#D194B6";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Bahuaja-Sonene National Park"){
			color = "None";
			lineWidth = 4;
			lineColor = "ForestGreen";
			fillop = 0
		}
		else if(zoneName == "Direct Use"){
			color = "#59B798";
			//color = "#125e1d";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Low Impact Non-Timber Forest Use"){
			color = "#94c660";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Community Reserve"){
			color = "#c4cc5c";
			lineWidth = 0.3;
			lineColor = "Black";
			fillop = opacity;
		}
		return{
            fillColor: color, // set color according to zone name
            fillOpacity: fillop, //start as partially opaque
			color: lineColor, // black border
            weight: lineWidth,
            opacity: opacity
			//pane: 'overlayPane'
		}
};

function createZones(data){
    zones = L.geoJson(data, {
        //point to layer with the features and the list containing the geoJson attributes
		style: style,
		onEachFeature: onEachFeature,
	}).addTo(map);
	return zones
};
function onEachFeature(feature, layer){
	var popupContent = ('<p style = "text-align: center";><b>'+ feature.properties.ZONES + '</b></p>');
    popupContent += '<p>'+feature.properties.Zone_Description+'</p>';
    //bind the popup to the circle marker
    layer.bindPopup(popupContent);
};
function onEachPOI(feature, layer) {
	var popupContent = ('<p style = "text-align: center"><b>' + feature.properties.poiName + '</b></p>');
	popupContent += '<p>'+feature.properties.infoPOI+'</p>';
	//bind the popup to the circle marker
    layer.bindPopup(popupContent);
}
function removeZones(zones){
	map.removeLayer(zones)
}
function removeRoads(roadsPOI){
	map.removeLayer(roadsPOI)
}
function createAddRoads(data) {
	roadsPOI = L.geoJson(data, {
		style: roadsStyle
	}).addTo(map);
	return roadsPOI;
};
function createAddPOIs(data) {
	layerPOI = L.geoJson(data, {
		onEachFeature: onEachPOI
	}).addTo(map);
	return layerPOI;
}
//way to combine getRoads and getPOIs??
function getRoads() {
	$.ajax("data/Additional_Roads.geojson", {
        dataType: "json",
        success: function(response){
			createAddRoads(response)
		}
	});
};
function getPOIs() {
	$.ajax("data/pointsOfInterest.geojson", {
		dataType: "json",
		success: function(response){
			createAddPOIs(response)
		}
	});
};
function createLeftZone(data){
	console.log("creating left! ", data)
    view1 = L.geoJson(data, {
		style: style,
		pane: 'left',
		onEachFeature: onEachFeature,
	}).addTo(map);
	return view1
};
function createRightZone(data){
	console.log("creating right! ",data);
    view2 = L.geoJson(data, {
		style: style,
		pane: 'right',
		onEachFeature: onEachFeature,
	}).addTo(map);
	return view2
};
function getLeftZones(leftZone){
	$.ajax("data/proposal1.geojson", {
		dataType: "json",
		success: function(response){
			view1Data = response;
			//createLeftZone(response)
		}
	});
};
function getRightZones(rightZone){
	$.ajax("data/proposal2.geojson", {
		dataType: "json",
		success: function(response){
			view2Data = response;
			//createRightZone(response)
		}
	});
};

function getZones(zone){
    //load the geoJson
    $.ajax(zone, {
        dataType: "json",
        success: function(response){
			createZones(response)
        }

	});

};
function preloadData(){
    //define a variable to hold the data
    var proposal1;

    //basic jQuery ajax method
    $.ajax("data/proposal1.geojson", {
        dataType: "json",
        success: function(response){
            proposal1 = response;
            //check the data
            console.log(proposal1);
        }
    });

    //check the data
    console.log(proposal1);
};
//call the initialize function when the document has loaded
$(document).ready(setMap);}