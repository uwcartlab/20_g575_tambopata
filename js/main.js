
// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one

function redirect(path){
	window.location.href= path;
}

// checks the local session storage to see if we've added a var
//     if we have: don't show popup, if we haven't: set the var
function checkVisited(){
	var ls = sessionStorage.getItem('tambopata.visited');
	if (ls != null) {
		overlayOff();
	}else{
		sessionStorage.setItem('tambopata.visited', "visited")
	}
}

// if they hit the close button then hide the overlay
function overlayOff(){
	document.documentElement.style.overflow = "auto";
	document.getElementById("overlay").style.display = "none";
}
// same but show on assign click
function overlayOn(){
	document.documentElement.style.overflow = "hidden";
	document.getElementById("overlay").style.display = "block";
}

// basic switching of overlay content on button press
function overlayShowNext(next){
	if(next == "assign"){
		document.getElementById("assign-overlay-text").style.display = "block";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";
	} else if(next == "tambopata"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "block";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "none";
	}
	else if(next == "glossary"){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "block";
		document.getElementById("events-overlay-text").style.display = "none";
	} else {
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		document.getElementById("glossary-overlay-text").style.display = "none";
		document.getElementById("events-overlay-text").style.display = "block";
	}
}

// This calls checkVisited on each load
window.onload = checkVisited();

