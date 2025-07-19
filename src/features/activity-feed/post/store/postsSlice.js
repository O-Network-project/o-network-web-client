import { createSlice } from '@reduxjs/toolkit'
import { fetchComments, createComment } from '../../comment/store/commentsThunks'
import { createReaction, updateReaction, removeReaction } from '../../reaction/store/reactionsThunks'
import { fetchPosts, createPost } from './postsThunks'
import { postsAdapter } from './postsAdapter'

const postsAdapterSelectors = postsAdapter.getSelectors()

const postsSlice = createSlice({
    name: 'posts',
    initialState: postsAdapter.getInitialState({
        pagination: {
            currentPage: 0,
            hasMorePosts: null
        },
        loading: false
    }),
    reducers: {
        cleanFeedState(state) {
            Object.assign(state, postsSlice.getInitialState())
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, { payload: { posts, meta } }) => {
                postsAdapter.addMany(state, posts)

                state.pagination.currentPage = meta.current_page
                state.pagination.hasMorePosts = meta.current_page !== meta.last_page

                state.loading = false
            })
            .addCase(fetchPosts.pending, state => {
                state.loading = true
            })
            .addCase(fetchPosts.rejected, state => {
                state.loading = false
            })

            .addCase(createPost.fulfilled, (state, { payload: post }) => {
                postsAdapter.addOne(state, post)
            })

            .addCase(fetchComments.fulfilled, (state, { meta: { arg: postId }, payload: comments }) => {
                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: { comments }
                })
            })

            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                const post = postsAdapterSelectors.selectById(state, comment.postId)
                const updatedComments = [...(post.comments || []), comment]

                postsAdapter.updateOne(state, {
                    id: comment.postId,
                    changes: {
                        comments: updatedComments,
                        commentsCount: post.commentsCount + 1
                    }
                })
            })

            .addCase(createReaction.fulfilled, (state, { payload: reaction }) => {
                const post = postsAdapterSelectors.selectById(state, reaction.postId)
                const updatedReactions = [...post.reactions, reaction]

                postsAdapter.updateOne(state, {
                    id: reaction.postId,
                    changes: { reactions: updatedReactions }
                })
            })

            .addCase(updateReaction.fulfilled, (state, { payload: reaction }) => {
                const post = postsAdapterSelectors.selectById(state, reaction.postId)

                const updatedReactions = post.reactions.map(currentReaction =>
                    currentReaction.id === reaction.id
                        ? reaction
                        : currentReaction
                )

                postsAdapter.updateOne(state, {
                    id: reaction.postId,
                    changes: { reactions: updatedReactions }
                })
            })

            .addCase(removeReaction.fulfilled, (state, { meta: { arg: { postId, reactionId } } }) => {
                const post = postsAdapterSelectors.selectById(state, postId)

                const updatedReactions = post.reactions.filter(currentReaction =>
                    currentReaction.id !== reactionId
                )

                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: { reactions: updatedReactions }
                })
            })
    }
})

export const { cleanFeedState } = postsSlice.actions
export const postsReducer = postsSlice.reducer
