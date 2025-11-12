import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Пошук туру' }, { name: 'description', content: 'Пошук туру' }];
}

export default function Home() {
  return <Welcome />;
}
