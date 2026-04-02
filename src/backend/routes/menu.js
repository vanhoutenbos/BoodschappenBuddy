const express = require('express');
const router = express.Router();
const recepten = require('../data/recipes');

function filterOpDieet(lijst, dieetVoorkeuren) {
  if (!dieetVoorkeuren || dieetVoorkeuren.length === 0) return lijst;
  return lijst.filter(r => dieetVoorkeuren.every(d => r.dieet.includes(d)));
}

/**
 * POST /api/menu
 * Body: { gelikteRecepten: [id, ...], dieetVoorkeuren: [], aantalPersonen: 2 }
 * Genereert een weekmenu van 7 avonden.
 */
router.post('/', (req, res) => {
  const { gelikteRecepten = [], dieetVoorkeuren = [], aantalPersonen = 2 } = req.body;

  const beschikbareRecepten = filterOpDieet(recepten, dieetVoorkeuren);

  // Geef voorkeur aan gelikte recepten
  const gelikte = beschikbareRecepten.filter(r => gelikteRecepten.includes(r.id));
  const overige = beschikbareRecepten.filter(r => !gelikteRecepten.includes(r.id));

  // Shuffle hulpfunctie
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const pool = [...shuffle(gelikte), ...shuffle(overige)];

  const dagen = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];

  const menu = dagen.map((dag, i) => ({
    dag,
    recept: pool[i % pool.length] || null,
    aantalPersonen
  }));

  res.json({ menu, gegenereerOp: new Date().toISOString() });
});

module.exports = router;
