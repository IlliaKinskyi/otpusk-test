import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import type { Country, GeoEntity } from '~/types/ApiTypes';
import CloseIconSvg from './assets/CloseIconSvg';
import CityIconSvg from './assets/CityIconSvg';

function DropdownInput({
  countries,
  placeholder,
  selectedPlaces,
  setSelectedPlaces,
  inputText,
  setInputText,
  places,
}: {
  countries: Country[];
  placeholder?: string;
  selectedPlaces: Country | GeoEntity | null;
  setSelectedPlaces: React.Dispatch<React.SetStateAction<Country | GeoEntity | null>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  places: GeoEntity[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);
  });

  const handleSelect = (country: Country | GeoEntity) => {
    setSelectedPlaces(country);
    setInputText(country.name);
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedPlaces);
  };

  return (
    <form className='dropdown' onSubmit={(event) => handleSubmit(event)}>
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

      <button type='submit' className='dropdown-button'>
        Знайти
      </button>
    </form>
  );
}

export default DropdownInput;
