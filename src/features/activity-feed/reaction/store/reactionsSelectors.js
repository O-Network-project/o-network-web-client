import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'
import { selectUserId } from '../../../user/store/userSelectors'
import { reactionsAdapter } from './reactionsAdapter'

const reactionsAdapterSelectors = reactionsAdapter.getSelectors(
    state => state.reactions
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectReaction = reactionsAdapterSelectors.selectById

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

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectCurrentUserReactionToPost = createSelector(
    [selectUserId, selectPostReactions],
    (userId, postReactions) => postReactions.find(
        reaction => reaction.author.id === userId
    )
)
