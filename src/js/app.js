/**
 * BoodschappenBuddy - Hoofd App Controller
 * Volledig lokale SPA — geen server of cloud nodig.
 */

// Dagen van de week in het Nederlands
const DAGEN = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];

// Huidige actieve pagina
let huidigePagina = 'swipe';

// Swipe-staat
let huidigeSwipeIndex = 0;
let swipeRecepten = [];

// Touch-geste variabelen
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let isDragging = false;

// ============================================================
// NAVIGATIE
// ============================================================

function navigeerNaar(pagina) {
  huidigePagina = pagina;

  // Verberg alle pagina's
  document.querySelectorAll('.pagina').forEach(p => p.classList.remove('actief'));

  // Toon de gevraagde pagina
  const el = document.getElementById(`pagina-${pagina}`);
  if (el) el.classList.add('actief');

  // Update nav-knoppen
  document.querySelectorAll('.nav-knop').forEach(k => k.classList.remove('actief'));
  const navKnop = document.querySelector(`.nav-knop[data-pagina="${pagina}"]`);
  if (navKnop) navKnop.classList.add('actief');

  // Laad paginaspecifieke inhoud
  switch (pagina) {
    case 'swipe':
      laadSwipePagina();
      break;
    case 'menu':
      laadMenuPagina();
      break;
    case 'lijst':
      laadLijstPagina();
      break;
    case 'instellingen':
      laadInstellingenPagina();
      break;
  }
}

// ============================================================
// ONBOARDING
// ============================================================

