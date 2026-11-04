const input = document.getElementById("n")
const out = document.getElementById("out")

function calculate() {
    const text = input.value.trim();
    const n = Number(text)

if (text === "" || !Number.isInteger(n)) {
    out.innerHTML = '<p class="error">Please enter a whole number.</p>';
    return
}

if (n < 0) {
    out.innerHTML = '<p class="big">Answer: Unspecified</p>'
    return
}

if (n > 1000) {
    out.innerHTML = '<p class="error">Please enter a number up to 1000</p>'
    return
}

let result = 1n;
const steps = [];
for (let i = 1; i <= n; i++) {
    result *= BigInt(i);
    steps.push(i)
}

let work = n === 0 ? "0! = 1 (by definition)" : n + "! = " + steps.join(" * ");

if (n > 20) work = n + "! = 1 * 2 * 3 * ... * " + n;

out.innerHTML = '<p class="big">Answer: ' + result.toString() + '</p>' + '<p class="work">' + work + '</p>';

}

document.getElementById("go").addEventListener("click", calculate);
input.addEventListener("keydown", e => {if (e.key === "Enter") calculate(); });
calculate();