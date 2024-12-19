import { createSlice } from "@reduxjs/toolkit"
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
    },
    reducers: {
        login: function(state, action) {
            localStorage.setItem('token', action.payload)
            state.token = action.payload
        }
    }
})

export const {login} = authSlice.actions
export default authSlice.reducer
