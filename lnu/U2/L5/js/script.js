// Globala konstanter och variabler
var boardElem; // Referens till div-element för "spelplanen"
const carImgs = ["car_up.png", "car_right.png", "car_down.png", "car_left.png"];
// Array med filnamn för bilderna med bilen
var carDir = 1; // Riktning för bilen, index till carImgs
var carElem; // Referens till img-element för bilen
const xStep = 5; // Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5; // eller y-led i varje steg
const timerStep = 20; // Tid i ms mellan varje steg i förflyttningen
var timerRef = null; // Referens till timern för bilens förflyttning
var startBtn; // Referens till startknappen
var stopBtn; // Referens till stoppknappen
/* === Tillägg i labben === */
var pigElm; // Referens till img-element för pig
var pigTimerRef = null; // Referens till timern för hur ofta ny gris ska komma
const pigDuration = 2000; // Tid i ms för hur ofta ny gris ska komma
var pigNr; // Nummer på den nya grisen
var hitCounter; // Antal träffar
var pigNrElem; // Referens till elementet för grisens nummer
var hitCounterElm; // Referens till elementet för antal träffar
var cachedPig; // Om gris har blivit träffad

// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
  // Referenser till element i gränssnittet
  boardElem = document.getElementById("board");
  carElem = document.getElementById("car");
  startBtn = document.getElementById("startBtn");
  stopBtn = document.getElementById("stopBtn");
  // Lägg på händelsehanterare
  document.addEventListener("keydown", checkKey);
  // Känna av om användaren trycker på tangenter för att styra bilen
  startBtn.addEventListener("click", startGame);
  stopBtn.addEventListener("click", stopGame);
  // Aktivera/inaktivera knappar
  startBtn.disabled = false;
  stopBtn.disabled = true;
  /* === Tillägg i labben === */
  pigElm = document.getElementById("pig");
  pigNrElem = document.getElementById("pigNr");
  hitCounterElm = document.getElementById("hitCounter");
} // End init
window.addEventListener("load", init);
// ------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) {
  let k = e.key;
  switch (k) {
    case "ArrowLeft":
    case "z":
      carDir--; // Bilens riktning 90 grader åt vänster
      if (carDir < 0) carDir = 3;
      carElem.src = "img/" + carImgs[carDir];
      break;
    case "ArrowRight":
    case "-":
      carDir++; // Bilens riktning 90 grader åt höger
      if (carDir > 3) carDir = 0;
      carElem.src = "img/" + carImgs[carDir];
      break;
  }
} // End checkKey
// ------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  document.activeElement.blur(); // Knapparna sätts ur focus, så att webbsidan kommer i fokus igen
  // Detta behövs för att man ska kunna känna av keydown i Firefox.
  carElem.style.left = "0px";
  carElem.style.top = "0px";
  carDir = 1;
  carElem.src = "img/" + carImgs[carDir];
  moveCar();
  /* === Tillägg i labben === */
  pigTimerRef = setTimeout(newPig, pigDuration);
  // Nollställ träffräknaren
  pigNr = 0;
  hitCounter = 0;
  pigNrElem.innerHTML = "0";
  hitCounterElm.innerHTML = "0";

  cachedPig = true;
} // End startGame
// ------------------------------
// Stoppa spelet
function stopGame() {
  if (timerRef != null) clearTimeout(timerRef);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  /* === Tillägg i labben === */
  if (pigTimerRef !== null) {
    clearTimeout(pigTimerRef);
  }
  pigElm.style.visibility = "hidden";
} // End stopGame
// ------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
  let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
  let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
  let x = parseInt(carElem.style.left); // x-koordinat (left) för bilen
  let y = parseInt(carElem.style.top); // y-koordinat (top) för bilen
  switch (carDir) {
    case 0: // Uppåt
      y -= yStep;
      if (y < 0) y = 0;
      break;
    case 1: // Höger
      x += xStep;
      if (x > xLimit) x = xLimit;
      break;
    case 2: // Nedåt
      y += yStep;
      if (y > yLimit) y = yLimit;
      break;
    case 3: // Vänster
      x -= xStep;
      if (x < 0) x = 0;
      break;
  }
  carElem.style.left = x + "px";
  carElem.style.top = y + "px";
  timerRef = setTimeout(moveCar, timerStep);
  /* === Tillägg i labben === */
  checkHit();
} // End moveCar
// ------------------------------

/* === Tillägg av nya funktioner i labben === */
// Addera en ny gris på slumpmässig plats
function newPig() {
  if (pigNr < 10) {
    pigElm.src = "img/pig.png";
    let xLimit = boardElem.offsetWidth - pigElm.offsetWidth - 20;
    let yLimit = boardElem.offsetHeight - pigElm.offsetHeight - 20;
    let x = Math.floor(Math.random() * xLimit + 10);
    let y = Math.floor(Math.random() * yLimit + 10);
    pigElm.style.left = x + "px";
    pigElm.style.top = y + "px";
    pigElm.style.visibility = "visible";

    pigTimerRef = setTimeout(newPig, pigDuration);

    pigNr++;
    pigNrElem.innerHTML = pigNr + "";

    cachedPig = false;
  } else {
    stopGame();
  }
} // End newPig

// Kolla om bilen träffar grisen
function checkHit() {
  if (cachedPig) {
    return;
  }
  // Bredd, vänster, topp av bil och gris
  let cSize = carElem.offsetWidth;
  let pSize = pigElm.offsetWidth;
  let cL = carElem.offsetLeft;
  let pL = pigElm.offsetLeft;
  let cT = carElem.offsetTop;
  let pT = pigElm.offsetTop;

  // Kolla om bilen träffar grisen
  if (
    cL + 10 < pL + pSize &&
    cL + cSize - 10 > pL &&
    cT + 10 < pT + pSize &&
    cT + cSize - 10 > pT &&
    pigElm.style.visibility === "visible"
  ) {
    clearTimeout(pigTimerRef);
    pigElm.src = "img/smack.png";
    pigTimerRef = setTimeout(newPig, pigDuration);
    cachedPig = true;

    hitCounter++;
    hitCounterElm.innerHTML = hitCounter + "";
  }
} // End checkHit
