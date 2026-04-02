/**
 * Mock supermarkt data voor BoodschappenBuddy.
 * In productie worden live supermarkt-API's gebruikt.
 */

const supermarkten = [
  {
    id: "albert-heijn",
    naam: "Albert Heijn",
    logo: "AH",
    kleur: "#00AEEF",
    website: "https://www.ah.nl",
    bonusKaart: true,
    beschikbaarIn: ["heel Nederland"],
    actuelAanbiedingen: [
      { product: "Kipfilet 500g", normaalPrijs: 5.99, aanbiedingsPrijs: 4.49, kortingPercentage: 25 },
      { product: "Gouda jong 500g", normaalPrijs: 3.49, aanbiedingsPrijs: 2.49, kortingPercentage: 29 },
      { product: "Pasta 500g", normaalPrijs: 1.29, aanbiedingsPrijs: 0.89, kortingPercentage: 31 }
    ]
  },
  {
    id: "jumbo",
    naam: "Jumbo",
    logo: "JU",
    kleur: "#FFC200",
    website: "https://www.jumbo.com",
    bonusKaart: false,
    beschikbaarIn: ["heel Nederland"],
    actuelAanbiedingen: [
      { product: "Rundergehakt 500g", normaalPrijs: 5.49, aanbiedingsPrijs: 3.99, kortingPercentage: 27 },
      { product: "Broccoli 500g", normaalPrijs: 1.99, aanbiedingsPrijs: 1.29, kortingPercentage: 35 },
      { product: "Rijst 1kg", normaalPrijs: 2.49, aanbiedingsPrijs: 1.79, kortingPercentage: 28 }
    ]
  },
  {
    id: "lidl",
    naam: "Lidl",
    logo: "LI",
    kleur: "#0050AA",
    website: "https://www.lidl.nl",
    bonusKaart: false,
    beschikbaarIn: ["heel Nederland"],
    actuelAanbiedingen: [
      { product: "Zalm 2 stuks", normaalPrijs: 4.99, aanbiedingsPrijs: 3.49, kortingPercentage: 30 },
      { product: "Olijfolie 750ml", normaalPrijs: 5.99, aanbiedingsPrijs: 3.99, kortingPercentage: 33 },
      { product: "Griekse yoghurt 500g", normaalPrijs: 1.99, aanbiedingsPrijs: 1.29, kortingPercentage: 35 }
    ]
  },
  {
    id: "aldi",
    naam: "Aldi",
    logo: "AL",
    kleur: "#CC1719",
    website: "https://www.aldi.nl",
    bonusKaart: false,
    beschikbaarIn: ["heel Nederland"],
    actuelAanbiedingen: [
      { product: "Spaghetti 500g", normaalPrijs: 1.09, aanbiedingsPrijs: 0.69, kortingPercentage: 37 },
      { product: "Tomatensaus 2 stuks", normaalPrijs: 1.98, aanbiedingsPrijs: 1.29, kortingPercentage: 35 },
      { product: "Kipdrumsticks 1kg", normaalPrijs: 4.49, aanbiedingsPrijs: 3.29, kortingPercentage: 27 }
    ]
  },
  {
    id: "plus",
    naam: "Plus",
    logo: "PL",
    kleur: "#E30613",
    website: "https://www.plus.nl",
    bonusKaart: true,
    beschikbaarIn: ["heel Nederland"],
    actuelAanbiedingen: [
      { product: "Mozzarella 2 stuks", normaalPrijs: 2.49, aanbiedingsPrijs: 1.79, kortingPercentage: 28 },
      { product: "Avocado 2 stuks", normaalPrijs: 1.98, aanbiedingsPrijs: 1.29, kortingPercentage: 35 },
      { product: "Kokosmelk 400ml", normaalPrijs: 1.79, aanbiedingsPrijs: 1.19, kortingPercentage: 34 }
    ]
  }
];

module.exports = supermarkten;
