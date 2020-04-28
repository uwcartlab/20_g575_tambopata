function mobile(){
	$('.navbar1').remove();
	
	var bottomNavBar = $("<div id = 'navbar2'></div>")
	bottomNavBar.appendTo($("body"));
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'../assignment\')"><img src="img/NavbarImg/Assignment.png" width="30" height="30" class="d-inline-block align-top" alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'../\')"><img src="img/NavbarImg/person.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'../maps\')"><img src="img/NavbarImg/map.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="col-sm-2.4 col-xs-2.4" onclick="redirect(\'../secret\')" ><img src="img/NavbarImg/lock.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
	$(bottomNavBar).append('<button id = "bottomNav" class="active col-sm-2.4 col-xs-2.4" onclick="redirect(\'../credits\')"><img src="img/NavbarImg/info.png" width="30" height="30" class="d-inline-block align-top"alt=""></button>');
};

if(window.innerWidth < 780){
	mobile()
}
// basic relative redirect until we have a nav-menu
// just subfolder name should be passed to this one
function redirect(path){
	window.location.href= path;
};
