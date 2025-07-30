import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'
import { reactionsAdapter } from './reactionsAdapter'

const reactionsAdapterSelectors = reactionsAdapter.getSelectors(
    state => state.reactions
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostReactionIds = createSelector(
    [selectPost],
    post => post.reactionIds
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectPostReactions = createSelector(
    [state => state, selectPostReactionIds],
    (state, postReactionIds) => postReactionIds.map(
        reactionId => reactionsAdapterSelectors.selectById(state, reactionId)
    )
)
