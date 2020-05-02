
// this stores globals for creating the stakeholder circles
var config = {
	// used to define the radius of the circle and the size of the image inside it
  "node_size": 100
}

// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
function redirect(path){
	window.location.href= path;
}



// <script>
// When the user clicks on <div>, open the popup
// function popupHec() {
//   var popup1 = document.getElementById("myPopup1");
//     popup1.classList.toggle("show");
// };

function popupOil() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupFad() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};

// example overlay
function on(){
  document.getElementById("overlay").style.display = "block";
}

function off(){
  document.getElementById("overlay").style.display = "none";
}
