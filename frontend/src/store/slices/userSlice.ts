import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: null,
	email: null,
	token: null,
	integration: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.token = action.payload.token;
			state.integration = action.payload.integration;
		},
		removeUser(state) {
			state.id = null;
			state.email = null;
			state.token = null;
			state.integration = null;
		},
	},
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;