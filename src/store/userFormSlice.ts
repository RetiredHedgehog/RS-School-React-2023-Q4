import { createSlice } from '@reduxjs/toolkit';

type State = {
  userForm: {
    name: string;
    age: number;
    email: string;
    password: string;
    gender: string;
    country: string;
    file: File;
  };
};

const initialState = <State>{
  userForm: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitted: (state, action) => {
      console.log('===\npayload\n===');
      console.log(action.payload);
      state.userForm = action.payload;
    },
  },
});

export const { submitted } = formSlice.actions;
export default formSlice.reducer;
