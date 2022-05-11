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
// Spara boxarnas placering i en cookie
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
  setCookie("boxPos", posStr.substring(1), 30);
} // End saveBoxPositions
// ------------------------------
// Hämta sprade positioner uppdatera boxarnas placering
function getBoxPositions() {
  let posStr = getCookie("boxPos");
  if (posStr) {
    let posistions = posStr.split("#");
    for (let i = 0; i < posistions.length; i++) {
      let [left, top] = posistions[i].split(",");
      boxElems[i].style.left = left + "px";
      boxElems[i].style.top = top + "px";
    }
  }
} // End getBoxPositions
// ------------------------------
