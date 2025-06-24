import PropTypes from 'prop-types'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import pluralize from 'pluralize'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostCommentsCount } from '../../../../../redux/selectors/feed'

CommentsCounter.propTypes = {
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export function CommentsCounter({ expanded, onClick }) {
    const postId = useContext(PostIdContext)
    const commentsCount = useSelector(state => selectPostCommentsCount(state, postId))

    return (
        <Button
            sx={{ marginLeft: 'auto' }}
            onClick={onClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="c-counter__btn"
        >
            {pluralize(`commentaire`, commentsCount, true)}
        </Button>
    )
}
