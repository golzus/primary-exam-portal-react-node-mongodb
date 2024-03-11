// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authReducer from "../features/auth/authSlice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer
    },
    middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiSlice.middleware),
    devTools: true//לא שלכוח לשנות בהמשך לfalse
});

export default store; 