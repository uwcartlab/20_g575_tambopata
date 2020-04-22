//initialize function called when the script loads
//create map
var map;
var zones;

function setMap(zones) {
    //<- initialize()
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});

    map = L.map('map', {
		center: [-13.2, -69.5],
		zoom: 9,
		minZoom: 8,
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
	const baseMaps = {
		"Roads": roads,
		"Satellite": earth,
		"Hybrid": hybrid
	};
	var images = L.control.layers(
		baseMaps,null,{collapsed:false,position: 'topleft'});


	var deFault = "data/proposal1.geojson"
	getData(deFault)

	createProposals()
	images.addTo(map);
	createOpacityControls()
	createLegend()

	createHomeButton();
};
// quick home button to get back to the home page
function createHomeButton(){
	var home = L.Control.extend({
		options: {
            position: 'bottomleft'
        },
		onAdd: function(){
			var homeButton = L.DomUtil.create('div', 'homeDiv');

			$(homeButton).append('<button onclick="redirect(\'..\')">Home</button>');

			return homeButton;
		}
	});
	map.addControl(new home());
}

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
			$(row).append('<div id = "proposal1" class="active proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 1</div>');
			$(row).append('<div id = "proposal2" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 2</div>');
			$(row).append('<div id = "proposal3" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 3</div>');
			$(row).append('<div id = "proposal4" class="proposal col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 4</div>');
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
			getData(zone);
		} else if ($(this).attr('id') == 'proposal2'){
			removeZones(zones)
			var zone = "data/proposal2.geojson";
			$(this).addClass('active');
			getData(zone);
		}
		else if ($(this).attr('id') == 'proposal3'){
			removeZones(zones)
			var zone = "data/proposal3.geojson";
			$(this).addClass('active');
			getData(zone);
		}
		else if ($(this).attr('id') == 'proposal4'){
			removeZones(zones)
			var zone = "data/proposal4.geojson";
			$(this).addClass('active');
			getData(zone);
		}

	});
};
function createLegend(){
	var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legendFrame');
            $(container).append('<h1 class = "legendHeader">Proposed Zones</h1>')
			$(container).append('<p class="legendtxt">Buffer Zone</p>');
			$(container).append('<div class="legend" id="bufferZone" ></div>');
			$(container).append('<p class="legendtxt">Community Reserve</p>');
			$(container).append('<div class="legend" id="communityReserve" ></div>');
			$(container).append('<p class="legendtxt">Strict Protection</p>');
			$(container).append('<div class="legend" id="strictProtection" ></div>');
			$(container).append('<p class="legendtxt">Wildlands</p>');
			$(container).append('<div class="legend" id="wildlands" ></div>');
			$(container).append('<p class="legendtxt">Eseeja and Harakmbut Territiroes</p>');
			$(container).append('<div class="legend" id="nativeCommunities" ></div>');
			$(container).append('<p class="legendtxt">Tourism</p>');
			$(container).append('<div class="legend" id="Tourism" ></div>');
			$(container).append('<p class="legendtxt">Low Impact Non-Timber Forest Use</p>');
			$(container).append('<div class="legend" id="forestUse" ></div>');
			$(container).append('<p class="legendtxt">Direct Use</p>');
			$(container).append('<div class="legend" id="directUse" ></div>');
			$(container).append('<p class="legendtxt">Restoration</p>');
			$(container).append('<div class="legend" id="Restoration" ></div>');
			$(container).append('<p class="legendtxt">Bahuaja-Sonene National Park</p>');
			$(container).append('<div class="legend" id="nationalPark" ></div>');

            // $(container).append(legendItems)
            return container;
        }
    });
    //adds the legend to the map.
    map.addControl(new LegendControl());
};
function createOpacityControls(){
	var opacityBar = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function () {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'opacity_slider_control');

			// ... initialize other DOM elements
			$(container).append('<span class = "opacityTxt" style="float:left;">0%</span>');
			$(container).append('<input class="range-slider" type="range">');
			$(container).append('<span class = "opacityTxt" style="float:right; margin-right: -5px;">100%</span>');


            //if you double click on the div, it will not have the map zoom.
            L.DomEvent.disableClickPropagation(container);

			return container;

        }
    });

	map.addControl(new opacityBar());
	$('.range-slider').attr({
        max: 1,
        min: 0,
        value: 1,
		step: 0.01,
	});
	console.log(zones)
	$('.range-slider').on('input',function(){
		zones.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
		});
		opacity=this.value
	});

};
function style(feature){
	// sets the style of the zones
    var opacity = 1.0;
	var color; // color of the zone
    var zoneName = feature.properties.ZONES
	if(zoneName == "Buffer Zone"){ // if it's the buffer zone, make it Powder blue
	color = "#527a2b";
		}
		else if(zoneName == "Strict Protection"){
			color = "#f5aa1c";
		}
		else if(zoneName == "Ese’eja and Harakmbut Territories"){
			color = "#c4cc5c";
		}
		else if(zoneName == "Wildlands"){
			color = "#005c50";
		}
		else if(zoneName == "Tourism"){
			color = "#35a649";
        }
		else if(zoneName == "Restoration"){
			color = "#d87bb1";
		}
		else if(zoneName == "Bahuaja-Sonene National Park"){
			color = "ForestGreen";
		}
		else if(zoneName == "Direct Use"){
			color = "#125e1d";
		}
		else if(zoneName == "Low Impact Non-Timber Forest Use"){
			color = "#94c660";
		}
		else if(zoneName == "Community Reserve"){
			color = "#b29d77";
		}
		return{
            fillColor: color, // set color according to zone name
            fillOpacity: opacity, //start as partially opaque
			color: "black", // black border
            weight: 0.3,
            opacity: opacity,
			pane: 'overlayPane'
		}
};
function createZones(data){
    zones = L.geoJson(data, {
        //point to layer with the features and the list containing the geoJson attributes
		style: style,
		onEachFeature: onEachFeature
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
function getData(zone){
    //load the geoJson
    $.ajax(zone, {
        dataType: "json",
        success: function(response){
			createZones(response)
        }

	});

};
//call the initialize function when the document has loaded
$(document).ready(setMap);
