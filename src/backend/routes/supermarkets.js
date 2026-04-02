const express = require('express');
const router = express.Router();
const supermarkten = require('../data/supermarkets');

// GET /api/supermarkten – alle supermarkten
router.get('/', (req, res) => {
  res.json(supermarkten);
});

// GET /api/supermarkten/:id – één supermarkt
router.get('/:id', (req, res) => {
  const supermarkt = supermarkten.find(s => s.id === req.params.id);
  if (!supermarkt) {
    return res.status(404).json({ fout: 'Supermarkt niet gevonden' });
  }
  res.json(supermarkt);
});

module.exports = router;
