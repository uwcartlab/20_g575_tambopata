// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
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

// When the user clicks on <div>, open the popup
function popupEse() {
  var popup1 = document.getElementById("myPopup1");
    popup1.classList.toggle("show");
};

function popupRE() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupBAM() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};

function popupFedemin() {
  var popup4 = document.getElementById("myPopup4");
    popup4.classList.toggle("show");
};

function popupREDD() {
  var popup5 = document.getElementById("myPopup5");
    popup5.classList.toggle("show");
};

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
