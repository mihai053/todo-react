import { createSlice } from '@reduxjs/toolkit';

//in create slice putem face mutability
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userId: null,
    token: null,
    expirationDate: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;

      // localStorage pentru a avea login persistent
      const tokenExpirationDate =
        state.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //now time + 1 hour
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: action.payload.userId,
          token: action.payload.token,
          expiration: tokenExpirationDate.toIsoString(),
        })
      );
    },

    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.token = null;
      localStorage.removeItem('userData');
    },
  },
});
// action creator that returns another function (thunks)

//exportam actiunile si nu mai avem nevoie sa le descriem ca la createStore
export const authActions = authSlice.actions;

export default authSlice;
