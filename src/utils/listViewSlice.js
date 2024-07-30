import { createSlice } from "@reduxjs/toolkit";

const listViewSlice = createSlice({
    name: "listView",
    initialState: {
        isListView: true,
    },
    reducers: {
        toggleListView: (state) => {
            state.isListView = !state.isListView;
        },
    },
});

export const { toggleListView } = listViewSlice.actions;
export default listViewSlice.reducer;
