const express = require('express');
const router = express.Router();
const recepten = require('../data/recipes');

// GET /api/recepten – alle recepten
router.get('/', (req, res) => {
  const { dieet, categorie } = req.query;
  let resultaat = recepten;

  if (dieet) {
    const dieetFilters = dieet.split(',');
    resultaat = resultaat.filter(r =>
      dieetFilters.every(d => r.dieet.includes(d))
    );
  }

  if (categorie) {
    resultaat = resultaat.filter(r => r.categorie === categorie);
  }

  res.json(resultaat);
});

// GET /api/recepten/:id – één recept
router.get('/:id', (req, res) => {
  const recept = recepten.find(r => r.id === parseInt(req.params.id));
  if (!recept) {
    return res.status(404).json({ fout: 'Recept niet gevonden' });
  }
  res.json(recept);
});

module.exports = router;
