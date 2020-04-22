
var overlayTrigger = false;

// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one

function redirect(path){
	window.location.href= path;
}

function overlayOff(){
	document.getElementById("overlay").style.display = "none";
}

function overlayOn(){
	document.getElementById("overlay").style.display = "block";
}

function overlayShowNext(){
	if(!overlayTrigger){
		document.getElementById("assign-overlay-text").style.display = "none";
		document.getElementById("tambopata-overlay-text").style.display = "block";
		overlayTrigger = true;
	} else {
		document.getElementById("assign-overlay-text").style.display = "block";
		document.getElementById("tambopata-overlay-text").style.display = "none";
		overlayTrigger = false;
	}
}