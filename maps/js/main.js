// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
function redirect(path){
	window.location.href= path;
}
if(window.innerWidth > 780){
	desktop()
}
else {
	mobile()
}