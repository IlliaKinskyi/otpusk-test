import { getCountries, searchGeo } from 'assets/js/api';
import { useEffect, useState } from 'react';
import DropdownInput from '~/components/DropdownInput/DropdownInput';
import SearchResults from '~/components/SearchResults/SearchResults';
import { SearchResultsContextProvider } from '~/context/SearchResultsContext';
import type { Country, GeoEntity } from '~/types/ApiTypes';
import type { searchResponseType } from '~/types/Types';
import { fetchWithRetry } from '~/utils/utils';

export function Welcome() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<GeoEntity[]>([]);
  const [error, setError] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Country | GeoEntity | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchResponse, setSearchResponse] = useState<searchResponseType>({
    token: '',
    waitUntil: null,
  });

  useEffect(() => {
    fetchWithRetry(getCountries(), setError).then(async (resp) => {
      const data = await resp.json();
      return setCountries(Object.values(data));
    });
  }, []);

  useEffect(() => {
    fetchWithRetry(searchGeo(inputText), setError).then(async (resp) => {
      const data = await resp.json();
      return setPlaces(Object.values(data));
    });
  }, [inputText]);

  return (
    <SearchResultsContextProvider>
      <main>
        <div>
          <div>
            {error.length > 0 ? (
              error
            ) : (
              <DropdownInput
                countries={countries}
                placeholder='Форма пошуку турів'
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                inputText={inputText}
                setInputText={setInputText}
                places={places}
                searchResponse={searchResponse}
                setSearchResponse={setSearchResponse}
              />
            )}

            <SearchResults searchResponse={searchResponse} setSearchResponse={setSearchResponse} />
          </div>
        </div>
      </main>
    </SearchResultsContextProvider>
  );
}
