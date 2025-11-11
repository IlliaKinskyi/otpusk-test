import { getCountries } from 'assets/js/api';
import { useEffect, useState } from 'react';
import DropdownInput from '~/components/DropdownInput/DropdownInput';
import type { Country } from '~/types/ApiTypes';

export function Welcome() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          )}
        </div>
      </div>
    </main>
  );
}
