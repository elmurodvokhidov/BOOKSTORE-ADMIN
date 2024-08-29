import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import bookSlice from "../slices/bookSlice";
import categorySlice from "../slices/categorySlice";
import userSlice from "../slices/userSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
        category: categorySlice,
        user: userSlice,
    }
});