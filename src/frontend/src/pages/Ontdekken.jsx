import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { recepten as alleRecepten } from '../data/recepten';
import './Ontdekken.css';

const SWIPE_DREMPEL = 80; // pixels

export default function Ontdekken() {
  const { gelikteRecepten, ongelikteRecepten, likeRecept, dislikeRecept, voorkeuren } = useApp();
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [verschuiving, setVerschuiving] = useState(0);
  const [animatie, setAnimatie] = useState(null); // 'links' | 'rechts' | null
  const [toonInfo, setToonInfo] = useState(false);

  const startX = useRef(null);
  const kaartRef = useRef(null);

  // Filter op dieetvoorkeur
  const beschikbareRecepten = alleRecepten.filter(r =>
    voorkeuren.dieet.length === 0 ||
    voorkeuren.dieet.every(d => r.dieet.includes(d))
  );

  const huidigRecept = beschikbareRecepten[huidigeIndex];
  const volgendRecept = beschikbareRecepten[huidigeIndex + 1];
  const klaar = huidigeIndex >= beschikbareRecepten.length;

  // Pointer events voor swipe
  function onPointerDown(e) {
    if (animatie) return;
    startX.current = e.clientX;
    kaartRef.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (startX.current === null || animatie) return;
    const delta = e.clientX - startX.current;
    setVerschuiving(delta);
  }

  function onPointerUp() {
    if (startX.current === null) return;
    const delta = verschuiving;
    startX.current = null;

    if (Math.abs(delta) >= SWIPE_DREMPEL) {
      voltooiSwipe(delta > 0 ? 'rechts' : 'links');
    } else {
      setVerschuiving(0);
    }
  }

  const voltooiSwipe = useCallback((richting) => {
    if (!huidigRecept) return;
    setAnimatie(richting);
    setTimeout(() => {
      if (richting === 'rechts') {
        likeRecept(huidigRecept.id);
      } else {
        dislikeRecept(huidigRecept.id);
      }
      setHuidigeIndex(i => i + 1);
      setVerschuiving(0);
      setAnimatie(null);
      setToonInfo(false);
    }, 350);
  }, [huidigRecept, likeRecept, dislikeRecept]);

  // Draaihoek en positie op basis van verschuiving
  const rotatie = verschuiving * 0.08;
  const opacity = 1 - Math.min(Math.abs(verschuiving) / 200, 0.4);

  const kaartStijl = animatie
    ? {
        transform: `translateX(${animatie === 'rechts' ? '120%' : '-120%'}) rotate(${animatie === 'rechts' ? 20 : -20}deg)`,
        transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: 0,
      }
    : {
        transform: `translateX(${verschuiving}px) rotate(${rotatie}deg)`,
        opacity,
        cursor: verschuiving !== 0 ? 'grabbing' : 'grab',
      };

  const toonLike = verschuiving > 30;
  const toonDislike = verschuiving < -30;

  function opnieuwBeginnen() {
    setHuidigeIndex(0);
    setVerschuiving(0);
    setAnimatie(null);
    setToonInfo(false);
  }

  if (beschikbareRecepten.length === 0) {
    return (
      <div className="container">
        <div className="leeg-staat">
          <div className="emoji">🔍</div>
          <h3>Geen recepten gevonden</h3>
          <p>Pas je dieetvoorkeur aan in de instellingen.</p>
        </div>
      </div>
    );
  }

  if (klaar) {
    return (
      <div className="container">
        <div className="klaar-staat">
          <div className="klaar-emoji">🎉</div>
          <h2>Alle recepten bekeken!</h2>
          <p>
            Je hebt <strong>{gelikteRecepten.length}</strong> recepten lekker gevonden.
          </p>
          <div className="klaar-knoppen">
            <button className="knop knop-primair" onClick={opnieuwBeginnen}>
              🔄 Opnieuw bekijken
            </button>
          </div>

          {gelikteRecepten.length > 0 && (
            <div className="gelikte-lijst">
              <h3>❤️ Jouw favorieten</h3>
              {alleRecepten
                .filter(r => gelikteRecepten.includes(r.id))
                .map(r => (
                  <div key={r.id} className="gelikt-item">
                    <span className="gelikt-emoji">{r.emoji}</span>
                    <span>{r.naam}</span>
                    <button
                      className="gelikt-verwijder"
                      onClick={() => dislikeRecept(r.id)}
                      aria-label={`${r.naam} verwijderen uit favorieten`}
                    >
                      ×
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ontdekken-pagina">
      {/* Voortgang */}
      <div className="container">
        <div className="voortgang-balk">
          <div
            className="voortgang-vulling"
            style={{ width: `${(huidigeIndex / beschikbareRecepten.length) * 100}%` }}
          />
        </div>
        <p className="voortgang-tekst">
          {huidigeIndex + 1} / {beschikbareRecepten.length}
        </p>
      </div>

      {/* Kaart-stapel */}
      <div className="kaart-container">
        {/* Achterste kaart (volgende) */}
        {volgendRecept && (
          <div className="swipe-kaart swipe-kaart-achter">
            <div className="recept-emoji-groot">{volgendRecept.emoji}</div>
          </div>
        )}

        {/* Voorste kaart (huidig) */}
        {huidigRecept && (
          <div
            ref={kaartRef}
            className="swipe-kaart swipe-kaart-voor"
            style={kaartStijl}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="article"
            aria-label={`Recept: ${huidigRecept.naam}`}
          >
            {/* Like/Dislike overlays */}
            {toonLike && (
              <div className="swipe-overlay overlay-like">❤️ Lekker!</div>
            )}
            {toonDislike && (
              <div className="swipe-overlay overlay-dislike">👎 Niet lekker</div>
            )}

            <div className="recept-emoji-groot">{huidigRecept.emoji}</div>
            <div className="recept-info">
              <h2 className="recept-naam">{huidigRecept.naam}</h2>
              <p className="recept-beschrijving">{huidigRecept.beschrijving}</p>

              <div className="recept-meta">
                <span className="badge badge-grijs">⏱ {huidigRecept.bereidingstijd} min</span>
                <span className="badge badge-grijs">🍽 {huidigRecept.porties} p.</span>
                <span className="badge badge-grijs">🔥 {huidigRecept.calorieenPerPersoon} kcal</span>
              </div>

              {huidigRecept.dieet.length > 0 && (
                <div className="recept-dieet">
                  {huidigRecept.dieet.map(d => (
                    <span key={d} className="badge badge-groen">{d}</span>
                  ))}
                </div>
              )}

              <button
                className="info-knop"
                onClick={() => setToonInfo(v => !v)}
                aria-expanded={toonInfo}
              >
                {toonInfo ? '▲ Minder info' : '▼ Ingrediënten'}
              </button>

              {toonInfo && (
                <ul className="ingredienten-lijst">
                  {huidigRecept.ingredienten.map((ing, i) => (
                    <li key={i}>
                      <span className="ing-naam">{ing.naam}</span>
                      <span className="ing-hoeveelheid">{ing.hoeveelheid}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actieknoppen */}
      <div className="swipe-knoppen">
        <button
          className="swipe-knop swipe-knop-dislike"
          onClick={() => voltooiSwipe('links')}
          aria-label="Niet lekker"
          disabled={!!animatie}
        >
          👎
        </button>
        <button
          className="swipe-knop swipe-knop-like"
          onClick={() => voltooiSwipe('rechts')}
          aria-label="Lekker!"
          disabled={!!animatie}
        >
          ❤️
        </button>
      </div>

      <p className="swipe-hint">Swipe rechts als je het lekker vindt</p>
    </div>
  );
}
