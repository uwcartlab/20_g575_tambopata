//initialize function called when the script loads
//create map
var map;

function setMap(zones) {
    //<- initialize()

    map = L.map('map', {
		center: [-13.2, -69.5],
        zoom: 9,

    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}).addTo(map);
	
	getData();
	// createProposalNav()
	createOpacityControls()
	createLegend()
};
function createProposalNav(){
	var navBar = L.Control.extend({
        options: {
            position: 'top'
        },

        onAdd: function () {
            // create the control container div with a particular class name
            var nav = L.DomUtil.create('nav', 'navbar navbar-expand-lg navbar-expand-sm navbar-expand-md navbar-dark bg-dark fixed-top');

			// ... initialize other DOM elements
			$(nav).append('<ul class="navbar-nav ml-auto navbar-fixed-top"></ul>');
			$(nav).append('<li class="nav-item">Proposal 1</li>');
			$(nav).append('<li class="nav-item">Proposal 2</li>');
			$(nav).append('<li class="nav-item">Proposal 3</li>');
			$(nav).append('<li class="nav-item">Proposal 4</li>');
			return nav;
			
		}
		
	});
	map.addControl(new navBar());
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
			$(container).append('<input class="range-slider" type="range">');
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
            opacity = 0.2;
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
    //create a Leaflet GeoJSON layer and add it to the map
    zones = L.geoJson(data, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style
	}).addTo(map);
	return zones
};
function getData(){
    //load the geoJson
    $.ajax("data/proposal1.geojson", {
        dataType: "json",
        success: function(response){
			createZones(response)
        }
    
	});
	
};
//call the initialize function when the document has loaded
$(document).ready(setMap);
