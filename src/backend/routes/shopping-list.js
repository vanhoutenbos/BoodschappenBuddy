const express = require('express');
const router = express.Router();

/**
 * POST /api/boodschappenlijst
 * Body: { menu: [{recept: {...}, aantalPersonen: 2}, ...], supermarkten: ['Albert Heijn', 'Jumbo'] }
 * Genereert een boodschappenlijst gegroepeerd per supermarkt.
 */
router.post('/', (req, res) => {
  const { menu = [], supermarkten = [] } = req.body;

  // Verzamel alle ingrediënten van het weekmenu
  const alleIngredientenMap = {};

  menu.forEach(({ recept, aantalPersonen }) => {
    if (!recept) return;
    const factor = (aantalPersonen || 2) / (recept.porties || 4);

    recept.ingredienten.forEach(ing => {
      if (alleIngredientenMap[ing.naam]) {
        alleIngredientenMap[ing.naam].recepten.push(recept.naam);
      } else {
        alleIngredientenMap[ing.naam] = {
          naam: ing.naam,
          hoeveelheid: ing.hoeveelheid,
          recepten: [recept.naam],
          supermarktPrijzen: recept.supermarktPrijzen || {}
        };
      }
    });
  });

  const alleIngredienten = Object.values(alleIngredientenMap);

  // Als specifieke supermarkten gevraagd, splits per supermarkt
  if (supermarkten.length > 0) {
    const perSupermarkt = {};

    supermarkten.forEach(sNaam => {
      perSupermarkt[sNaam] = {
        supermarkt: sNaam,
        items: alleIngredienten.map(ing => {
          const prijsInfo = ing.supermarktPrijzen[sNaam];
          return {
            naam: ing.naam,
            hoeveelheid: ing.hoeveelheid,
            prijs: prijsInfo?.aanbiedingsPrijs || prijsInfo?.prijs || null,
            inAanbieding: prijsInfo?.aanbieding || false,
            normaalPrijs: prijsInfo?.prijs || null,
            afgevinkt: false
          };
        }),
        totaalGeschat: alleIngredienten.reduce((sum, ing) => {
          const prijsInfo = ing.supermarktPrijzen[sNaam];
          return sum + (prijsInfo?.aanbiedingsPrijs ?? prijsInfo?.prijs ?? 0);
        }, 0)
      };
    });

    return res.json({ perSupermarkt, aantalRecepten: menu.length });
  }

  // Goedkoopste optie per product
  const gecombineerdeLijst = alleIngredienten.map(ing => {
    let besteOptie = null;
    let besteprijs = Infinity;

    Object.entries(ing.supermarktPrijzen).forEach(([sNaam, info]) => {
      const prijs = info.aanbiedingsPrijs || info.prijs || 0;
      if (prijs < besteprijs) {
        besteprijs = prijs;
        besteOptie = { supermarkt: sNaam, prijs, inAanbieding: info.aanbieding };
      }
    });

    return {
      naam: ing.naam,
      hoeveelheid: ing.hoeveelheid,
      besteOptie,
      afgevinkt: false
    };
  });

  res.json({ gecombineerdeLijst, aantalRecepten: menu.length });
});

module.exports = router;
