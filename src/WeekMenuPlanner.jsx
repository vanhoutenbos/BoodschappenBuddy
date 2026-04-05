import { useState, useEffect } from "react";

export default function WeekMenuPlanner() {
  const [screen, setScreen] = useState("days");
  const [selectedDays, setSelectedDays] = useState([]);
  const [weekMenu, setWeekMenu] = useState(null);
  const [bonusOffers, setBonusOffers] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState("");
  const SEED_HISTORY = [
    { week: "Week 1", meals: ["Pasta met tuinbonen ricottasaus en spekjes","Wok groente met biefstukpuntjes en noodles","Kip tandoori met naan","Bospeen met krieltjes en kip","Rijst met doperwt peen en chicken popcorn","Frietjes"] },
    { week: "Week 2", meals: ["Kipkerrie","Pasta met saus en kaas","Ovenfrietjes met bospeen en pangasiusfilet","Bami met kipreepjes","Gyros ovenschotel","Pizza"] },
    { week: "Week 3", meals: ["Risotto met paprika erwtjes en kipgehakt","Bospeen met kipburger en krieltjes","Kibbeling met ovenfrietjes en erwtjes","Sushi","Plaatpizza met geitenkaas"] },
    { week: "Week 4", meals: ["Pasta","Kip tandoori","Kipburger met haricot verts en krieltjes","Kipshoarma met pita","Risotto met paprika en kipgehakt","Kippensoep met focaccia"] },
    { week: "Week 5", meals: ["Kipkerrie","Hutspot","Pasta met witte saus en gehaktbal","Bospeen met krieltjes en kipburger","Tartaar met beschuitbol en salade"] }
  ];

  const [mealHistory, setMealHistory] = useState(SEED_HISTORY);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("ah-meal-history");
        if (r) setMealHistory(JSON.parse(r.value));
      } catch { /* storage niet beschikbaar, seed history blijft actief */ }
    })();
  }, []);

  const getNextWeek = () => {
    const today = new Date();
    const dow = today.getDay();
    const diff = dow === 0 ? 1 : 8 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    const names = ["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag","Zondag"];
    return names.map((name, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return { name, date: d.toLocaleDateString("nl-NL", { day: "numeric", month: "short" }) };
    });
  };

  const nextWeek = getNextWeek();
  const toggle = (name) =>
    setSelectedDays((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const generate = async () => {
    if (selectedDays.length === 0) return;
    setScreen("loading");
    setError("");

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        setError("API-sleutel ontbreekt. Stel VITE_ANTHROPIC_API_KEY in en herlaad de pagina.");
        setScreen("days");
        return;
      }
      const anthropicHeaders = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      };

      // Step 1: AH Bonus ophalen
      setLoadingMsg("AH bonus aanbiedingen ophalen voor volgende week...");

      const bonusRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { ...anthropicHeaders, "anthropic-beta": "web_search_20250305" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Zoek de Albert Heijn bonus aanbiedingen voor de week van ${nextWeek[0].date} tot ${nextWeek[6].date}. Focus op hoofd-ingrediënten voor avondmaaltijden: vlees, vis, groente, zuivel, pasta. Geef max 12 relevante producten. Antwoord ALLEEN als JSON zonder markdown: [{"product":"naam","korting":"bijv 1+1 gratis"}]`
          }]
        })
      });

      if (!bonusRes.ok) {
        const errData = await bonusRes.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${bonusRes.status}`);
      }

      const bonusData = await bonusRes.json();
      const bonusText = (bonusData.content ?? []).map((b) => b.text || "").join("");
      let bonus = [];
      try {
        const m = bonusText.match(/\[[\s\S]*?\]/);
        if (m) bonus = JSON.parse(m[0]);
      } catch { /* ongeldige JSON, lege lijst blijft */ }
      setBonusOffers(bonus);

      // Step 2: Weekmenu genereren
      setLoadingMsg("Weekmenu samenstellen op basis van de bonus...");

      const recentDishes = mealHistory
        .flatMap((w) => w.meals)
        .slice(-21)
        .join(", ");

      const menuRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: anthropicHeaders,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Maak een weekmenu voor deze avonden: ${selectedDays.join(", ")}.

