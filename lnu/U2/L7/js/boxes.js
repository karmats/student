// ----------- Kod för boxarna -------------
// Globala variabler
var boxElems;		// Array med referenser till boxarna
var dragBoxElem;	// Referens till den box man drar
var infoElem;		// Referens till elementet för info då en box dras
// ------------------------------
// Initiera boxarnas placering och händelser frö att kunna dra dem.
function initBoxes() {
	let boxAreaElem = document.getElementById("boxes"); // Referens till elementet som omger boxarna
	boxElems = boxAreaElem.getElementsByTagName("div");
	for (let i = 0; i < boxElems.length; i++) {
		boxElems[i].style.top = "10px";
		boxElems[i].style.left = (10+40*i) + "px";
		boxElems[i].draggable = true;
		boxElems[i].addEventListener("dragstart",dragstartBox);
		boxElems[i].addEventListener("dragend",dragendBox);
	}
	boxAreaElem.addEventListener("dragover",dragDropBox);
	boxAreaElem.addEventListener("drop",dragDropBox);
	infoElem = document.getElementById("info");
} // End initBoxes
// ------------------------------
// En box börjar dras.
function dragstartBox(e) {
	// Skillnad mellan boxens koordinater (left,top) och skärmens koordinater för muspekaren
	let deltaX = e.screenX - parseInt(this.style.left);
	let deltaY = e.screenY - parseInt(this.style.top);
	e.dataTransfer.setData("text",deltaX + "," + deltaY); // deltaX och deltaY behövs i dragDropBox
	dragBoxElem = this; // Spara referens till den box som användaren drar
} // End dragstartBox
// ------------------------------
// Draghändelsen har avslutats (oavsett om det är över eller utanför boxarnas yta)
function dragendBox() {
	infoElem.innerHTML = "";
} // End dragendBox
// ------------------------------
// Hantera händelserna dragover och drop
function dragDropBox(e) {
	e.preventDefault();
	let delta = e.dataTransfer.getData("text").split(",");
	if (e.type == "dragover") { // Skriv ut koordinater
		infoElem.innerHTML = (e.screenX - delta[0]) + "," + (e.screenY - delta[1]);
	}
	else if (e.type == "drop") {
		let x = e.screenX - delta[0]; // Nya koordinater för boxen
		let y = e.screenY - delta[1];
		if (x > 0 && x < 565 && y > 0 && y < 365) { // Om boxen ryms inom den vita ytan,
			dragBoxElem.style.left = x + "px";		// så flytta den.
			dragBoxElem.style.top = y + "px";
		}
	}
} // End dragDropBox
// ------------------------------