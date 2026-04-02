import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { recepten as alleRecepten } from '../data/recepten';
import './Weekmenu.css';

const DAGEN = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genereerMenu(gelikteIds, dieetVoorkeuren, aantalPersonen) {
  const beschikbaar = alleRecepten.filter(r =>
    dieetVoorkeuren.length === 0 ||
    dieetVoorkeuren.every(d => r.dieet.includes(d))
  );

  const gelikte = beschikbaar.filter(r => gelikteIds.includes(r.id));
  const overige = beschikbaar.filter(r => !gelikteIds.includes(r.id));

  const pool = [...shuffle(gelikte), ...shuffle(overige)];

  return DAGEN.map((dag, i) => ({
    dag,
    recept: pool[i % pool.length] || null,
    aantalPersonen,
  }));
}

export default function Weekmenu() {
  const { gelikteRecepten, weekmenu, setWeekmenu, voorkeuren } = useApp();
  const [isGenereren, setIsGenereren] = useState(false);

  function genereer() {
    setIsGenereren(true);
    // Simuleer een kleine vertraging voor UX
    setTimeout(() => {
      const nieuwMenu = genereerMenu(
        gelikteRecepten,
        voorkeuren.dieet,
        voorkeuren.aantalPersonen
      );
      setWeekmenu(nieuwMenu);
      setIsGenereren(false);
    }, 600);
  }

  function vervangRecept(dagIndex) {
    const beschikbaar = alleRecepten.filter(r =>
      voorkeuren.dieet.length === 0 ||
      voorkeuren.dieet.every(d => r.dieet.includes(d))
    );
    const huidig = weekmenu[dagIndex].recept?.id;
    const kandidaten = beschikbaar.filter(r => r.id !== huidig);
    const nieuw = kandidaten[Math.floor(Math.random() * kandidaten.length)];
    setWeekmenu(prev =>
      prev.map((item, i) =>
        i === dagIndex ? { ...item, recept: nieuw } : item
      )
    );
  }

  const personenPerDag = Math.max(1, voorkeuren.aantalPersonen || 1);
  const totaalKcal = weekmenu
    ? weekmenu.reduce((sum, d) =>
        sum + (d.recept ? d.recept.calorieenPerPersoon * (d.aantalPersonen || personenPerDag) : 0), 0
      )
    : 0;

  return (
    <div className="container">
      <h1 className="pagina-titel">📅 Weekmenu</h1>
      <p className="pagina-beschrijving">
        Automatisch gegenereerd op basis van jouw smaakprofiel.
        {gelikteRecepten.length === 0 && (
          <> <Link to="/ontdekken" className="inline-link">Ontdek eerst wat je lekker vindt →</Link></>
        )}
      </p>

      {/* Genereer-knop */}
      <button
        className="knop knop-primair knop-volledig genereer-knop"
        onClick={genereer}
        disabled={isGenereren}
      >
        {isGenereren ? (
          <><span className="spinner-klein" /> Genereren...</>
        ) : weekmenu ? (
          '🔄 Nieuw weekmenu genereren'
        ) : (
          '✨ Weekmenu genereren'
        )}
      </button>

      {/* Menu weergave */}
      {weekmenu && !isGenereren && (
        <>
          <div className="menu-samenvatting">
            <span>7 maaltijden</span>
            <span>·</span>
            <span>±{Math.round(totaalKcal / 7 / personenPerDag)} kcal/p per dag</span>
          </div>

          <div className="menu-lijst">
            {weekmenu.map((item, i) => (
              <div key={i} className="menu-item kaart">
                <div className="menu-dag">
                  <span className="dag-naam">{item.dag}</span>
                </div>
                {item.recept ? (
                  <div className="menu-recept">
                    <span className="menu-emoji">{item.recept.emoji}</span>
                    <div className="menu-recept-info">
                      <span className="menu-recept-naam">{item.recept.naam}</span>
                      <span className="menu-recept-meta">
                        ⏱ {item.recept.bereidingstijd} min · 🔥 {item.recept.calorieenPerPersoon} kcal/p
                      </span>
                    </div>
                    <button
                      className="vervang-knop"
                      onClick={() => vervangRecept(i)}
                      aria-label={`Vervang recept voor ${item.dag}`}
                      title="Ander recept"
                    >
                      🔄
                    </button>
                  </div>
                ) : (
                  <div className="menu-recept menu-leeg">
                    <span className="grijs-tekst">Geen recept beschikbaar</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link to="/boodschappen" className="knop knop-secundair knop-volledig boodschappen-knop">
            🛒 Boodschappenlijst bekijken →
          </Link>
        </>
      )}

      {!weekmenu && !isGenereren && (
        <div className="leeg-staat">
          <div className="emoji">📅</div>
          <h3>Nog geen weekmenu</h3>
          <p>Klik op de knop hierboven om een weekmenu te genereren.</p>
        </div>
      )}

      {isGenereren && (
        <div className="laad-container">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
}
