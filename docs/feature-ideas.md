# Feature Ideeën

Dit document bevat een overzicht van ideeën voor toekomstige functies van BoodschappenBuddy. Ideeën zijn ingedeeld op categorie en voorzien van een korte beschrijving.

---

## 📅 Planning & Weekmenu

### 1. Tot 2 weken vooruit plannen (kalenderweergave)
**Idee:** Bied de mogelijkheid om tot maximaal 2 weken vooruit maaltijden te plannen.  
**Details:**
- Gebruik een kalenderachtige weergave in plaats van een lange lijst, zodat het overzichtelijk blijft.
- Gebruiker kan per dag een maaltijd inplannen of laten genereren door de app.
- Optie om te schakelen tussen weekweergave en maandweergave.

### 2. Vrije invulvakken per dag (eigen instructies)
**Idee:** Geef gebruikers de mogelijkheid om open dagen zelf in te vullen met eigen instructies of notities.  
**Details:**
- Vrij tekstveld per dag waaraan de gebruiker zelf tekst kan toevoegen (bijv. "Restaurant bezoek", "Restjes opeten").
- De app houdt hier rekening mee bij het genereren van de boodschappenlijst.

---

## 🍽️ Recepten

### 3. Recepten inclusief bereidingsinstructies
**Idee:** Gerechten worden weergegeven samen met een volledig recept voor gebruikers die dit handig vinden.  
**Details:**
- Stap-voor-stap bereidingswijze per gerecht.
- Optioneel tonen (instelbaar per gebruiker).
- Mogelijkheid om recepten op te slaan als favoriet of toe te voegen aan je eigen receptenbank.

---

## 🔄 Geschiedenis & Aanpassing

### 4. Geschiedenis wissen en eigen content toevoegen
**Idee:** Gebruikers kunnen hun geschiedenis wissen en zelf aangepaste content toevoegen.  
**Details:**
- Geschiedenis van eerdere weekmenu's wissen (gedeeltelijk of volledig).
- Eigen gerechten toevoegen aan de receptendatabase.
- Eigen weekschema's opslaan als template voor hergebruik.
- Lijst met "vaak gebruikte gerechten" bijhouden en snel kunnen selecteren.

### 5. Terugkoppeling over gerechten van vorige week
**Idee:** De app vraagt actief om feedback over de gerechten van de afgelopen week.  
**Details:**
- Wekelijkse check-in: "Wat vond je van de maaltijden van afgelopen week?"
- Gebruiker kan per gerecht een beoordeling geven (bijv. sterren of duim omhoog/omlaag).
- De app leert hiervan en past toekomstige suggesties aan op basis van de feedback.

---

## 🤖 AI & Personalisatie

### 6. Eigen suggesties geven die de AI begrijpt
**Idee:** Gebruikers kunnen in vrije tekst aangeven wat ze wel of niet willen die week, en de AI past hierop aan.  
**Details:**
- Voorbeelden: "Deze week geen rijst", "Liever geen vlees", "Iets met kip graag".
- De AI interpreteert de instructie en past het weekmenu en de boodschappenlijst daarop aan.
- Suggesties kunnen tijdelijk (per week) of permanent worden opgeslagen.

---

## 🏪 Supermarkten & Aanbiedingen

### 7. Meerdere supermarkten scannen op aanbiedingen
**Idee:** De app scant de aanbiedingen van alle grote Nederlandse supermarkten en laat de gebruiker kiezen welke supermarkt(en) hij/zij wil bezoeken.  
**Details:**
- Ondersteunde supermarkten: Albert Heijn, Jumbo, Lidl, Aldi, Plus, Dirk, Hoogvliet, Coop, etc.
- Gebruiker geeft aan welke supermarkt(en) hij/zij bereid is te bezoeken.
- De app combineert de beste aanbiedingen van de geselecteerde supermarkten in de boodschappenlijst.
- Toon besparingen per supermarkt en in totaal.

---

## 📱 Privacy & Lokale Opslag

### 8. Alles lokaal opslaan op het apparaat
**Idee:** Alle gebruikersdata blijft lokaal op het apparaat opgeslagen; geen externe database of server-side tracing.  
**Details:**
- Gebruik van lokale opslag (bijv. `localStorage`, `IndexedDB` of AsyncStorage voor mobiel).
- Geen accounts, geen tracking, geen server-side opslag van persoonlijke data.
- Privacy-by-design: de gebruiker behoudt volledige controle over zijn/haar data.
- Optionele exportfunctie zodat gebruikers hun data kunnen back-uppen.

---

## 📌 Prioritering

| # | Functie | Categorie | Prioriteit |
|---|---------|-----------|------------|
| 1 | Kalenderweergave voor 2-weken planning | Planning | Hoog |
| 2 | Vrije invulvakken per dag | Planning | Gemiddeld |
| 3 | Recepten met bereidingsinstructies | Recepten | Hoog |
| 4 | Geschiedenis wissen & eigen content | Geschiedenis | Gemiddeld |
| 5 | Terugkoppeling over gerechten | Feedback | Gemiddeld |
| 6 | Vrije AI-suggesties per week | AI | Hoog |
| 7 | Meerdere supermarkten scannen | Supermarkten | Hoog |
| 8 | Alles lokaal opslaan | Privacy | Hoog |

---

## 💡 Bijdragen

Heb jij een idee voor een nieuwe functie? Open een [GitHub Issue](../../issues) met het label `enhancement` en beschrijf je idee zo concreet mogelijk. Zie ook [CONTRIBUTING.md](../CONTRIBUTING.md) voor de richtlijnen.
