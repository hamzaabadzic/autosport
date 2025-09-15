const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const cards = document.querySelectorAll('.grid .card');

function filterCars() {
  const text = searchInput.value.toLowerCase();
  const brand = brandFilter.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const cardBrand = card.dataset.brand.toLowerCase();
    const matchText = name.includes(text);
    const matchBrand = brand === "" || cardBrand.includes(brand);

    if (matchText && matchBrand) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener('input', filterCars);
brandFilter.addEventListener('change', filterCars);

const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const cards = document.querySelectorAll('.grid .card');
const grid = document.querySelector('.grid');
const noResults = document.getElementById('noResults');

function filterCars() {
  const text = searchInput.value.toLowerCase();
  const brand = brandFilter.value.toLowerCase();

  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const cardBrand = card.dataset.brand.toLowerCase();
    const matchText = name.includes(text);
    const matchBrand = brand === "" || cardBrand.includes(brand);

    if (matchText && matchBrand) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Ako nema rezultata
  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

function sortCars() {
  const value = sortFilter.value;
  const sortedCards = Array.from(cards);

  sortedCards.sort((a, b) => {
    const nameA = a.querySelector("h3").textContent;
    const nameB = b.querySelector("h3").textContent;
    const priceA = parseInt(a.querySelector("p:nth-of-type(2)").textContent.replace(/\D/g, ""));
    const priceB = parseInt(b.querySelector("p:nth-of-type(2)").textContent.replace(/\D/g, ""));
    const powerA = parseInt(a.querySelector("p:nth-of-type(1)").textContent.replace(/\D/g, ""));
    const powerB = parseInt(b.querySelector("p:nth-of-type(1)").textContent.replace(/\D/g, ""));

    switch(value) {
      case "price-asc": return priceA - priceB;
      case "price-desc": return priceB - priceA;
      case "power-asc": return powerA - powerB;
      case "power-desc": return powerB - powerA;
      case "name-asc": return nameA.localeCompare(nameB);
      case "name-desc": return nameB.localeCompare(nameA);
      default: return 0;
    }
  });

  // Ponovno poredaj kartice
  sortedCards.forEach(card => grid.appendChild(card));
}

searchInput.addEventListener('input', filterCars);
brandFilter.addEventListener('change', filterCars);
sortFilter.addEventListener('change', sortCars);


