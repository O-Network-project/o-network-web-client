import { createSlice } from '@reduxjs/toolkit'
import { fetchPosts } from '../../post/store/postsThunks'
import { cleanFeedState } from '../../post/store/postsSlice'
import { createReaction, updateReaction, removeReaction } from './reactionsThunks'
import { reactionsAdapter } from './reactionsAdapter'

const reactionsSlice = createSlice({
    name: 'reactions',
    initialState: reactionsAdapter.getInitialState(),
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, { payload: { posts } }) => {
                reactionsAdapter.addMany(state, posts.flatMap(post => post.reactions))
            })

            .addCase(createReaction.fulfilled, (state, { payload: reaction }) => {
                reactionsAdapter.addOne(state, reaction)
            })

            .addCase(updateReaction.fulfilled, (state, { payload: reaction }) => {
                reactionsAdapter.setOne(state, reaction)
            })

            .addCase(removeReaction.fulfilled, (state, { meta: { arg: { reactionId } } }) => {
                reactionsAdapter.removeOne(state, reactionId)
            })

            .addCase(cleanFeedState, state => {
                Object.assign(state, reactionsSlice.getInitialState())
            })
    }
})

export const reactionsReducer = reactionsSlice.reducer
