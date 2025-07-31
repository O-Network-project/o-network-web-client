import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostReactionIds } from '../../store/reactionsSelectors'
import { ReactionsListItem } from './ReactionsListItem'

export function ReactionsList() {
    const postId = useContext(PostIdContext)
    const reactionIds = useSelector(state => selectPostReactionIds(state, postId))

    return (
        <Box className="c-reaction-post__info">
            {reactionIds.map(reactionId => (
                <ReactionsListItem
                    key={reactionId}
                    id={reactionId}
                />
            ))}
        </Box>
    )
}
