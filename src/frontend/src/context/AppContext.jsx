import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [voorkeuren, setVoorkeuren] = useLocalStorage('voorkeuren', {
    dieet: [],
    supermarkten: ['Albert Heijn'],
    aantalPersonen: 2,
  });

  const [gelikteRecepten, setGelikteRecepten] = useLocalStorage('gelikteRecepten', []);
  const [ongelikteRecepten, setOngelikteRecepten] = useLocalStorage('ongelikteRecepten', []);
  const [weekmenu, setWeekmenu] = useLocalStorage('weekmenu', null);
  const [boodschappenlijst, setBoodschappenlijst] = useLocalStorage('boodschappenlijst', null);

  function likeRecept(id) {
    setGelikteRecepten(prev => prev.includes(id) ? prev : [...prev, id]);
    setOngelikteRecepten(prev => prev.filter(r => r !== id));
  }

  function dislikeRecept(id) {
    setOngelikteRecepten(prev => prev.includes(id) ? prev : [...prev, id]);
    setGelikteRecepten(prev => prev.filter(r => r !== id));
  }

  return (
    <AppContext.Provider value={{
      voorkeuren,
      setVoorkeuren,
      gelikteRecepten,
      ongelikteRecepten,
      likeRecept,
      dislikeRecept,
      weekmenu,
      setWeekmenu,
      boodschappenlijst,
      setBoodschappenlijst,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp moet binnen AppProvider gebruikt worden');
  return context;
}
