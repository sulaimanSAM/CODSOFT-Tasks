document.addEventListener("DOMContentLoaded", function() {
  const prev = document.querySelector(".prev-display");
  const curr = document.querySelector(".curr-display");
  let currOperand = "";
  let prevOperand = "";
  let operation;

  const clear = () => {
    currOperand = "";
    prevOperand = "";
    operation = undefined;
    update();
  };

  const del = () => {
    currOperand = currOperand.slice(0, -1);
    update();
  };

  const appendNum = (num) => {
    if (num === "." && currOperand.includes(".")) return;
    currOperand += num;
    update();
  };

  const chooseOp = (op) => {
    if (currOperand === "") return;
    if (prevOperand !== "") compute();
    operation = op;
    prevOperand = currOperand;
    currOperand = "";
    update();
  };

  const compute = () => {
    let comp;
    const a = parseFloat(prevOperand);
    const b = parseFloat(currOperand);
    if (isNaN(a) || isNaN(b)) return;
    switch (operation) {
      case "+": comp = a + b; break;
      case "-": comp = a - b; break;
      case "*": comp = a * b; break;
      case "/": comp = a / b; break;
      default: return;
    }
    currOperand = comp;
    operation = undefined;
    prevOperand = "";
    update();
  };

  const update = () => {
    curr.innerText = currOperand;
    prev.innerText = operation != null ? `${prevOperand} ${operation}` : "";
  };

  document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => appendNum(button.innerText));
  });

  document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", () => chooseOp(button.innerText));
  });

  document.querySelector(".equal").addEventListener("click", compute);
  document.querySelector(".clear").addEventListener("click", clear);
  document.querySelector(".delete").addEventListener("click", del);
});
