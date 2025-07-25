import { createSelector } from '@reduxjs/toolkit'
import { postsAdapter } from './postsAdapter'

const postsAdapterSelectors = postsAdapter.getSelectors(
    state => state.posts
)

/**
 * @param {Object} state
 */
const selectPostsState = state => state.posts

/**
 * @param {Object} state
 */
export const selectPostIds = postsAdapterSelectors.selectIds

/**
 * @param {Object} state
 */
export const selectPostsCount = postsAdapterSelectors.selectTotal

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPost = postsAdapterSelectors.selectById

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
