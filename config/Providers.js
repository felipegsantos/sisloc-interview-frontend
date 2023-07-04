"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Store";
import { setAuth } from "./features/AuthSlice";

export function Providers({ children, accessToken }) {
  store.dispatch(setAuth(accessToken));
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default Providers;