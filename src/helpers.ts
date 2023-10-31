const DEFAULT_TYPE = 'Pokemon';

const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
};

const saveSearchText = (text: string): void => {
  saveToLocalStorage('searchText', text);
};

const saveSearchType = (text: string): void => {
  saveToLocalStorage('searchType', text);
};

const getSearchText = (): string => {
  return getFromLocalStorage('searchText');
};

const getSearchType = (): string => {
  return getFromLocalStorage('searchType') || DEFAULT_TYPE;
};

const getPokemonUrl = (text: string): string => {
  const DEFAULT_URL = 'https://pokeapi.co/api/v2/pokemon';
  return `${DEFAULT_URL}/${text}`;
};

export default {
  getSearchType,
  getSearchText,
  saveSearchType,
  saveSearchText,
  getPokemonUrl,
};
