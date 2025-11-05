import { createSlice } from '@reduxjs/toolkit'
import { fetchComments, createComment } from '../../comment/store/commentsThunks'
import { createReaction, updateReaction, removeReaction, fetchReactions } from '../../reaction/store/reactionsThunks'
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
                    post.hasFetchedReactions = false
                    post.reactionIds = post.currentUserReaction
                        ? [post.currentUserReaction.id]
                        : []

                    delete post.currentUserReaction

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
                normalizedPost.hasFetchedReactions = false
                normalizedPost.reactionIds = []

                delete normalizedPost.currentUserReaction

                postsAdapter.addOne(state, normalizedPost)
            })

            .addCase(fetchComments.fulfilled, (state, { meta: { arg: postId }, payload: comments }) => {
                const post = postsAdapterSelectors.selectById(state, postId)

                const commentIds = [
                    ...(post.commentIds || []),
                    ...comments.map(comment => comment.id)
                ]

                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: { commentIds }
                })
            })

            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                const post = postsAdapterSelectors.selectById(state, comment.postId)
                const commentIds = [...(post.commentIds || []), comment.id]

                postsAdapter.updateOne(state, {
                    id: comment.postId,
                    changes: {
                        commentIds,
                        commentsCount: post.commentsCount + 1
                    }
                })
            })

            .addCase(fetchReactions.fulfilled, (state, { meta: { arg: postId }, payload: reactions }) => {
                postsAdapter.updateOne(state, {
                    id: postId,
                    changes: {
                        reactionIds: reactions.map(reaction => reaction.id),
                        hasFetchedReactions: true
                    }
                })
            })

            .addCase(createReaction.fulfilled, (state, { payload: reaction }) => {
                const post = postsAdapterSelectors.selectById(state, reaction.postId)

                const reactionIds = [...post.reactionIds, reaction.id]
                const reactionTypeCounts = {
                    ...post.reactionTypeCounts,
                    [reaction.type]: (post.reactionTypeCounts[reaction.type] || 0) + 1
                }

                postsAdapter.updateOne(state, {
                    id: reaction.postId,
                    changes: {
                        reactionIds,
                        reactionTypeCounts
                    }
                })
            })

            .addCase(updateReaction.fulfilled, (state, { payload: { previousReaction, updatedReaction } }) => {
                const post = postsAdapterSelectors.selectById(state, updatedReaction.postId)

                const reactionTypeCounts = {
                    ...post.reactionTypeCounts,
                    [previousReaction.type]: post.reactionTypeCounts[previousReaction.type] - 1,
                    [updatedReaction.type]: (post.reactionTypeCounts[updatedReaction.type] || 0) + 1
                }

                if (reactionTypeCounts[previousReaction.type] === 0) {
                    delete reactionTypeCounts[previousReaction.type]
                }

                postsAdapter.updateOne(state, {
                    id: updatedReaction.postId,
                    changes: { reactionTypeCounts }
                })
            })

            .addCase(removeReaction.fulfilled, (state, { payload: reaction }) => {
                const post = postsAdapterSelectors.selectById(state, reaction.postId)

                const reactionIds = post.reactionIds.filter(currentReactionId =>
                    currentReactionId !== reaction.id
                )

                const reactionTypeCounts = {
                    ...post.reactionTypeCounts,
                    [reaction.type]: post.reactionTypeCounts[reaction.type] - 1
                }

                if (reactionTypeCounts[reaction.type] === 0) {
                    delete reactionTypeCounts[reaction.type]
                }

                postsAdapter.updateOne(state, {
                    id: reaction.postId,
                    changes: {
                        reactionIds,
                        reactionTypeCounts
                    }
                })
            })
    }
})

export const { cleanFeedState } = postsSlice.actions
export const postsReducer = postsSlice.reducer
