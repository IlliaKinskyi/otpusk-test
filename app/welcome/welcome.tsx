import { getCountries, searchGeo } from 'assets/js/api';
import { useEffect, useState } from 'react';
import DropdownInput from '~/components/DropdownInput/DropdownInput';
import type { Country, GeoEntity } from '~/types/ApiTypes';

export function Welcome() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<GeoEntity[]>([]);
  const [error, setError] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState<Country | GeoEntity | null>(null);
  const [inputText, setInputText] = useState('');

  async function fetchWithRetry(url: Promise<Response>, retries = 2, delay = 1000) {
    try {
      const response = await url;
      if (!response.ok) {
        // Retry on server errors
        if (retries === 0) setError(`Server error: ${response.status}`);
        throw new Error(`Server error: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying fetch for ${url}. Attempts left: ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        setError('');
        return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
      }
      throw error; // No more retries, re-throw the error
    }
  }

  useEffect(() => {
    fetchWithRetry(getCountries()).then(async (resp) => {
      const data = await resp.json();
      return setCountries(Object.values(data));
    });
  }, []);

  useEffect(() => {
    fetchWithRetry(searchGeo(inputText)).then(async (resp) => {
      const data = await resp.json();
      return setPlaces(Object.values(data));
    });
  }, [inputText]);

  console.log(places);

  return (
    <main>
      <div>
        <header>
          <div>Header</div>
        </header>
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
            />
          )}
        </div>
      </div>
    </main>
  );
}
