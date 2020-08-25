
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

}

function secretAccess(path){
	var userPass = prompt('Please enter the password your TA has provided');
	if(userPass == pass){
		window.location.href= path;
	}
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


// nav bar active buttons
// document.getElementById("active_active").style.display='block';


// This calls checkVisited on each load
window.onload = checkVisited();
