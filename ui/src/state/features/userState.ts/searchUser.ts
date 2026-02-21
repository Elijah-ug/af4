import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
}
const initialState: SearchState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearSearch: (state) => {
      state.value = "";
    },
  },
});
export const { setSearchValue, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
