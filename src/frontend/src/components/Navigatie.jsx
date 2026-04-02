import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigatie.css';

const navItems = [
  { pad: '/', label: 'Home', emoji: '🏠' },
  { pad: '/ontdekken', label: 'Ontdekken', emoji: '🔍' },
  { pad: '/weekmenu', label: 'Weekmenu', emoji: '📅' },
  { pad: '/boodschappen', label: 'Lijst', emoji: '🛒' },
  { pad: '/voorkeuren', label: 'Profiel', emoji: '⚙️' },
];

export default function Navigatie() {
  const locatie = useLocation();

  return (
    <nav className="navigatie" role="navigation" aria-label="Hoofdnavigatie">
      {navItems.map(({ pad, label, emoji }) => (
        <NavLink
          key={pad}
          to={pad}
          end={pad === '/'}
          className={({ isActive }) =>
            `nav-item${isActive ? ' actief' : ''}`
          }
          aria-current={locatie.pathname === pad ? 'page' : undefined}
        >
          <span className="nav-emoji" aria-hidden="true">{emoji}</span>
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
