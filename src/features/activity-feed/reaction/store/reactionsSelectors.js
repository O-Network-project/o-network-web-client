import { createSelector } from '@reduxjs/toolkit'
import { shallowEqual } from 'react-redux'
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

export const selectPostReactionIds = (state, postId) =>
    selectPost(state, postId).reactionIds

/**
 * Creates a unique selectPostReactions selector instance with a dedicated cache
 * per post. Meant to be used with useMemo().
 * @see {@link https://redux.js.org/usage/deriving-data-selectors#selector-factories}
 * @return {(state: object, postId: number) => []} Unique selectPostReactions instance
 */
export const makePostReactionsSelector = () => createSelector(
    [state => state.reactions.entities, selectPostReactionIds],
    (reactionEntities, postReactionIds) => postReactionIds.map(reactionId =>
        reactionEntities[reactionId]
    )
)

export const selectPostReactionTypeCounts = (state, postId) =>
    selectPost(state, postId).reactionTypeCounts

/**
 * Creates a unique selectPostReactionsCount selector instance with a dedicated
 * cache per post. It's based on a also unique selectPost selector instance, so
 * this one must be called first. Meant to be used with useMemo().
 * @see {@link https://redux.js.org/usage/deriving-data-selectors#selector-factories}
 * @param {function} selectPost
 * @return {(state: object, postId: number) => string[]} Unique selectPostReactionsCount instance
 */
export const makePostReactionsCountSelector = selectPost => createSelector(
    [selectPost],
    post => Object.values(post.reactionTypeCounts).reduce(
        (total, typeCount) => total + typeCount,
        0
    )
)

/**
 * Creates a unique selectCurrentUserReactionToPost selector instance with a
 * dedicated cache per post. It's based on a also unique selectPostReactions
 * selector instance, so this one must be called first. Meant to be used with
 * useMemo().
 * @see {@link https://redux.js.org/usage/deriving-data-selectors#selector-factories}
 * @param {function} selectPostReactions
 * @return {(state: object, postId: number) => object} Unique selectCurrentUserReactionToPost instance
 */
export const makeCurrentUserReactionToPostSelector = selectPostReactions => createSelector(
    [selectPostReactions, selectUserId],
    (postReactions, userId) => postReactions.find(reaction =>
        reaction.author.id === userId
    ), {
        // In some cases selectPostReactions returns the same array
        // reference, so === is enough. In other cases the reference changes
        // but the contents are the same, so shallowEqual is needed.
        memoizeOptions: (a, b) => a === b || shallowEqual(a, b)
    }
)
