import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Boodschappenlijst.css';

function bouwLijst(weekmenu, gekozenSupermarkten) {
  if (!weekmenu) return null;

  // Verzamel alle ingrediënten
  const ingredientMap = {};
  weekmenu.forEach(({ recept }) => {
    if (!recept) return;
    recept.ingredienten.forEach(ing => {
      if (!ingredientMap[ing.naam]) {
        ingredientMap[ing.naam] = {
          naam: ing.naam,
          hoeveelheid: ing.hoeveelheid,
          recepten: [recept.naam],
          supermarktPrijzen: recept.supermarktPrijzen,
        };
      } else {
        if (!ingredientMap[ing.naam].recepten.includes(recept.naam)) {
          ingredientMap[ing.naam].recepten.push(recept.naam);
        }
      }
    });
  });

  const ingredienten = Object.values(ingredientMap);

  // Per supermarkt of gecombineerd
  if (gekozenSupermarkten.length === 0) {
    return {
      modus: 'gecombineerd',
      items: ingredienten.map(ing => {
        let besteOptie = null;
        let besteprijs = Infinity;
        Object.entries(ing.supermarktPrijzen || {}).forEach(([naam, info]) => {
          const prijs = info.aanbiedingsPrijs ?? info.prijs ?? Infinity;
          if (prijs < besteprijs) {
            besteprijs = prijs;
            besteOptie = { supermarkt: naam, prijs, inAanbieding: info.aanbieding };
          }
        });
        return { ...ing, besteOptie, afgevinkt: false };
      }),
    };
  }

  return {
    modus: 'per-supermarkt',
    supermarkten: gekozenSupermarkten.map(sm => ({
      naam: sm,
      items: ingredienten.map(ing => {
        const info = (ing.supermarktPrijzen || {})[sm];
        return {
          naam: ing.naam,
          hoeveelheid: ing.hoeveelheid,
          prijs: info?.aanbiedingsPrijs ?? info?.prijs ?? null,
          normaalPrijs: info?.prijs ?? null,
          inAanbieding: info?.aanbieding ?? false,
          afgevinkt: false,
        };
      }),
      totaal: ingredienten.reduce((sum, ing) => {
        const info = (ing.supermarktPrijzen || {})[sm];
        return sum + (info?.aanbiedingsPrijs ?? info?.prijs ?? 0);
      }, 0),
    })),
  };
}

export default function Boodschappenlijst() {
  const { weekmenu, voorkeuren } = useApp();
  const [afgevinkt, setAfgevinkt] = useState({});
  const [actiefTabblad, setActiefTabblad] = useState(0);

  const lijstData = useMemo(
    () => bouwLijst(weekmenu, voorkeuren.supermarkten || []),
    [weekmenu, voorkeuren.supermarkten]
  );

  function toggleAfgevinkt(sleutel) {
    setAfgevinkt(prev => ({ ...prev, [sleutel]: !prev[sleutel] }));
  }

  if (!weekmenu) {
    return (
      <div className="container">
        <h1 className="pagina-titel">🛒 Boodschappenlijst</h1>
        <div className="leeg-staat">
          <div className="emoji">🛒</div>
          <h3>Geen weekmenu</h3>
          <p>Genereer eerst een weekmenu om een boodschappenlijst te krijgen.</p>
          <Link to="/weekmenu" className="knop knop-primair" style={{ marginTop: 16 }}>
            📅 Weekmenu genereren
          </Link>
        </div>
      </div>
    );
  }

  const renderGecombineerd = (items) => (
    <ul className="boodschappen-lijst">
      {items.map((item, i) => {
        const sleutel = `g-${i}`;
        return (
          <li
            key={sleutel}
            className={`boodschap-item${afgevinkt[sleutel] ? ' afgevinkt' : ''}`}
            onClick={() => toggleAfgevinkt(sleutel)}
          >
            <span className="check-cirkel" aria-hidden="true">
              {afgevinkt[sleutel] ? '✓' : ''}
            </span>
            <div className="boodschap-info">
              <span className="boodschap-naam">{item.naam}</span>
              <span className="boodschap-hoeveelheid">{item.hoeveelheid}</span>
            </div>
            {item.besteOptie && (
              <div className="boodschap-prijs-info">
                {item.besteOptie.inAanbieding && (
                  <span className="aanbieding-tag">DEAL</span>
                )}
                <span className="boodschap-supermarkt">{item.besteOptie.supermarkt}</span>
                <span className="boodschap-prijs">
                  €{item.besteOptie.prijs.toFixed(2)}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const renderPerSupermarkt = () => {
    if (!lijstData.supermarkten || lijstData.supermarkten.length === 0) return null;
    const sm = lijstData.supermarkten[actiefTabblad];

    return (
      <>
        {/* Tabbladen */}
        {lijstData.supermarkten.length > 1 && (
          <div className="tabbladen">
            {lijstData.supermarkten.map((s, i) => (
              <button
                key={s.naam}
                className={`tabblad${i === actiefTabblad ? ' actief' : ''}`}
                onClick={() => setActiefTabblad(i)}
              >
                {s.naam}
              </button>
            ))}
          </div>
        )}

        <div className="sm-header">
          <span className="sm-naam">{sm.naam}</span>
          <span className="sm-totaal">
            Geschat: €{sm.totaal.toFixed(2)}
          </span>
        </div>

        <ul className="boodschappen-lijst">
          {sm.items.map((item, i) => {
            const sleutel = `${sm.naam}-${i}`;
            return (
              <li
                key={sleutel}
                className={`boodschap-item${afgevinkt[sleutel] ? ' afgevinkt' : ''}`}
                onClick={() => toggleAfgevinkt(sleutel)}
              >
                <span className="check-cirkel" aria-hidden="true">
                  {afgevinkt[sleutel] ? '✓' : ''}
                </span>
                <div className="boodschap-info">
                  <span className="boodschap-naam">{item.naam}</span>
                  <span className="boodschap-hoeveelheid">{item.hoeveelheid}</span>
                </div>
                {item.prijs !== null && (
                  <div className="boodschap-prijs-info">
                    {item.inAanbieding && <span className="aanbieding-tag">DEAL</span>}
                    <span className="boodschap-prijs">€{item.prijs.toFixed(2)}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const aantalAfgevinkt = Object.values(afgevinkt).filter(Boolean).length;
  const totaalItems = lijstData?.modus === 'gecombineerd'
    ? lijstData.items.length
    : (lijstData?.supermarkten?.[actiefTabblad]?.items?.length || 0);

  return (
    <div className="container">
      <h1 className="pagina-titel">🛒 Boodschappenlijst</h1>
      <p className="pagina-beschrijving">
        Op basis van je weekmenu van 7 maaltijden.
      </p>

      {/* Voortgang afvinken */}
      <div className="afvinken-voortgang">
        <span>{aantalAfgevinkt} / {totaalItems} afgevinkt</span>
        {aantalAfgevinkt > 0 && (
          <button
            className="reset-knop"
            onClick={() => setAfgevinkt({})}
          >
            Reset
          </button>
        )}
      </div>

      {lijstData?.modus === 'gecombineerd' && renderGecombineerd(lijstData.items)}
      {lijstData?.modus === 'per-supermarkt' && renderPerSupermarkt()}
    </div>
  );
}
