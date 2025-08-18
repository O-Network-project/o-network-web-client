import { useContext, useMemo, useState } from 'react'
import { Popover, Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { REACTION_TYPES } from '../../data/reactionTypes'
import { makeSelectCurrentUserReactionToPostSelector, makeSelectPostReactionsSelector } from '../../store/reactionsSelectors'
import { createReaction, updateReaction, removeReaction } from '../../store/reactionsThunks'
import './style.scss'

export function ReactionButton() {
    const postId = useContext(PostIdContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()

    const selectPostReactions = useMemo(makeSelectPostReactionsSelector, [])
    const selectCurrentUserReactionToPost = useMemo(
        () => makeSelectCurrentUserReactionToPostSelector(selectPostReactions),
        [selectPostReactions]
    )

    const currentUserReaction = useSelector(
        state => selectCurrentUserReactionToPost(state, postId)
    )

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const handleReaction = type => {
        if (currentUserReaction?.type === type) {
            dispatch(removeReaction({ postId, reactionId: currentUserReaction.id }))
        } else if (currentUserReaction) {
            dispatch(updateReaction({ type, reactionId: currentUserReaction.id }))
        } else {
            dispatch(createReaction({ postId, type }))
        }
        setAnchorEl(null)
    }

    return (
        <div className="c-reaction-selector">
            {currentUserReaction
                ? <Button className="c-reaction-selector__emoji-button" aria-describedby={id} onClick={handleClick}>
                    <img className="c-reaction-selector__image-choice" src={`/assets/reactions/emoji-${currentUserReaction.type}.png`} alt={`Emoji ${currentUserReaction.type}`} />
                </Button>
                : <Button variant="outlined" className="c-btn footer" aria-describedby={id} onClick={handleClick}>
                    J'aime
                </Button>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box sx={{ p: 1 }}>
                    {Object.values(REACTION_TYPES).map(reactionType =>
                        <Button key={reactionType} sx={{ m: '5px', minWidth: '35px' }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction(reactionType)}>
                            <img className="c-reaction-selector__image" src={`/assets/reactions/emoji-${reactionType}.png`} alt={`Emoji ${reactionType}`} />
                        </Button>
                    )}
                </Box>
            </Popover>
        </div>

    )
}
