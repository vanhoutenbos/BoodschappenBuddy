import { useState, useEffect } from 'react';

export function useLocalStorage(sleutel, initieleWaarde) {
  const [waarde, setWaarde] = useState(() => {
    try {
      const opgeslagen = localStorage.getItem(sleutel);
      return opgeslagen !== null ? JSON.parse(opgeslagen) : initieleWaarde;
    } catch {
      return initieleWaarde;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(sleutel, JSON.stringify(waarde));
    } catch {
      // localStorage niet beschikbaar
    }
  }, [sleutel, waarde]);

  return [waarde, setWaarde];
}
