// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
function redirect(path){
	window.location.href= path;
}

//if statement determining the map to go into desktop or mobile view.
if(window.innerWidth > 780){
	desktop()
}else{
	mobile()
}
