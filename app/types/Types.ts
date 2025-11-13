export type searchResponseType = {
  token: string;
  waitUntil: Date | null;
};

export type ServicesType = {
  aquapark: 'yes' | 'none';
  laundry: 'yes' | 'none';
  parking: 'yes' | 'none';
  tennis_court: 'yes' | 'none';
  wifi: 'yes' | 'none';
};

export type HotelType = {
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  description: string;
  id: number;
  img: string;
  name: string;
  services: ServicesType;
};
