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
