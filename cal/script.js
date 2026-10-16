function calculate(a, b, op) {
  if (a === "" || b === "") return "Enter both numbers!";
  a = Number(a);
  b = Number(b);
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") {
    if (b === 0) return "Cannot divide by zero!";
    return a / b;
  }
}

function calc1() {
  let a = document.getElementById("num1a").value;
  let b = document.getElementById("num1b").value;
  let op = document.getElementById("operator-1").value;
  document.getElementById("result1").innerHTML = calculate(a, b, op);
}

function calc2() {
  let a = document.getElementById("num2a").value;
  let b = document.getElementById("num2b").value;
  let op = document.querySelector('input[name="operator-2"]:checked').value;
  document.getElementById("result2").innerHTML = calculate(a, b, op);
}

function calc3() {
  let a = document.getElementById("num3a").value;
  let b = document.getElementById("num3b").value;
  let op = document.getElementById("operator-3").value;
  document.getElementById("result3").innerHTML = calculate(a, b, op);
}

function change(id, amount) {
  let box = document.getElementById(id);
  box.value = Number(box.value) + amount;
}
