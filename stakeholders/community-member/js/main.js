
// this stores globals for creating the stakeholder circles
var config = {
	// used to define the radius of the circle and the size of the image inside it
  "node_size": 100
}

var pass;
// basic redirect plus check for password access
function redirect(path){
	if(path != '../../secret'){
		window.location.href= path;
	} else {
		secretAccess(path);
	}
}
// check the password against user input
//  load at start of page because otherwise it wasn't matching because of fetch timing
function checkVisited(){
	fetch('../../../img/pass.txt')
	.then(response => response.text())
	.then((data) => {
	  pass = data;
	});
}

function secretAccess(path){
	var userPass = prompt('Please enter the password your TA has provided');
	if(userPass == pass){
		window.location.href= path;
	}
}

// This calls checkVisited on each load
window.onload = checkVisited();

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

// Popup functions
function popupHec() {
  var popup1 = document.getElementById("myPopup1");
    popup1.classList.toggle("show");
};

function popupFad() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupRE() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};

function popupREDD() {
  var popup4 = document.getElementById("myPopup4");
    popup4.classList.toggle("show");
};

function popupBAM() {
  var popup5 = document.getElementById("myPopup5");
    popup5.classList.toggle("show");
};

function popupEse() {
  var popup6 = document.getElementById("myPopup6");
    popup6.classList.toggle("show");
};

function popupEco() {
  var popup7 = document.getElementById("myPopup7");
    popup7.classList.toggle("show");
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
};
// When the user clicks on the jump to button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
