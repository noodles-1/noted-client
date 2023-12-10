import { configureStore } from "@reduxjs/toolkit";
import shown from "@/redux/slices/shown";
import spellchecked from "@/redux/slices/spellchecked";

export const store = configureStore({
    reducer: {
        shown: shown,
        spellchecked: spellchecked
    }
})