import { useContext, useMemo, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux'
import { Button, Popover } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPost } from '../../../post/store/postsSelectors'
import { selectPostReactionTypeCounts, makePostReactionsCountSelector } from '../../store/reactionsSelectors'
import { ReactionsList } from '../ReactionsList'

export function ReactionsCounter() {
    const postId = useContext(PostIdContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const selectPostReactionsCount = useMemo(
        () => makePostReactionsCountSelector(selectPost),
        []
    )

    const reactionTypeCounts = useSelector(state => selectPostReactionTypeCounts(state, postId))
    const reactionsCount = useSelector(state => selectPostReactionsCount(state, postId))

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button onClick={handleClick} className="c-reaction-post">
                {Object.entries(reactionTypeCounts)
                    .sort(([, previousCount], [, nextCount]) =>
                        nextCount - previousCount
                    )
                    .map(([reactionType]) =>
                        <img className="c-reaction-post__image" src={`/assets/reactions/emoji-${reactionType}.png`} alt={`Emoji ${reactionType}`} key={reactionType} />
                    )}
                {reactionsCount}
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
