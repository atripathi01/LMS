import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  // initialise name
  name: 'user',

  // set initial state of user data
  initialState: {
    user: {
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      token: localStorage.getItem('token'),
    },
  },

  // create reducers
  reducers: {
    // ------->Login<----
    login: (state, action) => {
      state.user = action.payload;
    },

    // -------->Logout<------
    logout: (state) => {
      state.user = {
        name: localStorage.removeItem('name'),
        email: localStorage.removeItem('email'),
        role: localStorage.removeItem('role'),
        token: localStorage.removeItem('token'),
      };
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
