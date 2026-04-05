import { useState, useEffect } from "react";

export default function WeekMenuPlanner() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [premiumInfo, setPremiumInfo] = useState("");
  const SEED_HISTORY = [
    { week: "Week 1", meals: ["Pasta met tuinbonen ricottasaus en spekjes","Wok groente met biefstukpuntjes en noodles","Kip tandoori met naan","Bospeen met krieltjes en kip","Rijst met doperwt peen en chicken popcorn","Frietjes"] },
    { week: "Week 2", meals: ["Kipkerrie","Pasta met saus en kaas","Ovenfrietjes met bospeen en pangasiusfilet","Bami met kipreepjes","Gyros ovenschotel","Pizza"] },
    { week: "Week 3", meals: ["Risotto met paprika erwtjes en kipgehakt","Bospeen met kipburger en krieltjes","Kibbeling met ovenfrietjes en erwtjes","Sushi","Plaatpizza met geitenkaas"] },
    { week: "Week 4", meals: ["Pasta","Kip tandoori","Kipburger met haricot verts en krieltjes","Kipshoarma met pita","Risotto met paprika en kipgehakt","Kippensoep met focaccia"] },
    { week: "Week 5", meals: ["Kipkerrie","Hutspot","Pasta met witte saus en gehaktbal","Bospeen met krieltjes en kipburger","Tartaar met beschuitbol en salade"] }
  ];

  const [mealHistory, setMealHistory] = useState(SEED_HISTORY);

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

  const generate = () => {
    if (selectedDays.length === 0) return;
    setPremiumInfo("🔒 AI-weekmenu is een premium functie en nog niet beschikbaar in de gratis versie. Binnenkort te gebruiken voor betalende gebruikers.");
  };

  const clearHistory = async () => {
    setMealHistory([]);
    try { await window.storage.delete("ah-meal-history"); } catch { /* storage niet beschikbaar */ }
  };

  // ─── Days screen ──────────────────────────────────────────────────────────
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

      {premiumInfo && <p className="wmp-info">{premiumInfo}</p>}

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
