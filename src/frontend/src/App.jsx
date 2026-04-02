import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigatie from './components/Navigatie';
import Home from './pages/Home';
import Voorkeuren from './pages/Voorkeuren';
import Ontdekken from './pages/Ontdekken';
import Weekmenu from './pages/Weekmenu';
import Boodschappenlijst from './pages/Boodschappenlijst';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voorkeuren" element={<Voorkeuren />} />
          <Route path="/ontdekken" element={<Ontdekken />} />
          <Route path="/weekmenu" element={<Weekmenu />} />
          <Route path="/boodschappen" element={<Boodschappenlijst />} />
        </Routes>
        <Navigatie />
      </BrowserRouter>
    </AppProvider>
  );
}
