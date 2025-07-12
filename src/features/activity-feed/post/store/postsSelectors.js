import { createSelector } from '@reduxjs/toolkit'

/**
 * @param {Object} state
 */
const selectPostsState = state => state.posts

/**
 * @param {Object} state
 */
export const selectPosts = createSelector(
    [selectPostsState],
    state => state.posts
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPost = createSelector(
    [selectPosts, (_, postId) => postId],
    (posts, postId) => posts.find(post => post.id === postId)
)

/**
 * @param {Object} state
 */
export const selectActivityFeedCurrentPage = createSelector(
    [selectPostsState],
    state => state.pagination.currentPage
)

/**
 * @param {Object} state
 */
export const selectActivityFeedHasMorePosts = createSelector(
    [selectPostsState],
    state => state.pagination.hasMorePosts
)

/**
 * @param {Object} state
 */
export const selectPostLoading = createSelector(
    [selectPostsState],
    state => state.loading
)
