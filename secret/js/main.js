
// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one
function redirect(path){
	window.location.href= path;
}

// global for keeping track of previous button
var prevButton = "tambopata-button";

// if they hit the close button then hide the overlay
function overlayOff(){
	document.documentElement.style.overflow = "auto";
	document.getElementById("overlay").style.display = "none";
	document.getElementById("overlay-img").style.display = "none";
}
// same but show on assign click
function overlayOn(){
	document.documentElement.style.overflow = "hidden";
	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay-img").style.display = "block";
}

// basic switching of overlay content on button press
function overlayShowNext(next){
	var overlayDiv = document.getElementById('overlay-div');
	overlayDiv.scrollTop = 0;
	if(next == "assign"){
		document.getElementById("assign-overlay-text").style.display = "block";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";

		document.getElementById(prevButton).style.backgroundColor = "#006d2c";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("assign-button").style.backgroundColor = "#00441b";
		document.getElementById("assign-button").style.color = "white";
		prevButton = "assign-button";
	} else if(next == "tambopata"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "block";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";

		document.getElementById(prevButton).style.backgroundColor = "#006d2c";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("tambopata-button").style.backgroundColor = "#00441b";
		document.getElementById("tambopata-button").style.color = "white";
		prevButton = "tambopata-button";
	}
	else if(next == "glossary"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "block";
		document.getElementById("events-overlay-text").style.display = "none";

		document.getElementById(prevButton).style.backgroundColor = "#006d2c";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("glossary-button").style.backgroundColor = "#00441b";
		document.getElementById("glossary-button").style.color = "white";
		prevButton = "glossary-button";

	} else {
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "block";

		document.getElementById(prevButton).style.backgroundColor = "#006d2c";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("events-button").style.backgroundColor = "#00441b";
		document.getElementById("events-button").style.color = "white";
		prevButton = "events-button";

	}
}

// Open source slider modified and copied under MIT License
// Call & init
$(document).ready(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    // Adjust the slider
    var width = cur.width()+'px';
	var height = cur.height()+'px';
	$('#slider').css('height', height);
    cur.find('.resize img').css('width', width);
    // Bind dragging events
    drags(cur.find('.handle'), cur.find('.resize'), cur);
  });
});

// Update sliders on resize.
$(window).resize(function(){
  $('.ba-slider').each(function(){
    var cur = $(this);
    var width = cur.width()+'px';
    cur.find('.resize img').css('width', width);
  });
  $('#slider').each(function(){
	var cur = $(this);
	var height = $('.ba-slider').height()+'px';
	cur.css('height', height);
  });
});

