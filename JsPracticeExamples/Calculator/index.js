let num1 = document.getElementById("num1").value;
let num2 = document.getElementById("num2").value;

let result = document.getElementById("result");

function add() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  result.textContent = Number(num1) + Number(num2);
}
function subtract() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  result.textContent = Number(num1) - Number(num2);
}
function multiply() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  result.textContent = Number(num1) * Number(num2);
}
function divide() {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  result.textContent = Number(num1) / Number(num2);
}
