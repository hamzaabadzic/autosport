// --- PRETRAGA PO NAZIVU ---
function searchCars() {
    const text = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(text) ? "block" : "none";
    });
}

// --- SORTIRANJE PO CIJENI I SNAZI ---
function sortCars() {
    const type = document.getElementById("sort").value;
    const grid = document.querySelector(".grid");
    const cards = Array.from(grid.children);

    cards.sort((a,b)=>{
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        const powerA = parseInt(a.dataset.power);
        const powerB = parseInt(b.dataset.power);

        if (type==="price-asc")  return priceA - priceB;
        if (type==="price-desc") return priceB - priceA;
        if (type==="power-asc")  return powerA - powerB;
        if (type==="power-desc") return powerB - powerA;
        return 0;
    });

    cards.forEach(c => grid.appendChild(c)); // ponovo ih poredaj u DOM-u
}
