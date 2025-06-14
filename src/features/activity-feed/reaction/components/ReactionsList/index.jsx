import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { getPostReactions } from '../../../../../redux/selectors/feed'
import { ReactionsListItem } from './ReactionsListItem'

ReactionsList.propTypes = {
    postId: PropTypes.number.isRequired
}

export function ReactionsList({ postId }) {
    const postReactions = useSelector(getPostReactions(postId))

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
