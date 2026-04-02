import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { supermarkten as alleSupermarkten } from '../data/recepten';
import './Voorkeuren.css';

const dieetOpties = [
  { waarde: 'vegetarisch', label: '🌿 Vegetarisch' },
  { waarde: 'veganistisch', label: '🌱 Veganistisch' },
  { waarde: 'glutenvrij', label: '🌾 Glutenvrij' },
  { waarde: 'lactosevrij', label: '🥛 Lactosevrij' },
];

export default function Voorkeuren() {
  const { voorkeuren, setVoorkeuren } = useApp();
  const [opgeslagen, setOpgeslagen] = useState(false);

  function toggleDieet(waarde) {
    setVoorkeuren(prev => ({
      ...prev,
      dieet: prev.dieet.includes(waarde)
        ? prev.dieet.filter(d => d !== waarde)
        : [...prev.dieet, waarde],
    }));
  }

  function toggleSupermarkt(naam) {
    setVoorkeuren(prev => ({
      ...prev,
      supermarkten: prev.supermarkten.includes(naam)
        ? prev.supermarkten.filter(s => s !== naam)
        : [...prev.supermarkten, naam],
    }));
  }

  function wijzigPersonen(e) {
    const waarde = Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1));
    setVoorkeuren(prev => ({ ...prev, aantalPersonen: waarde }));
  }

  function opslaan(e) {
    e.preventDefault();
    setOpgeslagen(true);
    setTimeout(() => setOpgeslagen(false), 2000);
  }

  return (
    <div className="container">
      <h1 className="pagina-titel">⚙️ Mijn voorkeuren</h1>
      <p className="pagina-beschrijving">
        Stel je persoonlijke voorkeuren in zodat de app het beste bij jou past.
      </p>

      <form onSubmit={opslaan}>
        {/* Aantal personen */}
        <section className="voorkeur-sectie kaart">
          <h2 className="sectie-titel">👥 Huishouden</h2>
          <div className="formulier-groep">
            <label htmlFor="aantalPersonen">Aantal personen</label>
            <div className="personen-invoer">
              <button
                type="button"
                className="personen-knop"
                onClick={() => setVoorkeuren(p => ({
                  ...p,
                  aantalPersonen: Math.max(1, (p.aantalPersonen || 2) - 1)
                }))}
                aria-label="Minder personen"
              >
                −
              </button>
              <span className="personen-waarde">{voorkeuren.aantalPersonen}</span>
              <button
                type="button"
                className="personen-knop"
                onClick={() => setVoorkeuren(p => ({
                  ...p,
                  aantalPersonen: Math.min(10, (p.aantalPersonen || 2) + 1)
                }))}
                aria-label="Meer personen"
              >
                +
              </button>
            </div>
          </div>
        </section>

        {/* Dieetvoorkeuren */}
        <section className="voorkeur-sectie kaart">
          <h2 className="sectie-titel">🥗 Dieetvoorkeur</h2>
          <p className="sectie-hulptekst">
            Selecteer een of meerdere opties (optioneel).
          </p>
          <div className="chip-groep">
            {dieetOpties.map(opt => (
              <button
                key={opt.waarde}
                type="button"
                className={`chip${voorkeuren.dieet.includes(opt.waarde) ? ' actief' : ''}`}
                onClick={() => toggleDieet(opt.waarde)}
                aria-pressed={voorkeuren.dieet.includes(opt.waarde)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Supermarktvoorkeur */}
        <section className="voorkeur-sectie kaart">
          <h2 className="sectie-titel">🏪 Favoriete supermarkt(en)</h2>
          <p className="sectie-hulptekst">
            Kies één supermarkt voor gemak, of meerdere om maximaal te besparen.
          </p>
          <div className="supermarkt-groep">
            {alleSupermarkten.map(sm => (
              <button
                key={sm.id}
                type="button"
                className={`supermarkt-chip${voorkeuren.supermarkten.includes(sm.naam) ? ' actief' : ''}`}
                style={{ '--sm-kleur': sm.kleur }}
                onClick={() => toggleSupermarkt(sm.naam)}
                aria-pressed={voorkeuren.supermarkten.includes(sm.naam)}
              >
                <span className="sm-logo">{sm.logo}</span>
                <span>{sm.naam}</span>
              </button>
            ))}
          </div>
        </section>

        <button type="submit" className="knop knop-primair knop-volledig opslaan-knop">
          {opgeslagen ? '✓ Opgeslagen!' : 'Voorkeuren opslaan'}
        </button>
      </form>
    </div>
  );
}