AH bonus volgende week:
${bonus.length > 0 ? bonus.map((b) => `- ${b.product} (${b.korting})`).join("\n") : "Geen bonusdata, gebruik gangbare AH producten."}

Regels:
- Typische Nederlandse gezinsgerechten (pasta bolognese, lasagne, nasi, bami, spaghetti, gehaktballen, kipfilet, vissticks met puree, wrap, wokschotel, omelet, pannenkoeken, groentesoep met brood, etc.)
- Gezin: 2 volwassenen + peuter 2-4 jaar (niet te pittig, geen noten)
- Max 45 minuten bereidingstijd
- NOOIT hetzelfde gerecht op opeenvolgende dagen (bijv. niet 2x pasta achter elkaar)
- Hetzelfde gerecht mag wel 2x per week als er minstens 1 dag tussen zit
- Gebruik bonus producten waar logisch
- Varieer de basis: mix van pasta, rijst, aardappel, brood/wrap
${recentDishes ? `- Vermijd recent gegeten gerechten: ${recentDishes}` : ""}

Antwoord ALLEEN als JSON zonder markdown of uitleg:
[{"dag":"Maandag","gerecht":"Spaghetti bolognese","basis":"pasta","bonus_gebruikt":"Rundergehakt 1+1 gratis","minuten":35}]`
          }]
        })
      });

      if (!menuRes.ok) {
        const errData = await menuRes.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${menuRes.status}`);
      }

      const menuData = await menuRes.json();
      const menuText = (menuData.content ?? []).map((b) => b.text || "").join("");
      let meals = [];
      try {
        const clean = menuText.replace(/```[\w]*\n?/g, "").trim();
        const m = clean.match(/\[[\s\S]*\]/);
        if (m) meals = JSON.parse(m[0]);
      } catch { /* ongeldige JSON, lege lijst blijft */ }

      setWeekMenu(meals);

      // Geschiedenis opslaan (zelfde week = vervangen, anders toevoegen)
      const weekKey = nextWeek[0].date;
      const existing = mealHistory.findIndex((w) => w.week === weekKey);
      let newHistory;
      if (existing >= 0) {
        newHistory = [...mealHistory];
        newHistory[existing] = { week: weekKey, meals: meals.map((m) => m.gerecht) };
      } else {
        newHistory = [...mealHistory, { week: weekKey, meals: meals.map((m) => m.gerecht) }].slice(-6);
      }
      setMealHistory(newHistory);
      try { await window.storage.set("ah-meal-history", JSON.stringify(newHistory)); } catch { /* storage niet beschikbaar */ }

      setScreen("menu");
    } catch {
      setError("Er ging iets mis. Controleer je verbinding en probeer opnieuw.");
      setScreen("days");
    }
  };

  const getBasis = (basis) => {
    const b = (basis || "").toLowerCase();
    if (b.includes("pasta") || b.includes("spaghetti") || b.includes("lasagne")) return { bg: "#fff0eb", accent: "#c94820", pill: "#ffe4d8" };
    if (b.includes("rijst") || b.includes("nasi") || b.includes("bami") || b.includes("wok")) return { bg: "#fffae6", accent: "#b07800", pill: "#fff0b8" };
    if (b.includes("aardappel") || b.includes("puree")) return { bg: "#f0faea", accent: "#3a8020", pill: "#d4f0c4" };
    if (b.includes("brood") || b.includes("wrap") || b.includes("pannenkoek")) return { bg: "#f8f4ee", accent: "#8a6030", pill: "#ecddc8" };
    return { bg: "#f0f0fa", accent: "#4040a0", pill: "#dcdcf8" };
  };

  const clearHistory = async () => {
    setMealHistory([]);
    try { await window.storage.delete("ah-meal-history"); } catch { /* storage niet beschikbaar */ }
  };

  // ─── Loading screen ───────────────────────────────────────────────────────
  if (screen === "loading") {
    return (
      <div className="wmp-loading">
        <div className="wmp-spinner" />
        <p className="wmp-loading-msg">{loadingMsg}</p>
      </div>
    );
  }

  // ─── Menu screen ──────────────────────────────────────────────────────────
  if (screen === "menu") {
    return (
      <div className="wmp-container">
        <header className="wmp-header">
          <span className="wmp-logo">🗓️</span>
          <div>
            <h1 className="wmp-title">Weekmenu volgende week</h1>
            <p className="wmp-subtitle">
              {nextWeek[0].date} – {nextWeek[6].date}
            </p>
          </div>
        </header>

        {bonusOffers.length > 0 && (
          <section className="wmp-bonus-section">
            <h2 className="wmp-section-title">🏷️ AH Bonus gebruikt</h2>
            <div className="wmp-bonus-list">
              {bonusOffers.map((b, i) => (
                <span key={i} className="wmp-bonus-pill">
                  {b.product} – {b.korting}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="wmp-meals">
          {(weekMenu || []).map((item) => {
            const colors = getBasis(item.basis);
            return (
              <div
                key={item.dag}
                className="wmp-meal-card"
                style={{ background: colors.bg, borderLeftColor: colors.accent }}
              >
                <div className="wmp-meal-header">
                  <strong className="wmp-meal-day">{item.dag}</strong>
                  {item.minuten && (
                    <span className="wmp-meal-time">⏱ {item.minuten} min</span>
                  )}
                </div>
                <p className="wmp-meal-name">{item.gerecht}</p>
                <div className="wmp-meal-tags">
                  {item.basis && (
                    <span
                      className="wmp-meal-basis"
                      style={{ background: colors.pill, color: colors.accent }}
                    >
                      {item.basis}
                    </span>
                  )}
                  {item.bonus_gebruikt && item.bonus_gebruikt !== "-" && (
                    <span className="wmp-meal-bonus">🏷️ {item.bonus_gebruikt}</span>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <button
          className="wmp-btn wmp-btn-secondary"
          onClick={() => { setScreen("days"); setSelectedDays([]); }}
        >
          ↩ Opnieuw plannen
        </button>
      </div>
    );
  }

  // ─── Days screen (default) ────────────────────────────────────────────────
  return (
    <div className="wmp-container">
      <header className="wmp-header">
        <span className="wmp-logo">🍽️</span>
        <div>
          <h1 className="wmp-title">WeekMenu Planner</h1>
          <p className="wmp-subtitle">
            Volgende week: {nextWeek[0].date} – {nextWeek[6].date}
          </p>
        </div>
      </header>

      <section className="wmp-days-section">
        <p className="wmp-section-label">Kies de avonden om te plannen:</p>
        <div className="wmp-days-grid">
          {nextWeek.map((day) => {
            const active = selectedDays.includes(day.name);
            return (
              <button
                key={day.name}
                className={`wmp-day-btn${active ? " wmp-day-btn--active" : ""}`}
                onClick={() => toggle(day.name)}
              >
                <span className="wmp-day-name">{day.name}</span>
                <span className="wmp-day-date">{day.date}</span>
              </button>
            );
          })}
        </div>
      </section>

      {error && <p className="wmp-error">{error}</p>}

      <button
        className="wmp-btn wmp-btn-primary"
        onClick={generate}
        disabled={selectedDays.length === 0}
      >
        {selectedDays.length === 0
          ? "Selecteer avonden om te starten"
          : `Genereer weekmenu (${selectedDays.length} avond${selectedDays.length !== 1 ? "en" : ""})`}
      </button>

      {mealHistory.length > 0 && (
        <section className="wmp-history">
          <h2 className="wmp-section-title">📋 Recente maaltijden</h2>
          {mealHistory
            .slice(-3)
            .reverse()
            .map((week, i) => (
              <details key={i} className="wmp-history-week">
                <summary className="wmp-history-week-title">{week.week}</summary>
                <ul className="wmp-history-meals">
                  {week.meals.map((meal, j) => (
                    <li key={j}>{meal}</li>
                  ))}
                </ul>
              </details>
            ))}
          <button className="wmp-btn wmp-btn-ghost" onClick={clearHistory}>
            🗑️ Geschiedenis wissen
          </button>
        </section>
      )}
    </div>
  );
}
