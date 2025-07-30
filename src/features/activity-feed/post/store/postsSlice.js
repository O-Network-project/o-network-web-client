import { createSlice } from '@reduxjs/toolkit'
import { fetchComments, createComment } from '../../comment/store/commentsThunks'
import { createReaction, removeReaction } from '../../reaction/store/reactionsThunks'
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
                const normalizedPosts = structuredClone(posts).map(post => {
                    post.commentIds = null
                    post.reactionIds = post.reactions.map(reaction => reaction.id)
                    delete post.reactions
                    return post
                })

                postsAdapter.addMany(state, normalizedPosts)

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
                const normalizedPost = structuredClone(post)
                normalizedPost.commentIds = null
                normalizedPost.reactionIds = []
                delete normalizedPost.reactions

                postsAdapter.addOne(state, normalizedPost)
            })

            .addCase(fetchComments.fulfilled, (state, { meta: { arg: postId }, payload: comments }) => {
                const post = postsAdapterSelectors.selectById(state, postId)

                const updatedCommentIds = [
                    ...(post.commentIds || []),
                    ...comments.map(comment => comment.id)
                ]

                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: { commentIds: updatedCommentIds }
                })
            })

            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                const post = postsAdapterSelectors.selectById(state, comment.postId)
                const updatedCommentIds = [...(post.commentIds || []), comment.id]

                postsAdapter.updateOne(state, {
                    id: comment.postId,
                    changes: {
                        commentIds: updatedCommentIds,
                        commentsCount: post.commentsCount + 1
                    }
                })
            })

            .addCase(createReaction.fulfilled, (state, { payload: reaction }) => {
                const post = postsAdapterSelectors.selectById(state, reaction.postId)
                const updatedReactionIds = [...post.reactionIds, reaction.id]

                postsAdapter.updateOne(state, {
                    id: reaction.postId,
                    changes: { reactionIds: updatedReactionIds }
                })
            })

            .addCase(removeReaction.fulfilled, (state, { meta: { arg: { postId, reactionId } } }) => {
                const post = postsAdapterSelectors.selectById(state, postId)

                const updatedReactionIds = post.reactionIds.filter(currentReactionId =>
                    currentReactionId !== reactionId
                )

                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: { reactionIds: updatedReactionIds }
                })
            })
    }
})

export const { cleanFeedState } = postsSlice.actions
export const postsReducer = postsSlice.reducer
