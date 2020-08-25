//desktop function is for desktop view.
function desktop(){

//ls checks to see if user has visted the page or not.
var ls = sessionStorage.getItem('tambopata.visited');

//if not visited, the tutorial video modal will appear. Otherwise, it will not open when you open the proposals page.
if (ls == null) {
	$(window).on('load',function(){
		$('#tutorialModal').modal('show');
	});
}else{
	sessionStorage.setItem('tambopata.visited', "visited")
	overlayOff()
}
//global variables
var map;
var view1, view2, view3, view4;
var overlayLeft, overlayRight, overlay;
var roadsPOI;
var swipe;
var swipeList;
var roadColor = "#a9a9a9";
var opacity;
var TNR;

//create the map
function setMap() {
    //roads tile layer from ArcGIS online
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});
	//create the map with its center coordinates and have roads be default layer.
    map = L.map('map', {
		center: [-12.95, -69.7],
		zoom: 10,
		minZoom: 9,
		layers: [roads],
		maxBounds: ([
			[-9.2,-73.5],
			[-17.2, -65.5]
		])

	});
	map.attributionControl.addAttribution('<a target = "_blank" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a> This work is licensed under a <a target = "_blank" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>')
	//parkLabel added onto map for just labeling the national park
	var parkLabel = new L.marker([-13.5, -69.5], { opacity: 0.01 }); //opacity may be set to zero
	//parkLabel is the css class to edit the properties
	parkLabel.bindTooltip("Bahuaja-Sonene National Park", {direction: 'center', permanent: true, className: "parkLabel", interactive: false, offset: [0, 0] });
	parkLabel.addTo(map);
	//zoom levels will dictate the size of the park label
	map.on('zoomstart', function () {
		var zoomLevel = map.getZoom();
		var tooltip = $('.leaflet-tooltip');

		switch (zoomLevel) {
			case 10:
				tooltip.css('font-size', 20);
				break;
			case 9:
				tooltip.css('font-size', 18);
				break;
		}
	})

	var hybrid = L.esri.basemapLayer('ImageryTransportation')

	var earth = L.esri.basemapLayer('Imagery')
	
	//map panes are created
	//left and right panes are for the swipe
	map.createPane('left');
	map.createPane('right');
	//Overlay is for the individual map
	map.createPane('Overlay')

	//POIs are just the markers for lecture notes of the map.
	getPOIs()
	getTNR()

	//blank list of promises for before pushing the geojsons
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
		console.log(opacity)
        //these 4 variables list are from the promise list
        //this will be used for the topojson work.
        view1 = data[0];
        view2 = data[1];
        view3 = data[2];
		view4 = data[3];
		
		//proposals and legend will be called
		createProposals(view1, view2, view3, view4)
		createLegend(roads, earth, hybrid)
	}
};
function createProposals(){
	//add the proposal buttons onto the map itself
	var rowBar = L.Control.extend({
        options: {
            position: 'topleft'
        },
        onAdd: function () {
            // .proposal-container will contain the buttons and have bootstrap classes
            var container = L.DomUtil.create('div', 'proposal-container');

			//bootstrap classes for the div and buttons
			//adding them onto the .proposal-container div
			//each button has an id based on proposal number and all have "proposal" class
			
			var row = $("<div class = 'row'></div>")
			row.appendTo($(container));
			$(row).append('<button  id = "proposal1"  type = "button" class="active proposal pr1 col">Proposal 1</button>');
			$(row).append('<button  id = "proposal2" data-html="true" data-toggle="tooltip" data-placement="bottom" title="Click once to compare between Proposals 1 & 2. <br><br>Click twice just to view Proposal 2<br>"  type = "button" class="proposal pr2 col">Proposal 2</button>');
			$(row).append('<button  id = "proposal3" type = "button" class="proposal pr3 col">Proposal 3</button>');
			$(row).append('<button  id = "proposal4" type = "button" class="proposal pr4 col">Proposal 4</button>');
			$(row).append('<button  id = "print" type = "button" class="print pr4 col">Download as PDF</button><br><br>');
			$(container).append('<div class = "leftView">LEFT: Proposal 1</div>');
			$(container).append('<div class = "rightView">RIGHT: Proposal 3</div>');
			L.DomEvent.disableClickPropagation(container)
			return container;
		}
	});
	//proposal buttons are added onto the map
	map.addControl(new rowBar());

	//tooltip to appear when you first open the page
	//advises the user how to use the buttons to view certain proposals
	$("#proposal2").tooltip({
		delay: {hide: 50},
	}).tooltip('show')

	overlayLeft = L.geoJson(view1, {
		pane: "left",
		//point to layer with the features and the list containing the geoJson attributes
		style: style,
		opacity: opacity,
		onEachFeature: onEachFeature,
	});
	overlayRight = L.geoJson(view3, {
		//point to layer with the features and the list containing the geoJson attributes
		style: style,
		opacity: opacity,
		pane: "right",
		onEachFeature: onEachFeature,
	});
	//addes proposal 1 to the map by default when you first open page.
	overlay = L.geoJson(view1,{
		style: style,
		pane: 'Overlay',
		onEachFeature: onEachFeature,
	}).addTo(map)

	//checkmarks are added to button 1
	$('#proposal1').append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');
	$('#proposal1').append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');

	//the left and right view divs will not be present until two proposals are being compared. 
	$('.leftView').css("display","none");
	$('.rightView').css("display","none");

	//default swipe list values
	swipeList = [1, 1]
	//when a proposal button is clicked on, this function will be called. 
	$($('.proposal')).on({
		click: function(){
			//tooltip will disappear 
			$(this).tooltip("dispose")

			//if any of these values are on the map, they will be taken down. 
			if(overlay != null){
				map.removeLayer(overlay)
			}
			if(overlay != null){
				map.removeLayer(overlayLeft)
			}
			if(overlay != null){
				map.removeLayer(overlayRight)
			}
			if(swipe != null){
				map.removeControl(swipe)
			}
			//.each function goes through any element containing the '.proposal' class and will remove the active class with it.
			$('.proposal').each(function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active')
				}})
			//updates the proposal button labels and will briefly take down the checkmarks. 
			$('#proposal'+String(swipeList[0])).text('Proposal '+String(swipeList[0]));
			$('#proposal'+String(swipeList[1])).text('Proposal '+String(swipeList[1]));

			//variable value is called
			var value = this.id

			//strips the number of the propsal from the button id
			value = value.split("proposal")[1]
			//converts it from a string to a number
			value = Number(value)
			//pushes it to the swipe list. Right now, the list has three items
			swipeList.push(value)
			//shift takes away the first list item, and now has two items again
			swipeList.shift()

			//if both the swipe list items have the same value, this only loads the overlay geojson
			if(swipeList[0]==swipeList[1]){
				var justOne = "view"+swipeList[1]
				//only one map is called and added
				overlay = L.geoJson(eval(justOne),{
					style: style,
					pane: 'Overlay',
					onEachFeature: onEachFeature,
				}).addTo(map)
				//swipe will be removed. 
				map.removeControl(swipe);
				//text and checkmarks are now updated all onto one button.
				//left and right view divs will be updated, but later hidden for the user to see
				$('.leftView').text('LEFT: Proposal '+String(swipeList[0]));
				$('#proposal'+String(swipeList[0])).append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');
				$('.rightView').text('RIGHT: Proposal '+String(swipeList[1]));
				$('#proposal'+String(swipeList[1])).append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');
				$('#proposal'+String(swipeList[0])).addClass('active');
				$('#proposal'+String(swipeList[1])).addClass('active');

				//left and right divs are hidden until proposals are being compared again
				$('.leftView').css("display","none");
				$('.rightView').css("display","none");
				//stops the rest of the click function and returns what happened in this if statement. 
				return
			}
			//left and right concats the swipelist number and view string
			var left = "view"+swipeList[0]
			var right = "view"+swipeList[1]
			//eval() functions checks to see if there is a variable already called that. If true (which in this case yes),
			//that variable will be called to load.

			//left overlay has left pane, while right overlay has right pane
			overlayLeft = L.geoJson(eval(left), {
				style: style,
				pane: 'left',
				onEachFeature: onEachFeature,
			});
			overlayRight = L.geoJson(eval(right), {
				style: style,
				pane: 'right',
				onEachFeature: onEachFeature,
			});
			//text on the left and right divs are updated, as well as checkmarks
			$('.leftView').text('LEFT: Proposal '+String(swipeList[0]));
			$('#proposal'+String(swipeList[0])).append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');
			$('.rightView').text('RIGHT: Proposal '+String(swipeList[1]));
			$('#proposal'+String(swipeList[1])).append('<i class="fa fa-check-circle fa-md" aria-hidden="true"></i>');
			//swipe and overlays are now added
			swipe = L.control.sideBySide(overlayLeft.addTo(map), overlayRight.addTo(map)).addTo(map);
			$('.leaflet-sbs-range').click(function(){
				$(this).tooltip("hide");
			})
			//for loop to see which button is active to change color
			for(var i in swipeList){
				$('#proposal'+String(swipeList[i])).addClass('active')
			}
			//css style of left/right div are updated to be visible. 
			$('.leftView').css("display","block");
			$('.rightView').css("display","block");
		}
	})
	$($('.print')).on({
		click: function(){
			window.open("data/TambopataProposalMaps.pdf","_blank")
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
			$(container).append('<div class = "tutorialDiv"><button class="btn tutorial" data-toggle="modal" href="#tutorialModal" >How do I use this map?</button></div>')
			//basemap layers will be inputs as "Radio" buttons
			//additonal roads and compare proposals will be checkboxes
			//opacity slider bar also added
			$(container).append('<input id = "Road" type = "radio" class = "baseMap" checked><span id = "baseMap" >Primary Roads</span><br>')
			$(container).append('<input id = "Satellite" data-toggle="tooltip" data-placement="top" title="Click here to change the base map!" type = "radio" class = "baseMap"><span id = "baseMap">Satellite</span><br>')
			$(container).append('<input id = "Hybrid" type = "radio" class = "baseMap"><span id = "baseMap">Hybrid</span><br>')
			$(container).append('<input id = "pointsOfInterest" type = "checkbox" class = "roads" unchecked><span id = "baseMap">Secondary Roads<span><br>')
			$(container).append('<div id = "opacityTitle" class = "opacityTitle">Use Slider to Change Zone Transparency</div>')
			$(container).append('<span class = "opacityTxt" style="margin-left: 10%;">0%</span>');
			$(container).append('<input class="range-slider"  data-toggle="tooltip" data-placement="right" title="Use Slider to Change Zone Transparency" type="range">');
			$(container).append('<span class = "opacityTxt">100%</span>')
			$(container).append('<br><br>')

			//zone color and name
			$(container).append('<p class="legendtxtNP">Bahuaja-Sonene National Park</p>');
			$(container).append('<div class="NationalPark" id="NationalPark" ></div>');
			$(container).append('<p class="legendtxtTNR">Tambopata National Reserve</p>');
			$(container).append('<div class="TNRboundary" id="TNR" ></div>');
			$(container).append('<div class="zoneHeader">Zone Categories</div>');
			//ZONE Categories
			$(container).append('<div class = "item item1"><div class="block" id="bufferZone"></div><p class="legendtxt">Buffer Zone</p></div><div class = "zone1 zoneDesc">This zone is meant to buffer the Tambopata National Reserve from the negative environmental impacts of human activities in the surrounding area. Any activity is allowed in the Buffer Zone provided it does not harm the Tambopata Reserve. Mining, commercial agriculture, logging, or tourism must first conduct an environmental impact assessment, receive approval from the Peruvian Park Service, and obtain a legal concession before initiating approved activities. No government agency is officially designated with monitoring and managing the Buffer Zone.</div>');
			$(container).append('<div class = "item item2"><div class="block" id="communityReserve"></div><p class="legendtxt">Community Resereve</p></div><div class = "zone2 zoneDesc">A zoning category invented and promoted by a group of local citizens involved in the participatory zoning process. It was not originally part of the formal zoning options presented to the roundtable by the Peruvian government. As proposed, this zone would allow all activities permitted in the Buffer Zone but only by local Tambopata residents.</div>');
			$(container).append('<div class = "item item3"><div class="block" id="nativeCommunities"></div><p class="legendtxt">Ese\'eja and Harakmbut Territories</p></div><div class = "zone3 zoneDesc">Only Ese\'eja and Harakmbut peoples have right to reside in this zone and use the land as they wish, including for agriculture. They can also hunt, fish, and harvest forest resources. Local Ese�eja and Harakmbut residents can mine, log, and/or run tourism businesses if they have appropriate concession permits.</div>');
			$(container).append('<div class = "item item4"><div class="block" id="Restoration"></div><p class="legendtxt">Restoration</p></div><div class = "zone4 zoneDesc">Only activities that promote the ecological restoration of degraded habitats are permitted. In the future, sustainable use of regenerated forest is currently under consideration by the Park Service.</div>');
			$(container).append('<div class = "item item5"><div class="block" id="strictProtection"></div><p class="legendtxt">Strict Protection</p></div><div class = "zone5 zoneDesc">No human use, no roads, no buildings allowed.</div>');
			$(container).append('<div class = "item item6"><div class="block" id="wildlands"></div><p class="legendtxt">Wildlands</p></div><div class = "zone6 zoneDesc">Similar restrictions to Strict Protection Zone with one exception: Ese\'eja and Harakmbut indigenous peoples are allowed to hunt, fish, and collect non-timber forest products for subsistence.</div>');
			$(container).append('<div class = "item item7"><div class="block" id="Tourism"></div><p class="legendtxt">Tourism</p></div><div class = "zone7 zoneDesc">Tourism operators can operate in this zone with appropriate concession permit. Tourism lodges, cabins, and paths are allowed. Hunting and non-timber forest extraction are also allowed for subsistence or commercial purposes but only with appropriate permit. However, hunting endangered species is strictly forbidden (for everyone, including indigenous peoples).</div>');
			$(container).append('<div class = "item item8"><div class="block" id="forestUse"></div><p class="legendtxt">Low Impact Non-Timber Forest Use</p></div><div class = "zone8 zoneDesc">Only Brazil nut harvest concessions, Brazil nut-related tourism, and subsistence hunting of non-endangered species is allowed.</div>');
			$(container).append('<div class = "item item9"><div class="block" id="directUse"></div><p class="legendtxt">Direct Use</p></div><div class = "zone9 zoneDesc">Hunting, fishing, and agriculture are allowed. Tourism, commercial agriculture, mining, and logging are permitted after first conducting an environmental impact assessment, receiving Park Service approval, and obtaining a legal concession.</div>');
			

			L.DomEvent.disableClickPropagation(container)
            return container;
        }
	});
    // adds the legend to the map.
	map.addControl(new LegendControl());
	$('.roads').on('input',function(){
		//if checkbox is checked, the roads will be added onto the map
		//if not checked, it will remove the roads
		if(document.getElementById("pointsOfInterest").checked == true){
			getRoads(roadsPOI)
		} else if(document.getElementById("pointsOfInterest").checked == false){
			removeRoads(roadsPOI)
		}
	});
	//Legend hover functions to show the Zone Description
	$('.item1').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone1').show();
	}, function(){
		$(this).css("border","none")
		$('.zone1').hide();
	})
	$('.item2').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone2').css("top","53%")
		$('.zone2').show();
	}, function(){
		$(this).css("border","none")
		$('.zone2').hide();
	})
	$('.item3').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone3').css("top","58%")
		$('.zone3').show();
	}, function(){
		$(this).css("border","none")
		$('.zone3').hide();
	})
	$('.item4').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone4').css("top","63%")
		$('.zone4').show();
	}, function(){
		$(this).css("border","none")
		$('.zone4').hide();
	})
	$('.item5').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone5').css("top","72%")
		$('.zone5').show();
	}, function(){
		$(this).css("border","none")
		$('.zone5').hide();
	})
	$('.item6').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone6').css("top","70%")
		$('.zone6').show();
	}, function(){
		$(this).css("border","none")
		$('.zone6').hide();
	})
	$('.item7').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone7').css("top","61%")
		$('.zone7').show();
	}, function(){
		$(this).css("border","none")
		$('.zone7').hide();
	})
	$('.item8').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone8').css("top","83%")
		$('.zone8').show();
	}, function(){
		$(this).css("border","none")
		$('.zone8').hide();
	})
	$('.item9').hover(function(){
		$(this).css("border","1.5px solid #006d2c")
		$('.zone9').css("top","78%")
		$('.zone9').show();
	}, function(){
		$(this).css("border","none")
		$('.zone9').hide();
	})

	//basemap implementation...similar workflow to proposal buttons
	$('.baseMap').on('input',function(){
		//if this radio button is clicked on and checked, it will
		//load that basemap and make sure the other radio buttons are
		//checked off. It will also remove the previous basemap and
		//load in the new one.
		if ($(this).attr('id') == 'Road'){
			document.getElementById("Satellite").checked = false;
			document.getElementById("Hybrid").checked = false;
			map.removeLayer(earth);
			map.removeLayer(hybrid);
			roads.addTo(map)
		}
		else if($(this).attr('id') == 'Satellite') {
			$(this).tooltip("dispose");
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
		//this.value is what the opacity will be for the proposal maps
		opacity = this.value
		$(this).tooltip("dispose");
		//three of the global overlay variables are used in this
		if(overlay != null){
			overlay.setStyle({
				opacity: opacity,
				fillOpacity: opacity,
				animate: "fast"
			})
		}
		overlayLeft.setStyle({
			opacity: opacity,
			fillOpacity: opacity,
			animate: "fast"
		});
		overlayRight.setStyle({
			opacity: opacity,
			fillOpacity: opacity,
			animate: "fast"
		});
		return opacity
	})


};
//road style
function roadsStyle() {
	return{
		color: roadColor,
		weight: 1,
		opacity: 1
	}
};
function tnrStyle(){
	return{
		fillColor: "none", // set color according to zone name
        fillOpacity: 0,
		color: "black",
		weight: 3,
		opacity: 1
	}
};
//styling for the proposal zones
function style(feature){
	//opacity is also brought in here
	// sets the style of the zones
	var color; // color of the zone
    var zoneName = feature.properties.ZONES
	if(zoneName == "Buffer Zone"){ // if it's the buffer zone, make it Powder blue
	color = "#6fd0d3";
	lineWidth = 0.1;
	lineColor = "Black";
	fillop = opacity
		}
		else if(zoneName == "Strict Protection"){
			color = "#1b7739";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Ese’eja and Harakmbut Territories"){
			color = "#c45791";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Wildlands"){
			color = "#65b366";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Tourism"){
			color = "#c2e699";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
        }
		else if(zoneName == "Restoration"){
			color = "#f1b6da";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity
		}
		else if(zoneName == "Bahuaja-Sonene National Park"){
			color = "None";
			lineWidth = 3;
			lineColor = "#6e926e";
			fillop = 0
			//can change opacity based on Tanya's suggestion, but would need to change colors based on the basemap used
			
		}
		else if(zoneName == "Direct Use"){
			color = "#e13d37";
			//color = "#125e1d";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Low Impact Non-Timber Forest Use"){
			color = "#ffae42";
			lineWidth = 0.1;
			lineColor = "Black";
			fillop = opacity;
		}
		else if(zoneName == "Community Reserve"){
			color = "#296bc2";
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
function createTNR(data){
	map.createPane('tnrPane');
	map.getPane('tnrPane').style.zIndex=500;
	map.getPane('tnrPane').style.pointerEvents = 'none';

	TNR = L.geoJson(data, {
		style: tnrStyle,
		pane: 'tnrPane',
	}).addTo(map);
	return TNR;
}
//adding the POI markers to the map.
function createAddPOIs(data) {
	layerPOI = L.geoJson(data, {
		onEachFeature: onEachPOI
	}).addTo(map);
	return layerPOI;
}
//way to getPOIs
function getTNR(){
	$.ajax("data/TNR_Boundary.geojson",{
		dataType: "json",
		success: function(response){
			createTNR(response)
		}
	})
}
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
function overlayOff(){
	document.documentElement.style.overflow = "auto";
	document.getElementById("tutorialModal").style.display = "none";
}
//call the initialize function when the document has loaded
$(document).ready(setMap);}
