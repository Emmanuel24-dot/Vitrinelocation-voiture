/* ==========================================================================
   reservation.js — Logique du formulaire de réservation en 3 étapes.
   Dépend de vehicles.js (VEHICLES, getVehicleById, formatFCFA) et de
   main.js (AGENCY_CONFIG, buildWhatsappLink).
   ========================================================================== */

let selectedVehicleId = null;
let currentStep = 1;

document.addEventListener("DOMContentLoaded", () => {
  const resForm = document.getElementById("reservationWizard");
  if (!resForm) return;

  renderVehiclePickList();
  preselectFromQueryString();
  bindStepNavigation();
  bindDateInputs();
  bindDriverToggle();
  bindSubmit();
  updateSummary();
});

/* --------------------------------------------------- Étape 1 : choix - */
function renderVehiclePickList(){
  const wrap = document.getElementById("vehiclePickList");
  if (!wrap) return;
  wrap.innerHTML = VEHICLES.map(v => `
    <div class="res-vehicle-pick" data-id="${v.id}" onclick="selectVehicle(${v.id})">
      <img src="${v.image}" alt="${v.name}">
      <div class="flex-grow-1">
        <div class="fw-bold">${v.name}</div>
        <div class="small text-secondary">${v.category} · ${v.seats} places · ${v.transmission}</div>
      </div>
      <div class="fw-bold text-nowrap">${formatFCFA(v.priceDay)}<span class="d-block small text-secondary fw-normal">/ jour</span></div>
    </div>
  `).join("");
}

function selectVehicle(id){
  selectedVehicleId = id;
  document.querySelectorAll(".res-vehicle-pick").forEach(el => {
    el.classList.toggle("selected", Number(el.getAttribute("data-id")) === id);
  });
  document.getElementById("vehicleSelectError")?.classList.add("d-none");
  updateSummary();
}
window.selectVehicle = selectVehicle;

function preselectFromQueryString(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (id && getVehicleById(id)) selectVehicle(Number(id));
}

/* --------------------------------------------------- Navigation étapes */
function bindStepNavigation(){
  document.querySelectorAll("[data-next-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!validateStep(currentStep)) return;
      goToStep(currentStep + 1);
    });
  });
  document.querySelectorAll("[data-prev-step]").forEach(btn => {
    btn.addEventListener("click", () => goToStep(currentStep - 1));
  });
}

function goToStep(step){
  if (step < 1 || step > 3) return;
  currentStep = step;
  document.querySelectorAll(".res-panel").forEach(p => p.classList.toggle("active", Number(p.getAttribute("data-step")) === step));
  document.querySelectorAll(".res-step").forEach(s => {
    const n = Number(s.getAttribute("data-step"));
    s.classList.toggle("active", n === step);
    s.classList.toggle("done", n < step);
  });
  window.scrollTo({ top: document.getElementById("reservationWizard").offsetTop - 120, behavior:"smooth" });
}

function validateStep(step){
  if (step === 1){
    if (!selectedVehicleId){
      document.getElementById("vehicleSelectError")?.classList.remove("d-none");
      return false;
    }
    return true;
  }
  if (step === 2){
    const start = document.getElementById("dateStart");
    const end = document.getElementById("dateEnd");
    let ok = true;
    [start, end].forEach(i => i.classList.remove("is-invalid"));
    if (!start.value){ start.classList.add("is-invalid"); ok = false; }
    if (!end.value){ end.classList.add("is-invalid"); ok = false; }
    if (start.value && end.value && new Date(end.value) <= new Date(start.value)){
      end.classList.add("is-invalid");
      document.getElementById("dateOrderError")?.classList.remove("d-none");
      ok = false;
    } else {
      document.getElementById("dateOrderError")?.classList.add("d-none");
    }
    return ok;
  }
  return true;
}

/* --------------------------------------------------- Calcul du prix -- */
function bindDateInputs(){
  ["dateStart","dateEnd"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", updateSummary);
  });
}
function bindDriverToggle(){
  document.querySelectorAll("input[name='driverOption']").forEach(r => r.addEventListener("change", updateSummary));
}

function computeDays(){
  const start = document.getElementById("dateStart")?.value;
  const end = document.getElementById("dateEnd")?.value;
  if (!start || !end) return 0;
  const d1 = new Date(start), d2 = new Date(end);
  const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function updateSummary(){
  const v = selectedVehicleId ? getVehicleById(selectedVehicleId) : null;
  const days = computeDays();
  const nameEl = document.getElementById("sumVehicleName");
  const calcEl = document.getElementById("sumCalc");
  const totalEl = document.getElementById("sumTotal");
  const driverEl = document.getElementById("sumDriver");

  if (!v){
    nameEl.textContent = "Aucun véhicule sélectionné";
    calcEl.textContent = "—";
    totalEl.textContent = "0 FCFA";
    driverEl.textContent = "—";
    return;
  }

  nameEl.textContent = v.name;
  const driverOption = document.querySelector("input[name='driverOption']:checked")?.value || "sans";
  driverEl.textContent = driverOption === "avec" ? "Avec chauffeur" : "Sans chauffeur";

  if (days > 0){
    const total = v.priceDay * days;
    calcEl.textContent = `${formatFCFA(v.priceDay)} × ${days} jour${days > 1 ? "s" : ""}`;
    totalEl.textContent = formatFCFA(total);
  } else {
    calcEl.textContent = "Sélectionnez vos dates";
    totalEl.textContent = "0 FCFA";
  }
}

/* --------------------------------------------------- Envoi / WhatsApp */
function bindSubmit(){
  const form = document.getElementById("reservationWizard");
  const confirmBtn = document.getElementById("resSubmitBtn");
  if (!confirmBtn) return;

  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const fullname = document.getElementById("resName");
    const phone = document.getElementById("resPhone");
    let ok = true;
    [fullname, phone].forEach(i => i.classList.remove("is-invalid"));
    if (!fullname.value.trim()){ fullname.classList.add("is-invalid"); ok = false; }
    if (!phone.value.trim()){ phone.classList.add("is-invalid"); ok = false; }
    if (!ok) return;

    const v = getVehicleById(selectedVehicleId);
    const days = computeDays();
    const total = v.priceDay * days;
    const start = document.getElementById("dateStart").value;
    const end = document.getElementById("dateEnd").value;
    const startFmt = formatDateFR(start);
    const endFmt = formatDateFR(end);
    const pickup = document.getElementById("resPickup").value || "Lomé";
    const dropoff = document.getElementById("resDropoff").value || "Lomé";
    const driverOption = document.querySelector("input[name='driverOption']:checked")?.value === "avec" ? "avec chauffeur" : "sans chauffeur";
    const message = document.getElementById("resMessage").value.trim();

    const waText =
`Bonjour, je souhaite réserver une ${v.name} du ${startFmt} au ${endFmt} (${days} jour${days > 1 ? "s" : ""}, ${driverOption}).
Lieu de prise en charge : ${pickup}
Lieu de restitution : ${dropoff}
Montant estimé : ${formatFCFA(total)}
Nom : ${fullname.value.trim()}
Téléphone : ${phone.value.trim()}${message ? "\nMessage : " + message : ""}
Pouvez-vous confirmer sa disponibilité ?`;

    document.getElementById("confirmBanner")?.classList.add("show");
    goToStep(3);
    window.open(`https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
  });
}

function formatDateFR(isoDate){
  if (!isoDate) return "";
  const [y,m,d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}
