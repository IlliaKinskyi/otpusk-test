import React from 'react';

export default function TextError({ error }: { error: string }) {
  return <span className='text-error'>{error}</span>;
}
