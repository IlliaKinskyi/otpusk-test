import React, { useCallback, useContext, useRef, useState, type FormEvent } from 'react';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import type { Country, GeoEntity } from '~/types/ApiTypes';
import CloseIconSvg from './assets/CloseIconSvg';
import CityIconSvg from './assets/CityIconSvg';
import { getHotels, startSearchPrices } from 'assets/js/api';
import type { searchResponseType } from '~/types/Types';
import { fetchWithRetry } from '~/utils/utils';
import TextError from '../TextError/TextError';
import Spinner from '../Spinner/Spinner';
import { HotelsContext } from '~/context/HotelsContext';
import { OffersContext } from '~/context/OffersContext';

function DropdownInput({
  countries,
  placeholder,
  selectedPlaces,
  setSelectedPlaces,
  inputText,
  setInputText,
  places,
  searchResponse,
  setSearchResponse,
}: {
  countries: Country[];
  placeholder?: string;
  selectedPlaces: GeoEntity | null;
  setSelectedPlaces: React.Dispatch<React.SetStateAction<GeoEntity | null>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  places: GeoEntity[];
  searchResponse: searchResponseType;
  setSearchResponse: React.Dispatch<React.SetStateAction<searchResponseType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(HotelsContext);
  const offersContext = useContext(OffersContext);

  if (!context || !offersContext) {
    throw new Error(
      `Context must be used within a ${!context ? 'HotelsContext' : 'OffersContext'}`,
    );
  }

  const { offers, setOffers } = offersContext;
  const { hotels, setHotels } = context;

  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);
  });

  const handleSelect = (country: GeoEntity) => {
    setSelectedPlaces(country);
    setInputText(country.name);
    setIsOpen(false);
  };

  const handleGetHotels = useCallback(() => {
    if (selectedPlaces!.type === 'country')
      fetchWithRetry(getHotels(selectedPlaces!.id)).then(async (resp) => {
        const data = await resp.json();
        if (
          Object.values(data).length > 0 &&
          !hotels.map((item) => item.countryId).includes(+(selectedPlaces?.id ?? 0))
        ) {
          setHotels([
            ...hotels,
            {
              countryId: +selectedPlaces!.id,
              hotels: Object.values(data),
            },
          ]);
        }
        return;
      });
  }, [selectedPlaces]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setSearchResponse({
      ...searchResponse,
      waitUntil: null,
    });
    event.preventDefault();

    if (selectedPlaces) {
      fetchWithRetry(startSearchPrices(selectedPlaces.id), setError, setIsLoading)
        .then((resp) => {
          if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
          return resp.json();
        })
        .then((data) => setSearchResponse(data));

      setOffers([]);
      handleGetHotels();
    }
  };

  return (
    <form className='dropdown' onSubmit={(event) => handleSubmit(event)}>
      <span className='dropdown-title'>{placeholder}</span>
      <div className='dropdown-header'>
        <input
          id='inputText'
          type='text'
          className='dropdown-header__input'
          value={inputText}
          placeholder={placeholder}
          onChange={(event) => setInputText(event.target.value)}
          onClick={() => {
            if (inputText === placeholder) setInputText('');
            setIsOpen(true);
          }}
          ref={inputRef}
        />

        <button
          type='button'
          className='dropdown-header__button'
          onClick={() => {
            if (inputRef.current) inputRef.current.focus();
            setInputText('');
            setSelectedPlaces(null);
            setIsOpen(true);
          }}>
          <CloseIconSvg />
        </button>
      </div>
      <div ref={dropdownRef}>
        {isOpen && (
          <ul className='dropdown-menu'>
            {inputText.length === 0 ||
            (selectedPlaces && 'type' in selectedPlaces && selectedPlaces.type === 'country')
              ? countries.map((country) => (
                  <li
                    key={country.id}
                    className='dropdown-item'
                    onClick={() =>
                      handleSelect({
                        ...country,
                        type: 'country',
                      })
                    }>
                    <img src={country.flag} className='dropdown-item__image' />
                    <span>{country.name}</span>
                  </li>
                ))
              : places.map((place) => (
                  <li key={place.id} className='dropdown-item' onClick={() => handleSelect(place)}>
                    {place.type === 'city' ? (
                      <CityIconSvg />
                    ) : (
                      <img
                        src={place.type === 'country' ? place.flag : place.img}
                        className='dropdown-item__image'
                      />
                    )}
                    <span>{place.name}</span>
                  </li>
                ))}
          </ul>
        )}
      </div>

      <button type='submit' className='dropdown-button' disabled={!selectedPlaces || isLoading}>
        {isLoading ? <Spinner /> : 'Знайти'}
      </button>

      {error.length > 0 && <TextError error={error} />}
    </form>
  );
}

export default DropdownInput;
