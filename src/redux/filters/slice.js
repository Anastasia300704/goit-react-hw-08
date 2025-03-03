// redux/filters/slice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: '', // Фильтр по имени контакта (например)
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
