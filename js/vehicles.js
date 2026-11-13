/* ==========================================================================
   vehicles.js — Données de la flotte + fonctions de rendu partagées.
   ⚙️  Pour AJOUTER / MODIFIER / SUPPRIMER un véhicule, éditez uniquement
       le tableau VEHICLES ci-dessous. Chaque véhicule est indépendant.
   ========================================================================== */

const VEHICLES = [
  {
    id: 1,
    name: "Toyota Corolla",
    category: "Berline",
    priceDay: 35000,
    priceWeek: 210000,
    transmission: "Automatique",
    seats: 5,
    fuel: "Essence",
    airConditioning: true,
    luggage: 2,
    year: 2022,
    popular: true,
    available: true,
    description: "Berline compacte, confortable et économe, idéale pour vos déplacements quotidiens à Lomé comme pour vos trajets entre villes.",
    conditions: "Caution requise. Kilométrage limité à 200 km/jour, au-delà 150 FCFA/km supplémentaire.",
    image: "https://images.unsplash.com/photo-1690278289651-895463644114?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1690278289651-895463644114?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611508106567-6218ae6c5f6a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578041262130-633307b3bfd6?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 2,
    name: "Kia Picanto",
    category: "Économique",
    priceDay: 22000,
    priceWeek: 135000,
    transmission: "Manuelle",
    seats: 4,
    fuel: "Essence",
    airConditioning: true,
    luggage: 1,
    year: 2021,
    popular: false,
    available: true,
    description: "Petite citadine facile à conduire et économique en carburant — parfaite pour se déplacer en ville sans contrainte de stationnement.",
    conditions: "Caution requise. Kilométrage limité à 150 km/jour, au-delà 120 FCFA/km supplémentaire.",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590415018064-0722190fe4cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527593167147-e9c94a5883e6?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    name: "Hyundai Tucson",
    category: "SUV",
    priceDay: 55000,
    priceWeek: 340000,
    transmission: "Automatique",
    seats: 5,
    fuel: "Essence",
    airConditioning: true,
    luggage: 3,
    year: 2023,
    popular: true,
    available: true,
    description: "SUV spacieux et robuste, à l'aise en ville comme sur les routes moins carrossables — idéal pour les familles et les longs trajets.",
    conditions: "Caution requise. Kilométrage limité à 250 km/jour, au-delà 180 FCFA/km supplémentaire.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615887110697-0819ec23465f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596649714492-a8f90ecb3776?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    name: "Toyota Land Cruiser",
    category: "SUV",
    priceDay: 85000,
    priceWeek: 520000,
    transmission: "Automatique",
    seats: 7,
    fuel: "Diesel",
    airConditioning: true,
    luggage: 4,
    year: 2022,
    popular: false,
    available: true,
    description: "4x4 puissant et fiable, parfait pour les déplacements professionnels, les missions terrain et les longues distances hors de Lomé.",
    conditions: "Caution requise. Kilométrage illimité en location longue durée sur demande.",
    image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1677339059244-8c6cefec8415?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516862523118-a3724eb136d7?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    name: "Mercedes Classe E",
    category: "Premium",
    priceDay: 120000,
    priceWeek: 750000,
    transmission: "Automatique",
    seats: 5,
    fuel: "Essence",
    airConditioning: true,
    luggage: 3,
    year: 2023,
    popular: true,
    available: true,
    description: "Berline haut de gamme pour vos rendez-vous professionnels, événements ou transferts avec un niveau de confort et de prestige incomparable.",
    conditions: "Caution majorée. Disponible avec chauffeur sur demande.",
    image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523676060187-f55189a71f5e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593153121623-3180d7e37775?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    name: "Hyundai H1",
    category: "Familiale",
    priceDay: 65000,
    priceWeek: 400000,
    transmission: "Manuelle",
    seats: 8,
    fuel: "Diesel",
    airConditioning: true,
    luggage: 5,
    year: 2021,
    popular: false,
    available: true,
    description: "Van spacieux pour les familles nombreuses, les groupes ou le transport de plusieurs bagages — confortable sur tous les trajets.",
    conditions: "Caution requise. Kilométrage limité à 250 km/jour, au-delà 180 FCFA/km supplémentaire.",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615563164538-89e1da13fcc4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1663852397535-18292e115327?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

/* ---------------------------------------------------- Helpers publics - */
function getVehicleById(id){
  return VEHICLES.find(v => v.id === Number(id));
}

function formatFCFA(amount){
  return amount.toLocaleString("fr-FR") + " FCFA";
}

/* Génère le HTML d'une carte véhicule (utilisée sur l'accueil et vehicules.html) */
function vehicleCardHTML(v){
  return `
  <div class="col-md-6 col-lg-4 vehicle-col reveal" data-category="${v.category}">
    <div class="vehicle-card">
      <div class="img-wrap">
        <img src="${v.image}" alt="${v.name} - ${v.category} disponible à la location" loading="lazy">
        ${v.popular ? '<span class="badge-tag">Populaire</span>' : ''}
        ${v.available ? '<span class="badge-avail">Disponible</span>' : ''}
      </div>
      <div class="body">
        <div class="cat">${v.category}</div>
        <h5>${v.name}</h5>
        <div class="vehicle-specs">
          <span><i class="bi bi-person-fill"></i> ${v.seats} places</span>
          <span><i class="bi bi-gear-fill"></i> ${v.transmission}</span>
          <span><i class="bi bi-snow"></i> Climatisation</span>
          <span><i class="bi bi-briefcase-fill"></i> ${v.luggage} bagages</span>
        </div>
        <div class="price-row">
          <div class="price">${formatFCFA(v.priceDay)} <small class="d-block">/ jour</small></div>
        </div>
        <div class="cta-row">
          <button class="btn btn-outline-dark-custom btn-sm-pill" onclick="openVehicleModal(${v.id})">Voir les détails</button>
          <a href="reservation.html?id=${v.id}" class="btn btn-gold btn-sm-pill text-center">Réserver</a>
        </div>
      </div>
    </div>
  </div>`;
}

/* Injecte une liste de véhicules dans un conteneur donné (id du conteneur) */
function renderVehicles(containerId, list){
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(vehicleCardHTML).join("");
  if (window.initRevealOnScroll) window.initRevealOnScroll();
}

/* Filtrage par catégorie, branché sur .filter-btn[data-filter] */
function initVehicleFilters(containerId){
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter");
      const filtered = cat === "Tous" ? VEHICLES : VEHICLES.filter(v => v.category === cat);
      renderVehicles(containerId, filtered);
    });
  });
}

