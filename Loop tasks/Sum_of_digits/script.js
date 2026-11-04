const input = document.getElementById("n");
const out = document.getElementById("out");

function calculate() {
    const text = input.value.trim();
    const n = Number(text);

    if (text === "" || !Number.isInteger(n)) {
        out.innerHTML = '<p class="error">Please enter a whole number.</p>'
        return
    }
    if (n < 1) {
        out.innerHTML = '<p class="error">N must be at least 1.</p>'
        return
    }
    if (n > 10000000) {
    out.innerHTML = '<p class="error">Please enter a number up to 10 000 000.</p>';
    return;
    }

    let sum = 0;
    const steps = [];
    for (let i = 1; i <= n; i++) {
        sum += i;
        if (n <= 20) steps.push(i);
    }
    
  const work = n <= 20
    ? "N = " + n + ": " + steps.join(" + ") + " = " + sum
    : "N = " + n + ": 1 + 2 + 3 + … + " + n + " = " + sum;
 
  out.innerHTML = '<p class="big">Answer: ' + sum + '</p>' + '<p class="work">' + work + '</p>';
}

document.getElementById("go").addEventListener("click", calculate);
input.addEventListener("keydown",  e => {if (e.key === "Enter") calculate(); });
calculate();