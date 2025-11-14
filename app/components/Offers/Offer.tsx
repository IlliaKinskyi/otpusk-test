import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';
import type { OfferType } from '~/context/OffersContext';

export default function Offer({ item }: { item: OfferType }) {
  return (
    <div className='offer'>
      {item.hotel?.img && <img src={item.hotel.img} className='offer-image' loading='lazy' />}
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

      <Link
        to={`/tour?priceId=${item.priceOffer?.id}&hotelId=${item.priceOffer?.hotelID}`}
        className='offer-link'>
        Відкрити ціну
      </Link>
    </div>
  );
}
