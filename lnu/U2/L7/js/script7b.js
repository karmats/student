// Initiera globala variabler och koppla funktion till knapp
function init() {
  initBoxes();
  document
    .getElementById("saveBtn")
    .addEventListener("click", saveBoxPositions);
  getBoxPositions();
} // End init
window.addEventListener("load", init);
// ------------------------------
// Spara boxarnas placering i localstorage
function saveBoxPositions() {
  let posStr = "";
  for (let i = 0; i < boxElems.length; i++) {
    let { left, top } = boxElems[i].style;
    posStr +=
      "#" +
      left.substring(0, left.length - 2) +
      "," +
      top.substring(0, top.length - 2);
  }
  localStorage.boxPos = posStr.substring(1);
} // End saveBoxPositions
// ------------------------------
// Hämta sprade positioner uppdatera boxarnas placering
function getBoxPositions() {
  if (localStorage.boxPos) {
    let posistions = localStorage.boxPos.split("#");
    for (let i = 0; i < posistions.length; i++) {
      let [left, top] = posistions[i].split(",");
      boxElems[i].style.left = left + "px";
      boxElems[i].style.top = top + "px";
    }
  }
} // End getBoxPositions
// ------------------------------
