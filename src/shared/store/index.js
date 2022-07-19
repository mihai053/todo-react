import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';

//configureStore care foloseste toti reducerii din fiecare slice
const store = configureStore({
  reducer: { auth: authSlice.reducer },
  //   foarte important "auth" -- este folosit pentru a accesa state-ul cu useSelector
});

export default store;
