import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostReactions = createSelector(
    [selectPost],
    post => post.reactions
)
