
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
