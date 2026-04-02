# Bijdragen aan BoodschappenBuddy

Bedankt voor je interesse om bij te dragen aan BoodschappenBuddy! Dit document
beschrijft hoe je kunt bijdragen aan het open source gedeelte van het project.

## Gedragscode

Wees respectvol en constructief. Bijdragen van iedereen zijn welkom, ongeacht
achtergrond of ervaringsniveau.

## Hoe bij te dragen

### Bugs melden

1. Zoek eerst of het probleem al gemeld is via de
   [Issues](https://github.com/vanhoutenbos/BoodschappenBuddy/issues).
2. Als dat niet het geval is, maak dan een nieuw issue aan met:
   - Een duidelijke titel
   - Stappen om het probleem te reproduceren
   - Verwacht vs. daadwerkelijk gedrag
   - Screenshots indien van toepassing

### Feature requests

Open een issue met het label `enhancement` en beschrijf:
- Wat je wilt toevoegen
- Waarom je denkt dat het waardevol is

### Code bijdragen

1. Fork de repository
2. Maak een nieuwe branch aan: `git checkout -b feature/mijn-feature`
3. Commit je wijzigingen: `git commit -m 'feat: voeg mijn feature toe'`
4. Push naar je fork: `git push origin feature/mijn-feature`
5. Open een Pull Request

### Commit-berichtconventie

We gebruiken [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` – nieuwe functionaliteit
- `fix:` – bugfix
- `docs:` – documentatiewijzigingen
- `style:` – opmaak, geen logicawijzigingen
- `refactor:` – herstructurering zonder feature of bugfix
- `test:` – tests toevoegen of aanpassen
- `chore:` – onderhoud (dependencies bijwerken, etc.)

## Ontwikkelomgeving opzetten

### Vereisten

- Node.js 18+
- npm 9+

### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

### Backend

```bash
cd src/backend
npm install
npm run dev
```

## Wat is open source?

- Algoritmes voor menusamenstelling en boodschappenlijst
- UI-componenten en paginastructuur
- Database-schema's en data-modellen
- Documentatie en user stories

## Wat is proprietary?

- Live supermarkt-API integraties
- Gebruikersaccounts en betaalsysteem
- Gehoste productieomgeving

## Vragen?

Open een issue of neem contact op via de repository.
