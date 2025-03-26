import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../../features/user/store/userSlice'
import { errorPage } from '../reducers/errorPage'
import { feed } from '../reducers/feed'

const reducer = {
    user: userReducer,
    errorPage,
    feed
}

export const store = configureStore({
    reducer,
    devTools: true
})
