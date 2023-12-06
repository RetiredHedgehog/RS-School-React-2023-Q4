import { createSlice } from '@reduxjs/toolkit';
import countries from '../countries.json';

type State = {
  countries: string[];
};

const initialState: State = {
  countries,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const {} = countriesSlice.actions;
export default countriesSlice.reducer;
