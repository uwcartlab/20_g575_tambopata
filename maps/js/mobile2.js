//function mobile is for mobile view
function mobile(){

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
var swipe;
var roadColor = "#993404";

//padding for there to be two bottom navigation bars
$('html').css("padding-bottom","80px");
//create navbar2 - proposal map buttons
var bottomNav = $("<div id = 'navbar2'></div>")

bottomNav.appendTo($("body"));
//appending the buttons to the html body, not on the actual map.
$(bottomNav).append('<button id = "mProposal1" class="active proposalM col-sm-2.4 col-xs-2.4"><div id = "propM1" class="propM active"></div>1</button>');
$(bottomNav).append('<button id = "mProposal2" class="proposalM col-sm-2.4 col-xs-2.4"><div id = "propM2" class="propM"></div>2</button>');
$(bottomNav).append('<button id = "mProposal3" class="proposalM col-sm-2.4 col-xs-2.4"><div id = "propM3" class="propM"></div>3</button>');
$(bottomNav).append('<button id = "mProposal4" class="proposalM col-sm-2.4 col-xs-2.4"><div id = "propM4" class="propM"></div>4</button>');
$(bottomNav).append('<button data-toggle="collapse" data-target="#collapseLegend" id = "mLegend" class="propM proposalM col-sm-2.4 col-xs-2.4"><svg class="bi bi-list-ul" width="1.8em" height="1.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg></button>');

//create maps function
function setMap() {
    //roads tile layer from ArcGIS online
	var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});

	//create the map with its center coordinates and have roads be default layer.
    map = L.map('map', {
		center: [-12.9, -69.5],
		zoom: 9,
		minZoom: 8,
		layers: [roads],

	});
	//removing the zoom control in mobile view. 
	map.removeControl(map.zoomControl);
	//hybrid has both satellite imagery with labels
	var hybrid  = L.gridLayer.googleMutant({
		type: 'hybrid'
	}) 
	//earth is just satellite imagery
	var earth = L.gridLayer.googleMutant({
		type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
	})
	//roads are called from Additional_Roads.js, where the variable is just roadsPOI = geojson
	var addRoads = L.geoJson(roadsPOI, {
		style: roadsStyle //roadStyle function
	});
	//listing out the basemaps
	const baseMaps = {
		"Roads": roads,
		"Satellite": earth,
		"Hybrid": hybrid
	};
	//vectorLayers are just addRoads
	const vectorLayers = {
		"Additional Roads": addRoads
	}
	//adding the controls on top left and leaving it out
	var baseLayers = L.control.layers(baseMaps, vectorLayers, {position: 'topleft', collapsed: true});
    baseLayers.addTo(map);
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
    map.createPane('left');
    map.createPane('right');

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
        view3 = data[2];
        view4 = data[3];
        switchProposals(view1, view2, view3, view4)
        opacityBar ()
		createMobileLegend(roads, earth, hybrid)
    }
    getPOIs()
};
function opacityBar (){
	//add the opacity bar control to the map
	opacityBar = L.Control.extend({
		options: {
			position: 'bottomright'
		},
		onAdd: function(){
			//mSlider is the div that contains the input slider and the labeling
			var sliderDiv = L.DomUtil.create('div','mSlider ui-slider-vertical')
			$(sliderDiv).append('<span class = "opacityTxtM" style = "margin-left: 10px;">0%</span>');
			$(sliderDiv).append('<input class="range-sliderM" type="range">');
			$(sliderDiv).append('<span class = "opacityTxtM">100%</span>');
			L.DomEvent.disableClickPropagation(sliderDiv)
			return sliderDiv;
		}
	});
	map.addControl(new opacityBar)
	//slider attributes
	$('.range-sliderM').attr({
        max: 1,
        min: 0,
        value: 1,
		step: 0.01,
	});
	//based on slider range, the opacity will change
	$('.range-sliderM').on('input',function(){
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
}
function switchProposals(){
	//.proposalM is the class for all 4 proposal map buttons.
    //whichever button is pressed, this function will be called
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
    console.log(proposal1_left)
	swipe = L.control.sideBySide(proposal1_left, proposal4_right);
    proposal1.addTo(map)
    console.log(swipe)
    console.log("proposal 1 already added")
	$('#mProposal1').on('click',function(){
		var activeList = []
		$('.propM').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("propM")[1]
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
		if($('#propM1').hasClass('active')){
			$('#propM1').removeClass('active');
			map.removeLayer(proposal1_left);
			map.removeLayer(proposal1_right);
			map.removeControl(swipe);
			
		}else{
			var value;
			$('.propM').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
                    value = value.split("propM")[1]
					value = Number(value)}
			})
			if(value == 2){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal2_right.addTo(map)).addTo(map);
				
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				
				}
			else if(value == 4){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == null){
				proposal1.addTo(map);
				
				}
			$('#propM1').addClass('active')
			}
		})
	$('#mProposal2').on('click',function(){
		var activeList = []
		$('.propM').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("propM")[1]
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
		if($('#propM2').hasClass('active')){
			$('#propM2').removeClass('active');
			map.removeLayer(proposal2_left);
			map.removeLayer(proposal2_right);
			map.removeLayer(proposal2);
			map.removeControl(swipe);
		
		}else{
			var value;
			map.removeControl(swipe);
			$('.propM').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
					value = value.split("propM")[1]
					value = Number(value)}
			})
			if(value == 1){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal2_right.addTo(map)).addTo(map);
			
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
			
				}
			else if(value == 4){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == null){
				proposal2.addTo(map);
				
				}
			$('#propM2').addClass('active')
			
		}		
	})
	$('#mProposal3').on('click',function(){
        map.removeLayer(proposal1)
		map.removeLayer(proposal3)
		var activeList = []
		$('.propM').each(function(){
			var activeCount
			if($(this).hasClass('active')){
                activeCount = (this.id)
				activeCount = activeCount.split("propM")[1]
                activeCount = Number(activeCount)
                console.log(activeCount)
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
		
		if($('#propM3').hasClass('active')){
			console.log("Already active, taking it down")
			$('#propM3').removeClass('active');
			map.removeLayer(proposal3_left);
			map.removeLayer(proposal3_right);
			map.removeLayer(proposal3)
			map.removeControl(swipe);
			
		}else{
			console.log("This is not active, determining if it needs a swipe or not")
			var value;
			map.removeControl(swipe);
			$('.propM').each(function(){
				if($(this).hasClass('active')){
                    value = (this.id)
                    console.log(value)
					value = value.split("propM")[1]
					value = Number(value)}
				})
			if(value == 1){
                map.removeLayer(proposal1)
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				console.log("swipe added")
				}
			else if(value == 2){
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal3_right.addTo(map)).addTo(map);
				
				}
			else if(value == 4){
				console.log("button 1 is already active, adding swipe")
				swipe = L.control.sideBySide(proposal3_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == null){
				console.log("Nothing is active, just adding proposal 3")
				proposal3.addTo(map)
				console.log("JUST proposal 3 was added to map")
				}
			$('#propM3').addClass('active')
			}
				
	})
	$('#mProposal4').on('click',function(){
		var activeList = []
		$('.propM').each(function(){
			var activeCount
			if($(this).hasClass('active')){
				activeCount = (this.id)
				activeCount = activeCount.split("propM")[1]
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
		if($('#propM4').hasClass('active')){
			$('#propM4').removeClass('active');
			map.removeLayer(proposal4_left);
			map.removeLayer(proposal4_right);
			map.removeLayer(proposal4)
			map.removeControl(swipe);
			
		}else{
			var value;
			map.removeControl(swipe);
			$('.propM').each(function(){
				if($(this).hasClass('active')){
					value = (this.id)
					value = value.split("propM")[1]
					value = Number(value)}
			})
			if(value == 1){
				swipe = L.control.sideBySide(proposal1_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == 2){
				swipe = L.control.sideBySide(proposal2_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == 3){
				swipe = L.control.sideBySide(proposal3_left.addTo(map), proposal4_right.addTo(map)).addTo(map);
				
				}
			else if(value == null){
				proposal4.addTo(map)
				
				}
			$('#propM4').addClass('active')
			}
						
	})
}
function createMobileLegend(){
	//legend will be placed in bottom right of page, but will be dependent off the legend icon button.
	legend = L.Control.extend({
        options: {
            position: 'bottomleft'
        },
        onAdd: function () {
            // create the control container div with a particular class name
			//mLegend contains the all the legend buttons inside
			var legendItems = L.DomUtil.create('div', 'mLegend');
			//accordion is used to have the data be collapsable
			var accordion = $("<div id = 'accordion'></div>")
			accordion.appendTo($(legendItems));
			//each button has a card header which is used to collapse in the accordion, the legend box item, the zone type, and the zone description.
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseOne"><div class="mLegendItem" id="bufferZone" ></div><p class="mLegendTxt">Buffer Zone</p></a></div><div id="collapseOne" class="collapse" data-parent="#accordion"><div class="card-body">This zone is meant to buffer the Tambopata National Reserve from the negative environmental impacts of human activities in the surrounding area. Any activity is allowed in the Buffer Zone provided it does not harm the Tambopata Reserve. Mining, and commercial agriculture, logging, or tourism must first conduct an environmental impact assessment, receive approval from the Peruvian Park Service, and obtain a legal concession before initiating approved activities. No government agency is officially designated with monitoring and managing the buffer zone.</div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseTwo"><div class="mLegendItem" id="communityReserve" ></div><p class="mLegendTxt">Community Reserve</p></a></div><div id="collapseTwo" class="collapse" data-parent="#accordion"><div class="card-body">A zoning category invented and promoted by a group of local citizens involved in the participatory zoning process. It was not originally part of the formal zoning options presented to the roundtable by the Peruvian government. As proposed, this zone would allow all activities permitted in the buffer zone but only by local Tambopata residents.</div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseThree"><div class="mLegendItem" id="strictProtection" ></div><p class="mLegendTxt">Strict Protection</p></a></div><div id="collapseThree" class="collapse" data-parent="#accordion"><div class="card-body">No human use, no roads, no buildings allowed.<div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseFour"><div class="mLegendItem" id="wildlands" ></div><p class="mLegendTxt">Wildlands</p></a></div><div id="collapseFour" class="collapse" data-parent="#accordion"><div class="card-body">Similar restrictions to Strict Protection Zone with one exception: Ese’eja and Harakmbut indigenous peoples are allowed to hunt, fish, and collect non-timber forest products for subsistence.<div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseFive"><div class="mLegendItem" id="nativeCommunities" ></div><p class="mLegendTxt">Ese\'eja and Harakmbut Territories</p></a></div><div id="collapseFive" class="collapse" data-parent="#accordion"><div class="card-body">Only Ese’eja and Harakmbut peoples have right to reside in this zone and use the land as they wish, including for agriculture. They can also hunt, fish, and harvest forest resources. Local Ese’eja and Harakmbut residents can mine, log and/or run tourism businesses if they have appropriate concession permits.<div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseSix"><div class="mLegendItem" id="Tourism" ></div><p class="mLegendTxt">Tourism</p></a></div><div id="collapseSix" class="collapse" data-parent="#accordion"><div class="card-body">Tourism operators can operate in this zone with appropriate concession permit. Tourism lodges, cabins, and paths are allowed. Hunting and non-timber forest extraction are also allowed for subsistence or commercial purposes but only with appropriate permit. However, hunting endangered species is strictly forbidden (for everyone, including indigenous peoples).</div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseSeven"><div class="mLegendItem" id="forestUse" ></div><p class="mLegendTxt">Low Impact Non-Timber Forest Use</p></a></div><div id="collapseSeven" class="collapse" data-parent="#accordion"><div class="card-body">Only Brazil nut harvest concessions, Brazil nut-related tourism, and subsistence hunting of non-endangered species is allowed.<div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseEight"><div class="mLegendItem" id="directUse" ></div><p class="mLegendTxt">Direct Use</p></a></div><div id="collapseEight" class="collapse" data-parent="#accordion"><div class="card-body">Hunting, fishing, and agriculture are allowed. Tourism, and commercial agriculture, mining, and logging are permitted after first conducting an environmental impact assessment, receiving Park Service approval, and obtaining a legal concession.<div></div>');
			$(accordion).append('<div class="card"><div class="card-header"><a class="card-link" data-toggle="collapse" href="#collapseNine"><div class="mLegendItem" id="Restoration" ></div><p class="mLegendTxt">Restoration</p></a></div><div id="collapseNine" class="collapse" data-parent="#accordion"><div class="card-body">A 1 million hectar park off limits to extraction. No new zoning within the park is being officially considered.<div></div>');
			L.DomEvent.disableClickPropagation(legendItems)
			return legendItems;
		}
    });

	map.addControl(new legend());
	$("#mLegend").click(function() {
		$(".mLegend").toggle("fast");
	});
};
//default road style
function roadsStyle(feature) {
	return{
		color: roadColor,
		weight: 1,
		opacity: 1
	}
};
//current style for the proposal maps.
function style(feature){
	// sets the style of the zones
    var opacity = 1.0; //default opacity
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
            opacity: opacity,
			pane: 'overlayPane'
		}
};

//onEachFeature is for the popups for the zones
function onEachFeature(feature, layer){
	var popupContent = ('<p style = "text-align: center";><b>'+ feature.properties.ZONES + '</b></p>');
    popupContent += '<p>'+feature.properties.Zone_Description+'</p>';
    //bind the popup to the circle marker
    layer.bindPopup(popupContent);
};
//function for popups on the POI
function onEachPOI(feature, layer) {
	var popupContent = ('<p style = "text-align: center"><b>' + feature.properties.poiName + '</b></p>');
	popupContent += '<p>'+feature.properties.infoPOI+'</p>';
	//bind the popup to the circle marker
    layer.bindPopup(popupContent);
}
//create POI from L.geoJson
function createAddPOIs(data) {
	layerPOI = L.geoJson(data, {
		onEachFeature: onEachPOI
	}).addTo(map);
	return layerPOI;
}
//using ajax to get POI from data folder
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
