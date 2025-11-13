import React, { useContext } from 'react';
import { OffersContext } from '~/context/OffersContext';
import Offer from './Offer';

export default function Offers() {
  const offersContext = useContext(OffersContext);

  if (!offersContext) {
    throw new Error(`Context must be used within a OffersContext`);
  }
  const { offers } = offersContext;

  return (
    <div className='offers'>
      {offers
        .sort((a, b) => (a.priceOffer?.amount ?? 0) - (b.priceOffer?.amount ?? 0))
        .map((item) => (
          <Offer item={item} key={item.priceOffer?.id} />
        ))}
    </div>
  );
}
