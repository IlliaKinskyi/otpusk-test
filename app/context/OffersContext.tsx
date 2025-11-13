import { createContext, useState } from 'react';
import type { Hotel, PriceOffer } from '~/types/ApiTypes';

export type OfferType = {
  priceOffer: PriceOffer | null;
  hotel: Hotel | null;
};

interface OffersContextType {
  offers: OfferType[];
  setOffers: React.Dispatch<React.SetStateAction<OfferType[]>>;
}

export const OffersContext = createContext<OffersContextType | null>(null);

export const OffersContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [offers, setOffers] = useState<OfferType[]>([]);

  return <OffersContext.Provider value={{ offers, setOffers }}>{children}</OffersContext.Provider>;
};
