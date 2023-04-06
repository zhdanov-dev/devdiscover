import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	input: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch(state, action) {
			state.input = action.payload.input;
		},
		removeSearch(state) {
			state.input = '';
		},
	},
});

export const { setSearch, removeSearch } = searchSlice.actions;
export default searchSlice.reducer;
