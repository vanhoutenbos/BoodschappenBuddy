# BoodschappenBuddy

BoodschappenBuddy is een slimme Nederlandse app die je helpt moeiteloos je wekelijkse boodschappen te organiseren. De **gratis versie** werkt volledig lokaal in je browser — geen account, geen cloud, geen internet vereist. Alle data blijft op jouw apparaat.

> **🔒 Privacy first:** De vrije versie van BoodschappenBuddy heeft geen server, geen database en geen AI-koppeling. Alles wat je doet blijft 100% lokaal op jouw apparaat opgeslagen via `localStorage`.

## Probleemstelling

Iedere week besteden veel Nederlanders tijd en energie aan het plannen en doen van hun boodschappen. Daarbij willen ze graag profiteren van aanbiedingen en kortingen, maar overzicht ontbreekt vaak en het zoeken naar deals kost tijd. Sommige mensen willen naar meerdere supermarkten, anderen juist maximaal gemak. Daarnaast is inspiratie voor het avondeten vaak een terugkerend probleem.

## Oplossing

BoodschappenBuddy biedt (gratis, lokale versie):

- **Recepten ontdekken:** Swipe door recepten (links = niet lekker, rechts = lekker) en bouw een persoonlijk smaakprofiel op — opgeslagen in je browser.
- **Automatisch weekmenu:** Gegenereerd op basis van de recepten die je leuk vindt, met slimme afwisseling zodat je niet elke dag hetzelfde eet.
- **Boodschappenlijst:** Automatisch gegenereerd vanuit je weekmenu, gegroepeerd per productcategorie (groenten, vlees, zuivel, etc.) met afvink-functie en voortgangsbalk.
- **Dieetwensen:** Stel in of je vegetarisch, vegan, glutenvrij, lactosevrij of halal eet.
- **Favoriete supermarkt:** Kies je voorkeurswinkel (AH, Jumbo, Lidl, etc.).
- **Offline werkt:** Als Progressive Web App (PWA) werkt de app ook volledig zonder internetverbinding.

### 🔮 Toekomstige betaalde versie (nog niet beschikbaar)

- AI-gestuurde receptsuggesties en menuplanners
- Cross-device synchronisatie (recepten en menu's op alle apparaten)
- Gepersonaliseerde aanbiedingen per supermarkt
- Meer supermarkten integreren
- Sociale features & community recepten

## Voor wie?

Voor iedereen in Nederland die:
- Minder tijd wil besteden aan het plannen van boodschappen en maaltijden
- Makkelijk wil besparen zonder veel moeite
- Nieuwe recepten wil leren kennen
- Waarde hecht aan privacy (geen account, geen tracking)

## De app starten

De app is een statische website — geen installatie of server nodig:

1. Open `src/index.html` in je browser, **of**
2. Gebruik een eenvoudige lokale server:
   ```bash
   cd src
   python3 -m http.server 8080
   # Ga naar http://localhost:8080
   ```
3. Of installeer de app als PWA via de browser (Chrome/Edge: "Installeren" knop in adresbalk).

## Technische opzet

De app is gebouwd als een **Progressive Web App (PWA)** zonder externe afhankelijkheden:

| Bestand | Functie |
|---|---|
| `src/index.html` | Hoofd HTML — alle pagina's/views |
| `src/css/style.css` | Mobiel-first stijlen |
| `src/js/data.js` | 22 Nederlandse recepten met ingredienten |
| `src/js/storage.js` | localStorage wrapper (alle data lokaal) |
| `src/js/app.js` | App-logica, routing, swipe-gestures |
| `src/manifest.json` | PWA manifest voor installatie |
| `src/service-worker.js` | Offline caching |

## Marktonderzoek

**Heb je input? Vul deze enquete in (voorbeelden):**
- Hoe plan je nu je boodschappen?
- Wat vind je het meeste gedoe aan wekelijkse boodschappen?
- Hoeveel supermarkten bezoek je gemiddeld per week?
- Hoe belangrijk zijn aanbiedingen in je keuze voor producten/supermarkt?
- Zou je 1-2 euro per maand willen betalen als je daarmee structureel meer bespaart?
- Welke functie vind je het belangrijkst: aanbiedingen vergelijken, weekmenu's, of boodschappenlijstjes?

_>> Zet hier later een link naar een enquete (bijv. Google Forms of Typeform)._

## Open source vs proprietary

- **Open source:** De basis van de app (intake flows, algoritmes, user stories en het voorstel voor de database) is openbaar op GitHub. Iedereen kan meedenken!
- **Proprietary (toekomst):** De betaalde versie met AI, cross-device sync en aanbiedingen draait op een eigen server.

## MVP (Minimum Viable Product) — GEREED ✅

1. ✅ Gebruiker kan voorkeuren/dieetwensen opgeven
2. ✅ Swipepagina voor recepten (22 recepten)
3. ✅ Automatisch weekmenu genereren (met slimme afwisseling)
4. ✅ Boodschappenlijst per categorie (groenten, vlees, zuivel, etc.)
5. ✅ Simpele webinterface (PWA, mobiel-first)
6. ✅ Volledig lokaal — geen server of account nodig

## Roadmap (na MVP)

- Meer supermarkten integreren
- Gepersonaliseerde aanbiedingen
- Geavanceerde dieet-/afvaldoelen
- Sociale features
- Community recepten
- AI-integratie (betaalde versie)

Een gedetailleerd overzicht van alle feature ideeën is te vinden in [docs/feature-ideas.md](docs/feature-ideas.md).

## Repository-structuur

```
/
├── README.md
├── .gitignore
├── src/
│   ├── index.html          # Hoofd app (SPA)
│   ├── manifest.json       # PWA manifest
│   ├── service-worker.js   # Offline ondersteuning
│   ├── css/
│   │   └── style.css       # Alle stijlen
│   ├── js/
│   │   ├── data.js         # Recepten data
│   │   ├── storage.js      # localStorage beheer
│   │   └── app.js          # App logica
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── docs/
    ├── marktonderzoek.md
    └── user_stories.md
```
