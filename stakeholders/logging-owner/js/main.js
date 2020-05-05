// basic relative redirect until we have a nav-menu
// since this is a subfolder the method should be passed either '..' to go home or '../SUB_FOLDER_NMAE'
function redirect(path){
	window.location.href= path;
}

// When the user clicks on <div>, open the popup
function popupEse() {
  var popup1 = document.getElementById("myPopup1");
    popup1.classList.toggle("show");
};

function popupNut() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupBAM() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};

function popupREDD() {
  var popup4 = document.getElementById("myPopup4");
    popup4.classList.toggle("show");
};

function popupLog() {
  var popup5 = document.getElementById("myPopup5");
    popup5.classList.toggle("show");
};

function popupCon() {
  var popup6 = document.getElementById("myPopup6");
    popup6.classList.toggle("show");
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
}
// When the user clicks on the jump to button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
