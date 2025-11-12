import { createContext, useState } from 'react';
import type { PriceOffer } from '~/types/ApiTypes';

interface SearchResultsContextType {
  searchResults: PriceOffer[] | null;
  setSearchResults: React.Dispatch<React.SetStateAction<PriceOffer[] | null>>;
}

export const SearchResultsContext = createContext<SearchResultsContextType | null>(null);

export const SearchResultsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<PriceOffer[] | null>(null);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
