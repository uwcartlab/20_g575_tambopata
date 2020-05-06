var pass;
// basic redirect plus check for password access
function redirect(path){
	if(path != '../secret'){
		window.location.href= path;
	} else {
		secretAccess(path);
	}
}
// check the password against user input
//  load at start of page because otherwise it wasn't matching because of fetch timing
function checkVisited(){
	fetch('../img/pass.txt')
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

//if statement determining the map to go into desktop or mobile view.
if(window.innerWidth > 780){
	desktop()
}else{
	mobile()
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