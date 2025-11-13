import moment from 'moment';
import React from 'react';
import type { OfferType } from '~/context/OffersContext';

export default function Offer({ item }: { item: OfferType }) {
  return (
    <div className='offer'>
      <img src={item.hotel?.img} className='offer-image' />
      <span className='offer-title'>{item.hotel?.name}</span>
      <span className='offer-address'>
        {item.hotel?.countryName}, {item.hotel?.cityName}
      </span>
      <span className='offer-start'>Старт тура</span>
      <span className='offer-date'>
        {moment(item.priceOffer?.startDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
      </span>
      <span className='offer-amout'>
        {item.priceOffer?.amount &&
          new Intl.NumberFormat('uk-UA', { useGrouping: true }).format(
            item.priceOffer?.amount,
          )}{' '}
        {item.priceOffer?.currency}
      </span>

      <a href='' className='offer-link'>
        Відкрити ціну
      </a>
    </div>
  );
}