/* ------------------------------------------------------- Modal détails */
function openVehicleModal(id){
  const v = getVehicleById(id);
  if (!v) return;
  const modalEl = document.getElementById("vehicleModal");
  if (!modalEl) { window.location.href = `reservation.html?id=${id}`; return; }

  document.getElementById("vmName").textContent = v.name;
  document.getElementById("vmCategory").textContent = v.category;
  document.getElementById("vmMainImg").setAttribute("src", v.gallery[0]);
  document.getElementById("vmDesc").textContent = v.description;
  document.getElementById("vmConditions").textContent = v.conditions;
  document.getElementById("vmPriceDay").textContent = formatFCFA(v.priceDay);
  document.getElementById("vmPriceWeek").textContent = formatFCFA(v.priceWeek);
  document.getElementById("vmSeats").textContent = v.seats + " places";
  document.getElementById("vmTransmission").textContent = v.transmission;
  document.getElementById("vmFuel").textContent = v.fuel;
  document.getElementById("vmLuggage").textContent = v.luggage + " bagages";
  document.getElementById("vmYear").textContent = v.year;
  document.getElementById("vmAC").textContent = v.airConditioning ? "Climatisation incluse" : "Sans climatisation";
  document.getElementById("vmReserveBtn").setAttribute("href", `reservation.html?id=${v.id}`);

  const thumbsWrap = document.getElementById("vmThumbs");
  thumbsWrap.innerHTML = v.gallery.map((img, i) =>
    `<img src="${img}" alt="${v.name} vue ${i+1}" class="${i === 0 ? 'active' : ''}" data-src="${img}">`
  ).join("");
  thumbsWrap.querySelectorAll("img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      document.getElementById("vmMainImg").setAttribute("src", thumb.getAttribute("data-src"));
      thumbsWrap.querySelectorAll("img").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  bsModal.show();
}
