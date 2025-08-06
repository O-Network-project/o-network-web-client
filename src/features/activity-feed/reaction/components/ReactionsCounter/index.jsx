import { useContext, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostReactions } from '../../store/reactionsSelectors'
import { REACTION_TYPES } from '../../data/reactionTypes'
import { ReactionsList } from '../ReactionsList'

export function ReactionsCounter() {
    const postId = useContext(PostIdContext)

    const [anchorEl, setAnchorEl] = useState(null)
    const postReactions = useSelector(state => selectPostReactions(state, postId))

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const hasReactionType = (reactions, type) => {
        return reactions.some(reaction => reaction.type === type)
    }

    return (
        <>
            <Button onClick={handleClick} className="c-reaction-post">
                {Object.values(REACTION_TYPES).map(reactionType =>
                    hasReactionType(postReactions, reactionType) && (
                        <img className="c-reaction-post__image" src={`/assets/reactions/emoji-${reactionType}.png`} alt={`Emoji ${reactionType}`} key={reactionType} />
                    )
                )}
                {postReactions.length}
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <ReactionsList />
            </Popover>
        </>
    )
}
