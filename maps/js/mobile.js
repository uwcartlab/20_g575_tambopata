function mobile(){

var map;
var zones;
var roadsPOI;
var view1;
var view2;
var zone2;
var swipe;
var lZone;
var rZone;

var bottomNav = $("<div id = 'navbar2'></div>")
bottomNav.appendTo($("body"));
$('#navbar2').append('<button id = "mProposal1" class="active proposalM col-sm-2.4 col-xs-2.4">1</button>');
$(bottomNav).append('<button id = "mProposal2" class="proposalM col-sm-2.4 col-xs-2.4">2</button>');
$(bottomNav).append('<button id = "mProposal3" class="proposalM col-sm-2.4 col-xs-2.4">3</button>');
$(bottomNav).append('<button id = "mProposal4" class="proposalM col-sm-2.4 col-xs-2.4">4</button>');
$(bottomNav).append('<button id = "mLegend" class="proposalM col-sm-2.4 col-xs-2.4"></button>');

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
};


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
            opacity: opacity,
			pane: 'overlayPane'
		}
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
function getRoads() {
	$.ajax("data/Additional_Roads.geojson", {
        dataType: "json",
        success: function(response){
			createAddRoads(response)
		}
	});
}
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
