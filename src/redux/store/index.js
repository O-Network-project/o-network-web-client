import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../../features/user/store/userSlice'
import { errorPage } from '../reducers/errorPage'
import { postsReducer } from '../../features/activity-feed/post/store/postsSlice'

const reducer = {
    user: userReducer,
    errorPage,
    posts: postsReducer
}

export const store = configureStore({
    reducer,
    devTools: true
})
