function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    console.error("Cannot divide by zero");
    return null;
  }
  return a / b;
}

let currentNum = "";
let operator = "";
let prevNum = "";
let answer = "";

function operate(operator, currentNum, prevNum) {
  let num1 = parseFloat(prevNum);
  let num2 = parseFloat(currentNum);
  switch (operator) {
    case "+":
      answer = add(num1, num2);
      break;
    case "-":
      answer = subtract(num1, num2);
      break;
    case "*":
      answer = multiply(num1, num2);
      break;
    case "/":
      answer = divide(num1, num2);
      break;
    default:
      console.error("Invalid operator");
      return;
  }
  answer = Math.round(answer * 100) / 100; // Round to 2 decimal places
  currentDisp.textContent = answer;
  prevDisp.textContent = "";
  currentNum = answer.toString();
  prevNum = "";
  operator = "";
}

const numBtn = document.querySelectorAll(".numBtn");
const opBtn = document.querySelectorAll(".symBtn");

const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const negative = document.querySelector("#negative");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

const prevDisp = document.getElementById("prev");
const currentDisp = document.querySelector("#currentType");

clear.addEventListener("click", () => {
  currentNum = "";
  operator = "";
  prevNum = "";
  answer = "";
  prevDisp.textContent = "";
  currentDisp.textContent = "0";
});

numBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "0" && currentDisp.textContent !== "0") {
      currentNum += button.textContent;
      currentDisp.textContent = currentNum;
    } else if (button.textContent !== "0") {
      currentNum += button.textContent;
      currentDisp.textContent = currentNum;
    }
  });
});

opBtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      currentNum !== "" &&
      operator === "" &&
      prevNum === "" &&
      button.textContent !== "="
    ) {
      operator = button.textContent;
      prevDisp.textContent = `${currentNum}  ${operator}`;
      prevNum = currentNum;
      currentNum = "";
      currentDisp.textContent = "0";
    } else if (
      currentNum !== "" &&
      operator !== "" &&
      prevNum !== "" &&
      button.textContent !== "="
    ) {
      operate(operator, currentNum, prevNum);
      operator = button.textContent;
      prevNum = answer;
      prevDisp.textContent = `${Math.round(answer)}  ${operator}`;
      currentDisp.textContent = "0";
      currentNum = "";
      answer = "";
    } else if (
      currentNum !== "" &&
      operator !== "" &&
      prevNum !== "" &&
      button.textContent === "="
    ) {
      operate(operator, currentNum, prevNum);
      currentDisp.textContent = `${answer}`;
      prevDisp.textContent = "";
      currentNum = answer.toString();
      prevNum = "";
      operator = "";
      answer = "";
    }
  });
});
