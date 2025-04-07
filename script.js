// Burger-Menü
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Inhalte dynamisch laden
async function loadContent() {
  const response = await fetch('content.json');
  const content = await response.json();
  const page = document.body.dataset.page; // Wird in HTML gesetzt

  // Footer auf allen Seiten
  document.querySelector('footer p').textContent = content.footer.text;

  // Seiten-spezifische Inhalte
  if (page === 'index') {
    document.querySelector('.hero h1').textContent = content.index.hero.title;
    document.querySelector('.hero .btn').textContent = content.index.hero.buttonText;
    document.querySelector('.about h2').textContent = content.index.about.title;
    document.querySelector('.about p').textContent = content.index.about.text;
  } else if (page === 'speisekarte') {
    document.querySelector('.menu-hero h1').textContent = content.speisekarte.hero.title;
    document.querySelector('.menu-hero p').textContent = content.speisekarte.hero.text;

    // Speisekarte dynamisch generieren
    const categories = ['vorspeisen', 'hauptgerichte', 'desserts'];
    categories.forEach(category => {
      const section = document.getElementById(category);
      const data = content.speisekarte.menu[category];
      section.querySelector('h3').textContent = data.title;

      const ul = section.querySelector('.menu-list');
      ul.innerHTML = ''; // Alte Inhalte löschen
      data.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.innerHTML = `
          <div class="item-info">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>
          <div class="item-price">${item.price}</div>
        `;
        ul.appendChild(li);
      });
    });

    // Tab-Logik
    const tabLinks = document.querySelectorAll('.tab-link');
    const menuCategories = document.querySelectorAll('.menu-category');
    tabLinks.forEach(tab => {
      tab.addEventListener('click', function () {
        tabLinks.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(cat => cat.classList.remove('active'));

        this.classList.add('active');
        const category = this.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
      });
    });
  } else if (page === 'kontakt') {
    document.querySelector('.contact-hero h1').textContent = content.kontakt.hero.title;
    document.querySelector('.contact-hero p').textContent = content.kontakt.hero.text;
    document.querySelector('.contact-info h2').textContent = content.kontakt.contact.title;
    document.querySelector('.contact-info p:nth-child(2)').innerHTML = `<strong>Adresse:</strong> ${content.kontakt.contact.address}`;
    document.querySelector('.contact-info p:nth-child(3)').innerHTML = `<strong>Telefon:</strong> <a href="tel:+491234567890">${content.kontakt.contact.phone}</a>`;
    document.querySelector('.contact-info p:nth-child(4)').innerHTML = `<strong>E-Mail:</strong> <a href="mailto:${content.kontakt.contact.email}">${content.kontakt.contact.email}</a>`;
    const ul = document.querySelector('.contact-info ul');
    ul.innerHTML = '';
    content.kontakt.contact.openingHours.forEach(time => {
      const li = document.createElement('li');
      li.textContent = time;
      ul.appendChild(li);
    });
  } else if (page === 'impressum') {
    document.querySelector('.impressum h1').textContent = content.impressum.title;
    document.querySelector('.impressum p:nth-child(2)').innerHTML = `<strong>${content.impressum.company}</strong>`;
    document.querySelector('.impressum p:nth-child(3)').textContent = `Inhaber: ${content.impressum.owner}`;
    document.querySelector('.impressum p:nth-child(4)').textContent = `Adresse: ${content.impressum.address}`;
    document.querySelector('.impressum p:nth-child(5)').innerHTML = `Telefon: <a href="tel:+491234567890">${content.impressum.phone}</a>`;
    document.querySelector('.impressum p:nth-child(6)').innerHTML = `E-Mail: <a href="mailto:${content.impressum.email}">${content.impressum.email}</a>`;
    document.querySelector('.impressum p:nth-child(8)').innerHTML = `Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>${content.impressum.vatId}`;
    document.querySelector('.impressum p:nth-child(10)').textContent = content.impressum.responsible;
    document.querySelector('.impressum p:nth-child(12)').textContent = content.impressum.disclaimer;
  }
}

// Ladeanimation
window.addEventListener('load', function () {
  setTimeout(function () {
    const loadingAnimation = document.getElementById('loading-animation');
    if (loadingAnimation) loadingAnimation.remove();
  }, 2000);
  loadContent(); // Inhalte nach dem Laden einfügen
});