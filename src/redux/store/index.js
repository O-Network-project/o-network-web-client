import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../../features/user/store/userSlice'
import { errorPage } from '../reducers/errorPage'
import { postsReducer } from '../../features/activity-feed/post/store/postsSlice'
import { commentsReducer } from '../../features/activity-feed/comment/store/commentsSlice'

const reducer = {
    user: userReducer,
    errorPage,
    posts: postsReducer,
    comments: commentsReducer
}

export const store = configureStore({
    reducer,
    devTools: true
})
