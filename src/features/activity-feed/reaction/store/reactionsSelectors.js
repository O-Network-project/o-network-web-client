import { createSelector } from '@reduxjs/toolkit'
import { selectPost } from '../../post/store/postsSelectors'
import { selectUserId } from '../../../user/store/userSelectors'
import { reactionsAdapter } from './reactionsAdapter'
import { REACTION_TYPES } from '../data/reactionTypes'
import { shallowEqual } from 'react-redux'

const reactionsAdapterSelectors = reactionsAdapter.getSelectors(
    state => state.reactions
)

/**
 * @param {Object} state
 * @param {number} postId
 */
export const selectReaction = reactionsAdapterSelectors.selectById

export const selectPostReactionIds = (state, postId) =>
    selectPost(state, postId).reactionIds

export const selectPostReactionsCount = (state, postId) =>
    selectPostReactionIds(state, postId).length

export const makeSelectPostReactionsSelector = () => createSelector(
    [state => state.reactions.entities, selectPostReactionIds],
    (reactionEntities, postReactionIds) => postReactionIds.map(reactionId => {
        console.count(`makeSelectPostReactionsSelector`)
        return reactionEntities[reactionId]
    })
)

export const makeSelectPostReactionTypesSelector = selectPostReactions => createSelector(
    [selectPostReactions],
    postReactions => Object.values(REACTION_TYPES).filter(reactionType =>
        postReactions.some(reaction => {
            console.count(`makeSelectPostReactionTypesSelector`)
            return reaction.type === reactionType
        })
    ), {
        memoizeOptions: (a, b) => a === b || shallowEqual(a, b)
    }
)

export const makeSelectCurrentUserReactionToPostSelector = selectPostReactions => createSelector(
    [selectUserId, selectPostReactions],
    (userId, postReactions) => postReactions.find(reaction => {
        console.count(`makeSelectCurrentUserReactionToPostSelector`)
        return reaction.author.id === userId
    }), {
        memoizeOptions: (a, b) => a === b || shallowEqual(a, b)
    }
)
