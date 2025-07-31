import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../features/user/store/userSlice'
import { postsReducer } from '../features/activity-feed/post/store/postsSlice'
import { commentsReducer } from '../features/activity-feed/comment/store/commentsSlice'
import { reactionsReducer } from '../features/activity-feed/reaction/store/reactionsSlice'
import { errorPage } from './errorPageSlice'

const reducer = {
    user: userReducer,
    errorPage,
    posts: postsReducer,
    comments: commentsReducer,
    reactions: reactionsReducer
}

export const store = configureStore({
    reducer,
    devTools: true
})
