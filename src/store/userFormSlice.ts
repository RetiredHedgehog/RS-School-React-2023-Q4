import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../shcema/user';

type State = {
  userForm: UserSchema;
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
