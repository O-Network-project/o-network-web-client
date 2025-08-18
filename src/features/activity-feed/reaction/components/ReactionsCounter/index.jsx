import { useContext, useMemo, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { makeSelectPostReactionsSelector, makeSelectPostReactionTypesSelector, selectPostReactionsCount } from '../../store/reactionsSelectors'
import { ReactionsList } from '../ReactionsList'

export function ReactionsCounter() {
    const postId = useContext(PostIdContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const selectPostReactions = useMemo(makeSelectPostReactionsSelector, [])
    const selectPostReactionTypes = useMemo(
        () => makeSelectPostReactionTypesSelector(selectPostReactions),
        [selectPostReactions]
    )

    const postReactionTypes = useSelector(state => selectPostReactionTypes(state, postId))
    const postReactionsCount = useSelector(state => selectPostReactionsCount(state, postId))

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button onClick={handleClick} className="c-reaction-post">
                {postReactionTypes.map(reactionType =>
                    <img className="c-reaction-post__image" src={`/assets/reactions/emoji-${reactionType}.png`} alt={`Emoji ${reactionType}`} key={reactionType} />
                )}
                {postReactionsCount}
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
