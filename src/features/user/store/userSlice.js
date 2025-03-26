import { createSlice } from '@reduxjs/toolkit'
import { login, logout, fetchUser, createUser, updateUser } from './userThunks'

export const initialState = {
    id: null,
    name: '',
    surname: '',
    email: '',
    job: '',
    role: null,
    profilePicture: '',
    organization: null,
    disabled: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cleanUserState(state) {
            Object.assign(state, initialState)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, { payload: user }) => {
                return { ...state, ...user }
            })

            .addCase(logout.fulfilled, state => {
                userSlice.caseReducers.cleanUserState(state)
            })

            .addCase(fetchUser.fulfilled, (state, { payload: user }) => {
                return { ...state, ...user }
            })
            .addCase(updateUser.fulfilled, (state, { payload: data }) => {
                return { ...state, ...data }
            })
    }
})

export const userReducer = userSlice.reducer
export const { cleanUserState } = userSlice.actions
export { login, logout, fetchUser, createUser, updateUser }
