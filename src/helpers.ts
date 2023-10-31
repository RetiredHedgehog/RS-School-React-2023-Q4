import React from 'react';

const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
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

export default {
  getSearchText,
  saveSearchText,
  getPokemonUrl,
  handleFetchError,
};
