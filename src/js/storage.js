/**
 * BoodschappenBuddy - Lokale Opslag
 * Alle gebruikersdata wordt opgeslagen in localStorage.
 * Er wordt geen data naar servers of de cloud verstuurd.
 */

const STORAGE_KEYS = {
  VOORKEUREN: 'bb_voorkeuren',
  GELIKETE_RECEPTEN: 'bb_gelikte_recepten',
  AFGEWEZEN_RECEPTEN: 'bb_afgewezen_recepten',
  WEEK_MENU: 'bb_week_menu',
  BOODSCHAPPENLIJST: 'bb_boodschappenlijst',
  ONBOARDING_KLAAR: 'bb_onboarding_klaar',
};

/**
 * Sla data op in localStorage
 * @param {string} key
 * @param {*} value
 */
function opslaanInLocaal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Opslaan mislukt:', e);
  }
}

/**
 * Laad data uit localStorage
 * @param {string} key
 * @param {*} standaardWaarde - Terugvalwaarde als er niets opgeslagen is
 * @returns {*}
 */
function laadUitLocaal(key, standaardWaarde = null) {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : standaardWaarde;
  } catch (e) {
    console.error('Laden mislukt:', e);
    return standaardWaarde;
  }
}

/**
 * Verwijder data uit localStorage
 * @param {string} key
 */
function verwijderUitLocaal(key) {
  localStorage.removeItem(key);
}

// --- Voorkeuren ---

function getVoorkeuren() {
  return laadUitLocaal(STORAGE_KEYS.VOORKEUREN, {
    naam: '',
    personen: 2,
    dieetwensen: [],
    supermarkt: 'geen voorkeur',
  });
}

function slaVoorkeurenOp(voorkeuren) {
  opslaanInLocaal(STORAGE_KEYS.VOORKEUREN, voorkeuren);
}

// --- Recepten swipen ---

function getGeliketeRecepten() {
  return laadUitLocaal(STORAGE_KEYS.GELIKETE_RECEPTEN, []);
}

function getAfgewezenRecepten() {
  return laadUitLocaal(STORAGE_KEYS.AFGEWEZEN_RECEPTEN, []);
}

function likeRecept(id) {
  const gelikte = getGeliketeRecepten();
  if (!gelikte.includes(id)) {
    gelikte.push(id);
    opslaanInLocaal(STORAGE_KEYS.GELIKETE_RECEPTEN, gelikte);
  }
}

function dislikeRecept(id) {
  const afgewezen = getAfgewezenRecepten();
  if (!afgewezen.includes(id)) {
    afgewezen.push(id);
    opslaanInLocaal(STORAGE_KEYS.AFGEWEZEN_RECEPTEN, afgewezen);
  }
}

function resetSwipes() {
  verwijderUitLocaal(STORAGE_KEYS.GELIKETE_RECEPTEN);
  verwijderUitLocaal(STORAGE_KEYS.AFGEWEZEN_RECEPTEN);
}

// --- Week menu ---

function getWeekMenu() {
  return laadUitLocaal(STORAGE_KEYS.WEEK_MENU, null);
}

function slaWeekMenuOp(menu) {
  opslaanInLocaal(STORAGE_KEYS.WEEK_MENU, menu);
}

// --- Boodschappenlijst ---

function getBoodschappenlijst() {
  return laadUitLocaal(STORAGE_KEYS.BOODSCHAPPENLIJST, []);
}

function slaBoodschappenlijstOp(lijst) {
  opslaanInLocaal(STORAGE_KEYS.BOODSCHAPPENLIJST, lijst);
}

function setProductAfgevinkt(index, afgevinkt) {
  const lijst = getBoodschappenlijst();
  if (lijst[index] !== undefined) {
    lijst[index].afgevinkt = afgevinkt;
    slaBoodschappenlijstOp(lijst);
  }
}

// --- Onboarding ---

function isOnboardingKlaar() {
  return laadUitLocaal(STORAGE_KEYS.ONBOARDING_KLAAR, false);
}

function setOnboardingKlaar() {
  opslaanInLocaal(STORAGE_KEYS.ONBOARDING_KLAAR, true);
}

// --- Alles resetten (voor testen/opnieuw beginnen) ---

function resetAlles() {
  Object.values(STORAGE_KEYS).forEach(key => verwijderUitLocaal(key));
}
