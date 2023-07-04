import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        setAuth: (state, action) => {
            Object.assign(state, { accessToken: action.payload });
        },
        resetAuth: (state, action) => {
            Object.assign(state, action.payload);
        },
    }
});

// Action creators are generated for each case reducer function
export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;