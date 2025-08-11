import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'
import { commentsAdapter } from './commentsAdapter'

const commentsAdapterSelectors = commentsAdapter.getSelectors(
    state => state.comments
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostCommentsCount = createSelector(
    [selectPost],
    post => post.commentsCount
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostCommentIds = createSelector(
    [selectPost],
    post => post.commentIds
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostComments = createSelector(
    [state => state, selectPostCommentIds],
    (state, postCommentIds) => postCommentIds?.map(
        commentId => commentsAdapterSelectors.selectById(state, commentId)
    )
)
