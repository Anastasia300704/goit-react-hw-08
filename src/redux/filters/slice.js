import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filter: '', 
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer; 
export const { setSearchQuery } = filtersSlice.actions;
