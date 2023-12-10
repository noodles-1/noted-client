import { createSlice } from "@reduxjs/toolkit";

export const spellcheckedSlice = createSlice({
    name: 'spellcheckedSlice',
    initialState: {
        spellchecked: true
    },
    reducers: {
        toggleSpellcheck: state => {
            state.spellchecked = !state.spellchecked
        }
    }
})

export const { toggleSpellcheck } = spellcheckedSlice.actions
export default spellcheckedSlice.reducer