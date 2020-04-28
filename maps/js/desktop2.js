//desktop function is for desktop view.

function desktop(){

//global variables
var map;
var proposal1;
var proposal2;
var proposal3;
var proposal4;
var roadsPOI;
var view1;
var view2;
var swipe;

//create the map
function setMap(zones) {
    //roads tile layer from ArcGIS online
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});
	//create the map with its center coordinates and have roads be default layer.
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
	//hybrid has both satellite imagery with labels
	var hybrid  = L.gridLayer.googleMutant({
		type: 'hybrid'
	})
	//earth is just satellite imagery
	var earth = L.gridLayer.googleMutant({
		type: 'satellite' 
	})
	map.createPane('left');
	map.createPane('right');
	//get POI onto the map.
	getPOIs()
	//createProposals is for loading each proposal map based on user's click
	createProposals()
	//creates custom legend control onto the map.
	createLegend(roads, earth, hybrid, view1, view2, swipe)
};

function createProposals(){
	//adding a proposal div and button onto the map.
	var rowBar = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function () {
            // .proposal-container will contain the buttons and have bootstrap classes
            var row = L.DomUtil.create('div', 'proposal-container');

			//bootstrap classes for the div and buttons
			//adding them onto the .proposal-container div
			//each button has an id based on proposal number and all have "proposal" class
			$(row).append('<div class="container-fluid" align = "center">');
			$(row).append('<div class="row">');
			$(row).append('<div id = "proposal1" type = "button" class="active proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 1</div>');
			$(row).append('<div  id = "proposal2" type = "button" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 2</div>');
			$(row).append('<div  id = "proposal3" type = "button" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 3</div>');
			$(row).append('<div  id = "proposal4" type = "button" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 4</div>');
			$(row).append('</div>');
			$(row).append('</div>');

			return row;

		}

	});
	map.addControl(new rowBar());
	//whichever button is pressed, this function will be called
	$('.proposal').click(function(){
		//first thing the function does is removes the current 'active' button and will assign the 'active' button to where it is clicked.
		$('.proposal').removeClass('active');
		//if the id is proposal#, then it will remove the current zone, and call in the zone it is clicked on.
		if ($(this).attr('id') == 'proposal1'){
			removeZones(zones)
			var zone = "data/proposal1.geojson";
			$(this).addClass('active');//adds the active class to this button
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
	//createing the legend control
	//roads, earth, and hybrid basemap tilelayers called into this.
	var LegendControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        onAdd: function () {
            //.legendFrame is the main div where all controls will be appended inot
			var container = L.DomUtil.create('div', 'legendFrame');

			//basemap layers will be inputs as "Radio" buttons
			//additonal roads and compare proposals will be checkboxes
			//opacity slider bar also added
			$(container).append('<input id = "Road" type = "radio" class = "baseMap" checked><span>Roads</span><br>')
			$(container).append('<input id = "Satellite" type = "radio" class = "baseMap"><span>Satellite</span><br>')
			$(container).append('<input id = "Hybrid" type = "radio" class = "baseMap"><span>Hybrid</span><br>')
			$(container).append('<input id = "pointsOfInterest" type = "checkbox" class = "roads" unchecked><span>Additional Roads<span><br>')
			$(container).append('<input id = "Compare" type = "checkbox" class = "Compare" unchecked><span>Compare Proposals<span><br>')
			$(container).append('<span class = "opacityTxt" style="margin-left: 10%;">0%</span>');
			$(container).append('<input class="range-slider" type="range">');
			$(container).append('<span class = "opacityTxt">100%</span>')
			$(container).append('<br><br>')

			//zone color and name
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
	//adding the roads on and off the map
	$('.roads').on('input',function(){
		//if checkbox is checked, the roads will be added onto the map
		//if not checked, it will remove the roads
		if(document.getElementById("pointsOfInterest").checked == true){
			getRoads(roadsPOI)
		} else if(document.getElementById("pointsOfInterest").checked == false){
			removeRoads(roadsPOI)
		}
	});
	//preliminary testing of the overlay widget
	$('.Compare').on('input',function(){
		if(document.getElementById("Compare").checked == true){
			map.createPane('left');
			map.createPane('right');
			map.removeLayer(zones);
			$('.proposal').removeClass('active');
			if ($('.proposal').attr('id') == 'proposal1'){
				var lZone = "data/proposal1.geojson";
				$('#proposal1').addClass('active');
				$('#proposal3').addClass('active');
				getLeftZones(lZone)};
			if ($('.proposal').attr('id') == 'proposal2'){$('#proposal2').removeClass('active');};
			if ($('.proposal').attr('id') == 'proposal3'){
				var rZone = "data/proposal3.geojson";
				$('#proposal3').addClass('active');
				getRightZones(rZone);};
			if ($('.proposal').attr('id') == 'proposal4'){$('#proposal4').removeClass('active');};
			swipe = L.control.sideBySide(view1, view2).addTo(map);
			console.log(view1)
			}
		else if(document.getElementById("Compare").checked == false){
			$('.proposal').removeClass('active');
			map.removeLayer(view1);
			map.removeControl(swipe)
			}

	});
	//basemap implementation...similar workflow to proposal buttons
	$('.baseMap').on('input',function(){
		//if this radio button is clicked on and checked, it will 
		//load that basemap and make sure the other radio buttons are
		//checked off. It will also remove the previous basemap and
		//load in the new one.
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
	//slider bar attributes
	$('.range-slider').attr({
        max: 1,
        min: 0,
        value: 1,
		step: 0.01,
	});
	//slider bar function
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
//set road style
function roadsStyle(feature) {
	return{
		fillColor: "#000000",
		color: "#000000",
		weight: 1,
		opacity: 1
	}
};
//styling for the proposal zones
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
			lineWidth = 3;
			lineColor = "White";
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
		}
};


//popup style for the zones
function onEachFeature(feature, layer){
	var popupContent = ('<p style = "text-align: center";><b>'+ feature.properties.ZONES + '</b></p>');
    popupContent += '<p>'+feature.properties.Zone_Description+'</p>';
    //bind the popup to the circle marker
    layer.bindPopup(popupContent);
};
//popup style for the POI markers
function onEachPOI(feature, layer) {
	var popupContent = ('<p style = "text-align: center"><b>' + feature.properties.poiName + '</b></p>');
	popupContent += '<p>'+feature.properties.infoPOI+'</p>';
	//bind the popup to the circle marker
    layer.bindPopup(popupContent);
}
//remove zones based on the proposal button inputs.
function removeZones(zones){
	map.removeLayer(zones)
}
//function to remove roads from map if the checkmark is unchecked.
function removeRoads(roadsPOI){
	map.removeLayer(roadsPOI)
}
//adds the roads onto the map when called.
function createAddRoads(data) {
	roadsPOI = L.geoJson(data, {
		style: roadsStyle
	}).addTo(map);
	return roadsPOI;
};
//adding the POI markers to the map.
function createAddPOIs(data) {
	layerPOI = L.geoJson(data, {
		onEachFeature: onEachPOI
	}).addTo(map);
	return layerPOI;
}
//way to getPOIs
function getRoads() {
	$.ajax("data/Additional_Roads.geojson", {
        dataType: "json",
        success: function(response){
			createAddRoads(response)
		}
	});
};
//using ajax to get POI geojson from the data folder
function getPOIs() {
	$.ajax("data/pointsOfInterest.geojson", {
		dataType: "json",
		success: function(response){
			createAddPOIs(response)
		}
	});
};
function createLeftZone(data){
    view1 = L.geoJson(data, {
		style: style,
		pane: 'left',
		onEachFeature: onEachFeature,
	}).addTo(map);
	return view1
};
function createRightZone(data){
    view2 = L.geoJson(data, {
		style: style,
		pane: 'right',
		onEachFeature: onEachFeature,
	}).addTo(map);
	return view2
};
function getLeftZones(leftZone){
	$.ajax(leftZone, {
		dataType: "json",
		success: function(response){
			createLeftZone(response)
		}
	});
};
function getRightZones(rightZone){
	$.ajax(rightZone, {
		dataType: "json",
		success: function(response){
			createRightZone(response)
		}
	});
};
//create zones loads in the data from the ajax function and uses
//leaflets geoJson function to add it onto the map.
function createZones(data){
    zones = L.geoJson(data, {
        //point to layer with the features and the list containing the geoJson attributes
		style: style,
		onEachFeature: onEachFeature,
	}).addTo(map);
	return zones
};
//get zone based on input or default load.
//zone is the filepath of the geojson to be loaded onto the map. 
function getZones(zone){
    //load the geoJson
    $.ajax(zone, {
        dataType: "json",
        success: function(response){
			createZones(response)
        }

	});

};
//call the initialize function when the document has loaded
$(document).ready(setMap);}
