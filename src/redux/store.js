import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});