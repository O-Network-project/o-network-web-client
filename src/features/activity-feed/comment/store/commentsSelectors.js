import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'

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
