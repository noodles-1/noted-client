import { configureStore } from "@reduxjs/toolkit";
import shown from "@/redux/slices/shown";

export const store = configureStore({
    reducer: {
        shown: shown,
    }
})