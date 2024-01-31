import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true,
            state.error = false
        },

        signInSuccessful: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { signInStart, signInSuccessful, signInFailure } = userSlice.actions

export default userSlice.reducer