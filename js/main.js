/* ==========================================================================
   main.js — Comportements communs à toutes les pages.
   ⚙️  Coordonnées de l'agence : modifiez uniquement AGENCY_CONFIG ci-dessous.
   ========================================================================== */

const AGENCY_CONFIG = {
  name: "[NOM DE L'AGENCE]",
  slogan: "Votre mobilité, notre priorité.",
  phone: "+228 XX XX XX XX",
  phoneHref: "tel:+228XXXXXXXX",
  whatsappNumber: "228XXXXXXXX",              // Numéro WhatsApp SANS le "+" — [NUMÉRO WHATSAPP]
  whatsappDefaultMessage: "Bonjour, je souhaite louer un véhicule. Pouvez-vous me renseigner sur les disponibilités et les tarifs ?",
  email: "[EMAIL]",
  address: "[ADRESSE], Lomé, Togo",
  hours: [
    { day: "Lundi – Samedi", time: "07:00 – 20:00" },
    { day: "Dimanche", time: "08:00 – 16:00" }
  ],
  socials: { facebook: "#", instagram: "#", tiktok: "#" },
  mapsEmbedUrl: "https://www.google.com/maps?q=6.1319,1.2228&z=15&output=embed"
};

document.addEventListener("DOMContentLoaded", () => {
  populateConfig();
  initNavbar();
  initMobileMenuClose();
  initRevealOnScroll();
  initCounters();
  initLightbox();
  initContactForm();
  initWhatsappLinks();
  initFooterYear();
});

/* --------------------------------------- Injecte les infos du config - */
function populateConfig(){
  document.querySelectorAll("[data-agency-name]").forEach(el => el.textContent = AGENCY_CONFIG.name);
  document.querySelectorAll("[data-agency-slogan]").forEach(el => el.textContent = AGENCY_CONFIG.slogan);
  document.querySelectorAll("[data-agency-phone]").forEach(el => el.textContent = AGENCY_CONFIG.phone);
  document.querySelectorAll("[data-agency-phone-href]").forEach(el => el.setAttribute("href", AGENCY_CONFIG.phoneHref));
  document.querySelectorAll("[data-agency-email]").forEach(el => el.textContent = AGENCY_CONFIG.email);
  document.querySelectorAll("[data-agency-email-href]").forEach(el => el.setAttribute("href", "mailto:" + AGENCY_CONFIG.email));
  document.querySelectorAll("[data-agency-address]").forEach(el => el.textContent = AGENCY_CONFIG.address);
  document.querySelectorAll("[data-maps-src]").forEach(el => el.setAttribute("src", AGENCY_CONFIG.mapsEmbedUrl));

  const hoursList = document.querySelector("[data-agency-hours]");
  if (hoursList){
    hoursList.innerHTML = AGENCY_CONFIG.hours.map(h =>
      `<li class="d-flex justify-content-between border-bottom py-2"><span>${h.day}</span><strong>${h.time}</strong></li>`
    ).join("");
  }
  const hoursShort = document.querySelector("[data-agency-hours-short]");
  if (hoursShort && AGENCY_CONFIG.hours[0]) hoursShort.innerHTML = `${AGENCY_CONFIG.hours[0].day}<br>${AGENCY_CONFIG.hours[0].time}`;

  document.querySelectorAll("[data-social-facebook]").forEach(el => el.setAttribute("href", AGENCY_CONFIG.socials.facebook));
  document.querySelectorAll("[data-social-instagram]").forEach(el => el.setAttribute("href", AGENCY_CONFIG.socials.instagram));
  document.querySelectorAll("[data-social-tiktok]").forEach(el => el.setAttribute("href", AGENCY_CONFIG.socials.tiktok));
}

