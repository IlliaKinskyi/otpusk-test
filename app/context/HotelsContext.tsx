import { createContext, useState } from 'react';
import type { Hotel } from '~/types/ApiTypes';

interface HotelsType {
  countryId: number;
  hotels: Hotel[] | null;
}

interface HotelsContextType {
  hotels: HotelsType[];
  setHotels: React.Dispatch<React.SetStateAction<HotelsType[]>>;
}

export const HotelsContext = createContext<HotelsContextType | null>(null);

export const HotelsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hotels, setHotels] = useState<HotelsType[]>([]);

  return <HotelsContext.Provider value={{ hotels, setHotels }}>{children}</HotelsContext.Provider>;
};
