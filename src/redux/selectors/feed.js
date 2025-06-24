import { createSelector } from '@reduxjs/toolkit'

export const getFeed = state => state.feed

export const getPosts = createSelector(
    [getFeed],
    feed => feed.posts
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const getPost = createSelector(
    [getPosts, (_, postId) => postId],
    (posts, postId) => posts.find(post => post.id === postId)
)

export const getCurrentPage = createSelector(
    [getFeed],
    feed => feed.pagination.currentPage
)

export const getHasMorePosts = createSelector(
    [getFeed],
    feed => feed.pagination.hasMorePosts
)

export const getPostLoading = createSelector(
    [getFeed],
    feed => feed.loading
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const getPostCommentsCount = createSelector(
    [getPost],
    post => post.commentsCount
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const getPostComments = createSelector(
    [getPost],
    post => post.comments
)

/**
 * @param {Object} state
 * @param {string} postId
 */
export const getPostReactions = createSelector(
    [getPost],
    post => post.reactions
)
