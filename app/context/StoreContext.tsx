import { HotelsContextProvider } from './HotelsContext';
import { OffersContextProvider } from './OffersContext';
import { SearchResultsContextProvider } from './SearchResultsContext';

export const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <OffersContextProvider>
      <HotelsContextProvider>
        <SearchResultsContextProvider>{children}</SearchResultsContextProvider>
      </HotelsContextProvider>
    </OffersContextProvider>
  );
};
