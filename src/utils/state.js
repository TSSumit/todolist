import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import showDropDownSlice from "./showDropDownSlice";
import darkModeSlice from "./darkModeSlice";
import listViewSlice from "./listViewSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice,
    dropDown: showDropDownSlice,
    darkMode: darkModeSlice,
    listView: listViewSlice,
  }
});

export default store;
