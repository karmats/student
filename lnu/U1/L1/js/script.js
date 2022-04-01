let input1Elem, input2Elem, resultElem;

function init() {
  input1Elem = document.getElementById("input1");
  input2Elem = document.getElementById("input2");
  resultElem = document.getElementById("result");
  document.getElementById("runBtn").onclick = areaCalculations;
} // End init

window.onload = init;

function metersToSquareFeet(meters) {
  return meters * 3.28;
}
function areaCalculations() {
  // Längd i meter
  const length = Number(input1Elem.value);
  // Bredd i meter
  const width = Number(input2Elem.value);

  // Area rectangle
  let area = length * width;
  resultElem.innerHTML = `<p>Rektangelns area är ${area}m<sup>2</sup></p>`;

  // Area ellipse
  area = (3.14 * length * width) / 4;
  result.innerHTML += `<p>Ellipsens area är ${area}m<sup>2</sup></p>`;

  // Area rectangle on length + 5
  area = (length + 5) * width;
  result.innerHTML += `<p>Längden + 5 ger rektangelns area ${area}m<sup>2</sup></p>`;

  // Area rectangle on length + 50% and width + 3
  area = length * 1.5 * (width + 3);
  result.innerHTML += `<p>Då längden ökas med 50% och bredden med 3 meter blir rektangelns area ${area}m<sup>2</sup></p>`;

  // Area triangle
  area = (metersToSquareFeet(length) * metersToSquareFeet(width)) / 2;
  result.innerHTML += `<p>Trianglelns area är ${area} kvadratfot</p>`;
} // End areaCalculations
