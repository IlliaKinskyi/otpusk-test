import React, { type JSX } from 'react';

export default function ServiceItem({ icon, title }: { icon: JSX.Element; title: string }) {
  return (
    <div className='offer-service'>
      {icon}
      <span className='offer-service__text'>{title}</span>
    </div>
  );
}
