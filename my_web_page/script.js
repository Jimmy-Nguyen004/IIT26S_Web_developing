const buttons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const count = document.querySelectorAll("count");

function showCards(topic) {
    let shown = 0;

    for (const card of cards) {
        const tags = card.dataset.tags.split(" ");
        if (topic === "all" || tags.includes(topic)) {
            card.classList.remove("hidden");
            shown++;
        } else {
            card.classList.add("hidden");
        }
    }

    count.textContent = "Showing" + shown + " of " + cards.length + " assignments.";
}

for (const button of buttons) {
    button.addEventListener("click", () => {
        for (const b of buttons) {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
        }
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true")

        showCards(button.dataset.filter);
    });
}

document.getElementById("year").textContent = new Date().getFullYear();
showCards("all")