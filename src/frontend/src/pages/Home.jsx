import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';

export default function Home() {
  const { gelikteRecepten, weekmenu } = useApp();

  return (
    <div className="home-pagina">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-emoji">🛒</div>
        <h1 className="home-titel">BoodschappenBuddy</h1>
        <p className="home-ondertitel">
          Slim boodschappen doen en besparen via de beste aanbiedingen
        </p>
      </div>

      {/* Snelkoppelingen */}
      <div className="container">
        <div className="home-acties">
          <Link to="/ontdekken" className="actie-kaart actie-ontdekken">
            <span className="actie-emoji">🔍</span>
            <div>
              <h3>Recepten ontdekken</h3>
              <p>Swipe en vind jouw favorieten</p>
            </div>
            <span className="actie-pijl">→</span>
          </Link>

          <Link to="/weekmenu" className="actie-kaart actie-weekmenu">
            <span className="actie-emoji">📅</span>
            <div>
              <h3>Weekmenu genereren</h3>
              <p>7 dagen eten, automatisch gepland</p>
            </div>
            <span className="actie-pijl">→</span>
          </Link>

          <Link to="/boodschappen" className="actie-kaart actie-boodschappen">
            <span className="actie-emoji">🛍️</span>
            <div>
              <h3>Boodschappenlijst</h3>
              <p>Per supermarkt met aanbiedingen</p>
            </div>
            <span className="actie-pijl">→</span>
          </Link>

          <Link to="/voorkeuren" className="actie-kaart actie-voorkeuren">
            <span className="actie-emoji">⚙️</span>
            <div>
              <h3>Mijn voorkeuren</h3>
              <p>Dieet, supermarkten en meer</p>
            </div>
            <span className="actie-pijl">→</span>
          </Link>
        </div>

        {/* Statistieken */}
        <div className="home-stats kaart">
          <div className="stat">
            <span className="stat-waarde">{gelikteRecepten.length}</span>
            <span className="stat-label">Gelikte recepten</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-waarde">{weekmenu ? '✓' : '–'}</span>
            <span className="stat-label">Weekmenu klaar</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-waarde">5</span>
            <span className="stat-label">Supermarkten</span>
          </div>
        </div>

        {/* Over de app */}
        <div className="kaart home-info">
          <h2>💡 Hoe werkt het?</h2>
          <ol className="stappen">
            <li>
              <strong>Stel je voorkeuren in</strong> – dieetwensen, hoeveel personen
              en favoriete supermarkt(en).
            </li>
            <li>
              <strong>Ontdek recepten</strong> – swipe rechts als je iets lekker vindt,
              links als je het niet lust.
            </li>
            <li>
              <strong>Genereer een weekmenu</strong> – 7 avondmaaltijden op basis van
              jouw smaakprofiel.
            </li>
            <li>
              <strong>Bekijk de boodschappenlijst</strong> – inclusief actuele
              aanbiedingen per supermarkt.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
