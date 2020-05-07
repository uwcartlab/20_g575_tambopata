
var pass;
// basic redirect plus check for password access
function redirect(path){
	if(path != '../../secret'){
		window.location.href= path;
	} else {
		secretAccess(path);
	}
}
// check the password against user input
//  load at start of page because otherwise it wasn't matching because of fetch timing
function checkVisited(){
	fetch('../../../img/pass.txt')
	.then(response => response.text())
	.then((data) => {
	  pass = data;
	});
	
	// checking for popup size to avoid adding extra width to the page
	var container = $(".container").width();
	var popup1Width = $("#myPopup1").offset().left + $("#myPopup1").width();
	var diff = Math.ceil(popup1Width - container);
	if(diff > 0){
		$("#myPopup1").offset({top:$("#myPopup1").offset().top, left: ($("#myPopup1").offset().left - diff)});
	}
	var popup1Left = $("#myPopup1").offset().left;
	if(popup1Left < 0){
		$("#myPopup1").offset({top:$("#myPopup1").offset().top, left: 10});
	}
	var popup2Width = $("#myPopup2").offset().left + $("#myPopup2").width();
	diff = Math.ceil(popup2Width - container);
	if(diff > 0){
		$("#myPopup2").offset({top:$("#myPopup2").offset().top, left: ($("#myPopup2").offset().left - diff)});
	}
	var popup2Left = $("#myPopup2").offset().left;
	if(popup2Left < 0){
		$("#myPopup2").offset({top:$("#myPopup2").offset().top, left: 10});
	}
	var popup3Width = $("#myPopup3").offset().left + $("#myPopup3").width();
	diff = Math.ceil(popup3Width - container);
	if(diff > 0){
		$("#myPopup3").offset({top:$("#myPopup3").offset().top, left: ($("#myPopup3").offset().left - diff)});
	}
	var popup3Left = $("#myPopup3").offset().left;
	if(popup3Left < 0){
		$("#myPopup3").offset({top:$("#myPopup3").offset().top, left: 10});
	}
}

// when a resize occurs change the values for popup offsets
$(window).resize(function(){
	// checking for popup size to avoid adding extra width to the page
	var container = $(".container").width();
	var popup1Width = $("#myPopup1").offset().left + $("#myPopup1").width();
	var diff = Math.ceil(popup1Width - container);
	if(diff > 0){
		$("#myPopup1").offset({top:$("#myPopup1").offset().top, left: ($("#myPopup1").offset().left - diff)});
	}
	var popup1Left = $("#myPopup1").offset().left;
	if(popup1Left < 0){
		$("#myPopup1").offset({top:$("#myPopup1").offset().top, left: 10});
	}
	var popup2Width = $("#myPopup2").offset().left + $("#myPopup2").width();
	diff = Math.ceil(popup2Width - container);
	if(diff > 0){
		$("#myPopup2").offset({top:$("#myPopup2").offset().top, left: ($("#myPopup2").offset().left - diff)});
	}
	var popup2Left = $("#myPopup2").offset().left;
	if(popup2Left < 0){
		$("#myPopup2").offset({top:$("#myPopup2").offset().top, left: 10});
	}
	var popup3Width = $("#myPopup3").offset().left + $("#myPopup3").width();
	diff = Math.ceil(popup3Width - container);
	if(diff > 0){
		$("#myPopup3").offset({top:$("#myPopup3").offset().top, left: ($("#myPopup3").offset().left - diff)});
	}
	var popup3Left = $("#myPopup3").offset().left;
	if(popup3Left < 0){
		$("#myPopup3").offset({top:$("#myPopup3").offset().top, left: 10});
	}
});

function secretAccess(path){
	var userPass = prompt('Please enter the password your TA has provided');
	if(userPass == pass){
		window.location.href= path;
	}
}

// This calls checkVisited on each load
window.onload = checkVisited();


// When the user clicks on <div>, open the popup
function popupHec() {
  var popup1 = document.getElementById("myPopup1");
    popup1.classList.toggle("show");
};

function popupOil() {
  var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
};

function popupFad() {
  var popup3 = document.getElementById("myPopup3");
    popup3.classList.toggle("show");
};

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
