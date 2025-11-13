import moment from 'moment';
import React from 'react';
import type { PriceOffer } from '~/types/ApiTypes';
import type { HotelType } from '~/types/Types';
import GeoIconSvg from './assets/GeoIconSvg';
import CityIconSvg from './assets/CityIconSvg';
import ServiceItem from './ServiceItem';
import WifiIconSvg from './assets/WifiIconSvg';
import LaundryIconSvg from './assets/LaundryIconSvg';
import ParkingIconSvg from './assets/ParkingIconSvg';
import TennisIconSvg from './assets/TennisIconSvg';
import AquaParkIconSvg from './assets/AquaParkIconSvg';
import CalendarIconSvg from './assets/CalendarIconSvg';

export default function TourItem({
  item,
}: {
  item: {
    priceOffer: PriceOffer | null;
    hotel: HotelType | null;
  };
}) {
  return (
    <div className='offer'>
      <title>{item.hotel?.name}</title>
      <a href={`/`} className='offer-link'>
        На головну
      </a>

      <span className='offer-title'>{item.hotel?.name}</span>
      <div className='offer-address__wrapper'>
        <span className='offer-address'>
          <GeoIconSvg />
          {item.hotel?.countryName}
        </span>

        <span className='offer-address'>
          <CityIconSvg />
          {item.hotel?.cityName}
        </span>
      </div>
      {item.hotel?.img && <img src={item.hotel.img} className='offer-image' loading='lazy' />}
      <span className='offer-description__title'>Опис</span>
      <span className='offer-description__text'>{item.hotel?.description}</span>

      <span className='offer-description__title'>Сервіси</span>
      <div className='offer-service__wrapper'>
        {item.hotel?.services.aquapark === 'yes' && (
          <ServiceItem icon={<AquaParkIconSvg />} title='Басейн' />
        )}
        {item.hotel?.services.laundry === 'yes' && (
          <ServiceItem icon={<LaundryIconSvg />} title='Прання' />
        )}
        {item.hotel?.services.parking === 'yes' && (
          <ServiceItem icon={<ParkingIconSvg />} title='Парковка' />
        )}
        {item.hotel?.services.tennis_court === 'yes' && (
          <ServiceItem icon={<TennisIconSvg />} title='Тенісний корт' />
        )}
        {item.hotel?.services.wifi === 'yes' && <ServiceItem icon={<WifiIconSvg />} title='WiFi' />}
      </div>

      <div className='offer-date__wrapper'>
        <CalendarIconSvg />
        <span className='offer-date'>
          {moment(item.priceOffer?.startDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
        </span>
      </div>

      <span className='offer-amout'>
        {item.priceOffer?.amount &&
          new Intl.NumberFormat('uk-UA', { useGrouping: true }).format(
            item.priceOffer?.amount,
          )}{' '}
        {item.priceOffer?.currency}
      </span>
    </div>
  );
}
