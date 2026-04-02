/**
 * Mock recipe data voor BoodschappenBuddy.
 * In productie wordt dit vervangen door een echte database.
 */

const recepten = [
  {
    id: 1,
    naam: "Stamppot Boerenkool",
    beschrijving: "Klassieke Nederlandse stamppot met boerenkool en rookworst",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Stamppot+Boerenkool",
    categorie: "hoofdgerecht",
    bereidingstijd: 35,
    porties: 4,
    calorieenPerPersoon: 520,
    dieet: [],
    tags: ["vegetarisch-optie", "klassiek", "winters", "goedkoop"],
    ingredienten: [
      { naam: "boerenkool (diepvries)", hoeveelheid: "500g" },
      { naam: "aardappelen", hoeveelheid: "1 kg" },
      { naam: "rookworst", hoeveelheid: "300g" },
      { naam: "melk", hoeveelheid: "100 ml" },
      { naam: "boter", hoeveelheid: "50g" },
      { naam: "zout en peper", hoeveelheid: "naar smaak" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 4.50, aanbieding: false },
      "Jumbo": { prijs: 4.20, aanbieding: true, aanbiedingsPrijs: 3.50 },
      "Lidl": { prijs: 3.80, aanbieding: false },
      "Aldi": { prijs: 3.60, aanbieding: false }
    }
  },
  {
    id: 2,
    naam: "Pasta Bolognese",
    beschrijving: "Hartige Italiaanse pastasaus met gehakt en tomaat",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Pasta+Bolognese",
    categorie: "hoofdgerecht",
    bereidingstijd: 40,
    porties: 4,
    calorieenPerPersoon: 580,
    dieet: [],
    tags: ["pasta", "populair", "gezin"],
    ingredienten: [
      { naam: "spaghetti", hoeveelheid: "400g" },
      { naam: "rundergehakt", hoeveelheid: "400g" },
      { naam: "tomatensaus", hoeveelheid: "400g" },
      { naam: "ui", hoeveelheid: "1 stuks" },
      { naam: "knoflook", hoeveelheid: "2 tenen" },
      { naam: "olijfolie", hoeveelheid: "2 el" },
      { naam: "Parmezaanse kaas", hoeveelheid: "50g" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 6.20, aanbieding: true, aanbiedingsPrijs: 5.00 },
      "Jumbo": { prijs: 5.80, aanbieding: false },
      "Lidl": { prijs: 5.20, aanbieding: false },
      "Aldi": { prijs: 4.90, aanbieding: false }
    }
  },
  {
    id: 3,
    naam: "Nasi Goreng",
    beschrijving: "Klassieke Indische nasi goreng met kipfilet en groenten",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Nasi+Goreng",
    categorie: "hoofdgerecht",
    bereidingstijd: 25,
    porties: 4,
    calorieenPerPersoon: 490,
    dieet: [],
    tags: ["rijst", "aziatisch", "snel"],
    ingredienten: [
      { naam: "rijst", hoeveelheid: "300g" },
      { naam: "kipfilet", hoeveelheid: "300g" },
      { naam: "ei", hoeveelheid: "2 stuks" },
      { naam: "nasi kruidenmix", hoeveelheid: "1 zakje" },
      { naam: "soja saus", hoeveelheid: "2 el" },
      { naam: "ui", hoeveelheid: "1 stuks" },
      { naam: "paprika", hoeveelheid: "1 stuks" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 5.90, aanbieding: false },
      "Jumbo": { prijs: 5.60, aanbieding: true, aanbiedingsPrijs: 4.80 },
      "Lidl": { prijs: 5.00, aanbieding: false },
      "Aldi": { prijs: 4.80, aanbieding: false }
    }
  },
  {
    id: 4,
    naam: "Hutspot",
    beschrijving: "Traditionele hutspot met wortelen, uien en stoofvlees",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Hutspot",
    categorie: "hoofdgerecht",
    bereidingstijd: 60,
    porties: 4,
    calorieenPerPersoon: 540,
    dieet: [],
    tags: ["klassiek", "winters", "stoofpot"],
    ingredienten: [
      { naam: "aardappelen", hoeveelheid: "1 kg" },
      { naam: "wortelen", hoeveelheid: "500g" },
      { naam: "uien", hoeveelheid: "3 stuks" },
      { naam: "stoofvlees", hoeveelheid: "400g" },
      { naam: "runderbouillon", hoeveelheid: "500 ml" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 7.50, aanbieding: false },
      "Jumbo": { prijs: 7.20, aanbieding: false },
      "Lidl": { prijs: 6.50, aanbieding: true, aanbiedingsPrijs: 5.80 },
      "Aldi": { prijs: 6.20, aanbieding: false }
    }
  },
  {
    id: 5,
    naam: "Groene Curry met Tofu",
    beschrijving: "Romige Thaise groene curry met tofu, broccoli en rijst",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Groene+Curry",
    categorie: "hoofdgerecht",
    bereidingstijd: 30,
    porties: 4,
    calorieenPerPersoon: 420,
    dieet: ["vegetarisch", "veganistisch"],
    tags: ["vegetarisch", "aziatisch", "gezond"],
    ingredienten: [
      { naam: "rijst", hoeveelheid: "300g" },
      { naam: "tofu", hoeveelheid: "300g" },
      { naam: "broccoli", hoeveelheid: "300g" },
      { naam: "groene curry pasta", hoeveelheid: "2 el" },
      { naam: "kokosmelk", hoeveelheid: "400 ml" },
      { naam: "soja saus", hoeveelheid: "1 el" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 5.80, aanbieding: true, aanbiedingsPrijs: 4.90 },
      "Jumbo": { prijs: 5.50, aanbieding: false },
      "Lidl": { prijs: 4.90, aanbieding: false },
      "Aldi": { prijs: 4.70, aanbieding: false }
    }
  },
  {
    id: 6,
    naam: "Erwtensoep",
    beschrijving: "Dikke, traditionele Nederlandse erwtensoep met rookworst",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Erwtensoep",
    categorie: "soep",
    bereidingstijd: 90,
    porties: 6,
    calorieenPerPersoon: 380,
    dieet: [],
    tags: ["klassiek", "winters", "soep", "goedkoop"],
    ingredienten: [
      { naam: "spliterwten", hoeveelheid: "500g" },
      { naam: "rookworst", hoeveelheid: "200g" },
      { naam: "spekjes", hoeveelheid: "100g" },
      { naam: "selderij", hoeveelheid: "2 stengels" },
      { naam: "aardappelen", hoeveelheid: "300g" },
      { naam: "prei", hoeveelheid: "1 stuks" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 4.00, aanbieding: false },
      "Jumbo": { prijs: 3.80, aanbieding: false },
      "Lidl": { prijs: 3.20, aanbieding: true, aanbiedingsPrijs: 2.80 },
      "Aldi": { prijs: 3.00, aanbieding: false }
    }
  },
  {
    id: 7,
    naam: "Spaghetti Aglio e Olio",
    beschrijving: "Eenvoudige Italiaanse spaghetti met knoflook, olijfolie en peterselie",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Aglio+e+Olio",
    categorie: "hoofdgerecht",
    bereidingstijd: 20,
    porties: 4,
    calorieenPerPersoon: 420,
    dieet: ["vegetarisch"],
    tags: ["vegetarisch", "pasta", "snel", "goedkoop"],
    ingredienten: [
      { naam: "spaghetti", hoeveelheid: "400g" },
      { naam: "knoflook", hoeveelheid: "6 tenen" },
      { naam: "olijfolie (extra vergine)", hoeveelheid: "80 ml" },
      { naam: "peterselie", hoeveelheid: "1 bosje" },
      { naam: "peper vlokken", hoeveelheid: "1 tl" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 3.50, aanbieding: false },
      "Jumbo": { prijs: 3.20, aanbieding: false },
      "Lidl": { prijs: 2.80, aanbieding: false },
      "Aldi": { prijs: 2.60, aanbieding: true, aanbiedingsPrijs: 2.20 }
    }
  },
  {
    id: 8,
    naam: "Kip Tikka Masala",
    beschrijving: "Romige Indische kip tikka masala met naanbrood en rijst",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Tikka+Masala",
    categorie: "hoofdgerecht",
    bereidingstijd: 45,
    porties: 4,
    calorieenPerPersoon: 560,
    dieet: [],
    tags: ["indisch", "pittig", "populair"],
    ingredienten: [
      { naam: "kipfilet", hoeveelheid: "500g" },
      { naam: "tikka masala kruidenmix", hoeveelheid: "1 zakje" },
      { naam: "yoghurt", hoeveelheid: "150g" },
      { naam: "tomatenpuree", hoeveelheid: "2 el" },
      { naam: "slagroom", hoeveelheid: "100 ml" },
      { naam: "rijst", hoeveelheid: "300g" },
      { naam: "naanbrood", hoeveelheid: "4 stuks" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 8.20, aanbieding: true, aanbiedingsPrijs: 6.80 },
      "Jumbo": { prijs: 7.90, aanbieding: false },
      "Lidl": { prijs: 7.20, aanbieding: false },
      "Aldi": { prijs: 6.90, aanbieding: false }
    }
  },
  {
    id: 9,
    naam: "Ovenschotel Gehakt",
    beschrijving: "Makkelijke ovenschotel met gehakt, aardappelen en kaas",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Ovenschotel",
    categorie: "hoofdgerecht",
    bereidingstijd: 50,
    porties: 4,
    calorieenPerPersoon: 610,
    dieet: [],
    tags: ["oven", "gezin", "makkelijk"],
    ingredienten: [
      { naam: "rundergehakt", hoeveelheid: "400g" },
      { naam: "aardappelen", hoeveelheid: "800g" },
      { naam: "geraspte kaas", hoeveelheid: "150g" },
      { naam: "ui", hoeveelheid: "1 stuks" },
      { naam: "tomatensaus", hoeveelheid: "200g" },
      { naam: "zure room", hoeveelheid: "100g" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 7.80, aanbieding: false },
      "Jumbo": { prijs: 7.50, aanbieding: true, aanbiedingsPrijs: 6.50 },
      "Lidl": { prijs: 6.80, aanbieding: false },
      "Aldi": { prijs: 6.50, aanbieding: false }
    }
  },
  {
    id: 10,
    naam: "Zoete Aardappelsoep",
    beschrijving: "Romige soep van zoete aardappel met kokos en gember",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Zoete+Aardappelsoep",
    categorie: "soep",
    bereidingstijd: 30,
    porties: 4,
    calorieenPerPersoon: 290,
    dieet: ["vegetarisch", "veganistisch"],
    tags: ["vegetarisch", "gezond", "soep", "licht"],
    ingredienten: [
      { naam: "zoete aardappel", hoeveelheid: "600g" },
      { naam: "kokosmelk", hoeveelheid: "400 ml" },
      { naam: "groentebouillon", hoeveelheid: "600 ml" },
      { naam: "verse gember", hoeveelheid: "2 cm" },
      { naam: "knoflook", hoeveelheid: "2 tenen" },
      { naam: "ui", hoeveelheid: "1 stuks" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 4.80, aanbieding: false },
      "Jumbo": { prijs: 4.50, aanbieding: false },
      "Lidl": { prijs: 4.00, aanbieding: true, aanbiedingsPrijs: 3.50 },
      "Aldi": { prijs: 3.80, aanbieding: false }
    }
  },
  {
    id: 11,
    naam: "Pannenkoeken",
    beschrijving: "Luchtige Nederlandse pannenkoeken met stroop of spek",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Pannenkoeken",
    categorie: "hoofdgerecht",
    bereidingstijd: 30,
    porties: 4,
    calorieenPerPersoon: 380,
    dieet: ["vegetarisch"],
    tags: ["vegetarisch", "klassiek", "kinderen", "makkelijk"],
    ingredienten: [
      { naam: "bloem", hoeveelheid: "250g" },
      { naam: "ei", hoeveelheid: "2 stuks" },
      { naam: "melk", hoeveelheid: "500 ml" },
      { naam: "boter", hoeveelheid: "50g" },
      { naam: "zout", hoeveelheid: "snufje" },
      { naam: "stroop", hoeveelheid: "naar smaak" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 3.20, aanbieding: false },
      "Jumbo": { prijs: 3.00, aanbieding: true, aanbiedingsPrijs: 2.50 },
      "Lidl": { prijs: 2.80, aanbieding: false },
      "Aldi": { prijs: 2.60, aanbieding: false }
    }
  },
  {
    id: 12,
    naam: "Zalm met Groenten",
    beschrijving: "Gegrilde zalmfilet met gestoofde groenten en krieltjes",
    afbeelding: "https://placehold.co/400x300/FF6B00/ffffff?text=Zalm+Groenten",
    categorie: "hoofdgerecht",
    bereidingstijd: 30,
    porties: 4,
    calorieenPerPersoon: 450,
    dieet: [],
    tags: ["vis", "gezond", "licht", "eiwitrijk"],
    ingredienten: [
      { naam: "zalmfilet", hoeveelheid: "600g" },
      { naam: "krieltjes", hoeveelheid: "500g" },
      { naam: "courgette", hoeveelheid: "1 stuks" },
      { naam: "paprika", hoeveelheid: "2 stuks" },
      { naam: "citroen", hoeveelheid: "1 stuks" },
      { naam: "olijfolie", hoeveelheid: "2 el" }
    ],
    supermarktPrijzen: {
      "Albert Heijn": { prijs: 10.50, aanbieding: true, aanbiedingsPrijs: 8.90 },
      "Jumbo": { prijs: 9.80, aanbieding: false },
      "Lidl": { prijs: 9.20, aanbieding: false },
      "Aldi": { prijs: 8.80, aanbieding: false }
    }
  }
];

module.exports = recepten;
