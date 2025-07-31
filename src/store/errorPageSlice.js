import { createSlice } from '@reduxjs/toolkit'

const ErrorCode = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

const slice = createSlice({
    name: 'errorPage',
    initialState: {
        code: null
    },
    reducers: {
        setErrorPage(state, { payload: code }) {
            state.code = code
        }
    }
})

export { ErrorCode }
export const { setErrorPage } = slice.actions
export const errorPage = slice.reducer
