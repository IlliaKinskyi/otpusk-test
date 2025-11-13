import { getHotel, getPrice } from 'assets/js/api';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import TextError from '~/components/TextError/TextError';
import TourItem from '~/components/TourItem/TourItem';
import { fetchWithRetry } from '~/utils/utils';

export function TourPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const [price, setPrice] = useState(null);
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if (searchParams.get('hotelId') && searchParams.get('priceId')) {
      fetchWithRetry(getPrice(searchParams.get('priceId')), setError).then(async (resp) => {
        const data = await resp.json();
        return setPrice(data);
      });

      fetchWithRetry(getHotel(+(searchParams.get('hotelId') ?? 0)), setError).then(async (resp) => {
        const data = await resp.json();
        return setHotel(data);
      });
    }
  }, [searchParams]);

  return (
    <div className='offers'>
      {error.length > 0 ? (
        <TextError error={error} />
      ) : (
        <TourItem
          item={{
            priceOffer: price,
            hotel: hotel,
          }}
        />
      )}
    </div>
  );
}
