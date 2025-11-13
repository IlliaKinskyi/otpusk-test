import { getSearchPrices } from 'assets/js/api';
import React, { useContext, useEffect, useState } from 'react';
import type { searchResponseType } from '~/types/Types';
import Spinner from '../Spinner/Spinner';
import { fetchWithRetry } from '~/utils/utils';
import TextError from '../TextError/TextError';
import { SearchResultsContext } from '~/context/SearchResultsContext';
import Offers from '../Offers/Offers';
import { OffersContext } from '~/context/OffersContext';
import { HotelsContext } from '~/context/HotelsContext';
import type { Hotel, PriceOffer } from '~/types/ApiTypes';

export default function SearchResults({
  searchResponse,
  setSearchResponse,
}: {
  searchResponse: searchResponseType;
  setSearchResponse: React.Dispatch<React.SetStateAction<searchResponseType>>;
}) {
  const [isTimeForRequest, setIsTimeForRequest] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resultsContext = useContext(SearchResultsContext);
  const hotelContext = useContext(HotelsContext);
  const offersContext = useContext(OffersContext);

  if (!resultsContext || !hotelContext || !offersContext) {
    throw new Error(
      `Context must be used within a ${!SearchResultsContext ? 'SearchResultsContext' : !offersContext ? 'OffersContext' : 'HotelsContext'}`,
    );
  }

  const { searchResults, setSearchResults } = resultsContext;
  const { hotels } = hotelContext;
  const { offers, setOffers } = offersContext;

  const checkIsTimeForRequest = () => {
    if (searchResponse.waitUntil && new Date(searchResponse.waitUntil) < new Date()) {
      setIsTimeForRequest(true);
    }
  };

  useEffect(() => {
    if (searchResponse.waitUntil) {
      setError('');
      setIsLoading(true);
      checkIsTimeForRequest();
      const intervalId = setInterval(checkIsTimeForRequest, 1000);
      return () => clearInterval(intervalId);
    }
  }, [searchResponse.waitUntil]);

  useEffect(() => {
    if (isTimeForRequest) {
      fetchWithRetry(getSearchPrices(searchResponse.token), setError, setIsLoading)
        .then((resp) => {
          if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
          return resp.json();
        })
        .then((data) => {
          const dataArray: PriceOffer[] = Object.values(data.prices);
          const allHotels: Hotel[] = [];
          setSearchResults(dataArray);

          hotels.map((item) => {
            item.hotels?.map((hotel) => {
              allHotels.push(hotel);
            });
          });

          dataArray.map((offer) => {
            if (!offers.map((item) => item.priceOffer?.hotelID).includes(offer.hotelID)) {
              allHotels.map((hotel) => {
                if (+(offer.hotelID ?? 0) === hotel.id) {
                  setOffers((prevOffers) => [
                    ...prevOffers,
                    {
                      priceOffer: offer,
                      hotel: hotel,
                    },
                  ]);
                }
              });
            }
          });
        })
        .finally(() => {
          setIsTimeForRequest(false);
          setIsLoading(false);
          setSearchResponse({
            ...searchResponse,
            waitUntil: null,
          });
        });
    }
  }, [isTimeForRequest]);

  return (
    <div className='search-results'>
      {isLoading ? (
        <div className='search-results__spinner'>
          <Spinner />
        </div>
      ) : (
        searchResults?.length === 0 && (
          <span className='search-results__empty'>За вашим запитом турів не знайдено</span>
        )
      )}
      {error.length > 0 && <TextError error={error} />}

      <Offers />
    </div>
  );
}
