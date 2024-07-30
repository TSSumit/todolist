import { createSlice } from "@reduxjs/toolkit";

const showDropDownSlice = createSlice({
    name: "dropDown",
    initialState: {
        showDropDown: false,
    },
    reducers: {
        toggleDropDown: (state) => {
            state.showDropDown = !state.showDropDown;
        },
    },
});

export const { toggleDropDown } = showDropDownSlice.actions;
export default showDropDownSlice.reducer;
