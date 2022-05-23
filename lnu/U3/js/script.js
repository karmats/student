var startGameBtn; // Referens till start-knappen
var newTilesBtn; // Referens till knappen för att få nya brickor
var newTiles; // Referens till nya brickor bilderna.
var boardTiles; // Referens till brädets brickor.

var dragTile; // Referens till brickan som dras.

var playedNumbers = []; // Array med nummer som spelaren har spelat

function init() {
  // Hämta elementet med id="startGameBtn" och koppla en funktion till knappen.
  startGameBtn = document.getElementById("newGameBtn");
  startGameBtn.addEventListener("click", startGame);

  // Hämta elementet med id="newTilesBtn", koppla en funktion till knappen och avaktivera den.
  newTilesBtn = document.getElementById("newTilesBtn");
  newTilesBtn.addEventListener("click", newTiles);
  newTilesBtn.disabled = true;

  // Hämta elementet med id="newTiles" och dess fyra bilder.
  newTiles = document.getElementById("newTiles").getElementsByTagName("img");

  // Hämta elementet med id="board" och dess brickor.
  boardTiles = document.getElementById("board").getElementsByTagName("img");
  for (let i = 0; i < newTiles.length; i++) {}
} // End init

// Starta ett nytt spel
function startGame() {
  newTilesBtn.disabled = false;
  startGameBtn.disabled = true;
} // End startGame

function newTiles() {
  // Slumpa fram nya brickor
  for (let i = 0; i < newTiles.length; i++) {
    newTiles[i].className = "filled";
    let newTileNumber = randomTile();
    while (playedNumbers.includes(newTileNumber)) {
      newTileNumber = randomTile();
    }
    playedNumbers.push(newTileNumber);
    newTiles[i].src = `img/${newTileNumber}.png`;

    newTiles[i].addEventListener("dragstart", dragstartTile);
    newTiles[i].addEventListener("dragend", dragendTile);
    newTiles[i].draggable = true;
  }
  // Inaktivera knappen så man inte kan välja nya brickor förrän alla är utspelade
  newTilesBtn.disabled = true;
} // End newTiles

// En bricka börjar dras. Händelsehanterare för drop zones
function dragstartTile(event) {
  for (let i = 0; i < boardTiles.length; i++) {
    boardTiles[i].addEventListener("dragover", tileOverBoardImg);
    boardTiles[i].addEventListener("drop", tileOverBoardImg);
    boardTiles[i].addEventListener("dragleave", tileLeaveBoardImg);
  }
  // Spara elementet som dras
  dragTile = event.target;
} // End dragstartTile

// Drag-händelsen avslutas. Ta bort händelsehanterare på drop zones
function dragendTile() {
  for (let i = 0; i < boardTiles.length; i++) {
    boardTiles[i].removeEventListener("dragover", tileOverBoardImg);
    boardTiles[i].removeEventListener("drop", tileOverBoardImg);
    boardTiles[i].removeEventListener("dragleave", tileLeaveBoardImg);
  }
} // End dragendTile

// Hantera händelserna dragover och drop, då en bricka släpps över en av de lediga rutorna på brädet.
function tileOverBoardImg(event) {
  event.preventDefault();
  const tile = event.target;
  // Brickan släpps på en ledig ruta.
  if (event.type === "drop" && tile.classList.contains("empty")) {
    tile.src = dragTile.src;
    tile.style.backgroundColor = "";
    tile.classList.replace("empty", "filled");

    // Nollställ brickan som dras.
    dragTile.src = "img/empty.png";
    dragTile.className = "empty";
    dragTile.draggable = false;
    // Kolla om alla nya brickor är utspelade
    if (checkNewTilesPlayed()) {
      newTilesBtn.disabled = false;
    }
  } else if (tile.classList.contains("empty")) {
    // Brickan dras över en ledig ruta.
    tile.style.backgroundColor = "#FC6";
  }
} // End tileOverBoardImg

// Händelsehanterare för dragleave.
function tileLeaveBoardImg(event) {
  event.target.style.backgroundColor = "";
} // End tileLeaveBoardImg

// Kolla om alla nya brickor är utspelade.
function checkNewTilesPlayed() {
  for (let i = 0; i < newTiles.length; i++) {
    if (newTiles[i].classList.contains("filled")) {
      return false;
    }
  }
  return true;
} // End checkNewTilesPlayed

// Slumpa fram ett nytt nummer mellan 1 och 40
function randomTile() {
  return Math.floor(Math.random() * 40 + 1);
} // End randomTile

window.onload = init;
