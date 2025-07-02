import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostReactions } from '../../store/reactionsSelectors'
import { ReactionsListItem } from './ReactionsListItem'

export function ReactionsList() {
    const postId = useContext(PostIdContext)
    const postReactions = useSelector(state => selectPostReactions(state, postId))

    return (
        <Box className="c-reaction-post__info">
            {postReactions.map(reaction => (
                <ReactionsListItem
                    key={reaction.id}
                    reaction={reaction}
                />
            ))}
        </Box>
    )
}
