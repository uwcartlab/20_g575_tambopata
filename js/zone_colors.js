//initialize function called when the script loads
//create map
var map;

function setMap() {
    //<- initialize()

    map = L.map('map', {
		center: [-13.2, -69.5],
        zoom: 9,

    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
	//create the map and set its initial view on Tambopata area

	getData();

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
            weight: 1,
            opacity: opacity,
			pane: 'overlayPane'
		}
};
function createZones(data){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style
    }).addTo(map);
};
function getData(){
    //load the geoJson
    $.ajax("data/proposal4.geojson", {
        dataType: "json",
        success: function(response){
            createZones(response)


        }
    
    });
};


//call the initialize function when the document has loaded
$(document).ready(setMap);
