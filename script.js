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
    case "×":
      answer = multiply(num1, num2);
      break;
    case "÷":
      answer = divide(num1, num2);
      break;
    default:
      console.error("Invalid operator");
      return;
  }
  answer = Math.round(answer * 100) / 100;
    currentDisp.textContent = `${answer}`;
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
  decimal.disabled = false;
});

function checkIfZero() {
    if (currentNum === "0" && currentDisp.textContent === "0") {
        clear.click();
    }
}

function toggleNeg(numStr) {
  let num = parseFloat(numStr);
  num = -num;
  return num.toString();
}

negative.addEventListener("click", () => {
  if (currentNum !== "") {
    currentNum = toggleNeg(currentNum);
    currentDisp.textContent = currentNum;
  }
});

function updateDecimalButtonState() {
  decimal.disabled = currentDisp.textContent.includes(".");
}

decimal.addEventListener("click", () => {
  if (!currentDisp.textContent.includes(".")) {
    currentDisp.textContent += ".";
    updateDecimalButtonState();
  }
});

backspace.addEventListener("click", () => {
  if (currentDisp.textContent !== "") {
    currentNum = currentNum.slice(0, -1);
    if (currentNum === "") {
      currentDisp.textContent = "0";
    } else {
      currentDisp.textContent = currentNum;
    }
  }
});

numBtn.forEach((button) => {
  button.addEventListener("click", () => {
    updateDecimalButtonState();
    if (currentNum === answer && prevDisp.textContent === "") {
      currentDisp.textContent = "";
      currentNum = "";
      answer = "";
      currentNum += button.textContent;
      currentDisp.textContent = currentNum;
    } else if (button.textContent === "0" && currentDisp.textContent !== "0") {
      currentNum += button.textContent;
      currentDisp.textContent = currentNum;
    } else if (
      button.textContent !== "0" &&
      currentDisp.textContent !== answer.toString()
    ) {
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
      prevDisp.textContent = `${answer}  ${operator}`;
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
    checkIfZero();
  });
});
