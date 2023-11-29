import React from 'react';

const saveToLocalStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
};

const getFromLocalStorage = (key: string): string => {
  let response = '';

  if (typeof window !== 'undefined') {
    response = window.localStorage.getItem(key) || '';
  }

  return response;
};

const saveSearchText = (text: string): void => {
  saveToLocalStorage('searchText', text);
};

const getSearchText = (): string => {
  return getFromLocalStorage('searchText');
};

const getPokemonUrl = (text: string): string => {
  const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
  return `${DEFAULT_URL}/${text}`;
};

const handleFetchError = (
  error: unknown,
  setError: (value: React.SetStateAction<Error | null>) => void
) => {
  if (typeof error === 'string') {
    setError(new Error(error));
    return;
  }

  if (error instanceof Error && error.name !== 'AbortError') {
    setError(error);
    return;
  }
};

type PartialSearch = { name: string; url: string }[];

const partialSearch = (arr: string[], str: string): PartialSearch => {
  const results: PartialSearch = [];
  for (const name of arr) {
    if (name.includes(str)) {
      results.push({
        name,
        url: getPokemonUrl(name),
      });
    }
  }

  return results;
};

export default {
  getSearchText,
  saveSearchText,
  getPokemonUrl,
  handleFetchError,
  partialSearch,
};
