// Globala variabler
// Frukt val, antal frukter, meddelande element, valda frukter element samt vilken frukt som är vald.
let input1Elem, input2Elem, msgElem, selFruitsElem, selFruitNr;

// ------------------------------
// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  input1Elem = document.getElementById("input1");
  input2Elem = document.getElementById("input2");

  msgElem = document.getElementById("message");
  selFruitsElem = document.getElementById("selectedFruits");

  selFruitNr = 0;

  document.getElementById("btn1").onclick = showFruit;
  document.getElementById("btn2").onclick = addFruit;
} // End init

// Funktion för att visa en frukt.
// Ett felmeddelande visas man inte har skrivit in ett tal eller att talet inte är mellan 1 - 5.
function showFruit() {
  // Numret användaren skriver in. Måste vara ett heltal mellan 1 - 5.
  let nr = checkNr(input1Elem.value, 5);
  if (nr === null) {
    return;
  }
  input1Elem.value = nr;

  document.getElementById("fruitImg").src = getUrl(nr);

  selFruitNr = nr;
} // End showFruit

// Lägg till en frukt i listan med valda frukter.
// En frukt måste vara vald, och antal frukter måste vara ett heltal mellan 1 - 9.
function addFruit() {
  if (selFruitNr === 0) {
    msgElem.innerHTML = "Du måste välja en frukt först";
    return;
  }
  // Antal frukter valda av användaren.
  let amount = checkNr(input2Elem.value, 9);
  if (amount === null) {
    return;
  }
  // Url till nuvarande vald frukt.
  let fruitUrl = getUrl(selFruitNr);
  // Lista med antal valda frukter.
  let imgList = "";
  for (let i = 0; i < amount; i++) {
    imgList += '<img src="' + fruitUrl + '" alt="frukt">';
  }
  selFruitsElem.innerHTML += imgList;
} // End addFruit

// Url till bild på frukt baserat på ett nummer mellan 1 -5.
// Om numret inte är mellan 1 - 5 så visas bilden nofruit.png.
function getUrl(nr) {
  // Url till bilden på frukten som användaren vill se
  let url;
  switch (nr) {
    case 1:
      url = "img/apple.png";
      break;
    case 2:
      url = "img/banana.png";
      break;
    case 3:
      url = "img/orange.png";
      break;
    case 4:
      url = "img/pear.png";
      break;
    case 5:
      url = "img/pineapple.png";
      break;
    default:
      url = "img/nofruit.png";
      break;
  }
  return url;
} // End getUrl

// Kontrollerar att nr är ett heltal mellan 1 och high.
// Returnerar ett heltal mellan 1 - high eller null om det inte är det.
function checkNr(nr, high) {
  msgElem.innerHTML = "";
  if (isNaN(nr)) {
    msgElem.innerHTML = "Du måste skriva ett tal med siffror";
    return null;
  }
  if (nr < 1 || nr > high) {
    msgElem.innerHTML = "Du måste skriva ett tal mellan 1 och " + high;
    return null;
  }
  return parseInt(nr);
} // End checkNr

window.onload = init; // Se till att init aktiveras då sidan är inladdad
// ------------------------------
