import type { Route } from './+types/home';
import { TourPage } from '../pages/TourPage/TourPage';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Пошук туру' }, { name: 'description', content: 'Пошук туру' }];
}

export default function Tour() {
  return <TourPage />;
}
