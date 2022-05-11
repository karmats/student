// Initiera globala variabler och koppla funktion till knapp
function init() {
	initBoxes();
	document.getElementById("saveBtn").addEventListener("click",saveBoxPositions);
	getBoxPositions();
} // End init
window.addEventListener("load",init);
// ------------------------------
// Spara boxarnas placering i en cookie
function saveBoxPositions() {
	
} // End saveBoxPositions
// ------------------------------
// Hämta sprade positioner uppdatera boxarnas placering
function getBoxPositions() {
	
} // End getBoxPositions
// ------------------------------