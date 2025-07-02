import { createSelector } from '@reduxjs/toolkit'

/**
 * @param {Object} state
 */
export const selectFeed = state => state.feed

/**
 * @param {Object} state
 */
export const selectPosts = createSelector(
    [selectFeed],
    feed => feed.posts
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
    [selectFeed],
    feed => feed.pagination.currentPage
)

/**
 * @param {Object} state
 */
export const selectActivityFeedHasMorePosts = createSelector(
    [selectFeed],
    feed => feed.pagination.hasMorePosts
)

/**
 * @param {Object} state
 */
export const selectPostLoading = createSelector(
    [selectFeed],
    feed => feed.loading
)
