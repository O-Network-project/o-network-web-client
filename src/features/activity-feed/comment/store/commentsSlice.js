import { createSlice } from '@reduxjs/toolkit'
import { cleanFeedState } from '../../post/store/postsSlice'
import { createComment, fetchComments } from './commentsThunks'
import { commentsAdapter } from './commentsAdapter'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: commentsAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
                commentsAdapter.addMany(state, comments)
            })

            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                commentsAdapter.addOne(state, comment)
            })

            .addCase(cleanFeedState, state => {
                Object.assign(state, commentsSlice.getInitialState())
            })
    }
})

export const commentsReducer = commentsSlice.reducer
