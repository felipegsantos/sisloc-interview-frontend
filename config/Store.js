import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from "redux-persist/lib/storage/session";

// reducers
import authReducer from "./features/AuthSlice";
import cartReducer from "./features/CartSlice";

const persistConfig = {
    key: 'SESSION',
    version: 1,
    storage,
    blacklist: [], // What you don't wanna to persist
    whitelist: ['cart'] // What you want to persist
}
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    devTools: true,
});

export const persistor = persistStore(store)
