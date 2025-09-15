document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const brandFilter = document.getElementById('brandFilter');
  const sortFilter = document.getElementById('sortFilter');
  const grid = document.querySelector('.grid');
  const noResults = document.getElementById('noResults');

  // Spremi originalni redoslijed za vraćanje kada je sortiranje prazno
  const originalOrder = Array.from(grid.querySelectorAll('.card'));

  function getAllCards() {
    return Array.from(grid.querySelectorAll('.card'));
  }

  function parsePrice(card) {
    // traži drugi <p> u kartici (tekst "Cijena: 320,000 €")
    const priceP = card.querySelector('p:nth-of-type(2)');
    if (!priceP) return 0;
    const digits = priceP.textContent.replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : 0;
  }

  function parsePower(card) {
    // traži prvi <p> u kartici (tekst "720 KS – Supercar")
    const powerP = card.querySelector('p:nth-of-type(1)');
    if (!powerP) return 0;
    const digits = powerP.textContent.replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : 0;
  }

  function filterCars() {
    const text = searchInput.value.trim().toLowerCase();
    const brand = brandFilter.value.trim().toLowerCase();

    let visibleCount = 0;
    getAllCards().forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const cardBrand = (card.dataset.brand || '').toLowerCase();
      const matchText = !text || name.includes(text);
      const matchBrand = !brand || cardBrand.includes(brand);

      if (matchText && matchBrand) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  function sortCars() {
    const mode = sortFilter.value;
    // Ako je prazno - vrati originalni redoslijed (samo za vidljive)
    if (mode === '') {
      originalOrder.forEach(card => {
        if (card.style.display !== 'none') grid.appendChild(card);
      });
      return;
    }

    const visibleCards = getAllCards().filter(c => c.style.display !== 'none');

    visibleCards.sort((a, b) => {
      const nameA = a.querySelector('h3').textContent.trim();
      const nameB = b.querySelector('h3').textContent.trim();
      const priceA = parsePrice(a);
      const priceB = parsePrice(b);
      const powerA = parsePower(a);
      const powerB = parsePower(b);

      switch(mode) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'power-asc': return powerA - powerB;
        case 'power-desc': return powerB - powerA;
        case 'name-asc': return nameA.localeCompare(nameB);
        case 'name-desc': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });

    // Append sorted visible cards to grid (ovo ih pomiče u novom poretku)
    visibleCards.forEach(card => grid.appendChild(card));
  }

  // Event listeners: kad se pretražuje ili mijenja brand -> filtriraj i primijeni sortiranje
  searchInput.addEventListener('input', () => { filterCars(); sortCars(); });
  brandFilter.addEventListener('change', () => { filterCars(); sortCars(); });
  sortFilter.addEventListener('change', () => { sortCars(); });

  // inicijalno
  filterCars();
});
