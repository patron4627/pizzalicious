// Burger-Menü für Mobilgeräte
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  // Burger-Menü Animation
  burger.classList.toggle('active');
  // Navigationslinks ein-/ausblenden
  navLinks.classList.toggle('active');
});

// Schließen des Menüs, wenn ein Link geklickt wird
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});
// Speiskarte tabs
document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const menuCategories = document.querySelectorAll('.menu-category');

  tabLinks.forEach(tab => {
    tab.addEventListener('click', function () {
      // Entferne die aktive Klasse von allen Tabs und Kategorien
      tabLinks.forEach(t => t.classList.remove('active'));
      menuCategories.forEach(cat => cat.classList.remove('active'));

      // Füge die aktive Klasse zum angeklickten Tab und der entsprechenden Kategorie hinzu
      this.classList.add('active');
      const category = this.getAttribute('data-category');
      document.getElementById(category).classList.add('active');
    });
  });
});

/* ladeanimationsdauer */
window.addEventListener('load', function () {
  // Verzögerung von 3 Sekunden (3000 Millisekunden)
  setTimeout(function () {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.remove(); // Entfernt die Ladeanimation aus dem DOM
  }, 4000); // 3000 Millisekunden = 3 Sekunden
});
