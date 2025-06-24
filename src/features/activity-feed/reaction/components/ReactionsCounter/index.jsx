import { useContext, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostReactions } from '../../../../../redux/selectors/feed'
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
                <ReactionsList />
            </Popover>
        </>
    )
}
