import { postsAdapter } from './postsAdapter'

const postsAdapterSelectors = postsAdapter.getSelectors(
    state => state.posts
)

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

export const selectActivityFeedCurrentPage = state =>
    selectPostsState(state).pagination.currentPage

export const selectActivityFeedHasMorePosts = state =>
    selectPostsState(state).pagination.hasMorePosts

export const selectPostLoading = state => selectPostsState(state).loading
