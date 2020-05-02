
// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one
var pass;
var prevButton = "tambopata-button";

function redirect(path){
	if(path != 'secret'){
		window.location.href= path;	
	} else {
		secretAccess(path);
	}
}

// checks the local session storage to see if we've added a var
//     if we have: don't show popup, if we haven't: set the var
function checkVisited(){
	fetch('img/pass.txt')
	.then(response => response.text())
	.then((data) => {
	  pass = data;
	});
	
	var ls = sessionStorage.getItem('tambopata.visited');
	if (ls != null) {
		overlayOff();
	}else{
		sessionStorage.setItem('tambopata.visited', "visited")
	}
}

function secretAccess(path){
	console.log(pass);
	
	var userPass = prompt('Please enter the password your TA has provided');
	if(userPass == pass){
		window.location.href= path;
	}
}

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
	if(next == "assign"){
		document.getElementById("assign-overlay-text").style.display = "block";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";
		
		document.getElementById(prevButton).style.backgroundColor = "#00a642";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("assign-button").style.backgroundColor = "#05f765";
		document.getElementById("assign-button").style.color = "black";
		prevButton = "assign-button";
	} else if(next == "tambopata"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "block";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";
		
		document.getElementById(prevButton).style.backgroundColor = "#00a642";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("tambopata-button").style.backgroundColor = "#05f765";
		document.getElementById("tambopata-button").style.color = "black";
		prevButton = "tambopata-button";
	}
	else if(next == "glossary"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "block";
		document.getElementById("events-overlay-text").style.display = "none";
		
		document.getElementById(prevButton).style.backgroundColor = "#00a642";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("glossary-button").style.backgroundColor = "#05f765";
		document.getElementById("glossary-button").style.color = "black";
		prevButton = "glossary-button";
		
	} else {
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "block";
		
		document.getElementById(prevButton).style.backgroundColor = "#00a642";
		document.getElementById(prevButton).style.color = "white";
		document.getElementById("events-button").style.backgroundColor = "#05f765";
		document.getElementById("events-button").style.color = "black";
		prevButton = "events-button";
		
	}
}

// This calls checkVisited on each load
window.onload = checkVisited();

