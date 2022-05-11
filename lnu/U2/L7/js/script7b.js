// Initiera globala variabler och koppla funktion till knapp
function init() {
	initBoxes();
	document.getElementById("saveBtn").addEventListener("click",saveBoxPositions);
	getBoxPositions();
} // End init
window.addEventListener("load",init);
// ------------------------------
