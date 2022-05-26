const STORAGE_KEY = "mr224ceTotalScoreAndGames"; //  LocalStorage nyckel för totala poäng och antal spel

var startGameBtn; // Referens till start-knappen
var newTilesBtn; // Referens till knappen för att få nya brickor
var newTiles; // Referens till nya brickor bilderna.
var boardTiles; // Referens till brädets brickor.

var msgElem; // Referens till meddelande-elementet
var totScoreElem; // Referens till totala poäng-elementet
var totGamesElem; // Referens till totala spel-elementet.

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

  // Hämta elementet för meddelanden.
  msgElem = document.getElementById("message");
  totScoreElem = document.getElementById("totPoints");
  totGamesElem = document.getElementById("countGames");

  // Läs in totala poäng och antal spel från LocalStorage
  updateTotalsFromStorage();
} // End init

// Starta ett nytt spel
function startGame() {
  newTilesBtn.disabled = false;
  startGameBtn.disabled = true;
  // Nollställ brädet
  for (let i = 0; i < boardTiles.length; i++) {
    boardTiles[i].classList.replace("filled", "empty");
    boardTiles[i].src = "img/empty.png";
  }
  for (let i = 1; i <= 8; i++) {
    document.getElementById("s" + i + "mark").innerHTML = "";
  }
  msgElem.innerHTML = "";
} // End startGame

// Uppdatera totala poäng och antal spel från localStorage
function updateTotalsFromStorage() {
  const totals = localStorage.getItem(STORAGE_KEY);
  if (totals) {
    const [totScore, totGames] = totals.split(";");
    totScoreElem.innerHTML = +totScore || 0;
    totGamesElem.innerHTML = +totGames || 0;
  }
} // End updateTotalsFromStorage

// Lägg ut nya brickor till spelet.
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
    newTiles[i].id = newTileNumber;

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
    tile.id = dragTile.id;
    tile.style.backgroundColor = "";
    tile.classList.replace("empty", "filled");

    // Nollställ brickan som dras.
    dragTile.src = "img/empty.png";
    dragTile.className = "empty";
    dragTile.removeAttribute("id");
    // Ta bort drag och drop-händelsehanterare
    dragTile.draggable = false;
    dragTile.removeEventListener("dragstart", dragstartTile);
    dragTile.removeEventListener("dragend", dragendTile);
    // Kolla om alla nya brickor är utspelade
    if (checkNewTilesPlayed()) {
      if (checkEndGame()) {
        endGame();
      } else {
        newTilesBtn.disabled = false;
      }
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

// Kolla om alla brickor är utspelade i brädet.
function checkEndGame() {
  for (let i = 0; i < boardTiles.length; i++) {
    if (boardTiles[i].classList.contains("empty")) {
      return false;
    }
  }
  return true;
} // End checkEndGame

// Avsluta spelet. Räkna ut poäng och visa resultat.
function endGame() {
  let score = 0;
  const board = document.getElementById("board");
  for (let i = 1; i <= 8; i++) {
    const collection = board.getElementsByClassName("s" + i);
    const mark = document.getElementById("s" + i + "mark");
    let lastId = 0;
    for (let j = 0; j < collection.length; j++) {
      const id = +collection[j].id;
      // Brickorna är inte i ordning
      if (id < lastId) {
        mark.innerHTML = "&cross;";
        mark.style.color = "red";
        break;
      }
      lastId = id;
      // Brickorna är i ordning!
      if (j === collection.length - 1) {
        score++;
        mark.innerHTML = "&check;";
        mark.style.color = "green";
      }
    }
  }
  // Visa resultat, aktivera knappen för nytt spel.
  msgElem.innerHTML = "Du fick " + score + " poäng";
  newGameBtn.disabled = false;

  // Spara resultatet i localStorage och uppdatera ränkarna.
  let [totScore, totGames] = (localStorage[STORAGE_KEY] || "").split(";");
  totScore = (+totScore || 0) + score;
  totGames = (+totGames || 0) + 1;
  localStorage[STORAGE_KEY] = totScore + ";" + totGames;
  updateTotalsFromStorage();
} // End endGame

// Slumpa fram ett nytt nummer mellan 1 och 40
function randomTile() {
  return Math.floor(Math.random() * 40 + 1);
} // End randomTile

window.onload = init;