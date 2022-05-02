// Globala konstanter och variabler
const roomPrice = [600, 800, 950]; // Pris för rumstyperna
const extraPrice = [40, 80, 100]; // Pris för extravalen
var formElem; // Referens till elementet med hela formuläret
var totalCostElem; // Referens till elementet för totalpris
// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
  formElem = document.getElementById("booking");
  totalCostElem = document.getElementById("totalCost");

  // Händelsehanterare för textfält som ska kontrolleras
  for (let i = 0; i < formElem.roomType.length; i++) {
    let roomType = formElem.roomType[i];
    roomType.addEventListener("change", checkIfFamilyRoom);
    roomType.addEventListener("change", calculateCost);
    roomType.parentNode.lastChild.textContent += " (" + roomPrice[i] + " kr)";
  }
  for (let i = 0; i < formElem.extra.length; i++) {
    let extra = formElem.extra[i];
    extra.addEventListener("change", calculateCost);
    extra.parentNode.lastChild.textContent += " (" + extraPrice[i] + " kr)";
  }
  formElem.nrOfNights.addEventListener("change", calculateCost);
  formElem.city.addEventListener("blur", checkCity);
  formElem.zipcode.addEventListener("blur", checkField);
  formElem.telephone.addEventListener("blur", checkField);

  // Händelsehanterare för kampanjkod
  formElem.campaigncode.addEventListener("focus", checkCampaign);
  formElem.campaigncode.addEventListener("keyup", checkCampaign);
  formElem.campaigncode.addEventListener("blur", endCheckCampaign);

  checkIfFamilyRoom();
  calculateCost();
} // End init
window.addEventListener("load", init);
// ------------------------------

// Kontrollera om familjrummet är valt. Om det är valt, så antal personer select aktiveras och
// alternativet för sjöutsikt deaktiveras.
function checkIfFamilyRoom() {
  if (formElem.roomType[2].checked) {
    formElem.persons.disabled = false;
    formElem.persons.parentNode.style.color = "#000";
    formElem.extra[2].disabled = true;
    formElem.extra[2].parentNode.style.color = "#999";
    formElem.extra[2].checked = false;
  } else {
    formElem.persons.disabled = true;
    formElem.persons.parentNode.style.color = "#999";
    formElem.extra[2].disabled = false;
    formElem.extra[2].parentNode.style.color = "#000";
  }
} // End checkIfFamilyRoom

// Beräkna totalpriset och visa det i totalpris-elementet
function calculateCost() {
  let price = 0; // Totalpriset
  for (let i = 0; i < formElem.roomType.length; i++) {
    if (formElem.roomType[i].checked) {
      price += roomPrice[i];
      break;
    }
  }
  for (let i = 0; i < formElem.extra.length; i++) {
    if (formElem.extra[i].checked) {
      price += extraPrice[i];
    }
  }
  let nrOfNights = formElem.nrOfNights.value; // Antal nätter
  document.getElementById("totalCost").textContent = price * nrOfNights;
} // End calculateCost

// Konvertera ort till versaler
function checkCity() {
  let city = this.value;
  this.value = city.toUpperCase();
} // End checkCity

// Kontrollera om postnummer och telefonnummer är i korrekt format.
// Om det är felaktigt, så visas en felmeddelande.
function checkField() {
  const fieldNames = ["zipcode", "telephone"];
  const re = [/^\d{3} ?\d{2}$/, /^0\d{1,3}[-/ ]?\d{5,8}$/]; // RegExp för postnummer och telefonnummer
  const errMsg = [
    "Postnummer måste bestå av fem siffror.",
    "Telefonnummer börja med en 0:a och följas av 6-11 siffror.",
  ];
  let idx = fieldNames.indexOf(this.name); // Index för rätt element
  let errMsgElem = this.nextElementSibling; // Referens till elementet med felmeddelande
  errMsgElem.innerHTML = "";
  if (!re[idx].test(this.value)) {
    errMsgElem.innerHTML = errMsg[idx];
    return false; // Fel i fältet
  }
  return true; // Fältet är ok
} // End checkField

// Kontrollera om kampanjkoden är i korrekt format.
function checkCampaign() {
  const re = /^[A-Za-z]{3}-\d{2}-[A-Za-z]{1}\d{1}$/; // RegExp för kampanjkod
  if (re.test(this.value)) {
    this.style.backgroundColor = "#6f9"; // Rätt format -> grön bakgrund
  } else {
    this.style.backgroundColor = "#f99"; // Felaktigt format -> röd bakgrund
  }
} // End checkCampaign

// Användaren har lämnat kampanjkoden, konvertera innehållet till versaler och ta bort bakgrundsfärg.
function endCheckCampaign() {
  this.style.backgroundColor = "";
  let campaign = this.value;
  this.value = campaign.toUpperCase();
} // End endCheckCampaign
