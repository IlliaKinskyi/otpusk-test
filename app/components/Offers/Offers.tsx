import React, { useContext, useEffect, useState } from 'react';
import { HotelsContext } from '~/context/HotelsContext';
import { OffersContext } from '~/context/OffersContext';
import { SearchResultsContext } from '~/context/SearchResultsContext';
import type { Hotel } from '~/types/ApiTypes';
import Offer from './Offer';

export default function Offers() {
  const resultsContext = useContext(SearchResultsContext);
  const hotelContext = useContext(HotelsContext);
  const offersContext = useContext(OffersContext);

  if (!resultsContext || !hotelContext || !offersContext) {
    throw new Error(
      `Context must be used within a ${!SearchResultsContext ? 'SearchResultsContext' : !offersContext ? 'OffersContext' : 'HotelsContext'}`,
    );
  }

  const { searchResults, setSearchResults } = resultsContext;
  const { hotels, setHotels } = hotelContext;
  const { offers, setOffers } = offersContext;

  //useEffect(() => {
  //  hotels.map((item) => {
  //    item.hotels?.map((hotel) => {
  //      setAllHotels((prevHotels) => [...prevHotels, hotel]);
  //    });
  //  });

  //  searchResults?.map((offer) => {
  //    if (!offers.map((item) => item.priceOffer?.hotelID).includes(offer.hotelID))
  //      allHotels.map((hotel) => {
  //        if (+(offer.hotelID ?? 0) === hotel.id) {
  //          setOffers((prevOffers) => [
  //            ...prevOffers,
  //            {
  //              priceOffer: offer,
  //              hotel: hotel,
  //            },
  //          ]);
  //        }
  //      });
  //  });
  //}, [hotels, searchResults]);

  return (
    <div className='offers'>
      {offers.map((item) => (
        <Offer item={item} key={item.priceOffer?.id} />
      ))}
    </div>
  );
}
