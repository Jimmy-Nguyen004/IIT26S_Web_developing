const input = document.getElementById("n");
const out = document.getElementById("out");

function calculate() {
  const text = input.value.trim();
  const n = Number(text);

  // Check that N is a whole number and at least 1
  if (text === "" || !Number.isInteger(n)) {
    out.innerHTML = '<p class="error">Please enter a whole number.</p>';
    return;
  }
  if (n < 1) {
    out.innerHTML = '<p class="error">N must be at least 1.</p>';
    return;
  }
  if (n > 10000000) {
    out.innerHTML = '<p class="error">Please enter a number up to 10 000 000.</p>';
    return;
  }

  // Go through 1..n and add each number to the right sum
  let oddSum = 0, evenSum = 0;
  const odds = [], evens = [];
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      evenSum += i;
      if (n <= 30) evens.push(i);
    } else {
      oddSum += i;
      if (n <= 30) odds.push(i);
    }
  }

  let work;
  if (n <= 30) {
    work = "N = " + n + ": " + odds.join(" + ") + " = " + oddSum +
           (evens.length ? " and " + evens.join(" + ") + " = " + evenSum : " and no even numbers = 0");
  } else {
    work = "N = " + n + ": 1 + 3 + 5 + … = " + oddSum + " and 2 + 4 + 6 + … = " + evenSum;
  }

  out.innerHTML = '<p class="big">Sum of Odd = ' + oddSum + ', Sum of Even = ' + evenSum + '</p>' +
                  '<p class="work">' + work + '</p>';
}

document.getElementById("go").addEventListener("click", calculate);
input.addEventListener("keydown", e => { if (e.key === "Enter") calculate(); });
calculate();