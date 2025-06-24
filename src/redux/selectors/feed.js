import { createSelector } from '@reduxjs/toolkit'

export const selectFeed = state => state.feed

export const selectPosts = createSelector(
    [selectFeed],
    feed => feed.posts
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const selectPost = createSelector(
    [selectPosts, (_, postId) => postId],
    (posts, postId) => posts.find(post => post.id === postId)
)

export const selectActivityFeedCurrentPage = createSelector(
    [selectFeed],
    feed => feed.pagination.currentPage
)

export const selectActivityFeedHasMorePosts = createSelector(
    [selectFeed],
    feed => feed.pagination.hasMorePosts
)

export const selectPostLoading = createSelector(
    [selectFeed],
    feed => feed.loading
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const selectPostCommentsCount = createSelector(
    [selectPost],
    post => post.commentsCount
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const selectPostComments = createSelector(
    [selectPost],
    post => post.comments
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const selectPostReactions = createSelector(
    [selectPost],
    post => post.reactions
)