function toonOnboarding() {
  document.getElementById('onboarding').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function toonApp() {
  document.getElementById('onboarding').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  navigeerNaar('swipe');
}

function slaOnboardingOp() {
  const naam = document.getElementById('ob-naam').value.trim();
  const personenEl = document.getElementById('ob-personen');
  const personen = parseInt(personenEl.value, 10) || 2;

  const dieetwensenCheckboxes = document.querySelectorAll('.ob-dieet:checked');
  const dieetwensen = Array.from(dieetwensenCheckboxes).map(cb => cb.value);

  const supermarkt = document.getElementById('ob-supermarkt').value;

  if (!naam) {
    toonMelding('Vul je naam in om door te gaan.', 'waarschuwing');
    return;
  }

  slaVoorkeurenOp({ naam, personen, dieetwensen, supermarkt });
  setOnboardingKlaar();
  toonApp();
}

// ============================================================
// SWIPE PAGINA
// ============================================================

function laadSwipePagina() {
  const gelikte = getGeliketeRecepten();
  const afgewezen = getAfgewezenRecepten();
  const bekeken = new Set([...gelikte, ...afgewezen]);

  swipeRecepten = RECIPES.filter(r => !bekeken.has(r.id));
  huidigeSwipeIndex = 0;

  toonVolgendeSwipeKaart();
}

function toonVolgendeSwipeKaart() {
  const container = document.getElementById('swipe-kaart-container');
  if (!container) return;

  if (huidigeSwipeIndex >= swipeRecepten.length) {
    toonSwipeLeeg();
    return;
  }

  const recept = swipeRecepten[huidigeSwipeIndex];
  const gelikte = getGeliketeRecepten();

  container.innerHTML = `
    <div class="swipe-teller">${huidigeSwipeIndex + 1} / ${swipeRecepten.length}</div>
    <div class="swipe-kaart" id="swipe-kaart-huidig">
      <div class="swipe-kaart-emoji">${recept.emoji}</div>
      <div class="swipe-kaart-inhoud">
        <h2 class="swipe-kaart-naam">${recept.naam}</h2>
        <p class="swipe-kaart-beschrijving">${recept.beschrijving}</p>
        <div class="swipe-kaart-meta">
          <span>⏱ ${recept.bereidingstijd} min</span>
          <span>👥 ${recept.personen} personen</span>
          <span>🔪 ${recept.moeilijkheid}</span>
        </div>
        <div class="swipe-kaart-tags">
          ${recept.categorieen.map(c => `<span class="tag">${c}</span>`).join('')}
        </div>
      </div>
      <div class="swipe-feedback-nee" id="swipe-feedback-nee">👎</div>
      <div class="swipe-feedback-ja" id="swipe-feedback-ja">👍</div>
    </div>
    <div class="swipe-knoppen">
      <button class="swipe-knop swipe-knop-nee" onclick="swipeActie('nee')" aria-label="Niet lekker">
        👎
      </button>
      <button class="swipe-knop swipe-knop-skip" onclick="swipeActie('skip')" aria-label="Overslaan">
        ⏭
      </button>
      <button class="swipe-knop swipe-knop-ja" onclick="swipeActie('ja')" aria-label="Lekker!">
        👍
      </button>
    </div>
  `;

  // Touch / muis events instellen voor de kaart
  const kaart = document.getElementById('swipe-kaart-huidig');
  if (kaart) {
    kaart.addEventListener('touchstart', onTouchStart, { passive: true });
    kaart.addEventListener('touchmove', onTouchMove, { passive: false });
    kaart.addEventListener('touchend', onTouchEnd);
    kaart.addEventListener('mousedown', onMouseDown);
  }

  // Gelikte recepten teller updaten in de badge
  const badge = document.getElementById('swipe-badge');
  if (badge) {
    badge.textContent = gelikte.length > 0 ? gelikte.length : '';
    badge.style.display = gelikte.length > 0 ? 'flex' : 'none';
  }
}

function toonSwipeLeeg() {
  const container = document.getElementById('swipe-kaart-container');
  const gelikte = getGeliketeRecepten();

  container.innerHTML = `
    <div class="swipe-leeg">
      <div class="swipe-leeg-emoji">🎉</div>
      <h2>Je hebt alle recepten gezien!</h2>
      <p>Je hebt <strong>${gelikte.length}</strong> recept${gelikte.length === 1 ? '' : 'en'} leuk gevonden.</p>
      ${gelikte.length >= 2
        ? `<button class="knop knop-primair" onclick="genereeerWeekMenuEnNavigeer()">
            📅 Maak weekmenu
          </button>`
        : `<p class="hint">Like nog minstens 2 recepten om een weekmenu te genereren.</p>`
      }
      <button class="knop knop-secundair" onclick="resetSwipesEnHerlaad()">
        🔄 Opnieuw beginnen
      </button>
    </div>
  `;
}

function swipeActie(richting) {
  if (huidigeSwipeIndex >= swipeRecepten.length) return;

  const recept = swipeRecepten[huidigeSwipeIndex];
  const kaart = document.getElementById('swipe-kaart-huidig');

  if (richting === 'ja') {
    likeRecept(recept.id);
    animeerSwipe(kaart, 'rechts');
  } else if (richting === 'nee') {
    dislikeRecept(recept.id);
    animeerSwipe(kaart, 'links');
  } else {
    // skip — gewoon doorgaan
    huidigeSwipeIndex++;
    toonVolgendeSwipeKaart();
    return;
  }

  setTimeout(() => {
    huidigeSwipeIndex++;
    toonVolgendeSwipeKaart();
  }, 300);
}

function animeerSwipe(kaart, richting) {
  if (!kaart) return;
  kaart.classList.add(`swipe-uit-${richting}`);
}

function genereeerWeekMenuEnNavigeer() {
  genereeerWeekMenu();
  navigeerNaar('menu');
}

function resetSwipesEnHerlaad() {
  resetSwipes();
  laadSwipePagina();
}

// Touch/muis events voor swipe-gestures
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchCurrentX = touchStartX;
  isDragging = true;
}

function onTouchMove(e) {
  if (!isDragging) return;
  touchCurrentX = e.touches[0].clientX;
  const dx = touchCurrentX - touchStartX;
  const kaart = document.getElementById('swipe-kaart-huidig');
  if (!kaart) return;

  const rotatie = dx * 0.08;
  kaart.style.transform = `translateX(${dx}px) rotate(${rotatie}deg)`;

  // Toon feedback
  const feedbackJa = document.getElementById('swipe-feedback-ja');
  const feedbackNee = document.getElementById('swipe-feedback-nee');
  if (dx > 30) {
    if (feedbackJa) feedbackJa.style.opacity = Math.min(1, (dx - 30) / 80).toString();
    if (feedbackNee) feedbackNee.style.opacity = '0';
  } else if (dx < -30) {
    if (feedbackNee) feedbackNee.style.opacity = Math.min(1, (-dx - 30) / 80).toString();
    if (feedbackJa) feedbackJa.style.opacity = '0';
  } else {
    if (feedbackJa) feedbackJa.style.opacity = '0';
    if (feedbackNee) feedbackNee.style.opacity = '0';
  }

  if (Math.abs(dx) > 5) {
    e.preventDefault();
  }
}

