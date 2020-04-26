function mobile(){
	$('.navbar1').remove();
	console.log("here")
	var bottomNavBar = $("<div id = 'navbar2'></div>")
	bottomNavBar.appendTo($("body"));
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="overlayOn()"><img src="img/NavbarImg/Assignment.png" width="30" height="30" class="d-inline-block align-top" alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="active col-sm-2.4 col-xs-2.4"><img src="img/NavbarImg/person.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'maps\')"><img src="img/NavbarImg/map.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'secret\')"><img src="img/NavbarImg/lock.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'credits\')"><img src="img/NavbarImg/info.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
};

if(window.innerWidth < 780){
	mobile()
}

	
var overlayTrigger = false;

// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one

function redirect(path){
	window.location.href= path;
}

function checkVisited(){
	var ls = sessionStorage.getItem('namespace.visited');
	if (ls != null) {
		overlayOff();
	}else{
		sessionStorage.setItem('namespace.visited', 1)
	}
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

//window.onload(checkVisited());

