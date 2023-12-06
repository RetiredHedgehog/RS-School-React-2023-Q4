import { configureStore, combineReducers } from '@reduxjs/toolkit';
import countriesSlice from './countriesSlice';
import userFormSlice from './userFormSlice';

const rootReducer = combineReducers({
  countries: countriesSlice,
  userForm: userFormSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