/* --------------------------------------------------- Liens WhatsApp -- */
function buildWhatsappLink(message){
  return `https://wa.me/${AGENCY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function initWhatsappLinks(){
  document.querySelectorAll("[data-whatsapp-default]").forEach(el => {
    el.setAttribute("href", buildWhatsappLink(AGENCY_CONFIG.whatsappDefaultMessage));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ------------------------------------------------------- Navbar ------ */
function initNavbar(){
  const nav = document.getElementById("mainNavbar");
  if (!nav) return;
  const toggle = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  toggle();
  window.addEventListener("scroll", toggle, { passive:true });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-main .nav-link[href*='#']");
  if (sections.length){
    const spy = () => {
      let current = "";
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute("id"); });
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href").endsWith("#" + current)));
    };
    window.addEventListener("scroll", spy, { passive:true });
    spy();
  }
}

function initMobileMenuClose(){
  const navCollapse = document.getElementById("navbarContent");
  if (!navCollapse) return;
  navCollapse.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navCollapse.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    });
  });
}

/* ------------------------------------------------- Reveal on scroll -- */
function initRevealOnScroll(){
  const items = document.querySelectorAll(".reveal:not(.in)");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){ entry.target.classList.add("in"); io.unobserve(entry.target); }
    });
  }, { threshold:0.12 });
  items.forEach(el => io.observe(el));
}
window.initRevealOnScroll = initRevealOnScroll;

/* -------------------------------------------------- Compteurs animés - */
function initCounters(){
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const animate = (el) => {
    const raw = el.getAttribute("data-counter");
    const isText = isNaN(parseFloat(raw)) === false ? false : true;
    if (isText){ el.textContent = raw; return; } // ex: "24/7"
    const target = parseFloat(raw);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("fr-FR") + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("fr-FR") + suffix;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting){ animate(entry.target); io.unobserve(entry.target); } });
  }, { threshold:0.5 });
  counters.forEach(el => io.observe(el));
}

/* --------------------------------------------------------- Lightbox -- */
function initLightbox(){
  const overlay = document.getElementById("lightboxOverlay");
  const img = document.getElementById("lightboxImage");
  if (!overlay || !img) return;
  document.querySelectorAll(".gallery-item img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      img.setAttribute("src", thumb.getAttribute("src"));
      img.setAttribute("alt", thumb.getAttribute("alt") || "");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
  const closeBox = () => { overlay.classList.remove("active"); document.body.style.overflow = ""; };
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeBox(); });
  document.getElementById("lightboxClose")?.addEventListener("click", closeBox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBox(); });
}

/* ------------------------------------------------- Formulaire contact */
function initContactForm(){
  const form = document.getElementById("contactForm");
  if (!form) return;
  const banner = document.getElementById("contactConfirm");

  const showError = (input, message) => {
    input.classList.add("is-invalid");
    const msg = input.parentElement.querySelector(".invalid-msg");
    if (msg){ msg.textContent = message; msg.classList.add("show"); }
  };
  const clearError = (input) => {
    input.classList.remove("is-invalid");
    const msg = input.parentElement.querySelector(".invalid-msg");
    if (msg) msg.classList.remove("show");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("was-validated-custom");
    let valid = true;

    const name = document.getElementById("cName");
    const phone = document.getElementById("cPhone");
    const email = document.getElementById("cEmail");
    const subject = document.getElementById("cSubject");
    const message = document.getElementById("cMessage");

    [name, phone, subject, message].forEach(clearError);
    clearError(email);

    if (!name.value.trim()){ showError(name, "Veuillez saisir votre nom."); valid = false; }
    if (!phone.value.trim()){ showError(phone, "Veuillez saisir votre numéro de téléphone."); valid = false; }
    else if (!/^[0-9+ ]{8,}$/.test(phone.value.trim())){ showError(phone, "Veuillez saisir un numéro de téléphone valide."); valid = false; }
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){ showError(email, "Veuillez saisir un email valide."); valid = false; }
    if (!subject.value){ showError(subject, "Veuillez choisir un sujet."); valid = false; }
    if (!message.value.trim()){ showError(message, "Veuillez saisir votre message."); valid = false; }

    if (!valid) return;

    banner.classList.add("show");
    banner.scrollIntoView({ behavior:"smooth", block:"center" });
    form.reset();
    form.classList.remove("was-validated-custom");
    setTimeout(() => banner.classList.remove("show"), 8000);
  });
}

function initFooterYear(){
  const el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
}
