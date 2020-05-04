//desktop function is for desktop view.

function desktop(){
//global variables
var map;
var proposal1_right;
var proposal2_right;
var proposal3_right;
var proposal4_right;
var proposal1_left;
var proposal2_left;
var proposal3_left;
var proposal4_right
var proposal1, proposal2, proposal3, proposal4;
var view1, view2, view3, view4;
var roadsPOI;
var swipe;

//create the map
function setMap() {
    //roads tile layer from ArcGIS online
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});
	//create the map with its center coordinates and have roads be default layer.
    map = L.map('map', {
		center: [-12.9, -69.5],
		zoom: 10,
		minZoom: 9,
		layers: [roads],
		maxBounds: ([
			[-9.2,-73.5],
			[-17.2, -65.5]
		])

	});
	var parkLabel = new L.marker([-13.5, -69.5], { opacity: 0.01 }); //opacity may be set to zero
	parkLabel.bindTooltip("Bahuaja-Sonene National Park", {direction: 'center', permanent: true, className: "parkLabel", interactive: false, offset: [0, 0] });
	parkLabel.addTo(map);
	map.on('zoomstart', function () {
		var zoomLevel = map.getZoom();
		var tooltip = $('.leaflet-tooltip');
	
		switch (zoomLevel) {
			case 10:
				tooltip.css('font-size', 28);
				break;
			case 9:
				tooltip.css('font-size', 24);
				break;
		}
	})
	//hybrid has both satellite imagery with labels
	// var hybrid  = L.esri.basemapLayer('ImageryLabels');
	// //earth is just satellite imagery
	// var earth =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	// });
	var hybrid  = L.gridLayer.googleMutant({
		type: 'hybrid'
	}) 
	//earth is just satellite imagery
	var earth = L.gridLayer.googleMutant({
		type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
	})
	map.createPane('left');
    map.createPane('right');
    getPOIs()

	var promises = [];
    //promises will use d3 to push the csv and topojson files of Chicago neighborhood boundaries,
    promises.push($.getJSON("data/proposal1.geojson"));
    promises.push($.getJSON("data/proposal2.geojson"));
    promises.push($.getJSON("data/proposal3.geojson"));
    promises.push($.getJSON("data/proposal4.geojson"));
    //list of promises goes and has the callback function be called
    Promise.all(promises).then(callback);

    //callback brings in the data
    function callback(data){
        //these 4 variables list are from the promise list
        //this will be used for the topojson work.
        view1 = data[0];
        view2 = data[1];
        view3 =data[2];
        view4 = data[3];
		createProposals(view1, view2, view3, view4)
		createLegend(roads, earth, hybrid)
	}

};
function createProposals(){
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
			$(row).append('<button id = "proposal1"  type = "button" class="active proposal pr1 col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 1</button>');
			$(row).append('<button  id = "proposal2" type = "button" class="proposal pr2 col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 2</button>');
			$(row).append('<button  id = "proposal3" type = "button" class="proposal pr3 col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 3</button>');
			$(row).append('<button  id = "proposal4" type = "button" class="proposal pr4 col-lg-3 col-md-3 col-sm-3 col-xs-3">Proposal 4</button>');
			$(row).append('</div>');
			$(row).append('</div>');
			L.DomEvent.disableClickPropagation(row)
			return row;

		}
	});
	map.addControl(new rowBar());
	proposal1 = L.geoJson(view1, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
		onEachFeature: onEachFeature,
	});
	proposal2 = L.geoJson(view2, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
		onEachFeature: onEachFeature,
	});
	proposal3 = L.geoJson(view3, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
		onEachFeature: onEachFeature,
	});
	proposal4 = L.geoJson(view4, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
		onEachFeature: onEachFeature,
    });
	proposal1_left = L.geoJson(view1, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'left',
		onEachFeature: onEachFeature,
    });
    proposal2_left = L.geoJson(view2, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'left',
		onEachFeature: onEachFeature,
    });
    proposal3_left = L.geoJson(view3, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'left',
		onEachFeature: onEachFeature,
	});
	proposal4_left = L.geoJson(view4, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'left',
		onEachFeature: onEachFeature,
    });
	proposal1_right = L.geoJson(view1, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'right',
		onEachFeature: onEachFeature,
    });
    proposal2_right = L.geoJson(view2, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'right',
		onEachFeature: onEachFeature,
    });
    proposal3_right = L.geoJson(view3, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'right',
		onEachFeature: onEachFeature,
    });
    proposal4_right = L.geoJson(view4, {
        //point to layer with the features and the list containing the geoJson attributes
        style: style,
        pane: 'right',
		onEachFeature: onEachFeature,
	});
	swipe = L.control.sideBySide(proposal1_left, proposal4_right);
	proposal1.addTo(map)
	$('#proposal1').on('click',function(){
		var activeList = []
		$('.proposal').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("proposal")[1]
				activeCount = Number(activeCount)
				activeList.push(activeCount)}
			})
		console.log(activeList)
		if(activeList.length ==2){
			if(activeList[0]!=1 && activeList[1]!=1){
				alert("2 Buttons Already Selected!!")
				return
			}
		}
		map.removeLayer(proposal1)
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			map.removeLayer(proposal1_left);
			map.removeLayer(proposal1_right);
			map.removeControl(swipe);
			turnOff()
		}else{
			var value;
			$('.proposal').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
                    value = value.split("proposal")[1]
					value = Number(value)}
			})
			if(value == 2){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal2_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 4){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == null){
				proposal1.addTo(map);
				turnOff()
				}
			$(this).addClass('active')
			}
		})
	$('#proposal2').on('click',function(){
		var activeList = []
		$('.proposal').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("proposal")[1]
				activeCount = Number(activeCount)
				activeList.push(activeCount)}
			})
		if(activeList.length == 2){
			if(activeList[0]!=2 && activeList[1]!=2){
				alert("2 Buttons Already Selected!!")
				return
			}
		}
		map.removeLayer(proposal1)
		map.removeLayer(proposal2)
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			map.removeLayer(proposal2_left);
			map.removeLayer(proposal2_right);
			map.removeLayer(proposal2);
			map.removeControl(swipe);
			turnOff()
		}else{
			var value;
			map.removeControl(swipe);
			$('.proposal').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
					value = value.split("proposal")[1]
					value = Number(value)}
			})
			if(value == 1){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal2_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 4){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == null){
				proposal2.addTo(map);
				turnOff()
				}
			$(this).addClass('active')
			
		}		
	})
	$('#proposal3').on('click',function(){
		var activeList = []
		$('.proposal').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("proposal")[1]
				activeCount = Number(activeCount)
				activeList.push(activeCount)}
			})
		console.log(activeList)
		if(activeList.length == 2){
			if(activeList[0]!=3 && activeList[1]!=3){
				alert("2 Buttons Already Selected!!")
				return
			}
		}
		console.log("Button 3 clicked")
		map.removeLayer(proposal1)
		map.removeLayer(proposal3)
		if($(this).hasClass('active')){
			console.log("Already active, taking it down")
			$(this).removeClass('active');
			map.removeLayer(proposal3_left);
			map.removeLayer(proposal3_right);
			map.removeLayer(proposal3)
			map.removeControl(swipe);
			turnOff()
		}else{
			console.log("This is not active, determining if it needs a swipe or not")
			var value;
			map.removeControl(swipe);
			$('.proposal').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
					value = value.split("proposal")[1]
					value = Number(value)}
				})
			if(value == 1){
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 2){
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 4){
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal3_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == null){
				console.log("Nothing is active, just adding proposal 3")
				proposal3.addTo(map)
				turnOff()
				}
			$(this).addClass('active')
			}
				
	})
	$('#proposal4').on('click',function(){
		var activeList = []
		$('.proposal').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("proposal")[1]
				activeCount = Number(activeCount)
				activeList.push(activeCount)}
			})
		if(activeList.length == 2){
			if(activeList[0]!=4 && activeList[1]!=4){
				alert("2 Buttons Already Selected!!")
				return
			}
		}
		map.removeLayer(proposal1)
		map.removeLayer(proposal4);
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			map.removeLayer(proposal4_left);
			map.removeLayer(proposal4_right);
			map.removeLayer(proposal4)
			map.removeControl(swipe);
			turnOff()
		}else{
			var value;
			map.removeControl(swipe);
			$('.proposal').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
					value = value.split("proposal")[1]
					value = Number(value)}
			})
			if(value == 1){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 2){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal3_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				turnOn()
				}
			else if(value == null){
				proposal4.addTo(map)
				turnOff()
				}
			$(this).addClass('active')
			}
						
	})
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
			$(container).append('<input id = "Road" type = "radio" class = "baseMap" checked><span id = "baseMap" >Roads</span><br>')
			$(container).append('<input id = "Satellite" type = "radio" class = "baseMap"><span id = "baseMap">Satellite</span><br>')
			$(container).append('<input id = "Hybrid" type = "radio" class = "baseMap"><span id = "baseMap">Hybrid</span><br>')
			$(container).append('<input id = "pointsOfInterest" type = "checkbox" class = "roads" unchecked><span id = "baseMap">Additional Roads<span><br>')
			$(container).append('<div id = "compareMaps" class = "compare"><span>Compare Proposal Maps:<span><span id="switch" class = "Off"> UNACTIVE<span></div><br>')
			$(container).append('<div id = "opacityTitle" class = "opacityTitle">Slide to Change Transparency on Zones</div>')
			$(container).append('<span class = "opacityTxt" style="margin-left: 10%;">0%</span>');
			$(container).append('<input class="range-slider" type="range">');
			$(container).append('<span class = "opacityTxt">100%</span>')
			$(container).append('<br>')

			//zone color and name
			$(container).append('<p class="legendtxt">Buffer Zone</p>');
			$(container).append('<div class="legend" id="bufferZone" ></div>');
			$(container).append('<p class="legendtxt">Community Reserve</p>');
			$(container).append('<div class="legend" id="communityReserve" ></div>');
			$(container).append('<p class="legendtxt">Strict Protection</p>');
			$(container).append('<div class="legend" id="strictProtection" ></div>');
			$(container).append('<p class="legendtxt">Wildlands</p>');
			$(container).append('<div class="legend" id="wildlands" ></div>');
			$(container).append('<p class="legendtxt">Tourism</p>');
			$(container).append('<div class="legend" id="Tourism" ></div>');
			$(container).append('<p class="legendtxt">Direct Use</p>');
			$(container).append('<div class="legend" id="directUse" ></div>');
			$(container).append('<p class="legendtxt">Restoration</p>');
			$(container).append('<div class="legend" id="Restoration" ></div>');
			$(container).append('<p class="legendtxt">Ese\'eja and Harakmbut Territories</p>');
			$(container).append('<div class="legend" id="nativeCommunities" ></div>');
			$(container).append('<p class="legendtxt">Low Impact Non-Timber Forest Use</p>');
			$(container).append('<div class="legend" id="forestUse" ></div>');
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
			map.removeLayer(hybrid);
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
			// map.removeLayer(earth);
			earth.addTo(map)
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
			proposal1.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
			});
			proposal2.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
			});
			proposal3.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
			});
			proposal4.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
				});
			proposal1_left.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
			});
			opacity=this.value
			proposal2_left.setStyle({
			opacity: this.value,
			fillOpacity: this.value,
			animate: "fast",
			});
			opacity=this.value
			proposal3_left.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
			});
			opacity=this.value
			proposal1_right.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
				});
			opacity=this.value
			opacity=this.value
			proposal2_right.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
				});
			proposal3_right.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
				});
			opacity=this.value
			proposal4_right.setStyle({
				opacity: this.value,
				fillOpacity: this.value,
				animate: "fast",
				});
			opacity=this.value
	})

};
function turnOn(){
	$('#switch').removeClass('Off');
	$('#switch').text(' ACTIVE');
	$('#switch').addClass('On');
}
function turnOff(){
	$('#switch').removeClass('On');
	$('#switch').text(' UNACTIVE');
	$('#switch').addClass('Off');
}
//set road style
function roadsStyle(feature) {
	var color = "#543005" //road color
//attempting to change color of Additional_Roads geojson based on the basedmap selected
	//white road is being shown, so its reading the basemap id, but its not updating when a different basemap is seleceted
	//also, the satellite and hybrid basemaps disappear after a few clicks

		// if ($('.baseMap').attr('id') == 'Road') {
		// 	color = "#000000" ;
		// }
		// else if ($('.baseMap').attr('id') == 'Satellite') {
		// 	color = "#D194B6";
		// }
		// else if ($('.baseMap').attr('id') == 'Hybrid') {
		// 	color = "#9B8917";
		// }
	return{
		color: color,
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
	lineWidth = 0.1;
	lineColor = "Black";
	fillop = opacity
		}
		else if(zoneName == "Strict Protection"){
			color = "#f5aa1c";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Ese’eja and Harakmbut Territories"){
			color = "#C1A76A";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Wildlands"){
			color = "#005c50";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Tourism"){
			color = "#35a649";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
        }
		else if(zoneName == "Restoration"){
			color = "#D194B6";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Bahuaja-Sonene National Park"){
			color = "None";
			lineWidth = 3;
			lineColor = "#7F7F7F";
			fillop = 0
			//can change opacity based on Tanya's suggestion, but would need to change colors based on the basemap used
			opacity = 1;
		}
		else if(zoneName == "Direct Use"){
			color = "#59B798";
			//color = "#125e1d";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Low Impact Non-Timber Forest Use"){
			color = "#94c660";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Community Reserve"){
			color = "#c4cc5c";
			lineWidth = 0.1;
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

//function to remove roads from map if the checkmark is unchecked.
function removeRoads(roadsPOI){
	map.removeLayer(roadsPOI)
}
//adds the roads onto the map when called.
function createAddRoads(data) {
	//create pane for additional roads layer to always be 'above' the other geojson layers
	map.createPane('roadsPane');
	map.getPane('roadsPane').style.zIndex=450;
	map.getPane('roadsPane').style.pointerEvents = 'none';

	roadsPOI = L.geoJson(data, {
		style: roadsStyle,
		pane: 'roadsPane'
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
	$.ajax("data/Roads.geojson", {
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
//call the initialize function when the document has loaded
$(document).ready(setMap);}
