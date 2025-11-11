import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import type { Country } from '~/types/ApiTypes';
import CloseIconSvg from './assets/CloseIconSvg';

function DropdownInput({
  countries,
  placeholder,
  selectedCountry,
  setSelectedCountry,
}: {
  countries: Country[];
  placeholder?: string;
  selectedCountry: Country | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Country | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState(placeholder);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropdownRef = useOutsideClick(() => {
    setIsOpen(false);
  });

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setInputText(country.name);
    setIsOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedCountry?.name);
  };

  useEffect(() => {
    if (inputText?.length === 0 && !isOpen) setInputText(placeholder);
  }, [inputText, isOpen]);

  return (
    <form className='dropdown' onSubmit={(event) => handleSubmit(event)}>
      <div className='dropdown-header'>
        <input
          id='inputText'
          type='text'
          className='dropdown-header__input'
          value={inputText}
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
            setSelectedCountry(null);
            setIsOpen(true);
          }}>
          <CloseIconSvg />
        </button>
      </div>
      {/*<div className='dropdown-header' onClick={() => setIsOpen(!isOpen)}>
        {placeholder}
      </div>*/}
      <div ref={dropdownRef}>
        {isOpen && (
          <ul className='dropdown-menu'>
            {countries.map((country) => (
              <li key={country.id} className='dropdown-item' onClick={() => handleSelect(country)}>
                <img src={country.flag} className='dropdown-item__image' />
                <span>{country.name}</span>
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