function onTouchEnd() {
  isDragging = false;
  const dx = touchCurrentX - touchStartX;
  const kaart = document.getElementById('swipe-kaart-huidig');

  if (!kaart) return;

  if (dx > 80) {
    swipeActie('ja');
  } else if (dx < -80) {
    swipeActie('nee');
  } else {
    // Terug naar midden
    kaart.style.transition = 'transform 0.3s ease';
    kaart.style.transform = '';
    const feedbackJa = document.getElementById('swipe-feedback-ja');
    const feedbackNee = document.getElementById('swipe-feedback-nee');
    if (feedbackJa) feedbackJa.style.opacity = '0';
    if (feedbackNee) feedbackNee.style.opacity = '0';
    setTimeout(() => {
      if (kaart) kaart.style.transition = '';
    }, 300);
  }
}

function onMouseDown(e) {
  touchStartX = e.clientX;
  touchCurrentX = e.clientX;
  isDragging = true;

  const onMouseMove = (me) => {
    if (!isDragging) return;
    touchCurrentX = me.clientX;
    const dx = touchCurrentX - touchStartX;
    const kaart = document.getElementById('swipe-kaart-huidig');
    if (!kaart) return;
    const rotatie = dx * 0.08;
    kaart.style.transform = `translateX(${dx}px) rotate(${rotatie}deg)`;

    const feedbackJa = document.getElementById('swipe-feedback-ja');
    const feedbackNee = document.getElementById('swipe-feedback-nee');
    if (dx > 30) {
      if (feedbackJa) feedbackJa.style.opacity = Math.min(1, (dx - 30) / 80).toString();
      if (feedbackNee) feedbackNee.style.opacity = '0';
    } else if (dx < -30) {
      if (feedbackNee) feedbackNee.style.opacity = Math.min(1, (-dx - 30) / 80).toString();
      if (feedbackJa) feedbackJa.style.opacity = '0';
    } else {
      if (feedbackJa) feedbackJa.style.opacity = '0';
      if (feedbackNee) feedbackNee.style.opacity = '0';
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    const dx = touchCurrentX - touchStartX;
    if (dx > 80) {
      swipeActie('ja');
    } else if (dx < -80) {
      swipeActie('nee');
    } else {
      const kaart = document.getElementById('swipe-kaart-huidig');
      if (kaart) {
        kaart.style.transition = 'transform 0.3s ease';
        kaart.style.transform = '';
        const feedbackJa = document.getElementById('swipe-feedback-ja');
        const feedbackNee = document.getElementById('swipe-feedback-nee');
        if (feedbackJa) feedbackJa.style.opacity = '0';
        if (feedbackNee) feedbackNee.style.opacity = '0';
        setTimeout(() => {
          if (kaart) kaart.style.transition = '';
        }, 300);
      }
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// ============================================================
// WEEK MENU PAGINA
// ============================================================

function genereeerWeekMenu() {
  const gelikte = getGeliketeRecepten();

  if (gelikte.length === 0) {
    toonMelding('Like eerst wat recepten om een weekmenu te maken!', 'info');
    return;
  }

  // Fisher-Yates shuffle voor betere willekeurigheid
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Bouw een pool van 7 recepten op en herhaal het shufflen totdat
  // er geen opeenvolgende dezelfde recepten meer zijn (max 50 pogingen).
  let pool;
  let pogingen = 0;

  do {
    let extended = [];
    while (extended.length < DAGEN.length) {
      extended = extended.concat(shuffle(gelikte));
    }
    pool = extended.slice(0, DAGEN.length);
    pogingen++;
  } while (
    pogingen < 50 &&
    gelikte.length > 1 &&
    pool.some((id, i) => i > 0 && id === pool[i - 1])
  );

  const menu = {};
  DAGEN.forEach((dag, i) => {
    menu[dag] = pool[i];
  });

  slaWeekMenuOp(menu);
  genereerBoodschappenlijstVanMenu(menu);
}

function laadMenuPagina() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;

  const menu = getWeekMenu();
  const gelikte = getGeliketeRecepten();

  if (!menu || Object.keys(menu).length === 0) {
    if (gelikte.length >= 2) {
      menuContainer.innerHTML = `
        <div class="leeg-staat">
          <div class="leeg-staat-emoji">📅</div>
          <h2>Nog geen weekmenu</h2>
          <p>Je hebt ${gelikte.length} recepten geliked. Genereer je weekmenu!</p>
          <button class="knop knop-primair" onclick="genereeerEnToonMenu()">
            ✨ Genereer weekmenu
          </button>
        </div>
      `;
    } else {
      menuContainer.innerHTML = `
        <div class="leeg-staat">
          <div class="leeg-staat-emoji">👆</div>
          <h2>Swipe eerst recepten</h2>
          <p>Like minstens 2 recepten via de Ontdek pagina om een weekmenu te maken.</p>
          <button class="knop knop-secundair" onclick="navigeerNaar('swipe')">
            🍽 Recepten ontdekken
          </button>
        </div>
      `;
    }
    return;
  }

  const menuHTML = DAGEN.map(dag => {
    const receptId = menu[dag];
    const recept = getReceptById(receptId);
    if (!recept) return '';

    return `
      <div class="menu-dag-kaart">
        <div class="menu-dag-label">${dag}</div>
        <div class="menu-dag-recept">
          <span class="menu-dag-emoji">${recept.emoji}</span>
          <div class="menu-dag-info">
            <strong>${recept.naam}</strong>
            <small>⏱ ${recept.bereidingstijd} min · 🔪 ${recept.moeilijkheid}</small>
          </div>
        </div>
      </div>
    `;
  }).join('');

  menuContainer.innerHTML = `
    <div class="menu-acties">
      <button class="knop knop-primair" onclick="genereeerEnToonMenu()">
        🔄 Nieuw menu genereren
      </button>
      <button class="knop knop-secundair" onclick="navigeerNaar('lijst')">
        🛒 Naar boodschappenlijst
      </button>
    </div>
    <div class="menu-lijst">
      ${menuHTML}
    </div>
  `;
}

function genereeerEnToonMenu() {
  genereeerWeekMenu();
  laadMenuPagina();
}

// ============================================================
// BOODSCHAPPENLIJST PAGINA
// ============================================================

function genereerBoodschappenlijstVanMenu(menu) {
  const ingredientenMap = new Map();

  Object.values(menu).forEach(receptId => {
    const recept = getReceptById(receptId);
    if (!recept) return;

    recept.ingredienten.forEach(ing => {
      const sleutel = ing.naam.toLowerCase().trim();
      if (!ingredientenMap.has(sleutel)) {
        ingredientenMap.set(sleutel, {
          naam: ing.naam,
          hoeveelheid: ing.hoeveelheid,
          categorie: ing.categorie,
          afgevinkt: false,
        });
      }
    });
  });

  const lijst = Array.from(ingredientenMap.values()).sort((a, b) =>
    a.categorie.localeCompare(b.categorie) || a.naam.localeCompare(b.naam)
  );

  slaBoodschappenlijstOp(lijst);
}

function laadLijstPagina() {
  const container = document.getElementById('lijst-container');
  if (!container) return;

  const lijst = getBoodschappenlijst();

  if (lijst.length === 0) {
    const menu = getWeekMenu();
    if (!menu || Object.keys(menu).length === 0) {
      container.innerHTML = `
        <div class="leeg-staat">
          <div class="leeg-staat-emoji">🛒</div>
          <h2>Nog geen boodschappenlijst</h2>
          <p>Maak eerst een weekmenu om automatisch je boodschappenlijst te vullen.</p>
          <button class="knop knop-secundair" onclick="navigeerNaar('menu')">
            📅 Naar weekmenu
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="leeg-staat">
          <div class="leeg-staat-emoji">🛒</div>
          <h2>Nog geen boodschappenlijst</h2>
          <button class="knop knop-primair" onclick="maakLijstVanMenu()">
            ✨ Maak boodschappenlijst
          </button>
        </div>
      `;
    }
    return;
  }

  // Groepeer per categorie
  const categorieGroepen = {};
  lijst.forEach((item, index) => {
    if (!categorieGroepen[item.categorie]) {
      categorieGroepen[item.categorie] = [];
    }
    categorieGroepen[item.categorie].push({ ...item, index });
  });

  const categorieLabels = {
    groenten: '🥦 Groenten & Fruit',
    vlees: '🥩 Vlees & Vis',
    zuivel: '🧀 Zuivel & Eieren',
    droog: '🌾 Droge Producten',
    conserven: '🥫 Conserven & Blikken',
    kruiden: '🌿 Kruiden & Specerijen',
    brood: '🍞 Brood & Bakkerij',
    divers: '🛍 Diversen',
  };

  const aantalAfgevinkt = lijst.filter(i => i.afgevinkt).length;

  const lijstHTML = Object.entries(categorieGroepen).map(([cat, items]) => `
    <div class="lijst-categorie">
      <h3 class="lijst-categorie-titel">${categorieLabels[cat] || '🛍 ' + cat}</h3>
      ${items.map(item => `
        <label class="lijst-item ${item.afgevinkt ? 'afgevinkt' : ''}">
          <input
            type="checkbox"
            ${item.afgevinkt ? 'checked' : ''}
            onchange="toggleProduct(${item.index}, this.checked)"
          >
          <span class="lijst-item-naam">${item.naam}</span>
          <span class="lijst-item-hoeveelheid">${item.hoeveelheid}</span>
        </label>
      `).join('')}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="lijst-voortgang">
      <div class="voortgang-balk">
        <div class="voortgang-gevuld" style="width: ${lijst.length > 0 ? Math.round(aantalAfgevinkt / lijst.length * 100) : 0}%"></div>
      </div>
      <span class="voortgang-tekst">${aantalAfgevinkt} / ${lijst.length} gehaald</span>
    </div>
    <div class="lijst-acties">
      <button class="knop knop-klein knop-secundair" onclick="resetLijstAfvinkingen()">
        🔄 Reset afvinkingen
      </button>
      <button class="knop knop-klein knop-gevaar" onclick="wrijfLijstLeeg()">
        🗑 Lijst leegmaken
      </button>
    </div>
    <div class="lijst-inhoud">
      ${lijstHTML}
    </div>
  `;
}

function maakLijstVanMenu() {
  const menu = getWeekMenu();
  if (menu) {
    genereerBoodschappenlijstVanMenu(menu);
    laadLijstPagina();
  }
}

function toggleProduct(index, afgevinkt) {
  setProductAfgevinkt(index, afgevinkt);
  // Herlaad om voortgangsbalk te updaten
  laadLijstPagina();
}

function resetLijstAfvinkingen() {
  const lijst = getBoodschappenlijst();
  lijst.forEach(item => {
    item.afgevinkt = false;
  });
  slaBoodschappenlijstOp(lijst);
  laadLijstPagina();
}

function wrijfLijstLeeg() {
  slaBoodschappenlijstOp([]);
  laadLijstPagina();
}

// ============================================================
// INSTELLINGEN PAGINA
// ============================================================

function laadInstellingenPagina() {
  const container = document.getElementById('instellingen-container');
  if (!container) return;

  const voorkeuren = getVoorkeuren();
  const gelikte = getGeliketeRecepten();

  const dieetwensenOpties = [
    { waarde: 'vegetarisch', label: '🥦 Vegetarisch' },
    { waarde: 'vegan', label: '🌱 Vegan' },
    { waarde: 'glutenvrij', label: '🌾 Glutenvrij' },
    { waarde: 'lactosevrij', label: '🥛 Lactosevrij' },
    { waarde: 'halal', label: '☪️ Halal' },
  ];

  container.innerHTML = `
    <div class="instellingen-sectie">
      <h3>👤 Jouw profiel</h3>
      <label class="form-label">
        Naam
        <input type="text" id="inst-naam" class="form-input" value="${voorkeuren.naam || ''}" placeholder="Jouw naam">
      </label>
      <label class="form-label">
        Personen aan tafel
        <select id="inst-personen" class="form-select">
          ${[1,2,3,4,5,6,7,8].map(n =>
            `<option value="${n}" ${voorkeuren.personen === n ? 'selected' : ''}>${n} ${n === 1 ? 'persoon' : 'personen'}</option>`
          ).join('')}
        </select>
      </label>
    </div>
    <div class="instellingen-sectie">
      <h3>🥗 Dieetwensen</h3>
      <div class="checkbox-groep">
        ${dieetwensenOpties.map(opt => `
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="inst-dieet"
              value="${opt.waarde}"
              ${(voorkeuren.dieetwensen || []).includes(opt.waarde) ? 'checked' : ''}
            >
            ${opt.label}
          </label>
        `).join('')}
      </div>
    </div>
    <div class="instellingen-sectie">
      <h3>🛒 Favoriete supermarkt</h3>
      <select id="inst-supermarkt" class="form-select">
        <option value="geen voorkeur" ${voorkeuren.supermarkt === 'geen voorkeur' ? 'selected' : ''}>Geen voorkeur</option>
        <option value="Albert Heijn" ${voorkeuren.supermarkt === 'Albert Heijn' ? 'selected' : ''}>Albert Heijn</option>
        <option value="Jumbo" ${voorkeuren.supermarkt === 'Jumbo' ? 'selected' : ''}>Jumbo</option>
        <option value="Lidl" ${voorkeuren.supermarkt === 'Lidl' ? 'selected' : ''}>Lidl</option>
        <option value="Aldi" ${voorkeuren.supermarkt === 'Aldi' ? 'selected' : ''}>Aldi</option>
        <option value="Plus" ${voorkeuren.supermarkt === 'Plus' ? 'selected' : ''}>Plus</option>
        <option value="Dirk" ${voorkeuren.supermarkt === 'Dirk' ? 'selected' : ''}>Dirk</option>
      </select>
    </div>
    <button class="knop knop-primair knop-vol" onclick="slaInstellingenOp()">
      💾 Opslaan
    </button>
    <div class="instellingen-sectie instellingen-statistieken">
      <h3>📊 Statistieken</h3>
      <p>Gelikte recepten: <strong>${gelikte.length}</strong></p>
      <p>Alle data staat veilig opgeslagen <strong>op dit apparaat</strong> — nergens anders.</p>
    </div>
    <div class="instellingen-sectie instellingen-gevaar">
      <h3>⚠️ Data beheer</h3>
      <button class="knop knop-secundair" onclick="resetSwipesEnHerlaadInstellingen()">
        🔄 Swipes resetten
      </button>
      <button class="knop knop-gevaar" onclick="bevestigResetAlles()">
        🗑 Alles wissen
      </button>
    </div>
  `;
}

function slaInstellingenOp() {
  const naam = document.getElementById('inst-naam').value.trim();
  const personen = parseInt(document.getElementById('inst-personen').value, 10) || 2;
  const supermarkt = document.getElementById('inst-supermarkt').value;
  const dieetwensen = Array.from(document.querySelectorAll('.inst-dieet:checked')).map(cb => cb.value);

  slaVoorkeurenOp({ naam, personen, dieetwensen, supermarkt });
  toonMelding('Instellingen opgeslagen! ✅', 'succes');
}

function resetSwipesEnHerlaadInstellingen() {
  resetSwipes();
  toonMelding('Swipes zijn gereset. Je kunt nu opnieuw beginnen!', 'info');
  laadInstellingenPagina();
}

function bevestigResetAlles() {
  const bevestiging = confirm('Weet je zeker dat je ALLE data wilt wissen? Dit kan niet ongedaan worden gemaakt.');
  if (bevestiging) {
    resetAlles();
    window.location.reload();
  }
}

// ============================================================
// HULPFUNCTIES
// ============================================================

function toonMelding(tekst, type = 'info') {
  const melding = document.createElement('div');
  melding.className = `melding melding-${type}`;
  melding.textContent = tekst;
  document.body.appendChild(melding);

  setTimeout(() => {
    melding.classList.add('melding-zichtbaar');
  }, 10);

  setTimeout(() => {
    melding.classList.remove('melding-zichtbaar');
    setTimeout(() => melding.remove(), 300);
  }, 3000);
}

// ============================================================
// APP INITIALISATIE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Registreer service worker voor offline ondersteuning
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {
      // Service worker registratie is optioneel
    });
  }

  // Navigatieknoppen instellen
  document.querySelectorAll('.nav-knop').forEach(knop => {
    knop.addEventListener('click', () => {
      navigeerNaar(knop.dataset.pagina);
    });
  });

  // Onboarding knop
  const obKnop = document.getElementById('ob-start-knop');
  if (obKnop) {
    obKnop.addEventListener('click', slaOnboardingOp);
  }

  // Check of onboarding al klaar is
  if (isOnboardingKlaar()) {
    toonApp();
  } else {
    toonOnboarding();
  }
});