function drags(dragElement, resizeElement, container) {

  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {

    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
        posX = dragElement.offset().left + dragWidth - startX,
        containerOffset = container.offset().left,
        containerWidth = container.outerWidth();

    // Set limits
    minLeft = containerOffset + 70;
    maxLeft = containerOffset + containerWidth - dragWidth - 70;

    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {

      // Check if it's a mouse or touch event and pass along the correct value
      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      leftValue = moveX + posX - dragWidth;

      // Prevent going off limits
      if ( leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      // Translate the handle's left value to masked divs width.
      widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

      // Set the new values for the slider and the handle.
      // Bind mouseup events to stop dragging.
      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function(){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}

// Jump to top of page, referenced from w3schools.com
//Get the button:
mybutton = document.getElementById("scrollBtn");
// When the user scrolls down 300px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the jump to button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function main(){
  var map, corridor, finalProposal;
  if(window.innerWidth > 780){
    finalMapDesktop()
  }else{
    finalMapMobile()
  }
  
  function finalMapDesktop(){
    var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});
    //create the map with its center coordinates and have roads be default layer.
    map = L.map('finalMap', {
    center: [-12.9, -69.8],
    zoom: 10,
    minZoom: 10,
    maxZoom: 10,
    dragging: true,
    layers: [roads],
    maxBounds: ([
      [-11.9,-68.2],
      [-13.8, -71.3]
    ])
    });
    map.removeControl(map.zoomControl);
    getTitle()
    getFinalProposal()
    addLegend(corridor)
  }
  function finalMapMobile(){
    var roads = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'});
    //create the map with its center coordinates and have roads be default layer.
    map = L.map('finalMap', {
    center: [-12.9, -69.7],
    zoom: 10,
    minZoom: 9,
    maxZoom: 10,
    dragging: true,
    attributionControl: false,
    layers: [roads],
    maxBounds: ([
      [-11.7,-68.5],
      [-13.9, -71]
    ])
    });
    map.removeControl(map.zoomControl);
    L.control.attribution({
      position: 'topright'
      }).addTo(map);
    console.log(map.getBounds())
    getMobileTitle()
    getFinalProposal()
    addMobileLegend()
    addCorridorCheck()
  }
  function getTitle(){
    var title = L.control({position: 'topleft'})

    title.onAdd = function (map){
      var div = L.DomUtil.create('div','mapTitle');
      div.innerHTML = 
      '<p class = "title" >Official Map*</p>'
      return div;
    }
    title.addTo(map);
  }
  function getMobileTitle(){
    var title = L.control({position: 'topleft'})

    title.onAdd = function (map){
      var div = L.DomUtil.create('div','mapTitleMobile');
      div.innerHTML = 
      '<p class = "mTitle" >Official Map*</p>'
      return div;
    }
    title.addTo(map);
  }
  function addCorridorCheck(){
    var check = L.control({position: 'topright'});
  
    check.onAdd = function (map){
      var div = L.DomUtil.create('div','mChecker');
  
      div.innerHTML = 
      '<input id = "mMiningCorridor" type = "checkbox" class = "corridor" unchecked><span class = "mCheck">Turn On/Off Mining Corridor</span>'
      L.DomEvent.disableClickPropagation(div);
      return div;
    }
    check.addTo(map);
    $('.corridor').on('input',function(){
      if(document.getElementById("mMiningCorridor").checked == true){
      getCorridor()
    } else if(document.getElementById("mMiningCorridor").checked == false){
      removeCorridor(corridor)
    }
  });
  }
  function addMobileLegend(){
    var legend = L.control({position: 'bottomleft'});
  
    legend.onAdd = function (map) {
    
      var div = L.DomUtil.create('div', 'row mInfo'),
        legendList = [{"ZONE": "Mining Corridor", "Color":"#d8b365"},
        {"ZONE": "Buffer Zone","Color": "#6fd0d3"},
        {"ZONE": "Ese’eja and Harakmbut Territories","Color": "#c45791"},
        {"ZONE": "Restoration","Color": "#f1b6da"},
        {"ZONE": "Strict Protection","Color": "#1b7739"},
        {"ZONE": "Tourism","Color": "#c2e699"},
        {"ZONE": "Low Impact Non-Timber Forest Use","Color": "#ffae42"}]
      
    
        div.innerHTML  = 
        '<div class = "col-4"><i style="background:' + legendList[0].Color + '"></i>'+legendList[0].ZONE+'</div>'+
        '<div class = "col-4"><i style="background:' + legendList[1].Color + '"></i>'+legendList[1].ZONE+'</div>'+
        '<div class = "col-4"><i style="background:' + legendList[3].Color + '"></i>'+legendList[3].ZONE+'</div>'+
        '<div class="w-100"></div>'+
        '<div class = "col-4"><i style="background:' + legendList[4].Color + '"></i>'+legendList[4].ZONE+'</div>'+
        '<div class = "col-8"><i style="background:' + legendList[2].Color + '"></i>'+legendList[2].ZONE+'</div>'+
        '<div class="w-100"></div>'+
        '<div class = "col-4"><i style="background:' + legendList[5].Color + '"></i>'+legendList[5].ZONE+'</div>'+
        '<div class = "col-8"><i style="background:' + legendList[6].Color + '"></i>'+legendList[6].ZONE+'</div>'
      
      L.DomEvent.disableClickPropagation(div);
      return div;
    };	
    legend.addTo(map);
    
  }
  function corridorStyle(){
      return{
        fillColor: "#d8b365",
        fillOpacity: 1,
        color: "black",
        weight: 0.5,
        opacity: 1
    }
  }
  function style(feature){
    //opacity is also brought in here
    // sets the style of the zones
    var color; // color of the zone
    var zoneName = feature.properties.ZONES
    var opacity = 1
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
  function addLegend(){
    var legend = L.control({position: 'bottomleft'});
  
    legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          legendList = [{"ZONE": "Mining Corridor", "Color":"#d8b365"},
          {"ZONE": "Buffer Zone","Color": "#6fd0d3"},
          {"ZONE": "Ese’eja and Harakmbut Territories","Color": "#c45791"},
          {"ZONE": "Restoration","Color": "#f1b6da"},
          {"ZONE": "Strict Protection","Color": "#1b7739"},
          {"ZONE": "Tourism","Color": "#c2e699"},
          {"ZONE": "Low Impact Non-Timber Forest Use","Color": "#ffae42"}]
  
      div.innerHTML = 
      '<div class = "checker" ><input id = "MiningCorridor" type = "checkbox" class = "corridor" unchecked><span class = "check">Turn On/Off Mining Corridor</span></div><br>'+
      '<div><i style="background:' + legendList[0].Color + '"></i><div class = "mining">'+legendList[0].ZONE+'</div></div>' +
      '<p class = "zoneTitle">Zone Categories</p><br>'
              
      for (var i  in legendList) {
        if(i > 0){
          div.innerHTML +=
              '<div class = "item"><div class = "item"><i style="background:' + legendList[i].Color + '"></i></div><div>'+legendList[i].ZONE+'</div></div>'
    }}
    L.DomEvent.disableClickPropagation(div);
      return div;
    };
  
  legend.addTo(map);
  $('.corridor').on('input',function(){
    if(document.getElementById("MiningCorridor").checked == true){
      getCorridor()
    } else if(document.getElementById("MiningCorridor").checked == false){
      removeCorridor(corridor)
    }
  });
  }
  function getCorridor() {
    $.ajax("data/CorridorMine.geojson", {
      dataType: "json",
      success: function(response){
        createCorridor(response)
      }
    }); 
  };
  function getFinalProposal() {
    $.ajax("data/FinalProposal.geojson", {
      dataType: "json",
      success: function(response){
        createFinalProposal(response)
      }
    });
  };
  function createFinalProposal(data){
    finalProposal= L.geoJson(data,{
      style: style
    }).addTo(map)
    return finalProposal
  }
  function createCorridor(data){
   corridor = L.geoJson(data,{
      style: corridorStyle
    }).addTo(map) 
    return corridor
  }
  function removeCorridor(corridor){
    map.removeLayer(corridor)
  }}
  main()