import { getSearchPrices } from 'assets/js/api';
import React, { useEffect, useState } from 'react';
import type { searchResponseType } from '~/types/Types';
import Spinner from '../Spinner/Spinner';
import { fetchWithRetry } from '~/utils/utils';

export default function SearchResults({
  searchResponse,
  setSearchResponse,
}: {
  searchResponse: searchResponseType;
  setSearchResponse: React.Dispatch<React.SetStateAction<searchResponseType>>;
}) {
  const [isTimeForRequest, setIsTimeForRequest] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkIsTimeForRequest = () => {
    if (searchResponse.waitUntil && new Date(searchResponse.waitUntil) < new Date()) {
      setIsTimeForRequest(true);
    }
  };

  useEffect(() => {
    if (searchResponse.waitUntil) {
      setIsLoading(true);
      checkIsTimeForRequest();
      const intervalId = setInterval(checkIsTimeForRequest, 1000);
      return () => clearInterval(intervalId);
    }
  }, [searchResponse.waitUntil]);

  useEffect(() => {
    if (isTimeForRequest) {
      fetchWithRetry(getSearchPrices(searchResponse.token), setError, setIsLoading)
        .then((resp) => {
          setSearchResponse({
            ...searchResponse,
            waitUntil: null,
          });
          if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
          return resp.json();
        })
        .then((data) => console.log(data));
    }
  }, [isTimeForRequest]);

  console.log(isTimeForRequest);
  return <div>{isLoading && <Spinner />}</div>;
}
