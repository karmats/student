// Lista (array) med ord som ska väljas slumpmässigt
const wordList = [
  "BLOMMA",
  "LASTBIL",
  "SOPTUNNA",
  "KÖKSBORD",
  "RADIOAPPARAT",
  "VINTER",
  "SOMMAR",
  "DATORMUS",
  "LEJON",
  "ELEFANTÖRA",
  "JULTOMTE",
  "SKOGSHYDDA",
  "BILNUMMER",
  "BLYERTSPENNA",
  "SUDDGUMMI",
  "KLÄDSKÅP",
  "VEDSPIS",
  "LJUSSTAKE",
  "SKRIVBORD",
  "ELDGAFFEL",
  "STEKPANNA",
  "KASTRULL",
  "KAFFEBRYGGARE",
  "TALLRIK",
  "SOFFBORD",
  "TRASMATTA",
  "FLYGPLAN",
  "FLYGPLATS",
  "TANGENTBORD",
];

// Slumpmässigt ord
let selectedWord;
// Referens till gissade bokstäver
let letterBoxes;
// Referens till hangman-bilden
let hangmanImg;
// Referens till meddelande elementet
let msgElem;
// Refrens till knapp för att starta ett nytt spel
let startGameBtn;
// Refrens till samtliga bokstavsknappar
let letterButtons;
// Nummer för aktuell bild (0-6)
let hangmanImgNr;
// Tiden spelet startades.
let startTime;

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  hangmanImg = document.getElementById("hangman");
  msgElem = document.getElementById("message");

  // Hämta elementet med id="startGameBtn" och koppla en funktion till knappen och aktivera den.
  startGameBtn = document.getElementById("startGameBtn");
  startGameBtn.addEventListener("click", startGame);
  startGameBtn.disabled = false;

  // Hämta elementet med id="letterButtons" och koppla en funktion till dess knappar och avaktivera dem.
  letterButtons = document
    .getElementById("letterButtons")
    .getElementsByTagName("button");
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener("click", guessLetter);
    letterButtons[i].disabled = true;
  }
} // End init

// Initiera nytt spel. Välj ord, visa bokstavsrutor, visa första bilden (tom bild),
// sätt bildnummer till 0.
// Avaktivera startknappen, aktivera samtliga bokstavsknappar och rensa meddelandet.
function startGame() {
  randomWord();
  showLetterBoxes();

  hangmanImgNr = 0;
  hangmanImg.src = "img/h0.png";

  startGameBtn.disabled = true;
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }

  msgElem.innerHTML = "";
  startTime = Date.now();
} // End startGame

// Funktion som körs när en bokstavknapp trycks ned. Kontrollerar om bokstaven finns i ordet.
// Om bokstaven finns, så skrivs den ut i bokstavsrutan. Om bokstaven inte finns, så ökas hangman-bilden.
// Knappen avaktiveras.
function guessLetter() {
  this.disabled = true;
  // Hämta bokstaven från knappens text
  let letter = this.value;
  // Kontrollera om bokstaven finns i ordet
  let letterFound = false;
  // Kolla hur många bokstäver som är korrekt
  let correctLettersCount = 0;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      letterBoxes[i].innerHTML = letter;
      letterFound = true;
    }
    if (letterBoxes[i].innerHTML !== "&nbsp;") {
      correctLettersCount++;
    }
  }
  if (!letterFound) {
    hangmanImgNr++;
    hangmanImg.src = "img/h" + hangmanImgNr + ".png";
    if (hangmanImgNr === 6) {
      endGame(true);
    }
  } else if (correctLettersCount === selectedWord.length) {
    endGame(false);
  }
} // End guessLetter

// Funktion som skapar bokstavsrutor för ordet.
function showLetterBoxes() {
  // Skapa bokstavsrutor för ordet.
  let newCode = selectedWord
    .split("")
    .map(function () {
      return "<span>&nbsp;</span>";
    })
    .join("");
  document.getElementById("letterBoxes").innerHTML = newCode;

  letterBoxes = document
    .getElementById("letterBoxes")
    .getElementsByTagName("span");
} // End showLetterBoxes

// Funktion som slumpar ett ord från listan med ord. Samma ord kan inte slumpas två gånger.
function randomWord() {
  let oldWord = selectedWord;
  while (oldWord === selectedWord) {
    let wordIndex = Math.floor(Math.random() * wordList.length);
    selectedWord = wordList[wordIndex];
  }
} // End randomWord

// Funktion som körs när spelet är slut. Om parametern manHanged är true, lyckades man inte gissa rätt ord.
// Funktionen skriver ett meddelande till användaren och avaktiverar samtliga bokstavasknappar och aktiverar startaknappen.
function endGame(manHanged) {
  // Tid det tog för att slutföra spelet
  let runTime = (Date.now() - startTime) / 1000;
  if (manHanged) {
    msgElem.innerHTML = "Tyvärr, gubben hängdes. Rätt svar är " + selectedWord;
  } else {
    msgElem.innerHTML = "Gratulerar. Du kom fram till rätt ord.";
  }
  msgElem.innerHTML += "<br>Det tog " + runTime.toFixed(1) + " sekunder.";

  startGameBtn.disabled = false;
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }
} // End endGame

window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
