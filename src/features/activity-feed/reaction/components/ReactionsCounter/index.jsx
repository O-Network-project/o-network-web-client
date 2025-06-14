import { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'
import { getPostReactions } from '../../../../../redux/selectors/feed'
import { ReactionsList } from '../ReactionsList'

ReactionsCounter.propTypes = {
    postId: PropTypes.number.isRequired
}

export function ReactionsCounter({ postId }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const postReactions = useSelector(getPostReactions(postId))

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
                {['like', 'love', 'haha', 'wow', 'sad', 'angry'].map(reactionType =>
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
                <ReactionsList postId={postId} />
            </Popover>
        </>
    )
}
