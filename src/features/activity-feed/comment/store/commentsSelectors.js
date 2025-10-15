import { selectPost } from '../../post/store/postsSelectors'
import { commentsAdapter } from './commentsAdapter'

const commentsAdapterSelectors = commentsAdapter.getSelectors(
    state => state.comments
)

/**
 * @param {Object} state
 * @param {number} commentId
 */
export const selectComment = commentsAdapterSelectors.selectById

export const selectPostCommentsCount = (state, postId) =>
    selectPost(state, postId).commentsCount

export const selectPostCommentIds = (state, postId) =>
    selectPost(state, postId).commentIds
